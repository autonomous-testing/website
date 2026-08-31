import React from "react";

import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";

const BOOK_DEMO = "/book-demo/";
const DOCS_SPEC = "https://docs.wopee.io/pilot-projects/";

const OFFER: { field: string; value: string }[] = [
  { field: "Duration", value: "8 weeks, run as 8 weekly sprints" },
  {
    field: "Price",
    value:
      "From €12,000, fixed. Agreed before Sprint 1 and credited in full against your first annual contract if you continue.",
  },
  {
    field: "Scope",
    value:
      "Up to 10 critical user flows of one web application, agreed before Sprint 1. Flows can be exchanged one for one during the pilot.",
  },
  {
    field: "We deliver",
    value:
      "5 tests built by our engineers, weekly test runs, a live stability dashboard, a benefit assessment against your baseline, a viability report, and a closure presentation.",
  },
  {
    field: "You deliver",
    value: "Around 20 further tests built by your team with our coaching.",
  },
  {
    field: "Decision",
    value:
      "A named decision maker on your side commits to a go or no-go decision at the end of Sprint 8.",
  },
  {
    field: "After the pilot",
    value:
      "You own every test. They export as plain Playwright code and run without Wopee.io.",
  },
];

const SPRINTS: { sprint: string; focus: string; outcome: string }[] = [
  {
    sprint: "1",
    focus:
      "Training, environment access, connectivity, scope confirmed, baseline measured",
    outcome:
      "Everyone can run a test. The numbers we compare against are recorded.",
  },
  {
    sprint: "2",
    focus: "First working tests: login and prerequisites, first analysis cycle",
    outcome: "At least one runnable critical flow per area.",
  },
  {
    sprint: "3",
    focus:
      "Optimisation: ignore regions, stabilisation, advanced training if wanted",
    outcome: "Runs are repeatable.",
  },
  {
    sprint: "4 to 5",
    focus: "Expand coverage, 10 to 15 test cases per sprint",
    outcome: "Agreed scope covered.",
  },
  {
    sprint: "6 to 7",
    focus: "Stabilisation: run, monitor, address flakiness and maintenance",
    outcome: "The suite is trustworthy.",
  },
  {
    sprint: "8",
    focus: "Lessons learned workshop, stakeholder demo, go or no-go decision",
    outcome: "Viability report and a decision.",
  },
];

const FIT: string[] = [
  "You have a QA function with a named lead who will own the pilot.",
  "You can commit 3 to 5 person-days per sprint across the team.",
  "You have a non-production environment with working test accounts and stable test data.",
  "Network access for our agents can be solved in week 1, by VPN, allow-list, or a jump host.",
  "Your application is one we are differentiated on: canvas, nested iframes, dynamic data, heavy SPA state, or an SSO-protected enterprise stack.",
  "Someone can be named today who decides at the end of Sprint 8.",
  "There is a real trigger now: a release, an audit, a migration, or a growing regression backlog.",
  "You are willing to let us publish the technique we used, named or anonymised.",
];

const NOT: string[] = [
  "It does not replace your QA team. It gives them a suite that keeps working, and coaching on how to run it.",
  "It does not promise a defect count. Our agents build and stabilise a regression suite. How many bugs that suite surfaces depends on your application.",
  "It does not cover mobile native apps, desktop applications, or APIs on their own. The scope is one web application.",
  "It does not run indefinitely. Sprint 8 ends with a decision either way.",
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wopee.io pilot project",
  serviceType: "Autonomous software testing pilot",
  provider: {
    "@type": "Organization",
    name: "Wopee.io",
    url: "https://wopee.io/",
  },
  description:
    "An 8-week, fixed-scope engagement that proves autonomous testing on your application, with your team, before you commit to a contract. Up to 10 critical user flows, baseline measured in Sprint 1, go or no-go decision at the end of Sprint 8.",
  areaServed: "EU",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "12000",
    description:
      "From €12,000, fixed, credited in full against the first annual contract on conversion.",
    url: "https://wopee.io/pilot/",
    availability: "https://schema.org/InStock",
  },
};

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-8">
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-secondary-wopee dark:text-primary-wopee">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
      {children ? (
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {children}
        </p>
      ) : null}
    </header>
  );
}

