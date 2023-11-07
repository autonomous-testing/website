import React from "react";

import Link from "@docusaurus/Link";
import PlanItem, { PlanItems } from "./PlanItem";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

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
    </main>
  );
}
