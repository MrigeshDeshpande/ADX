"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FSDFinalCTA() {
  return (
        <section className="relative overflow-hidden bg-primary py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-foreground/60"
            >
              <Calendar size={13} />
              Next batch: April 2026 · <span className="text-primary-foreground">8 seats remaining</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl md:text-5xl"
            >
              The Best Time to Start Was Yesterday.
              <br className="hidden sm:block" />
              <span className="opacity-75">The Second Best is Now.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mx-auto mt-4 max-w-lg text-sm text-primary-foreground/70 sm:text-base"
            >
              Not ready to enroll? Start with the free demo class no commitment, no fee.
              See exactly how we teach before you decide.
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
                  Register for Free Demo <ArrowRight size={17} className="ml-2" />
                </Link>
              </Button>

            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-5"
            >
              <Link
                href="https://wa.me/7895501840?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20the%20Full-Stack%20Development%20course"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-foreground/70 underline underline-offset-4 hover:text-primary-foreground"
              >
                <MessageCircle size={15} /> Or chat on WhatsApp
              </Link>
            </motion.div>

            <p className="mt-4 text-xs text-primary-foreground/40">
              No spam. No pressure. Answer your questions first, enroll when you&apos;re ready.
            </p>
          </div>
        </section>
  );
}
