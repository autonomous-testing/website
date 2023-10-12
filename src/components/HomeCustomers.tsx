import React from "react";

const multitudeImg =
  require("@site/static/img/customers/multitude.png").default;
const livesportImg =
  require("@site/static/img/customers/livesport.png").default;

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="customers">
      <div className="container text--center">
        <header className="section-header mb-10">
          <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Trusted by the technology leaders, our early adopters
          </h2>
        </header>

        <div className="flex flex-col items-center xl:flex-row gap-5">
          <div className="card h-[500px] col col--6 p-10 drop-shadow-xl">
            <div className="w-full h-full">
              <img
                src={multitudeImg}
                className="object-contain h-44 w-full"
              />
            </div>
            <div className="card__body">
              <div className="flex flex-col gap-5 mt-5">
                <p className="text-sm md:text-lg xl:text-xl">
                  "Wopee autonomous testing is extremely valuable in testing our
                  marketing & customer account pages."
                </p>
                <p className="text-sm md:text-lg xl:text-xl">
                  Juraj Žabka, Engineering Lead <br />
                  <span className="text-secondary-wopee dark:text-primary-wopee">Multitude</span>, European provider of
                  Digital Financial Services 400k+ customers in 20 countries
                </p>
              </div>
            </div>
          </div>

          <div className="card h-[500px] col col--6 p-10 drop-shadow-xl">
            <div className="w-full h-full">
              <img
                src={livesportImg}
                className="object-contain h-44 w-full"
              />
            </div>
            <div className="card__body">
              <div className="flex flex-col gap-5 mt-5">
                <p className="text-sm md:text-lg xl:text-xl">
                  "Wopee showcased its potential to save us valuable time and
                  effort in maintaining the visual integrity of our application."
                </p>
                <p className="text-sm md:text-lg xl:text-xl">
                  Martin Šimon, Test Automation Lead <br />
                  <span className="text-secondary-wopee dark:text-primary-wopee">Livesport</span>, The fastest
                  sports information and scores provider from 35+ sports to 100M
                  people worldwide (60+ web and mobile apps)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
