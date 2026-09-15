import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ComparisonTable from "@site/src/components/compare-page/ComparisonTable";
import WhenToChoose from "@site/src/components/compare-page/WhenToChoose";
import CompareFaq, {
  CompareFaqItem,
} from "@site/src/components/compare-page/CompareFaq";
import CompareCta from "@site/src/components/compare-page/CompareCta";
import LastChecked from "@site/src/components/compare-page/LastChecked";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";

const TLDR_ROWS = [
  {
    aspect: "Approach",
    left: "Open-source library implementing W3C WebDriver; you build the framework, reporting, and waits around it",
    right:
      "AI testing agents that generate, run, and maintain Playwright tests from your running web app",
  },
  {
    aspect: "Languages",
    left: "Official bindings for Java, Python, C#, Ruby, and JavaScript",
    right:
      "No code needed to create tests; the generated tests are Playwright code you can export",
  },
  {
    aspect: "Waits and flakiness",
    left: "Explicit waits are written by hand, and Selenium's docs warn that mixing implicit and explicit waits causes unpredictable timeouts",
    right:
      "Playwright auto-waiting, plus an agent that waits for unsettled pages and reads back filled values",
  },
  {
    aspect: "Locator maintenance",
    left: "Stale elements and broken XPath or CSS selectors are fixed in code; healing needs add-ons such as Healenium",
    right:
      "Elements resolve by role and accessible name with fallbacks; a Troubleshoot sub-agent handles steps that keep failing",
  },
  {
    aspect: "Infrastructure",
    left: "Browser drivers plus a self-hosted Grid, or a cloud grid at $29 to $225 per parallel session per month (list prices)",
    right:
      "Agent runs execute as CI jobs managed by Wopee.io; self-hosted runners and on-premise for Enterprise",
  },
  {
    aspect: "Browsers and devices",
    left: "Real Chrome, Firefox, Edge, and Safari; native mobile apps through Appium",
    right: "Web apps in the browser; native mobile apps are out of scope",
  },
  {
    aspect: "Cost",
    left: "Free library; you pay for infrastructure and the engineering time to maintain the suite",
    right: "Published: start free, then 19 to 179 € per user per month",
  },
];

const MIGRATION_STEPS = [
  {
    step: "1",
    title: "Keep Selenium running",
    description:
      "Leave the suite in CI while you evaluate. Robot Framework teams on SeleniumLibrary can add Wopee.io visual checks with the wopee_rf library in the meantime.",
  },
  {
    step: "2",
    title: "Generate the flaky flows first",
    description:
      "Point Wopee.io at your app and start with the tests you repair most: flows that fail on timing, stale elements, or changed locators. Review the generated user stories and test cases before anything runs.",
  },
  {
    step: "3",
    title: "Retire tests as coverage overlaps",
    description:
      "Agent runs emit Playwright code you can export. Run both suites for a while and retire Selenium tests once generated tests cover the same flows. Wopee.io does not convert Selenium code automatically.",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "Is Selenium still relevant in 2026?",
    answer:
      "Yes. Selenium 4.49 shipped in September 2026, releases arrive roughly monthly, and the project is moving its implementation to WebDriver BiDi. It remains the W3C standard with the broadest language and real-browser coverage. What has changed is where new web test suites start: many teams now pick Playwright or AI testing agents instead.",
  },
  {
    question: "What is the best AI alternative to Selenium?",
    answer:
      "For web apps, look for a tool that generates tests from your running application and lets you export them as standard code, so your tests are not locked into a vendor. Wopee.io agents generate, run, and maintain Playwright tests you can export and run without Wopee.io. For native mobile apps or real Safari, Selenium with Appium is still the stronger fit.",
  },
  {
    question: "Can Wopee.io import or convert Selenium tests?",
    answer:
      "No. Wopee.io does not import Selenium code. Its agents generate new Playwright coverage from your running app, so a migration means regenerating flows rather than translating scripts. Keep Selenium tests in CI until the generated tests cover the same flows.",
  },
  {
    question: "Do I need Selenium Grid or WebDriver to run Wopee.io?",
    answer:
      "No. Wopee.io agents run on Playwright as CI jobs that Wopee.io manages. Tests you export run with npx playwright test anywhere the Playwright CLI works, without browser drivers or a Grid.",
  },
  {
    question: "Does Selenium support self-healing tests?",
    answer:
      "Not natively. Teams add open-source libraries such as Healenium, which swaps a broken locator for the closest matching element, or commercial layers on top. Wopee.io resolves elements by role and accessible name, falls back to other locator strategies, and never heals a failed assertion into a pass.",
    render: (
      <>
        Not natively. Teams add open-source libraries such as Healenium, which
        swaps a broken locator for the closest matching element, or commercial
        layers on top. Wopee.io resolves elements by role and accessible name,
        falls back to other locator strategies, and never heals a failed
        assertion into a pass. More in our{" "}
        <Link href="/blog/self-healing-in-sw-test-automation/">
          guide to self-healing test automation
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can Wopee.io test Safari or native mobile apps?",
    answer:
      "Wopee.io tests web applications in the browser; native mobile apps are out of scope. If you need real Safari on macOS or native apps through Appium, Selenium is the better tool for those suites.",
  },
];

const CostOfFree = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
        The real cost of free Selenium
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
        Selenium itself costs nothing. The bill arrives elsewhere: a
        self-hosted Grid to operate or a cloud grid subscription (BrowserStack,
        Sauce Labs, and TestMu AI, formerly LambdaTest, list $29 to $225 per
        parallel session per month), plus the hours spent on waits, stale
        elements, and broken locators. Selenium Manager now handles most
        driver downloads, which removed one classic chore, but not the rest.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
        Wopee.io puts execution and the maintenance agent behind one
        published price:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        . If{" "}
        <Link href="/blog/flaky-tests-complete-guide/">flaky tests</Link> are
        what your team spends its week on, that is the cost to compare.
      </p>
    </div>
  </section>
);

