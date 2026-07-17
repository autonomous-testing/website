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
    left: "An open-source MCP server that lets your AI agent drive a browser",
    right:
      "An autonomous testing platform: agents, suites, baselines — plus its own MCP server",
  },
  {
    aspect: "Tests",
    left: "Ad hoc — your LLM decides and executes in the moment",
    right:
      "Persistent suites: user stories and test cases saved, versioned, and re-runnable",
  },
  {
    aspect: "Regression",
    left: "You prompt again and hope the agent repeats itself",
    right: "Scheduled and CI-triggered runs against saved suites",
  },
  {
    aspect: "Visual testing",
    left: "Not built in",
    right:
      "Visual baselines with branching, ignore areas, and cross-browser configs",
  },
  {
    aspect: "Maintenance",
    left: "Every run is a fresh improvisation",
    right: "Self-healing plus editable artifacts at every pipeline stage",
  },
  {
    aspect: "Evidence",
    left: "A chat transcript",
    right: "Screenshots, traces, and run history",
  },
  {
    aspect: "Output",
    left: "Browser actions — executed, then gone",
    right: "Deterministic Playwright code committed to a Git repo you own",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "Can I use Playwright MCP and Wopee.io together?",
    answer:
      "Yes. The wopee-mcp server connects your AI coding agent — Claude Code, Cursor, VS Code, or Windsurf — to Wopee.io. Your agent dispatches testing agents, generates test artifacts, and fetches results, while Wopee.io keeps the persistent suites, visual baselines, and scheduled regression runs.",
    render: (
      <>
        Yes. The <Link href="/mcp/">wopee-mcp server</Link> connects your AI
        coding agent — Claude Code, Cursor, VS Code, or Windsurf — to Wopee.io.
        Your agent dispatches testing agents, generates test artifacts, and
        fetches results, while Wopee.io keeps the persistent suites, visual
        baselines, and scheduled regression runs.
      </>
    ),
  },
  {
    question: "Why isn't Playwright MCP enough for regression testing?",
    answer:
      "Playwright MCP executes what your LLM decides in the moment — nothing persists between sessions. Regression testing needs the same tests to run repeatedly: saved suites, visual baselines, scheduled runs, and an evidence trail. That system is what Wopee.io adds on top of the browser automation.",
  },
  {
    question: "Does Wopee.io lock me in?",
    answer:
      "No. Wopee.io agents generate deterministic Playwright code committed to a Git repository you own. The generated tests run as plain Playwright — no LLM and no Wopee.io runtime required.",
  },
  {
    question: "What does Wopee.io cost?",
    answer:
      "You start free with no credit card. Paid plans are published: Starter 19 € per user per month, Basic 79 €, Premium 179 €, and Enterprise custom with on-premise deployment.",
    render: (
      <>
        You start free with no credit card. Paid plans are{" "}
        <Link href="/pricing/">published</Link>: Starter 19 € per user per
        month, Basic 79 €, Premium 179 €, and Enterprise custom with on-premise
        deployment.
      </>
    ),
  },
];

const BetterTogether = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
          Better together via MCP
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          This is not an either-or choice. Keep Playwright MCP for interactive
          browser work in your editor. Add the{" "}
          <Link href="/mcp/">Wopee.io MCP server</Link> and the same coding agent
          can dispatch autonomous testing agents, generate test suites, fetch
          run results, and file the bugs it finds — without leaving the
          conversation.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Your agent improvises. Wopee.io remembers.
        </p>
        <ButtonPrimary
          label="Start for free"
          href={loginUrl}
          className="w-60 h-[50px]"
          id="cta-vs-pwmcp-together"
        />
        <p className="text-sm italic mt-2">No credit card required</p>
      </div>
    </section>
  );
};

const PricingWedge = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
        What it really costs
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
        Playwright MCP is open source. The cost is everything you build around
        it yourself: schedulers, baselines, reporting, and the maintenance of
        tests that only exist in a context window.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        Wopee.io's pricing is on the page, not behind a demo form:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        , Enterprise custom. And because generated tests re-run as plain
        Playwright code, your regression runs don't depend on an LLM being in
        the loop.
      </p>
    </div>
  </section>
);

const WopeeVsPlaywrightMcp = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Playwright MCP"
      description="Wopee.io vs Playwright MCP: one executes what your LLM decides ad hoc, the other adds persistent suites, baselines, self-healing, and scheduled regression."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            Playwright MCP
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            Playwright MCP gives your AI coding agent a browser: it executes
            whatever the LLM decides, ad hoc, one session at a time. Wopee.io
            adds the testing system around it: persistent test suites, visual
            baselines, self-healing, scheduled regression runs, and an
            evidence trail — with deterministic Playwright code committed to
            your repo. Most teams need both: Playwright MCP in the editor,
            Wopee.io as the regression safety net.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-pwmcp-hero"
              />
              <span className="text-xs opacity-50">
                No credit card required
              </span>
            </div>
            <Link
              href="/mcp/"
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg"
            >
              See how they work together &rarr;
            </Link>
          </div>
        </div>
      </div>

      <ComparisonTable
        title="TL;DR comparison"
        subtitle="Playwright MCP is browser automation for LLMs. Wopee.io is the testing system that persists after the conversation ends."
        leftLabel="Playwright MCP"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one do you need?"
        stickTitle="Stick with Playwright MCP alone when"
        stickItems={[
          "You need a quick one-off browser task from your editor",
          "You're exploring or debugging a single flow interactively",
          "You don't need the same test to run again tomorrow",
          "A chat transcript is evidence enough for the job at hand",
        ]}
        switchTitle="Switch to (or add) Wopee.io when"
        switchItems={[
          "The same suites must run tonight, on schedule, and in CI",
          "You need visual baselines so regressions get caught across releases",
          "Teammates and auditors need screenshots, traces, and run history",
          "You want test code in your Git repo, not decisions in a context window",
          "Generated tests should re-run as plain Playwright — no LLM in the loop",
        ]}
      />

      <BetterTogether />

      <PricingWedge />

      <CompareFaq
        title="Wopee.io vs Playwright MCP: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: July 2026. Playwright MCP is an open-source project by Microsoft; its capabilities are described from its public documentation." />

      <CompareCta
        heading="Keep your coding agent."
        subheading="Add the testing system it's missing."
        ctaId="cta-vs-pwmcp-footer"
      />
    </Layout>
  );
};

export default WopeeVsPlaywrightMcp;
