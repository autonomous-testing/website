import React from "react";

import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

import HomeHeroVibe from "@/components/home-page/HomeHeroVibe";
import HomeSocialProof from "@/components/home-page/HomeSocialProof";
import HomeBenefits from "@/components/home-page/HomeBenefits";
import HomeHowItWorks from "@/components/home-page/HomeHowItWorks";
import HomeTestingFrameworks from "@/components/home-page/HomeTestingFrameworks";
import HomeTrustedBy from "@/components/home-page/HomeTrustedBy";
import HomeDeploymentOptions from "@/components/home-page/HomeDeploymentOptions";
import HomeEndingSection from "@/components/home-page/HomeEndingSection";
import HomeFaqSection from "@/components/home-page/HomeFaqSection";

export default function Home(): JSX.Element {
  return (
    <Layout
      title="AI Testing Agents for Web Apps"
      description="Stop writing tests manually. Wopee.io AI agents explore your app, generate Playwright tests, and self-heal when your UI changes. Try free."
    >
      <HomeHeroVibe />
      <HomeBenefits />
      <HomeHowItWorks />
      <HomeTestingFrameworks />
      <HomeDeploymentOptions />
      <HomeSocialProof />
      <HomeTrustedBy />
      <HomeFaqSection />
      <HomeEndingSection />
    </Layout>
  );
}
