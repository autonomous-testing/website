import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mt-10 h-[70vh] px-10">
      <div className="text-center flex flex-col gap-5 w-full lg:w-1/3">
        <div className="text-balance">
          <h1 className="text-6xl">
            Simplify your{" "}
            <p className=" text-secondary-wopee dark:text-primary-wopee">
              Visual Testing
            </p>
          </h1>
          <p className="text-2xl">
            Set up in minutes, accurate{" "}
            <span className="line-clamp-1">results instantly.</span>
          </p>
        </div>

        <div>
          <ButtonPrimary
            label="Start free trial"
            href="https://cmd.wopee.io"
            className="w-60 h-[50px]"
          />
          <p className="text-sm italic">
            Visual testing made easy, no credit card required
          </p>
        </div>
      </div>

      <div className="flex-1">
        <img
          className="rounded-lg object-contain h-auto w-full shadow-2xl"
          src="/img/landing/tests-page-new.png"
          alt="dashboard-image"
        />
      </div>
    </div>
  );
};
export default HeroSection;
