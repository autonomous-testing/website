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
            formId: "875ea269-620c-44ff-844c-c2c43187d84a",
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
        <div className="row flex items-center justify-center my-5 xl:items-start xl:flex-row gap-5">
          <div class="col col--8">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="">
            <h1>Autonomous Testing Workshop:<br/> Core Principle &amp; Hands-On Experience</h1>
            <p></p>
            <p><strong>Workshop Highlights:</strong></p>
            <ul>
            <li><strong>Versatile Principles</strong>: Explore foundational concepts that will extend and enhance your approach to software testing.
            <ul>
            <li><strong>Core Principle of Autonomous Testing</strong>: Understand the fundamental principle behind autonomous testing.</li>
            <li><strong>Visual Regression Testing</strong>: Learn the strengths and limitations of visual regression testing methods.</li>
            </ul>
            </li>
            <li><strong>Autonomous Bot in Action</strong>: Watch as the autonomous bot uncovers critical issues in your app without the need for any scripting.</li>
            <li><strong>Practical Experience</strong>: Participate in hands-on activities to determine where autonomous testing is most effective and when traditional methods are still necessary.</li>
            </ul>
            <p><strong>About Your Guide:</strong></p>
            <ul>
            <li><strong>Jan Honza Beránek</strong>: A seasoned software development and quality assurance professional with extensive experience in boosting efficiency and quality through agile methodologies and innovative solutions.</li>
            </ul>
            <iframe
              src="https://hub.wopee.io/form/ws241001"
              width="100%"
              height="500"
              frameBorder="0"
              scrolling="no"
              style={{ border: "none" }}
            ></iframe>
            </div>
          )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}