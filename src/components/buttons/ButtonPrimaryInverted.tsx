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
              "dark:text-white text-gray-900 border border-gray-900 dark:border-white/30 font-semibold bg-transparent group-hover:bg-gray-900/5 dark:group-hover:bg-white/10 dark:group-hover:border-white hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
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
            "text-gray-900 dark:text-white border border-gray-900 dark:border-white/30 font-semibold bg-transparent hover:bg-gray-900/5 dark:hover:bg-white/10 dark:hover:border-white dark:hover:text-gray-900 hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
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
