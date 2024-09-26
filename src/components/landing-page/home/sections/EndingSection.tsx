import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import React from "react";

const EndingSection = () => {
  return (
    <div className="bg-gradient-to-b from-transparent to-primary-wopee dark:to-secondary-wopee mt-16">
      <div className="container mb-16 h-[50vh] flex flex-col justify-center gap-10 text-center">
        <div className="text-4xl font-bold text-balance">
          <p>Optimize your visual testing process with Wopee.io</p>
          <p className=" text-secondary-wopee dark:text-primary-wopee">
            Set up in minutes, get results instantly, no coding needed.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <div className="h-20">
            <ButtonPrimaryInverted
              href="/book-demo"
              className="w-60 h-[50px]"
            />
          </div>
          <div className="h-20">
            <ButtonPrimary
              label="Start free trial"
              href="https://cmd.wopee.io"
              className="w-60 h-[50px]"
            />
            <p className="text-center text-sm italic">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EndingSection;
