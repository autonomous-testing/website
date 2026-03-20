import {
  mdiRocket,
  mdiRunFast,
  mdiCurrencyUsd,
  mdiCheckboxMultipleOutline,
} from "@mdi/js";
import React from "react";

import Layout from "@theme/Layout";
import HeroSection from "@site/src/components/bot-page/HeroSection";
import PartnerBrands from "@site/src/components/landing-page/home/sections/PartnerBrands";
import TestingBottlenecks from "@site/src/components/bot-page/TestingBottlenecks";
import WopeeVersusSection from "@site/src/components/landing-page/home/sections/WopeeVersusSection";
import HowItWorksIntro from "@site/src/components/bot-page/HowItWorksIntro";
import HowItWorks from "@site/src/components/landing-page/home/sections/HowItWorks";
import TestimonialCarousel from "@site/src/components/landing-page/home/sections/TestimonialCarousel";
import EndingSection from "@site/src/components/landing-page/home/sections/EndingSection";

const STEPS = [
  {
    title: "Effortless setup:",
    subtitle: "Get started in 1 minute",
    description:
      "Point your AI agent at any web app and it starts exploring immediately. No scripts, no selectors, no programming required. The agent autonomously crawls your application, discovers user flows, and generates Playwright test cases automatically.",
  },
  {
    image: "/img/landing/instant-results.png",
    alt: "dashboard-testing-results",
    title: "Autonomous testing:",
    subtitle: "Results ready in 2 minutes",
    description:
      "Your AI agent runs generated tests across browsers, performing visual and functional validations. When your UI changes, tests self-heal instead of breaking. Within minutes, you get detailed results with screenshots, traces, and video recordings.",
  },
  {
    image: "/img/landing/comparison-view.png",
    alt: "comparison-view",
    title: "Simplified Maintenance:",
    subtitle: "Adapt and optimize with ease",
    description:
      "Traditional test frameworks break with every UI change. Wopee.io agents adapt automatically. Approve visual baseline updates with a single click, or report bugs directly. Your team focuses on shipping, not fixing flaky tests.",
  },
];

const FEATURES = [
  "AI-powered test generation",
  "Scheduled test runs",
  "Video recording and traces",
  "Self-healing tests",
  "Playwright test export",
  "Multi-browser execution",
  "Autonomous visual testing",
  "Exploratory testing",
  "Mobile browser testing",
  "Autonomous functional testing",
  "Multi-configuration support",
  "Priority-based testing",
];

const VALUES = [
  {
    icon: mdiRocket,
    title: "10x",
    description: "Quicker preparation",
  },
  {
    icon: mdiCurrencyUsd,
    title: "30 - 40%",
    description: "Cheaper maintenance",
  },
  {
    icon: mdiCheckboxMultipleOutline,
    title: "5x",
    description: "Higher coverage",
  },
  {
    icon: mdiRunFast,
    title: "50 - 70%",
    description: "Quicker execution",
  },
];

const AiTestingAgentsPage = () => {
  return (
    <Layout
      title="AI Testing Agents | Wopee.io"
      description="Autonomous AI testing agents that explore your web app, generate Playwright tests, and self-heal when your UI changes. Start testing in minutes, no coding required."
    >
      <HeroSection />
      <PartnerBrands />
      <TestingBottlenecks />
      <WopeeVersusSection
        bot
        VALUES={VALUES}
      />
      <HowItWorksIntro />
      <HowItWorks
        STEPS={STEPS}
        FEATURES={FEATURES}
      />
      <TestimonialCarousel />
      <EndingSection bot />
    </Layout>
  );
};
export default AiTestingAgentsPage;
