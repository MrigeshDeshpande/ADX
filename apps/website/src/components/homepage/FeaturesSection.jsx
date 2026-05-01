"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "motion/react";
import { Laptop, Users, Clock, Award } from "lucide-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import features from "@/data/features.json";

const iconMap = { laptop: Laptop, users: Users, clock: Clock, award: Award };

const cardThemes = [
  { gradient: "from-violet-900 via-violet-800 to-blue-900",   orb1: "bg-violet-500/40", orb2: "bg-blue-500/30"   },
  { gradient: "from-emerald-500 via-teal-500 to-cyan-500",   orb1: "bg-emerald-300/40", orb2: "bg-cyan-300/30"  },
  { gradient: "from-orange-500 via-rose-500 to-pink-600",    orb1: "bg-orange-300/40", orb2: "bg-pink-300/30"   },
  { gradient: "from-indigo-500 via-purple-600 to-fuchsia-500", orb1: "bg-indigo-300/40", orb2: "bg-fuchsia-300/30" },
];

function AnimatedCard({ feature, theme }) {
  const Icon = iconMap[feature.icon];
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -100px 0px" });

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref} className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${theme.gradient}`}>
        {/* Orbs — only animate when in view */}
        <m.div
          className={`absolute w-48 h-48 rounded-full blur-2xl ${theme.orb1}`}
          animate={inView ? { x: [0, 30, -20, 0], y: [0, -40, 20, 0] } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "-10%", left: "-10%" }}
        />
        <m.div
          className={`absolute w-40 h-40 rounded-full blur-2xl ${theme.orb2}`}
          animate={inView ? { x: [0, -25, 15, 0], y: [0, 30, -20, 0] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ bottom: "5%", right: "-5%" }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 h-full p-10 text-center">
          <m.div
            className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {Icon && <Icon className="w-10 h-10 text-white" />}
          </m.div>

          <div className="space-y-4">
            <m.h4
              key={feature.title}
              className="text-3xl font-black tracking-tight leading-tight text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {feature.title}
            </m.h4>
            <div className="w-12 h-1 rounded-full bg-white/40 mx-auto" />
            <m.p
              key={feature.description}
              className="text-lg font-medium leading-relaxed max-w-[240px] mx-auto text-white/75"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {feature.description}
            </m.p>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

function buildContent() {
  return features.map((feature, idx) => ({
    title: feature.title,
    description: feature.description,
    content: <AnimatedCard feature={feature} theme={cardThemes[idx % cardThemes.length]} />,
  }));
}

const content = buildContent();

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28 bg-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-20 px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-4">
            The SkillYards <span className="text-primary italic font-serif">Advantage</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Here&apos;s why students trust us to launch their careers in tech and business.
          </p>
        </div>

        <div className="hidden lg:block">
          <StickyScroll content={content} />
        </div>

        {/* Mobile */}
        <LazyMotion features={domAnimation}>
          <div className="flex lg:hidden flex-col gap-4 px-6">
            {features.slice(0, 3).map((feature, idx) => {
              const Icon = iconMap[feature.icon];
              const theme = cardThemes[idx % cardThemes.length];
              return (
                <div key={idx} className="relative w-full rounded-3xl overflow-hidden shadow-md md:w-[72%] md:mx-auto">
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="relative z-10 flex gap-4 items-start p-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold mb-1 text-white">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-white/75">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </LazyMotion>
      </div>
    </section>
  );
}
