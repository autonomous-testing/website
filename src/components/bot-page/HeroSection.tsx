import React from "react";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import OptimizedImage from "@site/src/components/ui/OptimizedImage";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-16 my-12 lg:mt-10 lg:mb-0 lg:h-[70vh] px-5 lg:px-10 container">
      <div className="text-center flex flex-col gap-5">
        <div className="text-balance flex flex-col gap-9">
          <h1 className="text-5xl sm:text-6xl">
            <span className="text-secondary-wopee dark:text-primary-wopee">
              AI Testing Agents
            </span>
            : The Testing Bot for Web Apps
          </h1>

          <p className="text-2xl">
            A testing bot that explores your web app, generates Playwright
            tests, and self-heals when the UI changes. 1 minute setup, no
            coding required.
          </p>
        </div>

        <div>
          <ButtonPrimary
            label="Start for free"
            href="/pricing/"
            className="w-60 h-[50px]"
          />
          <p className="text-sm italic">No credit card required</p>
        </div>
      </div>
      <div>
        <OptimizedImage
          className="object-contain w-full max-h-[500px] lg:max-h-[600px]"
          src="/img/wopee_head_1_2023-10-10.png"
          alt="Wopee.io testing bot mascot representing the AI testing agents that explore web apps, generate Playwright tests, and self-heal them when the UI changes."
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};
export default HeroSection;
