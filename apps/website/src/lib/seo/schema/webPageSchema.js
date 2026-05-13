import { ORGANIZATION_ID, WEBSITE_ID } from "./global.js";
import { absoluteUrl, withFragment } from "../core/url.js";

export const getWebPageSchema = (page) => {
  if (!page) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": withFragment(absoluteUrl(page.url), "#webpage"),
    url: absoluteUrl(page.url),
    name: page.name,
    ...(page.description && { description: page.description }),
    ...(page.keywords && { keywords: page.keywords }),
    isPartOf: {
      "@id": WEBSITE_ID
    },
    about: {
      "@id": ORGANIZATION_ID
    }
  };
};

export const getAboutPageSchema = (page) => {
  if (!page) return null;
  return {
    ...getWebPageSchema(page),
    "@type": ["WebPage", "AboutPage"],
  };
};

export const getContactPageSchema = (page) => {
  if (!page) return null;
  return {
    ...getWebPageSchema(page),
    "@type": ["WebPage", "ContactPage"],
  };
};

export const getCollectionPageSchema = (page) => {
  if (!page) return null;
  return {
    ...getWebPageSchema(page),
    "@type": ["WebPage", "CollectionPage"]
  };
};

export const getImageGallerySchema = (page) => {
  if (!page) return null;
  return {
    ...getWebPageSchema(page),
    "@type": ["WebPage", "ImageGallery"]
  };
};

export const getVideoGallerySchema = (page) => {
  if (!page) return null;
  return {
    ...getWebPageSchema(page),
    "@type": ["WebPage", "VideoGallery"]
  };
};
