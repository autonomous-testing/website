import React from "react";
import { Helmet } from "react-helmet";

import Layout from "@theme/Layout";
import GoBack from "@site/src/components/demo/GoBack";
import PartnersCarousel from "@site/src/components/demo/PartnersCarousel";

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Book a Demo | Wopee.io"
      description="Book a live demo of Wopee.io AI testing agents. See how autonomous test generation and self-healing tests can cut your QA effort by 70%."
    >
      <Helmet>
        <script
          type="text/javascript"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        ></script>
      </Helmet>
      <div className="container">
        <GoBack />
        <div
          className="meetings-iframe-container"
          data-src="https://meetings-eu1.hubspot.com/marcel-veselka?embed=true"
        ></div>
        <PartnersCarousel />
      </div>
    </Layout>
  );
}
