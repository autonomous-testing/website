import React from "react";
import clsx from "clsx";

type PlanComparisonRowProps = {
  feature: string;
  subFeature?: boolean;
  background?: boolean;
  basic?: "Check" | string;
  premium?: "Check" | string;
  ultimate?: "Check" | string;
};

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

const PlanComparisonRow = ({
  feature,
  subFeature,
  background,
  basic,
  premium,
  ultimate,
}: PlanComparisonRowProps) => {
  return (
    <div
      className={clsx(
        "col-span-4 grid grid-cols-4 text-sm items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20",
        background
          ? "bg-secondary-wopee bg-opacity-5 dark:bg-primary-wopee dark:bg-opacity-5"
          : ""
      )}
    >
      <h5
        className={clsx(
          "text-left text-sm  text-secondary-wopee dark:text-primary-wopee text-opacity-90 dark:text-opacity-90 ml-7",
          subFeature ? "pl-4" : "font-bold"
        )}
      >
        {feature}
      </h5>

      {basic === "Check" ? (
        <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
          <CheckIcon />
        </span>
      ) : (
        <p>{basic}</p>
      )}

      {premium === "Check" ? (
        <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
          <CheckIcon />
        </span>
      ) : (
        <p>{premium}</p>
      )}

      {ultimate === "Check" ? (
        <span className="text-secondary-wopee dark:text-primary-wopee flex items-center justify-center">
          <CheckIcon />
        </span>
      ) : (
        <p>{ultimate}</p>
      )}
    </div>
  );
};
export default PlanComparisonRow;
