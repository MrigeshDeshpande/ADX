/**
 * Generate a stable anchor ID for an FAQ item.
 * Uses the Sanity slug if available, otherwise falls back to slugifying the question text.
 *
 * @param {{ slug?: string, question?: string, q?: string }} faq - FAQ item
 * @returns {string} e.g. "faq-bca-eligibility-agra"
 */
export function getFaqAnchorId(faq) {
  const text = faq.slug || faq.question || faq.q || "";
  if (!text) return "";

  const slug = text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 100);

  return slug ? `faq-${slug}` : "";
}

/**
 * Slugify a string for use in anchor IDs.
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
