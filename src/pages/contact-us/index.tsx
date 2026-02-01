import React, { useLayoutEffect, useState } from "react";
import Head from "@docusaurus/Head";

import GoBack from "@site/src/components/demo/GoBack";
import Loader from "@site/src/components/demo/Loader";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [isLoading, setIsLoading] = useState(true);
  const siteUrl = siteConfig.url ?? "https://website.wopee.io";
  const baseUrl = new URL(siteConfig.baseUrl ?? "/", siteUrl).toString();
  const pageUrl = new URL("contact-us/", baseUrl).toString();
  const title = `Contact Us - ${siteConfig.title}`;
  const description = "Talk to the Wopee.io team about autonomous testing.";
  const socialImage = new URL("img/wopee-social-card.jpg", baseUrl).toString();

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
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
      </Head>
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
