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
// import StartTesting from "@site/src/components/bot-page/StartTesting";
import HowItWorksIntro from "@site/src/components/bot-page/HowItWorksIntro";
import HowItWorks from "@site/src/components/landing-page/home/sections/HowItWorks";
import TestimonialCarousel from "@site/src/components/landing-page/home/sections/TestimonialCarousel";
import EndingSection from "@site/src/components/landing-page/home/sections/EndingSection";

const STEPS = [
  {
    title: "Effortless setup:",
    subtitle: "Get started in 1 minute",
    description:
      "Simplify the initial setup process and start testing your web app in just one minute. Our intelligent bot automatically crawls your application, generating test cases without any need for programming or complex configurations. This ensures that even teams with limited technical skills can quickly implement and begin testing.",
  },
  {
    image: "/img/landing/instant-results.png",
    alt: "dashboard-testing-results",
    title: "Autonomous testing:",
    subtitle: "Results ready in 2 minutes",
    description:
      "Once the setup is complete, Wopee.io takes over with autonomous testing. Our bot runs through the generated test cases, performing both visual and non-visual validations to ensure your application functions as expected. Within just two minutes, you receive detailed results, helping you identify and address potential issues before they impact your users.",
  },
  {
    image: "/img/landing/comparison-view.png",
    alt: "comparison-view",
    title: "Simplified Maintenance:",
    subtitle: "Adapt and optimize with ease",
    description:
      "Wopee.io is designed for minimal maintenance. When issues are detected, our platform allows you to update tests with a single click or report bugs directly. This seamless process reduces the time spent on test maintenance, enabling your team to focus on broader testing coverage and enhancing overall efficiency.",
  },
];

const FEATURES = [
  "Automated test generation",
  "Scheduled test runs",
  "Video recording of tests",
  "Bot analysis",
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

const TestingBotPage = () => {
  return (
    <Layout>
      <HeroSection />
      <PartnerBrands />
      <TestingBottlenecks />
      <WopeeVersusSection
        bot
        VALUES={VALUES}
      />
      {/* <StartTesting /> */}
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
export default TestingBotPage;
