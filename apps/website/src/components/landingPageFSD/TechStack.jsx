"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

const layers = [
  {
    layer: "Frontend",
    color: "border-cyan-500/30 bg-cyan-500/5",
    dotColor: "bg-cyan-500",
    tech: [
      { name: "HTML5 & CSS3", note: "Foundation" },
      { name: "JavaScript (ES6+)", note: "Core language" },
      { name: "React.js", note: "Primary framework" },
      { name: "Tailwind CSS", note: "Styling" },
      { name: "Next.js", note: "SSR/SSG basics" },
    ],
  },
  {
    layer: "Backend",
    color: "border-purple-500/30 bg-purple-500/5",
    dotColor: "bg-purple-500",
    tech: [
      { name: "Node.js", note: "Runtime" },
      { name: "Express.js", note: "Framework" },
      { name: "REST API design", note: "Architecture" },
      { name: "JWT Auth", note: "Security" },
      { name: "MVC pattern", note: "Structure" },
    ],
  },
  {
    layer: "Database",
    color: "border-green-500/30 bg-green-500/5",
    dotColor: "bg-green-500",
    tech: [
      { name: "MongoDB", note: "Primary DB" },
      { name: "Mongoose", note: "ODM" },
      { name: "SQL basics", note: "Relational DB intro" },
    ],
  },
  {
    layer: "Tools & DevOps",
    color: "border-orange-500/30 bg-orange-500/5",
    dotColor: "bg-orange-500",
    tech: [
      { name: "Git & GitHub", note: "Version control" },
      { name: "VS Code", note: "Editor" },
      { name: "Postman", note: "API testing" },
      { name: "Vercel / Railway", note: "Deployment" },
      { name: "AWS S3 basics", note: "Cloud storage" },
    ],
  },
  {
    layer: "Professional Skills",
    color: "border-primary/20 bg-primary/5",
    dotColor: "bg-primary",
    tech: [
      { name: "Code review", note: "PR workflow" },
      { name: "Pair programming", note: "Collaboration" },
      { name: "Agile basics", note: "Sprint workflow" },
      { name: "Client communication", note: "Soft skill" },
      { name: "Technical interviews", note: "Placement prep" },
    ],
  },
];

export function FSDTechStack() {
  return (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
              >
                <Layers size={13} />
                Tech Stack
              </motion.div>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                What You Graduate With.{" "}
                <span className="italic text-primary">Layer by Layer.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Every technology has a reason mapped to real job requirements, not a wishlist.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {layers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border p-5 ${layer.color} ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${layer.dotColor}`} />
                    <h3 className="font-bold text-foreground">{layer.layer}</h3>
                  </div>
                  <ul className="space-y-2">
                    {layer.tech.map((t) => (
                      <li key={t.name} className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{t.name}</span>
                        <span className="rounded-full bg-background/70 px-2 py-0.5 text-xs text-muted-foreground">{t.note}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  );
}
