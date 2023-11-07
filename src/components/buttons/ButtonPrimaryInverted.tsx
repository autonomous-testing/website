import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";

type ButtonPrimaryInvertedProps = {
  href?: string;
  label?: string;
  className?: string;
};

const ButtonPrimaryInverted = ({
  href,
  className,
  label = "Book demo",
}: ButtonPrimaryInvertedProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="group"
        >
          <button
            className={clsx(
              "dark:text-primary-wopee text-secondary-wopee border border-secondary-wopee dark:border-primary-wopee e font-semibold bg-transparent group-hover:bg-secondary-wopee group-hover:text-primary-wopee dark:group-hover:text-secondary-wopee dark:group-hover:bg-primary-wopee hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
              className
            )}
          >
            {label}
          </button>
        </Link>
      ) : (
        <button
          className={clsx(
            "text-primary-wopee border border-secondary-wopee dark:border-primary-wopee dark:text-secondary-wopee font-semibold bg-transparent hover:bg-transparent hover:text-secondary-wopee dark:hover:text-primary-wopee hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
            className
          )}
        >
          {label}
        </button>
      )}
    </>
  );
};
export default ButtonPrimaryInverted;
