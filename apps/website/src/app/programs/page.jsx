import ProgramsHero from "@/components/programspage/ProgramsHero";
import ComparisonTable from "@/components/programspage/ComparisonTable";
import GoogleTrustProof from "@/components/programspage/GoogleTrustProof";
import ProgramCards from "@/components/programspage/ProgramCards";
import AdmissionProcess from "@/components/programspage/AdmissionProcess";
import ProgramsFAQ from "@/components/programspage/ProgramsFAQ";
import FinalCTA from "@/components/programspage/FinalCTA";
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/seo/schema/webPageSchema";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";

export const revalidate = 86400;

export const metadata = buildSEO({
  title: "SkillYards Programs | OJD & OJT IT Training in Agra",
  description:
    "Explore SkillYards On Job Degree and On Job Training programs in Agra, including BCA, BBA, Full-Stack Development and Digital Marketing with practical projects and 100% placement assistance.",
  path: "/programs",
  keywords: [
    "IT training programs in Agra",
    "IT courses in Agra",
    "On Job Degree in Agra",
    "On Job Training in Agra",
    "Career courses after 12th in Agra",
    "SkillYards programs",
  ],
  ogImage: "/images/opengraph/programs-og.jpg",
});

export default async function ProgramsPage() {
  const collectionSchema = getCollectionPageSchema({
    url: "/programs",
    name: "SkillYards Programs | OJD & OJT IT Training in Agra",
    description:
      "Explore SkillYards On Job Degree and On Job Training programs in Agra, including BCA, BBA, Full-Stack Development and Digital Marketing with practical projects and 100% placement assistance."
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
      <ComparisonTable />
      <GoogleTrustProof />
      <ProgramCards />
      <AdmissionProcess />
      <ProgramsFAQ limit={5} />
      <FinalCTA />
    </main>
  );
}
