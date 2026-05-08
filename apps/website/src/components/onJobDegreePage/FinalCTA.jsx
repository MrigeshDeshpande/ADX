"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-xs font-bold uppercase tracking-widest text-primary-foreground/60"
        >
          Your Next Step
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl md:text-5xl"
        >
          Ready to Start? <br className="hidden sm:block" />
          <span className="opacity-80">Or Still Deciding?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/70"
        >
          Either way, we&apos;re here to help not to pressure. Talk to a counsellor first, or go straight to enrollment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="w-full rounded-full bg-primary-foreground px-8 py-6 text-sm font-extrabold text-primary shadow-xl transition-all hover:scale-105 hover:bg-primary-foreground/90 sm:w-auto"
          >
            <Link href="/contact">
              Enroll Now <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full rounded-full border-2 border-primary-foreground/30 bg-transparent px-8 py-6 text-sm font-bold text-primary-foreground transition-all hover:scale-105 hover:bg-primary-foreground/10 sm:w-auto"
          >
            <Link
              href="https://wa.me/917895501840?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20SkillYards%20programs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} className="mr-2" /> Chat on WhatsApp
            </Link>
          </Button>
        </motion.div>

        <p className="mt-6 text-xs text-primary-foreground/50">
          No spam. No hard sell. We&apos;ll answer your questions and let you decide.
        </p>
      </div>
    </section>
  );
}
