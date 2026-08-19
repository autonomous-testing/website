import {
  mdiEyeCheckOutline,
  mdiTestTube,
  mdiCogSync,
  mdiChartLine,
  mdiLightningBolt,
  mdiPuzzle,
  mdiGithub,
  mdiNpm,
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
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import TestimonialCarousel from "@site/src/components/landing-page/home/sections/TestimonialCarousel";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import GradientCard from "@site/src/components/ui/GradientCard";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

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

// Real brand marks (single-path SVGs; simple-icons: claude/cursor/windsurf
// current set, visualstudiocode from v12.4.0 pre-trademark-purge). Rendered
// white on the existing brand-gradient tiles.
const BRAND_PATHS: Record<string, string> = {
  claude: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
  cursor: "M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23",
  windsurf: "M23.55 5.067c-1.2038-.002-2.1806.973-2.1806 2.1765v4.8676c0 .972-.8035 1.7594-1.7597 1.7594-.568 0-1.1352-.286-1.4718-.7659l-4.9713-7.1003c-.4125-.5896-1.0837-.941-1.8103-.941-1.1334 0-2.1533.9635-2.1533 2.153v4.8957c0 .972-.7969 1.7594-1.7596 1.7594-.57 0-1.1363-.286-1.4728-.7658L.4076 5.1598C.2822 4.9798 0 5.0688 0 5.2882v4.2452c0 .2147.0656.4228.1884.599l5.4748 7.8183c.3234.462.8006.8052 1.3509.9298 1.3771.313 2.6446-.747 2.6446-2.0977v-4.893c0-.972.7875-1.7593 1.7596-1.7593h.003a1.798 1.798 0 0 1 1.4718.7658l4.9723 7.0994c.4135.5905 1.05.941 1.8093.941 1.1587 0 2.1515-.9645 2.1515-2.153v-4.8948c0-.972.7875-1.7594 1.7596-1.7594h.194a.22.22 0 0 0 .2204-.2202v-4.622a.22.22 0 0 0-.2203-.2203Z",
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
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "Claude Desktop",
    description: "AI agent by Anthropic",
    icon: <BrandMark id="claude" />,
    gradient: "from-orange-400 to-yellow-500",
  },
  {
    name: "Cursor",
    description: "AI-first code editor",
    icon: <BrandMark id="cursor" />,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "VS Code",
    description: "With Copilot or extensions",
    icon: <BrandMark id="vscode" />,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    name: "Windsurf",
    description: "AI-powered IDE",
    icon: <BrandMark id="windsurf" />,
    gradient: "from-teal-400 to-emerald-500",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Install",
    subtitle: "One npm package, instant setup",
    code: "npm install -g wopee-mcp\n# or run directly\nnpx wopee-mcp",
    description:
      "Run instantly with npx, the server starts in seconds. No global install needed.",
  },
  {
    step: "2",
    title: "Connect",
    subtitle: "Works with any MCP client",
    code: "// Copy the mcp-config.json snippet from the top of this page\n// and paste it into your AI tool's MCP config.",
    description:
      "Two values from your Wopee.io dashboard. Paste into your AI tool's MCP config, that's all you need.",
  },
  {
    step: "3",
    title: "Test",
    subtitle: "Natural language, real results",
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
              className={`pl-4 border-l-2 border-purple-500/40 ${isFirst ? "pt-0" : ""} ${isLast ? "mb-3" : ""} py-0.5 animate-[fadeIn_0.3s_ease-in]`}
            >
              <span className="text-purple-400">{line.name}</span>{" "}
              <span className="text-gray-600">{line.text}</span>
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
      "command": "npx wopee-mcp",
      "env": {
        "WOPEE_PROJECT_UUID": "your-project-uuid-here",
        "WOPEE_API_KEY": "your-api-key-here"
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
    <div className="w-full max-w-2xl mx-auto mt-4 rounded-xl overflow-hidden border border-gray-700 shadow-xl text-left">
      <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between">
        <span className="text-gray-400 text-xs font-mono">mcp-config.json</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Config copied" : "Copy config"}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-transparent border-0 cursor-pointer p-0 transition-colors"
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

const HeroSection = () => (
  <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center relative">
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex justify-center gap-3 items-center">
        <span className="bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee text-sm font-semibold px-4 py-1.5 rounded-full border border-secondary-wopee/20 dark:border-primary-wopee/20">
          MCP Server
        </span>
        <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-purple-500/20">
          Available on npm
        </span>
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
        <span className="text-secondary-wopee dark:text-primary-wopee">
          Autonomous testing
        </span>
        <br className="hidden sm:block" />
        {" "}in your AI coding agent
      </h1>

      <p className="text-xl sm:text-2xl opacity-80 max-w-2xl mx-auto text-balance">
        Your coding agent runs the tests and files the bugs, straight into
        GitHub. Connect Wopee.io to generate tests, dispatch testing agents,
        and check results without leaving your editor.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-6">
        <div className="flex flex-col items-center gap-1.5">
          <ButtonPrimary
            label="Start for free"
            href={`${cmdBaseUrl}/login`}
            className="w-64 h-[54px] text-lg"
            id="cta-mcp-hero"
          />
          <span className="text-xs opacity-50">No credit card required</span>
        </div>
        <Link
          href="https://github.com/Wopee-io/wopee-mcp"
          className="group inline-flex items-center gap-2 text-base font-medium hover:no-underline opacity-70 hover:opacity-100 transition-opacity"
        >
          <Icon path={mdiGithub} size={1} />
          View on GitHub
          <span className="group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm opacity-60">
        <span>npm package</span>
        <span>&#x2022;</span>
        <span>15 MCP tools</span>
        <span>&#x2022;</span>
        <span>Node.js 18+</span>
      </div>

      <InstallSnippet />
    </div>

    <div className="w-full max-w-3xl mt-4 rounded-xl overflow-hidden shadow-2xl shadow-secondary-wopee/20 dark:shadow-primary-wopee/20 border border-secondary-wopee/30 dark:border-primary-wopee/30">
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
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
      <Link
        href="https://docs.wopee.io/guides/wopee-mcp/"
        className="mt-4 text-sm opacity-60 hover:opacity-100 transition-opacity hover:no-underline"
      >
        Read the docs &rarr;
      </Link>
    </div>
  </div>
);

const ProblemSection = () => (
  <div className="bg-gradient-to-br from-secondary-wopee via-purple-600 to-secondary-wopee dark:from-primary-wopee dark:to-white text-balance flex flex-col gap-10 px-10 py-20">
    <h2 className="text-4xl sm:text-5xl text-white dark:text-secondary-wopee font-bold text-center">
      Your AI can code. But who tests the output?
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-primary-wopee dark:text-secondary-wopee text-xl sm:text-2xl lg:text-3xl text-left items-center container">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-secondary-wopee/20 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">&#x2717;</div>
        <p>
          Your CI catches technical errors but{" "}
          <span className="font-bold">misses broken user flows</span>
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-secondary-wopee/20 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">&#x2717;</div>
        <p>
          Writing test scripts manually{" "}
          <span className="font-bold">slows down every release</span>
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-secondary-wopee/20 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">&#x2717;</div>
        <p>
          You leave your editor to{" "}
          <span className="font-bold">open a separate testing dashboard</span>
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-secondary-wopee/20 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">&#x2717;</div>
        <p>
          Testing dozens of user flows manually{" "}
          <span className="font-bold">doesn't scale</span>
        </p>
      </div>
    </div>
    <div className="mt-10 pt-8 border-t border-white/20 dark:border-secondary-wopee/20 max-w-3xl mx-auto text-center">
      <p className="text-2xl sm:text-3xl text-white dark:text-secondary-wopee font-bold">
        Wopee.io MCP bridges the gap. Test from where you code.
      </p>
    </div>
  </div>
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
        <GradientCard
          key={cap.title}
          className="group transition-transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-xl bg-secondary-wopee/15 dark:bg-primary-wopee/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon
              path={cap.icon}
              size={1.5}
              className="text-secondary-wopee dark:text-primary-wopee"
            />
          </div>
          <h3 className="text-xl font-bold mb-1">{cap.title}</h3>
          <code className="text-xs text-secondary-wopee/60 dark:text-primary-wopee/60 mb-2 inline-block font-normal">
            {cap.tool}
          </code>
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
        className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg"
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
        Up and running in{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          3 minutes
        </span>
      </h2>
      <p className="text-xl opacity-70 max-w-2xl mx-auto">
        Install the npm package, add it to your MCP config, and start testing
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
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700">
              <div className="px-4 py-2.5 flex items-center gap-2 bg-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-500 text-xs font-mono ml-2">
                  {index === 0
                    ? "terminal"
                    : index === 1
                    ? "mcp-config.json"
                    : "conversation"}
                </span>
              </div>
              <pre className="!bg-transparent p-5 text-sm sm:text-base !text-gray-300 overflow-x-auto m-0">
                <code className="!bg-transparent !text-gray-300">{step.code}</code>
              </pre>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-3/4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary-wopee dark:bg-primary-wopee text-white dark:text-secondary-wopee font-bold text-xl flex items-center justify-center shadow-lg shadow-secondary-wopee/30 dark:shadow-primary-wopee/30">
                {step.step}
              </span>
              <h3 className="text-3xl lg:text-4xl font-bold">{step.title}</h3>
            </div>
            <p className="text-secondary-wopee dark:text-primary-wopee text-2xl lg:text-3xl font-bold">
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
  <div className="flex flex-col justify-center text-center text-balance gap-10 lg:my-16 py-20 bg-gradient-to-b from-transparent via-primary-wopee/30 dark:via-secondary-wopee/30 to-transparent">
    <div className="px-2 lg:px-0">
      <h2 className="text-3xl lg:text-5xl font-bold mb-4">
        Plug into the AI tools you already use
      </h2>
      <p className="text-xl opacity-70 max-w-2xl mx-auto">
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

    <div className="flex flex-wrap justify-center gap-6 container px-5">
      {COMPATIBLE_TOOLS.map((tool) => (
        <div
          key={tool.name}
          className="flex items-center gap-4 px-6 py-5 rounded-xl border border-solid border-gray-200 dark:border-gray-700 hover:border-secondary-wopee dark:hover:border-primary-wopee transition-all hover:shadow-lg min-w-[230px]"
        >
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md`}
          >
            {tool.icon}
          </div>
          <div className="text-left">
            <p className="font-bold text-lg">{tool.name}</p>
            <p className="text-sm opacity-60">{tool.description}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-4 px-6 py-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 min-w-[230px] hover:border-secondary-wopee dark:hover:border-primary-wopee transition-all">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">+</div>
        <div className="text-left">
          <p className="font-bold text-lg">Any MCP client</p>
          <p className="text-sm opacity-60">Open standard</p>
        </div>
      </div>
    </div>

    <div className="px-2 lg:px-0">
      <ButtonPrimary
        label="Try it with your AI tool"
        href={`${cmdBaseUrl}/login`}
        id="cta-mcp-tools"
        className="w-64 h-[50px]"
      />
    </div>
  </div>
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white font-semibold hover:no-underline hover:bg-gray-800 transition-colors"
          >
            <Icon path={mdiGithub} size={0.9} />
            Star on GitHub
          </Link>
          <Link
            href="https://www.npmjs.com/package/wopee-mcp"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:no-underline hover:bg-red-700 transition-colors"
          >
            <Icon path={mdiNpm} size={0.9} />
            npm
          </Link>
        </div>
      </div>
      <div className="flex-1 w-full">
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/15">
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
                <p className="text-purple-300/80 text-xs mb-1.5 select-none">
                  # {group.label.toLowerCase()}
                </p>
                <div>
                  {group.tools.map(([tool, desc]) => (
                    <div
                      key={tool}
                      className="grid grid-cols-1 md:grid-cols-[minmax(0,16rem)_1fr] gap-x-4 px-2 py-1 -mx-2 rounded-md hover:bg-white/5 transition-colors"
                    >
                      <code className="!bg-transparent !border-0 !p-0 text-primary-wopee">
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
  operatingSystem: "Cross-platform (Node.js 18+)",
  url: "https://wopee.io/mcp/",
  description:
    "Model Context Protocol server that connects Claude Code, Claude Desktop, Cursor, VS Code, Windsurf, and other MCP clients to Wopee.io. Dispatch autonomous testing agents, generate test artifacts, fetch execution results, and manage test suites from natural-language conversation.",
  softwareRequirements: "Node.js 18+",
  downloadUrl: "https://www.npmjs.com/package/wopee-mcp",
  installUrl: "https://www.npmjs.com/package/wopee-mcp",
  publisher: {
    "@type": "Organization",
    name: "Wopee.io",
    url: "https://wopee.io",
  },
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
    "Wopee.io's Model Context Protocol server for agentic testing. Compatible with Claude Code, Claude Desktop, Cursor, VS Code, Windsurf, and any MCP client.",
  codeRepository: "https://github.com/Wopee-io/wopee-mcp",
  programmingLanguage: "TypeScript",
  runtimePlatform: "Node.js",
  url: "https://wopee.io/mcp/",
  author: {
    "@type": "Organization",
    name: "Wopee.io",
    url: "https://wopee.io",
  },
};

const McpPage = () => {
  return (
    <Layout
      title="MCP Server for Autonomous Testing"
      description="MCP server that connects Claude, Cursor, and other AI coding agents to Wopee.io. Dispatch tests, generate artifacts, and fetch results in chat."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(JSONLD_MCP_APP)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(JSONLD_MCP_SOURCE)}
        </script>
      </Head>
      <HeroSection />
      <ProblemSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <CompatibleToolsSection />
      <OpenSourceSection />
      <TestimonialCarousel />
      <div className="bg-gradient-to-b from-transparent to-primary-wopee dark:to-secondary-wopee">
        <div className="container my-12 lg:my-16 h-[50vh] flex flex-col justify-center gap-5 lg:gap-10 text-center">
          <div className="text-balance px-2 lg:px-0">
            <h2 className="lg:text-4xl text-3xl font-bold">
              Bring autonomous testing to your AI workflow
            </h2>
            <h3 className="text-secondary-wopee dark:text-primary-wopee lg:text-4xl text-3xl font-bold">
              Set up in minutes, start testing immediately.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 items-center lg:gap-5">
            <div className="h-20">
              <ButtonPrimary
                label="Start for free"
                href={`${cmdBaseUrl}/login`}
                className="w-60 h-[50px]"
                id="cta-mcp-footer"
              />
              <p className="text-center text-sm italic">No credit card required</p>
            </div>
            <div className="sm:h-20">
              <ButtonPrimaryInverted href="/book-demo/" className="w-60 h-[50px]" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default McpPage;
