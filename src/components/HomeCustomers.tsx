import React from "react";

const multitudeImg =
  require("@site/static/img/customers/multitude.png").default;
const livesportImg =
  require("@site/static/img/customers/livesport.png").default;

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section
      id="customers"
      className="mt-16 md:mt-20 text-center overflow-visible"
    >
      <h2 className="text-xl md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Trusted by the technology leaders, our early adopters
      </h2>

      <div className="flex flex-col mt-3 md:mt-5 gap-y-5 gap-x-5 items-center sm:flex-row overflow-visible">
        <div className="card flex md:h-[450px] flex-col justify-center sm:w-1/2 p-10 gap-2 xl:gap-5 drop-shadow-xl overflow-visible">
          <div className="">
            <img
              src={multitudeImg}
              className="object-contain"
              alt="Multitude"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm md:text-lg xl:text-xl">
              "Wopee autonomous testing is extremely valuable in testing our
              marketing & customer account pages."
            </p>
            <p className="text-sm md:text-lg xl:text-xl">
              Juraj Žabka, Engineering Lead <br />
              <span className="text-secondary-wopee dark:text-primary-wopee">
                Multitude
              </span>
              , European provider of Digital Financial Services 400k+ customers
              in 20 countries
            </p>
          </div>
        </div>

        <div className="card flex md:h-[450px] flex-col justify-center sm:w-1/2 p-10 gap-2 xl:gap-5 drop-shadow-xl overflow-visible">
          <div className="">
            <img
              src={livesportImg}
              className="object-contain"
              alt="Livesport"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm md:text-lg xl:text-xl">
              "Wopee showcased its potential to save us valuable time and effort
              in maintaining the visual integrity of our application."
            </p>
            <p className="text-sm md:text-lg xl:text-xl">
              Martin Šimon, Test Automation Lead <br />
              <span className="text-secondary-wopee dark:text-primary-wopee">
                Livesport
              </span>
              , The fastest sports information and scores provider from 35+
              sports to 100M people worldwide (60+ web and mobile apps)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
