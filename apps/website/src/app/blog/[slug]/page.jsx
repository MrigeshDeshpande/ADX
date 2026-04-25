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

const CalendarIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

async function getPost(slug) {
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
    return sanityClient.fetch(query, { slug });
}

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
    });
}
export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center transition-colors duration-300">
                <p className="text-muted-foreground text-lg">Post not found</p>
            </div>
        );
    }

    const readingTime = calculateReadingTime(post.content);
    const headings = extractHeadings(post.content);
    const blogPostingSchema = getBlogPostingSchema({ ...post, readingTime });

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <JsonLd data={blogPostingSchema} id="blog-posting-schema" />
            <header className="relative w-full bg-muted/30 border-b border-border pt-24 pb-12 px-6 transition-colors duration-300">
                <div className="max-w-6xl mx-auto">

                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
                        Blog Article
                    </span>

                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground max-w-4xl mb-8">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <span className="text-lg">✍️</span>
                            <span>
                                By{" "}
                                <strong className="text-foreground font-semibold">
                                    {post.author?.name || "SkillYards Team"}
                                </strong>
                                {post.author?.role && (
                                    <span className="text-muted-foreground font-normal">
                                        {" "}• {post.author.role}
                                    </span>
                                )}
                            </span>
                        </span>
                        <span className="text-border hidden sm:inline">•</span>
                        <span className="flex items-center gap-2">
                            <CalendarIcon />
                            <span>
                                {post.publishedAt &&
                                    new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                            </span>
                        </span>
                        <span className="text-border hidden sm:inline">•</span>
                        <span className="flex items-center gap-2">
                            <ClockIcon />
                            <span>{readingTime} min read</span>
                        </span>
                    </div>

                    <div className="mt-8">
                        <Breadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Blog", href: "/blog" },
                                { label: post.title.slice(0, 30) + "..." },
                            ]}
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">

                    <div className="max-w-3xl mx-auto lg:mx-0 w-full">
                        {post.coverImage && (
                            <div className="mb-14 rounded-3xl overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/40 border border-border/50">
                                <Image
                                    src={urlFor(post.coverImage).width(1200).url()}
                                    alt={post.title}
                                    width={1400}
                                    height={600}
                                    className="w-full aspect-16/7 md:aspect-2/1 object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <article
                            className="
                                prose dark:prose-invert max-w-none
                                prose-headings:font-serif
                                prose-headings:font-bold
                                prose-headings:tracking-tight
                                prose-headings:text-foreground
                                prose-h2:text-2xl
                                prose-h2:mt-12
                                prose-h2:mb-4
                                prose-h2:pb-3
                                prose-h2:border-b
                                prose-h2:border-border
                                prose-h3:text-xl
                                prose-h3:mt-8
                                prose-h3:mb-3
                                prose-h3:text-foreground
                                prose-p:text-muted-foreground
                                prose-p:leading-relaxed
                                prose-p:my-6
                                prose-li:text-muted-foreground
                                prose-li:leading-relaxed
                                prose-ul:my-6
                                prose-ul:space-y-2
                                prose-li:marker:text-primary
                                prose-strong:text-foreground
                                prose-strong:font-semibold
                                prose-a:text-primary
                                prose-a:no-underline
                                hover:prose-a:underline
                                prose-code:text-primary
                                prose-code:bg-primary/10
                                prose-code:px-2
                                prose-code:py-1
                                prose-code:rounded-md
                                prose-blockquote:border-l-primary
                                prose-blockquote:text-muted-foreground
                                prose-blockquote:bg-muted/30
                                prose-blockquote:px-6
                                prose-blockquote:py-2
                                prose-blockquote:rounded-r-xl
                                prose-blockquote:font-normal
                                prose-blockquote:italic
                                prose-img:rounded-2xl
                                prose-img:shadow-lg
                            "
                        >
                            <PortableText
                                value={post.content || []}
                                components={portableTextComponents}
                            />
                        </article>

                        <section className="relative mt-20 rounded-3xl bg-linear-to-br from-primary/10 to-transparent border border-primary/20 p-10 overflow-hidden transition-colors duration-300">
                            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Get Skill Tips Weekly</h3>
                            <p className="text-base text-muted-foreground mb-8">Join thousands learning AI & career skills straight to their inbox.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    suppressHydrationWarning
                                    className="
                                        flex-1 rounded-2xl px-5 py-3.5 text-base
                                        bg-background
                                        border border-border
                                        text-foreground
                                        placeholder-muted-foreground
                                        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                                        transition-all duration-200
                                    "
                                />
                                <button className="bg-foreground hover:bg-foreground/90 transition-colors text-background text-base font-semibold px-8 py-3.5 rounded-2xl whitespace-nowrap">
                                    Subscribe Now
                                </button>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
                        </section>

                        <div className="mt-12 border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Discussion</h3>
                            <Comments />
                        </div>
                    </div>

                    <aside className="hidden lg:flex flex-col gap-8 sticky top-32 self-start max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide pb-10">

                        <div className="shrink-0 rounded-3xl border border-border bg-muted/30 p-6 transition-colors duration-300">

                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
                                Author
                            </p>

                            <div className="flex items-center gap-4 mb-4">

                                <div className="w-14 h-14 rounded-full overflow-hidden border border-primary/20 shrink-0">
                                    {post.author?.image ? (
                                        <Image
                                            src={urlFor(post.author.image).width(100).height(100).url()}
                                            alt={post.author.name}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                                            {post.author?.name?.charAt(0) || "S"}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <p className="font-serif font-bold text-foreground text-base leading-tight">
                                        {post.author?.name || "SkillYards Team"}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {post.author?.role || "Content Team"}
                                    </p>
                                </div>

                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Insights from the SkillYards team on technology, education and career growth.
                            </p>

                        </div>

                        {headings.length > 0 && (
                            <div className="shrink-0 rounded-3xl border border-border bg-muted/30 p-6 transition-colors duration-300">
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
                                    Table of Contents
                                </p>
                                <TableOfContents headings={headings} />
                            </div>
                        )}

                        <div className="shrink-0 rounded-4xl border border-border bg-muted/30 p-8 text-center transition-colors duration-300 flex flex-col items-center justify-center min-h-[200px]">
                            <p className="font-serif text-xl font-bold text-foreground mb-2">Upgrade Your Skills</p>
                            <p className="text-sm text-muted-foreground mb-6">Join SkillYards programs and get job-ready faster.</p>
                            <a
                                href="/programs"
                                className="inline-block bg-primary hover:bg-primary/90 transition-colors text-primary-foreground text-sm font-semibold px-6 py-3 rounded-xl w-full"
                            >
                                Explore Programs
                            </a>
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    );
}