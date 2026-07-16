import {
  mdiEarth,
  mdiDatabaseOff,
  mdiDeleteClock,
  mdiLockOutline,
  mdiAccountKey,
  mdiFileDocumentOutline,
  mdiCloudOutline,
  mdiLanConnect,
  mdiVpn,
  mdiServer,
  mdiEyeCheckOutline,
  mdiChartLine,
} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import Link from "@docusaurus/Link";

import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";

const KEY_FACTS = [
  {
    icon: mdiEarth,
    title: "EU data centers by default",
    description:
      "Cloud deployments store data in European data centers. Custom regions are available worldwide on request, and full on-prem deployment is available for maximum control.",
  },
  {
    icon: mdiDatabaseOff,
    title: "Never used for model training",
    description:
      "We never train models on your code or test data. Everything you share is used exclusively to deliver the agreed testing services.",
  },
  {
    icon: mdiDeleteClock,
    title: "Deleted within 30 days",
    description:
      "When an engagement ends, all exchanged data is deleted from Wopee.io systems within 30 days, unless otherwise agreed in writing.",
  },
  {
    icon: mdiLockOutline,
    title: "Encrypted in transit and at rest",
    description:
      "Secure cloud infrastructure with encryption at rest and in transit, built on a secure development lifecycle with code reviews and vulnerability scanning.",
  },
  {
    icon: mdiAccountKey,
    title: "Role-based access control",
    description:
      "Configurable roles with appropriate permission levels and the principle of least privilege. Access management can be administered by Wopee.io or delegated to your team.",
  },
  {
    icon: mdiFileDocumentOutline,
    title: "DPA available today",
    description:
      "A Data Processing Agreement is available now. Formal certifications (SOC 2, ISO 27001) are on our roadmap. Meanwhile we maintain rigorous internal security practices.",
  },
];

const DATA_FLOW = [
  {
    component: "Wopee.io Commander (control plane)",
    runsWhere: "Wopee.io cloud (EU data centers by default)",
    connectsTo:
      "Your browser over HTTPS, so your team can review tests, results, and baselines",
    data: "Test definitions, run results, screenshots, traces, reports",
  },
  {
    component: "AI Testing Agents (execution)",
    runsWhere:
      "Wopee.io-managed runners by default; self-hosted runners inside your network on Enterprise",
    connectsTo:
      "Your application under test: only the environments and URLs you configure",
    data: "Pages of the app under test, screenshots, execution logs",
  },
  {
    component: "Test artifacts",
    runsWhere: "Git repository with full commit history",
    connectsTo:
      "Commander for review and editing; test cases can be published to your own repo",
    data: "User stories, test cases, generated Playwright code",
  },
  {
    component: "LLM provider",
    runsWhere:
      "Wopee.io-managed by default; your own Azure OpenAI, Google Vertex AI, Anthropic, or OpenAI-compatible endpoint on Enterprise",
    connectsTo:
      "Agents call it at runtime; provider credentials are stored encrypted",
    data: "Prompts built from your app context, never used for model training",
  },
];

const CONNECTIVITY_OPTIONS = [
  {
    icon: mdiCloudOutline,
    title: "Cloud (SaaS)",
    tag: "Default",
    description:
      "Agents run from the Wopee.io cloud and reach your application over the internet. Data stays in EU data centers. The fastest way to start.",
  },
  {
    icon: mdiLanConnect,
    title: "IP allowlisting",
    tag: "Behind a firewall",
    description:
      "Your application stays behind your firewall. You allow Wopee.io cloud IP ranges, provided during onboarding.",
  },
  {
    icon: mdiVpn,
    title: "Secure tunnel",
    tag: "Enterprise",
    description:
      "A secure VPN or SSH tunnel between the Wopee.io cloud and your internal network. Nothing else is exposed.",
  },
  {
    icon: mdiServer,
    title: "Self-hosted runner & on-prem",
    tag: "Enterprise",
    description:
      "Agents execute inside your network and your application is never reachable from outside. Full on-prem deployment of the platform is available for maximum data control.",
  },
];

