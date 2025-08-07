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

const HomeTestingFrameworks = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-secondary-wopee dark:text-primary-wopee mb-8">
        Plug Wopee.io into your testing stack
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 my-2 max-w-6xl mx-auto w-full">
        {supportedTestingTools.map((tool) => (
          <div
            key={tool.src}
            className="border border-solid border-gray-100 dark:border-gray-700 flex justify-center items-center aspect-video rounded-lg dark:hover:border-primary-wopee hover:border-secondary-wopee dark:bg-white px-2 md:px-3 transition-all"
          >
            <img
              src={tool.src}
              alt={tool.alt}
              className="max-w-full max-h-full object-contain w-auto h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeTestingFrameworks;
