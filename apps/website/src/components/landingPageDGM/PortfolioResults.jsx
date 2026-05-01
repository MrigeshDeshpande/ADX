"use client";

import { motion } from "framer-motion";
import { FolderOpen, TrendingUp } from "lucide-react";

const results = [
  {
    type: "SEO Project",
    headline: "Page 5 → Page 1 in 60 days",
    detail: "Ranked a local Agra retail business for 3 target keywords using on-page SEO and link building. GSC data showed 340% increase in organic impressions.",
    metrics: ["3 keywords ranked Page 1", "340% impressions increase", "60-day timeline"],
    color: "border-blue-400/30 bg-blue-50/50 dark:bg-blue-950/10",
    dot: "bg-blue-500",
  },
  {
    type: "Google Ads Campaign",
    headline: "₹15,000 budget · 45 leads · ₹333 CPL",
    detail: "Managed a Search + Display campaign for a coaching institute. Achieved cost-per-lead of ₹333 well under the industry average of ₹600+ for education sector.",
    metrics: ["₹15,000 ad budget managed", "45 qualified leads generated", "₹333 average CPL"],
    color: "border-orange-400/30 bg-orange-50/50 dark:bg-orange-950/10",
    dot: "bg-orange-500",
  },
  {
    type: "Social Media Campaign",
    headline: "200 → 2,400 followers in 6 weeks",
    detail: "Grew a local clothing brand's Instagram from 200 to 2,400 followers using Reels, targeted hashtags, and a micro-influencer collaboration strategy.",
    metrics: ["2,200 new followers", "6-week execution", "12x follower growth"],
    color: "border-pink-400/30 bg-pink-50/50 dark:bg-pink-950/10",
    dot: "bg-pink-500",
  },
  {
    type: "Full Client Audit & Strategy",
    headline: "40-page digital strategy presented live to client",
    detail: "Delivered a complete digital marketing audit for a local restaurant covering SEO, paid ads, social media, and a 90-day execution roadmap. Presented to the client directly.",
    metrics: ["Full SEO + ads + social audit", "90-day roadmap", "Live client presentation"],
    color: "border-green-400/30 bg-green-50/50 dark:bg-green-950/10",
    dot: "bg-green-500",
  },
];

export function DGMPortfolioResults() {
  return (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <FolderOpen size={13} />
                Your Portfolio
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                You Graduate with Numbers.{" "}
                <span className="italic text-primary">Not Just a Certificate.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                These are representative outcomes from real campaigns students run during training.
                Specific. Measurable. The kind of portfolio that gets interviews.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {results.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md ${r.color}`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${r.dot}`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{r.type}</span>
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-extrabold text-foreground">{r.headline}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
                  <div className="flex flex-wrap gap-2">
                    {r.metrics.map((m) => (
                      <span key={m} className="flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold text-foreground">
                        <TrendingUp size={11} className="text-primary" /> {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  );
}
