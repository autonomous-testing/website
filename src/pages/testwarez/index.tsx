import React, { useLayoutEffect } from "react";

import Layout from "@theme/Layout";

const TestWarez = () => {
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
            formId: "934d4de3-0bcf-45d5-8590-d8c31e861c8d",
            target: "#hubspot-form",
          });
        }
      }, 100);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout wrapperClassName="dark:bg-gray-100">
      <div className="container">
        <div
          id="hubspot-form"
          className="my-5"
        />
      </div>
    </Layout>
  );
};
export default TestWarez;