const ISOLATION = [
  {
    model: "Public cloud",
    method: "Logical isolation via user permissions and access controls",
  },
  {
    model: "Private cloud",
    method: "Dedicated instance with full environment separation",
  },
  {
    model: "On-premises",
    method: "Complete isolation within customer-controlled infrastructure",
  },
];

const OVERSIGHT = [
  {
    title: "Review",
    description:
      "All AI-generated outputs (test cases, reports, analyses) can be reviewed before use.",
  },
  {
    title: "Edit",
    description: "Modify, refine, or customize any generated content.",
  },
  {
    title: "Regenerate",
    description:
      "Regenerate outputs with adjusted parameters or additional context.",
  },
  {
    title: "Reject",
    description:
      "Reject any output that does not meet your quality standards.",
  },
];

const HeroSection = () => (
  <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center relative">
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex justify-center gap-3 items-center flex-wrap">
        <span className="bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee text-sm font-semibold px-4 py-1.5 rounded-full border border-secondary-wopee/20 dark:border-primary-wopee/20">
          Trust & Security
        </span>
        <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-purple-500/20">
          EU data residency by default
        </span>
      </div>

      <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-7xl">
        <span className="text-secondary-wopee dark:text-primary-wopee">
          Security
        </span>{" "}
        & data protection
      </h1>

      <p className="mx-auto max-w-3xl text-left text-base leading-7 text-slate-600 sm:text-center sm:text-lg lg:text-xl dark:text-slate-300">
        Wopee.io security means your test data stays in EU data centers by
        default, is encrypted in transit and at rest, is never used to train
        AI models, and is deleted within 30 days when you leave. This page
        explains what connects where, from the Commander control plane to the
        testing agents, and which deployment options keep your application
        behind your firewall.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-4">
        <ButtonPrimary
          label="Book a demo"
          href="/book-demo/"
          className="w-64 h-[54px] text-lg"
          id="cta-security-hero"
        />
        <Link
          href="/enterprise/"
          className="group inline-flex items-center gap-2 text-base font-medium text-slate-600 transition-colors hover:text-slate-950 hover:no-underline dark:text-slate-300 dark:hover:text-white"
        >
          Explore enterprise options
          <span className="group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  </div>
);

const KeyFactsSection = () => (
  <div className="container my-12 px-5 sm:my-16 lg:my-24 lg:px-10">
    <div className="text-center mb-12 lg:mb-16">
      <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        The short version
      </h2>
      <p className="mx-auto max-w-2xl text-slate-600 sm:text-lg dark:text-slate-300">
        The six answers every security review asks for first
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {KEY_FACTS.map((fact) => (
        <article
          key={fact.title}
          className="rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035]"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-wopee/15 dark:bg-primary-wopee/15">
            <Icon
              path={fact.icon}
              size={1.5}
              className="text-secondary-wopee dark:text-primary-wopee"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">{fact.title}</h3>
          <p className="text-balance text-slate-600 dark:text-slate-300">
            {fact.description}
          </p>
        </article>
      ))}
    </div>
  </div>
);

