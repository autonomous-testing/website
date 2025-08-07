import React from "react";
import { mdiCurrencyUsd, mdiRocket, mdiCheckboxMultipleOutline } from "@mdi/js";

import HeroSection from "./sections/HeroSection";
import PartnerBrands from "./sections/PartnerBrands";
import ProblemGrid from "./sections/ProblemGrid";
import VisualBugCarousel from "./sections/VisualBugCarousel";
import WopeeVersusSection from "./sections/WopeeVersusSection";
import SupportedTestingTools from "./sections/SupportedTestingTools";
import SolutionIntroSection from "./sections/SolutionIntroSection";
import HowItWorks from "./sections/HowItWorks";
import TestimonialCarousel from "./sections/TestimonialCarousel";
import EndingSection from "./sections/EndingSection";

const STEPS = [
  {
    image: "/img/landing/new-project-dialog.png",
    alt: "new-project-dialog",
    title: "Effortless setup:",
    subtitle: "Start visual testing in minutes",
    description:
      "Simplify the initial setup process and begin visual testing in just a few minutes. Whether you're testing web, mobile, or desktop apps, Wopee.io quickly configures your visual baseline, allowing your team to focus on testing without the steep learning curve.",
    benefit:
      "Even non-technical team members can initiate visual testing, making it easier to integrate into your workflow without delays or costly overhead.",
  },
  {
    image: "/img/landing/instant-results.png",
    alt: "dashboard-testing-results",
    title: "Instant results:",
    subtitle: "Identify visual bugs in seconds",
    description:
      "Our platform compares new screenshots against visual baselines, automatically detecting discrepancies. Within seconds, you’ll receive a detailed report highlighting any visual issues, helping you resolve potential user-facing problems before they impact the user experience.",
    benefit:
      "Speed up your release cycles by catching visual bugs immediately and ensuring your app’s interface remains flawless across versions and platforms.",
  },
  {
    image: "/img/landing/comparison-view.png",
    alt: "comparison-view",
    title: "Simplified Maintenance:",
    subtitle: "Scale and optimize with ease",
    description:
      "Wopee.io minimizes the effort needed to maintain your visual tests. When changes are detected, simply approve updates to the visual baseline with one click. Our platform automatically adapts, reducing the need for manual intervention and allowing you to scale your tests effortlessly across different configurations and versions.",
    benefit:
      "Save time and resources with Wopee.io’s low-maintenance solution, enabling your team to focus on broader testing coverage and overall product quality.",
  },
];

const FEATURES = [
  "Baseline management",
  "Native mobile app visual testing",
  "PDF testing",
  "Automated test generation",
  "Scheduled test runs",
  "Text execution video recording",
  "Bot analysis",
  "Easy CI/CD integration",
  "Multi-version support",
  "Execution traces",
  "Autonomous visual testing",
  "Exploratory testing",
  "Mobile browser testing",
  "Autonomous non-visual testing",
  "Multi-configuration support",
  "Priority-based testing",
];

const VALUES = [
  {
    icon: mdiRocket,
    title: "10x",
    description: "Quicker setup compared to traditional tools",
  },
  {
    icon: mdiCurrencyUsd,
    title: "30 - 40%",
    description: "Lower cost than our competitors",
  },
  {
    icon: mdiCheckboxMultipleOutline,
    title: "5x",
    description: "Higher test coverage with simple maintenance",
  },
];

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <PartnerBrands />
      <ProblemGrid />
      <VisualBugCarousel />
      <WopeeVersusSection VALUES={VALUES} />
      <SupportedTestingTools />
      <SolutionIntroSection />
      <HowItWorks STEPS={STEPS} FEATURES={FEATURES} />
      <TestimonialCarousel />
      <EndingSection />
    </>
  );
};
export default LandingPage;
