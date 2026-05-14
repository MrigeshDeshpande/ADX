"use client";

import { useState } from "react";
import { faqCategories } from "@/data/faqs";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function ProgramsFAQ({ limit }) {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = typeof limit === "number"
    ? faqCategories.general.faqs.slice(0, limit)
    : faqCategories.general.faqs;

  return (
    <section className="relative bg-background py-20 overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] -mr-48 -mt-48" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
          >
            <HelpCircle size={13} />
            FAQ
          </motion.div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Questions We Get{" "}
            <span className="italic text-primary">Every Day.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Answered honestly because that&apos;s how decisions should be made.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-primary/30 bg-card/60 shadow-lg shadow-primary/5"
                    : "border-border/50 bg-card/20 hover:border-border"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className={`text-base font-bold transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`ml-4 shrink-0 rounded-full p-1.5 transition-all ${
                      isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Still have questions?{" "}
          <Link href="/contact" className="font-bold text-primary underline underline-offset-4 hover:opacity-80">
            Talk to our team
          </Link>
        </p>
      </div>
    </section>
  );
}
