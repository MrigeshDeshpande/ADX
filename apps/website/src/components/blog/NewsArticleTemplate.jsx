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

const formatDateFull = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const getHash = (str = "") =>
  [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0);

function Masthead({ post }) {
  const volNum = Math.abs(getHash(post.slug?.current || "news") % 120) + 1;
  const issueNum = Math.abs(getHash(post.title || "news") % 300) + 1;

  return (
    <div className="border-b-[4px] border-double border-foreground/80 pb-3 mb-8">
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-foreground/50 uppercase pb-1.5 select-none">
        <span>AGRA NEWSROOM</span>
        <span>MEMBER OF THE PRESS DISPATCH CO.</span>
      </div>
      <div className="border-t border-foreground/35 mb-2" />
      <h1 className="font-serif text-center text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-none uppercase select-none">
        SkillYards Times
      </h1>
      <div className="border-t border-foreground/35 mt-3" />
      
      <div className="border-b-[3px] border-t border-foreground/80 py-2 mt-2.5 flex flex-wrap justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase text-foreground/80">
        <div className="font-bold">Agra, India</div>
        <div className="font-bold py-1 sm:py-0">{formatDateFull(post.publishedAt)}</div>
        <div className="flex gap-2">
          <span>VOL. {volNum}</span>
          <span className="text-foreground/30">|</span>
          <span>NO. {issueNum}</span>
        </div>
        <div className="hidden md:block font-bold">RETAIL PRICE: FREE DISPATCH</div>
      </div>
    </div>
  );
}

function MetaRow({ post, readingTime }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-mono uppercase tracking-wider text-foreground/60 border-y border-foreground/10 py-3 my-6">
      <span className="font-bold text-foreground">
        BY {post.author?.name || "SkillYards Team"}
      </span>
      <span aria-hidden="true" className="text-foreground/30">·</span>
      <span>{formatDate(post.publishedAt)}</span>
      <span aria-hidden="true" className="text-foreground/30">·</span>
      <span>{readingTime} MIN READ</span>
      {post.category && (
        <>
          <span aria-hidden="true" className="text-foreground/30">·</span>
          <span className="bg-foreground/5 dark:bg-white/5 px-2 py-0.5 text-[9px] font-bold text-foreground/80 border border-foreground/10">
            {post.category.replace(/-/g, " ")}
          </span>
        </>
      )}
    </div>
  );
}

