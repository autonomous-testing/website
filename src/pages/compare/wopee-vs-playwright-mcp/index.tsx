import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import AnswerFirst from "@site/src/components/ui/AnswerFirst";
import { CalendarClock, Eye, FileCheck2, ListChecks } from "lucide-react";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import AgentSetupCard, { agentSetupLinkClass } from "@site/src/components/agent-setup/AgentSetupCard";
import ComparisonTable from "@site/src/components/compare-page/ComparisonTable";
import WhenToChoose from "@site/src/components/compare-page/WhenToChoose";
import CompareFaq, {
  CompareFaqItem,
} from "@site/src/components/compare-page/CompareFaq";
import CompareCta from "@site/src/components/compare-page/CompareCta";
import LastChecked from "@site/src/components/compare-page/LastChecked";
import VideoCallout from "@site/src/components/ui/VideoCallout";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";

const TLDR_ROWS: React.ComponentProps<typeof ComparisonTable>["rows"] = [
  {
    aspect: "What it is",
    left: "Browser automation: an open-source MCP server that lets your own AI agent drive a browser",
    right:
      "An AI tester: a managed platform with agents, saved tests, verdicts, visual baselines and schedules, plus its own MCP server",
  },
  {
    aspect: "Tests",
    left: "Ad hoc: your LLM decides and executes in the moment; browser profiles persist, tests do not",
    right:
      "Persistent: plain-language test cases saved, versioned in Git and re-runnable by the agent",
    edge: "right",
  },
  {
    aspect: "Regression",
    left: "You prompt again and hope the agent repeats itself",
    right: "Scheduled and on-demand runs of saved test cases",
    edge: "right",
  },
  {
    aspect: "Visual testing",
    left: "Not built in",
    right:
      "Visual baselines with branching, ignore areas, and cross-browser configs",
    edge: "right",
  },
  {
    aspect: "Maintenance",
    left: "A fresh improvisation each run; Playwright's own Test Agents (planner, generator, healer) can repair Playwright code, driven by your own AI tool",
    right: "Adaptive by default: the agent re-reads your UI on every run, and test cases stay editable at every pipeline stage",
  },
  {
    aspect: "Evidence",
    left: "A chat transcript, plus opt-in video and trace recording",
    right: "Step screenshots, run reports, logs, and run history",
    edge: "right",
  },
  {
    aspect: "Verdicts",
    left: "Whatever the LLM reports in the chat; saving tests requires the separate Test Agents workflow",
    right: "A pass or fail for each saved test case, with a run report and evidence",
    edge: "right",
  },
  {
    aspect: "Quick one-off task",
    left: "One config line in your editor, and the agent is browsing",
    right: "Built for suites, so a one-off click-through is more setup than it is worth",
    edge: "left",
  },
  {
    aspect: "Cost",
    left: "Open source, plus your own LLM usage and whatever you build around it",
    right: "Free to start; paid plans from 19 € per user per month, LLM included",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "Can I use Playwright MCP and Wopee.io together?",
    answer:
      "Yes. The wopee-mcp server connects your AI coding agent (Claude Code, Cursor, VS Code, or Windsurf) to Wopee.io. Your agent dispatches testing agents, generates test artifacts, and fetches results, while Wopee.io keeps the persistent suites, visual baselines, and scheduled regression runs.",
    render: (
      <>
        Yes. The <Link href="/mcp/">wopee-mcp server</Link> connects your AI
        coding agent (Claude Code, Cursor, VS Code, or Windsurf) to Wopee.io.
        Your agent dispatches testing agents, generates test artifacts, and
        fetches results, while Wopee.io keeps the persistent suites, visual
        baselines, and scheduled regression runs.
      </>
    ),
  },
  {
    question: "Why isn't Playwright MCP enough for regression testing?",
    answer:
      "Playwright MCP executes what your LLM decides in the moment. It can persist browser profiles and session state, but not tests. Regression testing needs the same tests to run repeatedly: saved suites, visual baselines, scheduled runs, and an evidence trail. That system is what Wopee.io adds on top of the browser automation.",
  },
  {
    question: "What about Playwright Test Agents (planner, generator, healer)?",
    answer:
      "Since Playwright 1.56, Microsoft ships agent definitions that plan, generate, and repair Playwright tests, driven by your own AI tool and LLM account. They are a strong DIY building block. Wopee.io is the managed version of that loop: hosted agents, visual baselines, scheduling, and team review, with no orchestration to build. See our Wopee.io vs Playwright CLI comparison for that story.",
    render: (
      <>
        Since Playwright 1.56, Microsoft ships agent definitions that plan,
        generate, and repair Playwright tests, driven by your own AI tool and
        LLM account. They are a strong DIY building block. Wopee.io is the
        managed version of that loop: hosted agents, visual baselines,
        scheduling, and team review, with no orchestration to build. See our{" "}
        <Link href="/compare/wopee-vs-playwright-cli/">
          Wopee.io vs Playwright CLI comparison
        </Link>{" "}
        for that story.
      </>
    ),
  },
  {
    question: "What happens to my tests if I stop using Wopee.io?",
    answer:
      "Your test cases are plain-language files in a Git repository your team can access, and you can download them as JSON. Running them with the AI agent is a Wopee.io service. Passing tests can also be generated as Playwright code, which uses the Wopee.io SDK for visual checks.",
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

const REMEMBERS = [
  [ListChecks, "Saved test cases", "Plain-language tests your team can read, edit and rerun."],
  [FileCheck2, "A verdict per test", "Pass or fail with a run report and evidence attached."],
  [Eye, "Visual baselines", "Regressions caught across releases, not only in the moment."],
  [CalendarClock, "Schedules", "The same suite tonight, on demand and in CI."],
] as const;

// One of the page's two brand bands (DESIGN.md, Components): ink with the dark hero's glow, in both themes.
const Remembers = () => (
  <section
    className="bg-[#111827] px-5 py-20 text-balance lg:px-10"
    style={{
      backgroundImage:
        "radial-gradient(circle at 15% 30%, rgba(112, 48, 160, 0.30) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(236, 72, 153, 0.10) 0%, transparent 45%)",
    }}
  >
    <div className="container flex flex-col gap-10">
      <h2 className="m-0 text-center text-4xl font-bold text-white sm:text-5xl">
        Your agent improvises.{" "}
        <span className="text-primary-wopee">Wopee.io remembers.</span>
      </h2>
      <ul className="m-0 mx-auto grid w-full max-w-5xl list-none grid-cols-1 gap-6 p-0 text-left sm:grid-cols-2">
        {REMEMBERS.map(([Icon, title, text]) => (
          <li key={title} className="flex items-start gap-4">
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] bg-primary-wopee text-[#111827]"
              aria-hidden="true"
            >
              <Icon size={22} />
            </span>
            <p className="m-0 text-lg text-white">
              <span className="font-bold">{title}.</span>{" "}
              <span className="text-gray-300">{text}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const BetterTogether = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Better together via MCP
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          This is not an either-or choice. Keep Playwright MCP for interactive
          browser work in your editor. Add the{" "}
          <Link href="/mcp/">Wopee.io MCP server</Link> and the same coding agent
          can dispatch the AI tester, generate test suites, fetch run results,
          and file the bugs it finds, without leaving the conversation.
        </p>
        <AgentSetupCard placement="vs-pwmcp" primary className="mb-4" />
        <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
          No coding agent?{" "}
          <Link
            href={loginUrl}
            id="cta-vs-pwmcp-together"
            className={agentSetupLinkClass}
          >
            Start for free in the browser &rarr;
          </Link>{" "}
          &middot; No credit card required
        </p>
      </div>
    </section>
  );
};

const PricingWedge = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        What it really costs
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Playwright MCP is open source. The cost is everything you build around
        it yourself: schedulers, baselines, reporting, and the maintenance of
        tests that only exist in a context window.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Wopee.io's pricing is on the page, not behind a demo form:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        , Enterprise custom. The LLM behind every agent run is included in
        your plan, so there is no separate model bill to manage.
      </p>
    </div>
  </section>
);

const WopeeVsPlaywrightMcp = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Playwright MCP"
      description="Playwright gives you browser automation. Wopee.io gives you an AI tester: saved tests, verdicts, visual baselines, schedules and evidence. See the comparison."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-5xl">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-solid border-gray-900/10 bg-gray-900/5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-primary-wopee/20 dark:bg-primary-wopee/10 dark:text-primary-wopee">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-primary-wopee" aria-hidden="true" />
              Wopee.io vs Playwright MCP
            </span>
          </div>
          <h1 className="text-[40px] sm:text-5xl leading-tight">
            Playwright gives you browser automation.
            <br className="hidden sm:block" />{" "}
            <span className="hero-key">Wopee.io gives you an AI tester.</span>
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            Playwright MCP lets your coding agent drive a browser in the moment.
            Wopee.io is a managed AI tester: saved plain-language tests,
            verdicts, visual baselines, schedules and evidence. Most teams use
            both: Playwright MCP in the editor, Wopee.io as the regression
            safety net.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center sm:items-start mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-pwmcp-hero"
              />
              <span className="text-xs opacity-60">
                No credit card required
              </span>
            </div>
            <Link
              href="/mcp/"
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg flex items-center sm:h-[50px]"
            >
              See how they work together &rarr;
            </Link>
          </div>
        </div>
      </div>

      <AnswerFirst
        question="Playwright MCP or an AI tester?"
        lastChecked="9 November 2026"
        className="mt-4"
      >
        Playwright gives you browser automation. Wopee.io gives you an AI
        tester. Playwright MCP is Microsoft's open-source MCP server that lets
        your own LLM drive a browser in the moment; it saves no tests, and
        Playwright's separate Test Agents can plan, generate and heal Playwright
        tests with your own AI tool. Wopee.io is the managed version: saved
        plain-language test cases run by its agent on a schedule or on demand,
        visual baselines, and a pass or fail with evidence for each test. Use
        Playwright MCP while you build and Wopee.io for regression.
      </AnswerFirst>

      <ComparisonTable
        title="TL;DR comparison"
        subtitle="Browser automation your LLM drives, next to a managed AI tester that is still there after the conversation ends."
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
          "Teammates and auditors need screenshots, run reports, and run history",
          "You want saved test cases you can read, edit, and re-run, not decisions lost in a context window",
          "Every run should end in a clear pass or fail with evidence attached",
        ]}
      />

      <Remembers />

      <BetterTogether />

      <VideoCallout
        slug="vibe-testing-lab-ai-testing-agents"
        heading="See them side by side"
        text="Watch Playwright's planner, generator and healer next to a coding agent, the Playwright CLI and Wopee.io with MCP, on one app and one task."
      />

      <PricingWedge />

      <CompareFaq
        title="Wopee.io vs Playwright MCP: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: August 2026. Playwright MCP and Playwright Test Agents are open-source projects by Microsoft; their capabilities are described from their public documentation." />

      <CompareCta
        heading="Keep your coding agent."
        subheading="Add the AI tester it's missing."
        ctaId="cta-vs-pwmcp-footer"
      />
    </Layout>
  );
};

export default WopeeVsPlaywrightMcp;
