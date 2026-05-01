"use client";

import { motion } from "framer-motion";
import { TrendingUp, Briefcase, IndianRupee, Laptop, Globe, Rocket } from "lucide-react";

const reasons = [
  {
    icon: Globe,
    stat: "60 Lakh+",
    label: "Digital marketing job openings in India by 2026",
    sub: "Demand is growing faster than supply skilled candidates are being hired fast.",
  },
  {
    icon: IndianRupee,
    stat: "₹3–15 LPA",
    label: "Salary range from fresher to 3 years experience",
    sub: "Entry-level roles start at ₹3–5 LPA. Performance marketers with 2–3 years can earn ₹10–15 LPA.",
  },
  {
    icon: Briefcase,
    stat: "4 Career Paths",
    label: "In-house, agency, freelance, or your own business",
    sub: "No other skill gives you this range of outcomes from a single course.",
  },
  {
    icon: Laptop,
    stat: "Zero Coding",
    label: "No technical background needed whatsoever",
    sub: "If you can use Instagram and Google, you already have more foundation than you think.",
  },
  {
    icon: TrendingUp,
    stat: "Every Business",
    label: "Needs digital marketing from a chai stall to a startup",
    sub: "Traditional marketing is shrinking. Digital is where every rupee of marketing budget is moving.",
  },
  {
    icon: Rocket,
    stat: "Work Anywhere",
    label: "Remote, freelance, or in-office digital marketing is location-free",
    sub: "Manage campaigns from Agra for a client in Mumbai or Singapore. Your laptop is your office.",
  },
];

export function DGMWhyDigitalMarketing() {
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
                The Opportunity
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Why Digital Marketing is the <br />
                <span className="text-primary">Smartest Career Move Right Now</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Whether you want a job, want to freelance, or want to grow your own business digital marketing is the one skill that works for all three.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <p className="mb-0.5 text-2xl font-extrabold text-primary">{r.stat}</p>
                    <p className="mb-2 text-sm font-bold text-foreground">{r.label}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{r.sub}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
  );
}
