import React from "react";
import {
  Clock,
  Bug,
  Code,
  Wrench,
  AlertTriangle,
  Timer,
} from "lucide-react";

const ICON_CLASS = "text-primary-wopee dark:text-secondary-wopee";

const BOTTLENECKS: { icon: React.ReactNode; text: React.ReactNode }[] = [
  {
    icon: <Clock className={ICON_CLASS} size={28} />,
    text: (
      <>
        Testers face{" "}
        <span className="font-bold">delays due to complex tools</span> and
        manual testing.
      </>
    ),
  },
  {
    icon: <Bug className={ICON_CLASS} size={28} />,
    text: (
      <>
        Manual methods <span className="font-bold">miss bugs</span> and lead to
        inconsistent results.
      </>
    ),
  },
  {
    icon: <Code className={ICON_CLASS} size={28} />,
    text: (
      <>
        Existing solutions{" "}
        <span className="font-bold">require coding and complicated setup.</span>
      </>
    ),
  },
  {
    icon: <Wrench className={ICON_CLASS} size={28} />,
    text: (
      <>
        <span className="font-bold">High maintenance</span> and lack of support
        increase human error rate.
      </>
    ),
  },
  {
    icon: <AlertTriangle className={ICON_CLASS} size={28} />,
    text: (
      <>
        <a
          href="/blog/flaky-tests-complete-guide/"
          className="underline font-semibold text-inherit hover:text-inherit"
        >
          Flaky tests
        </a>{" "}
        erode trust — engineers{" "}
        <span className="font-bold">babysit brittle suites</span> instead of
        shipping.
      </>
    ),
  },
  {
    icon: <Timer className={ICON_CLASS} size={28} />,
    text: (
      <>
        Maintaining traditional test frameworks is{" "}
        <span className="font-bold">time consuming</span> and frustrating.
      </>
    ),
  },
];

const TestingBottlenecks = () => {
  return (
    <div className="bg-gradient-to-br from-secondary-wopee via-purple-600 to-secondary-wopee dark:from-primary-wopee dark:to-white text-balance flex flex-col gap-10 px-4 lg:px-10 py-16">
      <h2 className="text-3xl md:text-4xl text-white dark:text-secondary-wopee font-bold text-center">
        The bottlenecks a testing bot removes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl w-full mx-auto text-primary-wopee dark:text-secondary-wopee">
        {BOTTLENECKS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm p-5"
          >
            <span className="inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-white/15 dark:bg-black/10">
              {item.icon}
            </span>
            <p className="text-base lg:text-lg m-0">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestingBottlenecks;
