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
        <meta name="description" content="Mentoring Marcel from Wopee.io" />
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
      </Helmet>
      <div className="container">
        <GoBack />

        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/marcel-veselka-wopee/30min?primary_color=7030a0"
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
      </div>
    </React.Fragment>
  );
}
