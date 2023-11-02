import React from "react";
import { Helmet } from "react-helmet";

import { useHistory } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

export default function Home(): JSX.Element {
  const router = useHistory();
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
        <div
          onClick={() => router.goBack()}
          className="flex items-center gap-1 mt-10 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>Go Back</span>
        </div>
        <div
          className="meetings-iframe-container"
          data-src="https://meetings-eu1.hubspot.com/marcel-veselka?embed=true"
        ></div>
        <div>
          <h3 className="text-center opacity-70">Trusted by our partners</h3>
          <div className="flex justify-center gap-5 mt-10">
            <Link to="https://www.livesport.eu/en">
              <img
                src="/img/customers/livesport-logo.png"
                alt="livesport logo"
                className="grayscale dark:invert"
              />
            </Link>
            <Link to="https://www.multitude.com/">
              <img
                src="/img/customers/multitude-logo.png"
                alt="multitude logo"
                className="grayscale dark:invert"
              />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
