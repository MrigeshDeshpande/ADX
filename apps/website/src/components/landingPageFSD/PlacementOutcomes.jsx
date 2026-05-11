"use client";

import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";

const alumni = [
  {
    name: "Rahul Verma",
    before: "Was working in a BPO (data entry), no coding background",
    role: "Full-Stack Developer",
    company: "StartupBase Delhi",
    package: "₹5.8 LPA",
    quote: "Coming from zero, I was the most nervous person on Day 1. Six months later I'm pushing code to production every day. The OJT phase is what actually made me hireable not just the classes.",
  },
  {
    name: "Sneha Gupta",
    before: "BSc Computer Science graduate knew theory, couldn't build anything",
    role: "React Developer",
    company: "WebNova Solutions",
    package: "₹4.2 LPA",
    quote: "I had a CS degree and still couldn't build a working website. Three months into SkillYards I had a deployed React app. By Month 6 I had a job offer before the batch even ended.",
  },
  {
    name: "Arjun Saxena",
    before: "12th pass student who didn't want to wait 3 years for a degree",
    role: "Junior Full-Stack Developer",
    company: "TechSpark Noida",
    package: "₹3.9 LPA",
    quote: "My parents wanted me to do a degree. I showed them the job offer letter and the GitHub profile. That was the end of that conversation.",
  },
];

const roles = [
  "Junior Full-Stack Developer",
  "Frontend Developer (React)",
  "Backend Developer (Node.js)",
  "MERN Stack Developer",
  "Software Engineer",
];

export function FSDPlacementOutcomes() {
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
                <TrendingUp size={13} />
                Placement & Outcomes
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                The Numbers Don&apos;t Lie.{" "}
                <span className="italic text-primary">Neither Do the Stories.</span>
              </h2>
            </div>

            {/* Stats */}
            <div className="mb-12 grid grid-cols-2 gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:grid-cols-4">
              {[
                { value: "Dedicated", label: "Placement Support" },
                { value: "₹4.5 LPA", label: "Average Package" },
                { value: "< 60 days", label: "Median Time to First Offer" },
                { value: "180+", label: "Hiring Partners" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-2xl font-extrabold text-primary sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Alumni */}
            <div className="mb-10 grid gap-5 sm:grid-cols-3">
              {alumni.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-sm"
                >
                  <Quote size={26} className="mb-3 text-primary/20" />
                  <p className="mb-4 flex-1 text-sm italic leading-relaxed text-muted-foreground">
                    &ldquo;{a.quote}&rdquo;
                  </p>
                  <div className="border-t border-border pt-4 text-sm">
                    <p className="font-bold text-foreground">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.before}</p>
                    <p className="mt-1 text-xs font-semibold text-primary">
                      {a.role} @ {a.company}
                    </p>
                    <span className="mt-1.5 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {a.package}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Roles */}
            <div className="text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Roles graduates are hired for
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {roles.map((r) => (
                  <span key={r} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
}
