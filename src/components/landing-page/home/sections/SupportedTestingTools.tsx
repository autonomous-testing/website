import React from "react";
import Link from "@docusaurus/Link";
import {
  SiAppium,
  SiPuppeteer,
  SiSelenium,
  SiTestcafe,
} from "@icons-pack/react-simple-icons";

import CompareFaq, {
  type CompareFaqItem,
} from "@site/src/components/compare-page/CompareFaq";

const NATIVE_SDKS = [
  {
    name: "Playwright",
    pkg: "@wopee-io/wopee.pw",
    src: "/img/assistant/testing-tools/pw-logo2.png",
    href: "https://docs.wopee.io/playwright-visual-testing/",
  },
  {
    name: "Cypress",
    pkg: "@wopee-io/wopee.cy",
    src: "/img/assistant/testing-tools/cy-logo.png",
    href: "https://docs.wopee.io/cypress/01-getting-started/",
  },
  {
    name: "WebdriverIO",
    pkg: "@wopee-io/wopee.wdio",
    src: "/img/assistant/testing-tools/wdio-logo.png",
    href: "https://docs.wopee.io/webdriverio-visual-testing/",
  },
  {
    name: "Robot Framework",
    pkg: "wopee_rf · SeleniumLibrary, Appium",
    src: "/img/assistant/testing-tools/rf-logo2.png",
    href: "https://docs.wopee.io/robot-framework/01-getting-started/",
  },
];

const API_TOOLS: { name: string; icon?: React.ReactNode }[] = [
  { name: "Selenium WebDriver", icon: <SiSelenium size={18} /> },
  { name: "Appium", icon: <SiAppium size={18} /> },
  { name: "Puppeteer", icon: <SiPuppeteer size={18} /> },
  { name: "TestCafe", icon: <SiTestcafe size={18} /> },
  { name: "Nightwatch.js" },
  { name: "Katalon" },
  { name: "Detox" },
  { name: "Espresso" },
  { name: "XCUITest" },
  { name: "Your own scripts" },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "Which test frameworks does Wopee.io visual testing work with?",
    answer:
      "Any framework that can take a screenshot. Playwright, Cypress, WebdriverIO and Robot Framework have native SDKs. Selenium WebDriver (Java, Python, C#, JavaScript), Appium, Puppeteer, TestCafe, Nightwatch.js, Katalon, Detox, Espresso, XCUITest and custom scripts connect through the Wopee.io API.",
  },
  {
    question: "Can I use Wopee.io visual testing with Selenium?",
    answer:
      "Yes. Robot Framework suites built on SeleniumLibrary use the native wopee_rf SDK. Selenium WebDriver tests in Java, Python, C# or JavaScript capture a screenshot with the driver and send it to the Wopee.io API with a project API key; JavaScript suites can use the @wopee-io/sdk package. Wopee.io then compares it with the baseline and reports visual differences.",
  },
  {
    question: "Does Wopee.io support Appium and native mobile apps?",
    answer:
      "Yes. Appium tests send screenshots of iOS and Android apps through the Wopee.io API, and Robot Framework suites that drive Appium use the native wopee_rf SDK. The WebdriverIO SDK also captures native mobile apps.",
  },
  {
    question: "What does an API integration need?",
    answer:
      "A per-project API key from your Wopee.io project settings. Your test opens a run, sends each screenshot as a step and closes the run; your framework keeps running the test, and Wopee.io stores the baselines, runs the AI-powered visual comparison and shows the results for review.",
  },
];

const SupportedTestingTools = () => {
  return (
    <div className="flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance text-secondary-wopee dark:text-primary-wopee m-0">
          Visual testing for Playwright, Cypress, Selenium, Appium and any other
          framework
        </h2>
        <p className="text-lg opacity-80 text-balance m-0">
          Wopee.io works with any test tool that can take a screenshot. Four
          frameworks have native SDKs; everything else connects through the
          Wopee.io API with a project API key.
        </p>
      </div>

      <div className="flex flex-col gap-3 max-w-6xl mx-auto w-full">
        <h3 className="text-lg font-semibold text-center m-0">Native SDKs</h3>
        <ul className="list-none m-0 p-0 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {NATIVE_SDKS.map((tool) => (
            <li key={tool.name} className="m-0">
              <Link
                href={tool.href}
                className="h-full flex flex-col items-center gap-2 p-3 md:p-4 border border-solid border-gray-300 dark:border-gray-700 rounded-lg dark:hover:border-primary-wopee hover:border-secondary-wopee hover:no-underline transition-all text-inherit"
              >
                <span className="flex justify-center items-center aspect-video w-full rounded dark:bg-zinc-100 dark:bg-opacity-90 px-2">
                  <img
                    src={tool.src}
                    alt={`${tool.name} logo`}
                    className="max-w-full max-h-full object-contain w-auto h-auto"
                  />
                </span>
                <span className="font-semibold">{tool.name}</span>
                <span className="text-xs opacity-70 text-center">
                  {tool.pkg}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 max-w-6xl mx-auto w-full">
        <h3 className="text-lg font-semibold text-center m-0">
          Any other tool, through the Wopee.io API
        </h3>
        <ul className="list-none m-0 p-0 flex flex-wrap justify-center gap-2 md:gap-3">
          {API_TOOLS.map((tool) => (
            <li
              key={tool.name}
              className="m-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-solid border-gray-300 dark:border-gray-700 text-sm font-medium"
            >
              {tool.icon}
              {tool.name}
            </li>
          ))}
        </ul>
        <p className="text-sm opacity-70 text-center text-balance m-0">
          Capture a screenshot with your driver and send it with your project
          API key. JavaScript and TypeScript suites can use the{" "}
          <Link href="https://www.npmjs.com/package/@wopee-io/sdk">
            @wopee-io/sdk
          </Link>{" "}
          package. <Link href="/integrations/">See all integrations</Link>.
        </p>
      </div>

      <CompareFaq title="Framework support FAQ" faqs={FAQS} />
    </div>
  );
};

export default SupportedTestingTools;
