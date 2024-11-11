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
            formId: "c7892a1b-eccb-4079-88d0-594ce5e036c5",
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
        <div className="flex flex-col items-center my-5 xl:items-start xl:flex-row gap-5">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="w-full xl:w-1/3 py-4">
              <div className="hs-richtext hs-main-font-element">
                {/* <h2>Talk soon:</h2>
                <div
                  className="meetings-iframe-container"
                  data-src="https://meetings-eu1.hubspot.com/jan-beranek?embed=true"
                /> */}
                {/* <p style={{ paddingLeft: "30px" }}><img src="https://139620033.fs1.hubspotusercontent-eu1.net/hubfs/139620033/wopee-io_web-summit-2024_booth-location.png" style={{ height: "auto", maxWidth: "379px", width: "379px" }} alt="wopee-io_web-summit-2024_booth-location" width="379" height="520" loading="lazy" /></p> */}
            </div>
          </div>
          )}
          <div
            className="w-full xl:w-2/3"
          >
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdgxOmZOFYwuOciD8DwFuxg63xrg-JvDHehqdo22qWGe6Z04g/viewform?embedded=true" width="640" height="1464" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
        </div>
        {/* <PartnersCarousel /> */}
        {/* <div className="flex justify-center">
          <img
            alt="qr"
            src="/img/qr-codes/wopee-io-lisbon-qr-code.png"
            className="aspect-square max-w-[420px]"
          />
        </div> */}
      </div>
    </React.Fragment>
  );
}
