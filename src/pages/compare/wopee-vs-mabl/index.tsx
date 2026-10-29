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
    left: "A low-code test automation platform with AI agents, auto-healing and GenAI assertions",
    right:
      "An AI testing agent for web apps: it explores your app from a URL, writes plain-language test cases and runs them in a real browser",
  },
  {
    aspect: "Pricing",
    left: "No published prices ('Request a Quote'); 14-day free trial; cloud runs use credits, from 500 per month; local runs are free",
    right:
      "Published: start free with no card, then 19, 79 or 179 € per user per month; Enterprise custom",
  },
  {
    aspect: "What you can test",
    left: "Web, native iOS and Android (paid add-on), API, performance and accessibility",
    right:
      "Web apps only: functional and visual tests in Chromium, Firefox and WebKit",
    edge: "left" as const,
  },
  {
    aspect: "Creating tests",
    left: "Low-code desktop app, plus test generation from natural language or Jira requirements",
    right:
      "Agents crawl the running app and generate user stories and test cases you review and edit; no recorder needed",
  },
  {
    aspect: "Deployment",
    left: "mabl cloud; mabl Link tunnels into private networks. We found no on-premise option on mabl's public pages",
    right:
      "Cloud in EU data centres by default; the full testing agent runs on-premise for Enterprise",
    edge: "right" as const,
  },
  {
    aspect: "Security paperwork",
    left: "SOC 2 Type II",
    right: "SOC 2 and ISO 27001 are on our roadmap; DPA available today",
    edge: "left" as const,
  },
  {
    aspect: "Test format and export",
    left: "Tests live in mabl; browser tests can be exported to Playwright (TypeScript) or Selenium IDE, with some step types unsupported",
    right:
      "Plain-language test cases in a Git repository your team can access, downloadable as JSON",
  },
  {
    aspect: "Coding-agent access",
    left: "Hosted MCP server (com.mabl/mcp): run tests, analyse failures, query results",
    right:
      "wopee-mcp server for Claude Code, Cursor, VS Code and Windsurf: dispatch agents, fetch results, file GitHub issues",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "What is the main difference between Wopee.io and mabl?",
    answer:
      "Scope and buying model. mabl is a broad, quote-priced platform for web, mobile, API, performance and accessibility testing, with SOC 2 Type II. Wopee.io focuses on web apps: its agent explores your app from a URL and writes and runs the tests, with published prices from 0 € and an on-premise option for Enterprise.",
  },
  {
    question: "How much does mabl cost compared with Wopee.io?",
    answer:
      "mabl does not publish prices. As of 29 October 2026 its pricing page says 'Request a Quote', offers a 14-day free trial and starts cloud test runs at 500 credits per month, with local runs free. Wopee.io publishes its prices: start free with no credit card, then Starter 19 €, Basic 79 € and Premium 179 € per user per month.",
    render: (
      <>
        mabl does not publish prices. As of 29 October 2026 its pricing page
        says 'Request a Quote', offers a 14-day free trial and starts cloud test
        runs at 500 credits per month, with local runs free. Wopee.io{" "}
        <Link href="/pricing/">publishes its prices</Link>: start free with no
        credit card, then Starter 19 €, Basic 79 € and Premium 179 € per user
        per month.
      </>
    ),
  },
  {
    question: "Can Wopee.io test mobile apps or APIs like mabl?",
    answer:
      "No. Wopee.io tests web applications in a browser. If you need native iOS and Android, API, or performance testing in the same platform, mabl covers them and Wopee.io does not.",
  },
  {
    question: "Can I export my tests from mabl or Wopee.io?",
    answer:
      "mabl can export browser tests to Playwright TypeScript or Selenium IDE format; its docs list step types that do not export, such as API steps and JavaScript snippets. Wopee.io test cases are plain-language files in a Git repository your team can access, downloadable as JSON. In both products, running the AI features stays a vendor service.",
  },
  {
    question: "Do both have an MCP server for AI coding agents?",
    answer:
      "Yes. mabl lists a hosted MCP server (com.mabl/mcp) in the official MCP Registry. Wopee.io ships wopee-mcp on npm for Claude Code, Cursor, VS Code and Windsurf, which can dispatch testing agents, fetch results and file GitHub issues from the editor.",
    render: (
      <>
        Yes. mabl lists a hosted MCP server (com.mabl/mcp) in the official MCP
        Registry. Wopee.io ships <Link href="/mcp/">wopee-mcp</Link> on npm for
        Claude Code, Cursor, VS Code and Windsurf, which can dispatch testing
        agents, fetch results and file GitHub issues from the editor.
      </>
    ),
  },
  {
    question: "Is Wopee.io SOC 2 certified like mabl?",
    answer:
      "Not yet. SOC 2 and ISO 27001 are on our roadmap. Wopee.io never trains models on your code or test data, keeps data in EU data centres by default, offers a DPA today, and runs on-premise for Enterprise.",
  },
];

