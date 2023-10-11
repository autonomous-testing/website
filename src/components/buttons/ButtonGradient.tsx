import Link from "@docusaurus/Link";
import React from "react";

const ButtonGradient = () => {
  return (
    <Link
      href="/book-demo"
      className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 !no-underline rounded-lg shadow-2xl group"
    >
      <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-secondary-wopee dark:bg-primary-wopee rounded-full blur-md ease"></span>
      <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
        <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 dark:bg-yellow-500 rounded-full blur-md"></span>
        <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-purple-500 dark:bg-yellow-500 rounded-full blur-md"></span>
      </span>
      <span className="relative text-white dark:text-secondary-wopee">
        Book demo
      </span>
    </Link>
  );
};
export default ButtonGradient;
