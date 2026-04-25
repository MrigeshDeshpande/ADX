import { db } from "@repo/db";
import { getPaymentReceipt, generateReceiptHTML, getReceiptStream } from "@/modules/payments/receipt.service";
import { generatePdf } from "@/integrations/pdf/pdf.client";
import { updatePayment, claimPaymentForGeneration, getPaymentById, resetStaleLock } from "@/modules/payments/payment.repository";
import { logPdfFailure } from "@/modules/payments/pdfFailure.repository";
import { corsHeaders } from "@/utils/cors";


const CURRENT_VERSION = 1;
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export async function GET(req, context) {
  const { id: paymentId } = await context.params;
  const headers = corsHeaders(req);

  try {
    if (!paymentId) {
      return new Response(JSON.stringify({ success: false, message: "Invalid payment ID" }), { status: 400, headers });
    }

    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "html";
    const download = searchParams.get("download") === "true";

    const paymentRecord = await getPaymentById(db, paymentId);
    if (!paymentRecord) {
      return new Response(JSON.stringify({ success: false, message: "Payment not found" }), { status: 404, headers });
    }

    // ── HTML VIEW ──
    if (format === "html") {
      const receiptData = await getPaymentReceipt(db, paymentId);
      const receiptHTML = generateReceiptHTML(receiptData);
      return new Response(receiptHTML, { headers: { ...headers, "Content-Type": "text/html" } });
    }

    // ── PDF FLOW ──
    const key = `receipts/v${CURRENT_VERSION}/${paymentId}.pdf`;

    // 1. Check if READY
    if (paymentRecord.receiptStatus === "ready" && paymentRecord.receiptKey) {
      try {
        const stream = await getReceiptStream(paymentRecord.receiptKey);
        return new Response(stream, {
          headers: {
            ...headers,
            "Content-Type": "application/pdf",
            "Content-Disposition": `${download ? "attachment" : "inline"}; filename=receipt-${paymentId}.pdf`,
          },
        });
      } catch (err) {
        console.warn("[API] R2 file missing, allowing regeneration");
      }
    }

    // 2. CHECK GENERATING STATUS (Stale Recovery)
    if (paymentRecord.receiptStatus === "generating") {
      const requestedAt = paymentRecord.receiptRequestedAt ? new Date(paymentRecord.receiptRequestedAt) : null;
      const secondsSinceRequest = requestedAt ? (Date.now() - requestedAt.getTime()) / 1000 : 999;

      if (secondsSinceRequest < 60) {
        return new Response(
          JSON.stringify({ success: true, status: "generating", message: "Receipt is being generated. Please wait..." }), 
          { status: 202, headers: { ...headers, "Content-Type": "application/json", "Retry-After": "3" } }
        );
      }
      
      console.warn("[API] Stale generation detected. Terminating ownership for jobId:", paymentRecord.receiptJobId);
      await resetStaleLock(db, paymentId);
    }

    // 3. TRIGGER GENERATION (Fire & Forget)
    const jobId = crypto.randomUUID();
    const claimed = await claimPaymentForGeneration(db, paymentId, jobId);

    if (claimed) {
      const receiptData = await getPaymentReceipt(db, paymentId);
      const html = generateReceiptHTML(receiptData);

      // FIRE AND FORGET: No 'await' on the worker execution
      // We only await the quick handshake to confirm the service received the job.
      generatePdf(html, key, jobId).catch(err => {
        console.error("[API] Failed to trigger PDF service:", err.message);
      });

      console.log("[API] Triggered async generation", { paymentId, jobId });
    }

    return new Response(
      JSON.stringify({ success: true, status: "accepted", message: "Generation started." }),
      { status: 202, headers: { ...headers, "Content-Type": "application/json", "Retry-After": "5" } }
    );

  } catch (error) {
    console.error("Receipt route failure:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500, headers }
    );
  }
}

export async function OPTIONS(req) {
  return new Response(null, { headers: corsHeaders(req) });
}
