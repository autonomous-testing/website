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

const JSONLD_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wopee.io",
  legalName: "wopee labs s.r.o.",
  url: "https://wopee.io",
  logo: "https://wopee.io/img/logo.png",
  email: "help@wopee.io",
  sameAs: [
    "https://www.linkedin.com/company/wopee",
    "https://github.com/Wopee-io",
    "https://www.youtube.com/@wopee",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "help@wopee.io",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
};

const JSONLD_APP = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wopee.io",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Test Automation",
  operatingSystem: "Web",
  url: "https://wopee.io",
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

export default function Home(): JSX.Element {
  return (
    <Layout
      title="AI Testing Agents for Web Apps"
      description="Stop writing tests manually. Wopee.io AI agents explore your app, generate Playwright tests, and self-heal when your UI changes. Try free."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(JSONLD_ORG)}</script>
        <script type="application/ld+json">{JSON.stringify(JSONLD_APP)}</script>
      </Head>
      <HomeHeroVibe />
      <HomeTrustedBy />
      <HomeBenefits />
      <HomeSocialProof />
      <HomeHowItWorks />
      <HomeTestingFrameworks />
      <HomeDeploymentOptions />
      <HomeFaqSection />
      <HomeEndingSection />
    </Layout>
  );
}
