"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight, GraduationCap, Clock, Monitor, BookOpen, Sparkles, TrendingUp, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const programs = [
  {
    id: "bca",
    name: "BCA",
    fullName: "Bachelor of Computer Applications",
    type: "University Degree",
    badge: "3-Year Degree Program",
    targetAudience: "For students wanting a computer science degree with real coding skills.",
    skills: ["Full-Stack Dev", "Data Structures", "Cloud Computing", "Python & Java"],
    duration: "3 Years Duration",
    mode: "Offline (Agra Campus)",
    eligibility: "12th pass | Min 50% marks",
    certification: "Univ Degree + Industry Certs",
    avgSalary: "₹3.5 – 6 Lakhs Per Annum",
    href: "/bca-training-program-in-agra",
    badgeBg: "bg-primary",
    badgeText: "text-primary-foreground",
    themeColor: "text-primary",
    btnColor: "bg-primary hover:bg-primary/90",
    btnText: "text-primary-foreground",
    glowColor: "bg-primary/10",
  },
  {
    id: "bba",
    name: "BBA",
    fullName: "Bachelor of Business Administration",
    type: "University Degree",
    badge: "3-Year Degree Program",
    targetAudience: "For students wanting a business degree with digital marketing skills.",
    skills: ["Digital Marketing", "Business Analytics", "Finance", "Growth Strategy"],
    duration: "3 Years Duration",
    mode: "Offline (Agra Campus)",
    eligibility: "12th pass | Min 50% marks",
    certification: "Univ Degree + Marketing Cert",
    avgSalary: "₹3 – 5.5 Lakhs Per Annum",
    href: "/bba-training-program-in-agra",
    badgeBg: "bg-rose-600",
    badgeText: "text-white",
    themeColor: "text-rose-600",
    btnColor: "bg-primary hover:bg-primary/90",
    btnText: "text-primary-foreground",
    glowColor: "bg-rose-500/10",
  },
  {
    id: "fullstack",
    name: "Full-Stack Development",
    fullName: "Web Development Bootcamp",
    type: "Skill Certification",
    badge: "6 Months Intensive",
    targetAudience: "For graduates wanting to become professional developers fast.",
    skills: ["React & Next.js", "Node.js & Express", "MongoDB", "DevOps"],
    duration: "6 Months Duration",
    mode: "Offline (Agra Campus)",
    eligibility: "10+2 pass | Basic computers",
    certification: "Industry Cert + Portfolio",
    avgSalary: "₹4 – 8 Lakhs Per Annum",
    href: "/full-stack-web-development-training-in-agra",
    badgeBg: "bg-cyan-500",
    badgeText: "text-slate-900",
    themeColor: "text-cyan-600",
    btnColor: "bg-primary hover:bg-primary/90",
    btnText: "text-primary-foreground",
    glowColor: "bg-cyan-400/10",
  },
  {
    id: "digitalmarketing",
    name: "Digital Marketing",
    fullName: "Professional Marketing Program",
    type: "Skill Certification",
    badge: "3 Months Intensive",
    targetAudience: "For anyone building a career in marketing or growing a business.",
    skills: ["SEO", "Meta & Google Ads", "Social Media", "Data Analytics"],
    duration: "3 Months Duration",
    mode: "Offline (Agra Campus)",
    eligibility: "10+2 pass | No experience",
    certification: "Google, Meta & Industry Certs",
    avgSalary: "₹3 – 6 Lakhs Per Annum",
    href: "/digital-marketing-course-in-agra",
    badgeBg: "bg-amber-400",
    badgeText: "text-slate-900",
    themeColor: "text-amber-600",
    btnColor: "bg-primary hover:bg-primary/90",
    btnText: "text-primary-foreground",
    glowColor: "bg-amber-400/10",
  },
];

export default function ProgramCards() {
  return (
    <section className="bg-background py-16 lg:py-20 overflow-hidden relative">
      <LazyMotion features={domAnimation} strict>
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <div className="mb-10 lg:mb-12 text-center">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary"
            >
              <BookOpen size={12} />
              Our Programs
            </m.div>
            <h2 className="font-serif text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Explore Your <span className="text-primary italic">Career</span> Path
            </h2>
          </div>

          {/* Responsive Grid/Slider */}
          <div className="relative group/container">
            <div className="flex overflow-x-auto pb-10 gap-6 snap-x snap-mandatory lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:pb-0 no-scrollbar">
              {programs.map((prog, i) => (
                <m.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex-none w-[85vw] md:w-[45vw] lg:w-auto snap-center flex flex-col h-full group"
                >
                  <div className="flex flex-col rounded-[2.5rem] border border-border/50 bg-white dark:bg-[#0d0d12] dark:border-white/5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 w-full h-full flex-1 overflow-hidden relative">
                    
                    {/* Subtle Dark Mode Glow */}
                    <div className={`absolute -top-20 -right-20 w-48 h-48 blur-[100px] opacity-0 dark:opacity-40 rounded-full transition-opacity duration-500 group-hover:opacity-60 ${prog.glowColor}`} />

                    {/* Top Header Section */}
                    <div className="w-full p-6 lg:p-8 border-b border-border/30 bg-slate-50/50 dark:bg-white/[0.03] text-center relative z-10">
                      <div className={`inline-block px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest mb-3 shadow-sm ${prog.badgeBg} ${prog.badgeText}`}>
                        {prog.type}
                      </div>
                      <h3 className="font-serif text-2xl lg:text-3xl font-black text-foreground leading-tight tracking-tight mb-1">
                        {prog.name}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-4">{prog.fullName}</p>
                      
                      <div className={`${prog.badgeBg} ${prog.badgeText} inline-block px-4 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md`}>
                        {prog.badge}
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-6 lg:p-8 flex flex-col flex-1 relative z-10">
                      <p className="mb-6 text-sm text-muted-foreground/90 leading-relaxed font-medium">
                        {prog.targetAudience}
                      </p>

                      {/* Skills */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {prog.skills.map((skill) => (
                          <span key={skill} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-[10px] font-bold text-foreground/80 border border-border/50">
                            <Sparkles size={10} className={prog.themeColor} />
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Meta Grid */}
                      <div className="mb-8 grid grid-cols-2 gap-4 border-t border-border/30 pt-6 text-[10px] font-bold text-foreground/80">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className={prog.themeColor} />
                          {prog.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Monitor size={14} className={prog.themeColor} />
                          {prog.mode}
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                          <TrendingUp size={14} className={prog.themeColor} />
                          {prog.avgSalary}
                        </div>
                        <div className="flex items-start gap-2 col-span-2">
                          <Briefcase size={14} className={`${prog.themeColor} shrink-0 mt-0.5`} />
                          <span className="leading-tight">{prog.certification}</span>
                        </div>
                        <div className="flex items-start gap-2 col-span-2">
                          <GraduationCap size={14} className={`${prog.themeColor} shrink-0 mt-0.5`} />
                          <span className="leading-tight">{prog.eligibility}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto">
                        <Button asChild className={`w-full h-11 lg:h-12 rounded-xl font-black text-xs tracking-widest transition-all shadow-lg group/btn ${prog.btnColor} ${prog.btnText}`}>
                          <Link href={prog.href} className="flex items-center justify-center">
                            Explore Curriculum
                            <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1.5 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
            
            {/* Mobile Dots */}
            <div className="flex justify-center gap-1.5 mt-2 lg:hidden">
              {programs.map((_, idx) => (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-border" />
              ))}
            </div>
          </div>
        </div>
      </LazyMotion>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
