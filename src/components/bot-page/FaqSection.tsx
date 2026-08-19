import React, { useState } from "react";
import Head from "@docusaurus/Head";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

// JSON-LD answers must stay word-identical to the visible answers below
// (links live only in the visible HTML).
const FAQS: {
  question: string;
  answer: string;
  link?: {
    href: string;
    text: string;
  };
}[] = [
  {
    question: "What is an AI testing agent?",
    answer:
      "AI testing agents are autonomous software programs that explore a web app, generate and execute test cases, and adapt when the UI changes without human-written scripts. Wopee.io's agents generate Playwright tests and run visual and functional validations across browsers.",
  },
  {
    question: "What is a testing bot?",
    answer:
      "A testing bot is an autonomous AI agent that explores a web app, generates and executes test cases, and adapts when the UI changes without human-written scripts. Wopee.io's testing bot generates Playwright tests you can export and run in your own CI/CD.",
  },
  {
    question: "How do Wopee.io's AI testing agents work?",
    answer:
      "Point the agent at your web app's URL. It autonomously crawls the application, discovers user flows, and generates Playwright test cases. No scripts, no selectors, no programming. Tests run across browsers, returning screenshots, traces, and video recordings.",
    link: {
      href: "/blog/playwright-bot-ai-powered-test-automation/",
      text: "generates Playwright test cases",
    },
  },
  {
    question: "What happens when my UI changes?",
    answer:
      "Tests self-heal instead of breaking. Wopee.io agents adapt automatically where traditional test frameworks would break. You approve visual baseline updates with a single click or report bugs directly. Your team focuses on shipping, not fixing flaky tests.",
    link: {
      href: "/blog/self-healing-in-sw-test-automation/",
      text: "self-heal",
    },
  },
  {
    question: "Is the testing bot fully autonomous?",
    answer:
      "Not fully. You provide project context, review generated tests, and own test strategy; autonomy grows as your inputs mature. What works reliably today: autonomous test generation from a URL, self-healing of broken locators, and visual regression testing.",
    link: {
      href: "/visual-testing/",
      text: "visual regression testing",
    },
  },
  {
    question: "Do I need to write code to use Wopee.io's testing bot?",
    answer:
      "No. Setup takes 1 minute. Enter your web app's URL and the agent starts exploring immediately, with no scripts, selectors, or programming. Detailed results with screenshots, traces, and video recordings are ready in about 2 minutes.",
  },
  {
    question: "How much does Wopee.io cost?",
    answer:
      "Starter is 19 € per user per month, Basic 79 €, Premium 179 €, and Enterprise is custom with on-premise deployment. You start completely free, with no credit card required and a 14-day money-back guarantee.",
    link: {
      href: "/pricing/",
      text: "Starter is 19 € per user per month, Basic 79 €, Premium 179 €",
    },
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

const renderAnswer = ({ answer, link }: (typeof FAQS)[number]) => {
  if (!link) {
    return answer;
  }

  const linkStart = answer.indexOf(link.text);

  if (linkStart === -1) {
    return answer;
  }

  return (
    <>
      {answer.slice(0, linkStart)}
      <a href={link.href}>{link.text}</a>
      {answer.slice(linkStart + link.text.length)}
    </>
  );
};

const FaqSection = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="container px-5 py-12 sm:py-16 lg:px-10 lg:py-24">
      <Head>
        <script type="application/ld+json">{JSON.stringify(JSONLD_FAQ)}</script>
      </Head>
      <div className="mx-auto max-w-4xl">
        <h2 className="m-0 text-center text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
          AI testing agents:{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee">
            frequently asked questions
          </span>
        </h2>

        <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white px-5 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:px-7 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
          {FAQS.map((faq, index) => (
            <article
              key={faq.question}
              className="border-b border-slate-200 last:border-b-0 dark:border-white/10"
            >
              <h3 className="m-0">
                <div
                  id={`faq-question-${index}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={openIndices.includes(index)}
                  aria-controls={`faq-answer-${index}`}
                  className="group flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left text-base font-bold leading-6 text-slate-900 outline-none transition-colors hover:text-secondary-wopee focus-visible:ring-2 focus-visible:ring-secondary-wopee focus-visible:ring-offset-2 sm:py-6 sm:text-lg dark:text-slate-100 dark:hover:text-primary-wopee dark:focus-visible:ring-primary-wopee dark:focus-visible:ring-offset-slate-950"
                  onClick={() => toggleFaq(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleFaq(index);
                    }
                  }}
                >
                  {faq.question}
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-secondary-wopee dark:border-slate-700 dark:bg-slate-900 dark:text-primary-wopee">
                    <Icon
                      path={openIndices.includes(index) ? mdiMinus : mdiPlus}
                      size={0.75}
                    />
                  </span>
                </div>
              </h3>
              {openIndices.includes(index) && (
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="pb-6"
                >
                  <p className="m-0 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    {renderAnswer(faq)}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
