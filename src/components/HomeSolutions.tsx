import React from "react";
import Heading from "@theme/Heading";

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="services">
      <div className="container text--center">
        <h2 className="text-3xl font-bold text-[var(--ifm-color-secondary-dark)]">
          Solutions
        </h2>
        <p className="text-xl">
          Our solutions increase your efficiency and remove testing waste
        </p>

        <div className="row mt-5">
          <div className="col col--6 mb-10">
            <div className="card-demo">
              <div className="card shadow-xl p-10">
                <div className="card__header">
                  <h3 className="text-2xl font-bold text-[var(--ifm-color-secondary)] dark:text-[var(--wopee-yellow)]">
                    Testing Assistant
                  </h3>
                </div>
                <div className="card__body">
                  <p className="text-xl">
                    Use your existing automated tests and boost its efficiency.
                  </p>
                  <p className="text-xl">
                    We have simple plug &amp; play solution ready for your
                    existing Selenium, Playwright, Cypress.io and Robot
                    Framework testing projects. If you use some other tools we
                    are ready to build some special assistant also just for you
                    ❤️!
                  </p>
                </div>
                <div className="card__footer mt-5">
                  <a
                    href="/book-demo"
                    className="bg-[var(--ifm-color-secondary)] text-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)] hover:bg-[var(--ifm-color-secondary-lighter)] hover:no-underline text-xl font-bold py-3 px-5 rounded-md"
                  >
                    Book demo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col col--6">
            <div className="card-demo">
              <div className="card shadow-xl p-10">
                <div className="card__header">
                  <h3 className="text-2xl font-bold text-[var(--ifm-color-secondary)] dark:text-[var(--wopee-yellow)]">
                    Self-driving Bot
                  </h3>
                </div>
                <div className="card__body">
                  <p className="text-xl">
                    Independent testing bot, no automation required.
                  </p>
                  <p className="text-xl">
                    Our bots explore your Web App, learn how it works and it is
                    ready for testing. Sometimes it is not human to ask humans
                    to test (runnnig regression testing ... especially several
                    times a week/day, runnig it on many configurations, etc.)
                  </p>
                </div>
                <div className="card__footer mt-5">
                  <a
                    href="/book-demo"
                    className="bg-[var(--ifm-color-secondary)] text-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)] hover:bg-[var(--ifm-color-secondary-lighter)] hover:no-underline text-xl font-bold py-3 px-5 rounded-md"
                  >
                    <span>Book demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
