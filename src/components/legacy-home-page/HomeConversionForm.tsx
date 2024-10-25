import React from "react";

import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonPrimaryInverted from "../buttons/ButtonPrimaryInverted";
import clsx from "clsx";

const HomeConversionForm = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "bg-gradient-to-b from-transparent to-primary-wopee dark:to-secondary-wopee mt-16",
        className
      )}
    >
      <div className="container my-16 h-[50vh] flex flex-col justify-center gap-10">
        <h2 className="text-4xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Immerse yourself in the autonomous testing experience with Wopee.io
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <ButtonPrimary
            label="Start free trial"
            href="https://cmd.wopee.io"
            className="w-60 h-[50px]"
          />
          <ButtonPrimaryInverted
            href="/book-demo"
            className="w-60 h-[50px]"
          />
        </div>
      </div>
    </div>
  );
};
export default HomeConversionForm;
