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
        // Secondary action (DESIGN.md, Components): a neutral outline, ink on light and white on dark. No gradients.
        "relative inline-flex hover:cursor-pointer items-center justify-center p-0.5 overflow-hidden text-sm border-none font-medium text-gray-900 rounded-lg group bg-gray-900 hover:text-white dark:bg-white/30 dark:hover:bg-white dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-white/30",
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
