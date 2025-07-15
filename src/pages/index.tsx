import React from "react";

import Layout from "@theme/Layout";

import HomeHeroVibe from "@/components/home-page/HomeHeroVibe";
import HomeSocialProof from "@/components/home-page/HomeSocialProof";
import HomeBenefits from "@/components/home-page/HomeBenefits";
import HomeTestingFrameworks from "@/components/home-page/HomeTestingFrameworks";
import HomeTrustedBy from "@/components/home-page/HomeTrustedBy";
import HomeProductCards from "@/components/home-page/HomeProductCards";
import HomeDeploymentOptions from "@/components/home-page/HomeDeploymentOptions";
import HomeEndingSection from "@/components/home-page/HomeEndingSection";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomeHeroVibe />
      <HomeSocialProof />
      <HomeBenefits />
      <HomeTestingFrameworks />
      <HomeProductCards />
      <HomeTrustedBy />
      <HomeDeploymentOptions />
      <HomeEndingSection />
    </Layout>
  );
}
