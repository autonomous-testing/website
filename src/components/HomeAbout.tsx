import React from "react";

import Link from "@docusaurus/Link";

const aboutImg = require("@site/static/img/about.jpg").default;

export default function HomepageAbout(): JSX.Element {
  return (
    <section
      id="about"
      className="mt-10"
    >
      <div className="container">
        <h2 className="text-3xl font-bold text-[var(--ifm-color-secondary-dark)] mb-2">
          What we do
        </h2>
        <div className="card-demo">
          <div className="card shadow-xl ">
            <div className="row">
              <div className="col col--6 ">
                <div className="w-full h-full">
                  <img
                    src={aboutImg}
                    alt="Image alt text"
                    title="Logo Title Text 1"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="col col--6">
                <div className="card__body flex flex-col h-full justify-center gap-7 p-10">
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xl font-bold text-[var(--ifm-color-secondary-dark)]">
                      We are building bots to reduce waste in software
                      development and testing.
                    </h4>

                    <p className="text-xl">
                      Traditional testing approaches are slowing down
                      development and are no longer scalable. We believed that
                      test automation was the solution. This belief failed.
                    </p>
                    <p className="text-xl">
                      Almost everywhere these days we test using test automation
                      tools, but this testing approach is still too slow and
                      requires strong technical skills that are hard to find and
                      develop. Even if we do succeed in automating our testing,
                      we are then faced with exhausting maintenance. The Quaco
                      Head Lighthouse is a well maintained lighthouse close to
                      St. Martins. It is a short, beautiful walk to the
                      lighthouse along the seashore.
                    </p>
                  </div>
                  <p className="text--center">
                    <Link
                      className="bg-[var(--ifm-color-secondary)] text-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)] hover:bg-[var(--ifm-color-secondary-lighter)] hover:no-underline text-xl font-bold py-3 px-5 rounded-md"
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
