"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Target } from "lucide-react";

const forList = [
  { label: "Fresh graduates (any degree)", sub: "BCA/BSc/BTech who learned theory but can't build anything" },
  { label: "Career switchers", sub: "Working in banking, BPO, sales want into tech in 6 months" },
  { label: "12th pass students", sub: "Want to start earning before committing to a 3-year degree" },
  { label: "Self-taught learners stuck on YouTube", sub: "Know the basics but can't build or deploy real apps" },
];

const notForList = [
  { label: "Someone who wants a quick 1-month certificate" },
  { label: "Someone expecting 100% of learning to happen in class" },
  { label: "Someone who won't put in 4–6 hours daily outside sessions" },
  { label: "Someone who just wants something on their CV without working" },
];

export function FSDWhoIsThisFor() {
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
                Honest About <span className="italic text-primary">Who We Can Help.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                We&apos;d rather tell you upfront than take your money and waste your time.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* For */}
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
                        <p className="font-semibold text-foreground text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Not for */}
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
                  If you want a degree alongside practical skills,{" "}
                  <a href="/programs/on-job-degree/best-bca-course-in-agra-with-job-training" className="font-bold text-primary underline underline-offset-4">
                    the BCA program
                  </a>{" "}
                  might be a better fit.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
  );
}
