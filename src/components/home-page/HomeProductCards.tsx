import React from "react";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";

const SelfDrivingBotCard = () => {
  const router = useHistory();
  return (
    <div
      onClick={() => router.push("/bot")}
      className="flex items-center justify-around w-[380px] sm:w-[530px] xl:w-[600px] h-[195px] py-4 rounded-lg border hover:ring-2 hover:ring-primary-wopee border-solid border-primary-wopee bg-gradient-to-br from-secondary-wopee to-white hover:cursor-pointer transition-shadow ease-in-out"
    >
      <div className="flex flex-col w-1/2 gap-4 items-center">
        <section className="text-center text-white">
          <h2 className="text-2xl">Self-Driving Bot</h2>
          <h3 className="font-normal text-xl text-primary-wopee">
            Only URL required
          </h3>
          <h3 className="font-normal text-sm">Automate like a pro, 1 minute</h3>
          <h3 className="font-normal text-sm">setup, no coding required</h3>
        </section>

        <Link
          to="/bot"
          className="group"
        >
          <button className=" text-white border border-secondary-wopee font-semibold bg-transparent group-hover:bg-secondary-wopee group-hover:text-white hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-1 text-center transition ease-out">
            Learn more
          </button>
        </Link>
      </div>

      <div className="flex justify-center w-1/2">
        <img
          className="h-40"
          src="/img/wopee_head_1_2023-10-10.png"
        />
      </div>
    </div>
  );
};

const VisualTestingCard = () => {
  const router = useHistory();
  return (
    <div
      onClick={() => router.push("/visual-testing")}
      className="flex items-center justify-around w-[380px] sm:w-[530px] xl:w-[600px] h-[195px] py-4 rounded-lg border hover:ring-2 hover:ring-secondary-wopee border-solid border-secondary-wopee bg-gradient-to-br from-primary-wopee to-white overflow-hidden hover:cursor-pointer transition-shadow ease-in-out"
    >
      <div className="flex flex-col w-1/2 gap-4 items-center">
        <section className="text-center text-black">
          <h2 className="text-2xl">Visual Testing</h2>
          <div className="flex justify-center h-5 sm:h-8 gap-1">
            <img
              src="/img/assistant/testing-tools/pw-logo1.png"
              alt="playwright"
            />
            <img
              src="/img/assistant/testing-tools/cy-logo.png"
              alt="cypress"
            />
            <img
              src="/img/assistant/testing-tools/wdio-logo.png"
              alt="webdriver-io"
            />
            <img
              src="/img/assistant/testing-tools/rf-logo2.png"
              alt="robot framework"
            />
          </div>
          <h3 className="font-normal text-sm">
            Increase coverage & reduce code
          </h3>
        </section>

        <Link
          to="/visual-testing"
          className="group"
        >
          <button className="text-secondary-wopee border border-secondary-wopee font-semibold bg-transparent group-hover:bg-secondary-wopee group-hover:text-white hover:cursor-pointer rounded-lg text-sm md:text-base xl:text-lg px-5 py-1 text-center transition ease-out">
            Learn more
          </button>
        </Link>
      </div>

      <div className="w-1/4 h-full">
        <figure className="relative h-full w-[500px]">
          <img
            className="absolute -rotate-12 opacity-50 -translate-x-[90px] -translate-y-[70px] inset-0"
            src="/img/landing/tests-page-new.png"
          />
        </figure>
      </div>
    </div>
  );
};

const HomeProductCards = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-5 px-5">
      <SelfDrivingBotCard />

      <VisualTestingCard />
    </div>
  );
};
export default HomeProductCards;
