import { ORGANIZATION_ID, PRIMARY_LOCATION_ID } from "./global.js";
import { absoluteAssetUrl, absoluteUrl, withFragment } from "../core/url.js";

export const getCourseSchema = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",

  "@id": withFragment(absoluteUrl(course.seo.path), "#course"),

  name: course.title,
  description: course.description,
  keywords: course.seo?.keywords || [
    "industrial training",
    "On Job Training",
    "professional certification",
    course.title
  ],

  provider: {
    "@id": ORGANIZATION_ID,
  },

  isPartOf: {
    "@type": "EducationalOccupationalProgram",
    name: course.title,
    description: course.description,
    occupationalCategory: course.category || "Information Technology",
    educationalCredentialAwarded: "Certificate of Completion",
    provider: {
      "@id": ORGANIZATION_ID,
    }
  },

  image: course.seo?.ogImage
    ? absoluteAssetUrl(course.seo.ogImage)
    : absoluteAssetUrl("/images/opengraph/fullstack-og.jpg"),

  educationalLevel: "Beginner to Advanced",
  inLanguage: "en",
  ...(course.certification && {
    educationalCredentialAwarded: [{
      "@type": "EducationalOccupationalCredential",
      name: course.certification,
      credentialCategory: "Certificate"
    }]
  }),

  hasCourseInstance: {
    "@type": "CourseInstance",

    courseMode: "offline",

    location: {
      "@id": PRIMARY_LOCATION_ID,
    },

    ...(course.startDate && {
      startDate: new Date(course.startDate).toISOString().split("T")[0],
    }),
  },


  offers: {
    "@type": "Offer",
    category: "Professional Training",
    availability: "https://schema.org/InStock",
    price: "0",
    url: absoluteUrl(course.seo.path),
    priceCurrency: "INR",
  },
});
