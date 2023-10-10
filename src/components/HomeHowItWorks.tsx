import React from "react";

const setupImg = require("@site/static/img/how-it-works/setup.png").default;
const modelImg = require("@site/static/img/how-it-works/model.png").default;
const cmdImg = require("@site/static/img/how-it-works/commander.png").default;

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="how-it-works">
      <div className="container text--center">
        <header className="section-header mb-10">
          <h2 className="text-3xl font-bold text-[var(--ifm-color-secondary-dark)]">
            How it works
          </h2>
          <p className="text-xl">
            Reduce the test automation complexity and keep its benefits 💪
          </p>
        </header>

        <div className="row mt-5">
          <div className="col col--4 mb-10">
            <div className="flex flex-col justify-between h-full">
              <img
                src={setupImg}
                className="hover:scale-95 transition duration-300"
              />
              <div>
                <h3 className="text-2xl text-[var(--ifm-color-secondary-dark)]">
                  1. Set up bot execution
                </h3>
                <p className="text-xl">
                  Enabling all client's needs for autonomous testing. Easy to
                  use interface.
                </p>
              </div>
            </div>
          </div>

          <div className="col col--4 mb-10">
            <div className="flex flex-col justify-between h-full">
              <img
                src={modelImg}
                className="hover:scale-95 transition duration-300"
              />
              <div>
                <h3 className="text-2xl text-[var(--ifm-color-secondary-dark)]">
                  2. Teach bot test
                </h3>
                <p className="text-xl">
                  Gets more regression testing with same resources.
                  Automatically validates application functionality.
                </p>
              </div>
            </div>
          </div>

          <div className="col col--4 mb-10">
            <div className="flex flex-col justify-between h-full">
              <img
                src={cmdImg}
                className="hover:scale-95 transition duration-300"
              />
              <div>
                <h3 className="text-2xl text-[var(--ifm-color-secondary-dark)]">
                  3. Monitor testing results
                </h3>
                <p className="text-xl">
                  Finds most relevant bugs always and quickly. No scripting
                  required and mild learning curve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
