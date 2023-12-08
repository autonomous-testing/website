import React from "react";

import Link from "@docusaurus/Link";
import PlanItem, { PlanItems } from "./PlanItem";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";
import PlanComparison from "./PlanComparison";

export const freePlanCardItems = {
  title: "Free Plan",
  img: require("@site/static/img/pricing/free.png").default,
  features: [
    "1 project",
    "1 users",
    "1.000 test steps",
    "1 shared bot",
    "7 days data retention",
  ],
};

export default function Pricing(): JSX.Element {
  return (
    <main className="my-16 text-center overflow-visible">
      <h2 className="text-3xl text-center md:text-center xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Pricing
      </h2>

      <div className="flex flex-col sm:flex-wrap items-center sm:flex-row xl:flex-nowrap mt-10 md:mt-10 justify-center gap-5 sm:gap-7 overflow-visible">
        {PlanItems.map((props, idx) => (
          <PlanItem
            key={idx}
            {...props}
          />
        ))}
      </div>

      <div className="mt-10">
        <Link to="https://cmd.wopee.io">
          <ButtonGradientOutline className="w-52" />
        </Link>
      </div>

      <div className="my-10 flex flex-col gap-3 items-center">
        <div className="card flex sm:flex-row max-w-5xl sm:min-w-[800px] items-center sm:justify-between gap-5 p-10 drop-shadow-xl sm:hover:scale-105 transition duration-300">
          <figure className="text-7xl m-0 w-1/3">🚀</figure>

          <div className="sm:w-1/3">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              Enterprise
            </h3>
            <p>Our "all-you-can-eat" plan</p>
            <p>Special services for our</p>
            <p>special customers.</p>
          </div>

          <Link to="/contact-us">
            <ButtonGradientOutline
              className="w-52"
              label="Contact us"
            />
          </Link>
        </div>

        <div className="card flex sm:flex-row max-w-5xl sm:min-w-[800px] items-center sm:justify-between gap-5 p-10 drop-shadow-xl sm:hover:scale-105 transition duration-300">
          <div className="w-[200px] sm:w-1/3">
            <img
              src={freePlanCardItems.img}
              alt={freePlanCardItems.title}
            />
          </div>

          <div className="sm:w-1/3">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
              Free
            </h3>
            {freePlanCardItems.features.map((feature, idx) => (
              <p key={idx}>{feature}</p>
            ))}
          </div>

          <Link to="https://cmd.wopee.io">
            <ButtonGradientOutline className="w-52" />
          </Link>
        </div>

        <PlanComparison />
      </div>
    </main>
  );
}
