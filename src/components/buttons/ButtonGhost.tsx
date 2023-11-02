import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";

type ButtonGhostProps = {
  href?: string;
  label?: string;
  className?: string;
};

const ButtonGhost = ({
  href,
  className,
  label = "Book demo",
}: ButtonGhostProps) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <button
            className={clsx(
              "text-secondary-wopee font-semibold border-transparent bg-transparent hover:cursor-pointer hover:border-secondary-wopee focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center dark:text-primary-wopee dark:hover:border-primary-wopee dark:focus:ring-purple-900 transition ease-out",
              className
            )}
          >
            {label}
          </button>
        </Link>
      ) : (
        <button
          className={clsx(
            "text-secondary-wopee font-semibold border-transparent bg-transparent hover:cursor-pointer hover:border-secondary-wopee focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center dark:text-primary-wopee dark:hover:border-primary-wopee dark:focus:ring-purple-900 transition ease-out",
            className
          )}
        >
          {label}
        </button>
      )}
    </>
  );
};
export default ButtonGhost;
