import React from "react";

import Link from "@docusaurus/Link";
import ButtonGhost from "./buttons/ButtonGhost";

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="services">
      <div className="container text-center overflow-visible">
        <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Solutions
        </h2>
        <p className="text-md text-center md:text-center md:text-xl xl:text-2xl">
          Wopee.io increase your efficiency and remove testing waste.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 mt-5 overflow-visible">
          <div className="card flex flex-1 p-10 justify-center drop-shadow-lg overflow-visible">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              Testing Assistant
            </h3>
            <p className="text-sm md:text-lg xl:text-xl">
              Use your existing automated tests and boost its efficiency.
            </p>
            <p className="text-sm md:text-lg xl:text-xl">
              We have simple plug &amp; play solution ready for your existing
              Selenium, Playwright, Cypress.io and Robot Framework testing
              projects. If you use some other tools we are ready to build some
              special assistant also just for you! ❤️
            </p>
            <Link
              to="/book-demo"
              className="max-w-fit self-center"
            >
              <ButtonGhost />
            </Link>
          </div>

          <div className="card flex flex-1 p-10 justify-center drop-shadow-lg overflow-visible">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              Self-driving Bot
            </h3>
            <p className="text-sm md:text-lg xl:text-xl">
              Independent testing bot, no automation required.
            </p>
            <p className="text-sm md:text-lg xl:text-xl">
              Our bots explore your Web App, learn how it works and it is ready
              for testing. Sometimes it is not human to ask humans to test
              (runnnig regression testing ... especially several times a
              week/day, runnig it on many configurations, etc.)
            </p>
            <Link
              to="/book-demo"
              className="max-w-fit self-center"
            >
              <ButtonGhost />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
