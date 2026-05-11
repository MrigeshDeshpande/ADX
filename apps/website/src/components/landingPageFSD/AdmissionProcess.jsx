"use client";

import { motion } from "framer-motion";
import { MonitorPlay, PhoneCall, CreditCard, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: MonitorPlay,
    title: "Register for a Free Demo Class",
    desc: "No fee, no commitment. Attend a real class, see how we teach, ask any question you want. This is the only way to truly know if it's the right fit.",
    action: { label: "Register for Free Demo", href: "/contact" },
  },
  {
    number: "02",
    icon: PhoneCall,
    title: "Attend Demo + Ask Questions",
    desc: "Our mentor teaches a trial class. You see exactly what the next 6 months will look like. If it feels right, move forward.",
    action: null,
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Enroll + Pay First Instalment",
    desc: "Confirm your seat with an initial payment. EMI options available. Seat is locked once payment is confirmed.",
    action: null,
  },
  {
    number: "04",
    icon: Rocket,
    title: "Day 1 Your Batch Starts",
    desc: "Receive your batch schedule, onboarding kit, and GitHub setup guide. You write your first line of code on Day 1.",
    action: null,
  },
];

export function FSDAdmissionProcess() {
  return (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                Admission Process
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Start with a{" "}
                <span className="italic text-primary">Free Demo Class.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                No entrance exam, no complicated forms. Just 4 steps from curious to enrolled.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm"
                  >
                    <p className="mb-3 text-5xl font-black text-primary/15">{step.number}</p>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="mb-2 font-serif text-lg font-extrabold text-foreground">{step.title}</h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    {step.action && (
                      <Button asChild size="sm" className="w-fit rounded-full bg-primary text-primary-foreground font-bold">
                        <Link href={step.action.href}>
                          {step.action.label} <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
  );
}
