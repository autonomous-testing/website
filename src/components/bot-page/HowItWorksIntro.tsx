import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import React from "react";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

const HowItWorksIntro = () => {
  return (
    <section className="border-y border-slate-200/80 bg-secondary-wopee/[0.045] py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-primary-wopee/[0.04]">
      <div className="container px-5 lg:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="m-0 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            Your autonomous{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              testing bot for web apps
            </span>
          </h2>
          <p className="mb-0 mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg lg:text-xl dark:text-slate-300">
            Point it at a URL. Wopee.io agents explore your app, generate
            Playwright tests, and self-heal them when the UI changes.
          </p>

          <div className="mt-8 w-full sm:w-auto">
            <ButtonPrimary
              label="Start for free"
              href={`${cmdBaseUrl}/login`}
              className="h-[50px] w-full sm:w-60"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorksIntro;
