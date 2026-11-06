import clsx from "clsx";
import React from "react";

const ButtonGradientOutline = ({
  className,
  label = "Start for free",
}: {
  className?: string;
  label?: string;
}) => {
  return (
    <button
      className={clsx(
        // Secondary action (DESIGN.md, Components): ink outline on light, the purple-to-yellow ring on dark. No blue.
        "relative inline-flex hover:cursor-pointer items-center justify-center p-0.5 overflow-hidden text-sm border-none font-medium text-gray-900 rounded-lg group bg-gray-900 hover:text-white dark:bg-gradient-to-br dark:from-secondary-wopee dark:to-primary-wopee dark:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-purple-800",
        className
      )}
    >
      <span
        className={clsx(
          "relative px-5 py-2.5 transition-all  ease-in duration-75 bg-white text-lg dark:bg-gray-900 rounded-md font-bold group-hover:bg-opacity-0",
          className
        )}
      >
        {label}
      </span>
    </button>
  );
};
export default ButtonGradientOutline;
