import React from "react";

import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import Pricing from "@site/src/components/pricing/Pricing";

const JSONLD_PRODUCT = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Wopee.io",
  description:
    "Autonomous AI testing agents for web applications. Generate, run, and self-heal Playwright tests without writing scripts.",
  brand: {
    "@type": "Brand",
    name: "Wopee.io",
  },
  url: "https://wopee.io/pricing/",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      description:
        "For solo devs and side projects. Up to 10 active projects, autonomous test generation, Playwright + CI/CD ready, email and community support.",
      price: "19",
      priceCurrency: "EUR",
      url: "https://wopee.io/pricing/",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "19",
        priceCurrency: "EUR",
        unitText: "user/month",
        billingIncrement: 1,
      },
    },
    {
      "@type": "Offer",
      name: "Basic",
      description:
        "For growing product teams. Up to 100 active projects, team user management, onboarding assistance, and everything in Starter.",
      price: "79",
      priceCurrency: "EUR",
      url: "https://wopee.io/pricing/",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "79",
        priceCurrency: "EUR",
        unitText: "user/month",
        billingIncrement: 1,
      },
    },
    {
      "@type": "Offer",
      name: "Premium",
      description:
        "For high-velocity engineering orgs. Unlimited projects, advanced user management and roles, priority support, and everything in Basic.",
      price: "179",
      priceCurrency: "EUR",
      url: "https://wopee.io/pricing/",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "179",
        priceCurrency: "EUR",
        unitText: "user/month",
        billingIncrement: 1,
      },
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      description:
        "Unlimited everything, on-premise deployment, SSO, RBAC and audit logs, dedicated CSM and SLA, custom integrations, security review and DPA. Talk to founders for pricing.",
      url: "https://wopee.io/book-demo/",
      availability: "https://schema.org/InStock",
    },
  ],
};

const PricingPage = () => {
  return (
    <Layout
      title="Pricing | Wopee.io"
      description="Simple, transparent pricing for Wopee.io AI testing agents. Start free, upgrade as you grow. No credit card required to get started."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(JSONLD_PRODUCT)}
        </script>
      </Head>
      <main className="container">
        <Pricing />
      </main>
    </Layout>
  );
};
export default PricingPage;
