import dynamic from "next/dynamic";
import OnJobHero from "@/components/onJobDegreePage/OnJobHero";
import WhyOnJobDegree from "@/components/onJobDegreePage/WhyOnJobDegree";
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/seo/schema/webPageSchema";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";
import { getFAQSchema } from "@/lib/seo/schema/faqSchema";
import { getPageFaqs } from "@/lib/seo/getFaqs";
import ProgramsFAQ from "@/components/programspage/ProgramsFAQ";

const OnJobProgramCards = dynamic(() => import("@/components/onJobDegreePage/OnJobProgramCards"));
const PlacementOutcomes = dynamic(() => import("@/components/onJobDegreePage/PlacementOutcomes"));
const FinalCTA = dynamic(() => import("@/components/onJobDegreePage/FinalCTA"));
const OnJobComparisonTable = dynamic(() => import("@/components/onJobDegreePage/OnJobComparisonTable"));

export const revalidate = 86400;

export const metadata = buildSEO({
  title: "BCA & BBA with On-Job Training in Agra | SkillYards Degree Programs",
  description:
    "Earn a recognized university degree (BCA/BBA) while gaining 3 years of real industry experience. SkillYards on-job degree programs in Agra ensure 100% placement and high-demand skills.",
  path: "/programs/on-job-degree",
  keywords: [
    "on-job training degree Agra",
    "BCA with job training Agra",
    "BBA with job training Agra",
    "best BCA college in Agra with placement",
    "industry-integrated degree programs",
    "earn while you learn degree Agra",
  ],
  ogImage: "/images/opengraph/programs-og.jpg",
});

export default async function OnJobDegreePage() {
  const faqs = await getPageFaqs("degrees", 6);

  const collectionSchema = getCollectionPageSchema({
    url: "/programs/on-job-degree",
    name: "SkillYards On-Job Degree Programs – BCA & BBA with Industrial Training",
    description: "Earn a recognized university degree (BCA/BBA) while gaining 3 years of real industry experience. SkillYards on-job degree programs in Agra ensure 100% placement."
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
    { name: "On-Job Degree", url: "/programs/on-job-degree" },
  ]);

  const faqSchema = getFAQSchema(faqs);
  const combinedSchema = [collectionSchema, breadcrumbSchema, faqSchema].filter(Boolean);

  return (
    <main>
      <JsonLd data={combinedSchema} id="on-job-degree-schema" />
      <OnJobHero />
      <OnJobProgramCards />
      <WhyOnJobDegree />
      <OnJobComparisonTable />
      <PlacementOutcomes />
      {faqs.length > 0 && <ProgramsFAQ faqs={faqs} />}
      <FinalCTA />
    </main>
  );
}
