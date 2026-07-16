import React from "react";
import { Rocket, GitPullRequest, Bug } from "lucide-react";
import GradientCard from "@/components/ui/GradientCard";

const pains = [
  {
    icon: (
      <Rocket className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ),
    title: "The velocity gap",
    description:
      "AI coding agents ship features in minutes. Writing test scripts manually slows down every release — testing can't keep up.",
  },
  {
    icon: (
      <GitPullRequest
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ),
    title: "The review bottleneck",
    description:
      "Code review checks the diff, not the product. Your CI catches technical errors but misses broken user flows.",
  },
  {
    icon: (
      <Bug className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ),
    title: "AI-generated regressions",
    description:
      "Every AI-generated change can touch flows nobody wrote by hand. Re-testing dozens of user flows manually doesn't scale.",
  },
];

const HomeProblemSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-2 text-balance">
        AI writes your code 10x faster. Who tests it?
      </h2>
      <p className="text-lg text-gray-700 dark:text-white text-center mb-10 max-w-2xl text-balance">
        AI coding assistants made shipping faster than ever. Testing didn't get
        the same upgrade — until now.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-10">
        {pains.map((pain, idx) => (
          <GradientCard
            key={idx}
            className="h-full"
            innerClassName="flex flex-col min-h-[200px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {pain.icon}
              </span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white m-0">
                {pain.title}
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {pain.description}
            </p>
          </GradientCard>
        ))}
      </div>
      <div className="max-w-3xl mx-auto text-center px-4">
        <p className="text-xl md:text-2xl font-bold text-balance">
          <span className="text-secondary-wopee dark:text-primary-wopee">
            Wopee.io closes the gap.
          </span>{" "}
          AI testing agents explore your app, generate tests, run them, and
          self-heal when the UI changes — a testing pipeline that keeps pace
          with your code.
        </p>
      </div>
    </section>
  );
};

export default HomeProblemSection;
