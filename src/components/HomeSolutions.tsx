import React from "react";

import Link from "@docusaurus/Link";
import ButtonGhost from "./buttons/ButtonGhost";

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section
      id="solutions"
      className="mt-16 md:mt-20 text-center"
    >
      <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Solutions
      </h2>
      <p className="text-md text-center md:text-center md:text-xl xl:text-2xl">
        Wopee.io increases your efficiency and removes testing waste.
      </p>

      <div className="flex flex-col sm:flex-row gap-5 mt-3 md:mt-5">
        <div className="card flex flex-1 p-5 md:p-10 justify-between gap-5 shadow-lg">
          <div className="flex flex-col gap-5">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              <Link to="/wopee-copilot">
                <span className="flex items-center justify-center gap-1">
                  Visual Testing Copilot <LinkIcon />
                </span>
              </Link>
            </h3>
            <p className="text-sm md:text-lg xl:text-xl">
              Use your existing automated tests and boost its efficiency.
            </p>
            <p className="text-sm md:text-lg xl:text-xl">
              We have simple plug &amp; play solutions ready for your existing
              Selenium, Playwright, Cypress.io and Robot Framework testing
              projects. If you use some other tools, we are also ready to build
              special assistants just for you! ❤️{" "}
              <Link to="/wopee-copilot">
                <small className="opacity-95 inline-flex items-center">
                  Read more..
                </small>
              </Link>
            </p>
          </div>
          <Link
            to="/book-demo"
            className="max-w-fit self-center"
          >
            <ButtonGhost />
          </Link>
        </div>

        <div className="card flex flex-1 p-5 md:p-10 justify-between gap-5 shadow-lg">
          <div className="flex flex-col gap-5">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              <Link to="/wopee-bot">
                <span className="flex items-center justify-center gap-1">
                  Autonomous Testing Bot <LinkIcon />
                </span>
              </Link>
            </h3>
            <p className="text-sm md:text-lg xl:text-xl">
              Independent testing bot, no automation required.
            </p>
            <p className="text-sm md:text-lg xl:text-xl">
              Our bots explore your Web App, learn how it works and it is ready
              for testing. Sometimes it is not human to ask humans to test
              (running regression testing ... especially several times a
              week/day, running it on many configurations, etc.){" "}
              <Link to="/wopee-bot">
                <small className="opacity-95 inline-flex items-center">
                  Read more..
                </small>
              </Link>
            </p>
          </div>
          <Link
            to="/book-demo"
            className="max-w-fit self-center"
          >
            <ButtonGhost />
          </Link>
        </div>
      </div>
    </section>
  );
}
