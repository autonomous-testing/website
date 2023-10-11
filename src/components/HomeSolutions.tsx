import React from "react";

import Link from "@docusaurus/Link";
import ButtonGhost from "./buttons/ButtonGhost";

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="services">
      <div className="container text--center">
        <h2 className="text-xl text-center md:text-left md:text-2xl xl:text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Solutions
        </h2>
        <p className="text-md text-center md:text-left md:text-xl xl:text-2xl">
          Our solutions increase your efficiency and remove testing waste
        </p>

        <div className="row mt-5">
          <div className="col col--6 mb-10 h-full">
            <div className="card-demo h-[450px]">
              <div className="card shadow-xl p-10 h-full">
                <div className="card__header">
                  <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
                    Testing Assistant
                  </h3>
                </div>
                <div className="card__body">
                  <p className="text-sm md:text-lg xl:text-xl">
                    Use your existing automated tests and boost its efficiency.
                  </p>
                  <p className="text-sm md:text-lg xl:text-xl">
                    We have simple plug &amp; play solution ready for your
                    existing Selenium, Playwright, Cypress.io and Robot
                    Framework testing projects. If you use some other tools we
                    are ready to build some special assistant also just for you
                    ❤️!
                  </p>
                </div>
                <div className="card__footer mt-5">
                  <Link href="/book-demo">
                    <ButtonGhost />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col col--6">
            <div className="card-demo h-[450px]">
              <div className="card shadow-xl p-10 h-full">
                <div className="card__header">
                  <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
                    Self-driving Bot
                  </h3>
                </div>
                <div className="card__body">
                  <p className="text-sm md:text-lg xl:text-xl">
                    Independent testing bot, no automation required.
                  </p>
                  <p className="text-sm md:text-lg xl:text-xl">
                    Our bots explore your Web App, learn how it works and it is
                    ready for testing. Sometimes it is not human to ask humans
                    to test (runnnig regression testing ... especially several
                    times a week/day, runnig it on many configurations, etc.)
                  </p>
                </div>
                <div className="card__footer mt-5">
                  <Link href="/book-demo">
                    <ButtonGhost />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
