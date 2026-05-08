"use client";

import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OnJobTrainingHero() {
  return (
    <section className="relative flex w-full items-center overflow-hidden bg-background h-[80vh] md:h-[65vh] desk:h-[80vh] py-20 md:py-0 desk:py-36 border-b-2">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
        >
          <BriefcaseBusiness size={13} className="text-secondary" />
          Learn By Doing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-serif text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-5xl desk:text-7xl"
        >
          Fast-Track Skills + <br />
          <span className="italic text-primary">On-Job Training</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Choose a focused career track, train on practical work, build portfolio-ready output, and prepare for interviews with mentor guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="w-full rounded-full bg-primary px-8 py-6 text-sm font-extrabold text-primary-foreground shadow-xl shadow-black/20 dark:shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 sm:w-auto"
          >
            <Link href="#training-programs">
              View Courses <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full rounded-full border-2 border-border bg-background px-8 py-6 text-sm font-bold text-foreground transition-all hover:scale-105 hover:bg-card sm:w-auto"
          >
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE?.replace(/\D/g, "") || "917060100561"}`} target="_blank" rel="noopener noreferrer">
              <PhoneCall size={16} className="mr-2" /> Chat on WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
