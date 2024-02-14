import React from "react";
import { Helmet } from "react-helmet";

import GoBack from "@site/src/components/demo/GoBack";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <React.Fragment>
      <Helmet>
        <title>{siteConfig.title}</title>
        <meta
          name="description"
          content="Autonomous testing platform for web applications | Wopee.io"
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
          data-src="https://meetings-eu1.hubspot.com/marcel-veselka/call?embed=true"
        ></div>
      </div>
    </React.Fragment>
  );
}
