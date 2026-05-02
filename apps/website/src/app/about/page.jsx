import dynamic from "next/dynamic";

import JsonLd from "@/components/JsonLd";
import AboutHero from "@/components/aboutpage/AboutHero";

export const revalidate = 86400;
const AboutMissionVision = dynamic(() => import("@/components/aboutpage/AboutMissionVision"));

const AboutWhyChoose = dynamic(() => import("@/components/aboutpage/AboutWhyChoose"));
const TestimonialsByInterns = dynamic(() => import("@/components/aboutpage/TestimonialsByInterns"));
const CTASection = dynamic(() => import("@/components/aboutpage/CTASection"));
const LifeAtSkillYards = dynamic(() => import("@/components/aboutpage/LifeAtSkillYards"));
const TechnologiesWeTeach = dynamic(() => import("@/components/aboutpage/TechnologiesWeTeach"));
const StudentSuccessStories = dynamic(() => import("@/components/aboutpage/StudentSuccessStories"));
const SkillYardsJourney = dynamic(() => import("@/components/aboutpage/SkillYardsJourney"));
const CtaBanner = dynamic(() => import("@/components/aboutpage/CtaBanner"));
const PartnersSlider = dynamic(() => import("@/components/common/PartnersSlider"));
const FAQSection = dynamic(() => import("@/components/common/FAQSection"));
const PlacementStats = dynamic(() => import("@/components/aboutpage/PlacementStats"));
const OtherTeam = dynamic(() => import("@/components/aboutpage/OtherTeam"));
const LeadersSection=dynamic(()=>import("@/components/common/LeadersSection"));

import { buildSEO } from "@/lib/seo/buildSEO";

export const metadata = buildSEO({
  title: "About SkillYards",
  description:
    "Learn about SkillYards, a skill-based learning platform empowering professionals with industry-relevant training, live classes, and certifications led by experts.",
  path: "/about",
  keywords: [
    "About SkillYards",
    "SkillYards learning platform",
    "Skill development India",
    "Online training institute",
    "Professional certifications",
    "Career-focused learning",
  ],
  ogImage: "/images/opengraph/about-og.jpg",
});

import { getAboutPageSchema } from "@/lib/seo/schema/webPageSchema";

export default function AboutPage() {
  const aboutPageSchema = getAboutPageSchema({
    url: "/about",
    name: "About SkillYards",
    description: "Learn about SkillYards, a skill-based learning platform empowering professionals with industry-relevant training, live classes, and certifications led by experts."
  });

  return (
    <>
      <div className="bg-background text-foreground transition-colors duration-500">
        <AboutHero />
        <AboutMissionVision />
        <AboutWhyChoose />
        <LeadersSection />
        <OtherTeam />
        <PartnersSlider />
        <TestimonialsByInterns />
        <CTASection />
        <LifeAtSkillYards />
        <TechnologiesWeTeach />
        <FAQSection />
        <StudentSuccessStories />
        <PlacementStats />
        <SkillYardsJourney />
        <CtaBanner />
      </div>
      <JsonLd data={aboutPageSchema} id="about-page-schema-skillyards" />
    </>
  );
}