import { sanityClient } from "@/lib/sanity/client";
import { FAQS_BY_CATEGORY_QUERY, ALL_FAQ_CATEGORIES_QUERY } from "@/lib/sanity/queries";

const CACHE_TAGS = { next: { tags: ["faqs"] } };

export async function getPageFaqs(categorySlug, limit = 4) {
  const category = await sanityClient.fetch(FAQS_BY_CATEGORY_QUERY, { slug: categorySlug }, CACHE_TAGS);
  return category?.faqs?.slice(0, limit) || [];
}

export async function getAllFaqCategories() {
  return sanityClient.fetch(ALL_FAQ_CATEGORIES_QUERY, {}, CACHE_TAGS);
}

export async function getMergedFaqsForSchema(categorySlugs = []) {
  if (!categorySlugs.length) return [];

  const results = await Promise.all(
    categorySlugs.map(slug => getPageFaqs(slug, 999))
  );

  return results.flat();
}
