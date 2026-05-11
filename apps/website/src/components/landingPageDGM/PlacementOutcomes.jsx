"use client";

import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";

const alumni = [
  {
    name: "Priya Sharma",
    before: "BCom graduate, was working at a retail shop no digital skills",
    role: "Digital Marketing Executive",
    company: "Student outcome",
    package: "—",
    quote: "The practical assignments and mentor feedback helped me build confidence and a portfolio I could explain clearly in interviews.",
  },
  {
    name: "Pooja Agarwal",
    before: "Homemaker for 5 years, wanted to restart her career from home",
    role: "Freelance Social Media Manager",
    company: "Student outcome",
    package: "—",
    quote: "The training helped me learn the basics of pitching, reporting, and communicating work professionally.",
  },
  {
    name: "Rahul Bansal",
    before: "Family runs a clothing business in Agra wanted to grow it online",
    role: "Head of Digital Marketing",
    company: "Family Business (self)",
    package: "—",
    quote: "The practical projects helped me understand content planning, ads concepts, and reporting workflows.",
  },
];

const roles = [
  "Digital Marketing Executive",
  "SEO Analyst",
  "PPC / Performance Marketing Executive",
  "Social Media Manager",
  "Content Marketing Executive",
  "Freelance DM Consultant",
];

export function DGMPlacementOutcomes() {
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
                Dedicated placement support and career preparation.
              </h2>
            </div>

            <div className="mb-12 grid grid-cols-2 gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:grid-cols-4">
              {[
                { value: "Dedicated", label: "Placement Support" },
                { value: "Portfolio", label: "Practical Projects" },
                { value: "Mentors", label: "Guided Learning" },
                { value: "Preparation", label: "Interview Readiness" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                  <p className="text-2xl font-extrabold text-primary sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mb-10 grid gap-5 sm:grid-cols-3">
              {alumni.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-sm">
                  <Quote size={26} className="mb-3 text-primary/20" />
                  <p className="mb-4 flex-1 text-sm italic leading-relaxed text-muted-foreground">&ldquo;{a.quote}&rdquo;</p>
                  <div className="border-t border-border pt-4 text-sm">
                    <p className="font-bold text-foreground">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.before}</p>
                    <p className="mt-1 text-xs font-semibold text-primary">{a.role} @ {a.company}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{a.package}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Roles graduates are hired for</p>
              <div className="flex flex-wrap justify-center gap-2">
                {roles.map((r) => (
                  <span key={r} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">{r}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
}
