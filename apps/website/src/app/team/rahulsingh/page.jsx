import { buildSEO } from "@/lib/seo/buildSEO";

export const revalidate = 86400;
import JsonLd from "@/components/JsonLd";
import RahulHero from "@/components/rahulsingh/RahulHero";
import { getPersonSchema } from "@/lib/seo/schema/personSchema";

const rahul = {
    name: "Rahul Singh",
    role: "Chief Operating Officer",
    avatar: "/images/team/rahul-singh.webp",
    bio: "Rahul Singh is the Chief Operating Officer at SkillYards, driving operational excellence, scalability, and impactful learning experiences.",
};

export const metadata = buildSEO({
    title: "Rahul Singh – Chief Operating Officer",
    description:
        "Learn about Rahul Singh, COO at SkillYards, and his role in driving operational excellence, scalability, and impactful learning experiences.",
    path: "/team/rahulsingh",
    keywords: [
        "Rahul Singh",
        "SkillYards COO",
        "operations leadership",
        "SkillYards management",
    ],
    ogImage: "/images/opengraph/rahul-singh-og.jpg",
});

export default function RahulPage() {
    const rahulSchema = getPersonSchema({
        name: rahul.name,
        role: rahul.role,
        image: rahul.avatar,
        url: "/team/rahulsingh",
        description: rahul.bio
    });

    return (
        <>
            <RahulHero />
            <JsonLd data={rahulSchema} id="rahul-singh-schema" />
        </>
    );
}