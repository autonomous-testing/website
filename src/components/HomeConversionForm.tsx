import React from "react";

import ButtonGhost from "./buttons/ButtonGhost";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonPrimaryInverted from "./buttons/ButtonPrimaryInverted";

const HomeConversionForm = () => {
  return (
    <div className="bg-gradient-to-b from-transparent to-primary-wopee dark:to-secondary-wopee mt-16 ">
      <div className="container mt-16 h-[50vh] flex flex-col justify-center gap-10">
        <h2 className="text-4xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Immerse yourself in the autonomous testing experience with Wopee.io
        </h2>
        <div className="flex justify-center items-center gap-5">
          <ButtonPrimary
            label="Free Trial"
            href="https://cmd.wopee.io"
            className="w-36 h-[50px]"
          />
          <ButtonPrimaryInverted
            href="/book-demo"
            className="w-36 h-[50px]"
          />
        </div>
      </div>
    </div>
  );
};
export default HomeConversionForm;
