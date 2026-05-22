"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function SupportFAQ({ faqsByCategory }) {
    const [activeTab, setActiveTab] = useState(0);
    const [openIndex, setOpenIndex] = useState(0);

    const current = faqsByCategory[activeTab];

    return (
        <section className="bg-muted/40 border-y border-border py-16 px-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        <HelpCircle size={12} />
                        Common Questions
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground">
                        Quick Answers
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        The questions we hear most — answered clearly.
                    </p>
                </div>

                {/* Tabs — horizontally scrollable on mobile */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
                    {faqsByCategory.map((cat, i) => (
                        <button
                            key={cat.id}
                            onClick={() => { setActiveTab(i); setOpenIndex(0); }}
                            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                                activeTab === i
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {current.faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border transition-all duration-300 ${
                                    isOpen
                                        ? "border-primary/30 bg-card shadow-sm"
                                        : "border-border bg-card hover:border-border/80"
                                }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                                    className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left"
                                >
                                    <span className={`text-sm sm:text-base font-bold leading-snug transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 rounded-full p-1.5 transition-all ${isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                                        {isOpen ? <Minus size={13} /> : <Plus size={13} />}
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
                                            <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm leading-relaxed text-muted-foreground">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Didn&apos;t find your answer?{" "}
                    <Link href="/contact" className="font-bold text-primary underline underline-offset-4 hover:opacity-80">
                        Contact our team
                    </Link>
                </p>
            </div>
        </section>
    );
}
