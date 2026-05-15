"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { 
  CheckCircle2, 
  LayoutList, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  Monitor, 
  Users, 
  Wallet, 
  CreditCard,
  Award
} from "lucide-react";

const programs = [
  { name: "BCA", sub: "Degree" },
  { name: "BBA", sub: "Degree" },
  { name: "Full-Stack", sub: "Skill" },
  { name: "Digital Mktg", sub: "Skill" }
];

const rows = [
  { 
    label: "Duration", 
    icon: Clock,
    values: ["3 Years", "3 Years", "6 Months", "6 Months"] 
  },
  { 
    label: "Eligibility", 
    icon: GraduationCap,
    values: ["12th Pass (50%+)", "12th Pass (50%+)", "12th / Graduate", "12th / Graduate"] 
  },
  { 
    label: "Placement", 
    icon: Briefcase,
    values: ["Yes", "Yes", "Yes", "Yes"] 
  },
  { 
    label: "Mode", 
    icon: Monitor,
    values: ["Offline", "Offline", "Offline", "Offline"] 
  },
  { 
    label: "Ideal For", 
    icon: Users,
    values: ["Students / Freshers", "Students / Freshers", "Students / Freshers", "Students / Freshers"] 
  },
  { 
    label: "Fee Range", 
    icon: Wallet,
    values: ["Contact us", "Contact us", "Contact us", "Contact us"] 
  },
  { 
    label: "EMI Available", 
    icon: CreditCard,
    values: ["Yes", "Yes", "Yes", "Yes"] 
  },
  { 
    label: "Certification", 
    icon: Award,
    values: ["UG Degree + Certs", "UG Degree + Certs", "Industry Cert", "Google + Meta Cert"] 
  },
];

export default function ComparisonTable() {
  return (
    <section className="bg-background py-20 lg:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-50 pointer-events-none">
        <div className="absolute top-20 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="mb-12 text-center">
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary"
            >
              <LayoutList size={12} />
              Program Comparison
            </m.div>
            <m.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              The Right Choice, <span className="text-primary italic">Simplified.</span>
            </m.h2>
          </LazyMotion>
        </div>

        <div className="relative">
          {/* Table Container with horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[800px] rounded-[2rem] border border-border/50 bg-white dark:bg-card/30 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/5">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/[0.03]">
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-[#1a1a20] px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground border-r border-border/50">
                      Feature
                    </th>
                    {programs.map((p) => (
                      <th key={p.name} className="px-6 py-6 text-center border-r last:border-r-0 border-border/20">
                        <span className="block text-lg font-black text-foreground tracking-tight">{p.name}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">{p.sub}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {rows.map((row, ri) => (
                    <tr key={row.label} className="group hover:bg-primary/[0.02] transition-colors">
                      <td className="sticky left-0 z-20 bg-white dark:bg-[#0d0d12] px-8 py-5 border-r border-border/50 group-hover:bg-slate-50 dark:group-hover:bg-white/[0.05] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/5 text-primary">
                            <row.icon size={16} />
                          </div>
                          <span className="text-sm font-bold text-foreground">{row.label}</span>
                        </div>
                      </td>
                      {row.values.map((val, vi) => (
                        <td key={vi} className="px-6 py-5 text-center border-r last:border-r-0 border-border/10">
                          {val === "Yes" ? (
                            <div className="flex justify-center">
                              <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-500">
                                <CheckCircle2 size={18} />
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                              {val}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Hint */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground lg:hidden">
            <span>Scroll horizontally to compare</span>
            <div className="w-8 h-px bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