const MigrationSteps = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-slate-50 dark:bg-white/5">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-10">
        Moving off Selenium without a big-bang rewrite
      </h2>
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {MIGRATION_STEPS.map((s) => (
          <div
            key={s.step}
            className="rounded-2xl border border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-6 flex flex-col gap-4"
          >
            <span className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary-wopee dark:bg-primary-wopee text-white dark:text-secondary-wopee font-bold text-xl flex items-center justify-center">
              {s.step}
            </span>
            <h3 className="text-xl font-bold m-0">{s.title}</h3>
            <p className="m-0 text-slate-600 dark:text-slate-400">
              {s.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <ButtonPrimary
          label="Start for free"
          href={loginUrl}
          className="w-60 h-[50px]"
          id="cta-vs-selenium-migrate"
        />
        <p className="text-sm italic">No credit card required</p>
      </div>
    </section>
  );
};

const WopeeVsSelenium = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Selenium: Selenium Alternative"
      description="Selenium alternative for web test automation: Wopee.io AI agents generate and maintain Playwright tests, with no drivers or grid to run. Honest comparison."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            Selenium
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            Selenium is the open-source standard for browser automation: the
            W3C WebDriver protocol, official bindings for five languages, and
            Grid for running at scale. It is a library, so your team builds and
            maintains the framework, the waits, and the infrastructure around
            it. Wopee.io is an AI alternative to Selenium for web test
            automation: agents explore your app, generate Playwright tests, run
            them, and maintain them as the UI changes, with no drivers or grid
            to operate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-selenium-hero"
              />
              <span className="text-xs opacity-50">
                No credit card required
              </span>
            </div>
            <Link
              href="/pricing/"
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg"
            >
              See Wopee.io pricing &rarr;
            </Link>
          </div>
        </div>
      </div>

      <ComparisonTable
        title="TL;DR comparison"
        subtitle="Where a Selenium suite and an agent-generated Playwright suite actually differ, from Selenium's own documentation and public grid pricing."
        leftLabel="Selenium"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Stick with Selenium when"
        stickItems={[
          "Your test code must be written in Java, C#, Python, or Ruby",
          "You need real Safari or native mobile apps through Appium",
          "A mature Grid and framework already run reliably and maintenance is under control",
          "A vendor-neutral W3C standard is a hard requirement",
        ]}
        switchTitle="Switch to Wopee.io when"
        switchItems={[
          "Flaky waits and broken locators take more time than new coverage",
          "Nobody wants to own browser drivers, Grid nodes, or a cloud grid bill",
          "You test web apps and want coverage generated from the running app",
          "You want visual regression and run evidence (screenshots, traces, video) built in",
          "You want Playwright code you can export, not tests in a proprietary format",
        ]}
      />

      <CostOfFree />

      <MigrationSteps />

      <CompareFaq
        title="Wopee.io vs Selenium: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: September 2026. Selenium details come from selenium.dev documentation and release notes; cloud grid prices from the BrowserStack, Sauce Labs, and TestMu AI pricing pages." />

      <CompareCta
        heading="Done maintaining WebDriver plumbing?"
        subheading="Start free and see generated tests today."
        ctaId="cta-vs-selenium-footer"
      />
    </Layout>
  );
};

export default WopeeVsSelenium;
