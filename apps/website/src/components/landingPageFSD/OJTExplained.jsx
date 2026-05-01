"use client";

import { motion } from "framer-motion";
import { Hammer, GitBranch, Users, DollarSign, CheckCircle, X } from "lucide-react";

const points = [
  {
    icon: Hammer,
    title: "From Month 4, you work on real projects",
    desc: "The first 3 months are structured learning. From Month 4 you join SkillYards' internal development team working on live products and client briefs, not made-up exercises.",
  },
  {
    icon: GitBranch,
    title: "Every commit goes to your GitHub",
    desc: "Your code, your repo, from Day 1. By the time you finish, your GitHub shows 6 months of consistent commits the first thing every hiring manager checks.",
  },
  {
    icon: Users,
    title: "Real code reviews from senior developers",
    desc: "Your code is reviewed by working developers not just ticked as 'submitted'. You learn why your approach was wrong, not just that it was.",
  },
  {
    icon: DollarSign,
    title: "No stipend but something better",
    desc: "The OJT phase is unpaid, but students build portfolio projects that go live on real domains. That live URL in your resume is worth more than a ₹2,000/month stipend.",
  },
];

const notJustAssignments = [
  { text: "You push code that real users see", yes: true },
  { text: "You work in a team with deadlines", yes: true },
  { text: "You get PR feedback like a professional developer", yes: true },
  { text: "Projects are deployed and maintained after you leave", yes: true },
  { text: "You do a quiz and get a certificate", yes: false },
  { text: "Assignments are graded by a teacher and forgotten", yes: false },
];

export function FSDOJTExplained() {
  return (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                On-Job Training
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                &ldquo;Project-Based Learning&rdquo; is what everyone says{" "}<br/>
                <span className="text-primary">Here&apos;s what we actually mean</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Most institutes dress up assignments as &ldquo;projects&rdquo;. On-Job Training at SkillYards means something specific.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 mb-12">
              {points.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-bold text-foreground">{p.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Not just assignments */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-5 font-serif text-xl font-extrabold text-foreground">
                What your Monday in Month 5 looks like:
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {notJustAssignments.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.yes ? (
                      <CheckCircle size={16} className="shrink-0 text-green-500" />
                    ) : (
                      <X size={16} className="shrink-0 text-red-400" />
                    )}
                    <span className={`text-sm ${item.yes ? "text-foreground font-medium" : "text-muted-foreground line-through"}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
  );
}
