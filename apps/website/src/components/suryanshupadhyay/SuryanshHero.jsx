"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const socials = [
    { icon: Linkedin, url: "https://www.linkedin.com/in/suryansh-upadhyay", label: "LinkedIn" },
    { icon: Twitter, url: "#", label: "Twitter" },
    { icon: Instagram, url: "#", label: "Instagram" },
];

export default function SuryanshHero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row items-center gap-10 md:gap-16 px-6 py-16 md:py-20"
        >
            {/* Image */}
            <div className="relative group shrink-0 w-52 h-48 md:w-64 md:h-64 mt-6 md:mt-10">
                {/* Glow ring */}
                <div className="absolute -inset-3 rounded-full bg-linear-to-br from-primary/30 via-secondary/20 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Strict Circle Frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-primary/20 shadow-2xl bg-secondary/10">
                    <Image
                        src="/images/team/suryanshSir.webp"
                        alt="Suryansh Upadhyay"
                        fill
                        sizes="(max-width: 768px) 208px, 256px"
                        className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left max-w-xl">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full mb-4"
                >
                    Chief Executive Officer
                </motion.p>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
                >
                    Suryansh Upadhyay
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-4 text-muted-foreground leading-relaxed"
                >
                    A visionary leader with deep expertise in business strategy, marketing, and organizational growth.
                    Suryansh drives SkillYards&apos; mission to deliver impactful, skill-based learning experiences
                    that bridge the gap between education and industry.
                </motion.p>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-6 flex justify-center md:justify-start gap-3"
                >
                    {socials.map(({ icon: Icon, url, label }) => (
                        <a
                            key={label}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={label}
                            className="group/icon p-2.5 rounded-xl bg-primary/5 border border-primary/10 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}