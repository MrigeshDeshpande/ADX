import Link from "next/link";

export const revalidate = 86400;
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildSEO } from "@/lib/seo/buildSEO";
import {
  BASE_URL,
  STATIC_SITEMAP_ROUTES,
  LEADERS,
} from "@/lib/sitemap-routes";

export const metadata = buildSEO({
  title: "HTML Sitemap | SkillYards",
  description:
    "Browse the complete HTML sitemap of SkillYards with quick access to all important pages.",
  path: "/sitemap",
  keywords: [
    "SkillYards sitemap",
    "HTML sitemap SkillYards",
    "website structure SkillYards",
    "all pages SkillYards",
  ],
  ogImage: "/images/opengraph/sitemap-og.jpg",
});

export default function SitemapPage() {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sections = groupBySection(STATIC_SITEMAP_ROUTES);

  return (
    <section className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 mt-10">
        <Breadcrumbs />

        <div className="mt-10 mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Site Structure</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground">HTML Sitemap</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated on {lastUpdated}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(sections).map(([section, routes]) => (
            <div key={section} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 pb-2 border-b border-border">
                {section}
              </h2>
              <ul className="space-y-2">
                {routes.map((route) => (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                    >
                      {route.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 pb-2 border-b border-border">
              Leadership
            </h2>
            <ul className="space-y-2">
              {LEADERS.map((leader) => (
                <li key={leader.username}>
                  <Link
                    href={`/team/${leader.username}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {leader.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <SitemapSchema />
    </section>
  );
}

/* ---------------- Helpers ---------------- */

function groupBySection(routes) {
  return routes.reduce((acc, route) => {
    acc[route.section] ||= [];
    acc[route.section].push(route);
    return acc;
  }, {});
}

function SitemapSchema() {
  const items = STATIC_SITEMAP_ROUTES.map((route, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: route.label,
    url: `${BASE_URL}${route.path}`,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "SkillYards HTML Sitemap",
          itemListElement: items,
        }),
      }}
    />
  );
}