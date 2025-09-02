import React from "react";

const HomeTrustedBy = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center my-32 container">
      <div className="flex flex-col-reverse xl:flex-row w-full gap-5 justify-center items-center">
        <div className="flex w-full h-10 sm:h-16 xl:h-24 xl:flex-1 gap-2 justify-around xl:justify-between grayscale dark:invert">
          <img
            className="h-full"
            src="/img/customers/multitude-logo-2.png"
            alt="multitude"
          />

          <img
            className="h-full"
            src="/img/customers/flash-score-logo.png"
            alt="livesport"
          />

          <img
            className="h-full"
            src="/img/customers/inventi-logo.png"
            alt="inventi"
          />
        </div>

        <div className="text-2xl xl:w-1/3 text-center xl:text-right">
          <p>Trusted by</p>
          <p className="text-secondary-wopee dark:text-primary-wopee">
            top engineering teams
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row w-full gap-5 justify-center items-center">
        <div className="text-2xl xl:w-1/3 text-center xl:text-left">
          <p>Backed by</p>
          <p className="text-secondary-wopee dark:text-primary-wopee">
            strong partners
          </p>
        </div>

        <div className="flex w-full h-10 sm:h-16 xl:h-24 xl:flex-1 gap-2 justify-around xl:justify-between grayscale dark:invert">
          <img
            className="h-full"
            src="/img/investors/tesena-logo.png"
            alt="tesena"
          />

          <img
            className="h-full"
            src="/img/investors/nation1-logo.png"
            alt="nation1"
          />

          <img
            className="h-full"
            src="/img/investors/startup-yard-logo.png"
            alt="startup yard"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeTrustedBy;
