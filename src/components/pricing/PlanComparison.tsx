import React from "react";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";
import Link from "@docusaurus/Link";

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

      <div className="grid grid-cols-5 mb-5">
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
        <div className="col-span-1">
          <div
            className="aspect-square flex justify-center items-center
              "
          >
            <figure className="text-7xl m-0">🚀</figure>
          </div>
          <h5 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            Enterprise
          </h5>
        </div>

        <div className="col-span-5 grid grid-cols-5 text-sm py-1 items-center rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-10 dark:bg-primary-wopee dark:bg-opacity-10">
          <h5 className="text-left text-sm font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Projects
          </h5>
          <p>1</p>
          <p>3</p>
          <p>Unlimited</p>
          <p>Unlimited</p>
        </div>

        <div className="col-span-5 grid grid-cols-5 text-sm py-1 items-center rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Users
          </h5>
          <p>3</p>
          <p>5</p>
          <p>Unlimited</p>
          <p>Unlimited</p>
        </div>

        <div className="col-span-5 grid grid-cols-5 text-sm py-1 items-center rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-10 dark:bg-primary-wopee dark:bg-opacity-10 ">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Data retention
          </h5>
          <p>14 days</p>
          <p>30 days</p>
          <p>30 days</p>
          <p>Individual</p>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Coopilots
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
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-10 dark:bg-primary-wopee dark:bg-opacity-10">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            On-prem testing
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee ml-7">
            On-prem testing
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-10 dark:bg-primary-wopee dark:bg-opacity-10">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee ml-7">
            CI/CD Integration
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Videos and traces from testing
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-10 dark:bg-primary-wopee dark:bg-opacity-10">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            On-boarding assistance
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Priority feature development
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-10 dark:bg-primary-wopee dark:bg-opacity-10">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Custom feature development
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Custom integration
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-10 dark:bg-primary-wopee dark:bg-opacity-10">
          <h5 className="text-left text-sm  font-bold text-secondary-wopee dark:text-primary-wopee ml-7">
            Support
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee ml-7">
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
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20 bg-secondary-wopee bg-opacity-10 dark:bg-primary-wopee dark:bg-opacity-10">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee ml-7">
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
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>

        <div className="col-span-5 grid grid-cols-5 items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20">
          <h5 className="pl-4 text-left text-sm text-secondary-wopee dark:text-primary-wopee ml-7">
            Workshops
          </h5>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee"></span>
          <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>
      </div>
      <Link to="https://cmd.wopee.io">
        <ButtonGradientOutline className="w-52" />
      </Link>
    </div>
  );
};
export default PlanComparison;
