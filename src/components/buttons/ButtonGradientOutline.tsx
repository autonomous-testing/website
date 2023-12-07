import clsx from "clsx";
import React from "react";

const ButtonGradientOutline = ({
  className,
  label = "Start free trial",
}: {
  className?: string;
  label?: string;
}) => {
  return (
    <button
      className={clsx(
        "relative inline-flex hover:cursor-pointer items-center justify-center p-0.5 overflow-hidden text-sm border-none font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-secondary-wopee group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
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
