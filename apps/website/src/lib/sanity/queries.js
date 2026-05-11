export const POSTS_QUERY = `
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,

  author->{
    name,
    image,
    role
  },

  "tags": tags[]->{
    title,
    "slug": slug.current
  }
}
`;

export const HOMEPAGE_POSTS_QUERY = `
*[_type == "post"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,

  author->{
    name,
    image,
    role
  },

  "tags": tags[]->{
    title,
    "slug": slug.current
  }
}
`;

export const POSTS_BY_TAG_QUERY = `
*[_type == "post" && $slug in tags[]->slug.current] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,

  author->{
    name,
    image,
    role
  },

  "tags": tags[]->{
    title,
    "slug": slug.current
  }
}
`;

export const BATCHES_QUERY = `
*[_type == "batch"] | order(order asc){
  program,
  nextBatch,
  duration,
  fee,
  emiAvailable,
  seatsLeft,
  ctaLink
}
`;
