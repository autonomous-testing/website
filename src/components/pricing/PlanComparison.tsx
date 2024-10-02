import React from "react";

import Link from "@docusaurus/Link";
import PlanComparisonRow, { PlanComparisonRowProps } from "./PlanComparisonRow";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

const planFeatureArray: PlanComparisonRowProps[] = [
  {
    feature: "Test steps",
    basic: "10.000 / month / user",
    premium: "100.000 / month / user",
    ultimate: "Unlimited",
  },
  {
    feature: "Parallel test runs",
    ultimate: "Check",
  },
  {
    feature: "Data retention",
    basic: "30 days",
    premium: "30 days",
    ultimate: "Individual",
  },
  {
    feature: "Integrations / Visual Testing",
  },
  {
    feature: "Cypress",
    subFeature: true,
    basic: "Check",
    premium: "Check",
    ultimate: "Check",
  },
  {
    feature: "Playwright",
    subFeature: true,
    basic: "Check",
    premium: "Check",
    ultimate: "Check",
  },
  {
    feature: "Robot Framework",
    subFeature: true,
    basic: "Check",
    premium: "Check",
    ultimate: "Check",
  },
  {
    feature: "WebdriverIO",
    subFeature: true,
    basic: "Check",
    premium: "Check",
    ultimate: "Check",
  },
  {
    feature: "On-prem testing",
  },
  {
    feature: "On-prem testing",
    subFeature: true,
    ultimate: "Check",
  },
  {
    feature: "CI/CD Integration",
    subFeature: true,
    ultimate: "Check",
  },
  {
    feature: "Videos and traces from testing",
    ultimate: "Check",
  },
  {
    feature: "On-boarding assistance",
    ultimate: "Check",
  },
  {
    feature: "Priority feature development",
    ultimate: "Check",
  },
  {
    feature: "Custom feature development",
    ultimate: "Check",
  },
  {
    feature: "Custom integration",
    ultimate: "Check",
  },
  {
    feature: "Support",
  },
  {
    feature: "Email",
    subFeature: true,
    basic: "Check",
    premium: "Check",
    ultimate: "Check",
  },
  {
    feature: "GH Discussions",
    subFeature: true,
    basic: "Check",
    premium: "Check",
    ultimate: "Check",
  },
  {
    feature: "Workshops",
    subFeature: true,
    ultimate: "Check",
  },
];

const PlanComparison = () => {
  return (
    <div className="my-16 hidden sm:block">
      <h4 className="text-2xl text-center md:text-center xl:text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Plan comparison
      </h4>

      <div className="grid grid-cols-4 mb-5">
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img
              src="/img/pricing/premium.png"
              alt="Basic plan"
            />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Basic
          </h5>
        </div>
        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img
              src="/img/pricing/ultimate.png"
              alt="Premium plan"
            />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Premium
          </h5>
        </div>
        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img
              src="/img/pricing/addons.png"
              alt="Ultimate plan"
            />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Ultimate
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
