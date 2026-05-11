"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Briefcase,
  Target,
  ShieldCheck,
  Video,
  Sliders,
  Building2,
  GraduationCap,
  Activity,
} from "lucide-react";

const coreValues = [
  {
    title: "1:1 Mentorship",
    description: "Tailored guidance from senior developers and tech leads who have walked your path.",
    icon: UserCheck,
  },
  {
    title: "Real-World Projects",
    description: "Build live applications and solve industry problems to create a standout portfolio.",
    icon: Briefcase,
  },
  {
    title: "Career Support",
    description: "From resume crafting to interview prep we've got every step covered.",
    icon: Target,
  },
  {
    title: "Placement Guarantee",
    description: "Secure your dream tech job with confidence through our robust hiring network.",
    icon: ShieldCheck,
  },
  {
    title: "In-Person Interactive Classes",
    description: "Participate in coding sessions with experts, ask questions, and build in real time.",
    icon: Video,
  },
  {
    title: "Customized Content",
    description: "Tech tracks aligned with your goals web, mobile, data, or cloud.",
    icon: Sliders,
  },
  {
    title: "Elite Hiring Partners",
    description: "Connect with leading tech companies and startups eager to hire from SkillYards.",
    icon: Building2,
  },
  {
    title: "Top-Tier Instructors",
    description: "Industry engineers who bring real-world experience and practical knowledge to every class.",
    icon: GraduationCap,
  },
  {
    title: "Industry Immersion",
    description: "Hackathons, workshops, and guest lectures that prepare you for the real tech world.",
    icon: Activity,
  },
];

export const BcaCoreValues = () => {
  const [showAllPillars, setShowAllPillars] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block">
            The SkillYards Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-foreground">
            Learning Today,{" "}
            <span className="text-primary italic">Earning Tomorrow.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl md:rounded-3xl overflow-hidden border border-border">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className={`group bg-background p-5 sm:p-6 md:p-8 hover:bg-primary/3 transition-colors duration-300 relative ${index < 4 || showAllPillars ? "block" : "hidden lg:block"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm md:text-base font-bold text-foreground mb-1.5">
                      {value.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!showAllPillars && (
          <div className="mt-4 flex justify-center lg:hidden">
            <button
              type="button"
              onClick={() => setShowAllPillars(true)}
              className="inline-flex items-center justify-center rounded-2xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent"
            >
              Load More Pillars
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
