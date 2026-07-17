import {
  mdiCloudOutline,
  mdiLanConnect,
  mdiVpn,
  mdiServer,
  mdiAccountKey,
  mdiClipboardTextClockOutline,
  mdiKeyChainVariant,
  mdiRobotOutline,
  mdiShieldLockOutline,
  mdiSourceBranch,
} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import Link from "@docusaurus/Link";

import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import GradientCard from "@site/src/components/ui/GradientCard";

const DEPLOYMENT_LADDER = [
  {
    icon: mdiCloudOutline,
    step: "1",
    title: "Cloud (SaaS)",
    tag: "Default",
    description:
      "Fully managed in the Wopee.io cloud, with data in EU data centers by default. Start testing the same day.",
  },
  {
    icon: mdiLanConnect,
    step: "2",
    title: "IP allowlisting",
    tag: "Behind a firewall",
    description:
      "Keep your application behind your firewall and allow Wopee.io cloud IP ranges. IP ranges are provided during onboarding.",
  },
  {
    icon: mdiVpn,
    step: "3",
    title: "Secure tunnel",
    tag: "Enterprise",
    description:
      "A secure VPN or SSH tunnel between the Wopee.io cloud and your internal network — nothing else is exposed.",
  },
  {
    icon: mdiServer,
    step: "4",
    title: "Self-hosted runner & on-prem",
    tag: "Enterprise",
    description:
      "Agents execute inside your network, or the full platform runs in your own data centers for maximum data control.",
  },
];

const ENTERPRISE_CONTROLS = [
  {
    icon: mdiKeyChainVariant,
    title: "Single sign-on",
    description:
      "SSO is delivered as part of Enterprise deployments — integrated with your identity setup during rollout, not a self-service SaaS toggle.",
  },
  {
    icon: mdiAccountKey,
    title: "Role-based access control",
    description:
      "Configurable roles with appropriate permission levels, per-project access, and the principle of least privilege.",
  },
  {
    icon: mdiClipboardTextClockOutline,
    title: "Audit logs",
    description:
      "User actions are logged for accountability and compliance. Access management can be administered by Wopee.io or delegated to your team.",
  },
];

const LLM_PROVIDERS = [
  {
    name: "Azure OpenAI",
    detail: "Run agents on your Azure tenant",
  },
  {
    name: "Google Vertex AI",
    detail: "Use your Google Cloud setup",
  },
  {
    name: "Anthropic",
    detail: "Connect your Anthropic account",
  },
  {
    name: "OpenAI-compatible",
    detail: "Any OpenAI-compatible endpoint, including internal gateways",
  },
];

const PILOT_WEEKS = [
  {
    week: "Week 1",
    title: "Foundation",
    description:
      "Introduction training on autonomous testing methodology and the Wopee.io platform, then infrastructure setup and connectivity verification.",
  },
  {
    week: "Week 2",
    title: "Implementation",
    description:
      "AI Testing Agent set up for your first application and the first 5 sample test scenarios created and running.",
  },
  {
    week: "Weeks 3–7",
    title: "Execution & optimization",
    description:
      "Tests run and expand week over week. Weekly review meetings track progress against the metrics agreed at kickoff.",
  },
  {
    week: "Week 8",
    title: "Evaluation & decision",
    description:
      "Final demonstration for stakeholders, a lessons-learned workshop, and a clear go/no-go decision on broader adoption.",
  },
];

const PILOT_OUTCOMES = [
  { value: "70–90%", label: "less time to create tests" },
  { value: "2–5x", label: "increase in test coverage" },
  { value: "60–90%", label: "less maintenance effort" },
];

