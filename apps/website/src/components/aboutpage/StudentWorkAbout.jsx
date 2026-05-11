"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function StudentWorkAbout() {
    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-extrabold mb-4"
                    >
                        What Students Build at SkillYards
                    </motion.h2>
                    <motion.p 
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-muted-foreground max-w-2xl mx-auto text-lg"
                    >
                        Our training is defined by the quality of work our students produce. From day one, the focus is on practical implementation.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
                                Project-First Learning
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Students do not just watch lectures. They work on real-world assignments, industry campaigns, and technical tasks that simulate actual work environments.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">02</span>
                                Verifiable Proof
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Every student builds a portfolio that showcases their ability to solve problems, write clean code, or manage digital marketing campaigns effectively.
                            </p>
                        </div>
                    </div>

                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-[2rem] p-8 md:p-12">
                        <h4 className="text-xl font-bold mb-6">Current Focus Areas</h4>
                        <ul className="space-y-4">
                            {[
                                "Responsive Website Development",
                                "Performance Marketing Audits",
                                "Full-Stack Application Logic",
                                "Social Media Content Calendars",
                                "SEO Strategy Implementation",
                                "Career Readiness Portfolios"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-foreground font-medium">
                                    <CheckCircle2 className="text-primary w-5 h-5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
