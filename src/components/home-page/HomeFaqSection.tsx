import React, { useState } from "react";
import Head from "@docusaurus/Head";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

const FAQS = [
  {
    question: "How do the AI agents identify and prioritize critical test paths?",
    answerText:
      "Our agents use customer context and advanced LLM workflows. You provide a URL and optional requirements, user stories, or existing test cases. Proprietary workflows combine frontier LLM models with a test design methodology to generate a suite focused on critical user paths and high-risk areas. The process is flexible and customizable per project.",
    answer: (
      <div className="space-y-4">
        <p>Our agents use a combination of customer context and advanced LLM workflows.</p>
        <p>
          At a minimum, you provide a URL to the system under test. <br />
          We enrich this with additional context such as requirements, user stories, or existing test cases if available. <br />
          Our proprietary workflows use frontier LLM models together with our test design and prioritization methodology.
        </p>
        <p>
          The result is an automatically generated test suite focused on critical user paths and high-risk areas. <br />
          The process is flexible. Both context and methodology can be customized per project or customer.
        </p>
      </div>
    ),
  },
  {
    question: "What integrations are supported?",
    answerText:
      "Wopee.io integrates with Playwright, Cypress, Robot Framework, WebDriver-based frameworks, and custom frameworks. CI/CD integrations include GitHub Actions and other servers like Jenkins, GitLab, Bitbucket, or custom pipelines. APIs include GraphQL and the Wopee MCP server. LLM providers include Azure AI, OpenAI, Google Cloud, Anthropic, and others by request.",
    answer: (
      <div className="space-y-4">
        <p>We support integrations with your existing tools on several levels.</p>
        <div>
          <strong>Testing frameworks</strong>
          <ul className="list-disc pl-5 mt-2">
            <li>Playwright</li>
            <li>Cypress</li>
            <li>Robot Framework</li>
            <li>WebDriver-based frameworks</li>
            <li>Custom frameworks through open interfaces</li>
          </ul>
        </div>
        <div>
          <strong>CI/CD</strong>
          <ul className="list-disc pl-5 mt-2">
            <li>GitHub Actions as the primary integration</li>
            <li>Other CI/CD servers such as Jenkins, GitLab, Bitbucket, or custom enterprise pipelines</li>
          </ul>
        </div>
        <div>
          <strong>APIs and agents</strong>
          <ul className="list-disc pl-5 mt-2">
            <li>GraphQL API for custom integrations and reporting</li>
            <li>Wopee MCP server for agent-based and LLM-based workflows</li>
          </ul>
        </div>
        <div>
          <strong>LLM providers</strong>
          <ul className="list-disc pl-5 mt-2">
            <li>Microsoft Azure AI / Azure Foundry</li>
            <li>OpenAI</li>
            <li>Google Cloud</li>
            <li>Anthropic</li>
            <li>Other providers on request for enterprise customers</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: "What ROI can be expected compared to traditional testing?",
    answerText:
      "Pilot programs typically show improvements in time to design and update test cases, time to execute regression suites, coverage of critical journeys, and effort to maintain automated tests. Documentation includes real-world metrics and recommendations for maximizing ROI within an eight-week pilot.",
    answer: (
      <div className="space-y-4">
        <p>
          Our <a
            href="https://docs.wopee.io/pilot-projects/"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation
          </a> outlines the typical gains seen during pilot programs, including measurable improvements that teams can realistically achieve within an eight-week period. Explore real-world case metrics and recommendations for maximizing ROI.
        </p>
        <p>Expect improvements in key testing metrics such as:</p>
        <ul className="list-disc pl-5">
          <li>Time to design and update test cases</li>
          <li>Time to execute regression suites</li>
          <li>Coverage of critical user journeys</li>
          <li>Effort required to maintain automated tests</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Is the process fully autonomous, or is human input required?",
    answerText:
      "Autonomy depends on the quality of project context, customer environment maturity, and domain requirements. Many steps run autonomously, but users still provide and maintain context, review and adjust tests, and decide on strategy and results. More mature inputs reduce manual intervention.",
    answer: (
      <div className="space-y-4">
        <p>The long-term goal is to deliver fully autonomous web testing. <br />
        In practice, the level of autonomy depends on:</p>
        <ul className="list-disc pl-5">
          <li>The quality and completeness of available (project) context</li>
          <li>The maturity of the customer environment and processes</li>
          <li>Specific domain and regulatory requirements</li>
        </ul>
        <p>Today, many steps can run autonomously, but users still:</p>
        <ul className="list-disc pl-5">
          <li>Provide and maintain project context.</li>
          <li>Review and occasionally adjust generated tests.</li>
          <li>Decide which generated outputs are production-ready and which need refinement or manual editing.</li>
          <li>Review and decide about the overall test strategy and test results.</li>
        </ul>
        <p>The more mature your inputs and methodology become, the less manual intervention is required.</p>
      </div>
    ),
  },
  {
    question: "Do the agents support parallel test runs?",
    answerText:
      "Parallel test execution is supported with no hard technical limit. Practical limits depend on plan and infrastructure capacity. Cloud runners scale with usage, while enterprise deployments configure runners individually.",
    answer: (
      <div className="space-y-4">
        <p>Yes, parallel test execution is fully supported.</p>
        <p>There is no hard technical limit on the number of parallel runs. Practical limits are defined by the subscribed plan and agreed infrastructure capacity.</p>
        <p>
          In the cloud, we scale the number of available runners with usage and customer growth. <br />
          For enterprise deployments, the number and size of runners is configured individually.
        </p>
      </div>
    ),
  },
  {
    question: "How are secrets and sensitive test data handled?",
    answerText:
      "Secrets are provided via environment variables or secret stores. Sensitive values are replaced with variables before LLM calls. For stricter needs, LLMs can run in dedicated cloud instances or on-premises.",
    answer: (
      <div className="space-y-4">
        <p>We follow modern security practices for handling secrets and sensitive data.</p>
        <ul className="list-disc pl-5">
          <li>Credentials, tokens, and other secrets are provided via environment variables or secret stores, similar to standard development practices.</li>
          <li>When calling LLM models, we replace sensitive values with variables wherever possible so that raw secrets are not sent to LLM providers.</li>
          <li>For stricter security needs, LLM models can run in a dedicated cloud instance or fully on-premises, depending on your infrastructure strategy.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How does integration with CI/CD and version control work?",
    answerText:
      "CI/CD integrates with GitHub Actions by default and supports other platforms like Jenkins, GitLab, Bitbucket, or internal systems. Versioning includes internal LLM workflow versioning and Git-based version control for code and test artifacts.",
    answer: (
      <div className="space-y-4">
        <div>
          <strong>CI/CD integration</strong>
          <p className="mt-2">The default approach is to integrate with GitHub Actions and to leverage its ecosystem for:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Running AI agents and automated tests in pipelines</li>
            <li>Controlling when and how regressions are executed</li>
            <li>Reporting results back into the development workflow</li>
          </ul>
          <p className="mt-2">For enterprise customers, the platform also integrates with other CI/CD platforms such as Jenkins, GitLab CI, Bitbucket, or internal systems.</p>
        </div>
        <div>
          <strong>Versioning</strong>
          <p className="mt-2">The system uses:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Internal versioning for LLM workflows and AI agents</li>
            <li>Git-based version control for code and test artefacts</li>
          </ul>
          <p className="mt-2">This combination gives teams flexibility and an industry-standard way to track changes across both traditional and AI-driven parts of the testing stack.</p>
        </div>
      </div>
    ),
  },
  {
    question: "Which business domains can be tested and how customizable are the agents?",
    answerText:
      "The agents are browser-based and domain agnostic. Domain-specific context like business processes, terminology, and compliance constraints improves relevance for industries such as banking, IAM, energy, or insurance.",
    answer: (
      <div className="space-y-4">
        <p>The agents are designed to test web applications running in a browser and are business-domain agnostic.</p>
        <p>
          They inherit general domain knowledge from frontier LLM models. <br />
          For higher accuracy and efficiency in specific domains such as banking, IAM, energy, or insurance, we recommend providing domain-specific project context, for example:
        </p>
        <ul className="list-disc pl-5">
          <li>Key business processes and flows</li>
          <li>Domain terminology</li>
          <li>Regulatory or compliance constraints</li>
        </ul>
        <p>This context guides the agents and significantly improves the quality and relevance of generated tests.</p>
      </div>
    ),
  },
  {
    question: "What are the performance and capacity limits?",
    answerText:
      "Cloud infrastructure scales with customer demand. Requests are processed first-come, first-served with possible short queues during peaks. Enterprise deployments are sized to minimize waiting times and scale for performance and cost.",
    answer: (
      <div className="space-y-4">
        <p>For cloud usage, infrastructure is sized to handle current customer demand and scaled as the customer base grows.</p>
        <ul className="list-disc pl-5">
          <li>Requests are processed on a first-come, first-served basis.</li>
          <li>During peak times, some agent tasks may be queued for a short period.</li>
        </ul>
        <p>For enterprise deployments, we design dedicated infrastructure that minimizes waiting times and scales according to performance, capacity, and cost requirements.</p>
      </div>
    ),
  },
  {
    question: "How are tests structured and maintained during long-term development?",
    answerText:
      "Tests are organized into analyses by product, features, journeys, or other groupings. Teams can generate tests from scratch, import JSON, or use the MCP server. When apps change, tests can be re-run, updated with AI, or regenerated as needed.",
    answer: (
      <div className="space-y-4">
        <p>Tests are organized into <strong>analyses</strong>, which are logical groups of tests. <br />
        You can structure them by:</p>
        <ul className="list-disc pl-5">
          <li>Product or product line</li>
          <li>Features or modules</li>
          <li>Customer journeys</li>
          <li>Any other grouping that fits your process</li>
        </ul>
        <p>You can generate tests from scratch using AI agents or import existing tests using JSON files or via the Wopee.io MCP server.</p>
        <p>When the application changes, there are three typical situations.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Existing regression tests remain valid</strong> <br />
            No changes needed. Select and execute them again.
          </li>
          <li>
            <strong>Existing tests need updates</strong> <br />
            Use AI to modify existing tests or to add new ones based on updated context.
          </li>
          <li>
            <strong>Completely new tests are required</strong> <br />
            Provide relevant context, generate new tests with AI, or upload new test specifications if you already have them.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "How are existing requirements and specifications used?",
    answerText:
      "The system can consume design files, requirements, user stories, acceptance criteria, and existing test suites to build context. This context drives test generation and validation of application behavior.",
    answer: (
      <div className="space-y-4">
        <p>During AI-powered test analysis and design, the system can consume various inputs to build a rich project context, for example:</p>
        <ul className="list-disc pl-5">
          <li>Figma or other design files</li>
          <li>Requirements and specifications</li>
          <li>User stories and acceptance criteria</li>
          <li>Existing test cases or regression suites</li>
          <li>Architectural or domain documentation</li>
        </ul>
        <p>
          The agents use this context to generate test cases that reflect your real requirements. <br />
          These test cases are then executed to validate how the application actually behaves.
        </p>
      </div>
    ),
  },
  {
    question: "What is best practice for building context and editing AI generated outputs?",
    answerText:
      "Start with small, relevant context and avoid overload. Iterate on analyses, use targeted instructions, and edit outputs only where needed. Less but higher-quality context improves results.",
    answer: (
      <div className="space-y-4">
        <p>The platform is optimized for minimal but high-quality context.</p>
        <p>Key principles:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Start small but relevant: </strong>
            Use existing company and project documentation and extract only the most relevant parts as project context.
          </li>
          <li>
            <strong>Avoid overloading the agent: </strong>
            Providing too much or noisy information leads to context pollution and lower output quality.
            It is better to provide less data that is highly relevant and well-structured.
          </li>
          <li>
            <strong>Iterate through analyses: </strong>
            Generate an initial analysis, improve the project context based on what you see, and regenerate the analysis to align tests with the updated context.
          </li>
          <li>
            <strong>Use targeted instructions: </strong>
            Add custom instructions or prompts to fine-tune application description, user stories, and test cases.
          </li>
          <li>
            <strong>Edit when it adds value: </strong>
            Modify generated outputs where needed and use AI to refactor or regenerate instead of rewriting everything manually.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "Who is the typical user within a project?",
    answerText:
      "Typical users include manual testers, QA analysts, test automation engineers, and product owners. The long-term vision is reducing repetitive testing while keeping humans focused on risk and quality strategy.",
    answer: (
      <div className="space-y-4">
        <p>The tool is designed to reduce manual testing effort and simplify the overall testing process. <br />
        Today it is primarily used by:</p>
        <ul className="list-disc pl-5">
          <li>Manual testers and QA analysts</li>
          <li>Test automation engineers</li>
          <li>Product owners or business users in teams that embrace AI-assisted testing</li>
        </ul>
        <p>The long-term vision is to significantly reduce human involvement in repetitive testing activities while keeping humans focused on high-value decisions, risk assessment, and quality strategy.</p>
      </div>
    ),
  },
  {
    question: "What reporting and dashboards are provided?",
    answerText:
      "In-product reporting includes execution status, run details, failed steps, and AI-generated summaries. For advanced dashboards, teams can integrate tools like ReportPortal, Kibana, or Grafana via GraphQL or MCP.",
    answer: (
      <div className="space-y-4">
        <p>Reporting is intentionally kept focused and minimal. It is not a full-scale test reporting platform.</p>
        <p>In-product reporting includes:</p>
        <ul className="list-disc pl-5">
          <li>Test execution status and history</li>
          <li>Key details for each run, including failed steps and error information</li>
          <li>AI-generated summaries and explanations for both agent-based and traditional automated test runs</li>
        </ul>
        <p>
          For advanced reporting such as hotspots, trends, and organization-wide dashboards, we recommend integrating with a dedicated reporting tool such as ReportPortal, Kibana, or Grafana. <br />
          This can be done via our GraphQL API or MCP server.
        </p>
      </div>
    ),
  },
  {
    question: "How does the licensing model work?",
    answerText:
      "Licensing is user-based with consumption pricing. Each active user requires a license, and usage is measured by tests executed and operations performed. Enterprise plans offer flexible terms, onboarding, and support.",
    answer: (
      <div className="space-y-4">
        <p>The licensing model is user-based with consumption-based pricing.</p>
        <p>Key parameters:</p>
        <ul className="list-disc pl-5">
          <li>Each active user requires a license.</li>
          <li>Usage is measured by the number of tests executed by AI agent and operations performed.</li>
        </ul>
        <p>
          For small and medium teams, standard user-based plans are usually sufficient. <br />
          For bigger teams or with complex environments, an enterprise plan is often the best option, because it can include:
        </p>
        <ul className="list-disc pl-5">
          <li>Flexible user and usage terms</li>
          <li>Enhanced onboarding and support</li>
          <li>Help with integrations and customizations where needed</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Do you offer onboarding, training or a pilot project?",
    answerText:
      "Yes. Wopee offers 1–2 month pilots that include onboarding workshops, integration help, AI workflow tuning, and feedback-driven improvements. Coverage can extend to mobile, API, or desktop testing.",
    answer: (
      <div className="space-y-4">
        <p>Yes. The preferred way to start with larger teams is an <a 
            href="https://docs.wopee.io/pilot-projects/"
            target="_blank"
            rel="noopener noreferrer"
          >
            1-2 month pilot project
          </a>.</p>
        <p>In a typical pilot, we:</p>
        <ul className="list-disc pl-5">
          <li>Run an onboarding workshop and set up project context</li>
          <li>Share best practices from previous implementations</li>
          <li>Help with integration into existing tools and processes</li>
          <li>Fine-tune AI agents and workflows to the specific environment</li>
          <li>Collect feedback and implement smaller improvements where it makes sense</li>
        </ul>
        <p>During a pilot, coverage can also extend to related areas such as mobile, API, or desktop testing, not only web UI.</p>
      </div>
    ),
  },
  {
    question: "What support do you provide and how fast do you respond?",
    answerText:
      "Support is available through in-app chat. Responses are typically within one business day, with custom response time SLAs available.",
    answer: (
      <div className="space-y-4">
        <p>All customers have access to support through the in-app chat.</p>
        <ul className="list-disc pl-5">
          <li>Responses are provided on a best-effort basis and typically within one working day.</li>
          <li>For teams that need stronger guarantees, custom support agreements are available with defined response times and service levels.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Can we benefit from your AI testing know how without purchasing licenses?",
    answerText:
      "Yes. Wopee offers transformation, implementation, and migration projects through partners, including mentoring, workshops, and conference knowledge sharing.",
    answer: (
      <div className="space-y-4">
        <p>Yes.</p>
        <p>Together with selected partners, we offer transformation, implementation and migration projects that do not always require a Wopee.io platform rollout.</p>
        <p>
          While building the platform, the team has accumulated unique knowledge in AI-powered testing on top of more than twenty years of experience with traditional testing at scale. <br />
          This knowledge is shared through:
        </p>
        <ul className="list-disc pl-5">
          <li>Mentoring and consulting projects through partners</li>
          <li>On-site / online workshops and training sessions</li>
          <li>Conference talks and community events</li>
          <li>Free webinars and public workshops</li>
        </ul>
      </div>
    ),
  },
  {
    question: "What is the roadmap and long term vision?",
    answerText:
      "The mission is to make web testing work in an AI-driven world by transforming traditional testing into AI-augmented, largely autonomous workflows. Short-term goals focus on practical adoption, while long-term goals reduce repetitive testing and improve release confidence.",
    answer: (
      <div className="space-y-4">
        <p>The mission is simple: make web testing work in a modern, AI-driven world.</p>
        <p>We are building:</p>
        <ul className="list-disc pl-5">
          <li>A future-proof approach that transforms traditional testing into an AI-augmented, largely autonomous activity</li>
          <li>A platform that can keep up with the speed and complexity of AI-driven development where classic testing methods often fail</li>
        </ul>
        <p>
          In the short-term, the focus is on practical, incremental improvements that teams can adopt today. <br />
          In the long-term, the goal is to eliminate as much repetitive testing work as possible while giving teams more confidence in every release.
        </p>
      </div>
    ),
  },
];

const HomeFaqSection = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerText,
      },
    })),
  };

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const displayedFaqs = showAll ? FAQS : FAQS.slice(0, 5);

  return (
    <div className="py-16 lg:py-24 px-4 lg:px-8 text-slate-900 dark:text-white transition-colors duration-300">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">
          Frequently asked questions
        </h2>

        <div className="">
          {displayedFaqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
            >
              <button
                className="bg-transparent border-none w-full flex justify-between items-center py-4 text-left focus:outline-none focus:ring-0 group text-slate-900 dark:text-white"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-bold">
                  {faq.question}
                </span>
                <Icon
                  path={openIndices.includes(index) ? mdiMinus : mdiPlus}
                  size={1}
                  className="flex-shrink-0 ml-4 text-slate-500 dark:text-slate-400"
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndices.includes(index)
                    ? "max-h-[1000px] opacity-100 mb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              id="login-button"
              className="inline-flex items-center text-base font-medium transition-colors duration-300"
              style={{ width: "auto", paddingLeft: "2rem", paddingRight: "2rem" }}
            >
              Load more questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFaqSection;
