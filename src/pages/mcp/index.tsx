import {
  mdiEyeCheckOutline,
  mdiTestTube,
  mdiCogSync,
  mdiChartLine,
  mdiLightningBolt,
  mdiPuzzle,
  mdiGithub,
  mdiNpm,
  mdiApplicationOutline,
  mdiFormatListChecks,
  mdiMagnifyScan,
  mdiBugOutline,
  mdiHistory,
  mdiMessageTextOutline,
  mdiForumOutline,
  mdiContentCopy,
  mdiCheck,
  mdiVariable,
  mdiTune,
} from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";

import Layout from "@theme/Layout";
import AnswerFirst from "@site/src/components/ui/AnswerFirst";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import TestimonialCarousel from "@site/src/components/landing-page/home/sections/TestimonialCarousel";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import VideoCallout from "@site/src/components/ui/VideoCallout";
import GradientCard from "@site/src/components/ui/GradientCard";
import { cmdBaseUrl } from "../../../cmdBaseUrl";
import clsx from "clsx";
import AgentSetupCard, { agentSetupLinkClass } from "@site/src/components/agent-setup/AgentSetupCard";
import { AGENT_SETUP_LINE } from "@site/src/data/agent-setup";
import { ORG_REF } from "@site/src/data/organization";
import { SiOpenai } from "@icons-pack/react-simple-icons";
import { X } from "lucide-react";
import SocialCard from "@site/src/components/seo/SocialCard";

const CAPABILITIES = [
  {
    icon: mdiMagnifyScan,
    title: "Dispatch Analysis Crawl",
    tool: "wopee_dispatch_analysis",
    description:
      "Create a suite and dispatch a crawling agent to explore your web app, discover pages, and map the structure.",
  },
  {
    icon: mdiLightningBolt,
    title: "Generate Test Artifacts",
    tool: "wopee_generate_artifact",
    description:
      "Generate user stories, test cases, test steps, and Playwright code from your app context.",
  },
  {
    icon: mdiTestTube,
    title: "Dispatch Testing Agent",
    tool: "wopee_dispatch_agent",
    description:
      "Execute test cases with an autonomous AI agent that opens a real browser, follows test steps, and captures screenshots.",
  },
  {
    icon: mdiFormatListChecks,
    title: "Fetch Execution Results",
    tool: "wopee_fetch_executed_test_cases",
    description:
      "Retrieve pass/fail results, agent reports, and code reports for executed test cases.",
  },
  {
    icon: mdiHistory,
    title: "Check Recent Runs",
    tool: "wopee_fetch_recent_executions",
    description:
      "Get the latest test executions for your project (status, reports, and pass/fail) without hunting for suite UUIDs.",
  },
  {
    icon: mdiBugOutline,
    title: "File GitHub Issues",
    tool: "wopee_create_github_issue",
    description:
      "Turn test failures into GitHub issues in your connected repository, title, Markdown body, and labels.",
  },
  {
    icon: mdiChartLine,
    title: "Fetch Test Artifacts",
    tool: "wopee_fetch_artifact",
    description:
      "Retrieve generated artifacts, user stories, test cases, Playwright code, and app context.",
  },
  {
    icon: mdiCogSync,
    title: "Update Test Artifacts",
    tool: "wopee_update_artifact",
    description:
      "Replace and refine user stories, test cases, or Playwright code after reviewing them.",
  },
  {
    icon: mdiPuzzle,
    title: "Create Suite",
    tool: "wopee_create_blank_suite",
    description:
      "Create a new empty analysis suite as the starting point for your testing workflow.",
  },
  {
    icon: mdiEyeCheckOutline,
    title: "List Suites",
    tool: "wopee_fetch_analysis_suites",
    description:
      "List all analysis suites in your project with their UUIDs, types, and statuses.",
  },
  {
    icon: mdiVariable,
    title: "Fetch Run-Time Variables",
    tool: "wopee_fetch_variables",
    description:
      "Read the run-time variables that drive analysis and agent runs, at project level or per analysis suite.",
  },
  {
    icon: mdiTune,
    title: "Update Run-Time Variables",
    tool: "wopee_update_variables",
    description:
      "Add or overwrite run-time variables at project or suite level, existing keys you don't list are preserved.",
  },
  {
    icon: mdiFormatListChecks,
    title: "Fetch Test Inventory",
    tool: "wopee_fetch_test_inventory",
    description:
      "The complete picture: every authored test case joined with its latest execution status, including never-run ones.",
  },
  {
    icon: mdiMessageTextOutline,
    title: "Post to Project Chat",
    tool: "wopee_send_chat_message",
    description:
      "Post status updates and notes to your project's chat room so the whole team sees what the agent is doing.",
  },
  {
    icon: mdiForumOutline,
    title: "Read Chat History",
    tool: "wopee_read_chat_history",
    description:
      "Pull recent messages from your project's chat room for context before the agent acts.",
  },
];

