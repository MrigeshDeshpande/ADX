"use client";

import { motion } from "framer-motion";
import { FolderGit2, Globe, Users, User } from "lucide-react";

const projects = [
  {
    name: "E-Commerce Platform",
    type: "Full-Stack MERN App",
    month: "Month 5",
    desc: "A complete online store with product listings, cart, user auth, order management, and Razorpay payment integration.",
    stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    mode: "solo",
    deployed: true,
  },
  {
    name: "Real-Time Chat Application",
    type: "Full-Stack App with WebSockets",
    month: "Month 4",
    desc: "Multi-room chat app with real-time messaging using Socket.io, user authentication, and message history.",
    stack: ["React", "Node.js", "Socket.io", "JWT", "MongoDB"],
    mode: "team",
    deployed: true,
  },
  {
    name: "Job Board with Authentication",
    type: "CRUD Application",
    month: "Month 4",
    desc: "Two-role system (recruiter + applicant), job listings, application tracking, and email notifications.",
    stack: ["React", "Express", "MongoDB", "JWT", "Nodemailer"],
    mode: "solo",
    deployed: true,
  },
  {
    name: "Personal Portfolio Website",
    type: "Frontend Project",
    month: "Month 1",
    desc: "Your first deployed project live on a real domain from Day 30. This is the URL you put in every job application.",
    stack: ["HTML5", "CSS3", "JavaScript", "Netlify"],
    mode: "solo",
    deployed: true,
  },
  {
    name: "Industry Client Project",
    type: "On-Job Training Project",
    month: "Month 6",
    desc: "A real product built for a real brief reviewed, deployed, and maintained by the team. Details vary by batch.",
    stack: ["Full MERN Stack", "Git workflow", "Code review", "Agile sprint"],
    mode: "team",
    deployed: true,
  },
];

export function FSDPortfolioProjects() {
  return (
        <section className="bg-card/20 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <FolderGit2 size={13} />
                Portfolio Projects
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                You Graduate with 5 Deployed Projects.{" "}
                <span className="italic text-primary">Not a Certificate.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Every project is on GitHub, live at a URL, and yours to show employers. This is what gets you hired not a course completion badge.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  {/* Header */}
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <span className="mb-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                        {p.month}
                      </span>
                      <h3 className="font-serif text-lg font-extrabold text-foreground">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">{p.type}</p>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

                  {/* Stack pills */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      {p.mode === "solo" ? <User size={13} /> : <Users size={13} />}
                      <span className="capitalize">{p.mode} project</span>
                    </div>
                    {p.deployed && (
                      <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                        <Globe size={13} />
                        <span>Live deployed</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  );
}
