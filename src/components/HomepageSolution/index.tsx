import React from "react";
import Heading from "@theme/Heading";

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="services">
      <div className="container text--center">
        <Heading as="h2">Solutions</Heading>
        <p>Our solutions increase your efficiency and remove testing waste</p>

        <div className="row">
          <div className="col col--6">
            <div className="card-demo">
              <div className="card shadow--tl">
                <div className="card__header">
                  <h3>Testing Assistant</h3>
                </div>
                <div className="card__body">
                  <p>
                    Use your existing automated tests and boost its efficiency.
                  </p>
                  <p>
                    We have simple plug &amp; play solution ready for your
                    existing Selenium, Playwright, Cypress.io and Robot
                    Framework testing projects. If you use some other tools we
                    are ready to build some special assistant also just for you
                    ❤️!
                  </p>
                </div>
                <div className="card__footer">
                  <a
                    href="/book-demo"
                    className="button button--primary button--lg"
                  >
                    <span>Book demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col col--6">
            <div className="card-demo">
              <div className="card shadow--tl">
                <div className="card__header">
                  <h3>Self-driving Bot</h3>
                </div>
                <div className="card__body">
                  <p>Independent testing bot, no automation required.</p>
                  <p>
                    Our bots explore your Web App, learn how it works and it is
                    ready for testing. Sometimes it is not human to ask humans
                    to test (runnnig regression testing ... especially several
                    times a week/day, runnig it on many configurations, etc.)
                  </p>
                </div>
                <div className="card__footer">
                  <a
                    href="/book-demo"
                    className="button button--primary button--lg"
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
