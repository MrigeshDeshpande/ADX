import ComingSoon from "@/components/ComingSoon";
import { buildSEO } from "@/lib/seo/buildSEO";

export const revalidate = 86400;

export const metadata = buildSEO({
    title: "Legal Information | SkillYards",
    description:
        "Access SkillYards legal information including terms of service, privacy policy, refund policy, and other important guidelines governing our platform and services.",
    path: "/legal",
    keywords: [
        "SkillYards legal",
        "SkillYards policies",
        "SkillYards terms and conditions",
        "SkillYards privacy policy",
        "Online training platform legal information",
        "SkillYards user policies",
    ],
    ogImage: "/images/opengraph/legal-og.jpg",
});

export default function LegalPage() {
    return (
        <ComingSoon
            title="Legal — Coming Soon"
            description="We’re preparing our legal policies, terms of service, and compliance information. Please check back soon!"
        />
    );
}