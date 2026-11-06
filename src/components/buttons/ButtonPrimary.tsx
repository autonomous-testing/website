import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";

type ButtonPrimaryProps = {
  href?: string;
  label?: string;
  className?: string;
  id?: string;
};

const ButtonPrimary = ({
  href,
  className,
  label = "Book demo",
  id,
}: ButtonPrimaryProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="group"
          id={id}
        >
          <button
            className={clsx(
              "text-gray-900 border border-solid border-primary-wopee font-semibold bg-primary-wopee group-hover:bg-[#ffd633] hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
              className
            )}
          >
            {label}
          </button>
        </Link>
      ) : (
        <button
          className={clsx(
            "text-gray-900 border border-solid border-primary-wopee font-semibold bg-primary-wopee hover:bg-[#ffd633] hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-2.5 text-center transition ease-out",
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
export default ButtonPrimary;
