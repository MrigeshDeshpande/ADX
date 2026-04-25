const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL;

export async function generatePdf(html, key) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    console.log("[PDF_CLIENT] Sending request to Railway:", { key, htmlSize: html?.length });

    const res = await fetch(`${PDF_SERVICE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-key": process.env.PDF_SERVICE_API_KEY,
      },
      body: JSON.stringify({ html, key }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[PDF_CLIENT] Service error:", errorText);
      throw new Error(`PDF service failed: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("[PDF_CLIENT] Timeout after 10 seconds");
    } else {
      console.error("[PDF_CLIENT] Connection error:", err.message);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}