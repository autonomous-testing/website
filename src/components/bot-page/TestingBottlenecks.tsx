import React from "react";

const TestingBottlenecks = () => {
  return (
    <div className="bg-secondary-wopee dark:bg-primary-wopee text-balance flex flex-col gap-10 px-10 py-16">
      <h2 className="text-4xl sm:text-5xl text-white dark:text-secondary-wopee font-bold text-center">
        Testing bottlenecks slowing you down?
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 text-primary-wopee dark:text-secondary-wopee text-3xl sm:text-4xl text-center lg:text-left items-center container">
        <div>
          ⚡ 90% of testers face{" "}
          <span className="font-bold">delays due to complex tools</span> and
          manual testing.
        </div>
        <div>
          ⚡ Manual methods <span className="font-bold">miss bugs</span> and
          lead to inconsistent results.
        </div>
        <div>
          ⚡ Existing solutions{" "}
          <span className="font-bold">
            require coding and complicated setup.
          </span>
        </div>
        <div>
          ⚡ <span className="font-bold">High maintenance</span> and lack of
          support increase human error rate.
        </div>
        <div>
          ⚡ 90% of testers face{" "}
          <span className="font-bold">delays due to complex tools</span> and
          manual testing
        </div>
        <div>
          ⚡ Maintaining traditional test frameworks is{" "}
          <span className="font-bold">time consuming</span> and frustrating
        </div>
      </div>
    </div>
  );
};
export default TestingBottlenecks;
