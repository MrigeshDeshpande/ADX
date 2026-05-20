import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Discussion from "@/components/blog/Discussion";
import ScrollProgress from "@/components/blog/ScrollProgress";
import { isValidLinkedInUrl } from "@/lib/seo/core/isValidLinkedInUrl";
import RelatedMoneyPages from "@/components/blog/RelatedMoneyPages";
import SiblingArticles from "@/components/blog/SiblingArticles";
import TableOfContents from "@/components/TableOfContents";
import { urlFor } from "@/lib/sanity/image";
import { portableTextComponents } from "@/lib/sanity/portableTextComponents";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

function Masthead() {
  return (
    <div className="border-b-4 border-foreground pb-3 mb-1">
      <div className="border-b border-foreground mb-2" />
      <h1 className="font-serif text-center text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-none">
        SkillYards Times
      </h1>
      <div className="border-t border-foreground mt-2" />
      <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-foreground/60 mt-2">
        Media Coverage · Agra Edition · SkillYards News Desk
      </p>
    </div>
  );
}

function MetaRow({ post, readingTime }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/50 mt-4">
      <span>
        By{" "}
        <span className="text-foreground/70">
          {post.author?.name || "SkillYards Team"}
        </span>
      </span>
      <span aria-hidden="true" className="text-foreground/30">·</span>
      <span>{formatDate(post.publishedAt)}</span>
      <span aria-hidden="true" className="text-foreground/30">·</span>
      <span>{readingTime} min read</span>
    </div>
  );
}

