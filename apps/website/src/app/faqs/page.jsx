import { buildSEO } from "@/lib/seo/buildSEO";

export const revalidate = 86400;
import PageHero from "@/components/PageHero";
import FAQsAccordion from "@/components/faqspage/FAQsAccordion";
import { getFAQSchema } from "@/lib/seo/schema/faqSchema";
import { getWebPageSchema } from "@/lib/seo/schema/webPageSchema";
import { faqCategories } from "@/data/faqs";
import JsonLd from "@/components/JsonLd";
const faqKeywords = [
    "SkillYards FAQs",
    "SkillYards questions",
    "IT training FAQs Agra",
    "full stack course questions",
    "digital marketing course FAQs",
    "BCA BBA admission questions",
    "SkillYards placement FAQ",
];

export const metadata = buildSEO({
    title: "Frequently Asked Questions | SkillYards Agra",
    description:
        "Find clear answers to questions about SkillYards programs, admissions, fees, placement, BCA, BBA, Full-Stack Development, Digital Marketing, and more.",
    path: "/faqs",
    keywords: faqKeywords,
    ogImage: "/images/opengraph/faqs-og.jpg",
});

export default function FaqsPage() {
    const allFaqs = Object.values(faqCategories).flatMap(category => category.faqs);
    const faqSchema = getFAQSchema(allFaqs);
    const webPageSchema = getWebPageSchema({
        url: "/faqs",
        name: "Frequently Asked Questions | SkillYards Agra",
        description: "Find clear answers to questions about SkillYards programs, admissions, fees, placement, BCA, BBA, Full-Stack Development, Digital Marketing, and more.",
        keywords: faqKeywords
    });
    const combinedSchema = [faqSchema, webPageSchema].filter(Boolean);

    return (
        <>
            <JsonLd data={combinedSchema} id="faqs-page-schema" />
            <PageHero
                title="Frequently Asked Questions"
                subtitle="Everything you want to know about SkillYards — programs, admissions, fees, placement, and more. Organised by topic."
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "FAQs" },
                ]}
            />
            <FAQsAccordion />
        </>
    );
}
