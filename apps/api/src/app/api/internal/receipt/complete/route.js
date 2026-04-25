import { db } from "@repo/db";
import { completePaymentGeneration } from "@/modules/payments/payment.repository";
import { corsHeaders } from "@/utils/cors";

/**
 * SECURE CALLBACK ENDPOINT
 * This is called by the PDF Service (Railway) when a job is finished.
 */
export async function POST(req) {
  const headers = corsHeaders(req);
  
  try {
    const authKey = req.headers.get("x-internal-key");
    if (authKey !== process.env.PDF_SERVICE_API_KEY) {
      console.warn("[API][COMPLETE][AUTH_FAILURE] Invalid internal key");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
    }

    const { paymentId, jobId, status, key, error } = await req.json();

    if (!paymentId || !jobId || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers });
    }

    console.log("[API][COMPLETE][REQUEST]", { paymentId, jobId, status });

    // ── ATOMIC OWNERSHIP UPDATE ──
    const updated = await completePaymentGeneration(db, paymentId, jobId, {
      receiptStatus: status, // 'ready' or 'failed'
      receiptKey: status === "ready" ? key : null,
      // We don't overwrite the requestedAt to keep the audit trail of the original start
    });

    if (updated) {
      console.log("[API][COMPLETE][SUCCESS]", { paymentId, jobId });
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    } else {
      // If result is null, it means the jobId was stale or already replaced
      console.warn("[API][COMPLETE][STALE_IGNORED]", { paymentId, jobId });
      return new Response(JSON.stringify({ success: true, message: "Ignored stale callback" }), { status: 200, headers });
    }

  } catch (error) {
    console.error("[API][COMPLETE][CRITICAL_FAILURE]", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers });
  }
}

// Support OPTIONS for CORS
export async function OPTIONS(req) {
  return new Response(null, { headers: corsHeaders(req) });
}
