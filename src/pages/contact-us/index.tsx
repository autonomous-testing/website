import { Helmet } from "react-helmet";
import React, { useLayoutEffect, useState } from "react";

import GoBack from "@site/src/components/demo/GoBack";
import Loader from "@site/src/components/demo/Loader";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import PartnersCarousel from "@site/src/components/demo/PartnersCarousel";

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
            formId: "8c06efef-8e6a-4526-899c-1e2f42ab1f62",
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
        <title>{siteConfig.title}</title>
        <meta
          name="description"
          content="Autonomous testing platform for web applications | Wopee.io"
        />
      </Helmet>
      <div className="container">
        <GoBack />
        <div className="flex flex-col rounded-md items-center justify-center my-5 xl:items-start xl:flex-row gap-5">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="w-full xl:w-1/3 py-4">
              <div id="hubspot-form" />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
