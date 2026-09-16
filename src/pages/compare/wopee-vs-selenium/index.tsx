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
    aspect: "Test creation",
    left: "Tests are written by hand in code, on top of a framework you build",
    right:
      "AI agents explore your app from a URL and generate user stories and test cases you review",
    edge: "right" as const,
  },
  {
    aspect: "Languages and format",
    left: "Official bindings for Java, Python, C#, Ruby, and JavaScript",
    right:
      "Plain-language test cases, versioned in Git and run by an AI agent; no code needed",
  },
  {
    aspect: "When the UI changes",
    left: "Stale elements and broken selectors are fixed in code, or with add-ons such as Healenium",
    right:
      "The agent finds elements by role and accessible name at run time and never heals a failed assertion into a pass",
    edge: "right" as const,
  },
  {
    aspect: "Waits and timing",
    left: "Explicit waits are written by hand; Selenium's docs warn against mixing implicit and explicit waits",
    right:
      "The agent waits for the page to settle, but its decisions can still vary between runs",
  },
  {
    aspect: "Infrastructure",
    left: "Selenium Manager sets up drivers; distributed runs need Selenium Grid or a hosted grid",
    right:
      "Runs execute as CI jobs managed by Wopee.io; self-hosted runners for Enterprise",
    edge: "right" as const,
  },
  {
    aspect: "Visual testing",
    left: "Not built in: add a visual testing tool",
    right: "Built in, with baseline review",
    edge: "right" as const,
  },
  {
    aspect: "Browsers",
    left: "Chrome, Firefox, Edge, and Safari",
    right: "Chromium, Firefox, and WebKit, the engines Playwright supports",
  },
  {
    aspect: "Speed",
    left: "A scripted test runs in seconds, and Grid runs many in parallel",
    right:
      "The agent works through each test step by step, which takes minutes per test",
    edge: "left" as const,
  },
  {
    aspect: "Repeatability",
    left: "The same code runs the same steps on every run",
    right:
      "Adaptive by default, so runs can vary. Need strict runs? Define explicit steps. We default to adaptability because it keeps tests working as your UI evolves.",
    edge: "left" as const,
  },
  {
    aspect: "Adaptability",
    left: "Tests follow fixed steps; a changed flow or layout needs a code update",
    right:
      "The agent works from the test's intent, so it can often follow a changed flow or layout without edits",
    edge: "right" as const,
  },
  {
    aspect: "Portability",
    left: "A W3C standard: your code runs on any grid or vendor",
    right:
      "Tests live in Wopee.io's format; passing tests can also be generated as Playwright code that uses the Wopee.io SDK",
    edge: "left" as const,
  },
  {
    aspect: "Cost",
    left: "Free library; you pay for infrastructure, hosted grid sessions if you use them, and maintenance time",
    right: "Start free, then 19 to 179 € per user per month",
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
    title: "Start with the tests you repair most",
    description:
      "Point Wopee.io at your app and cover the flows that break on timing, stale elements, or changed locators. Review the generated user stories and test cases before anything runs.",
  },
  {
    step: "3",
    title: "Retire tests as coverage overlaps",
    description:
      "Run both for a while. Retire Selenium tests once Wopee.io tests cover the same flows, and keep the ones where speed or exact repeatability matters. Wopee.io does not import or convert Selenium code.",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "Is Selenium still relevant in 2026?",
    answer:
      "Yes. Selenium 4.49 shipped in September 2026, releases arrive roughly monthly, and the project is moving its implementation to WebDriver BiDi. Selenium implements the W3C WebDriver standard and has official bindings for more languages than any other major browser automation tool.",
  },
  {
    question: "What is the best AI alternative to Selenium?",
    answer:
      "Weigh three things: how tests are created, how they hold up when the UI changes, and whether you can take them with you. Wopee.io agents generate and run test cases from your running web app and adapt to UI changes, but tests live in Wopee.io's format, so they are less portable than Selenium code. If you also test native mobile apps, Selenium with Appium keeps web and mobile in one toolchain.",
  },
  {
    question: "Is Wopee.io as fast and repeatable as a Selenium suite?",
    answer:
      "No. A Selenium test runs the same code in seconds on every run. Wopee.io's agent decides each step at run time and takes minutes per test, which lets it adapt to UI changes but means results can vary between runs. When a flow must run exactly the same way every time, define explicit steps. Adaptability stays the default because it keeps tests working as your UI evolves.",
  },
  {
    question: "Can Wopee.io import or convert Selenium tests?",
    answer:
      "No. Wopee.io does not import Selenium code. Its agents generate new test cases from your running app, so a migration means regenerating flows rather than translating scripts. Keep Selenium tests in CI until Wopee.io tests cover the same flows.",
  },
  {
    question: "Do I need Selenium Grid or WebDriver to run Wopee.io?",
    answer:
      "No. Wopee.io's agent runs tests in CI jobs that Wopee.io manages, with no browser drivers or Grid to set up.",
  },
  {
    question: "Does Selenium support self-healing tests?",
    answer:
      "Not natively. Teams add open-source libraries such as Healenium, which swaps a broken locator for the closest matching element, or commercial layers on top. Wopee.io's agent finds elements by role and accessible name, falls back to other locator strategies, and never heals a failed assertion into a pass.",
    render: (
      <>
        Not natively. Teams add{" "}
        <Link href="/blog/self-healing-in-sw-test-automation/">
          open-source libraries such as Healenium
        </Link>
        , which swaps a broken locator for the closest matching element, or
        commercial layers on top. Wopee.io's agent finds elements by role and
        accessible name, falls back to other locator strategies, and never
        heals a failed assertion into a pass.
      </>
    ),
  },
  {
    question: "Which browsers does Wopee.io support?",
    answer:
      "Wopee.io tests web applications in Chromium, Firefox, and WebKit, the browser engines Playwright supports. Native mobile apps are out of scope; for those, Appium is the usual choice.",
  },
];

