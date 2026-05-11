"use client";

import { motion } from "framer-motion";
import { CalendarDays, IndianRupee, CreditCard, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BatchFeeInfo({ batches = [] }) {
  if (!batches || batches.length === 0) return null;

  return (
    <section className="bg-card/20 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
          >
            <CalendarDays size={13} />
            Batch & Fee Info
          </motion.div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Next Batches Are{" "}
            <span className="italic text-primary">Filling Fast.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Seats are limited per batch to maintain quality mentorship. Secure yours early.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {batches.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <h3 className="mb-4 font-serif text-xl font-extrabold text-foreground">{b.program}</h3>

              <div className="mb-4 space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays size={14} className="text-primary shrink-0" />
                  <span>Next Batch: <strong className="text-foreground">{b.nextBatch}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IndianRupee size={14} className="text-primary shrink-0" />
                  <span>Fee: <strong className="text-foreground">{b.fee}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard size={14} className="text-primary shrink-0" />
                  <span>EMI: <strong className="text-green-600 dark:text-green-400">{b.emiAvailable ? "Available" : "Not available"}</strong></span>
                </div>
                {b.seatsLeft !== undefined && b.seatsLeft !== null && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={14} className="text-primary shrink-0" />
                    <span>
                      Seats left:{" "}
                      <strong className={b.seatsLeft <= 10 ? "text-red-500" : "text-foreground"}>
                        {b.seatsLeft} only
                      </strong>
                    </span>
                  </div>
                )}
              </div>

              {b.seatsLeft !== undefined && b.seatsLeft !== null && b.seatsLeft <= 10 && (
                <div className="mb-3 rounded-full bg-red-50 px-3 py-1 text-center text-xs font-bold text-red-600 dark:bg-red-950/30 dark:text-red-400">
                  Only {b.seatsLeft} seats remaining!
                </div>
              )}

              <Button
                asChild
                size="sm"
                className="mt-auto w-full rounded-full bg-primary text-primary-foreground font-bold transition-all hover:bg-primary/90"
              >
                <Link href={b.ctaLink || "/contact"}>Reserve My Seat</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Need more details on fees or payment plans?{" "}
          <Link href="/contact" className="font-bold text-primary underline underline-offset-4 hover:opacity-80">
            Contact our counsellors
          </Link>
        </p>
      </div>
    </section>
  );
}
