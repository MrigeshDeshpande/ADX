"use client";

import { motion } from "framer-motion";
import { Wrench, BadgeCheck } from "lucide-react";

const toolCategories = [
  {
    category: "SEO Tools",
    color: "border-blue-400/30 bg-blue-50/50 dark:bg-blue-950/10",
    dot: "bg-blue-500",
    tools: ["Google Search Console", "Google Analytics 4", "Ahrefs / SEMrush", "Ubersuggest", "Screaming Frog (basics)"],
  },
  {
    category: "Paid Advertising",
    color: "border-orange-400/30 bg-orange-50/50 dark:bg-orange-950/10",
    dot: "bg-orange-500",
    tools: ["Google Ads Manager", "Meta Ads Manager", "Google Tag Manager", "Conversion tracking setup"],
  },
  {
    category: "Content & Design",
    color: "border-pink-400/30 bg-pink-50/50 dark:bg-pink-950/10",
    dot: "bg-pink-500",
    tools: ["Canva Pro", "CapCut / Premiere Rush", "Notion for content planning", "Buffer / Hootsuite for scheduling"],
  },
  {
    category: "Email & CRM",
    color: "border-green-400/30 bg-green-50/50 dark:bg-green-950/10",
    dot: "bg-green-500",
    tools: ["Mailchimp / Klaviyo", "HubSpot (basics)", "UTM tracking setup"],
  },
  {
    category: "Analytics & Reporting",
    color: "border-purple-400/30 bg-purple-50/50 dark:bg-purple-950/10",
    dot: "bg-purple-500",
    tools: ["Google Looker Studio", "UTM & campaign tracking", "Excel / Google Sheets for reporting"],
  },
];

const certifications = [
  { name: "Google Ads Certification", provider: "Google", color: "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300" },
  { name: "Google Analytics 4 Certification", provider: "Google", color: "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300" },
  { name: "Meta Blueprint Certification", provider: "Meta", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300" },
  { name: "HubSpot Content Marketing", provider: "HubSpot", color: "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300" },
  { name: "SkillYards Industry Certificate", provider: "SkillYards", color: "bg-primary/10 text-primary" },
];

export function DGMToolsAndCerts() {
  return (
        <section className="bg-card/20 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <Wrench size={13} />
                Tools & Certifications
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                5 Industry Certifications.{" "}
                <span className="italic text-primary">All Included.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Tools access is provided during the course. Certifications are free to earn we guide you through every one.
              </p>
            </div>

            {/* Certifications strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex flex-wrap items-center justify-center gap-3"
            >
              {certifications.map((cert) => (
                <div key={cert.name} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${cert.color}`}>
                  <BadgeCheck size={15} />
                  <span>{cert.name}</span>
                  <span className="opacity-60 text-xs font-normal">by {cert.provider}</span>
                </div>
              ))}
            </motion.div>

            {/* Tools grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {toolCategories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border p-5 ${cat.color}`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${cat.dot}`} />
                    <h3 className="font-bold text-foreground">{cat.category}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {cat.tools.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  );
}
