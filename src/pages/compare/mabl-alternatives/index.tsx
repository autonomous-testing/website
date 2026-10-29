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
      "Your product is a web app, you want tests generated from the running app, and you want the price on the page. Not for native mobile or API testing.",
  },
  {
    ...ALT.testim,
    pickWhen:
      "You test Salesforce, or your team likes recording tests in the browser with self-healing locators.",
  },
  {
    ...ALT.katalon,
    pickWhen:
      "You need web, mobile, API and Windows desktop in one tool, and engineers who want Selenium and Appium scripts.",
  },
  {
    ...ALT.testsigma,
    pickWhen:
      "You want plain-English tests across web, mobile, Salesforce and SAP, with an on-prem option.",
  },
  {
    ...ALT.testrigor,
    pickWhen:
      "Non-engineers write the tests, and your flows include email, SMS or 2FA steps.",
  },
  {
    ...ALT.qawolf,
    pickWhen:
      "You would rather hand testing to a service and keep the Playwright code it writes.",
  },
  {
    ...ALT.momentic,
    pickWhen:
      "A developer team wants plain-English tests in the repo and a CLI check in CI, with usage-based pricing.",
  },
  {
    ...ALT.playwright,
    pickWhen:
      "Your engineers already write Playwright and want AI help without a vendor, and you will run the infrastructure.",
  },
];

const SOURCE_KEYS = [
  "mabl",
  "wopee",
  "testim",
  "katalon",
  "testsigma",
  "testrigor",
  "qawolf",
  "momentic",
  "playwright",
];

const FAQS: CompareFaqItem[] = [
  {
    question: "What is the best mabl alternative?",
    answer:
      "It depends on why you are leaving. For a web app with published pricing and tests generated from the running app, Wopee.io. For Salesforce, Tricentis Testim or Testsigma. For mobile, API and desktop in one IDE, Katalon. For a managed service, QA Wolf. For an open-source route, Playwright Test Agents.",
  },
  {
    question: "Which mabl alternatives publish their prices?",
    answer:
      "As of 29 October 2026: Wopee.io (free, then 19 to 179 € per user per month), Katalon (Free, then Professional at a $2,199 per seat per year list price), QA Wolf ($1 per web run) and Momentic (free tier, then from $125 a month). mabl, Testim, Testsigma and testRigor quote on request.",
    render: (
      <>
        As of 29 October 2026: Wopee.io (
        <Link href="/pricing/">free, then 19 to 179 € per user per month</Link>
        ), Katalon (Free, then Professional at a $2,199 per seat per year list
        price), QA Wolf ($1 per web run) and Momentic (free tier, then from
        $125 a month). mabl, Testim, Testsigma and testRigor quote on request.
      </>
    ),
  },
  {
    question: "Is there a free alternative to mabl?",
    answer:
      "Yes. Playwright Test Agents are free and open source, if you supply the LLM and the infrastructure. Wopee.io, Katalon, Momentic and Testim have free plans with limits, and testRigor's free plan makes your tests public.",
  },
  {
    question: "Which mabl alternative covers mobile apps?",
    answer:
      "Katalon, Testim, Testsigma, testRigor and QA Wolf all test mobile apps, and Momentic lists iOS in beta. Wopee.io tests web apps only.",
  },
  {
    question: "Is Wopee.io a fair pick on its own list?",
    answer:
      "We build Wopee.io, so read this page with that in mind. Every fact about the other tools links to their own pages, and each row says when to pick that tool instead. If you need native mobile, API or performance testing, mabl or another tool on this list fits better than Wopee.io.",
  },
];

const MablAlternatives = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="mabl Alternatives in 2026"
      description="mabl alternatives, checked October 2026: Wopee.io, Testim, Katalon, Testsigma, testRigor, QA Wolf, Momentic and Playwright, with pricing and when to pick each."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            <span className="text-secondary-wopee dark:text-primary-wopee">
              mabl alternatives
            </span>{" "}
            in 2026
          </h1>
          <p
            id="answer"
            className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center"
          >
            The main alternatives to mabl are Wopee.io, Tricentis Testim,
            Katalon, Testsigma, testRigor, QA Wolf, Momentic and Playwright
            Test Agents. The right one depends on why you are leaving mabl: a
            price you can see, code you keep, a managed service, or self-hosting.
            We build Wopee.io, an AI testing agent for web apps, so it is first
            here; every row links its sources and says when another tool fits
            better.
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
                id="cta-mabl-alt-hero"
              />
              <span className="text-xs opacity-50">
                No credit card required
              </span>
            </div>
            <Link
              href="/compare/wopee-vs-mabl/"
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg flex items-center sm:h-[50px]"
            >
              Wopee.io vs mabl in detail &rarr;
            </Link>
          </div>
        </div>
      </div>

      <section className="w-full flex flex-col items-center py-16 px-4 bg-slate-50 dark:bg-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-6">
            What mabl does well
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
            {ALT.mabl.what} It holds SOC 2 Type II, offers a hosted MCP server,
            and can export browser tests to Playwright or Selenium IDE. It
            publishes no prices: it quotes on request, offers a 14-day trial
            and bills cloud runs in credits (from 500 a month), while local
            runs are free.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
            Before you switch, write down what you would lose: mobile, API or
            performance coverage that the alternative may not have, and the
            tests you would need to rebuild.
          </p>
        </div>
      </section>

      <AlternativesTable
        title="Alternatives to mabl, side by side"
        subtitle="Not a ranking. Facts from each vendor's own pages, linked below."
        items={ITEMS}
      />

      <CompareFaq title="mabl alternatives: frequently asked questions" faqs={FAQS} />

      <CompareSources checked="29 October 2026" sources={sourcesFor(SOURCE_KEYS)} />

      <LastChecked note="Last checked: 29 October 2026. Prices and plans change; each vendor's own page is the source of truth." />

      <CompareCta
        heading="Testing a web app?"
        subheading="Start free and see generated tests on your app today."
        ctaId="cta-mabl-alt-footer"
      />
    </Layout>
  );
};

export default MablAlternatives;
