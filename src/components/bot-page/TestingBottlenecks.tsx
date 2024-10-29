import React from "react";

const TestingBottlenecks = () => {
  return (
    <div className="bg-gradient-to-br from-secondary-wopee via-purple-600 to-secondary-wopee dark:from-primary-wopee dark:to-white text-balance flex flex-col gap-10 px-10 py-16">
      <h2 className="text-4xl sm:text-5xl text-white dark:text-secondary-wopee font-bold text-center">
        Testing bottlenecks slowing you down?
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 text-primary-wopee dark:text-secondary-wopee text-2xl sm:text-3xl text-left  items-center container">
        <div className="flex items-center">
          <div>⚡</div>
          <p>
            90% of testers face{" "}
            <span className="font-bold">delays due to complex tools</span> and
            manual testing.
          </p>
        </div>

        <div className="flex items-center">
          <div>⚡</div>
          <p>
            Manual methods <span className="font-bold">miss bugs</span> and lead
            to inconsistent results.
          </p>
        </div>
        <div className="flex items-center">
          <div>⚡</div>
          <p>
            Existing solutions{" "}
            <span className="font-bold">
              require coding and complicated setup.
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <div>⚡</div>
          <p>
            <span className="font-bold">High maintenance</span> and lack of
            support increase human error rate.
          </p>
        </div>
        <div className="flex items-center">
          <div>⚡</div>
          <p>
            90% of testers face{" "}
            <span className="font-bold">delays due to complex tools</span> and
            manual testing
          </p>
        </div>
        <div className="flex items-center">
          <div>⚡</div>
          <p>
            Maintaining traditional test frameworks is{" "}
            <span className="font-bold">time consuming</span> and frustrating
          </p>
        </div>
      </div>
    </div>
  );
};
export default TestingBottlenecks;