// Real brand marks (single-path SVGs; simple-icons: claude/cursor current set,
// visualstudiocode from v12.4.0 pre-trademark-purge), in neutral tiles.
const BRAND_PATHS: Record<string, string> = {
  claude: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
  cursor: "M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23",
  vscode: "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z",
};

const BrandMark = ({ id }: { id: string }) => (
  <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" aria-hidden="true">
    <path d={BRAND_PATHS[id]} />
  </svg>
);

const COMPATIBLE_TOOLS = [
  {
    name: "Claude Code",
    description: "CLI agent by Anthropic",
    icon: <BrandMark id="claude" />,
  },
  {
    name: "Cursor",
    description: "AI-first code editor",
    icon: <BrandMark id="cursor" />,
  },
  {
    name: "VS Code",
    description: "With GitHub Copilot",
    icon: <BrandMark id="vscode" />,
  },
  {
    name: "OpenAI Codex",
    description: "CLI, IDE and ChatGPT app",
    icon: <SiOpenai size={26} aria-hidden="true" />,
  },
  {
    name: "Devin Desktop",
    description: "Formerly Windsurf",
    icon: <Icon path={mdiApplicationOutline} size={1.1} aria-hidden="true" />,
  },
  {
    name: "Claude Desktop",
    description: "AI agent by Anthropic",
    icon: <BrandMark id="claude" />,
  },
];

const STEPS = [
  {
    step: "1",
    title: "Paste",
    subtitle: "One line in your agent's chat",
    label: "chat",
    code: AGENT_SETUP_LINE,
    description:
      "Claude Code, Cursor, Copilot or Codex reads the public setup file, checks Node.js 20.18+, and shows you the plan. Nothing changes until you say yes.",
  },
  {
    step: "2",
    title: "Connect",
    subtitle: "Your key stays with you",
    label: "terminal",
    code: '# Commander: More › Settings › API Keys\nexport WOPEE_API_KEY="…"\nexport WOPEE_PROJECT_UUID="…"',
    description:
      "Your agent adds one wopee server that reads the key from your environment or a git-ignored .env file. You type the key yourself; it never goes into the chat or a committed file.",
  },
  {
    step: "3",
    title: "Test",
    subtitle: "Natural language, real results",
    label: "conversation",
    code: '"Generate stories for login and test them"\n\n  wopee_generate_artifact           3 user stories\n  wopee_dispatch_agent              running 8 cases\n  wopee_fetch_executed_test_cases   7 passed, 1 failed',
    description:
      "Ask your AI to test any flow. It generates stories, dispatches agents, and explains findings, all in natural language.",
  },
];

const TERMINAL_LINES = [
  { type: "user", text: "Create user stories for the checkout flow and test them", delay: 0 },
  { type: "tool", name: "wopee_generate_artifact", text: "3 user stories with test cases", delay: 1200 },
  { type: "tool", name: "wopee_dispatch_agent", text: "running 8 test cases...", delay: 2200 },
  { type: "tool", name: "wopee_fetch_executed_test_cases", text: "7 passed, 1 failed", delay: 3500 },
  { type: "claude", text: "7 of 8 test cases passed. The promo code field accepts empty submissions, screenshots and agent report attached.", delay: 4500 },
  { type: "user", text: "File that as a GitHub issue.", delay: 6500 },
  { type: "tool", name: "wopee_create_github_issue", text: "issue created in your repo", delay: 7700 },
  { type: "claude", text: "Bug filed, steps to reproduce, agent report, and screenshots included.", delay: 8700 },
];

