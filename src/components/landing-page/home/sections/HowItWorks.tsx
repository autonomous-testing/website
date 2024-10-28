import CMDLoginForm from "@site/src/components/bot-page/CMDLoginForm";
import React from "react";

const HowItWorks = ({
  STEPS,
  FEATURES,
}: {
  STEPS: Array<{
    title: string;
    subtitle: string;
    description: string;
    image?: string;
    alt?: string;
    benefit?: string;
  }>;
  FEATURES: string[];
}) => {
  return (
    <div className="container flex flex-col gap-12 lg:gap-20">
      <p className="text-4xl lg:text-5xl font-bold text-center">How it works</p>

      {STEPS.map((step, index) => (
        <div
          className="flex flex-col lg:flex-row lg:odd:flex-row-reverse items-center gap-10"
          key={index}
        >
          <div className="flex-1">
            {step.image ? (
              <img
                className="rounded-lg object-contain h-auto w-full shadow-2xl"
                src={step.image}
                alt={step.alt}
              />
            ) : (
              <CMDLoginForm />
            )}
          </div>

          <div className="w-full px-2 lg:px-0 lg:w-3/4 flex flex-col gap-5">
            <div>
              <p className="font-bold text-3xl lg:text-4xl">
                {index + 1}. {step.title}
              </p>
              <p className="text-secondary-wopee dark:text-primary-wopee text-3xl lg:text-4xl font-bold">
                {step.subtitle}
              </p>
            </div>

            <div
              className={`text-xl lg:text-2xl text-balance opacity-70 ${
                step.benefit ? "flex flex-col gap-5" : ""
              }`}
            >
              <p>{step.description}</p>
              {step.benefit && (
                <p>
                  <span className="italic">Benefit:</span> {step.benefit}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="text-center flex flex-col gap-5">
        <p className="text-3xl lg:text-4xl font-bold">
          ...and there is much more!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {FEATURES.map((feature) => (
            <div
              key={feature}
              className="border border-solid border-gray-300 dark:border-gray-700 flex justify-center items-center lg:w-52 text-lg p-4 rounded-lg dark:hover:border-primary-wopee hover:border-secondary-wopee dark:bg-zinc-700 dark:bg-opacity-90 transition-colors text-balance"
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
