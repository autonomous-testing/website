import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";

type ButtonPrimaryProps = {
  href?: string;
  label?: string;
  className?: string;
};

const ButtonPrimary = ({
  href,
  className,
  label = "Book demo",
}: ButtonPrimaryProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="group"
        >
          <button
            className={clsx(
              "text-white border border-secondary-wopee dark:border-primary-wopee dark:text-secondary-wopee font-semibold bg-secondary-wopee dark:bg-primary-wopee group-hover:bg-opacity-10 group-hover:text-secondary-wopee dark:group-hover:text-primary-wopee hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
              className
            )}
          >
            {label}
          </button>
        </Link>
      ) : (
        <button
          className={clsx(
            "text-primary-wopee border border-secondary-wopee dark:border-primary-wopee dark:text-secondary-wopee font-semibold bg-secondary-wopee dark:bg-primary-wopee hover:bg-transparent hover:text-secondary-wopee dark:hover:text-primary-wopee hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
            className
          )}
        >
          {label}
        </button>
      )}
    </>
  );
};
export default ButtonPrimary;
