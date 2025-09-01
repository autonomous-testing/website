import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import React from "react";
import OptimizedImage from "@site/src/components/ui/OptimizedImage";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-5 my-12 lg:mt-10 lg:mb-0 lg:h-[70vh] px-10">
      <div className="text-center flex flex-col gap-5 w-full lg:w-1/3">
        <div className="text-balance">
          <h1 className="text-5xl sm:text-6xl">
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

      <div className="lg:flex-1">
        <OptimizedImage
          className="rounded-lg object-contain h-auto w-full shadow-2xl"
          src="/img/landing/tests-page-new.png"
          alt="Visual testing dashboard showing test results and comparisons"
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
    </div>
  );
};
export default HeroSection;
