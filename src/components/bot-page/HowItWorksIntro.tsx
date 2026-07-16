import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import React from "react";

const HowItWorksIntro = () => {
  return (
    <div className="flex flex-col justify-center text-center text-balance gap-10 lg:my-28 h-[50vh] lg:h-[80vh] bg-gradient-to-b from-transparent via-primary-wopee/60 dark:via-secondary-wopee/60 to-transparent">
      <div className="px-2 lg:px-0">
        <h2 className="text-3xl lg:text-5xl font-bold">
          Your autonomous testing bot for web apps
        </h2>
        <h3 className="text-2xl lg:text-4xl font-normal">
          Point it at a URL: agents{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee font-bold">
            explore
          </span>{" "}
          your app,{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee font-bold">
            generate
          </span>{" "}
          Playwright tests, and{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee font-bold">
            self-heal
          </span>{" "}
          them when the UI changes.
        </h3>
      </div>

      <div className="px-2 lg:px-0">
        <ButtonPrimary
          label="Start for free"
          href="/pricing/"
          className="w-60 h-[50px]"
        />
      </div>
    </div>
  );
};
export default HowItWorksIntro;
