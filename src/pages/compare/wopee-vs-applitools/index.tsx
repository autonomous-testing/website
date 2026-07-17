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
    aspect: "Pricing",
    left: "'Custom / Contact us' on all three tiers; subscriptions sized in proprietary 'Test Units'",
    right: "Published: start free, then 19 to 179 € per user per month",
  },
  {
    aspect: "On-premise",
    left: "Optional add-on for Applitools Eyes only — not offered for Autonomous",
    right:
      "Full testing agent runs on-premise for Enterprise; EU-region cloud by default",
  },
  {
    aspect: "Test creation",
    left: "No-code recorder and plain-English steps, corrected by an LLM",
    right:
      "Goal-driven agents explore your app and generate user stories, test cases, and Playwright code",
  },
  {
    aspect: "AI approach",
    left: "'Deterministic AI' manifesto on the homepage; LLM-driven authoring in the product",
    right:
      "LLMs author, deterministic Playwright code executes — no LLM needed at runtime",
  },
  {
    aspect: "Visual testing",
    left: "Visual AI built over a decade — their strongest asset",
    right:
      "Visual baselines with branching, ignore areas, diff tolerance, and cross-browser configs",
  },
  {
    aspect: "Code ownership",
    left: "No-code tests managed inside the Applitools platform",
    right: "Playwright code committed to a Git repo you own",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "How much does Applitools Autonomous cost?",
    answer:
      "Applitools does not publish prices. As of July 2026, every tier on its pricing page — Starter, Public Cloud, and Dedicated Cloud — shows 'Custom / Contact us', with subscriptions sized in proprietary Test Units. Wopee.io publishes its pricing: start free, then 19 to 179 € per user per month.",
    render: (
      <>
        Applitools does not publish prices. As of July 2026, every tier on its
        pricing page — Starter, Public Cloud, and Dedicated Cloud — shows
        'Custom / Contact us', with subscriptions sized in proprietary Test
        Units. Wopee.io publishes its pricing:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can Applitools Autonomous run on-premise?",
    answer:
      "On the Applitools site, on-premise is an optional add-on for Applitools Eyes only — it is not offered for Autonomous. Wopee.io Enterprise runs the full testing agent on-premise, with EU-region cloud as the default deployment.",
  },
  {
    question: "What is Applitools better at?",
    answer:
      "Visual AI depth. Applitools has built visual testing algorithms for a decade, holds SOC 2 Type II and ISO 27001 certifications, and serves a large enterprise base with named case studies. If your need is purely visual validation on an existing coded suite, Applitools Eyes is a strong choice.",
  },
  {
    question: "Is Wopee.io SOC 2 certified?",
    answer:
      "Not yet — SOC 2 and ISO 27001 are on our roadmap. Wopee.io never trains models on your code or test data, stores data in EU data centers by default, and offers on-premise deployment for Enterprise.",
  },
];

const PricingWedge = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
          The pricing page test
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Open both pricing pages side by side. Applitools shows 'Custom /
          Contact us' on Starter, Public Cloud, and Dedicated Cloud alike, and
          sizes subscriptions in 'Test Units' — a metric only Applitools can
          calculate. Its own pricing FAQ includes 'Is Applitools expensive?'
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Wopee.io's numbers are public:{" "}
          <Link href="/pricing/">
            start free, Starter 19 €, Basic 79 €, Premium 179 € per user per
            month
          </Link>
          , Enterprise custom — with a 14-day money-back guarantee. You can
          budget before you ever talk to us.
        </p>
        <ButtonPrimary
          label="Start for free"
          href={loginUrl}
          className="w-60 h-[50px]"
          id="cta-vs-applitools-pricing"
        />
        <p className="text-sm italic mt-2">No credit card required</p>
      </div>
    </section>
  );
};

const WopeeVsApplitools = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Applitools Autonomous"
      description="Wopee.io vs Applitools Autonomous: published 19–179 € pricing vs quote-gated tiers, full agent on-premise vs Eyes-only add-on, and honest strengths of each."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            Applitools Autonomous
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            Applitools Autonomous and Wopee.io both promise AI-powered
            end-to-end testing, but they differ where it costs you: pricing
            and deployment. Applitools shows 'Custom / Contact us' on every
            tier and offers on-premise only as an Eyes add-on. Wopee.io
            publishes its prices — free start, then 19 to 179 € per user per
            month — runs its agent on-premise for Enterprise, and commits
            generated Playwright code to your repo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-applitools-hero"
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
        subtitle="Where the two platforms actually differ — from their own public pages."
        leftLabel="Applitools Autonomous"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Stick with Applitools when"
        stickItems={[
          "You run a large coded-test estate on Applitools Eyes and its mature Visual AI is doing the heavy lifting",
          "Unlimited-user licensing matters more to you than a published price",
          "Procurement requires SOC 2 Type II and ISO 27001 certification today",
          "You want named enterprise case studies and a dedicated customer success engineer",
        ]}
        switchTitle="Switch to Wopee.io when"
        switchItems={[
          "You want the price on the page before talking to anyone",
          "Your on-premise requirement covers the whole testing agent, not only visual validation",
          "You want goal-driven exploration that builds test suites from a URL",
          "You want the generated tests as Playwright code in your own Git repo",
          "EU data residency by default matters to your compliance team",
        ]}
      />

      <PricingWedge />

      <CompareFaq
        title="Wopee.io vs Applitools: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: July 2026. Applitools details come from applitools.com public pages, including its platform-pricing and Autonomous product pages." />

      <CompareCta
        heading="No Test Units. No quote call."
        subheading="Start free and see your first tests today."
        ctaId="cta-vs-applitools-footer"
      />
    </Layout>
  );
};

export default WopeeVsApplitools;
