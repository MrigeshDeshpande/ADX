"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const socials = [
    { icon: Linkedin, url: "#", label: "LinkedIn" },
    { icon: Twitter, url: "#", label: "Twitter" },
    { icon: Instagram, url: "#", label: "Instagram" },
];

export default function RahulHero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 px-6 py-16 md:py-20"
        >
            {/* Image */}
            <div className="relative group shrink-0 w-52 h-52 md:w-64 md:h-64 mt-6 md:mt-10">
                {/* Glow ring */}
                <div className="absolute -inset-3 rounded-full bg-linear-to-br from-secondary/30 via-primary/20 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Strict Circle Frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-secondary/20 shadow-2xl bg-secondary/10">
                    <Image
                        src="/images/team/rahul-singh.webp"
                        alt="Rahul Singh"
                        fill
                        className="object-cover object-top scale-[1.15] group-hover:scale-[1.25] transition-transform duration-700"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-right max-w-xl">
                <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full mb-4"
                >
                    Chief Operating Officer
                </motion.p>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
                >
                    Rahul Singh
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-4 text-muted-foreground leading-relaxed"
                >
                    A dynamic operations leader driving SkillYards&apos; day-to-day excellence.
                    Rahul ensures seamless execution across all verticals, fostering a culture of
                    innovation, efficiency, and student-first thinking that powers real learning outcomes.
                </motion.p>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-6 flex justify-center md:justify-end gap-3"
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