const HeroSection = () => (
  <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center relative">
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex justify-center gap-3 items-center flex-wrap">
        <span className="bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee text-sm font-semibold px-4 py-1.5 rounded-full border border-secondary-wopee/20 dark:border-primary-wopee/20">
          Enterprise
        </span>
        <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-purple-500/20">
          Cloud to on-prem
        </span>
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
        Autonomous testing on{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          enterprise terms
        </span>
      </h1>

      <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
        Wopee.io for enterprise combines autonomous AI testing agents with the
        controls large organizations require: EU data residency by default,
        deployment options from managed cloud to full on-prem,
        bring-your-own-LLM across Azure OpenAI, Google Vertex AI, Anthropic,
        and OpenAI-compatible endpoints, and a structured 8-week pilot program
        that ends with a clear go/no-go decision backed by measurable results.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-4">
        <ButtonPrimary
          label="Book a demo"
          href="/book-demo/"
          className="w-64 h-[54px] text-lg"
          id="cta-enterprise-hero"
        />
        <Link
          href="/security/"
          className="group inline-flex items-center gap-2 text-base font-medium hover:no-underline opacity-70 hover:opacity-100 transition-opacity"
        >
          <Icon path={mdiShieldLockOutline} size={0.9} />
          Read the security overview
          <span className="group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  </div>
);

const DeploymentSection = () => (
  <div id="deployment" className="container my-16 lg:my-24 px-5 lg:px-10">
    <div className="text-center mb-12 lg:mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold mb-4">
        Deploy on your terms
      </h2>
      <p className="text-xl opacity-70 max-w-2xl mx-auto">
        Start in the cloud. Move behind your firewall whenever your security
        posture requires it — the platform stays the same.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {DEPLOYMENT_LADDER.map((option) => (
        <GradientCard
          key={option.title}
          className="group transition-transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-secondary-wopee/15 dark:bg-primary-wopee/15 flex items-center justify-center group-hover:scale-110 transition-transform">
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
          <p className="opacity-70">{option.description}</p>
        </GradientCard>
      ))}
    </div>
  </div>
);

const ControlsSection = () => (
  <div className="py-16 lg:py-20 bg-gradient-to-b from-transparent via-primary-wopee/20 dark:via-secondary-wopee/20 to-transparent">
    <div className="container px-5 lg:px-10">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Enterprise-deployment controls
        </h2>
        <p className="text-xl opacity-70 max-w-2xl mx-auto">
          Identity, permissions, and accountability — set up with you as part
          of the Enterprise rollout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {ENTERPRISE_CONTROLS.map((control) => (
          <GradientCard key={control.title}>
            <div className="w-14 h-14 rounded-xl bg-secondary-wopee/15 dark:bg-primary-wopee/15 flex items-center justify-center mb-4">
              <Icon
                path={control.icon}
                size={1.5}
                className="text-secondary-wopee dark:text-primary-wopee"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{control.title}</h3>
            <p className="opacity-70">{control.description}</p>
          </GradientCard>
        ))}
      </div>
    </div>
  </div>
);

const ByoLlmSection = () => (
  <div className="container my-16 lg:my-24 px-5 lg:px-10">
    <GradientCard
      variant="solid"
      padding="roomy"
      className="flex flex-col lg:flex-row items-center gap-8"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Icon
            path={mdiRobotOutline}
            size={1.5}
            className="text-primary-wopee"
          />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
          Bring your own LLM
        </h2>
        <p className="text-lg opacity-90 mb-4 text-balance">
          Run Wopee.io agents on the model account your organization already
          governs. Configure providers per project — credentials are stored
          encrypted and resolved by agents at runtime.
        </p>
        <p className="text-lg opacity-90 text-balance">
          Your prompts and data flow through your provider agreement, which
          keeps model governance and data residency in your hands.
        </p>
      </div>
      <div className="flex-1 w-full">
        <div className="grid grid-cols-1 gap-3">
          {LLM_PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/40 border border-white/10"
            >
              <span className="font-semibold text-primary-wopee">
                {provider.name}
              </span>
              <span className="text-sm text-white/80 hidden sm:inline">
                — {provider.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GradientCard>
  </div>
);

const SecurityStrip = () => (
  <div className="container my-16 lg:my-24 px-5 lg:px-10">
    <div className="max-w-4xl mx-auto rounded-xl border border-solid border-gray-200 dark:border-gray-700 p-8 lg:p-10 text-center hover:border-secondary-wopee dark:hover:border-primary-wopee transition-all hover:shadow-lg">
      <div className="flex justify-center mb-4">
        <Icon
          path={mdiShieldLockOutline}
          size={1.8}
          className="text-secondary-wopee dark:text-primary-wopee"
        />
      </div>
      <h2 className="text-3xl font-bold mb-3">Security, in the open</h2>
      <p className="text-lg opacity-80 max-w-2xl mx-auto mb-5">
        EU data centers by default. We never train models on your code or test
        data. All exchanged data is deleted within 30 days when you leave.
        Encryption in transit and at rest. The full data flow — what connects
        where and why — is documented for your security review.
      </p>
      <Link
        href="/security/"
        className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg"
      >
        Read the security overview &rarr;
      </Link>
    </div>
  </div>
);

const PilotSection = () => (
  <div
    id="pilot"
    className="py-16 lg:py-20 bg-gradient-to-b from-transparent via-primary-wopee/20 dark:via-secondary-wopee/20 to-transparent"
  >
    <div className="container px-5 lg:px-10">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          An 8-week pilot, not an open-ended trial
        </h2>
        <p className="text-xl opacity-70 max-w-3xl mx-auto">
          A structured engagement on one of your applications, with a
          dedicated Wopee.io team, agreed metrics, and a go/no-go decision at
          the end.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14">
        {PILOT_WEEKS.map((phase, index) => (
          <GradientCard key={phase.week}>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary-wopee dark:bg-primary-wopee text-white dark:text-secondary-wopee font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-60 m-0">
                  {phase.week}
                </p>
                <h3 className="text-lg font-bold m-0">{phase.title}</h3>
              </div>
            </div>
            <p className="opacity-70 m-0">{phase.description}</p>
          </GradientCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
        <div className="rounded-xl border border-solid border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold mb-3">Who is involved</h3>
          <p className="opacity-80 m-0">
            Wopee.io brings an autonomous testing coach and an engineer. You
            bring SRE/DevOps for connectivity, your testing team for scope,
            and stakeholders for reviews.
          </p>
        </div>
        <div className="rounded-xl border border-solid border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold mb-3">Your effort</h3>
          <p className="opacity-80 m-0">
            1–2 hours per week for review meetings, plus 30–60 minutes a day
            for test monitoring and feedback. We handle the implementation.
          </p>
        </div>
        <div className="rounded-xl border border-solid border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold mb-3">Exit with your assets</h3>
          <p className="opacity-80 m-0">
            Generated Playwright code can be published to your own Git repo.
            If you stop, all exchanged data is deleted from Wopee.io systems
            within 30 days.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-6">
          Typical pilot outcomes, measured against your baseline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5">
          {PILOT_OUTCOMES.map((outcome) => (
            <div
              key={outcome.label}
              className="rounded-xl border border-solid border-gray-200 dark:border-gray-700 p-6"
            >
              <p className="text-4xl font-bold text-secondary-wopee dark:text-primary-wopee m-0 mb-1">
                {outcome.value}
              </p>
              <p className="opacity-70 m-0">{outcome.label}</p>
            </div>
          ))}
        </div>
        <p className="text-sm opacity-60 max-w-2xl mx-auto">
          Typical improvements observed during pilot projects. Actual results
          vary with your testing maturity, application complexity, and team
          engagement — that is exactly what the pilot measures.
        </p>
      </div>
    </div>
  </div>
);

const ProofSection = () => (
  <div className="container my-16 lg:my-24 px-5 lg:px-10">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center mb-4">
        <Icon
          path={mdiSourceBranch}
          size={1.5}
          className="text-secondary-wopee dark:text-primary-wopee"
        />
      </div>
      <h2 className="text-3xl lg:text-4xl font-bold mb-4">
        Proven at enterprise scale
      </h2>
      <p className="text-lg opacity-80 mb-5 max-w-3xl mx-auto">
        SYNOT TECH, a full-stack iGaming provider operating in regulated
        European markets, runs 1,600+ automated regression tests across
        multiple teams — with Wopee.io complementing their automation with
        visual verification.
      </p>
      <Link
        href="/blog/synot-tech-test-automation-wopee/"
        className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg"
      >
        Read the SYNOT TECH case study &rarr;
      </Link>
    </div>
  </div>
);

const FinalCta = () => (
  <div className="bg-gradient-to-b from-transparent to-primary-wopee dark:to-secondary-wopee">
    <div className="container my-12 lg:my-16 py-16 flex flex-col justify-center gap-5 lg:gap-10 text-center">
      <div className="text-balance px-2 lg:px-0">
        <h2 className="lg:text-4xl text-3xl font-bold">
          Ready to scope your pilot?
        </h2>
        <h3 className="text-secondary-wopee dark:text-primary-wopee lg:text-4xl text-3xl font-bold">
          Eight weeks to a go/no-go decision you can defend.
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-2 items-center lg:gap-5">
        <div className="h-20">
          <ButtonPrimary
            label="Book a demo"
            href="/book-demo/"
            className="w-60 h-[50px]"
            id="cta-enterprise-footer"
          />
        </div>
        <div className="sm:h-20">
          <ButtonPrimaryInverted
            label="Security overview"
            href="/security/"
            className="w-60 h-[50px]"
          />
        </div>
      </div>
    </div>
  </div>
);

const EnterprisePage = () => {
  return (
    <Layout
      title="Enterprise Autonomous Testing Platform"
      description="Enterprise autonomous testing with Wopee.io: cloud to on-prem deployment, SSO and audit logs, bring-your-own-LLM, and a structured 8-week pilot program."
    >
      <HeroSection />
      <DeploymentSection />
      <ControlsSection />
      <ByoLlmSection />
      <SecurityStrip />
      <PilotSection />
      <ProofSection />
      <FinalCta />
    </Layout>
  );
};
export default EnterprisePage;
