import {
  mdiApi,
  mdiChatProcessingOutline,
  mdiGithub,
  mdiGitlab,
  mdiGraphql,
  mdiMicrosoftTeams,
  mdiMicrosoftVisualStudioCode,
  mdiRobotOutline,
  mdiSlack,
  mdiSourceBranch,
  mdiTestTube,
} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import Link from "@docusaurus/Link";

import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

type IntegrationLink = { label: string; href: string };

type Integration = {
  name: string;
  icon: string;
  badge?: string;
  description: React.ReactNode;
  links?: IntegrationLink[];
};

type Category = {
  id: string;
  title: string;
  intro: string;
  items: Integration[];
};

const CATEGORIES: Category[] = [
  {
    id: "ai-coding-agents",
    title: "AI coding agents",
    intro:
      "Run Wopee.io from your editor through the open-source wopee-mcp server. Any MCP client can generate tests, dispatch testing agents, fetch results, and file bugs — in plain conversation.",
    items: [
      {
        name: "Claude Code",
        icon: mdiRobotOutline,
        description:
          "Anthropic's CLI agent. Add wopee-mcp to your MCP config and dispatch testing agents straight from the terminal.",
        links: [
          { label: "MCP Server", href: "/mcp/" },
          { label: "Docs", href: "https://docs.wopee.io/guides/wopee-mcp/" },
        ],
      },
      {
        name: "Claude Desktop",
        icon: mdiRobotOutline,
        description:
          "Chat with your testing project from Claude Desktop — generate user stories, run tests, and review results.",
        links: [
          { label: "MCP Server", href: "/mcp/" },
          { label: "Docs", href: "https://docs.wopee.io/guides/wopee-mcp/" },
        ],
      },
      {
        name: "Cursor",
        icon: mdiRobotOutline,
        description:
          "Ask Cursor to test the flow you just built. Wopee.io agents run it in a real browser and report back.",
        links: [
          { label: "MCP Server", href: "/mcp/" },
          { label: "Docs", href: "https://docs.wopee.io/guides/wopee-mcp/" },
        ],
      },
      {
        name: "VS Code",
        icon: mdiMicrosoftVisualStudioCode,
        description:
          "Works with GitHub Copilot and MCP-enabled extensions, so you can test without leaving your editor.",
        links: [
          { label: "MCP Server", href: "/mcp/" },
          { label: "Docs", href: "https://docs.wopee.io/guides/wopee-mcp/" },
        ],
      },
      {
        name: "Windsurf",
        icon: mdiRobotOutline,
        description:
          "Connect once in the MCP config, then generate and run tests in natural language from the AI-powered IDE.",
        links: [
          { label: "MCP Server", href: "/mcp/" },
          { label: "Docs", href: "https://docs.wopee.io/guides/wopee-mcp/" },
        ],
      },
    ],
  },
  {
    id: "chatops",
    title: "ChatOps",
    intro:
      "Test results where your team already talks — and a testing agent you can talk back to.",
    items: [
      {
        name: "Slack",
        icon: mdiSlack,
        description:
          "One-click install from your project settings. Test results are pushed to the channel you pick, and you can mention the testing agent to ask about results or trigger work — right from Slack.",
      },
      {
        name: "Microsoft Teams",
        icon: mdiMicrosoftTeams,
        badge: "Beta",
        description: (
          <>
            The same two-way agent chat, in Teams. In beta —{" "}
            <Link href="/book-demo/">contact us</Link> for early access.
          </>
        ),
      },
    ],
  },
  {
    id: "git-ci",
    title: "Git & CI",
    intro:
      "Your tests are real Playwright code in a Git repository you can open, edit, and keep.",
    items: [
      {
        name: "GitHub",
        icon: mdiGithub,
        description:
          "Every Wopee.io project gets a GitHub repository with your generated Playwright tests — real code, full history, no lock-in.",
        links: [{ label: "Docs", href: "https://docs.wopee.io/" }],
      },
      {
        name: "GitHub Actions",
        icon: mdiSourceBranch,
        description:
          "Agent runs execute as GitHub Actions workflows, and the raw CI logs are available live in the app for every run.",
      },
      {
        name: "GitLab",
        icon: mdiGitlab,
        description:
          "Sign in to Wopee.io with your GitLab account. And because generated tests are plain Playwright, they run in GitLab CI like any other suite.",
      },
    ],
  },
  {
    id: "test-frameworks",
    title: "Test frameworks",
    intro:
      "Playwright is native — agents generate and run plain Playwright tests. Visual testing SDKs cover the other frameworks your suites already use.",
    items: [
      {
        name: "Playwright",
        icon: mdiTestTube,
        description:
          "Native. Agents generate plain Playwright tests, and the visual testing SDK adds AI-powered visual checks to suites you already have.",
        links: [
          {
            label: "Docs",
            href: "https://docs.wopee.io/playwright-visual-testing/",
          },
        ],
      },
      {
        name: "Cypress",
        icon: mdiTestTube,
        description:
          "Visual testing SDK for Cypress — add visual checks to your existing specs with a few lines of code.",
        links: [
          {
            label: "Docs",
            href: "https://docs.wopee.io/cypress/01-getting-started/",
          },
        ],
      },
      {
        name: "Robot Framework",
        icon: mdiTestTube,
        description:
          "Visual testing SDK with listener and library modes, supporting both Selenium and Browser Library.",
        links: [
          {
            label: "Docs",
            href: "https://docs.wopee.io/robot-framework/01-getting-started/",
          },
        ],
      },
      {
        name: "WebdriverIO",
        icon: mdiTestTube,
        description:
          "Visual testing SDK for WebdriverIO, including full-page visual capture for native mobile apps.",
        links: [
          {
            label: "Docs",
            href: "https://docs.wopee.io/webdriverio-visual-testing/",
          },
        ],
      },
    ],
  },
  {
    id: "api",
    title: "API",
    intro: "Everything above is built on the same API you can use yourself.",
    items: [
      {
        name: "GraphQL API",
        icon: mdiGraphql,
        description:
          "The GraphQL API powers the app, the MCP server, and the SDKs. Create a per-project API key in your project settings and automate the rest.",
      },
    ],
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  "ai-coding-agents": mdiRobotOutline,
  chatops: mdiChatProcessingOutline,
  "git-ci": mdiSourceBranch,
  "test-frameworks": mdiTestTube,
  api: mdiApi,
};

const HeroSection = () => (
  <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center relative">
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex justify-center gap-3 items-center">
        <span className="bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee text-sm font-semibold px-4 py-1.5 rounded-full border border-secondary-wopee/20 dark:border-primary-wopee/20">
          Integrations
        </span>
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
        Testing that{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          plugs into your stack
        </span>
      </h1>

      <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-balance">
        Wopee.io integrations connect autonomous testing to the tools your team
        already uses: AI coding agents such as Claude Code, Cursor, VS Code, and
        Windsurf through the Model Context Protocol (MCP); ChatOps in Slack and
        Microsoft Teams; GitHub repositories and GitHub Actions for test
        execution; test frameworks including Playwright, Cypress, Robot
        Framework, and WebdriverIO; and a GraphQL API that powers all of it.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-4">
        <div className="flex flex-col items-center gap-1.5">
          <ButtonPrimary
            label="Start free trial"
            href={`${cmdBaseUrl}/login`}
            className="w-64 h-[54px] text-lg"
            id="cta-integrations-hero"
          />
          <span className="text-xs opacity-50">No credit card required</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm opacity-60">
        {CATEGORIES.map((category, index) => (
          <React.Fragment key={category.id}>
            {index > 0 && <span>&#x2022;</span>}
            <a href={`#${category.id}`} className="hover:opacity-100">
              {category.title}
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

const IntegrationCard = ({ item }: { item: Integration }) => (
  <div className="flex flex-col gap-3 p-6 rounded-xl border border-solid border-gray-200 dark:border-gray-700 hover:border-secondary-wopee dark:hover:border-primary-wopee transition-all hover:shadow-lg">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-secondary-wopee/15 dark:bg-primary-wopee/15 flex items-center justify-center flex-shrink-0">
        <Icon
          path={item.icon}
          size={1.1}
          className="text-secondary-wopee dark:text-primary-wopee"
        />
      </div>
      <p className="font-bold text-lg mb-0">{item.name}</p>
      {item.badge && (
        <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-purple-500/20">
          {item.badge}
        </span>
      )}
    </div>
    <p className="opacity-70 text-balance mb-0">{item.description}</p>
    {item.links && (
      <div className="flex flex-wrap gap-4 mt-auto pt-1">
        {item.links.map((link) => (
          <Link
            key={link.href + link.label}
            href={link.href}
            className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-sm"
          >
            {link.label} &rarr;
          </Link>
        ))}
      </div>
    )}
  </div>
);

const CategorySection = ({ category }: { category: Category }) => (
  <div id={category.id} className="container my-14 lg:my-20 px-5 lg:px-10">
    <div className="mb-8 lg:mb-10 max-w-3xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-secondary-wopee/15 dark:bg-primary-wopee/15 flex items-center justify-center flex-shrink-0">
          <Icon
            path={CATEGORY_ICONS[category.id]}
            size={1}
            className="text-secondary-wopee dark:text-primary-wopee"
          />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-0">
          {category.title}
        </h2>
      </div>
      <p className="text-lg opacity-70 mb-0">{category.intro}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.items.map((item) => (
        <IntegrationCard key={item.name} item={item} />
      ))}
    </div>
  </div>
);

const IntegrationsPage = () => {
  return (
    <Layout
      title="Integrations: MCP, Slack, GitHub, Playwright"
      description="Wopee.io integrations: connect Claude Code, Cursor, Slack, GitHub Actions, Playwright, Cypress, and Robot Framework via MCP, ChatOps, and a GraphQL API."
    >
      <HeroSection />
      {CATEGORIES.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
      <div className="bg-gradient-to-b from-transparent to-primary-wopee dark:to-secondary-wopee">
        <div className="container my-12 lg:my-16 h-[40vh] flex flex-col justify-center gap-5 lg:gap-10 text-center">
          <div className="text-balance px-2 lg:px-0">
            <h2 className="lg:text-4xl text-3xl font-bold">
              Bring autonomous testing to your stack
            </h2>
            <h3 className="text-secondary-wopee dark:text-primary-wopee lg:text-4xl text-3xl font-bold">
              Connect your first tool in minutes.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 items-center lg:gap-5">
            <div className="h-20">
              <ButtonPrimary
                label="Start free trial"
                href={`${cmdBaseUrl}/login`}
                className="w-60 h-[50px]"
                id="cta-integrations-footer"
              />
              <p className="text-center text-sm italic">
                No credit card required
              </p>
            </div>
            <div className="sm:h-20">
              <ButtonPrimaryInverted
                href="/book-demo/"
                className="w-60 h-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IntegrationsPage;
