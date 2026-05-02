import { buildSEO } from "@/lib/seo/buildSEO";

export const revalidate = 86400;
import SupportHero from "@/components/supportpage/SupportHero";
import SupportCategories from "@/components/supportpage/SupportCategories";
import SupportFAQ from "@/components/supportpage/SupportFAQ";
import SupportChannels from "@/components/supportpage/SupportChannels";
import JsonLd from "@/components/JsonLd";
import { getContactPageSchema } from "@/lib/seo/schema/webPageSchema";

export const metadata = buildSEO({
    title: "Support Center | SkillYards Agra",
    description:
        "Get help with admissions, fees, placement, technical issues, and more. SkillYards support is available via WhatsApp, phone, and email.",
    path: "/support",
    keywords: [
        "SkillYards support",
        "SkillYards help center",
        "student support SkillYards",
        "IT training support Agra",
        "course enrollment assistance",
        "SkillYards contact support",
    ],
    ogImage: "/images/opengraph/support-og.jpg",
});

export default function SupportPage() {
    const supportPageSchema = getContactPageSchema({
        url: "/support",
        name: "Support Center | SkillYards Agra",
        description: "Get help with admissions, fees, placement, technical issues, and more. SkillYards support is available via WhatsApp, phone, and email."
    });

    return (
        <div className="w-full overflow-x-hidden">
            <JsonLd data={supportPageSchema} id="support-page-schema" />
            <SupportHero />
            <SupportCategories />
            <SupportFAQ />
            <SupportChannels />
        </div>
    );
}
