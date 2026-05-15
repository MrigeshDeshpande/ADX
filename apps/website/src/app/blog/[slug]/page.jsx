import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";
import { calculateReadingTime } from "@/lib/sanity/readingTime";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import { extractHeadings } from "@/lib/sanity/slugifyHeading";
import { portableTextComponents } from "@/lib/sanity/portableTextComponents";
import Image from "next/image";
import Comments from "@/components/blog/Comments";
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getBlogPostingSchema } from "@/lib/seo/schema/blogPostingSchema";
import { Calendar, Clock, User, Share2, LayoutList } from "lucide-react";
import ScrollProgress from "@/components/blog/ScrollProgress";
import { cache } from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
    const slugs = await sanityClient.fetch(
        `*[_type == "post"]{ "slug": slug.current }`,
        {},
        { next: { revalidate: 3600 } }
    );
    return slugs.map((p) => ({ slug: p.slug }));
}

const getPost = cache(async (slug) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  content,
  author->{
    name,
    image,
    role
  }
}`;
    return sanityClient.fetch(query, { slug }, { next: { revalidate: 3600 } });
});

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

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

    return buildSEO({
        title: post.title,
        description: cleanDescription,
        path: `/blog/${post.slug?.current || slug}`,
        keywords: [
            post.title,
            post.author?.name,
            "SkillYards blog",
            "IT learning",
        ].filter(Boolean),
        ogImage: imageUrl,
        ogType: "article",
    });
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground text-lg">Post not found</p>
            </div>
        );
    }

    const readingTime = calculateReadingTime(post.content);
    const headings = extractHeadings(post.content);
    const resolvedImageUrl = post.coverImage
        ? urlFor(post.coverImage).width(1200).height(630).url()
        : undefined;
    const blogPostingSchema = getBlogPostingSchema({ ...post, readingTime, resolvedImageUrl });

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <ScrollProgress />
            <JsonLd data={blogPostingSchema} id="blog-posting-schema" />
            
            {/* Centered Hero Header */}
            <header className="relative w-full pt-32 pb-16 px-6 overflow-hidden border-b border-border/50 bg-slate-50/50 dark:bg-white/[0.02]">
                {/* Checkered BG Pattern */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <Breadcrumbs
                        className="justify-center mb-8"
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Blog", href: "/blog" },
                            { label: post.title.slice(0, 20) + "..." },
                        ]}
                    />

                    <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-6 border border-primary/20">
                        <Share2 size={10} /> Blog Article
                    </span>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-foreground mb-10 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60 dark:from-white dark:to-white/60">
                        {post.title}
                    </h1>

                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 shadow-xl bg-background p-1">
                            <div className="w-full h-full rounded-full overflow-hidden border border-border/50">
                                {post.author?.image ? (
                                    <Image
                                        src={urlFor(post.author.image).width(120).height(120).url()}
                                        alt={post.author.name}
                                        width={56}
                                        height={56}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-black text-lg">
                                        {post.author?.name?.charAt(0) || "S"}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                            <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                            <span className="w-1 h-1 rounded-full bg-primary/30" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">
                    
                    <div className="w-full max-w-3xl mx-auto lg:mx-0">
                        {/* Cover Image */}
                        {post.coverImage && (
                            <div className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/40 border border-border/50 relative group">
                                <Image
                                    src={urlFor(post.coverImage).width(1200).url()}
                                    alt={post.title}
                                    width={1200}
                                    height={600}
                                    className="w-full aspect-16/9 object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        )}

                        <article className="
                            prose dark:prose-invert max-w-none
                            prose-headings:font-serif prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
                            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border/50
                            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
                            prose-p:text-muted-foreground/90 prose-p:leading-[1.8] prose-p:text-lg prose-p:my-8
                            prose-li:text-muted-foreground/90 prose-li:text-lg prose-li:leading-relaxed
                            prose-strong:text-foreground prose-strong:font-bold
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-8 prose-blockquote:py-2 prose-blockquote:rounded-r-3xl prose-blockquote:not-italic prose-blockquote:text-foreground
                            prose-img:rounded-[2rem] prose-img:shadow-xl
                            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                        ">
                            <PortableText value={post.content || []} components={portableTextComponents} />
                        </article>

                        {/* Newsletter Block */}
                        <section className="mt-24 rounded-[3rem] bg-slate-50 dark:bg-white/[0.02] border border-border/50 p-8 md:p-12 relative overflow-hidden">
                            <div className="relative z-10 max-w-xl">
                                <h3 className="font-serif text-3xl font-black text-foreground mb-3">Skill Up Weekly.</h3>
                                <p className="text-muted-foreground text-lg mb-8">Join 5,000+ students receiving career tips and tech insights every Monday.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="flex-1 h-14 rounded-2xl px-6 bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                    <button className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-black text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                                        Join Now
                                    </button>
                                </div>
                            </div>
                            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                        </section>

                        <div className="mt-20 border-t border-border/50 pt-10">
                            <h3 className="text-2xl font-serif font-black mb-8 flex items-center gap-3">
                                <span className="p-2 bg-primary/10 rounded-xl text-primary">
                                    <Share2 size={20} />
                                </span>
                                Discussion
                            </h3>
                            <Comments />
                        </div>
                    </div>

                    {/* Sidebar Aside */}
                    <aside className="hidden lg:flex flex-col gap-8 sticky top-32 self-start">
                        
                        {/* Author Card */}
                        <div className="rounded-[2.5rem] border border-border/50 bg-white dark:bg-white/[0.02] p-8 backdrop-blur-md shadow-xl shadow-black/[0.02]">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6">Article Author</p>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border shadow-sm">
                                    {post.author?.image ? (
                                        <Image
                                            src={urlFor(post.author.image).width(100).height(100).url()}
                                            alt={post.author.name}
                                            width={64}
                                            height={64}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                                            {post.author?.name?.charAt(0) || "S"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-serif text-lg font-black text-foreground leading-tight">{post.author?.name || "SkillYards Team"}</h4>
                                    <p className="text-xs font-bold text-muted-foreground mt-1">{post.author?.role || "Education Lead"}</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground/90 leading-relaxed font-medium">Expert insights on career growth and modern technology trends.</p>
                        </div>

                        {/* TOC Card */}
                        {headings.length > 0 && (
                            <div className="rounded-[2.5rem] border border-border/50 bg-white dark:bg-white/[0.02] p-8 backdrop-blur-md shadow-xl shadow-black/[0.02]">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6 flex items-center gap-2">
                                    <LayoutList size={12} /> Table of Contents
                                </p>
                                <TableOfContents headings={headings} />
                            </div>
                        )}

                        {/* Promo Card */}
                        <div className="rounded-[2.5rem] bg-primary p-8 text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/20">
                            <div className="relative z-10">
                                <h4 className="font-serif text-2xl font-black leading-tight mb-3">Launch Your Career.</h4>
                                <p className="text-primary-foreground/80 text-sm font-medium mb-6 leading-relaxed">Join our high-impact training programs in Agra.</p>
                                <a href="/programs" className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white text-primary text-xs font-black tracking-widest uppercase hover:bg-slate-50 transition-colors">
                                    Explore Courses
                                </a>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    );
}
