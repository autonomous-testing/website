import React from "react";

import Link from "@docusaurus/Link";
import PlanComparisonRow, { PlanComparisonRowProps } from "./PlanComparisonRow";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

const planFeatureArray: PlanComparisonRowProps[] = [
  {
    feature: "Test steps",
    starter: "1.000 / project / month / user",
    basic: "10.000 / month / user",
    premium: "100.000 / month / user",
    enterprise: "Unlimited",
  },
  {
    feature: "Data retention",
    starter: "30 days",
    basic: "30 days",
    premium: "30 days",
    enterprise: "Individual",
  },
  {
    feature: "Autonomous Testing",
    basic: "Check",
    premium: "Check",
    enterprise: "Check",
  },
  {
    feature: "Testing Bot",
    subFeature: true,
    basic: "gen 2.0",
    premium: "gen 2.0",
    enterprise: "gen 3.0 (preview)",
  },
  {
    feature: "Videos and traces from testing",
    subFeature: true,
    enterprise: "Check",
  },
  {
    feature: "Playwright Integration",
    subFeature: true,
    enterprise: "Early access",
  },
  {
    feature: "Parallel test runs",
    subFeature: true,
    enterprise: "Check",
  },
  {
    feature: "Visual Testing (VT)",
  },
  {
    feature: "Cypress",
    subFeature: true,
    starter: "Check",
    basic: "Check",
    premium: "Check",
    enterprise: "Check",
  },
  {
    feature: "Playwright",
    subFeature: true,
    starter: "Check",
    basic: "Check",
    premium: "Check",
    enterprise: "Check",
  },
  {
    feature: "Robot Framework",
    subFeature: true,
    starter: "Check",
    basic: "Check",
    premium: "Check",
    enterprise: "Check",
  },
  {
    feature: "WebdriverIO",
    subFeature: true,
    starter: "Check",
    basic: "Check",
    premium: "Check",
    enterprise: "Check",
  },
  {
    feature: "On-prem testing",
  },
  {
    feature: "On-prem testing",
    subFeature: true,
    enterprise: "Check",
  },
  {
    feature: "CI/CD Integration",
    subFeature: true,
    starter: "VT only",
    basic: "VT only",
    premium: "VT only",
    enterprise: "Check",
  },
  {
    feature: "On-boarding assistance",
    basic: "Check",
    premium: "Check",
    enterprise: "Check",
  },
  {
    feature: "Customizations & Integrations",
    enterprise: "Check",
  },
  {
    feature: "Support",
  },
  {
    feature: "Email",
    subFeature: true,
    starter: "Check",
    basic: "Check",
    premium: "Check",
    enterprise: "Check",
  },
  {
    feature: "GH Discussions",
    subFeature: true,
    starter: "Check",
    basic: "Check",
    premium: "Check",
    enterprise: "Check",
  },
  {
    feature: "Individual support",
    subFeature: true,
    premium: "Check",
    enterprise: "Check",
  },
];

const PlanComparison = () => {
  return (
    <div className="my-16 hidden sm:block">
      <h4 className="text-2xl text-center md:text-center xl:text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Plan comparison
      </h4>

      <div className="grid grid-cols-5 mb-5">
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img src="/img/subscription-plans/starter.png" alt="Starter plan" />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Starter
          </h5>
        </div>

        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img src="/img/subscription-plans/basic.png" alt="Basic plan" />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Basic
          </h5>
        </div>

        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img src="/img/subscription-plans/premium.png" alt="Premium plan" />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Premium
          </h5>
        </div>

        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img
              src="/img/subscription-plans/enterprise.png"
              alt="Enterprise plan"
            />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Enterprise
          </h5>
        </div>

        {planFeatureArray.map((props, idx) => (
          <PlanComparisonRow
            key={idx}
            background={!!((idx + 1) % 2)}
            {...props}
          />
        ))}
      </div>
      <Link to="https://cmd.wopee.io">
        <ButtonGradientOutline className="w-60" />
      </Link>
    </div>
  );
};
export default PlanComparison;
