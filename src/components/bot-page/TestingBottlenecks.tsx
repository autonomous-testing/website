import React from "react";
import {
  Clock,
  Bug,
  Code,
  Wrench,
  AlertTriangle,
  Timer,
} from "lucide-react";

const ICON_CLASS = "text-secondary-wopee dark:text-primary-wopee";

const BOTTLENECKS: { icon: React.ReactNode; text: React.ReactNode }[] = [
  {
    icon: <Clock className={ICON_CLASS} size={28} />,
    text: (
      <>
        Complex tools and manual testing{" "}
        <span className="font-bold text-slate-900 dark:text-slate-100">
          delay testers.
        </span>
      </>
    ),
  },
  {
    icon: <Bug className={ICON_CLASS} size={28} />,
    text: (
      <>
        Manual methods{" "}
        <span className="font-bold text-slate-900 dark:text-slate-100">
          miss bugs
        </span>{" "}
        and produce inconsistent results.
      </>
    ),
  },
  {
    icon: <Code className={ICON_CLASS} size={28} />,
    text: (
      <>
        Existing solutions demand{" "}
        <span className="font-bold text-slate-900 dark:text-slate-100">
          coding and complicated setup.
        </span>
      </>
    ),
  },
  {
    icon: <Wrench className={ICON_CLASS} size={28} />,
    text: (
      <>
        <span className="font-bold text-slate-900 dark:text-slate-100">
          High maintenance
        </span>{" "}
        and lack of support increase the human error rate.
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
        erode trust. Engineers{" "}
        <span className="font-bold text-slate-900 dark:text-slate-100">
          babysit brittle suites
        </span>{" "}
        instead of
        shipping.
      </>
    ),
  },
  {
    icon: <Timer className={ICON_CLASS} size={28} />,
    text: (
      <>
        Traditional test frameworks are{" "}
        <span className="font-bold text-slate-900 dark:text-slate-100">
          time-consuming and frustrating
        </span>{" "}
        to maintain.
      </>
    ),
  },
];

const TestingBottlenecks = () => {
  return (
    <section className="border-y border-slate-200/80 bg-slate-50/70 py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-white/[0.025]">
      <div className="container px-5 lg:px-10">
        <h2 className="m-0 text-center text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
          The bottlenecks a{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee">
            testing bot removes
          </span>
        </h2>

        <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BOTTLENECKS.map((item, idx) => (
            <article
              key={idx}
              className="flex items-start gap-4 rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                {item.icon}
              </span>
              <p className="m-0 leading-7 text-slate-600 dark:text-slate-300">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestingBottlenecks;
