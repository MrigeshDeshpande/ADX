import { ORGANIZATION_ID } from "./global.js";
import { absoluteAssetUrl, absoluteUrl, withFragment } from "../core/url.js";

export const getBlogPostingSchema = (post) => {
  if (!post) return null;

  const slug = post.slug?.current || post.slug;
  const postUrl = absoluteUrl(`/blog/${slug}`);
  const category =
    typeof post.category === "string"
      ? post.category.replace(/-/g, " ")
      : post.category?.title || "Technology";
  const keywords = post.seo?.keywords || post.seoKeywords || [
    "SkillYards",
    "tech tutorials",
    "career advice",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": withFragment(postUrl, "#blogposting"),
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl
    },
    headline: post.title,
    ...(post.resolvedImageUrl && {
      image: {
        "@type": "ImageObject",
        url: post.resolvedImageUrl,
        width: 1200,
        height: 630
      }
    }),
    datePublished: post.publishedAt || new Date().toISOString(),
    dateModified: post._updatedAt || post.publishedAt || new Date().toISOString(),
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: post.author?.name || "SkillYards Team"
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "SkillYards",
      logo: {
        "@type": "ImageObject",
        url: absoluteAssetUrl("/images/logo-dark.png")
      }
    },
    keywords,
    articleSection: category,
    ...(post.excerpt && { description: post.excerpt }),
    ...(typeof post.readingTime === "number" && { timeRequired: `PT${post.readingTime}M` }),
    ...(typeof post.wordCount === "number" && { wordCount: post.wordCount }),
  };
};

export const getBlogSchema = (posts) => {
  const safePosts = Array.isArray(posts) ? posts : [];
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": withFragment(absoluteUrl("/blog"), "#blog"),
    name: "SkillYards Blog",
    description: "Read the latest news, tutorials, and insights regarding technology and careers from SkillYards.",
    publisher: {
      "@id": ORGANIZATION_ID
    },
    ...(safePosts.length > 0 && {
      blogPost: safePosts.map((p) => ({
        "@id": withFragment(absoluteUrl(`/blog/${p.slug?.current || p.slug}`), "#blogposting")
      }))
    })
  };
};
