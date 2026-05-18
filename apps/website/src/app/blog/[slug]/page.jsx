import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { LayoutList } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import Discussion from "@/components/blog/Discussion";
import JsonLd from "@/components/JsonLd";
import TableOfContents from "@/components/TableOfContents";
import ScrollProgress from "@/components/blog/ScrollProgress";
import { buildSEO } from "@/lib/seo/buildSEO";
import { getBlogPostingSchema } from "@/lib/seo/schema/blogPostingSchema";
import { urlFor } from "@/lib/sanity/image";
import { extractHeadings } from "@/lib/sanity/slugifyHeading";
import { portableTextComponents } from "@/lib/sanity/portableTextComponents";
import { calculateReadingTime } from "@/lib/sanity/readingTime";
import { sanityClient } from "@/lib/sanity/client";
import {
  PILLAR_CHILDREN_QUERY,
  POST_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";

export const revalidate = 3600;

const CONTENT_TYPE_LABELS = {
  "pillar-brand": "Brand Pillar",
  "pillar-sub": "Sub-Pillar",
  cluster: "Guide",
  comparison: "Comparison",
  news: "News Bulletin",
};

const CATEGORY_LABELS = {
  "ojd-program": "OJD Program",
  "ojd-bca": "OJD BCA",
  "ojd-bba": "OJD BBA",
  "full-stack": "Full-Stack Development",
  "digital-marketing": "Digital Marketing",
  "career-guidance": "Career Guidance",
  "industry-news": "Industry News",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(
    `*[_type == "post"]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } }
  );

  return slugs.map((post) => ({ slug: post.slug }));
}

const getPost = cache(async (slug) =>
  sanityClient.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 3600 } })
);

const getPillarChildren = cache(async (slug) =>
  sanityClient.fetch(PILLAR_CHILDREN_QUERY, { slug }, { next: { revalidate: 3600 } })
);

function buildMetadataForPost(post, slug) {
  if (!post) {
    return buildSEO({
      title: "Blog Not Found",
      description: "The blog you are looking for does not exist.",
      path: `/blog/${slug}`,
    });
  }

  const cleanDescription =
    post.excerpt?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    "Read this article on SkillYards.";

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).url()
    : undefined;

  const metadata = buildSEO({
    title: post.seoTitle || post.title,
    description: cleanDescription,
    path: `/blog/${post.slug?.current || slug}`,
    keywords: [
      ...(post.seoKeywords || []),
      post.title,
      post.author?.name,
      CATEGORY_LABELS[post.category],
      "SkillYards blog",
    ].filter(Boolean),
    ogImage: imageUrl,
    ogType: "article",
  });

  if (post.noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return buildMetadataForPost(post, slug);
}

function MetaRow({ post, readingTime, tone = "default" }) {
  const isNews = tone === "news";
  const textClass = isNews
    ? "text-stone-600 dark:text-stone-300"
    : "text-muted-foreground";

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${textClass}`}>
      <span>{post.author?.name || "SkillYards Team"}</span>
      <span>{formatDate(post.publishedAt)}</span>
      <span>{readingTime} min read</span>
      {post.category && <span>{CATEGORY_LABELS[post.category] || post.category}</span>}
    </div>
  );
}

