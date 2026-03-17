import React from "react";

import Layout from "@theme/Layout";
import LandingPage from "@site/src/components/landing-page/home/LandingPage";

export default function LandingHome() {
  return (
    <Layout
      title="Visual Regression Testing | Wopee.io"
      description="Automated visual regression testing for web applications. Detect UI regressions across browsers and screen sizes with AI-powered pixel-by-pixel comparisons."
    >
      <LandingPage />
    </Layout>
  );
}
