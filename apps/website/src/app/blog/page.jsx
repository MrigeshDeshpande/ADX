import { buildSEO } from "@/lib/seo/buildSEO";
import { sanityClient } from "@/lib/sanity/client";
import { POSTS_QUERY } from "@/lib/sanity/queries";
import BlogSearch from "@/components/blog/BlogSearch";
import JsonLd from "@/components/JsonLd";
import { getBlogSchema } from "@/lib/seo/schema/blogPostingSchema";

export const revalidate = 3600;

export const metadata = buildSEO({
  title: "SkillYards Blog",
  description:
    "Explore the SkillYards Blog for expert insights, practical tutorials, learning resources, and career guidance in IT and emerging technologies.",
  path: "/blog",
  keywords: [
    "SkillYards blog",
    "IT learning blog",
    "Programming tutorials",
    "Career guidance blog",
    "Skill development articles",
    "Technology education insights",
  ],
  ogImage: "/images/opengraph/blog-og.jpg",
});

export default async function BlogPage() {
  const posts = await sanityClient.fetch(POSTS_QUERY, {}, { next: { revalidate: 3600 } });
  const blogSchema = getBlogSchema(posts);

  return (
    <div className="bg-background min-h-screen pt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>
      
      {/* Primary Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[100px] pointer-events-none z-0"></div>

      <JsonLd data={blogSchema} id="blog-collection-schema" />
      <section className="py-16 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 space-y-16">
          <div className="text-center space-y-6">
            <h1 className="font-serif text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60 dark:from-white dark:to-white/60 tracking-tight">
              SkillYards Blog
            </h1>
            <p className="font-sans text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
              Explore our latest insights, tips, and guides to stay ahead in your IT career.
            </p>
          </div>

          <BlogSearch posts={posts} />
        </div>
      </section>
    </div>
  );
}