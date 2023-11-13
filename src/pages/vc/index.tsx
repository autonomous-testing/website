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
            formId: "d1c941f7-ed8f-4cf2-88ba-4df8a611d5aa",
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
        <script
          type="text/javascript"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        ></script>
      </Helmet>
      <div className="container">
        <GoBack />
        <div className="flex flex-col items-center xl:flex-row gap-5 my-5">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="w-full xl:w-1/3">
              <div id="hubspot-form" />
              <div className="flex justify-center">
                <img
                  alt="qr"
                  src="/img/qr-codes/Random_QR.jpeg"
                  className="aspect-square max-w-[250px]"
                />
              </div>
            </div>
          )}
          <div
            className="meetings-iframe-container w-full xl:w-2/3"
            data-src="https://meetings-eu1.hubspot.com/marcel-veselka?embed=true"
          />
        </div>

        <PartnersCarousel />
      </div>
    </React.Fragment>
  );
}
