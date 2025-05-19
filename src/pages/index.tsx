import React from "react";

import Layout from "@theme/Layout";

import HomeHeroVibe from "@/components/home-page/HomeHeroVibe";
import HomeTrustedBy from "@/components/home-page/HomeTrustedBy";
// import HomeHeroSection from "@/components/home-page/HomeHeroSection";
import HomeProductCards from "@/components/home-page/HomeProductCards";
import HomeEndingSection from "@/components/home-page/HomeEndingSection";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomeHeroVibe />
      {/* <HomeHeroSection /> */}
      <HomeProductCards />
      <HomeTrustedBy />
      <HomeEndingSection />
    </Layout>
  );
}
