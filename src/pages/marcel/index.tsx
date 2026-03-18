import React from "react";
import { Helmet } from "react-helmet";
import Head from "@docusaurus/Head";

import Layout from "@theme/Layout";
import GoBack from "@site/src/components/demo/GoBack";

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Book a Meeting with Marcel | Wopee.io"
      description="Schedule a meeting with Marcel Veselka, co-founder of Wopee.io. Discuss AI test automation, partnerships, or product questions."
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
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
      </div>
    </Layout>
  );
}
