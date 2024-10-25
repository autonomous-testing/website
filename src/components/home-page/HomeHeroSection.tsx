import React from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";

const HomeHeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-10 my-32">
      <section className="text-center text-2xl sm:text-4xl md:text-6xl text-balance">
        <p className="font-bold">Streamline testing with Wopee.io</p>
        <p className="text-secondary-wopee dark:text-primary-wopee">
          Advanced automation meets{" "}
          <span className="font-bold">simplicity</span>,
        </p>
        <p className="text-secondary-wopee dark:text-primary-wopee">
          enhancing <span className="font-bold">efficiency</span> and{" "}
          <span className="font-bold">ease</span> in your workflow.
        </p>
      </section>

      <section className="flex flex-col items-center">
        <ButtonPrimary
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
