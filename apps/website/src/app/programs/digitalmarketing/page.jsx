import dynamic from "next/dynamic";
import { buildSEO } from "@/lib/seo/buildSEO";
const DGMLandingPage = dynamic(() => import("@/components/landingPageDGM/LandingPage").then(m => m.DGMLandingPage));
import JsonLd from "@/components/JsonLd";

import { getCourseSchema } from "@/lib/seo/schema/courseSchema";
import { courses } from "@/data/courses";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";
import { getFAQSchema } from "@/lib/seo/schema/faqSchema";
import { getPageFaqs } from "@/lib/seo/getFaqs";
import { getWebPageSchema } from "@/lib/seo/schema/webPageSchema";

const course = courses.digitalmarketing;
const courseSchema = getCourseSchema(course);
const faqs = getPageFaqs("digitalmarketing");
const faqSchema = getFAQSchema(faqs);

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Programs", url: "/programs" },
  { name: course.title, url: course.seo.path },
]);

const webPageSchema = getWebPageSchema({
  url: course.seo.path,
  name: course.title,
  description: course.seo.description,
  keywords: course.seo.keywords
});

const combinedSchema = [
  courseSchema,
  breadcrumbSchema,
  faqSchema,
  webPageSchema
].filter(Boolean);

export const metadata = buildSEO(course.seo);

export default function DigitalMarketingPage() {
  return (
    <>
      <JsonLd
        data={combinedSchema}
        id="digital-marketing-schema"
      />

      <div className="w-full overflow-x-hidden">
        <DGMLandingPage faqs={faqs} />
      </div>
    </>
  );
}