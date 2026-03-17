import React from "react";

import Layout from "@theme/Layout";
import Pricing from "@site/src/components/pricing/Pricing";

const PricingPage = () => {
  return (
    <Layout
      title="Pricing | Wopee.io"
      description="Simple, transparent pricing for Wopee.io AI testing agents. Start free, upgrade as you grow. No credit card required to get started."
    >
      <main className="container">
        <Pricing />
      </main>
    </Layout>
  );
};
export default PricingPage;
