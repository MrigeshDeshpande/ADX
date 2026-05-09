import dynamic from "next/dynamic";
import { buildSEO } from "@/lib/seo/buildSEO";

export const revalidate = 86400;
const BBALandingPage = dynamic(() => import("@/components/landingPageBBA/LandingPage").then(m => m.LandingPage));
import JsonLd from "@/components/JsonLd";
import { getCourseSchema } from "@/lib/seo/schema/courseSchema";
import { courses } from "@/data/courses";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";
import { getWebPageSchema } from "@/lib/seo/schema/webPageSchema";

const course = courses.bba;
const courseSchema = getCourseSchema(course);

export const metadata = buildSEO({
  ...course.seo,
  path: "/bba-training-program-in-agra",
});

const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
    { name: course.title, url: "/bba-training-program-in-agra" },
]);

const webPageSchema = getWebPageSchema({
  url: "/bba-training-program-in-agra",
  name: course.title,
  description: course.seo.description,
  keywords: course.seo.keywords,
});

const combinedSchema = [courseSchema, breadcrumbSchema, webPageSchema].filter(Boolean);

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
