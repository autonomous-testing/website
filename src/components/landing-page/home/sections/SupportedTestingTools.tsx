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

const SupportedTestingTools = ({
  spanLastOdd = true,
}: {
  spanLastOdd: boolean;
}) => {
  return (
    <div className="flex flex-col gap-5 text-balance px-2">
      <p className="text-4xl text-center font-bold text-secondary-wopee dark:text-primary-wopee">
        Easy integration with all modern testing frameworks
      </p>
      <div className="grid grid-cols-2 sm:flex justify-center gap-2 my-2">
        {supportedTestingTools.map((tool) => (
          <div
            key={tool.src}
            className={`border border-solid border-gray-300 dark:border-gray-700 flex justify-center items-center aspect-video sm:w-56 rounded-lg dark:hover:border-primary-wopee hover:border-secondary-wopee dark:bg-zinc-100 dark:bg-opacity-90 px-3 xl:hover:px-1 transition-all ${
              spanLastOdd ? "last:odd:col-span-2" : ""
            }`}
          >
            <img
              src={tool.src}
              alt={tool.alt}
              className=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SupportedTestingTools;
