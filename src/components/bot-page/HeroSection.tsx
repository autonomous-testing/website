import React from "react";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import OptimizedImage from "@site/src/components/ui/OptimizedImage";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

const HeroSection = () => {
  return (
    <section className="container px-5 py-12 sm:py-16 lg:px-10 lg:pb-20 lg:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="mb-5 rounded-full border border-secondary-wopee/20 bg-secondary-wopee/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-wopee sm:text-sm dark:border-primary-wopee/20 dark:bg-primary-wopee/[0.06] dark:text-primary-wopee">
            Autonomous web app testing
          </p>
          <h1 className="m-0 max-w-4xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            <span className="text-secondary-wopee dark:text-primary-wopee">
              AI Testing Agents
            </span>
            : The Testing Bot for Web Apps
          </h1>

          <p className="mb-0 mt-7 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg lg:text-xl dark:text-slate-300">
            A testing bot that explores your web app, generates Playwright
            tests, and self-heals when the UI changes. Set up in 1 minute. No
            coding required.
          </p>

          <div className="mt-8 w-full sm:w-auto">
            <ButtonPrimary
              label="Start for free"
              href={`${cmdBaseUrl}/login`}
              className="h-[50px] w-full sm:w-60"
            />
            <p className="mb-0 mt-2 text-xs italic text-slate-500 dark:text-slate-400">
              No credit card required
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute inset-8 rounded-full bg-secondary-wopee/10 blur-3xl dark:bg-primary-wopee/10" />
          <div className="relative rounded-2xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-slate-50/80 px-8 py-7 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.45)] sm:px-10 sm:py-9 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_22px_55px_-30px_rgba(0,0,0,0.9)]">
            <OptimizedImage
              className="mx-auto max-h-[360px] w-full object-contain lg:max-h-[430px]"
              src="/img/wopee_head_1_2023-10-10.png"
              alt="Wopee.io testing bot mascot representing the AI testing agents that explore web apps, generate Playwright tests, and self-heal them when the UI changes."
              loading="eager"
              sizes="(max-width: 1023px) 384px, 420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
