import React from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";

const HomeHeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-10 my-32">
      <section className="text-balance">
        <h1 className="font-bold text-center text-5xl sm:text-5xl md:text-6xl">
          Optimize Your Testing
        </h1>
        <h2 className="text-secondary-wopee dark:text-primary-wopee text-center text-3xl sm:text-3xl md:text-4xl ">
          Set Up in Minutes, Results in Seconds.
        </h2>
        <h2 className="text-secondary-wopee dark:text-primary-wopee text-center text-3xl sm:text-3xl md:text-4xl ">
          No Coding Needed.
        </h2>
      </section>

      <section className="flex flex-col items-center">
        <ButtonPrimary
          id="hero-button"
          label="Start free trial"
          href="https://cmd.wopee.io"
          className="w-60 h-[50px]"
        />
        <span className="italic">No credit card required</span>
      </section>
    </div>
  );
};
export default HomeHeroSection;
