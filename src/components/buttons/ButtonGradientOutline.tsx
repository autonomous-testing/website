import React from "react";

const ButtonGradientOutline = () => {
  return (
    <button className="relative inline-flex hover:cursor-pointer items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm border-none font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-secondary-wopee group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md font-bold group-hover:bg-opacity-0">
        Start free trial
      </span>
    </button>
  );
};
export default ButtonGradientOutline;
