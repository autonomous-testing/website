import { Helmet } from "react-helmet";
import React, { useLayoutEffect, useState } from "react";

import GoBack from "@site/src/components/demo/GoBack";
import Loader from "@site/src/components/demo/Loader";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const script = document.createElement("script");
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      setTimeout(() => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: "eu1",
            portalId: "139620033",
            formId: "1d789355-1d8a-4344-8f40-db75206a41f6",
            target: "#hubspot-form",
          });
        }
        setIsLoading(false);
      }, 100);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Workshops - {siteConfig.title} - AI Testing Agents</title>
        <meta
          name="description"
          content="Workshops - Autonomous testing platform for web applications | Wopee.io - AI Testing Agents"
        />
        <script
          type="text/javascript"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        ></script>
      </Helmet>

      <div className="flex flex-col items-center gap-10 my-32">
        <section className="text-balance">
          <h1 className="font-bold text-center text-5xl sm:text-5xl md:text-6xl">
            AI Testing Agents Workshops
          </h1>
          <h2 className="text-secondary-wopee dark:text-primary-wopee text-center text-3xl sm:text-3xl md:text-4xl ">
            Join waitlist for upcoming workshops.
          </h2>
        </section>
        <section>
          <p>
            Meet us in person and learn how to use AI Testing Agents to automate
            your testing.
          </p>
          <ul>
            <li>Test Automation Days, Rotterdam</li>
            <li>expo:QA, Madrid</li>
            <li>SW Quality Days, Munich</li>
          </ul>
        </section>
        <section>
          <p>Online workshops are available on request.</p>
        </section>
      </div>
      <div className="container">
        <div className="flex items-center justify-center my-5 xl:items-start xl:flex-row gap-5">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="w-full xl:w-1/2 py-4">
              <div id="hubspot-form" />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
