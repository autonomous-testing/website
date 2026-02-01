import React from "react";
import Head from "@docusaurus/Head";

import Layout from "@theme/Layout";

import HomeHeroVibe from "@/components/home-page/HomeHeroVibe";
import HomeSocialProof from "@/components/home-page/HomeSocialProof";
import HomeBenefits from "@/components/home-page/HomeBenefits";
import HomeHowItWorks from "@/components/home-page/HomeHowItWorks";
import HomeTestingFrameworks from "@/components/home-page/HomeTestingFrameworks";
import HomeTrustedBy from "@/components/home-page/HomeTrustedBy";
import HomeDeploymentOptions from "@/components/home-page/HomeDeploymentOptions";
import HomeEndingSection from "@/components/home-page/HomeEndingSection";
import HomeFaqSection from "@/components/home-page/HomeFaqSection";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteConfig.url ?? "https://website.wopee.io";
  const baseUrl = new URL(siteConfig.baseUrl ?? "/", siteUrl).toString();
  const pageUrl = baseUrl;
  const title = "Wopee.io - AI Testing Agents for Web Apps";
  const description =
    "Autonomous AI testing agents for web apps. Generate, execute, and maintain regression tests with Playwright, Cypress, and more.";
  const socialImage = new URL("img/wopee-social-card.jpg", baseUrl).toString();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wopee.io",
    url: baseUrl,
    logo: new URL("img/logo.png", baseUrl).toString(),
    sameAs: [
      "https://www.linkedin.com/company/wopee",
      "https://github.com/Wopee-io",
      "https://www.youtube.com/@wopee",
    ],
  };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wopee.io AI Testing Agents",
    description:
      "AI agents that design, execute, and maintain regression tests for web applications.",
    brand: {
      "@type": "Organization",
      name: "Wopee.io",
    },
    category: "SoftwareTesting",
    url: pageUrl,
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Head>
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
