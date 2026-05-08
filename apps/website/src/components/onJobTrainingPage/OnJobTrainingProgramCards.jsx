"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Briefcase, Clock, Monitor, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const programs = [
  {
    id: "fullstack",
    name: "Full-Stack Web Development",
    fullName: "Full-Stack Development Bootcamp",
    type: "Skill Course",
    typeColor: "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800",
    badge: "Job-Ready Course",
    targetAudience: "Students & graduates who want to become developers fast",
    skills: ["HTML / CSS / JavaScript", "React.js & Next.js", "Node.js & Express", "MongoDB & SQL", "REST APIs", "Git & Deployment"],
    duration: "6 Months",
    mode: "Offline + Online (Hybrid)",
    eligibility: "10+2 pass | Basic computer knowledge",
    certification: "Industry Certificate + Portfolio Projects",
    avgSalary: "₹4 – 8 LPA",
    href: "/programs/on-job-training/best-full-stack-development-course-in-agra",
    badgeBg: "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400",
  },
  {
    id: "digitalmarketing",
    name: "Digital Marketing",
    fullName: "Professional Digital Marketing Program",
    type: "Skill Course",
    typeColor: "text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/30 dark:border-orange-800",
    badge: "Job-Ready Course",
    targetAudience: "Anyone who wants to build a career in marketing or grow a business online",
    skills: ["SEO & Content Marketing", "Google Ads & Meta Ads", "Email Marketing", "Analytics & Reporting", "Social Media Management", "E-Commerce Marketing"],
    duration: "3 Months",
    mode: "Offline + Online (Hybrid)",
    eligibility: "10+2 pass | No prior experience needed",
    certification: "Google, Meta & SkillYards Certificates",
    avgSalary: "₹3 – 6 LPA",
    href: "/programs/on-job-training/best-digital-marketing-course-in-agra",
    badgeBg: "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-400",
  },
];

export default function OnJobTrainingProgramCards() {
  return (
    <section id="training-programs" className="bg-background py-20 overflow-hidden w-full max-w-[100vw]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
          >
            <BookOpen size={13} />
            Our Training Programs
          </motion.div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Choose Your <span className="italic text-primary">Career Track</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Focus on one high-demand path, build practical skills, and move toward placement with hands-on training.
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-full w-full min-w-0"
            >
              <div className="flex lg:hidden flex-col rounded-3xl border-2 border-border/60 hover:border-primary/50 bg-white dark:bg-zinc-950 p-5 md:p-6 shadow-md transition-all duration-300 hover:shadow-2xl w-full h-full !bg-opacity-100 overflow-hidden relative wrap-break-word">
                <div className="mb-5 flex flex-col md:flex-row items-start justify-between gap-4 w-full">
                  <div>
                    <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${prog.badgeBg}`}>{prog.badge}</span>
                    <h3 className="font-serif text-2xl font-extrabold text-foreground leading-tight">{prog.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{prog.fullName}</p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${prog.typeColor}`}>{prog.type}</span>
                </div>
                <div className="mb-6 text-sm leading-relaxed text-muted-foreground w-full">
                  <strong className="text-foreground">Who it&apos;s for: </strong>{prog.targetAudience}
                </div>
                <div className="mb-6 w-full">
                  <p className="mb-3 text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground">What you&apos;ll learn</p>
                  <ul className="flex flex-col gap-2 w-full">
                    {prog.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-xs md:text-sm text-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto w-full pt-2">
                  <Button asChild className="w-full min-h-12 md:min-h-14 h-auto rounded-full bg-linear-to-r from-primary to-accent text-primary-foreground font-extrabold text-sm md:text-[15px] tracking-normal md:tracking-wide transition-all shadow-lg">
                    <Link href={prog.href} className="flex w-full items-center justify-center gap-2 whitespace-normal px-4 py-3 text-center leading-tight">Explore {prog.name} <ArrowRight size={18} className="shrink-0" /></Link>
                  </Button>
                </div>
              </div>

              <CardContainer className="hidden lg:flex w-full h-full" containerClassName="py-0 w-full h-full hidden lg:flex">
                <CardBody className="group flex flex-col rounded-3xl border-2 border-border/60 hover:border-primary/50 bg-white dark:bg-zinc-950 p-8 shadow-md transition-all duration-300 hover:shadow-2xl w-full h-full !bg-opacity-100 flex-1">
                  <CardItem translateZ="50" className="mb-5 flex flex-col xl:flex-row items-start justify-between gap-4 w-full">
                    <div>
                      <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${prog.badgeBg}`}>{prog.badge}</span>
                      <h3 className="font-serif text-3xl font-extrabold text-foreground leading-tight">{prog.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{prog.fullName}</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-sm font-bold ${prog.typeColor}`}>{prog.type}</span>
                  </CardItem>

                  <CardItem translateZ="60" className="mb-6 text-base leading-relaxed text-muted-foreground w-full">
                    <strong className="text-foreground">Who it&apos;s for: </strong>{prog.targetAudience}
                  </CardItem>

                  <CardItem translateZ="70" className="mb-6 w-full">
                    <p className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">Key Skills</p>
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-2 w-full">
                      {prog.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{skill}
                        </li>
                      ))}
                    </ul>
                  </CardItem>

                  <CardItem translateZ="80" className="mb-6 grid grid-cols-2 gap-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-border/50 p-5 text-sm w-full">
                    <div className="flex items-center gap-2.5 text-accent-foreground"><Clock size={15} className="shrink-0 text-accent-foreground" /><span><strong>Duration:</strong> {prog.duration}</span></div>
                    <div className="flex items-center gap-2.5 text-accent-foreground"><Monitor size={15} className="text-foreground shrink-0" /><span><strong>Mode:</strong> {prog.mode}</span></div>
                    <div className="flex items-start gap-2.5 col-span-2 text-accent-foreground"><GraduationCap size={15} className="text-foreground shrink-0 mt-0.5" /><span><strong>Eligibility:</strong> {prog.eligibility}</span></div>
                    <div className="flex items-start gap-2.5 col-span-2 text-accent-foreground"><Briefcase size={15} className="text-foreground shrink-0 mt-0.5" /><span><strong>Certification:</strong> {prog.certification}</span></div>
                    <div className="flex items-start gap-2.5 col-span-2 text-accent-foreground"><TrendingUp size={15} className="text-foreground shrink-0 mt-0.5" /><span><strong>Avg. Salary:</strong> {prog.avgSalary}</span></div>
                  </CardItem>

                  <CardItem translateZ="100" className="mt-auto w-full pt-2">
                    <Button asChild className="w-full h-14 rounded-full bg-linear-to-r from-primary to-accent text-primary-foreground font-extrabold text-lg tracking-wide transition-all hover:scale-[1.03] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50">
                      <Link href={prog.href} className="flex items-center justify-center">Explore {prog.name} <ArrowRight size={20} className="ml-2 group-hover:translate-x-1.5 transition-transform" /></Link>
                    </Button>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
