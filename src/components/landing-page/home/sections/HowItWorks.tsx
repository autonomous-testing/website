import React from "react";

const steps = [
  {
    image: "/img/landing/new-project-dialog.png",
    alt: "new-project-dialog",
    title: "Effortless setup:",
    subtitle: "Start visual testing in minutes",
    description:
      "Simplify the initial setup process and begin visual testing in just a few minutes. Whether you're testing web, mobile, or desktop apps, Wopee.io quickly configures your visual baseline, allowing your team to focus on testing without the steep learning curve.",
    benefit:
      "Even non-technical team members can initiate visual testing, making it easier to integrate into your workflow without delays or costly overhead.",
  },
  {
    image: "/img/landing/instant-results.png",
    alt: "dashboard-testing-results",
    title: "Instant results:",
    subtitle: "Identify visual bugs in seconds",
    description:
      "Our platform compares new screenshots against visual baselines, automatically detecting discrepancies. Within seconds, you’ll receive a detailed report highlighting any visual issues, helping you resolve potential user-facing problems before they impact the user experience.",
    benefit:
      "Speed up your release cycles by catching visual bugs immediately and ensuring your app’s interface remains flawless across versions and platforms.",
  },
  {
    image: "/img/landing/comparison-view.png",
    alt: "comparison-view",
    title: "Simplified Maintenance:",
    subtitle: "Scale and optimize with ease",
    description:
      "Wopee.io minimizes the effort needed to maintain your visual tests. When changes are detected, simply approve updates to the visual baseline with one click. Our platform automatically adapts, reducing the need for manual intervention and allowing you to scale your tests effortlessly across different configurations and versions.",
    benefit:
      "Save time and resources with Wopee.io’s low-maintenance solution, enabling your team to focus on broader testing coverage and overall product quality.",
  },
];

const features = [
  "Baseline management",
  "Native mobile app visual testing",
  "PDF testing",
  "Automated test generation",
  "Scheduled test runs",
  "Text execution video recording",
  "Bot analysis",
  "Easy CI/CD integration",
  "Multi-version support",
  "Execution traces",
  "Autonomous visual testing",
  "Exploratory testing",
  "Mobile browser testing",
  "Autonomous non-visual testing",
  "Multi-configuration support",
  "Priority-based testing",
];

const HowItWorks = () => {
  return (
    <div className="container flex flex-col gap-12 lg:gap-20">
      <p className="text-4xl lg:text-5xl font-bold text-center">How it works</p>

      {steps.map((step, index) => (
        <div
          className="flex flex-col lg:flex-row lg:odd:flex-row-reverse items-center gap-10"
          key={index}
        >
          <div className="flex-1">
            <img
              className="rounded-lg object-contain h-auto w-full shadow-2xl"
              src={step.image}
              alt={step.alt}
            />
          </div>

          <div className="w-full px-2 lg:px-0 lg:w-3/4">
            <div>
              <p className="font-bold text-3xl lg:text-4xl">
                {index + 1}. {step.title}
              </p>
              <p className="text-secondary-wopee dark:text-primary-wopee text-3xl lg:text-4xl font-bold">
                {step.subtitle}
              </p>
            </div>

            <div className="text-2xl lg:text-3xl text-balance flex flex-col gap-5">
              <p>{step.description}</p>
              <p>
                <span className="italic">Benefit:</span> {step.benefit}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center flex flex-col gap-5">
        <p className="text-3xl lg:text-4xl font-bold">
          ...and there is much more!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {features.map((feature) => (
            <div
              key={feature}
              className="border border-solid border-gray-300 dark:border-gray-700 flex justify-center items-center lg:w-52 p-4 rounded-lg dark:hover:border-primary-wopee hover:border-secondary-wopee dark:bg-zinc-700 dark:bg-opacity-90 transition-colors text-balance"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;
