import HeroCarousel from "@/components/homepage/HeroCarousel";
import AboutSection from "@/components/homepage/AboutSection";
import ProblemSection from "@/components/homepage/ProblemSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import LeadersSection from "@/components/common/LeadersSection";
import CTASection from "@/components/homepage/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { BlogSection } from "@/components/homepage/BlogSection";
import PartnersSlider from "@/components/common/PartnersSlider";
import ProgramsShowcase from "@/components/homepage/ProgrammeShowcase";
import WhatStudentsBuild from "@/components/homepage/WhatStudentsBuild";
import FeaturedRoles from "@/components/homepage/FeaturedRoles";
import SkillTestSection from "@/components/homepage/SkillTestSection";
import BatchFeeInfo from "@/components/programspage/BatchFeeInfo";

import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";

import { getFAQSchema } from "@/lib/seo/schema/faqSchema";
import { getWebPageSchema } from "@/lib/seo/schema/webPageSchema";
import { faqCategories } from "@/data/faqs";
import { sanityClient } from "@/lib/sanity/client";
import { BATCHES_QUERY } from "@/lib/sanity/queries";

export const revalidate = 86400;

const homeKeywords = [
  "IT training institute in Agra",
  "SkillYards Agra",
  "coding institute in Agra",
  "full stack development course in Agra",
  "BCA with job training in Agra",
  "BBA with digital marketing in Agra",
  "digital marketing course in Agra",
  "computer training institute in Agra",
  "job oriented courses after 12th Agra",
  "on job degree program Agra",
];

const homepageFaqs = faqCategories.homepage.faqs.slice(0, 4);
const faqSchema = getFAQSchema(homepageFaqs);
const webPageSchema = getWebPageSchema({
  url: "/",
  name: "SkillYards – IT Training Institute in Agra",
  description:
    "SkillYards is an IT training institute in Agra offering project-based BCA, BBA, full-stack development, and digital marketing programs with practical training and career-focused learning.",
  keywords: homeKeywords,
});

const combinedSchema = [faqSchema, webPageSchema].filter(Boolean);

export const metadata = buildSEO({
  title: "IT Training Institute in Agra",
  description:
    "SkillYards is an IT training institute in Agra offering project-based BCA, BBA, full-stack development, and digital marketing programs with practical training and career-focused learning.",
  path: "/",
  keywords: homeKeywords,
  ogImage: "/images/opengraph/home-og.jpg",
});

export default async function Home() {
  const batches = await sanityClient.fetch(BATCHES_QUERY);

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
        <WhatStudentsBuild />
        <BatchFeeInfo batches={batches} variant="home" />
        <FeaturedRoles />
        <SkillTestSection />
        <LeadersSection />
        <BlogSection />
        <PartnersSlider />
        <CTASection />
        <FAQSection category="homepage" limit={4} />
      </div>
    </>
  );
}
