import React from "react";
import { Helmet } from "react-helmet";
import Head from "@docusaurus/Head";

import GoBack from "@site/src/components/demo/GoBack";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import PartnersCarousel from "@site/src/components/demo/PartnersCarousel";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <React.Fragment>
      <Head>
        <title>Book Demo - {siteConfig.title}</title>
      </Head>
      <Helmet>
        <meta
          name="description"
          content="Book Demo - Autonomous testing platform for web applications | Wopee.io"
        />
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
    </React.Fragment>
  );
}
