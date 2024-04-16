import React from "react";

import Link from "@docusaurus/Link";
import ButtonGhost from "./buttons/ButtonGhost";
import Icon from '@mdi/react';
import { mdiRobotOutline } from '@mdi/js';
import { mdiFileCodeOutline } from '@mdi/js';

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
          <div className="flex flex-col gap-5">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              <Link to="/bot">
                <span className="flex items-center justify-center gap-1">
                  Bot <LinkIcon />
                </span>
              </Link>
            </h3>
            <p className="text-sm md:text-lg xl:text-xl text-center">
              Provide just url of your Web App. Let the bot do the rest.
            </p>
            <div className="flex justify-center">
              <Icon path={mdiRobotOutline} size={8} />
            </div>
            <ol className="text-sm md:text-lg xl:text-xl">
              <li>Bot will <strong>learn</strong> your Web App.</li>
              <li>Bot will <strong>generate</strong> the test scenarios.</li>
              <li>Bot will <strong>execute</strong> the tests.</li>
              <li>Wopee.io will <strong>identify</strong> an unexpected stuff.</li>
            </ol>
            <p className="text-sm md:text-lg xl:text-xl text-center">
              That simple it is.&nbsp;&nbsp;
              <Link to="/bot">
                  Read more..
              </Link>
            </p>
          </div>
        </div>

        <div className="card flex flex-1 p-5 md:p-10 justify-between gap-5 shadow-lg">
          <div className="flex flex-col gap-5">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              <Link to="/integrations">
                <span className="flex items-center justify-center gap-1">
                  Integrations<LinkIcon />
                </span>
              </Link>
            </h3>
            <p className="text-sm md:text-lg xl:text-xl text-center">
              Already have automated tests? <br/>
              Cypress.io / Playwright / Robot&nbsp;Framework / WebDriverIO / Selenium?
            </p>
            <div className="flex justify-center">
              <Icon path={mdiFileCodeOutline} size={8} />
            </div>
            <ol className="text-sm md:text-lg xl:text-xl">
              <li>Keep your existing tests as they are.</li>
              <li>Add single library & simple config.</li>
              <li>Run your tests as you do.</li>
              <li>Wopee.io will <strong>identify</strong> an unexpected stuff.</li>
            </ol>
            <p className="text-sm md:text-lg xl:text-xl text-center">
              Enable the integration.&nbsp;&nbsp;
              <Link to="/integrations">
                  Read more..
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
