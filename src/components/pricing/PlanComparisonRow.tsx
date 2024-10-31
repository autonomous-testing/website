import React from "react";
import clsx from "clsx";

export type PlanComparisonRowProps = {
  feature: string;
  subFeature?: boolean;
  background?: boolean;
  starter?: "Check" | string;
  basic?: "Check" | string;
  premium?: "Check" | string;
  enterprise?: "Check" | string;
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
  starter,
  basic,
  premium,
  enterprise,
}: PlanComparisonRowProps) => {
  return (
    <div
      className={clsx(
        "col-span-5 grid grid-cols-5 text-sm items-center py-1 rounded-md hover:bg-secondary-wopee hover:bg-opacity-20 hover:dark:bg-primary-wopee hover:dark:bg-opacity-20",
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

      <span
        className={clsx(
          "",
          starter === "Check"
            ? "text-secondary-wopee dark:text-primary-wopee flex items-center justify-center"
            : ""
        )}
      >
        {starter === "Check" ? <CheckIcon /> : starter}
      </span>

      <span
        className={clsx(
          "",
          basic === "Check"
            ? "text-secondary-wopee dark:text-primary-wopee flex items-center justify-center"
            : ""
        )}
      >
        {basic === "Check" ? <CheckIcon /> : basic}
      </span>

      <span
        className={clsx(
          "",
          premium === "Check"
            ? "text-secondary-wopee dark:text-primary-wopee flex items-center justify-center"
            : ""
        )}
      >
        {premium === "Check" ? <CheckIcon /> : premium}
      </span>

      <span
        className={clsx(
          "",
          enterprise === "Check"
            ? "text-secondary-wopee dark:text-primary-wopee flex items-center justify-center"
            : ""
        )}
      >
        {enterprise === "Check" ? <CheckIcon /> : enterprise}
      </span>
    </div>
  );
};
export default PlanComparisonRow;
