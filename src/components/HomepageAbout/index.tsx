import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

const aboutImg = require("@site/static/img/about.jpg").default;

export default function HomepageAbout(): JSX.Element {
  return (
    <section id="about">
      <div className="container">
        <Heading as="h2">What we do</Heading>
        <div className="card-demo">
          <div className="card">
            <div className="row">
              <div className="col col--6">
                <div className="card__image">
                  <img
                    src={aboutImg}
                    alt="Image alt text"
                    title="Logo Title Text 1"
                  />
                </div>
              </div>

              <div className="col col--6">
                <div className="card__body">
                  <h4>
                    We are building bots to reduce waste in software development
                    and testing.
                  </h4>
                  <p>
                    Traditional testing approaches are slowing down development
                    and are no longer scalable. We believed that test automation
                    was the solution. This belief failed.
                  </p>
                  <p>
                    Almost everywhere these days we test using test automation
                    tools, but this testing approach is still too slow and
                    requires strong technical skills that are hard to find and
                    develop. Even if we do succeed in automating our testing, we
                    are then faced with exhausting maintenance. The Quaco Head
                    Lighthouse is a well maintained lighthouse close to St.
                    Martins. It is a short, beautiful walk to the lighthouse
                    along the seashore.
                  </p>
                  <p className="text--center">
                    <Link
                      className="button button--primary button--lg"
                      to="/book-demo"
                    >
                      Book demo
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
