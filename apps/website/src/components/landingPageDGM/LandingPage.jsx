"use client";

import { DGMHero } from "./Hero";
import { DGMWhyDigitalMarketing } from "./WhyDigitalMarketing";
import { DGMProgramAtGlance } from "./ProgramAtGlance";
import { DGMOJTExplained } from "./OJTExplained";
import { DGMCurriculum } from "./Curriculum";
import { DGMToolsAndCerts } from "./ToolsAndCerts";
import { DGMPortfolioResults } from "./PortfolioResults";
import { DGMCareerPaths } from "./CareerPaths";
import { DGMWhoIsThisFor } from "./WhoIsThisFor";
import { DGMEducators } from "./Educators";
import { DGMComparisonTable } from "./ComparisonTable";
import { DGMDayInTheLife } from "./DayInTheLife";
import { DGMPlacementOutcomes } from "./PlacementOutcomes";
import PartnersSlider from "@/components/common/PartnersSlider";
import { DGMAdmissionProcess } from "./AdmissionProcess";
import { DGMFAQ } from "./FAQ";
import { DGMFinalCTA } from "./FinalCTA";

export function DGMLandingPage({faqs}) {
  return (
    <main className="w-full bg-background text-foreground">
      <DGMHero />
      <DGMWhyDigitalMarketing />
      <DGMProgramAtGlance />
      <DGMOJTExplained />
      <DGMCurriculum />
      <DGMToolsAndCerts />
      <DGMPortfolioResults />
      <DGMCareerPaths />
      <DGMEducators />
      <DGMWhoIsThisFor />
      <DGMComparisonTable />
      <DGMDayInTheLife />
      <DGMPlacementOutcomes />
      <PartnersSlider />
      <DGMAdmissionProcess />
      <DGMFAQ faqs={faqs} />
      <DGMFinalCTA />
    </main>
  );
}
