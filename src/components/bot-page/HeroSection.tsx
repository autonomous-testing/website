import React from "react";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-16 my-12 lg:mt-10 lg:mb-0 lg:h-[70vh] px-5 lg:px-10 container">
      <div className="text-center flex flex-col gap-5">
        <div className="text-balance flex flex-col gap-9">
          <h1 className="text-5xl sm:text-6xl">
            Self-Driving Bot{" "}
            <p className=" text-secondary-wopee dark:text-primary-wopee">
              Only URL required
            </p>
          </h1>

          <p className="text-2xl">
            Automate like a pro, 1 minute{" "}
            <span className="line-clamp-1">setup, no coding required.</span>
          </p>
        </div>

        <div>
          <ButtonPrimary
            label="Start free trial"
            href="https://cmd.wopee.io"
            className="w-60 h-[50px]"
          />
          <p className="text-sm italic">No credit card required</p>
        </div>
      </div>
      <div>
        <img
          className="object-contain w-full max-h-[500px] lg:max-h-[600px]"
          src="/img/wopee_head_1_2023-10-10.png"
          alt="dashboard-image"
        />
      </div>
    </div>
  );
};
export default HeroSection;
