import React from "react";

const setupImg = require("@site/static/img/how-it-works/setup.png").default;
const modelImg = require("@site/static/img/how-it-works/model.png").default;
const cmdImg = require("@site/static/img/how-it-works/commander.png").default;

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section
      id="how-it-works"
      className="mt-16 md:mt-20 text-center"
    >
      <h2 className="text-xl md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        How it works
      </h2>
      <p className="text-md md:text-xl xl:text-2xl">
        Reduce test automation complexity and keep its benefits 💪
      </p>

      <div className="flex flex-col items-center gap-y-5 lg:flex-row mt-3 md:mt-5">
        <div className="flex flex-col items-center lg:w-1/3">
          <div className="hover:scale-95 transition duration-300  w-[220px]">
            <img
              src={setupImg}
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              1. Set up bot execution
            </h3>
            <p className="text-sm md:text-base xl:text-xl">
              Enabling all client's needs for autonomous testing. Easy to use
              interface.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center lg:w-1/3">
          <div className="hover:scale-95 transition duration-300  w-[220px]">
            <img
              src={modelImg}
              className=" object-contain"
            />
          </div>

          <div>
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              2. Teach bot test
            </h3>
            <p className="text-sm md:text-base xl:text-xl">
              Gets more regression testing with same resources. Automatically
              validates application functionality.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center lg:w-1/3">
          <div className="hover:scale-95 transition duration-300  w-[220px]">
            <img
              src={cmdImg}
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              3. Monitor testing results
            </h3>
            <p className="text-sm md:text-base xl:text-xl">
              Finds most relevant bugs always and quickly. No scripting required
              and mild learning curve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
