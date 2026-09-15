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
    left: "Open-source (MIT) framework: your team writes and maintains JavaScript or TypeScript specs",
    right:
      "AI agents explore your app from a URL and generate test cases and Playwright code you review",
  },
  {
    aspect: "AI assistance",
    left: "cy.prompt turns plain-English steps into Cypress commands; it needs a Cypress Cloud account and Chrome or Edge",
    right:
      "Agents generate and run tests from your running app; every artifact is editable before it runs",
  },
  {
    aspect: "Maintenance",
    left: "Selectors are fixed by hand; cy.prompt steps can re-resolve when the page changes",
    right:
      "Accessible-name locators with fallbacks; an agent investigates steps that keep failing and never heals a failed assertion",
  },
  {
    aspect: "Tabs, origins, iframes",
    left: "One tab per test, cy.origin() for other origins, and iframe support its own docs call limited",
    right:
      "Agent runs handle new tabs and iframes, including cross-origin frames",
  },
  {
    aspect: "Parallel runs",
    left: "Built-in parallelization and load balancing need Cypress Cloud; otherwise you split specs across CI jobs yourself",
    right: "Runs execute as CI jobs managed by Wopee.io",
  },
  {
    aspect: "Pricing",
    left: "Framework free; Cloud Starter free for 500 test results a month, Team $799 and Business $3,199 per year for up to 50 users",
    right: "Start free, then 19 to 179 € per user per month",
  },
  {
    aspect: "Visual testing",
    left: "Not built in: add Percy, Applitools, or an open-source snapshot plugin",
    right:
      "Built into agent runs with baseline review; the Cypress plugin adds it to existing specs",
  },
  {
    aspect: "Test ownership",
    left: "Spec files in your own repository, runnable anywhere Cypress runs",
    right:
      "Deterministic Playwright code you can export and run without Wopee.io",
  },
];

const MIGRATION_STEPS = [
  {
    step: "1",
    title: "Keep the suite that works",
    description:
      "Leave stable Cypress specs in CI. Nothing about Wopee.io requires deleting them.",
  },
  {
    step: "2",
    title: "Generate coverage where Cypress hurts",
    description:
      "Point Wopee.io at your app and start with the flows that are expensive in Cypress: multi-tab journeys, cross-origin logins, iframes, and the specs you repair most often.",
  },
  {
    step: "3",
    title: "Retire specs as coverage overlaps",
    description:
      "Agent runs emit Playwright code you can export. When a generated test covers what a Cypress spec did, retire the spec. Wopee.io does not convert Cypress code automatically.",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "What is the best Cypress alternative?",
    answer:
      "It depends on why you are leaving. Teams that want a code-first framework usually move to Playwright, which drives multiple tabs, runs Chromium, Firefox, and WebKit, and parallelizes without a paid service. Teams that want to stop writing and repairing specs look at AI testing agents. Wopee.io generates Playwright tests from your running web app, so you get agents that help maintain the suite and code you can export.",
  },
  {
    question: "How much does Cypress cost?",
    answer:
      "The Cypress framework is free and MIT-licensed. Cypress Cloud adds built-in parallelization, Test Replay, and analytics. As of September 2026 its Starter plan is free for 500 test results a month, and Team ($799 per year) and Business ($3,199 per year) each cover up to 50 users and 120,000 test results, with extra results billed per 1,000. Enterprise is quote-based. Wopee.io publishes its pricing: start free, then 19 to 179 € per user per month.",
    render: (
      <>
        The Cypress framework is free and MIT-licensed. Cypress Cloud adds
        built-in parallelization, Test Replay, and analytics. As of September
        2026 its Starter plan is free for 500 test results a month, and Team
        ($799 per year) and Business ($3,199 per year) each cover up to 50
        users and 120,000 test results, with extra results billed per 1,000.
        Enterprise is quote-based. Wopee.io publishes its pricing:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        .
      </>
    ),
  },
  {
    question: "Does Cypress have AI features?",
    answer:
      "Yes. cy.prompt turns natural-language steps into Cypress commands and can re-resolve them when the page changes. It requires a Cypress Cloud account and runs in Chrome and Edge. Cypress Cloud adds AI error summaries and an MCP server. These features help you write and debug specs; Wopee.io agents explore the app and generate the tests for you to review.",
  },
  {
    question: "Can Wopee.io convert my Cypress tests to Playwright?",
    answer:
      "No. Wopee.io does not import or convert Cypress specs. Its agents generate new Playwright coverage from your running app, and you can keep existing Cypress specs in CI until the generated tests cover the same flows.",
  },
  {
    question: "Can I use Wopee.io together with Cypress?",
    answer:
      "Yes. The @wopee-io/wopee.cy plugin adds visual checks to existing Cypress specs: you call cy.wopeeTrack() where a screenshot should be compared against an approved baseline. Livesport's QA team started with Wopee.io this way in 2023.",
    render: (
      <>
        Yes. The{" "}
        <Link href="https://docs.wopee.io/cypress/01-getting-started/">
          @wopee-io/wopee.cy plugin
        </Link>{" "}
        adds visual checks to existing Cypress specs: you call cy.wopeeTrack()
        where a screenshot should be compared against an approved baseline.{" "}
        <Link href="/blog/livesport-visual-testing-w-wopee-io/">
          Livesport's QA team
        </Link>{" "}
        started with Wopee.io this way in 2023.
      </>
    ),
  },
  {
    question: "Does Wopee.io handle multiple tabs and iframes?",
    answer:
      "Yes. Wopee.io agents run on Playwright, which drives multiple tabs natively, and the agent resolves locators inside iframes, including cross-origin frames. In Cypress, a test controls one tab, and other origins need cy.origin().",
  },
  {
    question: "Is Cypress still maintained?",
    answer:
      "Yes. Cypress 16.0 shipped on 1 September 2026 with native network interception in Chrome and Edge and memory management on by default, and new releases arrive about every two weeks.",
  },
];

