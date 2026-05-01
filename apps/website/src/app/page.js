import dynamic from "next/dynamic";

const HeroCarousel = dynamic(() => import("@/components/homepage/HeroCarousel"));

const AboutSection = dynamic(() => import("@/components/homepage/AboutSection"));
const ProblemSection = dynamic(() => import("@/components/homepage/ProblemSection"));
const FeaturesSection = dynamic(() => import("@/components/homepage/FeaturesSection"));
const LeadersSection = dynamic(() => import("@/components/common/LeadersSection"));
const CTASection = dynamic(() => import("@/components/homepage/CTASection"));
const FAQSection = dynamic(() => import("@/components/common/FAQSection"));
const BlogSection = dynamic(() => import("@/components/homepage/BlogSection").then((mod) => mod.BlogSection));
const ServicesSection = dynamic(() => import("@/components/homepage/ServicesSection"));
const PartnersSlider = dynamic(() => import("@/components/common/PartnersSlider"));
const ProgramsShowcase = dynamic(() => import("@/components/homepage/ProgrammeShowcase"));
const HearFromStudents = dynamic(() => import("@/components/homepage/HearFromStudents"));
const FeaturedRoles = dynamic(() => import("@/components/homepage/FeaturedRoles"));
const SkillTestSection = dynamic(() => import("@/components/homepage/SkillTestSection"));

import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";

import { getFAQSchema } from "@/lib/seo/schema/faqSchema";
import { getWebPageSchema } from "@/lib/seo/schema/webPageSchema";
import { faqCategories } from "@/data/faqs";

const homeKeywords = [
  "SkillYards",
  "online courses India",
  "skill development platform",
  "professional certifications",
  "live online training",
  "job-ready skills",
  "IT training India",
  "career growth",
  "e-learning platform",
];

const homepageFaqs = faqCategories.homepage.faqs.slice(0, 4);
const faqSchema = getFAQSchema(homepageFaqs);
const webPageSchema = getWebPageSchema({
  url: "/",
  name: "Learn, Train & Get Certified Online | SkillYards",
  description: "SkillYards is a skill-based learning platform offering online courses, live training, and professional certifications to help you build job-ready skills.",
  keywords: homeKeywords
});

const combinedSchema = [faqSchema, webPageSchema].filter(Boolean);

export const metadata = buildSEO({
  title: "Learn, Train & Get Certified Online",
  description:
    "SkillYards is a skill-based learning platform offering online courses, live training, and professional certifications to help you build job-ready skills.",
  path: "/",
  keywords: homeKeywords,
  ogImage: "/images/opengraph/home-og.jpg",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={combinedSchema}
        id="homepage-schema"
      />

      <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-500">
        <HeroCarousel />
        <AboutSection />
        <ProblemSection />
        <ProgramsShowcase />
        <FeaturesSection />
        <SkillTestSection />
        <HearFromStudents />
        <FeaturedRoles />
        <ServicesSection />
        <BlogSection />
        <LeadersSection />
        <PartnersSlider />
        <CTASection />
        <FAQSection category="homepage" limit={4} />
      </div>
    </>
  );
}