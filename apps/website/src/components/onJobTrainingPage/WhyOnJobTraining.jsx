"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, FileStack, Rocket, Sparkles } from "lucide-react";

const reasons = [
  {
    title: "Project-First Learning",
    desc: "Concepts make more sense when tied to tasks, builds, campaigns, and deliverables. Training stays practical from start to finish.",
    icon: FileStack,
    accent: "from-primary/15 to-primary/5",
  },
  {
    title: "Shorter Path To Hiring",
    desc: "These tracks remove extra academic layers and focus on skill-building, portfolio proof, interview prep, and role-specific readiness.",
    icon: Rocket,
    accent: "from-secondary/20 to-secondary/5",
  },
  {
    title: "Mentored Work Exposure",
    desc: "You train with guidance, feedback, and industry-style expectations so your work quality improves before interviews begin.",
    icon: BriefcaseBusiness,
    accent: "from-accent/20 to-accent/5",
  },
];

const highlights = [
  { value: "2 Tracks", label: "Full-Stack and Digital Marketing" },
  { value: "Hands-On", label: "Practical work over theory-only learning" },
  { value: "Placement Focus", label: "Portfolio, confidence, and interview prep" },
];

export default function WhyOnJobTraining() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-card/20 to-background py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            <Sparkles size={13} />
            Why Choose This Path
          </div>
          <h2 className="font-serif text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Skill training,
            <span className="block italic text-primary">built for quick momentum.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            On-job training works best when learning stays close to actual execution. These programs focus on high-value skills, guided practice, and job-ready output.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mx-auto max-w-5xl rounded-[2rem] border border-border/60 bg-card/60 p-4 shadow-sm sm:p-6"
        >
          <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What makes it different
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className="flex h-full flex-col rounded-2xl border border-border/60 bg-background px-5 py-5 text-center"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  0{index + 1}
                </p>
                <p className="mt-2 text-xl font-extrabold text-foreground">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {reasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <div className={`absolute inset-x-0 top-0 h-24 bg-linear-to-br ${item.accent} opacity-90`} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-background text-primary shadow-sm">
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 font-serif text-2xl font-extrabold leading-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