const SOURCES = [
  { label: "mabl pricing (quote, trial, credits, local runs)", href: "https://www.mabl.com/pricing" },
  { label: "mabl homepage (web, mobile, API)", href: "https://www.mabl.com/" },
  { label: "mabl AI test automation (auto-healing, natural-language and Jira test creation)", href: "https://www.mabl.com/ai-test-automation" },
  { label: "mabl performance testing", href: "https://www.mabl.com/performance-testing" },
  { label: "mabl docs: exporting tests to Playwright and Selenium", href: "https://docs.mabl.com/docs/mabl-cli/exporting-tests-from-the-cli.md" },
  { label: "mabl docs: MCP server overview", href: "https://docs.mabl.com/docs/mabl-mcp/mabl-mcp-overview.md" },
  { label: "Official MCP Registry entry for mabl", href: "https://registry.modelcontextprotocol.io/v0/servers?search=mabl" },
  { label: "mabl help: secure tunnelling with mabl Link", href: "https://help.mabl.com/hc/en-us/articles/19078672070292-Secure-tunneling-with-mabl-Link" },
  { label: "mabl help: security and SOC 2 Type II", href: "https://help.mabl.com/hc/en-us/articles/19078147936660" },
  { label: "Wopee.io pricing", href: "https://wopee.io/pricing/" },
  { label: "Wopee.io security", href: "https://wopee.io/security/" },
  { label: "Wopee.io MCP server", href: "https://wopee.io/mcp/" },
];

const WopeeVsMabl = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs mabl"
      description="Wopee.io vs mabl, checked October 2026: quote-priced low-code platform for web, mobile and API vs a web-only AI testing agent with published pricing."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            mabl
          </h1>
          <p
            id="answer"
            className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center"
          >
            mabl is a mature low-code test automation platform for web, native
            mobile, API, performance and accessibility testing, sold by quote
            and backed by SOC 2 Type II. Wopee.io is an AI testing agent for web
            apps only: it explores your app from a URL, writes plain-language
            test cases and runs them, with published prices from 0 € and an
            on-premise option for Enterprise. Pick mabl for breadth and
            certifications; pick Wopee.io for a web app you want covered fast,
            at a price you can see.
          </p>
          <p className="text-sm opacity-60 m-0">
            Last checked: 29 October 2026, against mabl's and Wopee.io's public
            pages (sources below).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center sm:items-start mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-mabl-hero"
              />
              <span className="text-xs opacity-50">
                No credit card required
              </span>
            </div>
            <Link
              href="/compare/mabl-alternatives/"
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg flex items-center sm:h-[50px]"
            >
              All mabl alternatives &rarr;
            </Link>
          </div>
        </div>
      </div>

      <ComparisonTable
        title="Wopee.io vs mabl at a glance"
        subtitle="From each vendor's public pages. 'Stronger here' marks only the rows where one side clearly leads."
        leftLabel="mabl"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Pick mabl when"
        stickItems={[
          "You test native mobile apps, APIs or performance alongside the web, and want one platform for all of it",
          "Procurement needs SOC 2 Type II today",
          "Your testers prefer a low-code editor and you want tests exportable to Playwright or Selenium IDE",
          "Many people across the team will take part, and per-user pricing would hurt",
        ]}
        switchTitle="Pick Wopee.io when"
        switchItems={[
          "Your product is a web app and you want coverage from a URL, without recording tests first",
          "You want the price on the page and a free start before any sales call",
          "The whole testing agent has to run on-premise, or data must stay in the EU by default",
          "You want a pass the agent could not prove to show as Incomplete, not green",
          "Your developers work in Claude Code or Cursor and want testing agents from the editor via MCP",
        ]}
      />

      <CompareFaq
        title="Wopee.io vs mabl: frequently asked questions"
        faqs={FAQS}
      />

      <CompareSources checked="29 October 2026" sources={SOURCES} />

      <LastChecked note="Last checked: 29 October 2026. mabl details come from mabl.com, docs.mabl.com, help.mabl.com and the official MCP Registry." />

      <CompareCta
        heading="See it on your own app."
        subheading="Start free and get your first generated tests today."
        ctaId="cta-vs-mabl-footer"
      />
    </Layout>
  );
};

export default WopeeVsMabl;