const TerminalAnimation = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, index) =>
      setTimeout(() => setVisibleLines(index + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-gray-950 p-5 sm:p-6 text-left font-mono text-xs sm:text-sm leading-relaxed min-h-[260px]">
      {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => {
        if (line.type === "user") {
          return (
            <div key={i} className={`${i > 0 ? "mt-4" : ""} mb-3 animate-[fadeIn_0.3s_ease-in]`}>
              <span className="text-blue-400 font-semibold">You:</span>{" "}
              <span className="text-gray-200">{line.text}</span>
            </div>
          );
        }
        if (line.type === "tool") {
          const isFirst = i === 0 || TERMINAL_LINES[i - 1]?.type !== "tool";
          const isLast = i === TERMINAL_LINES.length - 1 || TERMINAL_LINES[i + 1]?.type !== "tool";
          return (
            <div
              key={i}
              className={`pl-4 border-l-2 border-solid border-y-0 border-r-0 border-white/15 ${isFirst ? "pt-0" : ""} ${isLast ? "mb-3" : ""} py-0.5 animate-[fadeIn_0.3s_ease-in]`}
            >
              <span className="text-primary-wopee">{line.name}</span>{" "}
              <span className="text-gray-500">{line.text}</span>
            </div>
          );
        }
        if (line.type === "claude") {
          return (
            <div key={i} className="mb-3 animate-[fadeIn_0.3s_ease-in]">
              <span className="text-green-400 font-semibold">Claude:</span>{" "}
              <span className="text-gray-300">{line.text}</span>
            </div>
          );
        }
        return null;
      })}
      {visibleLines < TERMINAL_LINES.length && (
        <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />
      )}
    </div>
  );
};

const MCP_CONFIG_SNIPPET = `{
  "mcpServers": {
    "wopee": {
      "command": "npx",
      "args": ["-y", "wopee-mcp"],
      "env": {
        "WOPEE_API_KEY": "your-api-key-here",
        "WOPEE_PROJECT_UUID": "your-project-uuid-here"
      }
    }
  }
}`;

const InstallSnippet = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(MCP_CONFIG_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div id="mcp-config" className="w-full mt-5 rounded-xl overflow-hidden border border-solid border-gray-700 text-left">
      <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between">
        <span className="text-gray-400 text-xs font-mono">mcp-config.json</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Config copied" : "Copy config"}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-transparent border-0 cursor-pointer p-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-wopee"
        >
          <Icon
            path={copied ? mdiCheck : mdiContentCopy}
            size={0.6}
            className={copied ? "text-green-400" : ""}
          />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="!bg-gray-900 !m-0 !rounded-none p-4 text-xs sm:text-sm overflow-x-auto">
        <code className="!bg-transparent !text-gray-300">
          {MCP_CONFIG_SNIPPET}
        </code>
      </pre>
    </div>
  );
};

