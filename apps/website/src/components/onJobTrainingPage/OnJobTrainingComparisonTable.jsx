"use client";

import { motion } from "framer-motion";
import { CheckCircle, LayoutList } from "lucide-react";

const programs = ["Full-Stack", "Digital Marketing"];

const rows = [
  { label: "Duration", values: ["6 Months", "3 Months"] },
  { label: "Type", values: ["Skill Course", "Skill Course"] },
  { label: "Training Style", values: ["Projects + Development Workflow", "Campaigns + Marketing Execution"] },
  { label: "Eligibility", values: ["10+2 + basic computer knowledge", "10+2 pass"] },
  { label: "Certification", values: ["Industry Certificate + Portfolio", "Google, Meta & SkillYards Certs"] },
  { label: "Core Skills", values: ["React, Node, APIs, DB", "SEO, Ads, Content, Analytics"] },
  { label: "Placement Support", values: ["100% Assistance", "100% Assistance"] },
  { label: "Mode", values: ["Hybrid", "Hybrid"] },
  { label: "Ideal For", values: ["Developer roles", "Marketing roles"] },
  { label: "EMI Available", values: ["Yes", "Yes"] },
];

export default function OnJobTrainingComparisonTable() {
  return (
    <section className="bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
          >
            <LayoutList size={13} />
            Side-by-Side Comparison
          </motion.div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Pick Track That Fits{" "}
            <span className="italic text-primary">Your Goal.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Both paths are practical and placement-focused. Compare them quickly before choosing your direction.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-3xl border border-border shadow-sm max-w-5xl mx-auto"
        >
          <table className="w-full min-w-[700px] border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="rounded-tl-3xl px-6 py-4 text-left font-bold">Feature</th>
                {programs.map((program, i) => (
                  <th
                    key={program}
                    className={`px-5 py-4 text-center font-bold ${i === programs.length - 1 ? "rounded-tr-3xl" : ""}`}
                  >
                    {program}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={row.label}
                  className={`border-t border-border transition-colors hover:bg-primary/5 ${ri % 2 === 0 ? "bg-background" : "bg-card/50"}`}
                >
                  <td className="px-6 py-4 font-semibold text-foreground">{row.label}</td>
                  {row.values.map((val, vi) => (
                    <td key={`${row.label}-${vi}`} className="px-5 py-4 text-center text-muted-foreground">
                      {val === "Yes" ? (
                        <CheckCircle size={16} className="mx-auto text-green-500" />
                      ) : (
                        val
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
