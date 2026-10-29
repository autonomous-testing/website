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
import CompareSources from "@site/src/components/compare-page/CompareSources";
import LastChecked from "@site/src/components/compare-page/LastChecked";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";

const TLDR_ROWS = [
  {
    aspect: "What it is",
    left: "Katalon True: Katalon Studio (a desktop IDE) plus TestOps, TestCloud and TrueTest",
    right:
      "An AI testing agent for web apps, used from the browser or from your coding agent via MCP",
  },
  {
    aspect: "What you can test",
    left: "Web, mobile (Appium), API and Windows desktop apps",
    right:
      "Web apps only: functional and visual tests in Chromium, Firefox and WebKit",
    edge: "left" as const,
  },
  {
    aspect: "Creating tests",
    left: "Record and replay, built-in keywords, Groovy or Java code, or the Katalon AI agent from a Jira ticket or description",
    right:
      "Agents crawl the running app and generate user stories and test cases in plain language, which you review and edit",
  },
  {
    aspect: "Under the hood",
    left: "Built on Selenium and Appium; scripts you write are yours to read and debug",
    right:
      "An AI agent runs every test, so tests adapt to UI changes; runs take minutes and results can vary between runs",
  },
  {
    aspect: "Pricing",
    left: "Free (local runs only); Professional list price $2,199 per seat per year, billed annually; Enterprise custom. CI/CD and cloud runs need Runtime Engine and TestCloud add-ons",
    right:
      "Free to start, no card; Starter 19 €, Basic 79 €, Premium 179 € per user per month, monthly or annual; Enterprise custom",
  },
  {
    aspect: "Deployment",
    left: "Cloud with US or EU hosting; private cloud or on-premises on Enterprise",
    right:
      "Cloud in EU data centres by default; on-premise for Enterprise",
  },
  {
    aspect: "Security paperwork",
    left: "ISO/IEC 27001, 27017 and 42001 certified; SOC 2 Type II attestation",
    right: "SOC 2 and ISO 27001 are on our roadmap; DPA available today",
    edge: "left" as const,
  },
  {
    aspect: "Coding-agent access",
    left: "Katalon True MCP Server (Professional and Enterprise)",
    right:
      "wopee-mcp on npm for Claude Code, Cursor, VS Code and Windsurf",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "What is the main difference between Wopee.io and Katalon?",
    answer:
      "Katalon is a broad test automation suite with a desktop IDE, built on Selenium and Appium, covering web, mobile, API and Windows desktop. Wopee.io is a web-only AI testing agent: it explores your app from a URL, writes plain-language test cases and runs them for you, with no IDE to install.",
  },
  {
    question: "How much does Katalon cost compared with Wopee.io?",
    answer:
      "As of 29 October 2026, Katalon has a Free plan for local runs, Professional at a list price of $2,199 per seat per year billed annually (shown struck through next to a $1,000 offer on the first 3 seats that ran until 31 October), and custom Enterprise pricing. CI/CD and cloud runs need Runtime Engine and TestCloud add-ons. Wopee.io starts free, then Starter 19 €, Basic 79 € and Premium 179 € per user per month.",
    render: (
      <>
        As of 29 October 2026, Katalon has a Free plan for local runs,
        Professional at a list price of $2,199 per seat per year billed
        annually (shown struck through next to a $1,000 offer on the first 3
        seats that ran until 31 October), and custom Enterprise pricing. CI/CD
        and cloud runs need Runtime Engine and TestCloud add-ons. Wopee.io{" "}
        <Link href="/pricing/">starts free</Link>, then Starter 19 €, Basic 79 €
        and Premium 179 € per user per month.
      </>
    ),
  },
  {
    question: "Is Katalon better than Wopee.io for mobile and desktop apps?",
    answer:
      "Yes. Katalon Studio tests mobile apps through Appium and Windows desktop apps (UWP, WinForms, WPF and Win32). Wopee.io tests web applications only.",
  },
  {
    question: "Do I need to write code with either tool?",
    answer:
      "No, but the models differ. Katalon offers record and replay and keywords, with Groovy or Java when you need more, and its AI agent can draft scripts. Wopee.io test cases are written in plain language by the agent, and you edit them as text.",
  },
  {
    question: "Can both run on-premise?",
    answer:
      "Yes, on their Enterprise plans. Katalon offers private cloud or on-premises deployment and air-gapped activation. Wopee.io Enterprise runs the full testing agent on-premise, with EU data centres as the cloud default.",
  },
];

