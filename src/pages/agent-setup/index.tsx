import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

import AgentSetupCard, { agentSetupLinkClass } from "@site/src/components/agent-setup/AgentSetupCard";
import GradientCard from "@site/src/components/ui/GradientCard";
import PROMPT_MD from "@site/static/agent-setup/prompt.md";

// A plain <a> for the static file: Docusaurus <Link> treats it as a route.
const PROMPT_PATH = "/agent-setup/prompt.md";
const VERSION = PROMPT_MD.match(/^version:\s*(\S+)/m)?.[1];

const STEPS: [string, string][] = [
  ["Checks your setup", "Detects your coding agent and OS, and checks Node.js 20.18 or newer. It never installs Node.js for you."],
  ["Shows you the plan", "Lists the file it will change and waits for your yes. Your agent's own permission prompts stay on."],
  ["Adds one MCP server", "One entry named wopee that runs npx -y wopee-mcp and reads your key from the environment or a git-ignored .env file."],
  ["Sends you to Commander for the key", "New users sign up with their app's URL and get a free first crawl. You copy the project UUID and API key and type them in yourself."],
  ["Checks the connection", "After a restart, one read-only call lists your analyses and tests."],
  ["Offers a first run", "It asks before it starts a test run or an analysis, because runs count toward your plan."],
];

const CHANGES = [
  "One MCP server entry named wopee in your agent's config (.mcp.json, .cursor/mcp.json, .vscode/mcp.json or ~/.codex/config.toml)",
  "With your OK: a .env file with empty WOPEE_API_KEY and WOPEE_PROJECT_UUID lines, and .env in .gitignore",
];

const NEVER = [
  "Asks for your API key in the chat or writes it into a committed file",
  "Uses sudo, global installs, curl | bash or edits your shell profile",
  "Turns off TLS or certificate checks",
  "Starts a test run or an analysis without your yes",
  "Visits hosts other than wopee.io, docs.wopee.io, cmd.wopee.io and npm",
];

const List = ({ items }: { items: string[] }) => (
  <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-gray-700 dark:text-gray-300">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const AgentSetupPage = () => (
  <Layout
    title="Set up Wopee.io from your coding agent"
    description="Paste one line into Claude Code, Cursor, Copilot or Codex. Your agent shows you the plan and connects the Wopee.io MCP server after your yes."
  >
    <main className="container flex max-w-4xl flex-col gap-16 px-6 py-12 lg:py-20">
      <section className="flex flex-col items-center gap-6 text-center">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-primary-wopee/10 dark:text-primary-wopee">
          Agent setup
        </span>
        <h1 className="m-0 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Set up Wopee.io
          <br />
          <span className="hero-key">from your coding agent</span>
        </h1>
        <p className="m-0 max-w-2xl text-lg text-gray-600 text-balance dark:text-gray-300 sm:text-xl">
          Paste one line into Claude Code, Cursor, GitHub Copilot or Codex. Your agent follows a public setup file, shows
          you the plan, and connects the Wopee.io MCP server after your yes.
        </p>
        <AgentSetupCard title="Copy this line" primary explainHref="#what-it-does" className="mt-2" />
        <p className="m-0 text-sm text-gray-600 dark:text-gray-300">
          Prefer to set it up by hand?{" "}
          <Link href="https://docs.wopee.io/guides/wopee-mcp/" className={agentSetupLinkClass}>
            MCP guide for each client
          </Link>
        </p>
      </section>

      <section aria-labelledby="what-it-does" className="flex flex-col gap-6">
        <h2 id="what-it-does" className="m-0 text-3xl font-bold lg:text-4xl">
          What your agent does
        </h2>
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {STEPS.map(([title, text]) => (
            <li key={title} className="rounded-2xl border border-solid border-gray-200 p-5 dark:border-white/10">
              <p className="m-0 font-bold text-gray-900 dark:text-white">{title}</p>
              <p className="m-0 mt-1 text-gray-600 dark:text-gray-300">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="what-it-changes" className="grid gap-6 md:grid-cols-2">
        <GradientCard>
          <h2 id="what-it-changes" className="m-0 mb-4 text-2xl font-bold">
            What it changes
          </h2>
          <List items={CHANGES} />
        </GradientCard>
        <GradientCard>
          <h2 className="m-0 mb-4 text-2xl font-bold">What it never does</h2>
          <List items={NEVER} />
        </GradientCard>
      </section>

      <section aria-labelledby="full-text" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="full-text" className="m-0 text-3xl font-bold lg:text-4xl">
            The full instructions
          </h2>
          <a href={PROMPT_PATH} className={agentSetupLinkClass}>
            Open prompt.md
          </a>
        </div>
        <p className="m-0 text-gray-600 dark:text-gray-300">
          This is the exact file your agent reads{VERSION ? ` (version ${VERSION})` : ""}. Nothing is hidden, and the
          same text is served to every agent.
        </p>
        <pre
          tabIndex={0}
          aria-label="prompt.md"
          className="!m-0 max-h-[640px] overflow-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee whitespace-pre-wrap rounded-xl border border-solid border-gray-200 !bg-gray-50 p-5 text-sm leading-6 !text-gray-800 [overflow-wrap:anywhere] dark:border-white/10 dark:!bg-[#181f2e] dark:!text-gray-200"
        >
          <code className="!border-0 !bg-transparent !p-0">{PROMPT_MD}</code>
        </pre>
      </section>
    </main>
  </Layout>
);

export default AgentSetupPage;
