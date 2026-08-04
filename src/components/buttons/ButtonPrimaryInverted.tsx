import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";

type ButtonPrimaryInvertedProps = {
  href?: string;
  label?: string;
  className?: string;
  id?: string;
  onClick?: () => void;
};

const ButtonPrimaryInverted = ({
  href,
  className,
  label = "Book demo",
  id,
  onClick,
}: ButtonPrimaryInvertedProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="group"
          id={id}
        >
          <button
            type="button"
            className={clsx(
              "dark:text-primary-wopee text-secondary-wopee border border-secondary-wopee dark:border-primary-wopee e font-semibold bg-transparent group-hover:bg-secondary-wopee group-hover:text-white dark:group-hover:text-secondary-wopee dark:group-hover:bg-primary-wopee hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
              className
            )}
          >
            {label}
          </button>
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            "text-secondary-wopee dark:text-primary-wopee border border-secondary-wopee dark:border-primary-wopee font-semibold bg-transparent hover:bg-secondary-wopee hover:text-white dark:hover:bg-primary-wopee dark:hover:text-secondary-wopee hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
            className
          )}
          id={id}
        >
          {label}
        </button>
      )}
    </>
  );
};
export default ButtonPrimaryInverted;
