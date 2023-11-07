import React from "react";

import Layout from "@theme/Layout";
import Pricing from "@site/src/components/pricing/Pricing";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const PricingPage = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Autonomous testing platform for web applications | Wopee.io"
    >
      <main className="container overflow-visible">
        <Pricing />
      </main>
    </Layout>
  );
};
export default PricingPage;
