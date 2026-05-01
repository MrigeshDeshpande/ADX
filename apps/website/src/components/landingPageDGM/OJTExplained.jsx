"use client";

import { motion } from "framer-motion";
import { IndianRupee, BarChart2, Wrench, FileBarChart, CheckCircle, X } from "lucide-react";

const points = [
  {
    icon: IndianRupee,
    title: "Real ad budgets. Real client accounts. From Month 2.",
    desc: "Students don't practice on dummy accounts. From Month 2, you manage real Google Ads and Meta Ads campaigns on actual client accounts with real money and real targets.",
  },
  {
    icon: BarChart2,
    title: "Your portfolio is campaign performance data not screenshots",
    desc: "When you graduate, you don't show a certificate. You show a recruiter actual numbers: impressions, clicks, ROAS, SEO rankings. Specific. Measurable. Verifiable.",
  },
  {
    icon: Wrench,
    title: "Paid tools included no self-arrangement needed",
    desc: "Students get access to Ahrefs, SEMrush, Canva Pro, and Google Workspace during the course. Most institutes make you figure this out yourself.",
  },
  {
    icon: FileBarChart,
    title: "Month 4 is client work not more theory",
    desc: "Your final month is dedicated to real client strategy a full digital marketing audit and a live campaign for a local Agra business or SkillYards brand.",
  },
];

const reality = [
  { text: "You run campaigns on real Google Ads and Meta accounts", yes: true },
  { text: "You track real SEO rankings moving week by week", yes: true },
  { text: "You present campaign reports to real clients", yes: true },
  { text: "You use the same tools working marketers use daily", yes: true },
  { text: "You watch videos and take a quiz to get a certificate", yes: false },
  { text: "You practice on demo accounts with zero ad spend", yes: false },
];

export function DGMOJTExplained() {
  return (
        <section className="bg-card/20 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                On-Job Training
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Other Institutes Teach You What SEO Is{" "} <br />
                <span className=" text-primary">We Make You Run an SEO Campaign</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                The difference between knowing digital marketing and doing digital marketing is a job offer.
              </p>
            </div>

            <div className="mb-10 grid gap-5 sm:grid-cols-2">
              {points.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-bold text-foreground">{p.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-5 font-serif text-xl font-extrabold text-foreground">
                What your training actually looks like:
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {reality.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.yes ? (
                      <CheckCircle size={16} className="shrink-0 text-green-500" />
                    ) : (
                      <X size={16} className="shrink-0 text-red-400" />
                    )}
                    <span className={`text-sm ${item.yes ? "font-medium text-foreground" : "text-muted-foreground line-through"}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
  );
}
