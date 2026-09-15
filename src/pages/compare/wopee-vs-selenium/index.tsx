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
      "AI agents generate, run, and maintain Playwright tests from your running web app",
  },
  {
    aspect: "Languages",
    left: "Official bindings for Java, Python, C#, Ruby, and JavaScript",
    right:
      "No code needed to create tests; the generated tests are Playwright code you can export",
  },
  {
    aspect: "Waits and flakiness",
    left: "Explicit waits are written by hand; Selenium's docs warn against mixing implicit and explicit waits",
    right:
      "Playwright auto-waiting, plus an agent that waits for unsettled pages",
  },
  {
    aspect: "Locator maintenance",
    left: "Stale elements and broken selectors are fixed in code, or with add-ons such as Healenium",
    right:
      "Accessible-name locators with fallbacks; an agent investigates steps that keep failing",
  },
  {
    aspect: "Execution",
    left: "Runs locally or in CI; Selenium Manager sets up drivers; distributed runs use Selenium Grid or a hosted grid",
    right:
      "Agent runs execute as CI jobs managed by Wopee.io; self-hosted runners and on-premise for Enterprise",
  },
  {
    aspect: "Browsers and devices",
    left: "Chrome, Firefox, Edge, and real Safari; native mobile apps through Appium, a separate WebDriver-based project",
    right: "Web apps in the browser; native mobile apps are out of scope",
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
      "Yes. Selenium 4.49 shipped in September 2026, releases arrive roughly monthly, and the project is moving its implementation to WebDriver BiDi. Selenium implements the W3C WebDriver standard and has official bindings for more languages than any other major browser automation tool.",
  },
  {
    question: "What is the best AI alternative to Selenium?",
    answer:
      "For web apps, look for a tool that generates tests from your running application and lets you export them as standard code, so your tests are not locked into a vendor. Wopee.io agents generate, run, and maintain Playwright tests you can export and run without Wopee.io. For native mobile apps or real Safari, Selenium and Appium are still the stronger fit.",
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
        Not natively. Teams add{" "}
        <Link href="/blog/self-healing-in-sw-test-automation/">
          open-source libraries such as Healenium
        </Link>
        , which swaps a broken locator for the closest matching element, or
        commercial layers on top. Wopee.io resolves elements by role and
        accessible name, falls back to other locator strategies, and never
        heals a failed assertion into a pass.
      </>
    ),
  },
  {
    question: "Can Wopee.io test Safari or native mobile apps?",
    answer:
      "Wopee.io tests web applications in the browser; native mobile apps are out of scope. For real Safari, Selenium with safaridriver is the better fit, and for native mobile apps, Appium.",
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
            Selenium is the open-source browser automation project behind the
            W3C WebDriver standard, with official bindings for five languages.
            It is a library, so your team builds the framework, waits, and
            execution setup around it. Wopee.io is an AI alternative to
            Selenium for web test automation: agents explore your app and
            generate, run, and maintain Playwright tests your team reviews.
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
          "You need real Safari, or native mobile apps through Appium",
          "A mature Grid and framework already run reliably and maintenance is under control",
          "A vendor-neutral W3C standard is a hard requirement",
        ]}
        switchTitle="Switch to Wopee.io when"
        switchItems={[
          "Flaky waits and broken locators take more time than new coverage",
          "You'd rather not run Grid nodes or pay for hosted grid sessions",
          "You test web apps and want coverage generated from the running app",
          "You want visual regression and run evidence (screenshots, traces, video) built in",
          "You want Playwright code you can export, not tests in a proprietary format",
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
