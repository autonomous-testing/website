import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ComparisonTable from "@site/src/components/compare-page/ComparisonTable";
import CompareFaq, {
  CompareFaqItem,
} from "@site/src/components/compare-page/CompareFaq";
import CompareCta from "@site/src/components/compare-page/CompareCta";
import LastChecked from "@site/src/components/compare-page/LastChecked";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";

const TLDR_ROWS = [
  {
    aspect: "Status",
    left: "Discontinued May 2026; octomind.dev is offline",
    right: "Actively developed and shipping",
  },
  {
    aspect: "Foundation",
    left: "AI test generation built on Playwright",
    right: "AI testing agents built on Playwright — the same foundation",
  },
  {
    aspect: "Where tests live",
    left: "Managed inside the Octomind platform",
    right:
      "Playwright code committed to a Git repo you own — runs without Wopee.io",
  },
  {
    aspect: "Last published pricing",
    left: "$89 to $589 per month, capped by test cases, cloud runs, and AI creations (March 2026 snapshot)",
    right: "Start free, then 19 to 179 € per user per month — published",
  },
  {
    aspect: "For EU teams",
    left: "German company (Karlsruhe) — now gone",
    right: "EU data centers by default; on-premise for Enterprise",
  },
];

const MIGRATION_STEPS = [
  {
    step: "1",
    title: "Secure your exported Playwright tests",
    description:
      "Octomind generated Playwright test code. If you exported it before the shutdown, keep it — plain Playwright runs without any vendor. You can add Wopee.io visual validation to those tests with the Playwright SDK.",
  },
  {
    step: "2",
    title: "Point Wopee.io at your app",
    description:
      "The agent crawls your application, builds an app context, and generates user stories and test cases. Every artifact is reviewable and editable before anything runs.",
  },
  {
    step: "3",
    title: "Regenerate and own the suite",
    description:
      "Generated Playwright code is committed to a Git repository created for you. Run it on a schedule, in CI, or from your AI coding agent via MCP — and approve visual baselines as you go.",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "Is Octomind still available?",
    answer:
      "No. Octomind discontinued its AI testing product in May 2026, and the octomind.dev website is offline as of July 2026. In its farewell letter, the team said it did not find the market validation needed to keep going.",
  },
  {
    question: "Can I still use the Playwright tests Octomind generated?",
    answer:
      "Yes, if you exported them before the shutdown. Octomind generated Playwright test code, and plain Playwright keeps running without any vendor. Wopee.io can add visual validation to those tests through its Playwright SDK and regenerate fresh coverage from your app.",
  },
  {
    question: "How do I migrate from Octomind to Wopee.io?",
    answer:
      "Point Wopee.io at your app's URL. The agent crawls it, builds an app context, and generates user stories, test cases, and Playwright code — each artifact reviewable and editable. The generated code is committed to a Git repository you own, and suites run on schedule or in CI.",
  },
  {
    question: "How does Wopee.io prevent the same vendor-shutdown problem?",
    answer:
      "Your tests are never trapped in the platform. Wopee.io commits deterministic Playwright code to a Git repository you own, and the generated tests run as plain Playwright, with no LLM and no Wopee.io runtime required.",
  },
];

const WhatHappened = () => (
  <section className="w-full flex flex-col items-center py-16 px-4 bg-slate-50 dark:bg-white/5">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
        What happens to your tests when your vendor shuts down?
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
        In May 2026, Octomind — a Playwright-based AI testing company from
        Karlsruhe, Germany — published a farewell letter and turned its
        product off. As of July 2026, octomind.dev no longer resolves. Teams
        whose tests lived inside the platform lost their testing system with
        it.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
        That is the real lesson: if your tests exist only inside a vendor's
        platform, they are gone when the vendor is. Wopee.io's answer is
        structural — agents commit deterministic Playwright code to a Git
        repository you own, so the code outlives any vendor, including us.
      </p>
    </div>
  </section>
);

const MigrationSteps = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-10">
        Migrating from Octomind in three steps
      </h2>
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {MIGRATION_STEPS.map((s) => (
          <div
            key={s.step}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4"
          >
            <span className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary-wopee dark:bg-primary-wopee text-white dark:text-secondary-wopee font-bold text-xl flex items-center justify-center">
              {s.step}
            </span>
            <h3 className="text-xl font-bold m-0">{s.title}</h3>
            <p className="m-0 text-slate-600 dark:text-slate-400">
              {s.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <ButtonPrimary
          label="Start for free"
          href={loginUrl}
          className="w-60 h-[50px]"
          id="cta-octomind-migrate"
        />
        <p className="text-sm italic">No credit card required</p>
      </div>
    </section>
  );
};

const PricingWedge = () => (
  <section className="w-full flex flex-col items-center py-16 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
        Transparent EU pricing, again
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
        Octomind's last published pricing (March 2026) ran from $89 to $589
        per month, capped by test cases, cloud runs, and AI test creations —
        with Enterprise behind a sales call.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
        Wopee.io keeps the part Octomind got right — pricing on the page — and
        prices in EUR:{" "}
        <Link href="/pricing/">
          start free, Starter 19 €, Basic 79 €, Premium 179 € per user per
          month
        </Link>
        , Enterprise custom with on-premise deployment.
      </p>
    </div>
  </section>
);

const OctomindAlternative = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Octomind Alternative for Playwright Teams"
      description="Octomind alternative for Playwright teams: Octomind shut down in May 2026. Wopee.io regenerates your suites and commits Playwright code to a repo you own."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            The{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              Octomind alternative
            </span>{" "}
            for Playwright teams
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            Octomind discontinued its AI testing product in May 2026, and
            octomind.dev is now offline. Teams that relied on its Playwright
            test generation need a new home for their suites. Wopee.io is an
            alternative built on the same foundation: agents explore your app,
            generate real Playwright code, and commit it to a Git repo you own
            — so a vendor shutdown can never strand your tests again.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-octomind-hero"
              />
              <span className="text-xs opacity-50">
                No credit card required
              </span>
            </div>
            <Link
              href="/pricing/"
              className="text-secondary-wopee dark:text-primary-wopee font-semibold hover:no-underline text-lg"
            >
              See Wopee.io pricing &rarr;
            </Link>
          </div>
        </div>
      </div>

      <WhatHappened />

      <ComparisonTable
        title="Octomind vs Wopee.io"
        subtitle="The same Playwright foundation — with the tests in your repo instead of a vendor's platform."
        leftLabel="Octomind (as it was)"
        rows={TLDR_ROWS}
      />

      <MigrationSteps />

      <PricingWedge />

      <CompareFaq
        title="Octomind alternative: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: July 2026. Octomind status verified against Internet Archive snapshots of octomind.dev (farewell letter, May 2026) and its last published pricing page (March 2026)." />

      <CompareCta
        heading="Your tests should outlive any vendor."
        subheading="Regenerate your suites and keep the code."
        ctaId="cta-octomind-footer"
      />
    </Layout>
  );
};

export default OctomindAlternative;
