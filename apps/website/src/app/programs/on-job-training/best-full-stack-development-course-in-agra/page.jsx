import dynamic from "next/dynamic";
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getCourseSchema } from "@/lib/seo/schema/courseSchema";
import { courses } from "@/data/courses";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";
import { getFAQSchema } from "@/lib/seo/schema/faqSchema";
import { getPageFaqs } from "@/lib/seo/getFaqs";
import { getWebPageSchema } from "@/lib/seo/schema/webPageSchema";

export const revalidate = 86400;

const FSDLandingPage = dynamic(() => import("@/components/landingPageFSD/LandingPage").then((m) => m.FSDLandingPage));

const course = courses.fullstack;
const courseSchema = getCourseSchema(course);
const faqs = getPageFaqs("fullstack");
const faqSchema = getFAQSchema(faqs);

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Programs", url: "/programs" },
  { name: "On-Job Training", url: "/programs/on-job-training" },
  { name: course.title, url: course.seo.path },
]);

const webPageSchema = getWebPageSchema({
  url: course.seo.path,
  name: course.title,
  description: course.seo.description,
  keywords: course.seo.keywords,
});

const combinedSchema = [courseSchema, breadcrumbSchema, faqSchema, webPageSchema].filter(Boolean);

export const metadata = buildSEO(course.seo);

export default function FullStackPage() {
  return (
    <>
      <JsonLd data={combinedSchema} id="fullstack-schema" />

      <div className="w-full overflow-x-hidden">
        <FSDLandingPage faqs={faqs} />
      </div>
    </>
  );
}