const SOURCES = [
  { label: "Katalon pricing (Free, Professional, Enterprise, add-ons)", href: "https://katalon.com/pricing" },
  { label: "Katalon homepage (Katalon True products)", href: "https://katalon.com/" },
  { label: "Katalon Studio product page (test types, authoring, Selenium and Appium)", href: "https://katalon.com/katalon-studio" },
  { label: "Katalon docs: supported environments", href: "https://docs.katalon.com/katalon-studio/supported-environments-for-katalon-studio-and-katalon-runtime-engine-kre" },
  { label: "Katalon docs: Katalon True MCP Server", href: "https://docs.katalon.com/katalon-platform/testops-mcp-server" },
  { label: "Katalon security (hosting regions, certifications)", href: "https://katalon.com/security" },
  { label: "Wopee.io pricing", href: "https://wopee.io/pricing/" },
  { label: "Wopee.io security", href: "https://wopee.io/security/" },
  { label: "Wopee.io MCP server", href: "https://wopee.io/mcp/" },
];

const WopeeVsKatalon = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Katalon"
      description="Wopee.io vs Katalon, checked October 2026: a desktop IDE for web, mobile, API and desktop vs a web-only AI testing agent. Pricing, deployment and fit."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            Katalon
          </h1>
          <p
            id="answer"
            className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center"
          >
            Katalon is a broad test automation suite: a desktop IDE built on
            Selenium and Appium for web, mobile, API and Windows desktop tests,
            written by recording, keywords or Groovy and Java code. Wopee.io is
            an AI testing agent for web apps only: it explores your app from a
            URL, writes plain-language test cases and runs them, with no IDE
            to install. Pick Katalon when you test more than the web or want
            scripts your engineers own; pick Wopee.io when you want web
            coverage without building and maintaining scripts.
          </p>
          <p className="text-sm opacity-60 m-0">
            Last checked: 29 October 2026, against Katalon's and Wopee.io's
            public pages (sources below).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center sm:items-start mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-katalon-hero"
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
        title="Wopee.io vs Katalon at a glance"
        subtitle="From each vendor's public pages. 'Stronger here' marks only the rows where one side clearly leads."
        leftLabel="Katalon"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Pick Katalon when"
        stickItems={[
          "You test mobile, API or Windows desktop apps as well as the web",
          "Your engineers want Selenium and Appium scripts they can read, debug and extend in Groovy or Java",
          "Procurement needs ISO 27001 and SOC 2 Type II today",
          "You want a free desktop tool for local runs before buying anything",
        ]}
        switchTitle="Pick Wopee.io when"
        switchItems={[
          "Your product is a web app and you want tests generated from the running app, not recorded or coded",
          "You don't want to maintain locators and scripts when the UI changes",
          "You want CI runs on every paid plan without a separate runtime add-on",
          "Your developers work in Claude Code or Cursor and want testing agents from the editor via MCP",
          "EU data residency by default matters to your compliance team",
        ]}
      />

      <CompareFaq
        title="Wopee.io vs Katalon: frequently asked questions"
        faqs={FAQS}
      />

      <CompareSources checked="29 October 2026" sources={SOURCES} />

      <LastChecked note="Last checked: 29 October 2026. Katalon details come from katalon.com and docs.katalon.com. Katalon's Professional price was on a promotion until 31 October 2026; check its pricing page for today's figure." />

      <CompareCta
        heading="No IDE to install."
        subheading="Start free and see generated tests on your app today."
        ctaId="cta-vs-katalon-footer"
      />
    </Layout>
  );
};

export default WopeeVsKatalon;
