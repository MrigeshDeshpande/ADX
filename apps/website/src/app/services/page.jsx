import Link from "next/link";
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getWebPageSchema } from "@/lib/seo/schema/webPageSchema";
import { getServiceSchema } from "@/lib/seo/schema/serviceSchema";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";

const serviceKeywords = ["SkillYards services", "IT services Agra", "digital marketing services Agra", "web development Agra", "industrial training Agra"];

export const revalidate = 86400;

export const metadata = buildSEO({
    title: "Our Services | SkillYards Agra",
    description: "Full-service technology and digital marketing solutions built for businesses that want to grow. Industrial training, web development, and digital marketing services.",
    path: "/services",
    keywords: serviceKeywords,
    ogImage: "/images/opengraph/home-og.jpg",
});

export default function ServicesPage() {
    const webPageSchema = getWebPageSchema({
        url: "/services",
        name: "Our Services | SkillYards Agra",
        description: "Full-service technology and digital marketing solutions built for businesses that want to grow.",
        keywords: serviceKeywords
    });

    const serviceSchema = getServiceSchema({
        url: "/services",
        name: "SkillYards Technology & Training Services",
        description: "Comprehensive IT training and software development services.",
        items: [
            { name: "Full Stack Web Development" },
            { name: "Digital Marketing" },
            { name: "BCA On-Job Training" },
            { name: "BBA Marketing & Digital Skills" }
        ]
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
    ]);

    const combinedSchema = [webPageSchema, serviceSchema, breadcrumbSchema].filter(Boolean);

    return (
        <main className="min-h-screen bg-background flex items-center justify-center">
            <JsonLd data={combinedSchema} id="services-schema" />
            <div className="text-center space-y-4 px-6">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">Our Services</h1>
                <p className="font-sans text-muted-foreground text-lg max-w-xl mx-auto">
                    Full-service technology and digital marketing solutions built for businesses that want to grow.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:bg-primary/90 transition-all duration-300"
                >
                    Start a Project →
                </Link>
            </div>
        </main>
    );
}
