import { db } from "@repo/db";
import {
  getPaymentReceipt,
  generateReceiptHTML,
  getReceiptStream,
} from "@/modules/payments/receipt.service";

import { enqueuePdfGeneration, readyCache } from "@/integrations/pdf/pdf.worker";
import { updatePayment, claimPaymentForGeneration, getPaymentById } from "@/modules/payments/payment.repository";
import { logPdfFailure } from "@/modules/payments/pdfFailure.repository";

const CURRENT_VERSION = 1;
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export async function GET(req, context) {
  const { id: paymentId } = await context.params;

  try {
    if (!paymentId) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid payment ID" }),
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "html";
    const download = searchParams.get("download") === "true";

    // 1. Lite Check: Get only the payment record status first
    console.time(`[API][RECEIPT] getPaymentById:${paymentId}`);
    const paymentRecord = await getPaymentById(db, paymentId);
    console.timeEnd(`[API][RECEIPT] getPaymentById:${paymentId}`);

    if (!paymentRecord) {
      return new Response(
        JSON.stringify({ success: false, message: "Payment not found" }),
        { status: 404 }
      );
    }

    // HTML view remains simple but we only fetch full data if needed
    if (format === "html") {
      const receiptData = await getPaymentReceipt(db, paymentId);
      const receiptHTML = generateReceiptHTML(receiptData);
      return new Response(receiptHTML, {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (format !== "pdf") {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid format" }),
        { status: 400 }
      );
    }

    // ── PDF PRODUCTION-SCALE ASYNC FLOW ──
    const key = `receipts/v${CURRENT_VERSION}/${paymentId}.pdf`;

    // 1. Fast Check: L1 Memory Cache (Hot Hits)
    const cached = readyCache.get(paymentId);
    if (cached && cached.version === CURRENT_VERSION) {
      const stream = await getReceiptStream(cached.key);
      return new Response(stream, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `${download ? "attachment" : "inline"}; filename=receipt-${paymentId}.pdf`,
          "X-Receipt-Cache": "L1",
        },
      });
    }

    // 2. Database Check (Cold Hits)
    if (
      paymentRecord.receiptStatus === "ready" &&
      paymentRecord.receiptKey &&
      paymentRecord.receiptVersion === CURRENT_VERSION
    ) {
      try {
        const stream = await getReceiptStream(paymentRecord.receiptKey);
        readyCache.set(paymentId, { 
          key: paymentRecord.receiptKey, 
          version: paymentRecord.receiptVersion, 
          timestamp: Date.now() 
        });
        
        return new Response(stream, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `${download ? "attachment" : "inline"}; filename=receipt-${paymentId}.pdf`,
            "X-Receipt-Cache": "DB",
          },
        });
      } catch (err) {
        console.warn("R2 artifact missing, trigger regeneration");
      }
    }

    // 3. Status Check: Already Generating?
    if (paymentRecord.receiptStatus === "generating") {
      return new Response(
        JSON.stringify({ 
          success: true, 
          status: "generating", 
          message: "Receipt is being generated. Please retry in a few seconds." 
        }),
        { 
          status: 202, 
          headers: { "Content-Type": "application/json", "Retry-After": "3" } 
        }
      );
    }

    // 4. Action: Start Generation (Atomic Claim)
    console.time(`[API][RECEIPT] claimPayment:${paymentId}`);
    const claimed = await claimPaymentForGeneration(db, paymentId);
    console.timeEnd(`[API][RECEIPT] claimPayment:${paymentId}`);
    
    if (claimed) {
      await enqueuePdfGeneration(paymentId, key, CURRENT_VERSION);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        status: "accepted", 
        message: "Generation started." 
      }),
      { 
        status: 202, 
        headers: { "Content-Type": "application/json", "Retry-After": "5" } 
      }
    );

  } catch (error) {
    console.error("Receipt route failure:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to process receipt request. Please try again later.",
      }),
      { status: 500 }
    );
  }
}