export default function PilotPage() {
  return (
    <Layout
      title="Pilot Projects: prove autonomous testing in 8 weeks"
      description="An 8-week, fixed-scope pilot on your own application. Up to 10 critical flows, a baseline measured in Sprint 1, and a go or no-go decision at the end. From €12,000, credited in full against year one."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(JSON_LD)}</script>
      </Head>

      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="text-center">
          <span className="inline-block rounded-full border border-secondary-wopee/40 bg-secondary-wopee/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-wopee dark:border-primary-wopee/40 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            Pilot project
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Prove autonomous testing on your application in 8 weeks
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            A pilot is a fixed-scope engagement on your own application, with
            your own team, that ends in a decision. We agree the scope and the
            success criteria before Sprint 1, measure your baseline in the first
            week, and compare against it in the last one. If it does not work,
            you will see that in the numbers rather than in a sales deck.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold sm:text-lg">
            Pilots start at €12,000, credited in full against your first annual
            contract if you continue.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonPrimary
              href={BOOK_DEMO}
              label="Book the first call"
              id="cta-pilot-hero"
            />
            <ButtonPrimaryInverted
              href={DOCS_SPEC}
              label="Read the full spec"
            />
          </div>
        </header>

        <section className="mt-16">
          <SectionHeading
            eyebrow="The offer"
            title="Identical for every customer"
          >
            Only the amount is discussed on the call. Everything else on this
            page is what you get.
          </SectionHeading>
          <dl className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
            {OFFER.map((row) => (
              <div
                key={row.field}
                className="grid gap-1 px-5 py-4 sm:grid-cols-4 sm:gap-6"
              >
                <dt className="font-semibold">{row.field}</dt>
                <dd className="text-gray-600 dark:text-gray-300 sm:col-span-3">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Your side"
            title="What we need from your team"
          >
            This is the part most vendors leave out, so we say the numbers up
            front. A pilot with a team that cannot spare the time stalls in
            Sprint 3, and nobody benefits from that.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg font-bold">Time</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                <strong>3 to 5 person-days per sprint</strong> across the team,
                roughly 20 to 35 person-days over the 8 weeks: building tests
                with our coaching, reviewing runs, and giving feedback.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg font-bold">People</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300">
                <li>A QA or test lead as pilot owner, named before kickoff.</li>
                <li>The testing team, for the hands-on work.</li>
                <li>
                  SRE or DevOps for environment access in Sprint 1, then on
                  request.
                </li>
                <li>Stakeholders for the Sprint 8 demo and decision.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
            <h3 className="text-lg font-bold">Before kickoff you need</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300">
              <li>
                A non-production environment with working test accounts and
                stable test data.
              </li>
              <li>
                Network access for our agents to reach it. VPN, allow-list, or a
                jump host. We agree the route on the first call.
              </li>
              <li>The initial 5 test cases you want covered first.</li>
              <li>
                A named decision maker and a date for the Sprint 8 decision.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Week by week"
            title="Eight sprints, one decision"
          >
            Sprint 1 and Sprint 8 can be on site or remote. Everything between
            is remote.
          </SectionHeading>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">Sprint</th>
                  <th className="py-3 pr-4 font-semibold">Focus</th>
                  <th className="py-3 font-semibold">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {SPRINTS.map((s) => (
                  <tr
                    key={s.sprint}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="whitespace-nowrap py-3 pr-4 font-semibold">
                      {s.sprint}
                    </td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">
                      {s.focus}
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-300">
                      {s.outcome}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading eyebrow="Evidence" title="How we measure">
            Every pilot records a baseline in Sprint 1 and compares against it
            in Sprint 8. Success criteria are agreed in writing before work
            starts, not interpreted afterwards.
          </SectionHeading>
          <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
            <li>Coverage of the agreed critical flows by automated tests.</li>
            <li>
              Time to create a test scenario, before versus with Wopee.io.
            </li>
            <li>Regression cycle time for the agreed scope.</li>
            <li>
              Test stability: the share of runs that fail for non-product
              reasons.
            </li>
            <li>
              Team adoption: how many of your team can run and review tests
              unaided.
            </li>
          </ul>
          <p className="mt-5 max-w-3xl text-gray-600 dark:text-gray-300">
            We report each of these against your own baseline. We do not quote
            percentages from other customers as your expected result, because
            every application and team is different.
          </p>
        </section>

        <section className="mt-16">
          <SectionHeading eyebrow="Fit" title="Is a pilot right for you now?">
            Read these as a self-check. If three or more are a no, we will say
            so on the first call and suggest a better quarter rather than
            starting something that stalls.
          </SectionHeading>
          <ul className="grid list-none gap-3 pl-0 sm:grid-cols-2">
            {FIT.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <SectionHeading title="What a pilot does not do" />
          <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
            {NOT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <SectionHeading eyebrow="Afterwards" title="Both endings are clean">
            At the end of Sprint 8 you have a viability report, a working suite,
            and a decision to make.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg font-bold">You continue</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                The pilot fee is credited in full against your first year. The
                suite grows from the pilot's foundation and your team keeps our
                support. You do not pay for the evaluation and then again for
                the contract.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg font-bold">You stop</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                You keep every test, exported as plain Playwright. We revoke our
                access and delete your data within 30 days. Nothing runs on our
                side afterwards.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-gray-600 dark:text-gray-300">
            Your data stays in the EU by default, a custom region or full
            on-premise deployment is available, and we never train models on
            your code, test data, or screenshots. SOC 2 and ISO 27001 are on our
            roadmap, and we are happy to complete your supplier security
            questionnaire before the pilot starts.
          </p>
        </section>

        <section className="mt-16 rounded-2xl bg-gradient-to-br from-secondary-wopee to-[#451f6b] px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Start with a 30 minute call
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            It is not a product demo. We go through the questions on this page
            for your organisation: which application and which flows, who owns
            the pilot and who decides, whether the capacity exists this quarter,
            and what your security review needs from us. If it fits, we send you
            the pilot charter pre-filled from that conversation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <ButtonPrimary
              href={BOOK_DEMO}
              label="Book the first call"
              id="cta-pilot-closing"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
