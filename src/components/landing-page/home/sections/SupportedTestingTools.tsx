import React from "react";

const supportedTestingTools = [
  {
    alt: "Cypress",
    src: "/img/assistant/testing-tools/cy-logo.png",
  },
  {
    alt: "Playwright",
    src: "/img/assistant/testing-tools/pw-logo2.png",
  },
  {
    alt: "Robot Framework",
    src: "/img/assistant/testing-tools/rf-logo2.png",
  },
  {
    alt: "Selenium",
    src: "/img/assistant/testing-tools/se-logo.png",
  },
  {
    alt: "webdriver.io",
    src: "/img/assistant/testing-tools/wdio-logo.png",
  },
];

const SupportedTestingTools = () => {
  return (
    <div className="flex flex-col gap-5 text-balance px-4">
      <p className="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-secondary-wopee dark:text-primary-wopee">
        Easy integration with all modern testing frameworks
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 my-2 max-w-6xl mx-auto w-full">
        {supportedTestingTools.map((tool) => (
          <div
            key={tool.src}
            className="border border-solid border-gray-300 dark:border-gray-700 flex justify-center items-center aspect-video rounded-lg dark:hover:border-primary-wopee hover:border-secondary-wopee dark:bg-zinc-100 dark:bg-opacity-90 px-2 md:px-3 transition-all"
          >
            <img
              src={tool.src}
              alt={tool.alt}
              className="max-w-full max-h-full object-contain w-auto h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedTestingTools;
