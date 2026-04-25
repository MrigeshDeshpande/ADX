const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL;

export async function generatePdf(html, key, jobId) {
  if (!PDF_SERVICE_URL) {
    throw new Error("PDF_SERVICE_URL is not configured");
  }

  console.log("[PDF_CLIENT] Sending request to Railway:", {
    key,
    jobId,
    htmlSize: html?.length,
  });

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