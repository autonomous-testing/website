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
    aspect: "Scope",
    left: "200+ enterprise technologies: SAP, Oracle, Salesforce, Workday, desktop, mainframe, APIs",
    right: "Web apps, tested autonomously end to end",
  },
  {
    aspect: "Pricing",
    left: "Quote-based; tricentis.com has no pricing page (it returns a 404), trial by request form",
    right: "Published: start free, then 19 to 179 € per user per month",
  },
  {
    aspect: "Test creation",
    left: "Model-based and codeless; Tosca Copilot and agentic generation from natural language",
    right:
      "Goal-driven agents explore your app from a URL and generate user stories, test cases, and Playwright code",
  },
  {
    aspect: "Platform",
    left: "Windows-only tooling; even Tosca Cloud's local execution agents require Windows",
    right: "Browser-based SaaS; nothing to install",
  },
  {
    aspect: "Test ownership",
    left: "Model artifacts in a proprietary repository; exports target another Tosca repository",
    right: "Deterministic Playwright code you can export and run without Wopee.io",
  },
  {
    aspect: "Onboarding",
    left: "A vendor-supported transformation program: Academy training, certification levels, consulting",
    right: "Self-serve: point it at a URL and review the first tests the same day",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "How much does Tricentis Tosca cost?",
    answer:
      "Tricentis does not publish Tosca pricing; as of August 2026 tricentis.com has no pricing page and trials are requested through a sales form. Third-party buyer guides report typical contracts from tens of thousands of euros per year. Wopee.io publishes its pricing: start free, then 19 to 179 € per user per month.",
    render: (
      <>
        Tricentis does not publish Tosca pricing; as of August 2026
        tricentis.com has no pricing page and trials are requested through a
        sales form. Third-party buyer guides report typical contracts from
        tens of thousands of euros per year. Wopee.io publishes its pricing:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can Tosca tests run outside Tosca?",
    answer:
      "Tosca tests are model artifacts stored in a Tosca repository, not code. The documented export path is a subset that imports into another Tosca repository, and there is no native export to open-source code. A migration-services market exists specifically to convert Tosca suites to frameworks like Playwright.",
  },
  {
    question: "Is Tosca better for SAP and enterprise stacks?",
    answer:
      "Honestly: yes. Tosca has purpose-built support for SAP, Oracle, Salesforce, desktop, and mainframe applications, and its agentic test generation launched with SAP Fiori as the first focus. If your testing estate centers on those systems, Tosca is built for it. Wopee.io focuses on web applications and does that autonomously.",
  },
  {
    question: "Does Wopee.io do model-based testing?",
    answer:
      "No. Wopee.io agents explore your running web app and generate user stories, test cases, and Playwright code as reviewable, editable artifacts. There is no model repository to build or maintain, and the output is code your team can read, version, and export.",
  },
];

const PricingWedge = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
          Enterprise procurement or a credit card you never need
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Buying Tosca is a project: a sales conversation, a quote, and a
          rollout program with training and certifications. That is a
          reasonable trade for a platform that must cover SAP, mainframes,
          and 200+ technologies at once.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Testing a web app should not require any of it. Wopee.io is{" "}
          <Link href="/pricing/">
            free to start, then 19 to 179 € per user per month
          </Link>
          , self-serve from the first click, and the generated tests are
          Playwright code you can export whenever you want.
        </p>
        <ButtonPrimary
          label="Start for free"
          href={loginUrl}
          className="w-60 h-[50px]"
          id="cta-vs-tosca-pricing"
        />
        <p className="text-sm italic mt-2">No credit card required</p>
      </div>
    </section>
  );
};

const WopeeVsTosca = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Tricentis Tosca"
      description="Wopee.io vs Tricentis Tosca: published pricing and self-serve web app testing vs a quote-based enterprise suite spanning SAP, desktop, and 200+ technologies."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            Tricentis Tosca
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            Tosca is the enterprise heavyweight: model-based, codeless test
            automation across 200+ technologies from SAP to mainframes, sold
            by quote and rolled out as a program. Wopee.io is the opposite
            shape: autonomous testing for web apps, self-serve, with
            published pricing and generated Playwright code you can export.
            Which one fits depends on what you actually need to test.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-tosca-hero"
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
        subtitle="Where the two platforms actually differ, from Tricentis's own public pages."
        leftLabel="Tricentis Tosca"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Stick with Tosca when"
        stickItems={[
          "Your testing estate spans SAP, Oracle, Salesforce, desktop, or mainframe systems",
          "You want one enterprise vendor for UI, API, data integrity, and service virtualization",
          "A supported rollout with training, certifications, and consulting is a feature, not a cost",
          "Codeless, model-based authoring by business users is your operating model",
        ]}
        switchTitle="Switch to Wopee.io when"
        switchItems={[
          "You test web applications and want them covered autonomously, starting today",
          "You want the price on the page before any sales conversation",
          "Tests should be open Playwright code you can export, not artifacts in a proprietary repository",
          "Your team is not on Windows and does not want Windows-only tooling",
          "You'd rather review generated tests than build and maintain a test model",
        ]}
      />

      <PricingWedge />

      <CompareFaq
        title="Wopee.io vs Tosca: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: August 2026. Tosca details come from tricentis.com product pages and documentation; contract-size figures are third-party reports, labeled as such." />

      <CompareCta
        heading="Web app to test? Skip the procurement cycle."
        subheading="Start free and see generated tests today."
        ctaId="cta-vs-tosca-footer"
      />
    </Layout>
  );
};

export default WopeeVsTosca;
