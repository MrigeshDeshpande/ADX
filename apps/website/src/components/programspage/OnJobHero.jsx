"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OnJobHero() {
  return (
    <section className="relative flex w-full items-center overflow-hidden bg-background h-[80vh] md:h-[65vh] desk:h-[80vh] py-20 md:py-0 desk:py-36 border-b-2">
      {/* Background Image & Glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/ProgramBG.webp"
          alt="On-Job Degree Background"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-100"
        />

        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-background/20 dark:border-primary/20 bg-background/10 dark:bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-background dark:text-primary backdrop-blur-xs dark:backdrop-blur-none"
        >
          <GraduationCap size={13} className="text-secondary" />
          Earn While You Learn
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-serif text-4xl font-extrabold leading-[1.1] tracking-tight text-background dark:text-foreground sm:text-5xl md:text-5xl desk:text-7xl drop-shadow-md dark:drop-shadow-none"
        >
          University Degree + <br />
          <span className="italic text-secondary dark:text-primary">On-Job Training</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-background/90 dark:text-muted-foreground sm:text-lg drop-shadow-sm dark:drop-shadow-none"
        >
          Get the best of both worlds. A recognized university degree (BCA/BBA) combined with 
          <strong className="text-background dark:text-foreground"> guaranteed on-job training</strong> in top companies. 
          Graduate with 3 years of work experience.
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
            <Link href="#degree-programs">
              View Degrees <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full rounded-full border-2 border-background/30 dark:border-border bg-background/10 dark:bg-foreground/5 px-8 py-6 text-sm font-bold text-background dark:text-foreground transition-all hover:scale-105 hover:bg-background/20 dark:hover:bg-foreground/10 sm:w-auto backdrop-blur-xs dark:backdrop-blur-none"
          >
            <Link href="/contact">
              Admission Inquiry
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
