import ProgramsHero from "@/components/programspage/ProgramsHero";
import ProgramCards from "@/components/programspage/ProgramCards";
import ComparisonTable from "@/components/programspage/ComparisonTable";
import CurriculumHighlights from "@/components/programspage/CurriculumHighlights";
import PlacementOutcomes from "@/components/programspage/PlacementOutcomes";
import AdmissionProcess from "@/components/programspage/AdmissionProcess";
import BatchFeeInfo from "@/components/programspage/BatchFeeInfo";
import ProgramsFAQ from "@/components/programspage/ProgramsFAQ";
import FinalCTA from "@/components/programspage/FinalCTA";
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/seo/schema/webPageSchema";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";
import { sanityClient } from "@/lib/sanity/client";
import { BATCHES_QUERY } from "@/lib/sanity/queries";

export const revalidate = 86400;

export const metadata = buildSEO({
  title: "SkillYards Programs – BCA, BBA, Full-Stack & Digital Marketing in Agra",
  description:
    "Explore SkillYards programs: BCA with on-job training, BBA with digital marketing, Full-Stack Web Development, and Digital Marketing courses in Agra with practical projects, mentorship, and career-focused learning.",
  path: "/programs",
  keywords: [
    "BCA with on-job training Agra",
    "BCA admission 2026 Agra",
    "BBA digital marketing degree Agra",
    "full stack development course Agra",
    "digital marketing training institute Agra",
    "IT training institute Agra",
    "SkillYards programs",
  ],
  ogImage: "/images/opengraph/programs-og.jpg",
});

export default async function ProgramsPage() {
  const batches = await sanityClient.fetch(BATCHES_QUERY);

  const collectionSchema = getCollectionPageSchema({
    url: "/programs",
    name: "SkillYards Programs – BCA, BBA, Full-Stack & Digital Marketing in Agra",
    description: "Explore SkillYards programs: BCA with on-job training, BBA with digital marketing, Full-Stack Web Development, and Digital Marketing courses in Agra with practical projects, mentorship, and career-focused learning."
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
  ]);

  const combinedSchema = [collectionSchema, breadcrumbSchema].filter(Boolean);

  return (
    <main>
      <JsonLd data={combinedSchema} id="programs-schema" />
      <ProgramsHero />
      <ProgramCards />
      <ComparisonTable />
      <CurriculumHighlights />
      <PlacementOutcomes />
      <AdmissionProcess />
      <BatchFeeInfo batches={batches} />
      <ProgramsFAQ />
      <FinalCTA />
    </main>
  );
}