function ParentPillarCard({ parentPillar, tone = "default" }) {
  if (!parentPillar) return null;

  const isNews = tone === "news";

  return (
    <Link
      href={`/blog/${parentPillar.slug}`}
      className={`block rounded-[1.5rem] border p-5 transition-colors ${
        isNews
          ? "border-stone-400/60 bg-[#efe4cf] hover:bg-[#eadbbd] dark:border-stone-600 dark:bg-[#241d16] dark:hover:bg-[#2b2219]"
          : "border-border/60 bg-primary/[0.04] hover:border-primary/40"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">
        Part of larger pillar
      </p>
      <h3 className={`mt-3 text-lg font-semibold ${isNews ? "font-serif" : ""}`}>
        {parentPillar.title}
      </h3>
    </Link>
  );
}

function CTASection({ items }) {
  if (!items?.length) return null;

  const prominent = items.filter((item) => item.linkContext === "cta-prominent");
  const related = items.filter((item) => item.linkContext !== "inline-mention");

  return (
    <div className="space-y-6">
      {prominent.length > 0 && (
        <section className="rounded-[2rem] bg-foreground p-8 text-primary-foreground shadow-2xl shadow-black/10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-foreground/70">
            Next Step
          </p>
          <h3 className="mt-3 font-serif text-3xl font-black">
            Turn reading into action.
          </h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {prominent.map((item) => (
              <Link
                key={`${item.path}-${item.title}`}
                href={item.path}
                className="rounded-full bg-background px-5 py-3 text-sm font-bold text-foreground transition-transform hover:-translate-y-0.5"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="rounded-[2rem] border border-border/60 bg-background/70 p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">
            Related Programs
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={`${item.path}-${item.title}-related`}
                href={item.path}
                className="rounded-[1.25rem] border border-border/60 px-5 py-4 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SiblingSection({ posts, title = "Keep reading" }) {
  if (!posts?.length) return null;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">
          Related Reading
        </p>
        <h3 className="mt-3 font-serif text-3xl font-black text-foreground">
          {title}
        </h3>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

function PillarChildrenSection({ posts }) {
  if (!posts?.length) return null;

  const subPillars = posts.filter((post) => post.contentType === "pillar-sub");
  const guides = posts.filter((post) => post.contentType !== "pillar-sub");

  return (
    <section className="space-y-10">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">
          Knowledge Map
        </p>
        <h3 className="mt-3 font-serif text-3xl font-black text-foreground">
          This pillar expands into focused paths
        </h3>
      </div>

      {subPillars.length > 0 && (
        <div className="space-y-5">
          <h4 className="text-lg font-semibold text-foreground">Sub-pillars</h4>
          <div className="grid gap-5 md:grid-cols-2">
            {subPillars.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="rounded-[1.75rem] border border-border/60 bg-primary/[0.04] p-6 transition-colors hover:border-primary/40"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70">
                  {CONTENT_TYPE_LABELS[post.contentType]}
                </p>
                <h5 className="mt-3 text-xl font-semibold leading-snug text-foreground">
                  {post.title}
                </h5>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {guides.length > 0 && (
        <div className="space-y-5">
          <h4 className="text-lg font-semibold text-foreground">Cluster reads</h4>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function PillarTemplate({ post, headings, readingTime, resolvedImageUrl, childPosts }) {
  const blogPostingSchema = getBlogPostingSchema({
    ...post,
    readingTime,
    resolvedImageUrl,
    seo: { keywords: post.seoKeywords },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <JsonLd data={blogPostingSchema} id="blog-posting-schema" />

      <header className="border-b border-border/50 bg-[radial-gradient(circle_at_top,#e9f3ff,transparent_38%)] px-6 pb-14 pt-32">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs className="mb-8" currentLabel={post.title} />
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
              {CONTENT_TYPE_LABELS[post.contentType] || "Article"}
            </p>
            <h1 className="mt-5 font-serif text-5xl font-black leading-none tracking-tight sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-8">
              <MetaRow post={post} readingTime={readingTime} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-14 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-12">
          <ParentPillarCard parentPillar={post.parentPillar} />

          {post.coverImage && (
            <div className="overflow-hidden rounded-[2rem] border border-border/50">
              <Image
                src={urlFor(post.coverImage).width(1440).url()}
                alt={post.title}
                width={1440}
                height={720}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}

          <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-black prose-h2:mt-16 prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-4 prose-p:leading-8 prose-a:text-primary">
            <PortableText value={post.content || []} components={portableTextComponents} />
          </article>

          <CTASection items={post.relatedMoneyPages} />
          <PillarChildrenSection posts={childPosts} />
          <SiblingSection posts={post.siblingArticles} title="More from this topic cluster" />
          <Discussion slug={post.slug.current} title={post.title} />
        </div>

        <aside className="hidden space-y-8 lg:block">
          {headings.length > 0 && (
            <div className="sticky top-28 rounded-[2rem] border border-border/60 bg-background/80 p-6">
              <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">
                <LayoutList size={12} /> On this page
              </p>
              <TableOfContents headings={headings} />
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

function NewsTemplate({ post, readingTime, resolvedImageUrl }) {
  const blogPostingSchema = getBlogPostingSchema({
    ...post,
    readingTime,
    resolvedImageUrl,
    seo: { keywords: post.seoKeywords },
  });

  return (
    <div className="min-h-screen bg-[#fbf6ea] text-stone-900 dark:bg-[#15120e] dark:text-stone-100">
      <ScrollProgress />
      <JsonLd data={blogPostingSchema} id="blog-posting-schema" />

      <header className="border-b-2 border-stone-500/70 px-6 pb-10 pt-28 dark:border-stone-600">
        <div className="mx-auto max-w-[1400px]">
          <div className="border-y-2 border-stone-500/70 py-3 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-stone-700 dark:text-stone-300">
            SkillYards Daily Bulletin
          </div>

          <div>
            <Breadcrumbs className="mb-6 text-stone-700 dark:text-stone-300" currentLabel={post.title} />
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone-600 dark:text-stone-300">
              {CATEGORY_LABELS[post.category] || "Newsroom"}
            </p>
            <h1 className="mt-4 max-w-6xl font-serif text-5xl font-black leading-none sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-5xl text-xl leading-9 text-stone-700 dark:text-stone-300">
              {post.excerpt}
            </p>
            <div className="mt-7 border-t border-stone-400/60 pt-4">
              <MetaRow post={post} readingTime={readingTime} tone="news" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-12 sm:px-5 lg:px-6">
        {post.coverImage && (
          <figure className="mb-10 border-y border-stone-400/60 py-5 dark:border-stone-700">
            <div className="mx-auto max-w-3xl">
              <Image
                src={urlFor(post.coverImage).width(900).url()}
                alt={post.title}
                width={900}
                height={420}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </figure>
        )}

        <article className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 lg:border-r lg:border-stone-400/60 lg:pr-8 dark:lg:border-stone-700">
              <div className="mb-6 border-b border-stone-400/60 pb-4 dark:border-stone-700">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-600 dark:text-stone-300">
                  Main report
                </p>
              </div>
              <div className="prose prose-lg max-w-none columns-1 gap-8 prose-stone dark:prose-invert prose-headings:font-serif prose-headings:font-black prose-headings:break-after-avoid prose-p:my-4 prose-p:leading-7 prose-p:text-justify prose-p:[text-wrap:pretty] prose-a:text-stone-900 dark:prose-a:text-stone-100 prose-blockquote:border-l-stone-500 prose-blockquote:bg-transparent lg:columns-2">
                <PortableText value={post.content || []} components={portableTextComponents} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-stone-400/60 pb-4 dark:border-stone-700">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-600 dark:text-stone-300">
                  News notes
                </p>
              </div>

              {post.parentPillar && (
                <div className="rounded-[1.25rem] border border-stone-400/60 p-5 dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600 dark:text-stone-300">
                    Related coverage
                  </p>
                  <Link
                    href={`/blog/${post.parentPillar.slug}`}
                    className="mt-3 block font-serif text-xl font-bold leading-tight hover:underline"
                  >
                    {post.parentPillar.title}
                  </Link>
                </div>
              )}

              {post.tags?.length > 0 && (
                <div className="rounded-[1.25rem] border border-stone-400/60 p-5 dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600 dark:text-stone-300">
                    Topics
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={`side-${tag.slug}`}
                        className="rounded-full border border-stone-400/60 px-3 py-1 text-xs uppercase tracking-[0.16em] text-stone-700 dark:border-stone-600 dark:text-stone-300"
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-[1.25rem] border border-stone-400/60 bg-[#efe4cf] p-5 dark:border-stone-700 dark:bg-[#211a13]">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600 dark:text-stone-300">
                  Brief
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-700 dark:text-stone-300">
                  {post.excerpt}
                </p>
              </div>

              <CTASection items={post.relatedMoneyPages} />
            </div>
          </div>
        </article>

        <div className="mt-14 space-y-14">
          <SiblingSection posts={post.siblingArticles} title="More from newsroom" />
          <Discussion slug={post.slug.current} title={post.title} />
        </div>
      </main>
    </div>
  );
}

function ArticleTemplate({ post, headings, readingTime, resolvedImageUrl }) {
  const blogPostingSchema = getBlogPostingSchema({
    ...post,
    readingTime,
    resolvedImageUrl,
    seo: { keywords: post.seoKeywords },
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <ScrollProgress />
      <JsonLd data={blogPostingSchema} id="blog-posting-schema" />

      <header className="border-b border-border/50 bg-slate-50/50 px-6 pb-14 pt-32 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-4xl text-center">
          <Breadcrumbs className="mb-8 justify-center" currentLabel={post.title} />
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            {CONTENT_TYPE_LABELS[post.contentType] || "Article"}
          </span>
          <h1 className="mt-6 font-serif text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-8 flex justify-center">
            <MetaRow post={post} readingTime={readingTime} />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="max-w-3xl space-y-12">
          <ParentPillarCard parentPillar={post.parentPillar} />

          {post.coverImage && (
            <div className="overflow-hidden rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/5">
              <Image
                src={urlFor(post.coverImage).width(1200).url()}
                alt={post.title}
                width={1200}
                height={640}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}

          <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-black prose-h2:mt-16 prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-4 prose-p:leading-8 prose-a:text-primary prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:px-8 prose-blockquote:py-2 prose-code:text-primary">
            <PortableText value={post.content || []} components={portableTextComponents} />
          </article>

          <CTASection items={post.relatedMoneyPages} />
          <SiblingSection
            posts={post.siblingArticles}
            title="Continue this learning path"
          />
          <Discussion slug={post.slug.current} title={post.title} />
        </div>

        <aside className="hidden lg:flex lg:flex-col lg:gap-8">
          {headings.length > 0 && (
            <div className="sticky top-28 rounded-[2rem] border border-border/60 bg-white p-6 shadow-xl shadow-black/[0.03] dark:bg-white/[0.02]">
              <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">
                <LayoutList size={12} /> Table of contents
              </p>
              <TableOfContents headings={headings} />
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Post not found</p>
      </div>
    );
  }

  const children =
    post.contentType === "pillar-brand" || post.contentType === "pillar-sub"
      ? await getPillarChildren(slug)
      : [];

  const readingTime = calculateReadingTime(post.content);
  const headings = extractHeadings(post.content);
  const resolvedImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  if (post.contentType === "news") {
    return (
      <NewsTemplate
        post={post}
        readingTime={readingTime}
        resolvedImageUrl={resolvedImageUrl}
      />
    );
  }

  if (post.contentType === "pillar-brand" || post.contentType === "pillar-sub") {
    return (
      <PillarTemplate
        post={post}
        headings={headings}
        readingTime={readingTime}
        resolvedImageUrl={resolvedImageUrl}
        childPosts={children}
      />
    );
  }

  return (
    <ArticleTemplate
      post={post}
      headings={headings}
      readingTime={readingTime}
      resolvedImageUrl={resolvedImageUrl}
    />
  );
}
