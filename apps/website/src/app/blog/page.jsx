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
  const blogSchema = getBlogSchema();

  return (
    <div className="bg-background min-h-screen pt-20">
      <JsonLd data={blogSchema} id="blog-collection-schema" />
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 space-y-12">
          <div className="text-center space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
              SkillYards Blog
            </h1>
            <p className="font-sans text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Explore our latest insights, tips, and guides to stay ahead in your IT career.
            </p>
          </div>

          <BlogSearch posts={posts} />
        </div>
      </section>
    </div>
  );
}