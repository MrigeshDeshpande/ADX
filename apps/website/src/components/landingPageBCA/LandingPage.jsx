"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { BCAHero } from './Hero';

const BCABenefits = dynamic(() => import('./Benefits').then(m => m.BCABenefits));
const BCA_CTA = dynamic(() => import('./CTA').then(m => m.BCA_CTA));
const BCAComparisonSection = dynamic(() => import('./ComparisonTable').then(m => m.BCAComparisonSection));
const BcaCoreValues = dynamic(() => import('./CoreValue').then(m => m.BcaCoreValues));
const BCAEducators = dynamic(() => import('./Educators').then(m => m.BCAEducators));
const BCAJourneyTimeline = dynamic(() => import('./ProgramPhases'));
const BCASkills = dynamic(() => import('./Skills').then(m => m.BCASkills));
const BCAStats = dynamic(() => import('./Stats').then(m => m.BCAStats));
const BCASyllabus = dynamic(() => import('./Syllabus').then(m => m.BCASyllabus));
const PartnersSlider = dynamic(() => import('../common/PartnersSlider'));

export const BCALandingPage = () => {
  return (
    <section className="landing-page bg-background text-foreground min-h-screen w-full">
      <div className="w-full bg-background">
        <main className="w-full">
          <BCAHero />
          <BCABenefits />
          <BCA_CTA />
          <BCAComparisonSection />
          <BcaCoreValues />
          <BCAEducators />
          <BCAJourneyTimeline />
          <BCASkills />
          <BCAStats />
          <BCASyllabus />
          <PartnersSlider />
        </main>
      </div>
    </section>
  );
};
