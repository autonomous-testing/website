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
      "A managed platform whose AI agents generate, run, and maintain tests for your web app",
  },
  {
    aspect: "Test creation",
    left: "Codegen records as you click; Test Agents plan and generate tests, driven by your own AI tool and LLM account",
    right:
      "Goal-driven agents explore your app and generate user stories and test cases, no LLM account needed",
  },
  {
    aspect: "Test format",
    left: "Test files your engineers own, in TypeScript, JavaScript, Python, Java, or .NET",
    right:
      "Plain-language test cases run by an AI agent; passing tests can also be generated as Playwright code that uses the Wopee.io SDK",
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
    aspect: "Speed",
    left: "Scripted tests run in seconds and parallelize across workers",
    right: "The agent works through each test step by step, which takes minutes per test",
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
      "No. Wopee.io's agent drives the browser with Playwright under the hood, but a Wopee.io test is a plain-language test case the agent runs, not a Playwright file. Passing tests can also be generated as Playwright code, which uses the Wopee.io SDK for visual checks. You can keep a Playwright suite for fast, scripted checks and use Wopee.io for coverage that maintains itself.",
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
      "Partly. Wopee.io tests normally run as agent jobs. For a passing test, Wopee.io can generate a Playwright version that runs with npx playwright test, but it imports the Wopee.io SDK, and its visual checks call the Wopee.io API. Treat it as a head start for a scripted suite, not a copy that runs without Wopee.io.",
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
          This page is not Playwright versus a rival: Wopee.io's agent drives
          the browser with Playwright too. The difference is what a test is.
          With the Playwright CLI, a test is code your engineers write, run,
          and repair. With Wopee.io, it is a plain-language test case that an
          AI agent runs and adapts, with hosted runs, visual baselines,
          scheduling, and team review built in. The trade-off is speed:
          scripted Playwright runs in seconds, an agent takes minutes per test.
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
      description="Wopee.io vs Playwright CLI and Test Agents: a free DIY toolkit with your own LLM and orchestration, or a managed autonomous testing platform on top."
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
            uses the same browser engine and operates the whole loop for you:
            autonomous generation from a URL, tests run by an AI agent, hosted
            runs, visual baselines, and team review.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center sm:items-start mt-2">
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
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg flex items-center sm:h-[50px]"
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
          "You need fast, scripted tests that run in seconds",
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
        subheading="Point Wopee.io at your app and see generated tests today."
        ctaId="cta-vs-pwcli-footer"
      />
    </Layout>
  );
};

export default WopeeVsPlaywrightCli;
