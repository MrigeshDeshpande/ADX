const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  contentType,
  category,
  "parentPillar": parentPillar->{
    title,
    "slug": slug.current,
    contentType
  },
  author->{
    name,
    image,
    role
  },
  "tags": tags[]->{
    title,
    "slug": slug.current
  }
`;

export const POSTS_QUERY = `
*[_type == "post"] | order(publishedAt desc){
${POST_CARD_FIELDS}
}
`;

export const HOMEPAGE_POSTS_QUERY = `
*[_type == "post"] | order(publishedAt desc)[0...3]{
${POST_CARD_FIELDS}
}
`;

export const POST_BY_SLUG_QUERY = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  _updatedAt,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  content,
  contentType,
  seoTitle,
  seoKeywords,
  category,
  noIndex,
  author->{
    name,
    image,
    role
  },
  "tags": tags[]->{
    title,
    "slug": slug.current
  },
  "parentPillar": parentPillar->{
    _id,
    title,
    "slug": slug.current,
    contentType
  },
  relatedMoneyPages[]{
    title,
    path,
    linkContext
  },
  "siblingArticles": siblingArticles[]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    contentType,
    category,
    author->{
      name,
      image,
      role
    }
  }
}
`;

export const PILLAR_CHILDREN_QUERY = `
*[_type == "post" && defined(parentPillar->slug.current) && parentPillar->slug.current == $slug]
| order(contentType asc, publishedAt desc){
${POST_CARD_FIELDS}
}
`;

export const FEATURED_PILLARS_QUERY = `
*[_type == "post" && contentType in ["pillar-brand", "pillar-sub"]]
| order(publishedAt desc)[0...4]{
${POST_CARD_FIELDS}
}
`;

export const NEWS_POSTS_QUERY = `
*[_type == "post" && contentType == "news"]
| order(publishedAt desc)[0...4]{
${POST_CARD_FIELDS}
}
`;

export const BATCHES_QUERY = `
*[_type == "batch"] | order(order asc){
  program,
  nextBatch,
  duration,
  fee,
  image,
  emiAvailable,
  seatsLeft,
  ctaLink
}
`;
