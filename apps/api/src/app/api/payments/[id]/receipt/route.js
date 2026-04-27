import { db } from "@repo/db";
import { getPaymentReceipt, generateReceiptHTML, getReceiptStream } from "@/modules/payments/receipt.service";
import { generatePdf } from "@/integrations/pdf/pdf.client";
import { claimPaymentForGeneration, getPaymentById, resetStaleLock } from "@/modules/payments/payment.repository";
import { corsHeaders } from "@/utils/cors";
import { createProtectedRoute } from "@/lib/middleware";
import { canAccessReceipt } from "@/lib/permissions";
import { jwtVerify } from "jose";
import { randomUUID } from "node:crypto";

const CURRENT_VERSION = 1;

/**
 * SECURED RECEIPT HANDLER
 * 
 * Structural enforcement via withAuthz ensures:
 * - Session is valid
 * - Payment resource is loaded (req.resource)
 * - User is authorized for this exact payment record (canAccessReceipt)
 * - Request is rate-limited
 * - Request correlation (requestId) is active
 */
async function getHandler(req, { context, ctx, resource: paymentRecord }) {
  const { id: paymentId } = await context.params;
  const headers = corsHeaders(req);
  const { searchParams } = new URL(req.url);
  const requestId = req.headers.get("x-request-id") || randomUUID();
  const format = searchParams.get("format") || "html";
  const download = searchParams.get("download") === "true";

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
      ctx.warn("R2_FILE_MISSING_FOR_READY_PAYMENT", { key });
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
    
    ctx.warn("STALE_GENERATION_DETECTED", { paymentId, jobId: paymentRecord.receiptJobId });
    await resetStaleLock(db, paymentId);
  }

  // 3. TRIGGER GENERATION (Fire & Forget)
  // At this point, we ARE AUTHORIZED. Side effects are now safe.
  const jobId = randomUUID();
  const claimed = await claimPaymentForGeneration(db, paymentId, jobId);

  if (claimed) {
    const receiptData = await getPaymentReceipt(db, paymentId);
    const html = generateReceiptHTML(receiptData);

    // FIRE AND FORGET: No 'await' on the worker execution
    generatePdf(html, key, jobId).catch(err => {
      ctx.error("PDF_SERVICE_TRIGGER_FAILURE", { error: err.message });
    });

    ctx.log("TRIGGERED_ASYNC_GENERATION", { paymentId, jobId });
  }

  return new Response(
    JSON.stringify({ success: true, status: "accepted", message: "Generation started." }),
    { status: 202, headers: { ...headers, "Content-Type": "application/json", "Retry-After": "5" } }
  );
}

// ── STRUCTURAL ENFORCEMENT ──
export const GET = createProtectedRoute(getHandler, {
  policy: canAccessReceipt,
  resourceLoader: (id) => getPaymentById(db, id)
});
