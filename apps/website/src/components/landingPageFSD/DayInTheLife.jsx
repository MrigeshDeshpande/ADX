"use client";

import { motion } from "framer-motion";
import { Sun, Code, MessageSquare, GitPullRequest, Moon } from "lucide-react";

const schedule = [
  {
    time: "10:00 AM",
    icon: Sun,
    title: "Live Class",
    desc: "Mentor codes live you follow along. Concept + implementation in one session. No slides, no lectures.",
    color: "bg-yellow-500",
  },
  {
    time: "12:00 PM",
    icon: Code,
    title: "Hands-On Lab",
    desc: "You build exactly what was just taught. Mentor is in the room. Stuck? Ask immediately.",
    color: "bg-cyan-500",
  },
  {
    time: "2:00 PM",
    icon: MessageSquare,
    title: "Code Review & Doubt Session",
    desc: "Your code from the lab gets reviewed. You learn why your approach was wrong not just that it was.",
    color: "bg-purple-500",
  },
  {
    time: "4:00 PM",
    icon: GitPullRequest,
    title: "Project Work",
    desc: "Month 1–3: building your own features. Month 4–6: pushing real PRs to the team project with deadlines.",
    color: "bg-green-500",
  },
  {
    time: "Evening",
    icon: Moon,
    title: "Recorded Recap + Assignment",
    desc: "Session recordings available for revision. Short assignment to reinforce the day's concept. ~1–2 hrs.",
    color: "bg-primary",
  },
];

export function FSDDayInTheLife() {
  return (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                A Day in the Life
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                What Your{" "}
                <span className="italic text-primary">Day Actually Looks Like.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                This is a typical weekday during the course Month 5, when you&apos;re in the deep end.
              </p>
            </div>

            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[1.15rem] top-4 h-[calc(100%-2rem)] w-px bg-border" />

              <div className="space-y-6">
                {schedule.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative flex gap-5"
                    >
                      {/* Dot */}
                      <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.color} shadow-md`}>
                        <Icon size={16} className="text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
                        <div className="mb-1 flex items-center gap-3">
                          <span className="text-xs font-bold text-primary">{item.time}</span>
                          <h3 className="font-bold text-foreground">{item.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 rounded-2xl border border-border bg-card/50 p-4 text-center text-sm text-muted-foreground"
            >
              Total daily commitment: <strong className="text-foreground">6–8 hours</strong> (class + lab + project work). This is a serious program not a weekend hobby course.
            </motion.p>
          </div>
        </section>
  );
}
