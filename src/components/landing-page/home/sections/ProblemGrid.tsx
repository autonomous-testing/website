import React from "react";

const ProblemGrid = () => {
  return (
    <div className="flex flex-col gap-10 my-12 lg:my-28">
      <div className="text-2xl lg:text-3xl text-center text-balance font-bold px-2 lg:px-0">
        60% of companies are struggling to maintain visual consistency. What
        about your product?
      </div>

      <div className="w-full px-5 container">
        <div className="flex flex-col w-full mb-10 sm:flex-row">
          <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div className="relative h-full ml-0 mr-0 sm:mr-10">
              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-secondary-wopee dark:bg-primary-wopee rounded-lg"></span>
              <div className="relative h-full p-5 bg-zinc-100 dark:bg-zinc-800 border-2 border-secondary-wopee dark:border-primary-wopee rounded-lg">
                <div className="flex items-center -mt-1">
                  <h3 className="my-2 ml-3 text-lg font-bold ">
                    ⚙️Maintenance inefficiency
                  </h3>
                </div>
                <p className="mt-3 mb-1 text-xs font-medium text-secondary-wopee dark:text-primary-wopee uppercase">
                  ------------
                </p>
                <p className="mb-2 ">
                  Maintaining outdated tools is expensive, time-consuming, and
                  prone to errors, making it harder to focus on core business
                  needs.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <div className="relative h-full ml-0 md:mr-10">
              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-secondary-wopee dark:bg-primary-wopee rounded-lg"></span>
              <div className="relative h-full p-5 bg-zinc-100 dark:bg-zinc-800 border-2 border-secondary-wopee dark:border-primary-wopee rounded-lg">
                <div className="flex items-center -mt-1">
                  <h3 className="my-2 ml-3 text-lg font-bold ">
                    🪴Scaling challenges
                  </h3>
                </div>
                <p className="mt-3 mb-1 text-xs font-medium text-secondary-wopee dark:text-primary-wopee uppercase">
                  ------------
                </p>
                <p className="mb-2 ">
                  Struggling to scale visual testing? Current tools create
                  bottlenecks and slow down project delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mb-5 sm:flex-row">
          <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div className="relative h-full ml-0 mr-0 sm:mr-10">
              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-secondary-wopee dark:bg-primary-wopee rounded-lg"></span>
              <div className="relative h-full p-5 bg-zinc-100 dark:bg-zinc-800 border-2 border-secondary-wopee dark:border-primary-wopee rounded-lg">
                <div className="flex items-center -mt-1">
                  <h3 className="my-2 ml-3 text-lg font-bold">
                    ⛔Resource constraints
                  </h3>
                </div>
                <p className="mt-3 mb-1 text-xs font-medium text-secondary-wopee dark:text-primary-wopee uppercase">
                  ------------
                </p>
                <p className="mb-2">
                  With limited time and resources, manual test setups can lead
                  to inefficiencies. Wopee.io helps your team achieve more with
                  less effort.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div className="relative h-full ml-0 mr-0 sm:mr-10">
              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-secondary-wopee dark:bg-primary-wopee rounded-lg"></span>
              <div className="relative h-full p-5 bg-zinc-100 dark:bg-zinc-800 border-2 border-secondary-wopee dark:border-primary-wopee rounded-lg">
                <div className="flex items-center -mt-1">
                  <h3 className="my-2 ml-3 text-lg font-bold">
                    ♟️Advanced tech skill requirements
                  </h3>
                </div>
                <p className="mt-3 mb-1 text-xs font-medium text-secondary-wopee dark:text-primary-wopee uppercase">
                  ------------
                </p>
                <p className="mb-2">
                  Traditional visual testing tools demand high technical
                  expertise, leaving teams overwhelmed. Wopee.io eliminates this
                  complexity, allowing all team members to contribute.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <div className="relative h-full ml-0 md:mr-10">
              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-secondary-wopee dark:bg-primary-wopee rounded-lg"></span>
              <div className="relative h-full p-5 bg-zinc-100 dark:bg-zinc-800 border-2 border-secondary-wopee dark:border-primary-wopee rounded-lg">
                <div className="flex items-center -mt-1">
                  <h3 className="my-2 ml-3 text-lg font-bold">
                    💰Budget limitations
                  </h3>
                </div>
                <p className="mt-3 mb-1 text-xs font-medium text-secondary-wopee dark:text-primary-wopee uppercase">
                  ------------
                </p>
                <p className="mb-2">
                  Budget limitations shouldn’t compromise quality. Wopee.io
                  delivers premium visual testing at a fraction of the cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemGrid;