const KeepCypress = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
        Not ready to leave Cypress? Add Wopee.io to it
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
        Wopee.io's Cypress plugin adds visual checks to the specs you already
        have. Register the plugin, call <code>cy.wopeeTrack()</code> where a
        screenshot should be compared against an approved baseline, and review
        the diffs in Wopee.io. It does not rewrite or heal your Cypress code;
        it covers the visual layer that functional assertions miss.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
        <Link href="/blog/livesport-visual-testing-w-wopee-io/">
          Livesport's QA team
        </Link>{" "}
        started with Wopee.io this way on Cypress in 2023 and later added it
        to their WebdriverIO mobile projects.{" "}
        <Link href="https://docs.wopee.io/cypress/01-getting-started/">
          Set up the Cypress plugin &rarr;
        </Link>
      </p>
    </div>
  </section>
);

const MigrationSteps = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-slate-50 dark:bg-white/5">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-10">
        Moving from Cypress without a big-bang rewrite
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
          id="cta-vs-cypress-migrate"
        />
        <p className="text-sm italic">No credit card required</p>
      </div>
    </section>
  );
};

const PricingWedge = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
        What you actually pay for
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
        Cypress the framework is free. Cypress Cloud adds built-in
        parallelization, Test Replay, and analytics: the Starter plan includes
        500 test results a month, and Team ($799 per year) and Business ($3,199
        per year) each cover up to 50 users and 120,000 results, with extra
        results billed at $5 to $6 per 1,000. UI Coverage and Accessibility are
        add-ons without a public price.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
        Wopee.io is priced per user, with agent usage set by plan:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        . The units differ, so compare what usually costs the most: the
        engineering time spent writing and repairing specs. That is the work
        Wopee.io's agents are built to reduce, while your team still reviews
        the tests.
      </p>
    </div>
  </section>
);

const WopeeVsCypress = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Cypress: Cypress Alternative"
      description="Cypress alternative for web app testing: Wopee.io AI agents generate Playwright tests from your app. Honest comparison of pricing, maintenance, and tabs."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            Cypress
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            Cypress is a well-loved JavaScript testing framework with great
            debugging, excellent docs, and component testing. Wopee.io is a
            Cypress alternative of a different kind: AI testing agents explore
            your web app and generate Playwright tests your team reviews. You
            can also keep Cypress and add Wopee.io visual checks to it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-cypress-hero"
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
        subtitle="Where a hand-written Cypress suite and an agent-generated Playwright suite actually differ, from Cypress's own docs and pricing."
        leftLabel="Cypress"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Stick with Cypress when"
        stickItems={[
          "Your team is productive writing Cypress specs and relies on its time-travel debugging",
          "You use Cypress component testing for React, Vue, Angular, or Next.js",
          "The suite is stable and maintenance takes little of your week",
          "You want an MIT-licensed framework with no AI in the loop",
        ]}
        switchTitle="Switch to Wopee.io when"
        switchItems={[
          "Writing and repairing specs takes more time than building new coverage",
          "Critical flows span multiple tabs, origins, or iframes",
          "You want tests generated from your running app and reviewed, not written from scratch",
          "You want visual regression built in rather than bolted on",
          "You want Playwright code you can export and run without Wopee.io",
        ]}
      />

      <KeepCypress />

      <MigrationSteps />

      <PricingWedge />

      <CompareFaq
        title="Wopee.io vs Cypress: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: September 2026. Cypress details come from cypress.io, its pricing page, docs.cypress.io, and the Cypress changelog." />

      <CompareCta
        heading="Tired of repairing specs?"
        subheading="Start free and see generated tests today."
        ctaId="cta-vs-cypress-footer"
      />
    </Layout>
  );
};

export default WopeeVsCypress;
