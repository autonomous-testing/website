import React from "react";

import Link from "@docusaurus/Link";
import ButtonGhost from "./buttons/ButtonGhost";

const aboutImg = require("@site/static/img/about.jpg").default;

export default function HomepageAbout(): JSX.Element {
  return (
    <section
      id="about"
      className="mt-5 md:mt-10 overflow-visible"
    >
      <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee mb-3">
        What's the problem
      </h2>

      <div className="card flex flex-col lg:flex-row drop-shadow-xl">
        <div className="flex-1">
          <img
            src={aboutImg}
            title="group of engineers"
            alt="engineers brainstorming"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col flex-1 justify-between gap-5 p-5 md:p-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm md:text-base xl:text-xl">
              Traditional testing approaches are slowing down development and
              are no longer scalable. Testers / executives believed that test
              automation was the solution. This belief failed.
            </p>
            <p className="text-sm md:text-base xl:text-xl">
              Almost everywhere these days test automation tools are utilised,
              but this testing approach is still too slow and requires strong
              technical skills that are hard to find and develop. Even if you do
              succeed in automating our testing, you are then facing with
              exhausting maintenance eache release.
            </p>

            <h4 className="text-sm md:text-base xl:text-xl font-bold text-secondary-wopee dark:text-primary-wopee">
              Here comes the autonomous testing bots to reduce this effort waste
              in software development and testing.
            </h4>
          </div>

          <Link
            to="/book-demo"
            className="self-center max-w-fit"
          >
            <ButtonGhost />
          </Link>
        </div>
      </div>
    </section>
  );
}
