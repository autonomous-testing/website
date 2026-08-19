import React from "react";
import { Rocket, GitPullRequest, Bug } from "lucide-react";

const pains = [
  {
    icon: Rocket,
    title: "The velocity gap",
    description:
      "AI coding agents ship features in minutes. Writing test scripts manually slows down every release, and testing can't keep up.",
  },
  {
    icon: GitPullRequest,
    title: "The review bottleneck",
    description:
      "Code review checks the diff, not the product. Your CI catches technical errors but misses broken user flows.",
  },
  {
    icon: Bug,
    title: "AI-generated regressions",
    description:
      "Every AI-generated change can touch flows nobody wrote by hand. Re-testing dozens of user flows manually doesn't scale.",
  },
];

const HomeProblemSection = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 py-14 sm:px-6 sm:py-20 lg:py-24 bg-gray-50/70 dark:bg-white/[0.025]">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-center text-gray-950 dark:text-white mb-2 text-balance">
        AI writes your code 10x faster.{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          Who tests it?
        </span>
      </h2>
      <p className="text-lg text-gray-700 dark:text-white text-center mb-10 sm:mb-12 lg:mb-14 max-w-2xl text-balance">
        AI coding assistants made shipping faster than ever. Testing didn't get
        the same upgrade. Until now.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {pains.map(({ icon: Icon, title, description }, idx) => (
          <div
            key={title}
            className="h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900/70 dark:shadow-none md:p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center justify-center size-9 rounded-md bg-secondary-wopee/10 dark:bg-primary-wopee/10">
                <Icon
                  className="size-5 text-secondary-wopee dark:text-primary-wopee"
                  aria-hidden="true"
                />
              </span>
              <span className="font-mono text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500">
                0{idx + 1}
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white m-0 mb-1.5">
              {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed m-0">
              {description}
            </p>
          </div>
        ))}
      </div>
      <div className="max-w-4xl border-t border-gray-200 pt-8 text-center dark:border-white/10 mt-10">
        <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 text-balance m-0">
          <span className="font-bold text-secondary-wopee dark:text-primary-wopee">
            Wopee.io closes the gap.
          </span>{" "}
          AI testing agents explore your app, generate tests, run them, and
          self-heal when the UI changes: a testing pipeline that keeps pace
          with your code.
        </p>
      </div>
    </section>
  );
};

export default HomeProblemSection;
