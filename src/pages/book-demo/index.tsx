import React from "react";
import { Helmet } from "react-helmet";

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Autonomous testing platform for web applications | Wopee.io"
    >
      <Helmet>
        <script
          type="text/javascript"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        ></script>
      </Helmet>
      <div
        className="meetings-iframe-container my-auto"
        data-src="https://meetings-eu1.hubspot.com/marcel-veselka?embed=true"
      ></div>
    </Layout>
  );
}
