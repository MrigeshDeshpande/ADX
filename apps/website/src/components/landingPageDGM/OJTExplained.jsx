"use client";

import { motion } from "framer-motion";
import { IndianRupee, BarChart2, Wrench, FileBarChart, CheckCircle, X } from "lucide-react";

const points = [
  {
    icon: IndianRupee,
    title: "Mentor-guided campaign practice from Month 2",
    desc: "You learn campaign execution through structured, mentor-guided practical work designed to reflect real workflows — focused on skills, process, and measurable learning outcomes.",
  },
  {
    icon: BarChart2,
    title: "Your portfolio is campaign performance data not screenshots",
    desc: "You build portfolio-ready case work: campaign plans, audits, reports, and learn how to read performance metrics clearly and confidently.",
  },
  {
    icon: Wrench,
    title: "Paid tools included no self-arrangement needed",
    desc: "Students get access to Ahrefs, SEMrush, Canva Pro, and Google Workspace during the course. Most institutes make you figure this out yourself.",
  },
  {
    icon: FileBarChart,
    title: "Month 4 is practical projects, not just theory",
    desc: "Your final month is dedicated to practical project work: audits, content planning, campaign simulations, reporting exercises, and mentor feedback.",
  },
];

const reality = [
  { text: "You execute mentor-guided practical campaign work", yes: true },
  { text: "You learn reporting, analysis, and optimization workflows", yes: true },
  { text: "You practice presenting your work with mentor feedback", yes: true },
  { text: "You use the same tools working marketers use daily", yes: true },
  { text: "You only watch videos and take quizzes", yes: false },
  { text: "You do only theory without hands-on work", yes: false },
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
                Mentor-led practical training focused on skills, projects, and career preparation.
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
