import React from "react";

const multitudeImg =
  require("@site/static/img/customers/multitude.png").default;
const livesportImg =
  require("@site/static/img/customers/livesport.png").default;

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section
      id="customers"
      className="mt-16 md:mt-20 text-center"
    >
      <h2 className="text-xl md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Join our early adopters
      </h2>
      <p className="text-md text-center md:text-center md:text-xl xl:text-2xl">
        Trusted by the technology leaders, our early customers
      </p>

      <div className="flex flex-col mt-3 md:mt-5 gap-y-5 gap-x-5 items-center sm:flex-row">
        <div className="card flex md:h-[500px] xl:h-[450px] flex-col justify-center sm:w-1/2 p-10 gap-2 xl:gap-5 shadow-xl">
          <div className="">
            <img
              src={multitudeImg}
              className="object-contain"
              alt="Multitude"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm italic md:text-lg xl:text-xl">
              "Wopee autonomous testing is extremely valuable in testing our
              marketing & customer account pages."
            </p>
            <p className="text-xs md:text-sm xl:text-base">
              <span className="text-secondary-wopee dark:text-primary-wopee">
                Multitude
              </span>
              , European provider of Digital Financial Services 400k+ customers
              in 20 countries
            </p>
            <div className="flex">
              <div className="avatar mx-auto">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src="/img/customers/avatars/juraj-multitude.jpeg"
                />
                <div className="avatar__intro text-left">
                  <div className="avatar__name">Juraj Žabka</div>
                  <small className="avatar__subtitle">Engineering Lead</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card flex md:h-[500px] xl:h-[450px] flex-col justify-center sm:w-1/2 p-10 gap-2 xl:gap-5 shadow-xl">
          <div className="">
            <img
              src={livesportImg}
              className="object-contain"
              alt="Livesport"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm italic md:text-lg xl:text-xl">
              "Wopee showcased its potential to save us valuable time and effort
              in maintaining the visual integrity of our application."
            </p>
            <p className="text-xs md:text-sm xl:text-base">
              <span className="text-secondary-wopee dark:text-primary-wopee">
                Livesport
              </span>
              , The fastest sports information and scores provider from 35+
              sports to 100M people worldwide (60+ web and mobile apps)
            </p>
            <div className="avatar mx-auto">
              <img
                className="avatar__photo avatar__photo--xl"
                src="/img/customers/avatars/martin-livesport.jpg"
              />
              <div className="avatar__intro text-left">
                <div className="avatar__name">Martin Šimon</div>
                <small className="avatar__subtitle">Test Automation Lead</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
