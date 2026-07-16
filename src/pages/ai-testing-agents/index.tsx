import React from "react";

import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import HeroSection from "@site/src/components/bot-page/HeroSection";
import DefinitionBlock from "@site/src/components/bot-page/DefinitionBlock";
import FaqSection from "@site/src/components/bot-page/FaqSection";
import PartnerBrands from "@site/src/components/landing-page/home/sections/PartnerBrands";
import TestingBottlenecks from "@site/src/components/bot-page/TestingBottlenecks";
import VersusManual from "@site/src/components/bot-page/VersusManual";
import HowItWorksIntro from "@site/src/components/bot-page/HowItWorksIntro";
import HowItWorks from "@site/src/components/landing-page/home/sections/HowItWorks";
import TestimonialCarousel from "@site/src/components/landing-page/home/sections/TestimonialCarousel";
import EndingSection from "@site/src/components/landing-page/home/sections/EndingSection";

const STEPS = [
  {
    title: "Effortless setup:",
    subtitle: "Get started in 1 minute",
    description:
      "Point the testing bot at any web app and it starts exploring immediately. No scripts, no selectors, no programming required. The agent autonomously crawls your application, discovers user flows, and generates Playwright test cases automatically.",
  },
  {
    image: "/img/landing/instant-results.png",
    alt: "Wopee.io results dashboard showing autonomous test runs with screenshots, traces, and video recordings after the testing bot executes generated Playwright tests across browsers.",
    title: "Autonomous testing:",
    subtitle: "Results ready in 2 minutes",
    description:
      "Your AI agent runs generated tests across browsers, performing visual and functional validations. When your UI changes, tests self-heal instead of breaking. Within minutes, you get detailed results with screenshots, traces, and video recordings.",
  },
  {
    image: "/img/landing/comparison-view.png",
    alt: "Visual comparison view in Wopee.io where a reviewer approves a visual baseline update with a single click after the testing bot detects a UI change.",
    title: "Simplified maintenance:",
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

const JSONLD_APP = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wopee.io",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Test Automation",
  operatingSystem: "Web",
  url: "https://wopee.io/ai-testing-agents/",
  description:
    "Autonomous AI testing agents for web applications. Wopee.io agents explore your app, generate Playwright tests, run them across browsers, and self-heal when the UI changes.",
  publisher: {
    "@type": "Organization",
    name: "Wopee.io",
    url: "https://wopee.io",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description:
      "Free to start, no credit card required. Paid plans from €19/user/mo.",
    url: "https://wopee.io/pricing/",
  },
};

const AiTestingAgentsPage = () => {
  return (
    <Layout
      title="Testing Bot for Web Apps: AI Testing Agents"
      description="Testing bot for web apps: Wopee.io's AI testing agents explore your app, generate Playwright tests, and self-heal when the UI changes. Start in minutes."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(JSONLD_APP)}</script>
      </Head>
      <HeroSection />
      <DefinitionBlock />
      <PartnerBrands />
      <TestingBottlenecks />
      <VersusManual />
      <HowItWorksIntro />
      <HowItWorks
        STEPS={STEPS}
        FEATURES={FEATURES}
      />
      <TestimonialCarousel />
      <FaqSection />
      <EndingSection bot />
    </Layout>
  );
};
export default AiTestingAgentsPage;
