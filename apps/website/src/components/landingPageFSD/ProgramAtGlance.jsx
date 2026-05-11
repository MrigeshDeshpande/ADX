"use client";

import { motion } from "framer-motion";
import { Clock, Monitor, GraduationCap, Users, Calendar, BadgeCheck, Briefcase, IndianRupee, CreditCard, Zap } from "lucide-react";

const facts = [
  { icon: Clock, label: "Duration", value: "6 Months" },
  { icon: Monitor, label: "Mode", value: "Offline (Agra Campus)" },
  { icon: GraduationCap, label: "Eligibility", value: "12th pass or any graduate" },
  { icon: Users, label: "Batch Size", value: "Max 20 students" },
  { icon: Calendar, label: "Schedule", value: "Weekday & Weekend batches" },
  { icon: BadgeCheck, label: "Certification", value: "SkillYards Industry Certificate" },
  { icon: Briefcase, label: "Placement", value: "100% placement assistance" },
  { icon: Calendar, label: "Next Batch", value: "April 2026" },
  { icon: IndianRupee, label: "Fee", value: "Starting ₹25,000" },
  { icon: CreditCard, label: "EMI", value: "Available easy instalments" },
];

export function FSDProgramAtGlance() {
  return (
        <section className="bg-card/30 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <Zap size={13} />
                Program at a Glance
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Everything You Need to Know.{" "}
                <span className="italic text-primary">In 10 Seconds.</span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              {facts.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{f.label}</p>
                    <p className="text-sm font-semibold text-foreground leading-snug">{f.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
  );
}