function ProofSourceBox({ post }) {
  return (
    <div className="border-t-4 border-b border-foreground py-6 px-4 sm:px-8 mb-10 bg-[#f0ebe0] dark:bg-stone-900/30">
      <div className="flex flex-col gap-1 text-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-foreground/50 mb-3">
          Source Verification
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <span className="font-black text-foreground/70 uppercase tracking-wider text-xs">Originally covered in</span>
          <span className="font-serif font-bold text-foreground text-lg leading-tight">
            {post.sourceLanguage || "Hindi"} print media
          </span>
        </div>
        <div className="border-t border-foreground/10 pt-2 mt-2">
          <span className="font-black text-foreground/50 uppercase tracking-wider text-[10px]">Source:</span>{" "}
          <span className="font-serif font-bold text-foreground">{post.sourceName}</span>
          {" · "}
          <span className="font-black text-foreground/50 uppercase tracking-wider text-[10px]">Published:</span>{" "}
          <span className="font-serif text-foreground">{formatDate(post.sourceDate)}</span>
        </div>
        {post.sourceUrl && (
          <div className="mt-3">
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-serif text-sm font-black text-foreground underline hover:no-underline"
            >
              View Original Source &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function ClippingImageSection({ post, clippingImageUrl }) {
  if (!clippingImageUrl) return null;

  return (
    <section className="mb-12">
      <h2 className="font-serif text-xl font-black text-foreground mb-4 border-b-2 border-foreground pb-2">
        Original Newspaper Coverage
      </h2>
      <div className="bg-[#e8e2d8] dark:bg-stone-800/30 border-2 border-foreground/30 p-4 sm:p-6 shadow-lg">
        <figure>
          <div className="relative">
            <Image
              src={clippingImageUrl}
              alt={post.clippingImage?.alt || `${post.sourceName} newspaper clipping`}
              width={1200}
              height={900}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
          <figcaption className="mt-3 text-center text-xs font-serif italic text-foreground/60 leading-relaxed">
            Original {post.sourceLanguage || "Hindi"} newspaper clipping uploaded by SkillYards
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function EnglishSummaryBox({ summary }) {
  if (!summary) return null;

  return (
    <section className="mb-12 border-2 border-foreground/20 bg-[#faf6ee] dark:bg-stone-900/20 p-6 sm:p-8">
      <h2 className="font-serif text-xl font-black text-foreground mb-3 border-b border-foreground/20 pb-2">
        English Summary
      </h2>
      <p className="font-serif text-base leading-[1.9] text-foreground/85">
        {summary}
      </p>
    </section>
  );
}

function ArticleBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-serif text-xl font-black text-foreground mb-6 border-b-2 border-foreground/30 pb-3">
        Why This Coverage Matters
      </h2>
      <article className="
        prose dark:prose-invert max-w-none
        prose-headings:font-serif prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
        prose-h2:font-serif prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-foreground/20 prose-h2:pb-2
        prose-h3:font-serif prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:font-serif prose-p:text-base prose-p:leading-[2] prose-p:text-foreground/80 prose-p:my-5
        prose-li:font-serif prose-li:text-base prose-li:leading-[1.9]
        prose-strong:font-bold prose-strong:text-foreground
        prose-a:text-foreground prose-a:underline hover:prose-a:no-underline
        prose-blockquote:border-l-4 prose-blockquote:border-foreground/40 prose-blockquote:bg-foreground/5 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:rounded-none prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-foreground/80
        prose-img:rounded-lg prose-img:shadow-md
        prose-code:font-sans prose-code:text-foreground/70 prose-code:bg-foreground/5 prose-code:px-2 prose-code:py-0.5
      ">
        <PortableText value={content || []} components={portableTextComponents} />
      </article>
    </div>
  );
}

function AuthorSection({ post }) {
  const hasValidLinkedIn = isValidLinkedInUrl(post.author?.linkedinUrl);

  return (
    <div className="max-w-2xl mx-auto mt-16 pt-8 border-t-4 border-foreground">
      <div className="flex items-center gap-5">
        {post.author?.image ? (
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-foreground/30 flex-shrink-0">
            <Image
              src={urlFor(post.author.image).width(120).height(120).url()}
              alt=""
              aria-hidden="true"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-foreground/10 border-2 border-foreground/30 flex-shrink-0">
            <span className="font-serif font-black text-lg text-foreground">
              {post.author?.name?.charAt(0) || "S"}
            </span>
          </div>
        )}
        <div>
          <p className="font-serif text-lg font-black text-foreground">
            {post.author?.name || "SkillYards Team"}
          </p>
          {hasValidLinkedIn && (
            <a
              href={post.author.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-xs font-bold uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground mt-0.5"
            >
              LinkedIn &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function NewspaperSectionWrapper({ children, title }) {
  return (
    <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-foreground/20">
      {title && (
        <h2 className="font-serif text-xl font-black text-foreground mb-6 border-b-2 border-foreground/30 pb-2">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

export default function NewsArticleTemplate({ post, headings, readingTime, slug }) {
  const clippingImageUrl = post.clippingImage
    ? urlFor(post.clippingImage).width(1200).url()
    : null;

  return (
    <div className="min-h-screen bg-[#f7f0df] dark:bg-stone-950 text-foreground selection:bg-foreground/10">
      <style>{`
        @keyframes paper-reveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-paper { animation: paper-reveal 0.6s ease-out forwards; }
        .animate-paper-delay-1 { animation: paper-reveal 0.6s ease-out 0.15s forwards; opacity: 0; }
        .animate-paper-delay-2 { animation: paper-reveal 0.6s ease-out 0.3s forwards; opacity: 0; }
        .animate-paper-delay-3 { animation: paper-reveal 0.6s ease-out 0.45s forwards; opacity: 0; }
        .animate-paper-delay-4 { animation: paper-reveal 0.6s ease-out 0.6s forwards; opacity: 0; }
        .animate-paper-delay-5 { animation: paper-reveal 0.6s ease-out 0.75s forwards; opacity: 0; }
        .animate-paper-delay-6 { animation: paper-reveal 0.6s ease-out 0.9s forwards; opacity: 0; }
      `}</style>

      <ScrollProgress />

      <header className="w-full pt-16 pb-8 px-4 sm:px-6 bg-[#f7f0df] dark:bg-stone-950 animate-paper">
        <div className="max-w-3xl mx-auto">
          <Masthead />

          <Breadcrumbs
            className="justify-start mt-4 mb-8 text-[11px] font-bold uppercase tracking-wider"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "SkillYards Times", href: "/blog?type=news" },
              { label: post.title },
            ]}
          />

          <div className="animate-paper-delay-1">
            <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase text-white bg-foreground px-3 py-1.5 mb-6">
              Media Coverage
            </span>
          </div>

          <div className="animate-paper-delay-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-foreground mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-serif text-lg sm:text-xl leading-relaxed text-foreground/70 max-w-2xl mb-6">
                {post.excerpt}
              </p>
            )}
            <MetaRow post={post} readingTime={readingTime} />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="animate-paper-delay-3">
          <ProofSourceBox post={post} />
        </div>

        <div className="animate-paper-delay-4">
          <ClippingImageSection post={post} clippingImageUrl={clippingImageUrl} />
        </div>

        <div className="animate-paper-delay-5">
          <EnglishSummaryBox summary={post.englishSummary} />
        </div>

        <div className="animate-paper-delay-6">
          <ArticleBody content={post.content} />
        </div>

        <div className="max-w-2xl mx-auto mt-16 pt-8 border-t-4 border-foreground animate-paper-delay-6">
          <RelatedMoneyPages pages={post.relatedMoneyPages} />
        </div>

        <div className="max-w-2xl mx-auto mt-12 animate-paper-delay-6">
          <SiblingArticles articles={post.siblingArticles} />
        </div>

        <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-foreground/20 animate-paper-delay-6">
          <Discussion slug={slug} title={post.title} />
        </div>

        {headings.length > 0 && (
          <div className="max-w-2xl mx-auto mt-12 p-6 bg-[#eae4d8] dark:bg-stone-900/30 border border-foreground/20 animate-paper-delay-6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/50 mb-4">
              In this article
            </p>
            <TableOfContents headings={headings} />
          </div>
        )}

        <AuthorSection post={post} />
      </main>
    </div>
  );
}