"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { BBAHero } from './Hero';

const Benefits = dynamic(() => import('./Benefits').then(m => m.Benefits));
const BBA_CTA = dynamic(() => import('./CTA').then(m => m.BBA_CTA));
const ComparisonSection = dynamic(() => import('./ComparisonTable').then(m => m.ComparisonSection));
const CoreValues = dynamic(() => import('./CoreValue').then(m => m.CoreValues));
const Educators = dynamic(() => import('./Educators').then(m => m.Educators));
const JourneyTimeline = dynamic(() => import('./ProgramPhases'));
const Skills = dynamic(() => import('./Skills').then(m => m.Skills));
const Stats = dynamic(() => import('./Stats').then(m => m.Stats));
const Syllabus = dynamic(() => import('./Syllabus').then(m => m.Syllabus));
const PartnersSlider = dynamic(() => import('../common/PartnersSlider'));

export const LandingPage = () => {
  return (
    <section className="landing-page bg-background text-foreground min-h-screen w-full">
      <div className="w-full bg-background">
        <main className="w-full">
          <BBAHero />
          <Benefits />
          <BBA_CTA />
          <ComparisonSection />
          <CoreValues />
          <Educators />
          <JourneyTimeline />
          <Skills />
          <Stats />
          <Syllabus />
          <PartnersSlider />
        </main>
      </div>
    </section>
  );
};
