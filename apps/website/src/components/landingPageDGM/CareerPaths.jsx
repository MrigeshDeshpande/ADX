"use client";

import { motion } from "framer-motion";
import { Briefcase, Laptop, Rocket } from "lucide-react";

const paths = [
  {
    icon: Briefcase,
    path: "Employment",
    color: "border-blue-400/30 bg-blue-50/50 dark:bg-blue-950/10",
    iconBg: "bg-blue-500",
    roles: [
      { title: "Digital Marketing Executive", salary: "₹3–5 LPA" },
      { title: "SEO Analyst", salary: "₹3–4 LPA" },
      { title: "Performance Marketing / PPC Executive", salary: "₹4–6 LPA" },
      { title: "Social Media Manager", salary: "₹3–5 LPA" },
      { title: "Content Marketing Executive", salary: "₹3–4 LPA" },
      { title: "Digital Marketing Manager (2–3 yrs)", salary: "₹8–15 LPA" },
    ],
    note: "In-house at a brand, or at a digital marketing agency. Structured career ladder with clear growth path.",
  },
  {
    icon: Laptop,
    path: "Freelance / Consulting",
    color: "border-green-400/30 bg-green-50/50 dark:bg-green-950/10",
    iconBg: "bg-green-500",
    roles: [
      { title: "Freelance SEO Consultant", salary: "₹20,000–80,000/month" },
      { title: "Freelance Meta / Google Ads Manager", salary: "₹15,000–60,000/month" },
      { title: "Social Media Manager for Local Businesses", salary: "₹10,000–30,000/month per client" },
      { title: "Content Creator + Brand Collaborations", salary: "Varies" },
    ],
    note: "Work from home, set your own hours, grow on your own terms. Many students freelance while searching for full-time roles.",
  },
  {
    icon: Rocket,
    path: "Entrepreneurship",
    color: "border-purple-400/30 bg-purple-50/50 dark:bg-purple-950/10",
    iconBg: "bg-purple-500",
    roles: [
      { title: "Start a digital marketing agency", salary: "Unlimited upside" },
      { title: "Grow your own e-commerce / D2C brand", salary: "Depends on product" },
      { title: "Scale your family business online", salary: "Business growth" },
      { title: "Run paid ads for local Agra businesses", salary: "₹10K–50K/month per client" },
    ],
    note: "Many SkillYards graduates use this course to grow their family shop or local business online before even looking for a job.",
  },
];

export function DGMCareerPaths() {
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
                Career Paths
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                One Course.{" "}
                <span className="italic text-primary">Three Completely Different Outcomes.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Whether you want a job, freelance freedom, or to grow your own business this course opens all three doors.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {paths.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex flex-col rounded-3xl border p-6 shadow-sm ${p.color}`}
                  >
                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${p.iconBg}`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="mb-4 font-serif text-xl font-extrabold text-foreground">{p.path}</h3>
                    <ul className="mb-4 flex-1 space-y-2.5">
                      {p.roles.map((r) => (
                        <li key={r.title} className="flex items-start justify-between gap-3 text-sm">
                          <span className="text-foreground">{r.title}</span>
                          <span className="shrink-0 rounded-full bg-background/70 px-2 py-0.5 text-xs font-semibold text-primary">{r.salary}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto rounded-xl bg-background/50 p-3 text-xs leading-relaxed text-muted-foreground">
                      {p.note}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
  );
}
