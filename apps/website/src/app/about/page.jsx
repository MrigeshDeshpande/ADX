import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import AboutHero from "@/components/aboutpage/AboutHero";

export const revalidate = 86400;
const AboutMissionVision = dynamic(() => import("@/components/aboutpage/AboutMissionVision"));

const AboutWhyChoose = dynamic(() => import("@/components/aboutpage/AboutWhyChoose"));
const StudentWorkAbout = dynamic(() => import("@/components/aboutpage/StudentWorkAbout"));
const CTASection = dynamic(() => import("@/components/aboutpage/CTASection"));
const LifeAtSkillYards = dynamic(() => import("@/components/aboutpage/LifeAtSkillYards"));
const TechnologiesWeTeach = dynamic(() => import("@/components/aboutpage/TechnologiesWeTeach"));

const SkillYardsJourney = dynamic(() => import("@/components/aboutpage/SkillYardsJourney"));
const CtaBanner = dynamic(() => import("@/components/aboutpage/CtaBanner"));
const PartnersSlider = dynamic(() => import("@/components/common/PartnersSlider"));
const FAQSection = dynamic(() => import("@/components/common/FAQSection"));
const PlacementStats = dynamic(() => import("@/components/aboutpage/PlacementStats"));
const OtherTeam = dynamic(() => import("@/components/aboutpage/OtherTeam"));
const LeadersSection=dynamic(()=>import("@/components/common/LeadersSection"));

import { buildSEO } from "@/lib/seo/buildSEO";
import { getFAQSchema } from "@/lib/seo/schema/faqSchema";
import { getPageFaqs } from "@/lib/seo/getFaqs";
import { absoluteUrl } from "@/lib/seo/core/url";

export const metadata = buildSEO({
  title: "About SkillYards",
  description:
    "SkillYards is an Agra-based IT training institute built for students who want practical, career-focused learning after 12th or graduation.",
  path: "/about",
  keywords: [
    "About SkillYards",
    "IT training institute in Agra",
    "Coding institute in Agra",
    "Computer training institute in Agra",
    "Project-based training in Agra",
    "Career-focused training institute",
  ],
  ogImage: "/images/opengraph/about-og.jpg",
});

import { getAboutPageSchema } from "@/lib/seo/schema/webPageSchema";

export default async function AboutPage() {
  const aboutPageSchema = getAboutPageSchema({
    url: "/about",
    name: "About SkillYards",
    description:
      "SkillYards is an Agra-based IT training institute built for students who want practical, career-focused learning after 12th or graduation.",
  });

  const faqs = await getPageFaqs("homepage", 4);
  const faqSchema = getFAQSchema(faqs, absoluteUrl("/about"));
  const combinedSchema = [aboutPageSchema, faqSchema].filter(Boolean);

  return (
    <>
      <div className="bg-background text-foreground transition-colors duration-500">
        <AboutHero />
        <AboutMissionVision />
        <AboutWhyChoose />
        <LeadersSection />
        <OtherTeam />
        <PartnersSlider />

        <CTASection />
        <LifeAtSkillYards />
        <TechnologiesWeTeach />
        <FAQSection faqs={faqs} />
        <StudentWorkAbout />
        <PlacementStats />
        <SkillYardsJourney />
        <CtaBanner />
      </div>
      <JsonLd data={combinedSchema} id="about-page-schema-skillyards" />
    </>
  );
}
