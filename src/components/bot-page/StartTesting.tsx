import React from "react";
import CMDLoginForm from "./CMDLoginForm";

const StartTesting = () => {
  return (
    <div className="flex flex-col text-center lg:flex-row lg:text-left gap-5 justify-center items-center my-16 container">
      <div className="w-fit">
        <h3 className="text-5xl">Start testing instantly</h3>
        <p className="text-secondary-wopee dark:text-primary-wopee text-2xl">
          Just enter your URL.
        </p>
        <p className="text-secondary-wopee dark:text-primary-wopee text-2xl">
          No coding, no hassle.
        </p>
      </div>

      <CMDLoginForm />
    </div>
  );
};
export default StartTesting;