const HeroSection = () => {
  const [showConfig, setShowConfig] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-6 lg:px-10 container text-center relative">
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-solid border-gray-900/10 bg-gray-900/5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-primary-wopee/20 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-primary-wopee" aria-hidden="true" />
            MCP Server · open source on npm
          </span>
        </div>

        <h1 className="text-[40px] sm:text-6xl lg:text-[64px] leading-tight">
          <span className="hero-key">Autonomous testing</span>
          <br className="hidden sm:block" />
          {" "}in your AI coding agent
        </h1>

        <p className="text-xl sm:text-2xl opacity-80 max-w-2xl mx-auto text-balance">
          Your coding agent runs the tests and files the bugs, straight into
          GitHub. Connect Wopee.io to generate tests, dispatch testing agents,
          and check results without leaving your editor.
        </p>

        <AgentSetupCard
          placement="mcp-hero"
          primary
          className="mt-4"
          extra={
            <button
              type="button"
              aria-expanded={showConfig}
              aria-controls="mcp-config"
              onClick={() => setShowConfig((v) => !v)}
              className={clsx(
                "cursor-pointer border-0 bg-transparent p-0 text-sm",
                agentSetupLinkClass
              )}
            >
              {showConfig ? "Hide the config" : "Show the config"}
            </button>
          }
        >
          {showConfig && <InstallSnippet />}
        </AgentSetupCard>

        <p className="m-0 text-sm opacity-80">
          No coding agent?{" "}
          <Link
            href={`${cmdBaseUrl}/login`}
            id="cta-mcp-hero"
            className={agentSetupLinkClass}
          >
            Start for free in the browser &rarr;
          </Link>{" "}
          &middot; No credit card required
        </p>

        <div className="flex flex-wrap justify-center gap-3 text-sm opacity-60">
          <span>npm package</span>
          <span>&#x2022;</span>
          <span>15 MCP tools</span>
          <span>&#x2022;</span>
          <span>Node.js 20.18+</span>
        </div>
      </div>

      <div className="w-full max-w-3xl mt-4 rounded-xl overflow-hidden text-left shadow-[0_24px_50px_rgba(76,29,149,0.14)] dark:shadow-none">
        <div className="bg-gray-900 px-4 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm ml-2 font-mono">
              AI Agent + Wopee.io MCP
            </span>
          </div>
          <span className="text-xs text-green-500 font-mono flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>mcp connected</span>
        </div>
        <TerminalAnimation />
      </div>
      <div className="-mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <Link href="https://docs.wopee.io/guides/wopee-mcp/" className={agentSetupLinkClass}>
          Read the docs &rarr;
        </Link>
        <Link to="/learn/" className={agentSetupLinkClass}>
          New to MCP? Free tutorial &rarr;
        </Link>
      </div>
    </div>
  );
};

const PROBLEMS: [string, string][] = [
  ["Your CI catches technical errors but", "misses broken user flows"],
  ["Writing test scripts manually", "slows down every release"],
  ["You leave your editor to", "open a separate testing dashboard"],
  ["Testing dozens of user flows manually", "doesn't scale"],
];

