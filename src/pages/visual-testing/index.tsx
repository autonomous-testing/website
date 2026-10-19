import React from "react";

import Layout from "@theme/Layout";
import LandingPage from "@site/src/components/landing-page/home/LandingPage";

export default function LandingHome() {
  return (
    <Layout
      title="Visual Regression Testing"
      description="AI visual regression testing for Playwright, Cypress, Selenium, Appium, WebdriverIO and Robot Framework. Native SDKs plus an API for any framework that takes screenshots."
    >
      <LandingPage />
    </Layout>
  );
}
