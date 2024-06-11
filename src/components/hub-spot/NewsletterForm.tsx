import React, { useLayoutEffect } from "react";

export default function NewsletterForm(): JSX.Element {
  useLayoutEffect(() => {
    const script = document.createElement("script");
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "139620033",
          formId: "307c72af-1a09-45b0-90d0-21e73ec2cbc3",
          target: "#newsletter-form-container",
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <React.Fragment></React.Fragment>;
}
