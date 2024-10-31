import React from "react";

const ProblemGrid = () => {
  return (
    <div className="flex flex-col gap-10 my-12 lg:mt-28 lg:mb-12">
      <div className="text-2xl lg:text-3xl text-center text-balance font-bold px-2 lg:px-0">
        60% of companies are struggling to maintain visual consistency. What
        about your product?
      </div>

      <div className="w-full px-5 container">
        <div className="flex flex-col w-full mb-10 sm:flex-row sm:gap-10">
          <div className="w-full mb-10 sm:mb-0 sm:w-1/2 ">
            <div className="h-full p-5 dark:bg-zinc-800 border-solid border-3 border-secondary-wopee dark:border-primary-wopee rounded-lg text-center text-balance shadow-[0_0_10px_0] shadow-secondary-wopee dark:shadow-primary-wopee">
              <h3 className="my-2 text-xl font-bold">
                ⚙️Maintenance inefficiency
              </h3>

              <p className="mb-2 text-lg ">
                Maintaining outdated tools is expensive, time-consuming, and
                prone to errors, making it harder to focus on core business
                needs.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <div className="h-full p-5 dark:bg-zinc-800 border-solid border-3 border-secondary-wopee dark:border-primary-wopee rounded-lg text-center text-balance shadow-[0_0_10px_0] shadow-secondary-wopee dark:shadow-primary-wopee">
              <h3 className="my-2 text-xl font-bold ">🪴Scaling challenges</h3>

              <p className="mb-2 text-lg">
                Struggling to scale visual testing? Current tools create
                bottlenecks and slow down project delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mb-5 sm:flex-row sm:gap-10">
          <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div className="h-full p-5 dark:bg-zinc-800 border-solid border-3 border-secondary-wopee dark:border-primary-wopee rounded-lg text-center text-balance shadow-[0_0_10px_0] shadow-secondary-wopee dark:shadow-primary-wopee">
              <h3 className="my-2 text-xl font-bold">⛔Resource constraints</h3>

              <p className="mb-2 text-lg">
                With limited time and resources, manual test setups can lead to
                inefficiencies. Wopee.io helps your team achieve more with less
                effort.
              </p>
            </div>
          </div>

          <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
            <div className="h-full p-5 dark:bg-zinc-800 border-solid border-3 border-secondary-wopee dark:border-primary-wopee rounded-lg text-center text-balance shadow-[0_0_10px_0] shadow-secondary-wopee dark:shadow-primary-wopee">
              <h3 className="my-2 text-xl font-bold">
                ♟️Advanced tech skill requirements
              </h3>

              <p className="mb-2 text-lg">
                Traditional visual testing tools demand high technical
                expertise, leaving teams overwhelmed. Wopee.io eliminates this
                complexity, allowing all team members to contribute.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <div className="h-full p-5 dark:bg-zinc-800 border-solid border-3 border-secondary-wopee dark:border-primary-wopee rounded-lg text-center text-balance shadow-[0_0_10px_0] shadow-secondary-wopee dark:shadow-primary-wopee">
              <h3 className="my-2 text-xl font-bold">💰Budget limitations</h3>

              <p className="mb-2 text-lg">
                Budget limitations shouldn’t compromise quality. Wopee.io
                delivers premium visual testing at a fraction of the cost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemGrid;
