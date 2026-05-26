"use client";

import React from "react";
import { Rocket, BookOpen, Code2, Award } from "lucide-react";
import Timeline from "@/components/common/Timeline";

const phases = [
  {
    icon: BookOpen,
    title: "Tech Foundations",
    duration: "Start",
    description:
      "Build strong fundamentals in programming, mathematics, and computer science principles.",
  },
  {
    icon: Code2,
    title: "Skill Building",
    duration: "Growth",
    description:
      "Develop real-world coding skills through projects, mentorship, and hands-on development.",
  },
  {
    icon: Rocket,
    title: "Real Experience",
    duration: "Execution",
    description:
      "Work on live software projects and understand how real tech companies operate.",
  },
  {
    icon: Award,
    title: "Career Ready",
    duration: "Outcome",
    description:
      "Become a confident, job-ready developer capable of joining top tech firms on day one.",
  },
];

export default function BCAJourneyTimeline() {
  return (
    <Timeline
      items={phases}
      title={
        <>
          Your <span className="text-primary italic">Journey</span>
        </>
      }
      subtitle="Your BCA in Agra journey, from beginner to job-ready developer."
    />
  );
}
