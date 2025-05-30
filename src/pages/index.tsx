import React from "react";

import Layout from "@theme/Layout";

import HomeHeroVibe from "@/components/home-page/HomeHeroVibe";
import HomeBenefits from "@/components/home-page/HomeBenefits";
import HomeTrustedBy from "@/components/home-page/HomeTrustedBy";
import HomeProductCards from "@/components/home-page/HomeProductCards";
import HomeEndingSection from "@/components/home-page/HomeEndingSection";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomeHeroVibe />
      <HomeBenefits />
      <HomeProductCards />
      <HomeTrustedBy />
      <HomeEndingSection />
    </Layout>
  );
}
