import React from "react";

import PlanComparison from "./PlanComparison";
import PlanItem, { PlanItems } from "./PlanItem";

export default function Pricing(): JSX.Element {
  return (
    <main className="my-16 text-center">
      <h2 className="text-3xl text-center md:text-center xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Pricing
      </h2>

      <div className="flex flex-col sm:flex-wrap items-center sm:flex-row xl:flex-nowrap mt-10 md:mt-10 justify-center gap-5 sm:gap-7">
        {PlanItems.map((props, idx) => (
          <PlanItem
            key={idx}
            {...props}
          />
        ))}
      </div>

      <div className="my-5">
        <PlanComparison />
      </div>
    </main>
  );
}
