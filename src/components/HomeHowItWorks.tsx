import React from "react";

const setupImg = require("@site/static/img/how-it-works/setup.png").default;
const modelImg = require("@site/static/img/how-it-works/model.png").default;
const cmdImg = require("@site/static/img/how-it-works/commander.png").default;

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="how-it-works">
      <div className="container text--center">
        <header className="section-header mb-10">
          <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
            How it works
          </h2>
          <p className="text-md text-center md:text-center md:text-xl xl:text-2xl">
            Reduce the test automation complexity and keep its benefits 💪
          </p>
        </header>

        <div className="row mt-5">
          <div className="col col--4 mb-10">
            <div className="flex flex-col gap-y-2">
              <img
                src={setupImg}
                className="hover:scale-95 transition duration-300 h-64 object-contain"
              />
              <div>
                <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
                  1. Set up bot execution
                </h3>
                <p className="text-sm md:text-lg xl:text-xl">
                  Enabling all client's needs for autonomous testing. Easy to
                  use interface.
                </p>
              </div>
            </div>
          </div>

          <div className="col col--4 mb-10">
            <div className="flex flex-col gap-y-2">
              <img
                src={modelImg}
                className="hover:scale-95 transition duration-300 h-64 object-contain"
              />
              <div>
                <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
                  2. Teach bot test
                </h3>
                <p className="text-sm md:text-lg xl:text-xl">
                  Gets more regression testing with same resources.
                  Automatically validates application functionality.
                </p>
              </div>
            </div>
          </div>

          <div className="col col--4 mb-10">
            <div className="flex flex-col gap-y-2">
              <img
                src={cmdImg}
                className="hover:scale-95 transition duration-300 h-64 object-contain"
              />
              <div>
                <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
                  3. Monitor testing results
                </h3>
                <p className="text-sm md:text-lg xl:text-xl">
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
