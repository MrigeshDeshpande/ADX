"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqCategories } from "@/data/faqs";

export default function FAQSection({ category = "homepage", limit = 4 }) {
  const [openIndex, setOpenIndex] = useState(0);

  const displayFaqs =
    faqCategories[category]?.faqs?.slice(0, limit) || [];

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest"
          >
            <HelpCircle size={14} />
            <span>Support Center</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get answers about our programs, placements, fees, and how to get started.
          </p>
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group rounded-[2rem] border transition-all duration-300 ${
                  isOpen
                    ? "border-primary/30 bg-card/50 shadow-xl shadow-primary/5"
                    : "border-border/40 bg-card/20 hover:border-border/80"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span
                    className={`text-lg font-bold transition-colors ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`shrink-0 ml-4 p-2 rounded-full transition-transform duration-300 ${
                      isOpen
                        ? "bg-primary text-primary-foreground rotate-0"
                        : "bg-muted text-muted-foreground rotate-90"
                    }`}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-muted-foreground text-base leading-relaxed max-w-[90%]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need more answers?{" "}
            <a
              href="/faqs"
              className="text-primary font-bold underline underline-offset-4 hover:opacity-80"
            >
              View all FAQs
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
