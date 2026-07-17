import React from "react";

import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";

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
  <section className="w-full flex flex-col items-center pt-12 lg:pt-20 pb-8 px-4">
    <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
      <h1 className="text-4xl sm:text-5xl">
        How{" "}
        <span className="text-secondary-wopee dark:text-primary-wopee">
          Wopee.io
        </span>{" "}
        works
      </h1>
      <p className="text-lg lg:text-xl leading-relaxed text-slate-900 dark:text-white text-left">
        <strong>
          Wopee.io works in four stages: it crawls your web app, builds an
          app-context document, derives user stories, and generates Playwright
          test cases. Every artifact is editable before anything runs.
        </strong>{" "}
        The crawl takes 5–15 minutes. Code generation takes 10–30 seconds per
        test in Direct mode, or 5–10 minutes in Agent mode, where the AI runs
        the scenario live in a browser.
      </p>
      <div>
        <ButtonPrimary
          label="Start for free"
          href="/pricing/"
          className="w-60 h-[50px]"
        />
        <p className="text-sm italic">No credit card required</p>
      </div>
    </div>
  </section>
);

const PipelineSection = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-5xl w-full mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-primary-wopee mb-4">
        The 4-stage pipeline
      </h2>
      <p className="text-lg text-gray-700 dark:text-white text-center mb-10">
        From a URL to a reviewed test suite. You stay in control at every
        stage.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STAGES.map((stage) => (
          <div
            key={stage.step}
            className="bg-white/70 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-lg backdrop-blur"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-full bg-secondary-wopee dark:bg-primary-wopee text-white dark:text-secondary-wopee font-bold text-lg flex items-center justify-center flex-shrink-0">
                {stage.step}
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-0">
                  {stage.title}
                </h3>
                <p className="text-sm text-secondary-wopee dark:text-primary-wopee font-medium mb-0">
                  {stage.duration}
                </p>
              </div>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-0">
              {stage.description}
            </p>
          </div>
        ))}
      </div>

      <p className="text-base text-gray-700 dark:text-gray-300 text-center mt-8 max-w-3xl mx-auto">
        Every artifact — the app-context document, the user stories, the test
        code — is editable and regeneratable. Nothing is a black box. Realistic
        time to a first generated suite: about 10–30 minutes, not seconds.
      </p>
    </div>
  </section>
);

const SupervisedAutonomySection = () => (
  <section className="w-full flex flex-col items-center py-16 px-4 bg-gradient-to-b from-transparent via-primary-wopee/20 dark:via-secondary-wopee/20 to-transparent">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-primary-wopee mb-8">
        Supervised autonomy: the interactive cockpit
      </h2>
      <p className="text-lg lg:text-xl leading-relaxed text-slate-900 dark:text-white mb-0">
        Autonomous does not mean unsupervised. In the Wopee.io cockpit you
        watch the agent work in a live-streamed browser, take over control
        mid-run, steer it with a short note, and answer the multiple-choice
        questions it raises when a decision is yours to make. When the agent
        hits something it cannot pass on its own — a CAPTCHA, multi-factor
        authentication, missing credentials — it asks for your help, hands you
        the browser, and resumes autonomously once you are done.
      </p>
    </div>
  </section>
);

const GitRepoClosing = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Your tests are Playwright code in your Git repo
      </h2>
      <p className="text-lg lg:text-xl leading-relaxed text-slate-900 dark:text-white text-left mb-0">
        Each project gets its own GitHub repository — sign in with GitHub,
        GitLab, or Google. Generated tests are plain{" "}
        <Link to="/ai-testing-agents/">Playwright code</Link>, stored with full
        commit history, and you can run the exported code anywhere without the
        Wopee.io runtime. No lock-in: if you leave, the tests stay yours.
      </p>
      <div>
        <ButtonPrimary
          label="Start for free"
          href="/pricing/"
          className="w-60 h-[50px]"
        />
        <p className="text-sm italic">No credit card required</p>
      </div>
    </div>
  </section>
);

const HowItWorksPage = () => {
  return (
    <Layout
      title="How It Works: From URL to Playwright Tests"
      description="How Wopee.io works: crawl your app in 5–15 minutes, review and edit every artifact, then generate Playwright tests that live in your own Git repo."
    >
      <HowItWorksHero />
      <PipelineSection />
      <SupervisedAutonomySection />
      <GitRepoClosing />
    </Layout>
  );
};

export default HowItWorksPage;
