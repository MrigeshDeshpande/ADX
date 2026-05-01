"use client";

import { motion } from "framer-motion";
import { CheckCircle, X, LayoutList } from "lucide-react";

const rows = [
  { feature: "Live client campaigns with real budgets", skillyards: true, others: false, youtube: false },
  { feature: "Real ad spend managed during training", skillyards: true, others: false, youtube: false },
  { feature: "Google, Meta & HubSpot certifications", skillyards: true, others: "Sometimes", youtube: false },
  { feature: "Paid tools access (Ahrefs, SEMrush, Canva Pro)", skillyards: true, others: false, youtube: "Self-arranged" },
  { feature: "Active placement referrals + mock interviews", skillyards: true, others: "Generic", youtube: false },
  { feature: "Batch size ≤ 20 (personalised attention)", skillyards: true, others: false, youtube: false },
  { feature: "1:1 mentor access for doubt clearing", skillyards: true, others: false, youtube: false },
  { feature: "Portfolio of real, measurable campaign results", skillyards: true, others: false, youtube: false },
];

function Cell({ value }) {
  if (value === true) return <CheckCircle size={17} className="mx-auto text-green-500" />;
  if (value === false) return <X size={17} className="mx-auto text-red-400" />;
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

export function DGMComparisonTable() {
  return (
        <section className="bg-card/20 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <LayoutList size={13} />
                SkillYards vs Others
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Why Not Just Google Digital Garage{" "}
                <span className="italic text-primary">or a Local Institute?</span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-x-auto rounded-3xl border border-border shadow-sm"
            >
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="rounded-tl-3xl px-5 py-4 text-left font-bold">Feature</th>
                    <th className="px-5 py-4 text-center font-bold">SkillYards OJT</th>
                    <th className="px-5 py-4 text-center font-bold">Other Institutes</th>
                    <th className="rounded-tr-3xl px-5 py-4 text-center font-bold">YouTube / Free Courses</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className={`border-t border-border transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-background" : "bg-card/50"}`}>
                      <td className="px-5 py-3.5 font-medium text-foreground">{row.feature}</td>
                      <td className="px-5 py-3.5 text-center"><Cell value={row.skillyards} /></td>
                      <td className="px-5 py-3.5 text-center"><Cell value={row.others} /></td>
                      <td className="px-5 py-3.5 text-center"><Cell value={row.youtube} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>
  );
}
