import ComingSoon from "@/components/ComingSoon";
import { buildSEO } from "@/lib/seo/buildSEO";

export const revalidate = 86400;
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/seo/schema/webPageSchema";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";

const galleryKeywords = [
  "SkillYards gallery",
  "SkillYards campus gallery",
  "IT training institute gallery",
  "SkillYards events photos and videos",
  "Student learning moments",
  "SkillYards classroom gallery",
];

export const metadata = buildSEO({
  title: "SkillYards Gallery",
  description:
    "Explore the SkillYards gallery featuring photos and videos from our campus, training sessions, workshops, events, and student learning experiences.",
  path: "/gallery",
  keywords: galleryKeywords,
  ogImage: "/images/opengraph/gallery-og.jpg",
});

export default function GalleryPage() {
  const collectionSchema = getCollectionPageSchema({
    url: "/gallery",
    name: "SkillYards Gallery",
    description: "Explore the SkillYards gallery featuring photos and videos from our campus, training sessions, workshops, and events.",
    keywords: galleryKeywords
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
  ]);

  const combinedSchema = [collectionSchema, breadcrumbSchema].filter(Boolean);

  return (
    <>
      <JsonLd data={combinedSchema} id="gallery-schema" />
      <ComingSoon
        title="Gallery — Coming Soon"
        description="We’re curating photos and moments from SkillYards classrooms, events, and student journeys. Check back soon!"
      />
    </>
  );
}