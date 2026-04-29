"use client";

import React from "react";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { LampContainer } from "../ui/lamp";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export const BCAHero = () => {
  return (
    <section id="hero" className="w-full relative bg-background overflow-hidden md:min-h-125 py-4 sm:py-6 md:py-12 lg:py-16">
      <LampContainer className="h-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center h-full z-10 relative mt-4 sm:mt-8 md:mt-12 lg:mt-20">

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 w-full items-center">
            {/* Left Column: Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Breadcrumbs */}
              <div className="w-full mt-12 sm:mt-14 mb-3 sm:mb-4 flex justify-center lg:justify-start">
                <Breadcrumbs currentLabel="BCA" />
              </div>

              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/5 text-primary border border-primary/20 text-xs sm:text-sm font-bold mb-4 md:mb-6 backdrop-blur-sm">
                <Star size={14} className="fill-current text-secondary shrink-0" />
                <span>India&apos;s #1 Skill-Based BCA Program</span>
              </div>

              {/* Heading */}
              <h1 className="font-serif text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl  leading-[1.1] tracking-tighter text-foreground font-extrabold">
                The <span className="text-primary italic">Future</span> of{" "}
                <br className="hidden sm:block" />Tech Education.
              </h1>

              <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Skip the ordinary. Gain <span className="text-foreground font-bold">On-Job Training</span> and industry certifications while pursuing your degree.
              </p>

              {/* CTA Group */}
              <div className="mt-5 md:mt-8 flex flex-row gap-2.5 sm:gap-3 md:gap-4 w-full sm:w-auto">
                <Link href="/contact" className="flex-1 sm:flex-initial">
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-primary text-primary-foreground px-4 sm:px-6 md:px-8 py-3 sm:py-5 md:py-6 text-xs sm:text-sm md:text-base font-extrabold hover:bg-primary/90 hover:scale-105 shadow-xl shadow-primary/20 transition-all"
                  >
                    Apply Now <ArrowRight size={18} className="ml-2 shrink-0" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full aspect-16/10 sm:aspect-video lg:aspect-4/3 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border-2 sm:border-4 md:border-6 border-foreground/5 shadow-2xl group mt-4 sm:mt-6 lg:mt-0">
              <Image
                src="/images/BCA-PAGE.webp"
                alt="BCA Program"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/10 to-transparent" />
            </div>
          </div>
        </div>
      </LampContainer>
    </section>
  );
};
