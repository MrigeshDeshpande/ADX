"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Target } from "lucide-react";

const forList = [
  { label: "Arts, Commerce, or BBA graduates", sub: "Struggling to find a good-paying job this puts digital skills behind your degree" },
  { label: "Homemakers & career re-entrants", sub: "Flexible skill, can freelance from home genuine demand for good digital marketers" },
  { label: "Small business owners & family business kids", sub: "Want to grow their shop or brand online you can apply everything immediately" },
  { label: "12th pass students", sub: "Want to start earning within 6 months without committing to a 3-year degree" },
  { label: "Working professionals in sales, PR, or marketing", sub: "Want to add digital skills and move to an agency, startup, or better-paying role" },
];

const notForList = [
  { label: "Someone who wants to passively watch videos and get certified" },
  { label: "Someone who won't practice on live accounts outside class hours" },
  { label: "Someone expecting overnight SEO results this takes consistent effort" },
  { label: "Someone who wants to code and build software check Full-Stack Dev instead" },
];

export function DGMWhoIsThisFor() {
  return (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <Target size={13} />
                Is This For You?
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                From 19 to 45 {" "}
                <span className="italic text-primary">This Course Works for Every Background.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                We&apos;ll be honest about who gets the most out of this and who doesn&apos;t.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-green-300/40 bg-green-50/50 p-6 dark:border-green-800/30 dark:bg-green-950/10"
              >
                <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-extrabold text-green-700 dark:text-green-400">
                  <CheckCircle size={20} /> This is for you if...
                </h3>
                <ul className="space-y-4">
                  {forList.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-500" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-red-300/40 bg-red-50/50 p-6 dark:border-red-800/30 dark:bg-red-950/10"
              >
                <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-extrabold text-red-600 dark:text-red-400">
                  <XCircle size={20} /> This is NOT for you if...
                </h3>
                <ul className="space-y-3">
                  {notForList.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl bg-background/60 p-3 text-xs text-muted-foreground">
                  Want to build software instead?{" "}
                  <a href="/full-stack-web-development-training-in-agra" className="font-bold text-primary underline underline-offset-4">
                    The Full-Stack Development course
                  </a>{" "}
                  is designed for you.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
  );
}