const DataFlowSection = () => (
  <div
    id="data-flow"
    className="border-y border-slate-200/80 bg-slate-50/70 py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-white/[0.025]"
  >
    <div className="container px-5 lg:px-10">
      <div className="text-center mb-10 lg:mb-14">
        <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          What connects where, and why
        </h2>
        <p className="mx-auto max-w-3xl text-slate-600 sm:text-lg dark:text-slate-300">
          The exact question security teams ask before hosting or allowlisting
          anything. Here is the full data flow.
        </p>
      </div>

      <div className="grid gap-4 lg:hidden">
        {DATA_FLOW.map((row) => (
          <article
            key={row.component}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <h3 className="mb-4 text-lg font-semibold">{row.component}</h3>
            <dl className="grid gap-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Where it runs
                </dt>
                <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {row.runsWhere}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  What it connects to & why
                </dt>
                <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {row.connectsTo}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Data involved
                </dt>
                <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {row.data}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:block dark:border-white/10 dark:bg-white/[0.03]">
        <table className="m-0 w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="bg-secondary-wopee/10 dark:bg-primary-wopee/10">
              <th className="px-5 py-4 text-sm font-bold uppercase tracking-wider border-0">
                Component
              </th>
              <th className="px-5 py-4 text-sm font-bold uppercase tracking-wider border-0">
                Where it runs
              </th>
              <th className="px-5 py-4 text-sm font-bold uppercase tracking-wider border-0">
                What it connects to & why
              </th>
              <th className="px-5 py-4 text-sm font-bold uppercase tracking-wider border-0">
                Data involved
              </th>
            </tr>
          </thead>
          <tbody>
            {DATA_FLOW.map((row) => (
              <tr
                key={row.component}
                className="border-0 border-t border-solid border-gray-200 dark:border-gray-700"
              >
                <td className="px-5 py-4 font-semibold align-top border-0">
                  {row.component}
                </td>
                <td className="border-0 px-5 py-4 align-top text-slate-600 dark:text-slate-300">
                  {row.runsWhere}
                </td>
                <td className="border-0 px-5 py-4 align-top text-slate-600 dark:text-slate-300">
                  {row.connectsTo}
                </td>
                <td className="border-0 px-5 py-4 align-top text-slate-600 dark:text-slate-300">
                  {row.data}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-base text-slate-600 dark:text-slate-300">
        Agent runs are dispatched as CI jobs with a dedicated repository per
        project, and execution logs stay fetchable for full traceability.
        Exact network requirements (IP ranges and egress endpoints for your
        region) are provided during your security review.
      </p>
    </div>
  </div>
);

const ConnectivitySection = () => (
  <div className="container my-12 px-5 sm:my-16 lg:my-24 lg:px-10">
    <div className="text-center mb-12 lg:mb-16">
      <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        How testing reaches your application
      </h2>
      <p className="mx-auto max-w-2xl text-slate-600 sm:text-lg dark:text-slate-300">
        Four deployment options, from managed cloud to fully inside your
        network
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {CONNECTIVITY_OPTIONS.map((option) => (
        <article
          key={option.title}
          className="rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035]"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-secondary-wopee/15 dark:bg-primary-wopee/15 flex items-center justify-center">
              <Icon
                path={option.icon}
                size={1.5}
                className="text-secondary-wopee dark:text-primary-wopee"
              />
            </div>
            <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee whitespace-nowrap">
              {option.tag}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">{option.title}</h3>
          <p className="text-slate-600 dark:text-slate-300">
            {option.description}
          </p>
        </article>
      ))}
    </div>
  </div>
);

const DataHandlingSection = () => (
  <div className="container my-12 px-5 sm:my-16 lg:my-24 lg:px-10">
    <div className="text-center mb-12 lg:mb-16">
      <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        Residency, isolation & retention
      </h2>
      <p className="mx-auto max-w-2xl text-slate-600 sm:text-lg dark:text-slate-300">
        Where your data lives, how it is separated, and when it is deleted
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <article className="rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035]">
        <h3 className="text-xl font-bold mb-3">Residency</h3>
        <ul className="space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>European data centers by default (cloud)</li>
          <li>Custom region available worldwide on request</li>
          <li>On-premises: fully within your own data centers</li>
        </ul>
      </article>
      <article className="rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035]">
        <h3 className="text-xl font-bold mb-3">Isolation</h3>
        <ul className="space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          {ISOLATION.map((row) => (
            <li key={row.model}>
              <strong>{row.model}:</strong> {row.method}
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035]">
        <h3 className="text-xl font-bold mb-3">Retention</h3>
        <ul className="space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>
            All exchanged data deleted from Wopee.io systems within 30 days of
            an engagement ending, unless otherwise agreed in writing
          </li>
          <li>Deletion timeline and process confirmed at exit</li>
        </ul>
      </article>
    </div>
  </div>
);

const OversightSection = () => (
  <div className="border-y border-slate-200/80 bg-slate-50/70 py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-white/[0.025]">
    <div className="container px-5 lg:px-10">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Human oversight, built in
        </h2>
        <p className="mx-auto max-w-3xl text-slate-600 sm:text-lg dark:text-slate-300">
          Autonomous does not mean unsupervised. Every AI output is
          transparent, traceable, and under your control.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {OVERSIGHT.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035]"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon
                path={mdiEyeCheckOutline}
                size={0.9}
                className="text-secondary-wopee dark:text-primary-wopee"
              />
              <h3 className="text-lg font-bold m-0">{item.title}</h3>
            </div>
            <p className="m-0 text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center mt-10 flex flex-col gap-3">
        <p className="m-0 text-lg text-slate-600 dark:text-slate-300">
          Guardrails run at every stage: validation checks in agent design,
          input/output verification on tools, automated quality checks on
          generated outputs, and anomaly detection that flags unexpected
          patterns for review.
        </p>
        <p className="m-0 flex items-center justify-center gap-2 text-lg text-slate-600 dark:text-slate-300">
          <Icon
            path={mdiChartLine}
            size={0.9}
            className="text-secondary-wopee dark:text-primary-wopee shrink-0"
          />
          User actions are logged in an audit trail, and system activity is
          continuously monitored.
        </p>
      </div>
    </div>
  </div>
);

const CertificationSection = () => (
  <div className="container my-12 px-5 sm:my-16 lg:my-24 lg:px-10">
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 border-t-4 border-t-secondary-wopee bg-white p-6 shadow-sm sm:p-8 lg:p-10 dark:border-white/10 dark:border-t-primary-wopee dark:bg-white/[0.03]">
      <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
        <div>
          <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Certifications: where we stand
          </h2>
          <p className="mb-2 text-lg text-slate-600 dark:text-slate-300">
            Formal certifications (SOC 2, ISO 27001) are on our roadmap.
            Meanwhile we maintain rigorous internal security practices. A Data
            Processing Agreement is available today.
          </p>
          <p className="m-0 text-lg text-slate-600 dark:text-slate-300">
            Encryption, role-based access, audit logging, and a secure
            development lifecycle are already in place. We answer security
            questionnaires directly. Bring yours.
          </p>
        </div>
        <div className="mt-6 shrink-0 lg:mt-0">
          <ButtonPrimary
            label="Start your security review"
            href="/book-demo/"
            className="h-[50px] w-full sm:w-72"
            id="cta-security-review"
          />
        </div>
      </div>
    </div>
  </div>
);

const FinalCta = () => (
  <div className="border-t border-slate-200 bg-secondary-wopee/[0.06] dark:border-white/10 dark:bg-primary-wopee/[0.05]">
    <div className="container my-12 flex flex-col justify-center gap-5 py-12 text-center sm:my-16 sm:py-16 lg:gap-10 lg:py-20">
      <div className="text-balance px-2 lg:px-0">
        <h2 className="lg:text-4xl text-3xl font-bold">
          Need SSO, BYO-LLM, or on-prem?
        </h2>
        <h3 className="text-secondary-wopee dark:text-primary-wopee lg:text-4xl text-3xl font-bold">
          See what the Enterprise deployment includes.
        </h3>
      </div>
      <div className="flex flex-col items-stretch justify-center gap-3 px-5 sm:flex-row sm:items-center">
        <ButtonPrimary
          label="Book a demo"
          href="/book-demo/"
          className="h-[50px] w-full sm:w-60"
          id="cta-security-footer"
        />
        <ButtonPrimaryInverted
          label="Explore Enterprise"
          href="/enterprise/"
          className="h-[50px] w-full sm:w-60"
        />
      </div>
    </div>
  </div>
);

const SecurityPage = () => {
  return (
    <Layout
      title="Security & Data Protection"
      description="Wopee.io security: EU data residency by default, encryption in transit and at rest, no training on your data, 30-day deletion, and on-prem options."
    >
      <HeroSection />
      <KeyFactsSection />
      <DataFlowSection />
      <ConnectivitySection />
      <DataHandlingSection />
      <OversightSection />
      <CertificationSection />
      <FinalCta />
    </Layout>
  );
};
export default SecurityPage;
