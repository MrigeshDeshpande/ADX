import dynamic from "next/dynamic";
import OnJobTrainingHero from "@/components/onJobTrainingPage/OnJobTrainingHero";
import WhyOnJobTraining from "@/components/onJobTrainingPage/WhyOnJobTraining";
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/seo/schema/webPageSchema";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";

const OnJobTrainingProgramCards = dynamic(() => import("@/components/onJobTrainingPage/OnJobTrainingProgramCards"));
const OnJobTrainingComparisonTable = dynamic(() => import("@/components/onJobTrainingPage/OnJobTrainingComparisonTable"));
const PlacementOutcomes = dynamic(() => import("@/components/onJobDegreePage/PlacementOutcomes"));
const FinalCTA = dynamic(() => import("@/components/onJobDegreePage/FinalCTA"));

export const revalidate = 86400;

export const metadata = buildSEO({
  title: "On-Job Training Courses in Agra | Full-Stack & Digital Marketing",
  description:
    "Explore SkillYards on-job training programs in Agra. Choose Full-Stack Web Development or Digital Marketing and learn through real projects, mentor support, and placement-focused training.",
  path: "/programs/on-job-training",
  keywords: [
    "on-job training Agra",
    "full stack course Agra with placement",
    "digital marketing course Agra with placement",
    "job ready training institute Agra",
    "skill based courses Agra",
    "practical training programs Agra",
  ],
  ogImage: "/images/opengraph/programs-og.jpg",
});

export default function OnJobTrainingPage() {
  const collectionSchema = getCollectionPageSchema({
    url: "/programs/on-job-training",
    name: "SkillYards On-Job Training Programs – Full-Stack & Digital Marketing",
    description:
      "Choose between Full-Stack Web Development and Digital Marketing on-job training tracks at SkillYards. Learn through practical work, portfolio building, and placement-focused mentorship.",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
    { name: "On-Job Training", url: "/programs/on-job-training" },
  ]);

  const combinedSchema = [collectionSchema, breadcrumbSchema].filter(Boolean);

  return (
    <main>
      <JsonLd data={combinedSchema} id="on-job-training-schema" />
      <OnJobTrainingHero />
      <OnJobTrainingProgramCards />
      <WhyOnJobTraining />
      <OnJobTrainingComparisonTable />
      <PlacementOutcomes />
      <FinalCTA />
    </main>
  );
}