function ProofSourceBox({ post }) {
  return (
    <div className="border border-foreground/20 bg-[#faf6eb]/50 dark:bg-stone-900/10 p-5 relative overflow-hidden shadow-sm">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-foreground/20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-foreground/20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-foreground/20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-foreground/20" />

      <div className="absolute right-4 top-4 border border-dashed border-foreground/30 rounded-none px-2 py-0.5 text-[8px] font-mono font-bold rotate-[10deg] select-none uppercase tracking-wider text-foreground/50">
        Verified Copy
      </div>

      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-foreground/50 mb-3 border-b border-foreground/10 pb-1">
        VERIFICATION DOSSIER
      </p>

      <div className="flex flex-col gap-2 text-sm font-serif">
        <div>
          <span className="block font-mono text-[9px] uppercase tracking-widest text-foreground/45 leading-none mb-1">ORIGINAL COVERAGE</span>
          <span className="font-bold text-foreground text-base leading-tight">
            {post.sourceLanguage || "Hindi"} print media
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 border-t border-foreground/10 pt-2.5 mt-1">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-foreground/45 leading-none mb-0.5">SOURCE</span>
            <span className="font-bold text-foreground-dark font-serif text-sm">{post.sourceName}</span>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-foreground/45 leading-none mb-0.5">PUBLISHED</span>
            <span className="text-foreground text-sm">{formatDate(post.sourceDate)}</span>
          </div>
        </div>

        {post.sourceUrl && (
          <div className="mt-2.5 pt-2.5 border-t border-foreground/10">
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-foreground uppercase tracking-wider border-b border-foreground/40 hover:border-foreground transition-all pb-0.5"
            >
              View original e-paper &rarr;
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
    <div className="bg-[#faf6eb]/30 dark:bg-stone-900/5 border border-foreground/20 p-4 shadow-sm relative">
      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-foreground/50 mb-3 border-b border-foreground/10 pb-1.5">
        MEDIA EXHIBIT
      </p>
      
      <div className="bg-[#f0ebe0] dark:bg-stone-850 p-2.5 border border-foreground/15 shadow-inner">
        <figure className="relative">
          <Image
            src={clippingImageUrl}
            alt={post.clippingImage?.alt || `${post.sourceName} newspaper clipping`}
            width={1200}
            height={900}
            className="w-full h-auto object-contain brightness-[0.98] contrast-[1.02]"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
          <figcaption className="mt-3.5 text-center text-xs font-serif italic text-foreground/60 leading-relaxed border-t border-foreground/10 pt-2.5">
            Photographic archive: {post.sourceLanguage || "Hindi"} print cutting, source: {post.sourceName}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function EnglishSummaryBox({ summary }) {
  if (!summary) return null;

  return (
    <div className="border-4 border-double border-foreground/35 bg-[#faf6ee]/60 dark:bg-stone-900/20 p-5 sm:p-6 shadow-sm">
      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-foreground/50 mb-3 border-b border-foreground/15 pb-1">
        EDITORIAL DIGEST
      </p>
      <h3 className="font-serif text-lg font-bold text-foreground mb-3 leading-snug">
        Official Translation & Summary
      </h3>
      <p className="font-serif text-[14.5px] leading-[1.85] text-foreground/80 whitespace-pre-line">
        {summary}
      </p>
    </div>
  );
}

function ArticleBody({ content, publishedAt }) {
  return (
    <div className="max-w-none">
      <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-foreground/50 mb-4 border-b border-foreground/15 pb-1">
        CORRESPONDENT ANALYSIS & DETAILS
      </h3>
      
      {/* Dateline */}
      <div className="font-mono text-[11px] font-bold tracking-wider text-foreground mb-3 uppercase">
        AGRA, UP —
      </div>

      <article className="
        news-prose prose dark:prose-invert max-w-none
        prose-headings:font-serif prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-foreground
        prose-h2:font-serif prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-foreground/15 prose-h2:pb-2
        prose-h3:font-serif prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:font-serif prose-p:text-base prose-p:leading-[1.95] prose-p:text-foreground/85 prose-p:my-5 prose-p:text-justify
        prose-li:font-serif prose-li:text-base prose-li:leading-[1.85]
        prose-strong:font-bold prose-strong:text-foreground
        prose-a:text-foreground prose-a:underline prose-a:decoration-foreground/30 hover:prose-a:decoration-foreground transition-all
        prose-blockquote:border-l-4 prose-blockquote:border-foreground/35 prose-blockquote:bg-foreground/5 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:rounded-none prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-foreground/85 prose-blockquote:border-y prose-blockquote:border-r prose-blockquote:border-foreground/10
        prose-img:rounded-none prose-img:border prose-img:border-foreground/20 prose-img:p-1 prose-img:shadow-sm
        prose-code:font-mono prose-code:text-foreground/75 prose-code:bg-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
      ">
        <PortableText value={content || []} components={portableTextComponents} />
      </article>
    </div>
  );
}

function AuthorSection({ post }) {
  const hasValidLinkedIn = isValidLinkedInUrl(post.author?.linkedinUrl);

  return (
    <div className="mt-16 pt-8 border-t-4 border-double border-foreground/35">
      <div className="flex items-start gap-4">
        {post.author?.image ? (
          <div className="w-12 h-12 rounded-none border border-foreground/30 flex-shrink-0 p-[2px] bg-background">
            <div className="w-full h-full relative border border-foreground/10 overflow-hidden">
              <Image
                src={urlFor(post.author.image).width(120).height(120).url()}
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                className="object-cover w-full h-full filter grayscale contrast-125"
              />
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-none flex items-center justify-center bg-foreground/10 border border-foreground/30 flex-shrink-0">
            <span className="font-serif font-bold text-lg text-foreground">
              {post.author?.name?.charAt(0) || "S"}
            </span>
          </div>
        )}
        <div className="flex-1">
          <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/45 leading-none mb-1">REPORTER BYLINE</p>
          <h4 className="font-serif text-lg font-bold text-foreground leading-tight">
            {post.author?.name || "SkillYards Team"}
          </h4>
          <p className="font-serif text-xs text-foreground/60 mt-0.5 leading-relaxed">
            {post.author?.role || "Education Lead"} · Special Correspondent in Agra
          </p>
          {post.author?.shortBio && (
            <p className="font-serif text-xs text-foreground/70 mt-2 leading-relaxed text-justify max-w-xl">
              {post.author.shortBio}
            </p>
          )}
          {hasValidLinkedIn && (
            <a
              href={post.author.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-[10px] font-mono font-bold uppercase tracking-wider text-foreground border-b border-foreground/30 hover:border-foreground mt-3 transition-colors pb-0.5"
            >
              LinkedIn Profile &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewsArticleTemplate({ post, headings, readingTime, slug }) {
  const clippingImageUrl = post.clippingImage
    ? urlFor(post.clippingImage).width(1200).url()
    : null;

  return (
    <div className="min-h-screen bg-[#faf6eb] dark:bg-[#121212] text-foreground selection:bg-foreground/10 pb-24">
      {/* Newspaper Drop-cap style and animations */}
      <style>{`
        @keyframes paper-reveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-paper { animation: paper-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-paper-delay-1 { animation: paper-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .animate-paper-delay-2 { animation: paper-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .animate-paper-delay-3 { animation: paper-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        
        /* Drop Cap effect */
        .news-prose p:first-of-type::first-letter {
          float: left;
          font-size: 3.75rem;
          line-height: 0.82;
          font-weight: 900;
          margin-right: 0.5rem;
          margin-top: 0.2rem;
          font-family: var(--font-serif), Georgia, serif;
          color: inherit;
        }
      `}</style>

      <ScrollProgress />

      <header className="w-full pt-28 sm:pt-32 lg:pt-36 pb-4 px-4 sm:px-6 md:px-8 bg-[#faf6eb] dark:bg-[#121212] animate-paper">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs
            className="justify-start mb-6 text-[10px] font-mono uppercase tracking-wider text-foreground/50"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Times Media", href: "/blog?type=news" },
              { label: post.title },
            ]}
          />
          <Masthead post={post} />
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-foreground/20 min-h-[900px]">
          
          {/* COLUMN 1: LEFT SECTION (Active Story Dispatch) */}
          <div className="lg:col-span-4 pr-0 lg:pr-8 space-y-8 animate-paper-delay-1 pb-8 lg:pb-0">
            
            {/* Headlines Section */}
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-primary font-bold mb-2.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 bg-primary" />
                Special Dispatch · {post.newsType || "Media Feature"}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground mb-4">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="font-serif text-[15px] leading-relaxed text-foreground/75 italic border-l-[3px] border-foreground/30 pl-3 py-0.5 my-4">
                  {post.excerpt}
                </p>
              )}

              <MetaRow post={post} readingTime={readingTime} />
            </div>

            {/* Press Clipping Graphic */}
            <ClippingImageSection post={post} clippingImageUrl={clippingImageUrl} />

            {/* Source Validation Dossier */}
            <ProofSourceBox post={post} />

            {/* English Synopsis Box */}
            <EnglishSummaryBox summary={post.englishSummary} />

            {/* Article Content */}
            <ArticleBody content={post.content} publishedAt={post.publishedAt} />

            {/* Document Outline Index */}
            {headings.length > 0 && (
              <div className="p-5 bg-[#faf6ee]/40 dark:bg-stone-900/10 border border-foreground/15">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-foreground/50 mb-3 border-b border-foreground/15 pb-1">
                  IN THIS BRIEF
                </p>
                <TableOfContents headings={headings} />
              </div>
            )}

            {/* related internal links - styled as extra press briefs */}
            <RelatedMoneyPages pages={post.relatedMoneyPages} />

            {/* Sibling Articles - styled as more items from current dispatch */}
            <SiblingArticles articles={post.siblingArticles} />

            {/* Author Attribution */}
            <AuthorSection post={post} />
          </div>

          {/* COLUMN 2: BIG MIDDLE SECTION (Blank / Staged for next news story) */}
          <div className="lg:col-span-5 px-0 lg:px-8 space-y-6 pt-8 lg:pt-0 flex flex-col justify-start animate-paper-delay-2 select-none pb-8 lg:pb-0">
            {/* Running Editorial Header */}
            <div className="border-b-2 border-double border-foreground/30 pb-2.5 mb-2">
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-foreground/45 uppercase">
                <span>SkillYards Times Gazette</span>
                <span>Section B</span>
              </div>
            </div>
            
            {/* Faint elegant blank column layout with newspaper quote and layout motif */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-dashed border-foreground/15 min-h-[450px] bg-[#faf6eb]/10 dark:bg-stone-900/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#80808008_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              <div className="max-w-md space-y-4 relative z-10">
                <div className="font-serif text-3xl font-black text-foreground/10 tracking-widest uppercase">
                  Main Story B
                </div>
                <div className="w-12 h-[1px] bg-foreground/15 mx-auto" />
                <p className="font-serif text-xs text-foreground/35 leading-relaxed uppercase tracking-wider">
                  This column is reserved for subsequent editorial dispatches.
                </p>
                <p className="font-serif text-[11px] italic text-foreground/30 leading-relaxed px-4">
                  "Education is the progressive discovery of our own ignorance."<br />
                  — Will Durant
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 3: RIGHT SECTION (Blank / Advertisement / Ad placement) */}
          <div className="lg:col-span-3 pl-0 lg:pl-8 space-y-6 pt-8 lg:pt-0 flex flex-col justify-between animate-paper-delay-3">
            {/* Running Editorial Header */}
            <div className="flex flex-col space-y-6 flex-1">
              <div className="border-b-2 border-double border-foreground/30 pb-2.5 mb-2 select-none">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-foreground/45 uppercase">
                  <span>Economic Register</span>
                  <span>Page C-1</span>
                </div>
              </div>
              
              {/* Clean blank column outline */}
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border border-dashed border-foreground/15 min-h-[250px] bg-[#faf6eb]/10 dark:bg-stone-900/5 select-none relative">
                <div className="max-w-xs space-y-3">
                  <div className="font-serif text-xl font-bold text-foreground/10 tracking-wider uppercase">
                    Dispatch C
                  </div>
                  <div className="w-8 h-[1px] bg-foreground/15 mx-auto" />
                  <p className="font-serif text-[10px] text-foreground/30 leading-relaxed uppercase tracking-wider">
                    Column open for press bulletins.
                  </p>
                </div>
              </div>
            </div>

            {/* Print Ad Placement Mockup (tasteful context-relevant CTA) */}
            <div className="border border-foreground/20 p-5 text-center relative overflow-hidden bg-foreground text-background mt-auto">
              <p className="text-[8px] font-mono tracking-widest text-background/50 uppercase mb-4">Advertisement</p>
              <h4 className="font-serif text-lg font-black leading-snug mb-2 uppercase tracking-wide">Launch Your IT Career</h4>
              <p className="text-xs font-serif text-background/85 mb-5 leading-relaxed">
                Enroll in SkillYards premium technology & corporate training programs in Agra. 100% placement support.
              </p>
              <a
                href="/programs"
                className="inline-flex h-9 items-center justify-center border border-background bg-background text-foreground text-[10px] font-mono tracking-widest uppercase px-6 hover:bg-background/95 transition-colors font-bold w-full"
              >
                Request Prospectus &rarr;
              </a>
            </div>
          </div>
          
        </div>
      </main>

      {/* Discussion Thread - Placed outside the newspaper grid for optimal height management */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-20 pt-10 border-t-2 border-double border-foreground/30 animate-paper-delay-3">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-foreground/50 mb-6 border-b border-foreground/15 pb-1 select-none">
          DISPATCH COMMENTS / PUBLIC FORUM
        </h3>
        <Discussion slug={slug} title={post.title} />
      </section>
    </div>
  );
}