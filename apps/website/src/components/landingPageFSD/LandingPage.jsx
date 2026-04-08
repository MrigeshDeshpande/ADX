"use client";

import { FSDHero } from "./Hero";
import { FSDProgramAtGlance } from "./ProgramAtGlance";
import { FSDOJTExplained } from "./OJTExplained";
import { FSDCurriculum } from "./Curriculum";
import { FSDTechStack } from "./TechStack";
import { FSDPortfolioProjects } from "./PortfolioProjects";
import { FSDWhoIsThisFor } from "./WhoIsThisFor";
import { FSDComparisonTable } from "./ComparisonTable";
import { FSDDayInTheLife } from "./DayInTheLife";
import { FSDPlacementOutcomes } from "./PlacementOutcomes";
import { FSDAdmissionProcess } from "./AdmissionProcess";
import { FSDFAQ } from "./FAQ";
import { FSDFinalCTA } from "./FinalCTA";
import { FSDEducators } from "./Educators";
import PartnersSlider from "@/components/common/PartnersSlider";

export function FSDLandingPage({ faqs }) {

  return (
    <main className="w-full bg-background text-foreground">
      <FSDHero />
      <FSDProgramAtGlance />
      <FSDOJTExplained />
      <FSDCurriculum />
      <FSDTechStack />
      <FSDEducators />
      <FSDPortfolioProjects />
      <FSDWhoIsThisFor />
      <FSDComparisonTable />
      <FSDDayInTheLife />
      <FSDPlacementOutcomes />
      <PartnersSlider />
      <FSDAdmissionProcess />
      <FSDFAQ faqs={faqs} />
      <FSDFinalCTA />
    </main>
  );
}
