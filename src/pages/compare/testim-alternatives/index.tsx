import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import AlternativesTable from "@site/src/components/compare-page/AlternativesTable";
import CompareFaq, {
  CompareFaqItem,
} from "@site/src/components/compare-page/CompareFaq";
import CompareCta from "@site/src/components/compare-page/CompareCta";
import CompareSources from "@site/src/components/compare-page/CompareSources";
import LastChecked from "@site/src/components/compare-page/LastChecked";
import { ALT, sourcesFor } from "@site/src/components/compare-page/alternatives";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";

const ITEMS = [
  {
    ...ALT.wopee,
    pickWhen:
      "You test a web app and want an agent to generate the tests from the running app instead of recording them, with prices on the page. Not for Salesforce-specific or native mobile testing.",
  },
  {
    ...ALT.mabl,
    pickWhen:
      "You want a low-code platform that also covers native mobile, API, performance and accessibility, and SOC 2 Type II.",
  },
  {
    ...ALT.katalon,
    pickWhen:
      "You want record-and-replay plus real code (Groovy or Java) in one IDE, across web, mobile, API and desktop.",
  },
  {
    ...ALT.testsigma,
    pickWhen:
      "Salesforce coverage is the reason you chose Testim, and you want plain-English tests with an on-prem option.",
  },
  {
    ...ALT.testrigor,
    pickWhen:
      "Non-engineers write the tests in plain English, including email, SMS or 2FA steps.",
  },
  {
    ...ALT.qawolf,
    pickWhen:
      "You would rather a service writes and maintains the suite, and you want the Playwright code.",
  },
  {
    ...ALT.momentic,
    pickWhen:
      "Developers want plain-English tests in the repo, a CLI gate in CI and usage-based pricing.",
  },
  {
    ...ALT.playwright,
    pickWhen:
      "Your team already exports Testim tests to Playwright and wants to own the code and the AI tooling.",
  },
];

const SOURCE_KEYS = [
  "testim",
  "wopee",
  "mabl",
  "katalon",
  "testsigma",
  "testrigor",
  "qawolf",
  "momentic",
  "playwright",
];

const TESTIM_SOURCES = [
  {
    label: "Tricentis news: Tricentis acquires Testim (2022)",
    href: "https://www.tricentis.com/news/tricentis-acquires-ai-based-saas-test-automation-platform-testim",
  },
  {
    label: "Tricentis docs: exporting a Testim test as Playwright code",
    href: "https://docs.tricentis.com/testim/content/administration/exporting-a-testim-test-as-code-for-playwright.htm",
  },
  {
    label: "Tricentis docs: Testim changelog",
    href: "https://docs.tricentis.com/testim/content/overview/changelog.htm",
  },
  {
    label: "Tricentis security (SOC 2 Type 2 scope includes Testim)",
    href: "https://security.tricentis.com",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "Is Testim still available?",
    answer:
      "Yes. As of 29 October 2026, Testim is sold as Tricentis Testim for web, mobile and Salesforce, and its pricing page still offers a free Community plan. Its public changelog has no entries after June 2025, and its help centre now redirects to Tricentis documentation.",
  },
  {
    question: "What is the best Testim alternative?",
    answer:
      "It depends on what you used Testim for. For web apps with published pricing and tests generated from the running app, Wopee.io. For Salesforce, Testsigma. For a broader low-code platform, mabl. For record-and-replay plus code, Katalon. For a managed service, QA Wolf. For an open-source route, Playwright Test Agents.",
  },
  {
    question: "Can I take my Testim tests with me?",
    answer:
      "Partly. Tricentis documents an export of a Testim test as Playwright code, and notes the code may need manual adjustments. Plain Playwright code then runs without Testim, or can be a starting point for another tool.",
  },
  {
    question: "Which Testim alternatives publish their prices?",
    answer:
      "As of 29 October 2026: Wopee.io (free, then 19 to 179 € per user per month), Katalon (Free, then Professional at a $2,199 per seat per year list price), QA Wolf ($1 per web run) and Momentic (free tier, then from $125 a month). Testim, mabl, Testsigma and testRigor quote on request.",
    render: (
      <>
        As of 29 October 2026: Wopee.io (
        <Link href="/pricing/">free, then 19 to 179 € per user per month</Link>
        ), Katalon (Free, then Professional at a $2,199 per seat per year list
        price), QA Wolf ($1 per web run) and Momentic (free tier, then from
        $125 a month). Testim, mabl, Testsigma and testRigor quote on request.
      </>
    ),
  },
  {
    question: "Is Wopee.io a fair pick on its own list?",
    answer:
      "We build Wopee.io, so read this page with that in mind. Every fact about the other tools links to their own pages, and each row says when to pick that tool instead. If you test Salesforce or native mobile apps, another tool on this list fits better than Wopee.io.",
  },
];

const TestimAlternatives = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Testim Alternatives in 2026"
      description="Testim alternatives, checked October 2026: Wopee.io, mabl, Katalon, Testsigma, testRigor, QA Wolf, Momentic and Playwright, with pricing and when to pick each."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            <span className="text-secondary-wopee dark:text-primary-wopee">
              Testim alternatives
            </span>{" "}
            in 2026
          </h1>
          <p
            id="answer"
            className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center"
          >
            The main alternatives to Tricentis Testim are Wopee.io, mabl,
            Katalon, Testsigma, testRigor, QA Wolf, Momentic and Playwright
            Test Agents. Which fits depends on what Testim did for you:
            Salesforce coverage, recorded tests with self-healing locators, or
            fast web coverage. We build Wopee.io, an AI testing agent for web
            apps, so it is first here; every row links its sources and says
            when another tool fits better.
          </p>
          <p className="text-sm opacity-60 m-0">
            Last checked: 29 October 2026, against each vendor's public pages
            (sources below).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center sm:items-start mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-testim-alt-hero"
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

      <section className="w-full flex flex-col items-center py-16 px-4 bg-slate-50 dark:bg-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-6">
            Where Testim stands today
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
            Tricentis acquired Testim in 2022 and still sells it for web,
            mobile and Salesforce, with AI smart locators that self-heal and a
            free Community plan. Its SOC 2 Type 2 report covers Testim, and
            tests can be exported as Playwright code.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
            Two things to know before you plan: Testim's public changelog has
            no entries after June 2025, and its help centre now redirects to
            Tricentis documentation. Neither means the product is ending; it is
            worth asking your Tricentis contact about the roadmap.
          </p>
        </div>
      </section>

      <AlternativesTable
        title="Alternatives to Testim, side by side"
        subtitle="Not a ranking. Facts from each vendor's own pages, linked below."
        items={ITEMS}
      />

      <CompareFaq
        title="Testim alternatives: frequently asked questions"
        faqs={FAQS}
      />

      <CompareSources
        checked="29 October 2026"
        sources={[...sourcesFor(SOURCE_KEYS), ...TESTIM_SOURCES]}
      />

      <LastChecked note="Last checked: 29 October 2026. Prices and plans change; each vendor's own page is the source of truth." />

      <CompareCta
        heading="Testing a web app?"
        subheading="Start free and see generated tests on your app today."
        ctaId="cta-testim-alt-footer"
      />
    </Layout>
  );
};

export default TestimAlternatives;
