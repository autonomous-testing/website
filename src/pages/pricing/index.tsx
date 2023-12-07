import React from "react";

import Layout from "@theme/Layout";
import Pricing from "@site/src/components/pricing/Pricing";

const PricingPage = () => {
  return (
    <Layout>
      <main className="container overflow-visible">
        <Pricing />
      </main>
    </Layout>
  );
};
export default PricingPage;