// One of the page's two brand bands (DESIGN.md, Components): ink with the dark hero's glow, in both themes.
const ProblemSection = () => (
  <section
    className="bg-[#111827] px-5 py-20 text-balance lg:px-10"
    style={{
      backgroundImage:
        "radial-gradient(circle at 15% 30%, rgba(112, 48, 160, 0.30) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(236, 72, 153, 0.10) 0%, transparent 45%)",
    }}
  >
    <div className="container flex flex-col gap-10">
      <h2 className="m-0 text-center text-4xl font-bold text-white sm:text-5xl">
        Your AI can code. But who tests the output?
      </h2>
      <ul className="m-0 mx-auto grid w-full max-w-5xl list-none grid-cols-1 gap-6 p-0 text-left text-xl text-white sm:text-2xl lg:grid-cols-2 lg:gap-x-12">
        {PROBLEMS.map(([lead, key]) => (
          <li key={key} className="flex items-center gap-4">
            <span
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px] bg-primary-wopee text-[#111827]"
              aria-hidden="true"
            >
              <X size={20} strokeWidth={3} />
            </span>
            <p className="m-0">
              {lead} <span className="font-bold text-primary-wopee">{key}</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="m-0 mx-auto max-w-3xl border-0 border-t border-solid border-white/15 pt-8 text-center text-2xl font-bold text-white sm:text-3xl">
        Wopee.io MCP bridges the gap. Test from where you code.
      </p>
    </div>
  </section>
);

const CapabilitiesSection = () => (
  <div id="capabilities" className="container my-16 lg:my-24 px-5 lg:px-10">
    <div className="text-center mb-12 lg:mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold mb-4">
        Complete testing workflow
      </h2>
      <p className="text-xl opacity-70 max-w-2xl mx-auto">
        From crawling your app to filing GitHub issues, 15 tools, all through
        conversation
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {CAPABILITIES.map((cap) => (
        <GradientCard key={cap.title}>
          {/* Icon tile (DESIGN.md): a yellow rounded square with the icon in ink, both themes. */}
          <div className="w-12 h-12 rounded-[10px] bg-primary-wopee flex items-center justify-center mb-4">
            <Icon path={cap.icon} size={1.2} className="text-[#111827]" />
          </div>
          <h3 className="text-xl font-bold mb-1">{cap.title}</h3>
          <p className="m-0 mb-2 font-mono text-xs text-gray-500 dark:text-gray-400">{cap.tool}</p>
          <p className="opacity-70 text-balance">{cap.description}</p>
        </GradientCard>
      ))}
    </div>

    <div className="text-center mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
      <ButtonPrimary
        label="Start for free"
        href={`${cmdBaseUrl}/login`}
        className="w-60 h-[50px]"
        id="cta-mcp-capabilities"
      />
      <Link
        href="https://docs.wopee.io/guides/wopee-mcp/"
        className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee"
      >
        Read the docs &rarr;
      </Link>
    </div>
  </div>
);

const HowItWorksSection = () => (
  <div id="how-it-works" className="container my-16 lg:my-24 px-5 lg:px-10">
    <div className="text-center mb-12 lg:mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold mb-4">
        Up and running in 3 minutes
      </h2>
      <p className="text-xl opacity-70 max-w-2xl mx-auto">
        Paste one line, add your API key, and start testing
      </p>
    </div>

    <div className="flex flex-col gap-14 lg:gap-20">
      {STEPS.map((step, index) => (
        <div
          className={`flex flex-col ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center gap-8 lg:gap-12`}
          key={step.step}
        >
          <div className="flex-1 w-full">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-[0_24px_50px_rgba(76,29,149,0.14)] dark:shadow-none">
              <div className="px-4 py-2.5 flex items-center gap-2 bg-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-500 text-xs font-mono ml-2">
                  {step.label}
                </span>
              </div>
              <pre className="!bg-transparent p-5 text-sm sm:text-base !text-gray-300 overflow-x-auto m-0 whitespace-pre-wrap [overflow-wrap:anywhere]">
                <code className="!bg-transparent !text-gray-300">{step.code}</code>
              </pre>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-3/4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-12 h-12 rounded-[10px] bg-primary-wopee text-[#111827] font-bold text-xl flex items-center justify-center">
                {step.step}
              </span>
              <h3 className="text-3xl lg:text-4xl font-bold">{step.title}</h3>
            </div>
            <p className="m-0 text-gray-900 dark:text-white text-2xl lg:text-3xl font-bold">
              {step.subtitle}
            </p>
            <p className="text-lg lg:text-xl opacity-70">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CompatibleToolsSection = () => (
  <section className="container flex flex-col gap-10 px-5 py-16 text-center text-balance lg:px-10 lg:py-24">
    <div>
      <h2 className="text-3xl lg:text-5xl font-bold mb-4">
        Plug into the AI tools you already use
      </h2>
      <p className="m-0 text-xl opacity-70 max-w-2xl mx-auto">
        The{" "}
        <Link
          href="https://modelcontextprotocol.io"
          className="text-secondary-wopee dark:text-primary-wopee font-semibold"
        >
          Model Context Protocol (MCP)
        </Link>{" "}
        is the open standard that lets AI agents use external tools.
        Any MCP-compatible client works with Wopee.io.
      </p>
    </div>

    <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {COMPATIBLE_TOOLS.map((tool) => (
        <li
          key={tool.name}
          className="flex items-center gap-4 rounded-2xl border border-solid border-gray-900/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#181f2e]"
        >
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[10px] bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white">
            {tool.icon}
          </span>
          <span className="text-left">
            <span className="block text-lg font-bold">{tool.name}</span>
            <span className="block text-sm opacity-70">{tool.description}</span>
          </span>
        </li>
      ))}
      <li className="flex items-center gap-4 rounded-2xl border border-dashed border-gray-900/20 px-5 py-4 dark:border-white/20">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[10px] bg-gray-100 text-2xl font-bold text-gray-900 dark:bg-white/10 dark:text-white" aria-hidden="true">
          +
        </span>
        <span className="text-left">
          <span className="block text-lg font-bold">Any MCP client</span>
          <span className="block text-sm opacity-70">Open standard</span>
        </span>
      </li>
    </ul>

    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <ButtonPrimary
        label="Start for free"
        href={`${cmdBaseUrl}/login`}
        id="cta-mcp-tools"
        className="w-60 h-[50px]"
      />
      <Link href="https://docs.wopee.io/guides/wopee-mcp/" className={agentSetupLinkClass}>
        Setup guide for each client &rarr;
      </Link>
    </div>
  </section>
);

const TOOL_GROUPS = [
  {
    label: "Analyze & generate",
    tools: [
      ["wopee_dispatch_analysis", "Crawl and analyze your app"],
      ["wopee_generate_artifact", "Generate test artifacts"],
      ["wopee_create_blank_suite", "Create a new suite"],
    ],
  },
  {
    label: "Run tests",
    tools: [
      ["wopee_dispatch_agent", "Execute test cases"],
      ["wopee_fetch_executed_test_cases", "Get execution results"],
      ["wopee_fetch_recent_executions", "Check recent runs"],
    ],
  },
  {
    label: "Suites, artifacts & variables",
    tools: [
      ["wopee_fetch_analysis_suites", "List all suites"],
      ["wopee_fetch_test_inventory", "Complete test inventory"],
      ["wopee_fetch_artifact", "Retrieve test artifacts"],
      ["wopee_update_artifact", "Update test artifacts"],
      ["wopee_fetch_variables", "Read run-time variables"],
      ["wopee_update_variables", "Update run-time variables"],
    ],
  },
  {
    label: "Collaborate & report",
    tools: [
      ["wopee_create_github_issue", "File bugs on GitHub"],
      ["wopee_send_chat_message", "Post to project chat"],
      ["wopee_read_chat_history", "Read chat history"],
    ],
  },
];

const OpenSourceSection = () => (
  <div className="container my-16 lg:my-24 px-5 lg:px-10">
    <GradientCard
      variant="solid"
      padding="roomy"
      className="flex flex-col lg:flex-row items-center gap-8"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Icon
            path={mdiGithub}
            size={1.5}
            className="text-primary-wopee"
          />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Available on GitHub and npm
        </h2>
        <p className="text-lg opacity-70 mb-6 text-balance">
          The Wopee.io MCP server is published on npm and the source code is
          available on GitHub. Install in seconds, inspect the code, and
          contribute if you'd like.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="https://github.com/Wopee-io/wopee-mcp"
            className="inline-flex items-center gap-2 min-h-11 px-5 rounded-lg border border-solid border-white/30 bg-transparent text-white font-semibold no-underline hover:no-underline hover:text-white hover:border-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-wopee"
          >
            <Icon path={mdiGithub} size={0.9} />
            Star on GitHub
          </Link>
          <Link
            href="https://www.npmjs.com/package/wopee-mcp"
            className="inline-flex items-center gap-2 min-h-11 px-5 rounded-lg border border-solid border-white/30 bg-transparent text-white font-semibold no-underline hover:no-underline hover:text-white hover:border-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-wopee"
          >
            <Icon path={mdiNpm} size={0.9} />
            View on npm
          </Link>
        </div>
        <Link
          to="/learn/"
          className="mt-4 inline-block font-semibold text-primary-wopee hover:text-primary-wopee hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-wopee"
        >
          Free tutorial: MCP for testers &rarr;
        </Link>
      </div>
      <div className="flex-1 w-full">
        <div className="rounded-xl overflow-hidden">
          <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm ml-2 font-mono">
                wopee-mcp
              </span>
            </div>
            <span className="text-xs text-green-500 font-mono flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              15 tools
            </span>
          </div>
          <div className="bg-gray-950 px-5 py-4 font-mono text-sm leading-relaxed">
            {TOOL_GROUPS.map((group) => (
              <div key={group.label} className="mb-4 last:mb-0">
                <p className="text-gray-500 text-xs mb-1.5 select-none">
                  # {group.label.toLowerCase()}
                </p>
                <div>
                  {group.tools.map(([tool, desc]) => (
                    <div
                      key={tool}
                      className="grid grid-cols-1 md:grid-cols-[minmax(0,16rem)_1fr] gap-x-4 py-1"
                    >
                      <code className="!bg-transparent !border-0 !p-0 text-primary-wopee overflow-x-auto whitespace-nowrap">
                        {tool}
                      </code>
                      <span className="text-gray-400 text-xs md:text-sm self-center">
                        {desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GradientCard>
  </div>
);

const JSONLD_MCP_APP = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wopee.io MCP Server",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Test Automation",
  operatingSystem: "Cross-platform (Node.js 20.18+)",
  url: "https://wopee.io/mcp/",
  description:
    "Model Context Protocol server that connects Claude Code, Cursor, GitHub Copilot, OpenAI Codex, Devin Desktop (formerly Windsurf), Claude Desktop, and other MCP clients to Wopee.io. Dispatch autonomous testing agents, generate test artifacts, fetch execution results, and manage test suites from natural-language conversation.",
  softwareRequirements: "Node.js 20.18+",
  downloadUrl: "https://www.npmjs.com/package/wopee-mcp",
  installUrl: "https://www.npmjs.com/package/wopee-mcp",
  publisher: ORG_REF,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description:
      "Free and open source. Requires a Wopee.io account; free tier available.",
    url: "https://wopee.io/pricing/",
  },
};

const JSONLD_MCP_SOURCE = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "wopee-mcp",
  description:
    "Wopee.io's Model Context Protocol server for agentic testing. Compatible with Claude Code, Cursor, GitHub Copilot, OpenAI Codex, Devin Desktop, Claude Desktop, and any MCP client.",
  codeRepository: "https://github.com/Wopee-io/wopee-mcp",
  programmingLanguage: "TypeScript",
  runtimePlatform: "Node.js",
  url: "https://wopee.io/mcp/",
  author: ORG_REF,
};

const McpPage = () => {
  return (
    <Layout
      title="MCP Server for Autonomous Testing"
      description="MCP server that connects Claude, Cursor, and other AI coding agents to Wopee.io. Dispatch tests, generate artifacts, and fetch results in chat."
    >
      <SocialCard permalink="/mcp/" />
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(JSONLD_MCP_APP)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(JSONLD_MCP_SOURCE)}
        </script>
      </Head>
      <HeroSection />
      <AnswerFirst
        question="Is there an MCP server for testing web apps?"
        lastChecked="9 November 2026"
        className="pb-12"
      >
        Yes. Wopee.io's MCP server, wopee-mcp on npm, connects Claude Code,
        Cursor, GitHub Copilot, OpenAI Codex, Devin Desktop or any other MCP
        client to Wopee.io's AI testing agents. From the
        chat, your coding agent can generate tests, start test runs against
        your web app, fetch the results and file GitHub issues. It is for
        testing your web app through MCP, not for testing an MCP server.
      </AnswerFirst>
      <ProblemSection />
      <HowItWorksSection />
      <CompatibleToolsSection />
      <CapabilitiesSection />
      <VideoCallout text="An AI QA agent in Cursor combines the Wopee.io, Playwright and Atlassian MCP servers to retest a Jira bug and post the report back." />
      <OpenSourceSection />
      <TestimonialCarousel />
      {/* The page's yellow field (DESIGN.md, Components): flat yellow, ink type, an ink primary button. */}
      <section className="bg-primary-wopee text-gray-900">
        <div className="container flex flex-col justify-center gap-6 py-16 text-center lg:gap-10 lg:py-20">
          <div className="text-balance px-2 lg:px-0">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Bring autonomous testing to your AI workflow
            </h2>
            <p className="m-0 text-2xl text-gray-900 lg:text-3xl">
              Set up in minutes, start testing immediately.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row lg:gap-5">
            <div className="h-20">
              <ButtonPrimary
                label="Start for free"
                href={`${cmdBaseUrl}/login`}
                className="w-60 h-[50px] !bg-gray-900 !border-gray-900 !text-white group-hover:!bg-gray-700 group-hover:!border-gray-700"
                id="cta-mcp-footer"
              />
              <p className="text-center text-sm text-gray-900">No credit card required</p>
            </div>
            <div className="sm:h-20">
              <ButtonPrimaryInverted
                href="/book-demo/"
                className="w-60 h-[50px] !text-gray-900 !border-gray-900 group-hover:!bg-gray-900/10 hover:!bg-gray-900/10"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default McpPage;
