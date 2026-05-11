'use client';

import React from 'react';
import Image from 'next/image';
import { CometCard } from "@/components/ui/comet-card";

export const BCABenefits = () => {
  const benefits = [
    {
      image: "/images/benefits/career-growth-flat.webp",
      title: "Career Growth",
      description: "Career-focused learning with practical projects, portfolio building, and mentor guidance."
    },
    {
      image: "/images/benefits/industry-certified-flat.webp",
      title: "Project-Based Training",
      description: "Learn through hands-on assignments and mentor-guided projects aligned to real-world workflows."
    },
    {
      image: "/images/benefits/fast-track-flat.webp",
      title: "Fast-Track Learning",
      description: "Structured modules that focus on clarity, practice, and consistent progress — without hype or unrealistic promises."
    }
  ];

  return (
    <section id="benefits" className="py-[10vh] md:py-[15vh] px-4 sm:px-6 bg-linear-to-b from-background/50 to-background w-full">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-foreground">
            Why Choose SkillYards BCA?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-4xl mx-auto mt-4">
            SkillYards is an IT training institute in Agra focused on practical learning and career preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <React.Fragment key={index}>
              <CometCard
                className={`hidden lg:block w-full h-full${index === benefits.length - 1 && benefits.length % 2 !== 0 ? " lg:col-span-1 lg:max-w-none lg:mx-0" : ""}`}
                rotateDepth={3}
                translateDepth={8}
              >
                <div className="group bg-card text-card-foreground rounded-2xl md:rounded-3xl p-5 sm:p-6 lg:p-8 border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 w-full h-full flex flex-col overflow-hidden">
                  <div className="w-full h-32 sm:h-36 lg:h-44 relative mb-5 sm:mb-6 rounded-xl overflow-hidden shrink-0 bg-neutral-900 group-hover:shadow-lg group-hover:scale-105 transition-all duration-500">
                    <Image src={benefit.image} alt={benefit.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-2xl font-bold mb-2 sm:mb-3 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </CometCard>

              <div className={`${index === 2 ? "sm:hidden lg:hidden" : "flex"} lg:hidden group bg-card text-card-foreground rounded-2xl md:rounded-3xl p-5 sm:p-6 border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 w-full sm:w-[88%] sm:mx-auto h-full flex-col overflow-hidden`}>
                <div className="w-full h-32 sm:h-36 lg:h-44 relative mb-5 sm:mb-6 rounded-xl overflow-hidden shrink-0 bg-neutral-900 group-hover:shadow-lg group-hover:scale-105 transition-all duration-500">
                  <Image src={benefit.image} alt={benefit.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold mb-2 sm:mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
