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
    aspect: "What it is",
    left: "The free Playwright toolkit: test runner, codegen recorder, trace viewer, and Test Agents definitions",
    right:
      "An autonomous platform that generates, runs, and maintains Playwright tests for you",
  },
  {
    aspect: "Test creation",
    left: "Codegen records as you click; Test Agents plan and generate tests, driven by your own AI tool and LLM account",
    right:
      "Goal-driven agents explore your app and generate user stories, test cases, and Playwright code, no LLM account needed",
  },
  {
    aspect: "Orchestration",
    left: "You assemble the loop: pick an AI tool, wire the agents, review the output",
    right: "Managed pipeline from a URL to reviewed, versioned suites",
  },
  {
    aspect: "Visual testing",
    left: "Pixel diffs via toHaveScreenshot; baselines are PNG files reviewed in git",
    right:
      "AI visual baselines with a review UI, branching, ignore areas, and diff tolerance",
  },
  {
    aspect: "Execution",
    left: "Your machines or CI; Microsoft's hosted browsers are a separate paid Azure service",
    right: "Hosted EU-cloud runs and scheduling; on-premise for Enterprise",
  },
  {
    aspect: "Maintenance",
    left: "The healer agent repairs failing tests on demand, through your AI tool",
    right: "Runtime self-healing, plus honest failures with evidence attached",
  },
  {
    aspect: "Price",
    left: "Free, Apache-2.0 open source",
    right: "Start free, then 19 to 179 € per user per month, published",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "Does Wopee.io replace Playwright?",
    answer:
      "No, it builds on it. Wopee.io agents generate deterministic Playwright code, and the exported tests run with the standard Playwright CLI, no LLM and no Wopee.io runtime required. Playwright is the foundation; Wopee.io is the autonomous layer on top.",
  },
  {
    question: "What are Playwright Test Agents?",
    answer:
      "Since Playwright 1.56, Microsoft ships three agent definitions: a planner that explores your app, a generator that turns plans into test files, and a healer that repairs failing tests. They run inside your own AI tool (VS Code, Claude Code, Codex, or OpenCode) with your own LLM account. Powerful building blocks, but you supply the LLM, the orchestration, and the review process.",
  },
  {
    question: "Is the Playwright CLI really free?",
    answer:
      "Yes. Playwright is Apache-2.0 open source, maintained by Microsoft, including codegen, the trace viewer, and Test Agents. The costs are indirect: engineering time to build and run the loop, your LLM subscription for agentic workflows, and infrastructure for execution at scale. Microsoft's hosted-browser service (Playwright Workspaces on Azure) is paid and separate.",
  },
  {
    question: "Can I run Wopee.io tests with the Playwright CLI?",
    answer:
      "Yes. Exported Wopee.io tests are plain Playwright code: npx playwright test runs them anywhere the standard CLI works, in your CI, on your machines, with no Wopee.io dependency.",
  },
];

const BetterTogether = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
          Same foundation, different altitude
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          This page is not Playwright versus a rival. Wopee.io generates
          Playwright code, and everything you export runs with the standard
          Playwright CLI. The real question is who operates the loop around
          the framework: your engineers with their own AI tooling, or a
          managed platform with hosted agents, visual baselines, scheduling,
          and team review built in.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Playwright gives you the parts. Wopee.io ships the machine.
        </p>
        <ButtonPrimary
          label="Start for free"
          href={loginUrl}
          className="w-60 h-[50px]"
          id="cta-vs-pwcli-together"
        />
        <p className="text-sm italic mt-2">No credit card required</p>
      </div>
    </section>
  );
};

const WopeeVsPlaywrightCli = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Playwright CLI"
      description="Wopee.io vs the Playwright CLI and Test Agents: free DIY toolkit with your own LLM and orchestration, or a managed autonomous testing platform on the same foundation."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            Playwright CLI
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            The Playwright CLI is the best free testing toolkit on the web:
            runner, codegen, trace viewer, and, since v1.56, Test Agents that
            plan, generate, and heal tests through your own AI tool. Wopee.io
            builds on the same foundation and operates the whole loop for you:
            autonomous generation from a URL, hosted runs, visual baselines,
            and team review, with Playwright code you can export at any time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-pwcli-hero"
              />
              <span className="text-xs opacity-50">
                No credit card required
              </span>
            </div>
            <Link
              href="/compare/wopee-vs-playwright-mcp/"
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg"
            >
              Comparing with Playwright MCP? &rarr;
            </Link>
          </div>
        </div>
      </div>

      <ComparisonTable
        title="TL;DR comparison"
        subtitle="A free toolkit you operate yourself, or a managed platform on the same foundation."
        leftLabel="Playwright CLI"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Stay with the Playwright CLI alone when"
        stickItems={[
          "You have engineers who want to own the whole testing loop",
          "You already pay for an AI coding tool and want to drive Test Agents yourself",
          "Pixel-diff screenshots reviewed in git are enough visual coverage",
          "Your CI and infrastructure needs are already solved",
        ]}
        switchTitle="Add Wopee.io when"
        switchItems={[
          "You want suites generated from a URL without building an agent loop first",
          "Visual baselines need a review UI, branching, and ignore areas, not PNG diffs in git",
          "Non-engineers should be able to review test artifacts and results",
          "You want hosted, scheduled runs without owning execution infrastructure",
          "You want runtime self-healing instead of on-demand code repair sessions",
        ]}
      />

      <BetterTogether />

      <CompareFaq
        title="Wopee.io vs Playwright CLI: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: August 2026. Playwright details come from playwright.dev documentation and the microsoft/playwright GitHub repository." />

      <CompareCta
        heading="Keep the framework. Skip the plumbing."
        subheading="Point Wopee.io at your app and export Playwright code whenever you like."
        ctaId="cta-vs-pwcli-footer"
      />
    </Layout>
  );
};

export default WopeeVsPlaywrightCli;
