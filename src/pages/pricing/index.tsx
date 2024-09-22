import React from "react";

import Layout from "@theme/Layout";
import Pricing from "@site/src/components/pricing/Pricing";

const PricingPage = () => {
  return (
    <Layout title="Pricing">
      <main className="container">
        <Pricing />
      </main>
    </Layout>
  );
};
export default PricingPage;
