"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";

export function DGMHero() {
  return (
        <section className="relative w-full overflow-hidden bg-background pt-24 pb-16 md:py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            {/* Breadcrumbs */}
            <div className="mb-5 flex justify-center">
              <Breadcrumbs currentLabel="Digital Marketing" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
            >
              <Star size={12} className="fill-current text-secondary" />
              4-Month On-Job Training · Digital Marketing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Learn to Market Any Business Online {" "}
              <span className="italic text-primary">and Get Paid for It.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              No coding. No prior experience. Just 4 months of real campaigns, real tools, and industry certifications and a career in one of India&apos;s fastest-growing fields.
              You leave with <strong className="text-foreground">Google, Meta & HubSpot certifications</strong> and a portfolio of live campaign results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-primary px-8 py-6 text-sm font-extrabold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:scale-105 hover:bg-primary/90 sm:w-auto"
              >
                <Link href="/contact">
                  Apply for Free Demo Class <ArrowRight size={17} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
  );
}
