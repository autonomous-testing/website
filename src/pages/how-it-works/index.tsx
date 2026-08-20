import React from "react";

import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import StackLinks from "@site/src/components/pseo/StackLinks";

const STAGES = [
  {
    step: "1",
    title: "Crawl",
    duration: "5–15 minutes",
    description:
      "Point the agent at a single URL. It explores your web app autonomously, capturing screenshots and HTML along the way. No scripts, no selectors.",
  },
  {
    step: "2",
    title: "App context",
    duration: "1–2 minutes",
    description:
      "The agent turns what it found into an app-context document describing your application. Edit it or regenerate it until it matches reality.",
  },
  {
    step: "3",
    title: "User stories",
    duration: "1–2 minutes",
    description:
      "From the app context, the agent derives user stories. Review, edit, delete, or add your own before a single test is generated.",
  },
  {
    step: "4",
    title: "Test cases",
    duration: "10–30 s or 5–10 min per test",
    description:
      "Each user story becomes a Playwright test. Direct mode writes the code in 10–30 seconds. Agent mode runs the scenario live in a browser first, taking 5–10 minutes per test for highly reliable code.",
  },
];

const HowItWorksHero = () => (
  <section className="container px-5 py-12 sm:py-16 lg:px-10 lg:pb-20 lg:pt-24">
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <h1 className="m-0 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
        How{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          Wopee.io
        </span>{" "}
        works
      </h1>
      <p className="mx-auto mb-0 mt-7 max-w-3xl text-left text-base leading-7 text-slate-600 sm:text-center sm:text-lg lg:text-xl dark:text-slate-300">
        <strong>
          Wopee.io works in four stages: it crawls your web app, builds an
          app-context document, derives user stories, and generates Playwright
          test cases. Every artifact is editable before anything runs.
        </strong>{" "}
        The crawl takes 5–15 minutes. Code generation takes 10–30 seconds per
        test in Direct mode, or 5–10 minutes in Agent mode, where the AI runs
        the scenario live in a browser.
      </p>
      <div className="mt-8 w-full sm:w-auto">
        <ButtonPrimary
          label="Start for free"
          href="/pricing/"
          className="h-[50px] w-full sm:w-60"
        />
        <p className="mb-0 mt-2 text-xs italic text-slate-500 dark:text-slate-400">
          No credit card required
        </p>
      </div>
    </div>
  </section>
);

const PipelineSection = () => (
  <section className="border-y border-slate-200/80 bg-slate-50/70 py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-white/[0.025]">
    <div className="container px-5 lg:px-10">
      <h2 className="m-0 text-center text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
        The{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          4-stage
        </span>{" "}
        pipeline
      </h2>
      <p className="mx-auto mb-0 mt-4 max-w-2xl text-center text-base text-slate-600 sm:text-lg dark:text-slate-300">
        From a URL to a reviewed test suite. You stay in control at every
        stage.
      </p>

      <ol className="relative mx-auto mt-12 grid max-w-6xl list-none gap-5 p-0 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-slate-300 xl:grid-cols-4 xl:gap-6 xl:before:left-6 xl:before:right-6 xl:before:top-5 xl:before:h-px xl:before:w-auto dark:before:bg-white/15">
        {STAGES.map((stage) => (
          <li
            key={stage.step}
            className="relative pl-14 xl:pl-0 xl:pt-12"
          >
            <span className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary-wopee text-base font-bold text-white dark:bg-primary-wopee dark:text-slate-950">
              {stage.step}
            </span>
            <article className="h-full rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-5 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-6 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
              <div className="mb-4">
                <h3 className="m-0 text-xl font-bold text-slate-950 dark:text-white">
                  {stage.title}
                </h3>
                <p className="mb-0 mt-1 text-xs font-semibold text-secondary-wopee dark:text-primary-wopee">
                  {stage.duration}
                </p>
              </div>
              <p className="m-0 text-base leading-7 text-slate-600 dark:text-slate-300">
                {stage.description}
              </p>
            </article>
          </li>
        ))}
      </ol>

      <p className="mx-auto mb-0 mt-10 max-w-3xl text-center text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
        Every artifact (the app-context document, the user stories, the test
        code) is editable and regeneratable. Nothing is a black box. Realistic
        time to a first generated suite: about 10–30 minutes, not seconds.
      </p>
    </div>
  </section>
);

const SupervisedAutonomySection = () => (
  <section className="container px-5 py-12 sm:py-16 lg:px-10 lg:py-24">
    <div className="mx-auto max-w-4xl">
      <h2 className="m-0 text-center text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
        Supervised autonomy: the{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          interactive cockpit
        </span>
      </h2>
      <article className="mt-10 rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-6 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
        <p className="m-0 text-base leading-7 text-slate-600 sm:text-lg lg:text-xl dark:text-slate-300">
          Autonomous does not mean unsupervised. In the Wopee.io cockpit you
          watch the agent work in a live-streamed browser, take over control
          mid-run, steer it with a short note, and answer the multiple-choice
          questions it raises when a decision is yours to make. When the agent
          hits something it cannot pass on its own, like a CAPTCHA, multi-factor
          authentication, or missing credentials, it asks for your help, hands
          you the browser, and resumes autonomously once you are done.
        </p>
      </article>
    </div>
  </section>
);

const GitRepoClosing = () => (
  <section className="border-t border-slate-200 bg-secondary-wopee/[0.06] py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-primary-wopee/[0.05]">
    <div className="container px-5 lg:px-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="m-0 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
          Your tests stay{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee">
            yours
          </span>
        </h2>
        <p className="mx-auto mb-0 mt-6 text-left text-base leading-7 text-slate-600 sm:text-center sm:text-lg lg:text-xl dark:text-slate-300">
          Sign in with GitHub, GitLab, or Google. Agent runs emit plain{" "}
          <Link to="/ai-testing-agents/">Playwright code</Link> that you can
          export and run anywhere without the Wopee.io runtime. No lock-in: if
          you leave, the tests go with you.
        </p>
        <div className="mt-8 w-full sm:w-auto">
          <ButtonPrimary
            label="Start for free"
            href="/pricing/"
            className="h-[50px] w-full sm:w-60"
          />
          <p className="mb-0 mt-2 text-xs italic text-slate-500 dark:text-slate-400">
            No credit card required
          </p>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorksPage = () => {
  return (
    <Layout
      title="How It Works: From URL to Playwright Tests"
      description="How Wopee.io works: crawl your app in 5–15 minutes, review and edit every artifact, then generate Playwright tests you can export and run anywhere."
    >
      <HowItWorksHero />
      <PipelineSection />
      <SupervisedAutonomySection />
      <GitRepoClosing />
      <StackLinks heading="Guides for your stack" />

    </Layout>
  );
};

export default HowItWorksPage;
