"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Briefcase, Clock, Monitor, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const programs = [
  {
    id: "bca",
    name: "BCA",
    fullName: "Bachelor of Computer Applications",
    type: "University Degree",
    typeColor: "text-primary bg-primary/10 border-primary/20",
    badge: "3-Year Degree",
    targetAudience: "12th pass students who want a CS degree with real coding skills",
    skills: ["Full-Stack Development", "Data Structures & Algorithms", "Database Management", "Python & Java", "Cloud Computing", "Software Engineering"],
    duration: "3 Years",
    mode: "Offline (Agra Campus)",
    eligibility: "12th pass (any stream) | Min. 50% marks",
    certification: "University Degree (Accredited) + Industry Certificates",
    avgSalary: "₹3.5 – 6 LPA",
    href: "/bca-training-program-in-agra",
    accentClass: "border-primary/30 hover:border-primary/60",
    badgeBg: "bg-primary/10 text-primary",
  },
  {
    id: "bba",
    name: "BBA",
    fullName: "Bachelor of Business Administration",
    type: "University Degree",
    typeColor: "text-primary bg-primary/10 border-primary/20",
    badge: "3-Year Degree",
    targetAudience: "Students who want a business degree with digital marketing & tech skills",
    skills: ["Digital Marketing", "Business Analytics", "SEO & SEM", "Social Media Strategy", "Financial Management", "Entrepreneurship"],
    duration: "3 Years",
    mode: "Offline (Agra Campus)",
    eligibility: "12th pass (any stream) | Min. 50% marks",
    certification: "University Degree (Accredited) + Digital Marketing Certificate",
    avgSalary: "₹3 – 5.5 LPA",
    href: "/bba-training-program-in-agra",
    accentClass: "border-secondary/50 hover:border-secondary/80",
    badgeBg: "bg-secondary/20 text-secondary-foreground",
  },
];

export default function OnJobProgramCards() {
  return (
    <section id="degree-programs" className="bg-background py-20 overflow-hidden w-full max-w-[100vw]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
          >
            <BookOpen size={13} />
            Our Degree Programs
          </motion.div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Choose Your <span className="italic text-primary">Specialisation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Both programs include university enrollment, industrial training, and 100% placement support.
          </p>
        </div>

        {/* Cards grid */}
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

              {/* === DESKTOP (3D Card Effect) === */}
              <CardContainer className="hidden lg:flex w-full h-full" containerClassName="py-0 w-full h-full hidden lg:flex">
                <CardBody className="group flex flex-col rounded-3xl border-2 border-border/60 hover:border-primary/50 bg-white dark:bg-zinc-950 p-8 shadow-md transition-all duration-300 hover:shadow-2xl w-full h-full !bg-opacity-100 flex-1">
                  {/* Header */}
                  <CardItem translateZ="50" className="mb-5 flex flex-col xl:flex-row items-start justify-between gap-4 w-full">
                    <div>
                      <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${prog.badgeBg}`}>{prog.badge}</span>
                      <h3 className="font-serif text-3xl font-extrabold text-foreground leading-tight">{prog.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{prog.fullName}</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-sm font-bold ${prog.typeColor}`}>{prog.type}</span>
                  </CardItem>

                  {/* Skills */}
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

                  {/* Meta row */}
                  <CardItem translateZ="80" className="mb-6 grid grid-cols-1 gap-3 text-sm w-full">
                    <div className="flex items-center gap-2.5 text-accent-foreground"><Clock size={15} className="shrink-0" /><span><strong>Duration:</strong> {prog.duration}</span></div>
                    <div className="flex items-start gap-2.5 text-accent-foreground"><Briefcase size={15} className="shrink-0 mt-0.5" /><span><strong>Certification:</strong> {prog.certification}</span></div>
                    <div className="flex items-start gap-2.5 text-accent-foreground"><TrendingUp size={15} className="shrink-0 mt-0.5" /><span><strong>Avg. Salary:</strong> {prog.avgSalary}</span></div>
                  </CardItem>

                  {/* CTA */}
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
