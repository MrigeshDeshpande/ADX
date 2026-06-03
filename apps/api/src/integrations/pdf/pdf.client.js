import { db } from "@repo/db";
import { uploadPdfToR2 } from "@/integrations/r2/r2.client";
import { completePaymentGeneration } from "@/modules/payments/payment.repository";

const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL;
const PDFSHIFT_API_KEY = process.env.PDFSHIFT_API_KEY;
const USE_PDF_SHIFT = process.env.USE_PDF_SHIFT === "true";

export async function generatePdf(html, key, jobId) {
  // Extract paymentId from key (e.g. "receipts/v1/payment-uuid.pdf" -> "payment-uuid")
  const paymentId = key?.split("/").pop().split(".")[0];

  if (USE_PDF_SHIFT) {
    console.log("[PDF_CLIENT] Generating PDF using PDFShift:", { key, jobId });
    
    try {
      if (!PDFSHIFT_API_KEY) {
        throw new Error("PDFSHIFT_API_KEY is not configured");
      }

      // 1. Generate via PDFShift
      const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from("api:" + PDFSHIFT_API_KEY).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: html,
          landscape: false, // Receipts are A4 Portrait
          format: "A4",
          margin: "0",
          use_print: true,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`PDFShift API failed (${response.status}): ${errText}`);
      }

      const pdfBuffer = Buffer.from(await response.arrayBuffer());

      // 2. Upload to Cloudflare R2
      await uploadPdfToR2({ key, buffer: pdfBuffer });

      // 3. Atomically update DB state
      await completePaymentGeneration(db, paymentId, jobId, {
        receiptStatus: "ready",
        receiptKey: key,
      });

      console.log("[PDF_CLIENT] PDFShift generation and upload complete:", { paymentId });
      return { message: "Generation complete via PDFShift" };
    } catch (err) {
      console.error("[PDF_CLIENT] PDFShift generation failed:", err);
      // Mark generation as failed in DB
      await completePaymentGeneration(db, paymentId, jobId, {
        receiptStatus: "failed",
        receiptKey: null,
      });
      throw err;
    }
  }

  // ── LEGACY PATH: PUPPETEER MICROSERVICE ──
  if (!PDF_SERVICE_URL) {
    throw new Error("PDF_SERVICE_URL is not configured");
  }

  console.log("[PDF_CLIENT] Sending request to Railway Puppeteer service:", { key, jobId });

  try {
    const res = await fetch(`${PDF_SERVICE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-key": process.env.PDF_SERVICE_API_KEY,
      },
      body: JSON.stringify({ html, key, jobId }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText };
      }
      
      console.error("[PDF_CLIENT] Service error:", errorData);
      throw new Error(`PDF service failed: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("[PDF_CLIENT] Connection error:", err.message);
    throw err;
  }
}