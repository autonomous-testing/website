import React, { useLayoutEffect } from "react";

type NewsletterFormProps = {
  formId?: string;
  target?: string;
};

export default function NewsletterForm({
  formId = "307c72af-1a09-45b0-90d0-21e73ec2cbc3",
  target = "#newsletter-form-container",
}: NewsletterFormProps = {}): JSX.Element {
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
          formId,
          target,
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [formId, target]);

  return <React.Fragment></React.Fragment>;
}
