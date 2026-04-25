import "dotenv/config";
import express from "express";
import { generatePdfFromHtml } from "./pdf.js";
import { uploadToR2, checkReceiptExists } from "./upload.js";

const app = express();

app.use(express.json({ limit: "10mb" }));

// AUTH MIDDLEWARE
function authMiddleware(req, res, next) {
  const key = req.headers["x-internal-key"];

  if (key !== process.env.INTERNAL_API_KEY) {
    console.warn("[AUTH_FAILURE] Invalid or missing API key");
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

let activeJobs = 0;
const MAX_CONCURRENT = 5;

app.post("/generate", authMiddleware, async (req, res) => {
  const { html, key } = req.body;

  console.log("[PDF_REQUEST]", {
    key,
    htmlLength: html?.length,
    timestamp: new Date().toISOString(),
  });

  console.log("ENV CHECK:", {
    bucket: process.env.R2_BUCKET,
    endpoint: process.env.R2_ENDPOINT,
  });

  // RATE LIMIT
  if (activeJobs >= MAX_CONCURRENT) {
    return res.status(429).json({
      error: "Too many PDF requests",
      activeJobs,
      max: MAX_CONCURRENT,
    });
  }

  // VALIDATION (single clean flow)
  if (!html || typeof html !== "string") {
    return res.status(400).json({ error: "Invalid HTML input" });
  }

  if (!key || typeof key !== "string") {
    return res.status(400).json({ error: "Key is required" });
  }

  if (!key.endsWith(".pdf") || !key.startsWith("receipts/")) {
    return res.status(400).json({ error: "Invalid key format" });
  }

  activeJobs++;

  try {
    // IDEMPOTENCY CHECK
    const exists = await checkReceiptExists(key);
    if (exists) {
      console.log("[CACHE_HIT]", key);
      return res.json({
        success: true,
        url: `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}/${key}`,
        cached: true,
      });
    }

    // GENERATE PDF
    const pdfBuffer = await generatePdfFromHtml(html);

    console.log("UPLOAD INPUT:", {
      bucket: process.env.R2_BUCKET,
      key,
      size: pdfBuffer.length,
    });

    // UPLOAD
    try {
      const url = await uploadToR2({
        key,
        buffer: pdfBuffer,
      });

      console.log("[SUCCESS]", {
        key,
        url,
        size: pdfBuffer.length,
        timestamp: new Date().toISOString(),
      });

      return res.json({ url });
    } catch (uploadErr) {
      console.error("[UPLOAD_ERROR]", uploadErr);
      return res.status(500).json({ error: "Upload failed" });
    }

  } catch (err) {
    console.error("[PDF_ERROR]", err);
    return res.status(500).json({ error: "PDF generation failed" });
  } finally {
    activeJobs = Math.max(0, activeJobs - 1);
  }
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// PREVENT SILENT CRASHES
process.on("uncaughtException", (err) => {
  console.error("[UNCAUGHT_EXCEPTION]", err);
});

process.on("unhandledRejection", (err) => {
  console.error("[UNHANDLED_REJECTION]", err);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`PDF service running on port ${PORT}`);
});