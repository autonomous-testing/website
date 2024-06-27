import React from "react";

import Link from "@docusaurus/Link";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

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
            <img src="/img/pricing/premium.png" alt="Basic plan" />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Basic
          </h5>
        </div>
        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img src="/img/pricing/ultimate.png" alt="Premium plan" />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Premium
          </h5>
        </div>
        <div className="col-span-1">
          <div className="aspect-square flex justify-center items-center">
            <img src="/img/pricing/addons.png" alt="Ultimate plan" />
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Ultimate
          </h5>
        </div>

        <div className="col-span-4 grid grid-cols-4 text-sm py-1 items-center rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="text-left text-sm font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Test steps
          </h5>
          <p>10.000 / month</p>
          <p>100.000 / month</p>
          <p>Unlimited</p>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Integrations
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20  bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Cypress
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Playwright
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20  bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Robot Framework
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            WebdriverIO
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            On-prem testing
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            On-prem testing
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            CI/CD Integration
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Videos and traces from testing
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            On-boarding assistance
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Priority feature development
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Custom feature development
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Custom integration
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Support
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Email
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            GH Discussions
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-4 grid grid-cols-4 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7">
            Workshops
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>
      </div>
      <Link to="https://cmd.wopee.io">
        <ButtonGradientOutline className="w-60" />
      </Link>
    </div>
  );
};
export default PlanComparison;
