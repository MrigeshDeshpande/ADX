import dynamic from "next/dynamic";
import ProgramsHero from "@/components/programspage/ProgramsHero";

const ProgramCards = dynamic(() => import("@/components/programspage/ProgramCards"));
const ComparisonTable = dynamic(() => import("@/components/programspage/ComparisonTable"));
const CurriculumHighlights = dynamic(() => import("@/components/programspage/CurriculumHighlights"));
const PlacementOutcomes = dynamic(() => import("@/components/programspage/PlacementOutcomes"));
const AdmissionProcess = dynamic(() => import("@/components/programspage/AdmissionProcess"));
const BatchFeeInfo = dynamic(() => import("@/components/programspage/BatchFeeInfo"));
const ProgramsFAQ = dynamic(() => import("@/components/programspage/ProgramsFAQ"));
const FinalCTA = dynamic(() => import("@/components/programspage/FinalCTA"));
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/seo/schema/webPageSchema";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";

export const revalidate = 86400;

export const metadata = buildSEO({
  title: "SkillYards Programs – BCA, BBA, Full-Stack & Digital Marketing in Agra",
  description:
    "Explore SkillYards programs: BCA with on-job training, BBA with digital marketing, Full-Stack Web Development, and Digital Marketing courses in Agra. 95% placement rate.",
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

export default function ProgramsPage() {
  const collectionSchema = getCollectionPageSchema({
    url: "/programs",
    name: "SkillYards Programs – BCA, BBA, Full-Stack & Digital Marketing in Agra",
    description: "Explore SkillYards programs: BCA with on-job training, BBA with digital marketing, Full-Stack Web Development, and Digital Marketing courses in Agra. 95% placement rate."
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
      <BatchFeeInfo />
      <ProgramsFAQ />
      <FinalCTA />
    </main>
  );
}

