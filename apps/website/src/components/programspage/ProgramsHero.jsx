"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProgramsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background h-[80vh] py-20 md:py-28 desk:py-36 border-b-2  ">
      {/* Background Image & Glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/ProgramBG.webp"
          alt="Program Background"
          fill
          priority
          className="object-cover opacity-100"
        />

        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-background/20 dark:border-primary/20 bg-background/10 dark:bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-background dark:text-primary backdrop-blur-xs dark:backdrop-blur-none"
        >
          <Sparkles size={13} className="text-secondary" />
          Agra&apos;s #1 IT Training Institute
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-serif text-4xl font-extrabold leading-[1.1] tracking-tight text-background dark:text-foreground sm:text-5xl md:text-6xl desk:text-7xl drop-shadow-md dark:drop-shadow-none"
        >
          Turn Your Potential Into a{" "}
          <span className="italic text-secondary dark:text-primary">Paying Career.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-background/90 dark:text-muted-foreground sm:text-lg drop-shadow-sm dark:drop-shadow-none"
        >
          SkillYards blends university degrees with live on-job training so you graduate with a degree{" "}
          <strong className="text-background dark:text-foreground">and</strong> real industry experience, not just a certificate.
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
            <Link href="/contact">
              Enroll Now <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full rounded-full border-2 border-background/30 dark:border-border bg-background/10 dark:bg-foreground/5 px-8 py-6 text-sm font-bold text-background dark:text-foreground transition-all hover:scale-105 hover:bg-background/20 dark:hover:bg-foreground/10 sm:w-auto backdrop-blur-xs dark:backdrop-blur-none"
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
