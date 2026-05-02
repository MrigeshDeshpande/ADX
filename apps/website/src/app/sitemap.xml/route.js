import {
  BASE_URL,
  STATIC_SITEMAP_ROUTES,
  LEADERS,
  PROGRAMS,
} from "@/lib/sitemap-routes";

import { sanityClient } from "@/lib/sanity/client";

export async function GET() {
  const now = new Date().toISOString();

  // 🔹 Static routes
  const staticUrls = STATIC_SITEMAP_ROUTES.map((route) => ({
    loc: `${BASE_URL}${route.path}`,
    lastmod: now,
    priority: route.priority ?? 0.8,
  }));

  // 🔹 Team pages
  const teamUrls = LEADERS.map((leader) => ({
    loc: `${BASE_URL}/team/${leader.username}`,
    lastmod: now,
    priority: 0.9,
  }));

  const programUrls = PROGRAMS.map((program) => ({
    loc: `${BASE_URL}/programs/${program.slug}`,
    lastmod: now,
    priority: program.priority,
  }));

  // 🔹 Blog dynamic routes
  const posts = await sanityClient.fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
  `, {}, { next: { revalidate: 3600 } });

  const blogUrls = posts.map((post) => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: post._updatedAt || now,
    priority: 0.7,
  }));

  // 🔹 Final URLs
  const urls = [
    ...staticUrls,
    ...teamUrls,
    ...programUrls, 
    ...blogUrls,
  ];

  // 🔹 XML generation
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`
      )
      .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}