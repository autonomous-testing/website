import React from "react";
import Icon from "@mdi/react";
import { mdiConnection, mdiRobotOutline } from "@mdi/js";

import Link from "@docusaurus/Link";

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
      className="mt-16 md:mt-20"
    >
      <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Solution: Autonomous testing
      </h2>

      <div className="flex flex-col sm:flex-row gap-5 mt-3 md:mt-5">
        <div className="card flex flex-1 p-5 md:p-10 justify-between gap-5 shadow-lg">
          <div className="flex flex-col justify-between h-full gap-2">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              <Link to="/bot">
                <span className="flex items-center justify-center gap-1">
                  Bot <LinkIcon />
                </span>
              </Link>
            </h3>
            <p className="text-sm md:text-lg xl:text-xl text-center">
              Just provide a url of your web app and let our bot do the rest!
            </p>
            <div className="flex justify-center items-center">
              <Link
                to="/bot"
                className="group"
              >
                <Icon
                  size={6}
                  path={mdiRobotOutline}
                  className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
                />
              </Link>
              <ol className="text-sm md:text-lg xl:text-xl mx-auto">
                <li>
                  Bot will <strong>learn</strong> your web application.
                </li>
                <li>
                  Bot will <strong>generate</strong> test scenarios.
                </li>
                <li>
                  Bot will <strong>execute</strong> tests.
                </li>
                <li>
                  Wopee.io will <strong>identify</strong> unexpected, potential
                  bugs.
                </li>
              </ol>
            </div>

            <p className="text-sm md:text-lg xl:text-xl text-center">
              It is just that simple!
              <Link
                to="/bot"
                className="ml-2"
              >
                Read more..
              </Link>
            </p>
          </div>
        </div>

        <div className="card flex flex-1 p-5 md:p-10 justify-between gap-5 shadow-lg">
          <div className="flex flex-col justify-between h-full gap-2">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              <Link to="/integrations">
                <span className="flex items-center justify-center gap-1">
                  Integrations
                  <LinkIcon />
                </span>
              </Link>
            </h3>
            <p className="text-sm md:text-lg xl:text-xl text-center">
              Already have automated tests? <br />
              <span className="text-xs md:text-sm opacity-80 ">
                Cypress.io | Playwright | Robot Framework | WebDriverIO |
                Selenium
              </span>
            </p>
            <div className="flex justify-center items-center">
              <Link
                to="/integrations"
                className="group"
              >
                <Icon
                  size={6}
                  path={mdiConnection}
                  className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
                />
              </Link>

              <ol className="text-sm md:text-lg xl:text-xl">
                <li>Keep your existing tests as they are.</li>
                <li>Add a single library & apply a simple configuration.</li>
                <li>Run your tests as you usually do.</li>
                <li>
                  Wopee.io will <strong>identify</strong> unexpected, potential
                  bugs.
                </li>
              </ol>
            </div>
            <p className="text-sm md:text-lg xl:text-xl text-center">
              Enable our integrations.
              <Link
                to="/integrations"
                className="ml-2"
              >
                Read more..
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
