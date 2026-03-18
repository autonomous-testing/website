import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { Helmet } from "react-helmet";

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Book a Meeting with Jan | Wopee.io"
      description="Schedule a meeting with Jan Beránek from Wopee.io. Discuss AI test automation, onboarding, or product questions."
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
      <div
        className="meetings-iframe-container"
        data-src="https://meetings-eu1.hubspot.com/jan-beranek?embed=true"
      ></div>
    </Layout>
  );
}
