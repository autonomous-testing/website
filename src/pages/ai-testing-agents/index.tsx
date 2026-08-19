import React from "react";

import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import HeroSection from "@site/src/components/bot-page/HeroSection";
import DefinitionBlock from "@site/src/components/bot-page/DefinitionBlock";
import FaqSection from "@site/src/components/bot-page/FaqSection";
import PartnerBrands from "@site/src/components/landing-page/home/sections/PartnerBrands";
import TestingBottlenecks from "@site/src/components/bot-page/TestingBottlenecks";
import VersusManual from "@site/src/components/bot-page/VersusManual";
import SelfHealingMechanisms from "@site/src/components/bot-page/SelfHealingMechanisms";
import EvidenceSection from "@site/src/components/bot-page/EvidenceSection";
import HowItWorksIntro from "@site/src/components/bot-page/HowItWorksIntro";
import HowItWorks from "@site/src/components/landing-page/home/sections/HowItWorks";
import TestimonialCarousel from "@site/src/components/landing-page/home/sections/TestimonialCarousel";
import EndingSection from "@site/src/components/landing-page/home/sections/EndingSection";

const STEPS = [
  {
    title: "Effortless setup:",
    subtitle: "Get started in 1 minute",
    description:
      "Point the testing bot at any web app. It starts exploring immediately, with no scripts, selectors, or programming required. The agent autonomously crawls your application, discovers user flows, and generates Playwright test cases.",
  },
  {
    image: "/img/landing/instant-results.png",
    alt: "Wopee.io results dashboard showing autonomous test runs with screenshots, traces, and video recordings after the testing bot executes generated Playwright tests across browsers.",
    title: "Autonomous testing:",
    subtitle: "Results ready in 2 minutes",
    description:
      "Your AI agent runs generated tests across browsers, with visual and functional validations. When your UI changes, tests self-heal instead of breaking. Within minutes, you get detailed results with screenshots, traces, and video recordings.",
  },
  {
    image: "/img/landing/comparison-view.png",
    alt: "Visual comparison view in Wopee.io where a reviewer approves a visual baseline update with a single click after the testing bot detects a UI change.",
    title: "Simplified maintenance:",
    subtitle: "Adapt and optimize with ease",
    description:
      "Traditional test frameworks break with every UI change. Wopee.io agents adapt automatically. Approve visual baseline updates with a single click or report bugs directly. Your team focuses on shipping, not fixing flaky tests.",
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
      <div className="overflow-hidden text-slate-900 dark:text-slate-100">
        <HeroSection />
        <DefinitionBlock />

        <div className="[&>div]:!py-12 sm:[&>div]:!py-16 lg:[&>div]:!py-20">
          <PartnerBrands />
        </div>

        <TestingBottlenecks />
        <VersusManual />
        <HowItWorksIntro />

        <section className="py-12 sm:py-16 lg:py-24 [&>.container]:!gap-12 lg:[&>.container]:!gap-16 [&>.container>p:first-child]:!m-0 [&>.container>p:first-child]:!text-3xl sm:[&>.container>p:first-child]:!text-4xl lg:[&>.container>p:first-child]:!text-5xl [&>.container>div:not(:last-child)]:!gap-8 [&>.container>div:not(:last-child)]:rounded-xl [&>.container>div:not(:last-child)]:border [&>.container>div:not(:last-child)]:border-slate-200 [&>.container>div:not(:last-child)]:border-t-2 [&>.container>div:not(:last-child)]:border-t-secondary-wopee/70 [&>.container>div:not(:last-child)]:bg-white [&>.container>div:not(:last-child)]:p-5 [&>.container>div:not(:last-child)]:shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:[&>.container>div:not(:last-child)]:p-7 dark:[&>.container>div:not(:last-child)]:border-white/10 dark:[&>.container>div:not(:last-child)]:border-t-primary-wopee/70 dark:[&>.container>div:not(:last-child)]:bg-white/[0.035] dark:[&>.container>div:not(:last-child)]:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)] [&>.container>div:not(:last-child)_p]:!m-0 [&>.container>div:not(:last-child)>div:last-child>div:first-child>p]:!text-2xl lg:[&>.container>div:not(:last-child)>div:last-child>div:first-child>p]:!text-3xl [&>.container>div:not(:last-child)>div:last-child>div:last-child]:!text-base [&>.container>div:not(:last-child)>div:last-child>div:last-child]:!leading-7 [&>.container>div:not(:last-child)>div:last-child>div:last-child]:!text-slate-600 [&>.container>div:not(:last-child)>div:last-child>div:last-child]:!opacity-100 sm:[&>.container>div:not(:last-child)>div:last-child>div:last-child]:!text-lg dark:[&>.container>div:not(:last-child)>div:last-child>div:last-child]:!text-slate-300 [&>.container>div:last-child>p]:!m-0 [&>.container>div:last-child>p]:!text-2xl sm:[&>.container>div:last-child>p]:!text-3xl [&>.container>div:last-child>div>div]:!rounded-xl [&>.container>div:last-child>div>div]:!border-slate-200 [&>.container>div:last-child>div>div]:!border-t-2 [&>.container>div:last-child>div>div]:!border-t-secondary-wopee/70 [&>.container>div:last-child>div>div]:!bg-white [&>.container>div:last-child>div>div]:!p-3 [&>.container>div:last-child>div>div]:!text-base [&>.container>div:last-child>div>div]:!shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] dark:[&>.container>div:last-child>div>div]:!border-white/10 dark:[&>.container>div:last-child>div>div]:!border-t-primary-wopee/70 dark:[&>.container>div:last-child>div>div]:!bg-white/[0.035] dark:[&>.container>div:last-child>div>div]:!shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)] [&_img]:!shadow-[0_18px_50px_-30px_rgba(15,23,42,0.4)] dark:[&_img]:!shadow-[0_22px_55px_-30px_rgba(0,0,0,0.9)]">
          <HowItWorks
            STEPS={STEPS}
            FEATURES={FEATURES}
          />
        </section>

        <SelfHealingMechanisms />
        <EvidenceSection />

        <section className="py-12 sm:py-16 lg:py-20 [&>div]:!my-0 [&>div>div:first-child]:!text-3xl sm:[&>div>div:first-child]:!text-4xl [&>div>div:nth-child(2)>div>div]:!rounded-xl [&>div>div:nth-child(2)>div>div]:!border-slate-200 [&>div>div:nth-child(2)>div>div]:!border-t-2 [&>div>div:nth-child(2)>div>div]:!border-t-secondary-wopee/70 [&>div>div:nth-child(2)>div>div]:!bg-white [&>div>div:nth-child(2)>div>div]:!shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] dark:[&>div>div:nth-child(2)>div>div]:!border-white/10 dark:[&>div>div:nth-child(2)>div>div]:!border-t-primary-wopee/70 dark:[&>div>div:nth-child(2)>div>div]:!bg-white/[0.035] dark:[&>div>div:nth-child(2)>div>div]:!shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
          <TestimonialCarousel />
        </section>

        <FaqSection />

        <div className="border-t border-slate-200 bg-secondary-wopee/[0.05] dark:border-white/10 dark:bg-primary-wopee/[0.04] [&>div]:!bg-none [&>div>div]:!my-0 [&>div>div]:!h-auto [&>div>div]:!py-16 lg:[&>div>div]:!py-20">
          <EndingSection bot />
        </div>
      </div>
    </Layout>
  );
};
export default AiTestingAgentsPage;
