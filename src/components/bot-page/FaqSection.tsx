import React, { useState } from "react";
import Head from "@docusaurus/Head";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

// JSON-LD answers must stay word-identical to the visible answers below
// (links live only in the visible HTML).
const FAQS: {
  question: string;
  answer: string;
  render?: React.ReactNode;
}[] = [
  {
    question: "What is an AI testing agent?",
    answer:
      "AI testing agents are autonomous software programs that explore a web app, generate test cases, execute them, and adapt when the UI changes — without human-written scripts. Wopee.io's agents generate Playwright tests and run visual and functional validations across browsers.",
  },
  {
    question: "What is a testing bot?",
    answer:
      "A testing bot is an autonomous AI agent that explores a web app, generates test cases, executes them, and adapts when the UI changes — without human-written scripts. Wopee.io's testing bot generates Playwright tests you can export and run in your own CI/CD.",
  },
  {
    question: "How do Wopee.io's AI testing agents work?",
    answer:
      "Point the agent at your web app's URL. It autonomously crawls the application, discovers user flows, and generates Playwright test cases — no scripts, no selectors, no programming. Tests run across browsers, returning screenshots, traces, and video recordings.",
    render: (
      <>
        Point the agent at your web app's URL. It autonomously crawls the
        application, discovers user flows, and{" "}
        <a href="/blog/playwright-bot-ai-powered-test-automation/">
          generates Playwright test cases
        </a>{" "}
        — no scripts, no selectors, no programming. Tests run across browsers,
        returning screenshots, traces, and video recordings.
      </>
    ),
  },
  {
    question: "What happens when my UI changes?",
    answer:
      "Tests self-heal instead of breaking. Wopee.io agents adapt automatically where traditional test frameworks would break, and you approve visual baseline updates with a single click — or report bugs directly. Your team focuses on shipping, not fixing flaky tests.",
    render: (
      <>
        Tests{" "}
        <a href="/blog/self-healing-in-sw-test-automation/">self-heal</a>{" "}
        instead of breaking. Wopee.io agents adapt automatically where
        traditional test frameworks would break, and you approve visual
        baseline updates with a single click — or report bugs directly. Your
        team focuses on shipping, not fixing flaky tests.
      </>
    ),
  },
  {
    question: "Is the testing bot fully autonomous?",
    answer:
      "Not fully — you provide project context, review generated tests, and own test strategy; autonomy grows as your inputs mature. What works reliably today: autonomous test generation from a URL, self-healing of broken locators, and visual regression testing.",
    render: (
      <>
        Not fully — you provide project context, review generated tests, and
        own test strategy; autonomy grows as your inputs mature. What works
        reliably today: autonomous test generation from a URL, self-healing of
        broken locators, and{" "}
        <a href="/visual-testing/">visual regression testing</a>.
      </>
    ),
  },
  {
    question: "Do I need to write code to use Wopee.io's testing bot?",
    answer:
      "No. Setup takes 1 minute: enter your web app's URL and the agent starts exploring immediately — no scripts, no selectors, no programming. Detailed results with screenshots, traces, and video recordings are ready in about 2 minutes.",
  },
  {
    question: "How much does Wopee.io cost?",
    answer:
      "Starter is 19 € per user per month, Basic 79 €, Premium 179 €, and Enterprise is custom with on-premise deployment. You start completely free — no credit card required — with a 14-day money-back guarantee.",
    render: (
      <>
        <a href="/pricing/">
          Starter is 19 € per user per month, Basic 79 €, Premium 179 €
        </a>
        , and Enterprise is custom with on-premise deployment. You start
        completely free — no credit card required — with a 14-day money-back
        guarantee.
      </>
    ),
  },
  {
    question: "Does it integrate with our existing test framework and CI/CD?",
    answer:
      "Yes. Wopee.io works with Playwright, Cypress, Robot Framework, and WebdriverIO-based frameworks, plus custom frameworks through open interfaces. CI/CD integrations include GitHub Actions, Jenkins, GitLab, Bitbucket, and CircleCI, plus a GraphQL API and an MCP server for agent-based workflows.",
  },
  {
    question: "Is our code and test data safe?",
    answer:
      "Wopee.io is SOC 2 ready and never trains models on your code or test data. Run agents in the fully managed cloud, or choose Enterprise for on-premise deployment, SSO, RBAC, audit logs, and a security review with DPA.",
  },
];

const JSONLD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

const FaqSection = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="py-16 lg:py-24 px-4 lg:px-8 text-slate-900 dark:text-white transition-colors duration-300">
      <Head>
        <script type="application/ld+json">{JSON.stringify(JSONLD_FAQ)}</script>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">
          AI testing agents: frequently asked questions
        </h2>

        <div>
          {FAQS.map((faq, index) => (
            <div
              key={faq.question}
              className="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
            >
              <h3 className="m-0">
                <button
                  className="bg-transparent border-none w-full flex justify-between items-center py-4 text-left text-lg font-bold focus:outline-none focus:ring-0 group text-slate-900 dark:text-white"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <Icon
                    path={openIndices.includes(index) ? mdiMinus : mdiPlus}
                    size={1}
                    className="flex-shrink-0 ml-4 text-slate-500 dark:text-slate-400"
                  />
                </button>
              </h3>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndices.includes(index)
                    ? "max-h-[1000px] opacity-100 mb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-600 dark:text-slate-400 m-0">
                  {faq.render ?? faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
