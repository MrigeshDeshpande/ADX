"use client";

import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";

const stats = [
  { value: "3", label: "students placed, first batch" },
  { value: "SN Digitech & 7th Triangle", label: "companies hiring our graduates" },
  { value: "Frontend & Full-Stack", label: "developer roles" },
  { value: "₹3.5 LPA", label: "average starting package" },
];

export default function PlacementOutcomes() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-12">
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
            Where our students are going
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            SkillYards started in 2023. We&apos;re a young institute and we won&apos;t pretend otherwise. What we
            can tell you is that students from our first batch are already placed, and we supported them
            every step of the way.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 grid grid-cols-2 gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-2xl font-extrabold leading-tight text-primary sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground"
        >
          Resume building, mock interview sessions, technical test preparation, direct referrals to
          hiring partners, and continued support until placement. We work with you until you&apos;re placed,
          not just until you graduate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm"
        >
          <Quote size={28} className="mb-3 text-primary/20" />
          <p className="text-sm italic text-muted-foreground">
            [Testimonial to be added, awaiting student approval]
          </p>
        </motion.div>

      </div>
    </section>
  );
}