const WhatItCosts = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
        What Selenium actually costs
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
        The Selenium library is free. The costs sit around it: machines or a
        hosted grid for parallel runs (BrowserStack, Sauce Labs, and TestMu
        AI, formerly LambdaTest, start at $29 per parallel session per month at
        list price, with higher tiers for more browsers and real devices), plus
        the engineering hours spent on waits, stale elements, and broken
        locators. Selenium Manager now automates driver setup, which removed
        one classic chore.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
        Wopee.io is priced per user, with agent execution included:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        . The units differ, so compare the time your team spends on{" "}
        <Link href="/blog/flaky-tests-complete-guide/">flaky tests</Link> and
        repairs. That is the work Wopee.io's agents are built to reduce, while
        your team still reviews the tests.
      </p>
    </div>
  </section>
);

const MigrationSteps = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-slate-50 dark:bg-white/5">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-10">
        Adding Wopee.io without a big-bang rewrite
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
      description="Selenium alternative for web test automation: Wopee.io AI agents write and run tests from your app. An honest comparison, including where Selenium is stronger."
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
            Selenium is the open-source browser automation project behind the
            W3C WebDriver standard, with official bindings for five languages.
            It is a library, so your team builds the framework, waits, and
            execution setup around it. Wopee.io is an AI alternative to
            Selenium for web test automation: agents explore your app, write
            test cases in plain language, and run them in a real browser, with
            no drivers or grid to manage. The trade-off is minutes per test
            instead of seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center sm:items-start mt-2">
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
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg flex items-center sm:h-[50px]"
            >
              See Wopee.io pricing &rarr;
            </Link>
          </div>
        </div>
      </div>

      <ComparisonTable
        title="Side-by-side comparison"
        subtitle="A hand-written Selenium suite and Wopee.io's agent-run tests are different tools. We mark a side as stronger only where it clearly is."
        leftLabel="Selenium"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Stick with Selenium when"
        stickItems={[
          "You need fast, exactly repeatable runs in seconds",
          "Your test code must be written in Java, C#, Python, or Ruby",
          "You also test native mobile apps and want one toolchain with Appium",
          "A mature Grid and framework already run reliably and maintenance is under control",
          "A vendor-neutral W3C standard is a hard requirement",
        ]}
        switchTitle="Choose Wopee.io when"
        switchItems={[
          "Flaky waits and broken locators take more time than new coverage",
          "You'd rather not run Grid nodes or pay for hosted grid sessions",
          "You'd rather review generated test cases than write and maintain test code",
          "You want visual regression and run evidence built in",
          "Minutes per test is an acceptable price for less test maintenance",
        ]}
      />

      <WhatItCosts />

      <MigrationSteps />

      <CompareFaq
        title="Wopee.io vs Selenium: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: September 2026. Selenium details come from selenium.dev documentation and release notes; hosted grid prices from the BrowserStack, Sauce Labs, and TestMu AI pricing pages." />

      <CompareCta
        heading="Rather review tests than repair them?"
        subheading="Start free and see generated tests today."
        ctaId="cta-vs-selenium-footer"
      />
    </Layout>
  );
};

export default WopeeVsSelenium;
