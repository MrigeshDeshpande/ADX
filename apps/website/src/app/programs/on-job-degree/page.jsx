import dynamic from "next/dynamic";
import OnJobHero from "@/components/programspage/OnJobHero";
import { buildSEO } from "@/lib/seo/buildSEO";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/seo/schema/webPageSchema";
import { getBreadcrumbSchema } from "@/lib/seo/schema/breadcrumbSchema";

const OnJobProgramCards = dynamic(() => import("@/components/programspage/OnJobProgramCards"));
const PlacementOutcomes = dynamic(() => import("@/components/programspage/PlacementOutcomes"));
const FinalCTA = dynamic(() => import("@/components/programspage/FinalCTA"));
const OnJobComparisonTable = dynamic(() => import("@/components/programspage/OnJobComparisonTable"));

export const revalidate = 86400;

export const metadata = buildSEO({
  title: "BCA & BBA with On-Job Training in Agra | SkillYards Degree Programs",
  description:
    "Earn a recognized university degree (BCA/BBA) while gaining 3 years of real industry experience. SkillYards on-job degree programs in Agra ensure 100% placement and high-demand skills.",
  path: "/programs/on-job-degree",
  keywords: [
    "on-job training degree Agra",
    "BCA with job training Agra",
    "BBA with job training Agra",
    "best BCA college in Agra with placement",
    "industry-integrated degree programs",
    "earn while you learn degree Agra",
  ],
  ogImage: "/images/opengraph/programs-og.jpg",
});

export default function OnJobDegreePage() {
  const collectionSchema = getCollectionPageSchema({
    url: "/programs/on-job-degree",
    name: "SkillYards On-Job Degree Programs – BCA & BBA with Industrial Training",
    description: "Earn a recognized university degree (BCA/BBA) while gaining 3 years of real industry experience. SkillYards on-job degree programs in Agra ensure 100% placement."
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
    { name: "On-Job Degree", url: "/programs/on-job-degree" },
  ]);

  const combinedSchema = [collectionSchema, breadcrumbSchema].filter(Boolean);

  return (
    <main>
      <JsonLd data={combinedSchema} id="on-job-degree-schema" />
      <OnJobHero />
      <OnJobProgramCards />
      
      {/* Why Section */}
      <div className="py-20 bg-slate-50 dark:bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
              <h2 className="text-4xl font-bold font-serif mb-6">Why SkillYards On-Job Degree?</h2>
              <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
                  Traditional education often fails to bridge the gap between theory and industry demands. 
                  Our unique approach ensures you graduate not just with a degree, but as a seasoned professional.
              </p>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-20">
              {[
                  { title: "3 Years Experience", desc: "Start working in real companies from day one. Graduate with a CV that beats any masters student." },
                  { title: "Stipend While Studying", desc: "Earn while you learn. Reduce the financial burden on your family through industrial stipends." },
                  { title: "University Degree", desc: "Recognized UG degrees from top universities, valid for higher education and government jobs." }
              ].map((item, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 font-bold text-xl">{i+1}</div>
                      <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                  </div>
              ))}
          </div>

          <OnJobComparisonTable />
      </div>

      <PlacementOutcomes />
      <FinalCTA />
    </main>
  );
}
