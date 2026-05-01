"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";

const months = [
  {
    month: "Month 1",
    title: "Digital Foundations & SEO",
    hours: "~30 hrs/week",
    color: "bg-blue-500",
    cert: "Google Analytics 4 Certification",
    topics: [
      "Digital marketing overview & strategy",
      "WordPress website setup & management",
      "On-page SEO titles, meta, headings, content",
      "Off-page SEO & link building",
      "Google Search Console setup & analysis",
      "Google Analytics 4 tracking & reporting",
      "Keyword research (Ubersuggest, Ahrefs basics)",
    ],
    builds: "A live website ranked for at least one target keyword with GSC data as proof",
  },
  {
    month: "Month 2",
    title: "Paid Advertising Google & Meta",
    hours: "~35 hrs/week",
    color: "bg-orange-500",
    cert: "Google Ads Certification + Meta Blueprint",
    topics: [
      "Google Ads Search, Display, Shopping campaigns",
      "Campaign structure, ad groups & match types",
      "Meta Ads Facebook & Instagram campaigns",
      "Audience targeting & retargeting",
      "Ad copywriting & creative best practices",
      "A/B testing ads and landing pages",
      "Conversion tracking with Google Tag Manager",
    ],
    builds: "A live Google Ads + Meta Ads campaign on a real client account with real budget",
  },
  {
    month: "Month 3",
    title: "Social Media & Content Marketing",
    hours: "~35 hrs/week",
    color: "bg-pink-500",
    cert: "HubSpot Content Marketing Certification",
    topics: [
      "Social media strategy Instagram, LinkedIn, YouTube",
      "Content calendar creation & scheduling",
      "Reels & short-form video for marketing",
      "Email marketing Mailchimp / Klaviyo",
      "Influencer marketing basics",
      "Brand voice & storytelling",
      "Canva Pro for content design",
    ],
    builds: "A 30-day executed social campaign for a real brand with follower & engagement data",
  },
  {
    month: "Month 4",
    title: "Analytics, Strategy & Client Work",
    hours: "~40 hrs/week",
    color: "bg-green-500",
    cert: "Portfolio of live campaign case studies",
    topics: [
      "Advanced Google Analytics 4",
      "Google Looker Studio reporting dashboards",
      "Full-funnel marketing strategy",
      "Client presentation & communication skills",
      "Agency workflow & project management",
      "Freelancing setup pricing, proposals, contracts",
      "Interview preparation & LinkedIn optimisation",
    ],
    builds: "A complete digital marketing audit + strategy document for a real client presented live",
  },
];

export function DGMCurriculum() {
  const [open, setOpen] = useState(0);

  return (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <BookOpen size={13} />
                Curriculum Month by Month
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                4 Months. <span className="italic text-primary">One Complete Marketer.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Each month ends with a real deliverable not a quiz. Results you can show employers.
              </p>
            </div>

            <div className="space-y-3">
              {months.map((m, i) => {
                const isOpen = open === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-primary/30 bg-card shadow-lg" : "border-border bg-card/50 hover:border-border/80"}`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`h-3 w-3 shrink-0 rounded-full ${m.color}`} />
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{m.month}</span>
                          <h3 className={`font-bold text-base transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                            {m.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden text-xs text-muted-foreground sm:block">{m.hours}</span>
                        <ChevronDown size={18} className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="border-t border-border px-5 pb-5 pt-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Topics Covered</p>
                                <ul className="space-y-1.5">
                                  {m.topics.map((t) => (
                                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                      {t}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex flex-col gap-3">
                                <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">What you deliver</p>
                                  <p className="text-sm font-semibold text-foreground">{m.builds}</p>
                                </div>
                                <div className="rounded-xl bg-secondary/10 p-3">
                                  <p className="text-xs text-muted-foreground"><strong className="text-foreground">Certification target:</strong> {m.cert}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
  );
}
