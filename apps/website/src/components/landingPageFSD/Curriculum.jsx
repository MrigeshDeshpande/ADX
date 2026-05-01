"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";

const months = [
  {
    month: "Month 1",
    title: "Foundations",
    hours: "~30 hrs/week",
    color: "bg-blue-500",
    topics: ["HTML5 & CSS3", "Responsive Design & Flexbox/Grid", "Git & GitHub (version control from Day 1)", "Basic JavaScript", "VS Code setup & productivity", "Deploy your first static site on Netlify"],
    builds: "Personal portfolio site live on a real domain",
  },
  {
    month: "Month 2",
    title: "JavaScript Deep Dive",
    hours: "~35 hrs/week",
    color: "bg-yellow-500",
    topics: ["ES6+ (arrow functions, destructuring, modules)", "DOM Manipulation", "Fetch API & Promises", "Async/Await & error handling", "Local Storage & browser APIs", "Interactive UIs without any framework"],
    builds: "Weather app + a multi-page JavaScript project",
  },
  {
    month: "Month 3",
    title: "React & Frontend",
    hours: "~35 hrs/week",
    color: "bg-cyan-500",
    topics: ["React fundamentals JSX, components, props", "useState, useEffect & custom hooks", "React Router for navigation", "Context API for state management", "Tailwind CSS with React", "Component-driven architecture"],
    builds: "Full React frontend app (e-commerce UI or project management UI)",
  },
  {
    month: "Month 4",
    title: "Backend & APIs",
    hours: "~35 hrs/week",
    color: "bg-purple-500",
    topics: ["Node.js & npm ecosystem", "Express.js routing, middleware, MVC", "REST API design principles", "JWT authentication & authorization", "Environment variables & security basics", "Testing APIs with Postman"],
    builds: "REST API with authentication connected to a real frontend",
  },
  {
    month: "Month 5",
    title: "Database & Full-Stack Integration",
    hours: "~40 hrs/week",
    color: "bg-green-500",
    topics: ["MongoDB & Mongoose ODM", "CRUD operations & data modelling", "Connecting React frontend to Express backend", "File uploads, pagination & filtering", "Deploying full-stack app (Vercel + Railway)", "Intro to AWS S3 for file storage"],
    builds: "Complete full-stack MERN application deployed and live",
  },
  {
    month: "Month 6",
    title: "Industry Project & Placement Prep",
    hours: "~40 hrs/week",
    color: "bg-red-500",
    topics: ["Real client project (or live internal product)", "Code review & pull request workflow", "Performance optimisation basics", "Resume building & LinkedIn optimisation", "Mock technical interviews (3 rounds)", "GitHub profile & portfolio presentation"],
    builds: "Industry project added to GitHub, deployed, portfolio-ready",
  },
];

export function FSDCurriculum() {
  const [open, setOpen] = useState(0);

  return (
        <section className="bg-card/20 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <BookOpen size={13} />
                Curriculum Month by Month
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                6 Months. <span className="italic text-primary">One Clear Path.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                No fluff modules. Every month ends with something you can show an employer.
              </p>
            </div>

            <div className="space-y-3">
              {months.map((m, i) => {
                const isOpen = open === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-primary/30 bg-card shadow-lg" : "border-border bg-card/50 hover:border-border/80"}`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`h-3 w-3 shrink-0 rounded-full ${m.color}`} />
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{m.month}</span>
                          <h3 className={`font-bold text-base transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                            {m.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden text-xs text-muted-foreground sm:block">{m.hours}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="border-t border-border px-5 pb-5 pt-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Topics Covered</p>
                                <ul className="space-y-1.5">
                                  {m.topics.map((t) => (
                                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                      {t}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex flex-col justify-start gap-3">
                                <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">What you build</p>
                                  <p className="text-sm font-semibold text-foreground">{m.builds}</p>
                                </div>
                                <div className="rounded-xl bg-muted/30 p-3">
                                  <p className="text-xs text-muted-foreground"><strong className="text-foreground">Weekly commitment:</strong> {m.hours}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
  );
}
