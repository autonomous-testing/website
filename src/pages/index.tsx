import React from "react";

import Layout from "@theme/Layout";

import HomeHeroVibe from "../components/home-page/HomeHeroVibe";
import HomeTrustedBy from "@site/src/components/home-page/HomeTrustedBy";
// import HomeHeroSection from "@site/src/components/home-page/HomeHeroSection";
import HomeProductCards from "@site/src/components/home-page/HomeProductCards";
import HomeEndingSection from "../components/home-page/HomeEndingSection";

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
