import React from "react";

import Link from "@docusaurus/Link";
import PlanComparisonRow from "./PlanComparisonRow";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

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

        <PlanComparisonRow
          feature="Test steps"
          background
          basic="10.000 / month / user"
          premium="100.000 / month / user"
          ultimate="Unlimited"
        />

        <PlanComparisonRow
          feature="Parallel test runs"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Data retention"
          background
          basic="30 days"
          premium="30 days"
          ultimate="Individual"
        />

        <PlanComparisonRow feature="Integrations" />

        <PlanComparisonRow
          feature="Cypress"
          subFeature
          background
          basic="Check"
          premium="Check"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Playwright"
          subFeature
          basic="Check"
          premium="Check"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Robot Framework"
          subFeature
          background
          basic="Check"
          premium="Check"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="WebdriverIO"
          subFeature
          basic="Check"
          premium="Check"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="On-prem testing"
          background
        />

        <PlanComparisonRow
          feature="On-prem testing"
          subFeature
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="CI/CD Integration"
          subFeature
          background
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Videos and traces from testing"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="On-boarding assistance"
          background
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Priority feature development"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Custom feature development"
          background
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Custom integration"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Support"
          background
        />

        <PlanComparisonRow
          feature="Email"
          subFeature
          basic="Check"
          premium="Check"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="GH Discussions"
          subFeature
          background
          basic="Check"
          premium="Check"
          ultimate="Check"
        />

        <PlanComparisonRow
          feature="Workshops"
          subFeature
          ultimate="Check"
        />
      </div>
      <Link to="https://cmd.wopee.io">
        <ButtonGradientOutline className="w-60" />
      </Link>
    </div>
  );
};
export default PlanComparison;
