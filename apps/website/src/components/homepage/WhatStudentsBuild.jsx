"use client";

import { motion } from "framer-motion";
import { Globe, Megaphone, UserCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const projectCategories = [
    {
        title: "Website Projects",
        description: "Students build responsive websites, landing pages, portfolios, and basic web apps using HTML, CSS, JavaScript, React, and modern development tools.",
        icon: <Globe className="w-8 h-8 text-primary" />,
        features: ["Responsive Design", "React Components", "API Integration"]
    },
    {
        title: "Marketing & Business Projects",
        description: "BBA and digital marketing students work on campaign ideas, content calendars, landing-page audits, ad-copy exercises, and basic performance reports.",
        icon: <Megaphone className="w-8 h-8 text-primary" />,
        features: ["Campaign Strategy", "SEO Audits", "Content Planning"]
    },
    {
        title: "Career Preparation Work",
        description: "Students practice resumes, LinkedIn profiles, interview answers, communication, aptitude basics, and project explanation with mentor support.",
        icon: <UserCheck className="w-8 h-8 text-primary" />,
        features: ["Mock Interviews", "Resume Building", "Soft Skills"]
    }
];

export default function WhatStudentsBuild() {
    return (
        <section className="relative py-24 overflow-hidden bg-background">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                            What Students Build at <span className="text-primary italic">SkillYards</span>
                        </h2>
                        <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            SkillYards focuses on practical learning. Students do not just watch lectures — they work on projects, assignments, campaigns, presentations, and career-preparation tasks that help them understand how real work happens.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projectCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={false}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {category.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">{category.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {category.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {category.features.map((feature, i) => (
                                    <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/programs"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 hover:gap-3 transition-all duration-300 hover:-translate-y-1"
                    >
                        Explore SkillYards Programs
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
