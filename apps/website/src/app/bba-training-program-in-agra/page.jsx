import dynamic from "next/dynamic";
import { buildSEO } from "@/lib/seo/buildSEO";
import { absoluteUrl, withFragment, absoluteAssetUrl } from "@/lib/seo/core/url";
import { ORGANIZATION_ID, PRIMARY_LOCATION_ID, WEBSITE_ID } from "@/lib/seo/schema/global";

export const revalidate = 86400;
const BBALandingPage = dynamic(() => import("@/components/landingPageBBA/LandingPage").then(m => m.LandingPage));
import JsonLd from "@/components/JsonLd";
import { courses } from "@/data/courses";

const course = courses.bba;

export const metadata = buildSEO({
  ...course.seo,
  path: "/bba-training-program-in-agra",
});

function buildCourseSchema(course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": withFragment(absoluteUrl(course.seo.path), "#course"),
    name: course.title,
    description: course.description,
    keywords: course.seo?.keywords || ["BBA program", "digital marketing", course.title],
    provider: { "@id": ORGANIZATION_ID },
    isPartOf: {
      "@type": "EducationalOccupationalProgram",
      name: course.title,
      description: course.description,
      occupationalCategory: "Business Administration",
      educationalCredentialAwarded: "Bachelor of Business Administration",
      provider: { "@id": ORGANIZATION_ID },
    },
    image: course.seo?.ogImage
      ? absoluteAssetUrl(course.seo.ogImage)
      : absoluteAssetUrl("/images/opengraph/bba-og.jpg"),
    educationalLevel: "Undergraduate",
    inLanguage: "en",
    educationalCredentialAwarded: "Bachelor of Business Administration",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "offline",
      location: { "@id": PRIMARY_LOCATION_ID },
      startDate: "2026-08",
    },
  };
}

function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
    })),
  };
}

function buildWebPageSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": withFragment(absoluteUrl(page.url), "#webpage"),
    url: absoluteUrl(page.url),
    name: page.name,
    ...(page.description && { description: page.description }),
    ...(page.keywords && { keywords: page.keywords }),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

const courseSchema = buildCourseSchema(course);
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Programs", url: "/programs" },
  { name: "On Job Degree", url: "/programs/on-job-degree" },
  { name: "BBA with Digital Marketing", url: "/bba-training-program-in-agra" },
]);
const webPageSchema = buildWebPageSchema({
  url: "/bba-training-program-in-agra",
  name: course.title,
  description: course.seo.description,
  keywords: course.seo.keywords,
});

const combinedSchema = { "@context": "https://schema.org", "@graph": [courseSchema, breadcrumbSchema, webPageSchema] };

export default function BBAPage() {
  return (
    <>
      <JsonLd data={combinedSchema} id="course-schema" />
      <div className="w-full overflow-x-hidden">
        <BBALandingPage />
      </div>
    </>
  );
}
