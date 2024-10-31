import React from "react";

import PlanComparison from "./PlanComparison";
import PlanItem, { PlanItems } from "./PlanItem";
import Link from "@docusaurus/Link";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

export default function Pricing(): JSX.Element {
  return (
    <main className="my-16 text-center">
      <h2 className="text-3xl text-center md:text-center xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Pricing
      </h2>

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col sm:flex-wrap items-center sm:flex-row xl:flex-nowrap mt-10 md:mt-10 justify-center gap-5 sm:gap-7">
          {PlanItems.map((props, idx) => (
            <PlanItem
              key={idx}
              {...props}
            />
          ))}
        </div>

        <div className="card p-5 shadow-[0_0_10px_0] shadow-secondary-wopee dark:shadow-primary-wopee gap-5 flex-row items-center">
          <img
            src="/img/subscription-plans/enterprise.png"
            alt="enterprise-plan-card"
            className="aspect-square object-contain h-[300px]"
          />

          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
                Enterprise
              </h3>
              <h4 className="text-md xl:text-xl font-bold">Individual</h4>
              <small className="text-md md:text-lg">
                <span>
                  unlimited test steps
                  <br />
                </span>
                <span>
                  on-premise bots
                  <br />
                </span>
              </small>
            </div>

            <Link to="/book-demo">
              <ButtonGradientOutline
                className="w-60"
                label="Talk to founders"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="my-5">
        <PlanComparison />
      </div>
    </main>
  );
}
