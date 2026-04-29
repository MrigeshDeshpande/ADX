"use client";

import Link from "next/link";

export default function CTASection() {
    return (
        <section className="bg-linear-to-r from-primary to-secondary text-primary-foreground py-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                    Take the Leap & Upskill with SkillYards
                </h2>
                <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90">
                    Join our On Job Training & On Job Degree programs today and get hands-on experience in emerging IT technologies.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-background text-primary font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform"
                    >
                        Get a Free Demo
                    </Link>
                    <Link
                        href="/programs"
                        className="px-8 py-4 bg-primary/80 text-primary-foreground font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform"
                    >
                        Explore Programs
                    </Link>
                </div>
            </div>
        </section>
    );
}
