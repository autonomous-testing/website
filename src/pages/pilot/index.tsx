import React from "react";

import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";

const BOOK_DEMO = "/book-demo/";
const DOCS_SPEC = "https://docs.wopee.io/pilot-projects/";

const AT_A_GLANCE = [
  "8 weeks, 8 sprints",
  "Up to 10 critical flows",
  "Baseline measured in Sprint 1",
  "You own the tests",
];

const OFFER: { field: string; value: string }[] = [
  {
    field: "Duration",
    value: "8 weeks, run as 8 weekly sprints, with a decision at the end.",
  },
  {
    field: "Scope",
    value:
      "Up to 10 critical user flows of one web application, agreed before Sprint 1. Flows can be exchanged one for one as you learn what matters.",
  },
  {
    field: "We deliver",
    value:
      "5 tests built by our engineers, weekly runs, a live stability dashboard, a benefit assessment against your baseline, a viability report, and a closure presentation for your stakeholders.",
  },
  {
    field: "Your team delivers",
    value:
      "Around 20 further tests, built by your people with our coaching. The point is that the suite still works when we are not in the room.",
  },
  {
    field: "Decision",
    value:
      "A named decision maker on your side commits to a go or no-go at the end of Sprint 8, against criteria agreed in writing before Sprint 1.",
  },
  {
    field: "After the pilot",
    value:
      "You own every test. They export as plain Playwright code and keep running without Wopee.io.",
  },
];

const FIXED = [
  "The price, agreed before Sprint 1 and credited in full if you continue.",
  "Eight sprints, ending in a go or no-go rather than a renewal conversation.",
  "The effort we ask of your team, published above so you can plan for it.",
  "Test ownership and the exit terms, whichever way the decision goes.",
];

const SHAPED = [
  "Which flows we cover, and in what order.",
  "The route to your environment: VPN, allow-list, or a jump host.",
  "Sprint cadence, aligned to your release train rather than ours.",
  "On site or remote for Sprint 1 and Sprint 8.",
  "How much coaching your team wants, and how quickly they take over.",
  "Whether related areas such as API or mobile belong in scope for you.",
];

const SPRINTS: { sprint: string; focus: string; outcome: string }[] = [
  {
    sprint: "1",
    focus:
      "Training, environment access, connectivity, scope confirmed, baseline measured",
    outcome:
      "Everyone can run a test, and the numbers we will be judged against are on record.",
  },
  {
    sprint: "2",
    focus: "First working tests: login and prerequisites, first analysis cycle",
    outcome: "At least one runnable critical flow per area.",
  },
  {
    sprint: "3",
    focus: "Optimisation: ignore regions, stabilisation, deeper training",
    outcome: "Runs are repeatable.",
  },
  {
    sprint: "4 to 5",
    focus: "Expand coverage, 10 to 15 test cases per sprint",
    outcome: "The agreed scope is covered.",
  },
  {
    sprint: "6 to 7",
    focus: "Stabilisation: run, monitor, address flakiness and maintenance",
    outcome: "The suite is trustworthy enough to act on.",
  },
  {
    sprint: "8",
    focus: "Lessons learned workshop, stakeholder demo, go or no-go decision",
    outcome: "Viability report and a decision.",
  },
];

const MEASURES: { name: string; detail: string }[] = [
  {
    name: "Flow coverage",
    detail: "How much of the agreed critical scope is under automated test.",
  },
  {
    name: "Time to a scenario",
    detail:
      "How long a test case takes to create, before versus with Wopee.io.",
  },
  {
    name: "Regression cycle time",
    detail: "How long a full pass over the agreed scope takes.",
  },
  {
    name: "Test stability",
    detail: "The share of runs that fail for reasons other than your product.",
  },
  {
    name: "Team adoption",
    detail: "How many of your people can run and review tests unaided.",
  },
];

const FIT: { lead: string; detail: string }[] = [
  {
    lead: "A named pilot owner",
    detail: "A QA or test lead who will run this alongside us.",
  },
  {
    lead: "3 to 5 person-days per sprint",
    detail:
      "Across the team, for building tests, reviewing runs, and feedback.",
  },
  {
    lead: "A non-production environment",
    detail: "With working test accounts and stable test data.",
  },
  {
    lead: "A route to that environment",
    detail: "VPN, allow-list, or a jump host. We agree it on the first call.",
  },
  {
    lead: "An application that is hard to automate",
    detail:
      "Canvas, nested iframes, dynamic data, heavy SPA state, or an SSO-protected enterprise stack.",
  },
  {
    lead: "Someone who decides",
    detail: "A named signer for the go or no-go at the end of Sprint 8.",
  },
  {
    lead: "A reason to act this quarter",
    detail:
      "A release, an audit, a migration, or a regression backlog that keeps growing.",
  },
  {
    lead: "Openness to publication",
    detail:
      "We publish the technique, never your data. Named or anonymised, your call.",
  },
];

const NOT: { lead: string; detail: string }[] = [
  {
    lead: "It does not replace your QA team",
    detail:
      "It gives them a suite that keeps working, and the coaching to run it themselves.",
  },
  {
    lead: "It does not promise a defect count",
    detail:
      "Our agents build and stabilise a regression suite. How many bugs that surfaces depends on your application.",
  },
  {
    lead: "It does not cover every platform",
    detail:
      "Native mobile, desktop applications, and APIs on their own are out of scope. A pilot covers one web application.",
  },
  {
    lead: "It does not drift",
    detail:
      "There is no rolling extension. Sprint 8 ends with a decision either way.",
  },
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
      "From EUR 12,000, fixed, credited in full against the first annual contract on conversion.",
    url: "https://wopee.io/pilot/",
    availability: "https://schema.org/InStock",
  },
};

const CARD =
  "rounded-2xl border border-solid border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]";

function Section({
  eyebrow,
  title,
  intro,
  children,
  divider = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <section
      className={
        divider
          ? "mt-12 border-0 border-t border-solid border-gray-200 pt-12 dark:border-white/[0.14] sm:mt-14 sm:pt-14"
          : "mt-12 sm:mt-14"
      }
    >
      <header className="mb-8">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        {intro ? (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {intro}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function LeadCard({ lead, detail }: { lead: string; detail: string }) {
  return (
    <li className={`${CARD} flex gap-3 px-5 py-4`}>
      <span
        aria-hidden="true"
        className="mt-1 h-2 w-2 shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee"
      />
      <span>
        <span className="block font-semibold">{lead}</span>
        <span className="mt-1 block text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {detail}
        </span>
      </span>
    </li>
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
          <span className="inline-block rounded-full border border-solid border-secondary-wopee/40 bg-secondary-wopee/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-wopee dark:border-primary-wopee/40 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            Pilot project
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Prove autonomous testing on your application in 8 weeks
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            Your application, your team, your baseline. We agree the scope and
            the success criteria before Sprint 1, measure where you stand in the
            first week, and compare against it in the last one. You end with a
            working suite and enough evidence to decide either way.
          </p>

          <div
            className={`${CARD} mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 px-6 py-5 text-center sm:flex-row sm:gap-6 sm:text-left`}
          >
            <span className="whitespace-nowrap text-3xl font-extrabold text-secondary-wopee dark:text-primary-wopee">
              From €12,000
            </span>
            <span className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Fixed before Sprint 1, and credited in full against your first
              annual contract if you continue. You do not pay for the evaluation
              and then again for the contract.
            </span>
          </div>

          <ul className="mx-auto mt-6 flex max-w-3xl list-none flex-wrap justify-center gap-2 pl-0">
            {AT_A_GLANCE.map((item) => (
              <li
                key={item}
                className="rounded-full border border-solid border-gray-200 px-3 py-1 text-sm text-gray-600 dark:border-white/10 dark:text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>

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

        <Section
          eyebrow="How we run it"
          title="The shape we recommend"
          intro={
            <>
              This structure comes from the pilots we have run with enterprise
              QA teams, and it is what we suggest as a starting point: long
              enough to reach a suite people trust, small enough in scope to
              stay honest, and finite so the decision actually gets made. We
              publish it in full so you can weigh it before the call rather than
              after it. Where your context calls for something different, we
              shape it with you.
            </>
          }
          divider={false}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {OFFER.map((row) => (
              <div key={row.field} className={`${CARD} px-5 py-5`}>
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee">
                  {row.field}
                </span>
                <p className="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {row.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className={`${CARD} px-6 py-6`}>
              <h3 className="text-lg font-bold">
                Fixed, so you can plan and budget
              </h3>
              <ul className="mt-3 list-none space-y-2 pl-0 text-gray-600 dark:text-gray-300">
                {FIXED.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee"
                    />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${CARD} px-6 py-6`}>
              <h3 className="text-lg font-bold">Shaped with you</h3>
              <ul className="mt-3 list-none space-y-2 pl-0 text-gray-600 dark:text-gray-300">
                {SHAPED.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee"
                    />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Your side"
          title="What we need from your team"
          intro="This is the part most vendors leave out, so we put the numbers up front. A pilot with a team that cannot spare the time stalls around Sprint 3, and nobody benefits from that."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className={`${CARD} px-6 py-6`}>
              <h3 className="text-lg font-bold">Time</h3>
              <p className="mt-3 text-3xl font-extrabold text-secondary-wopee dark:text-primary-wopee">
                3 to 5 person-days
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                per sprint, across the team
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Roughly 20 to 35 person-days over the 8 weeks: building tests
                with our coaching, reviewing runs, and giving feedback.
              </p>
            </div>
            <div className={`${CARD} px-6 py-6`}>
              <h3 className="text-lg font-bold">People</h3>
              <ul className="mt-3 list-none space-y-2 pl-0 text-gray-600 dark:text-gray-300">
                {[
                  "A QA or test lead as pilot owner, named before kickoff.",
                  "The testing team, for the hands-on work.",
                  "SRE or DevOps for environment access in Sprint 1, then on request.",
                  "Stakeholders for the Sprint 8 demo and decision.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee"
                    />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`${CARD} mt-4 px-6 py-6`}>
            <h3 className="text-lg font-bold">Before kickoff you need</h3>
            <ul className="mt-3 grid list-none gap-2 pl-0 text-gray-600 dark:text-gray-300 sm:grid-cols-2">
              {[
                "A non-production environment with working test accounts and stable test data.",
                "Network access for our agents to reach it. We agree the route on the first call.",
                "The initial 5 test cases you want covered first.",
                "A named decision maker and a date for the Sprint 8 decision.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee"
                  />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          eyebrow="Week by week"
          title="Eight sprints, one decision"
          intro="Sprint 1 and Sprint 8 can be on site or remote. Everything in between is remote."
        >
          <div
            className={`${CARD} divide-y divide-solid divide-gray-200 overflow-hidden dark:divide-white/10`}
          >
            {SPRINTS.map((s) => (
              <div
                key={s.sprint}
                className="grid gap-2 px-5 py-5 sm:grid-cols-[auto,1fr,1fr] sm:items-start sm:gap-6"
              >
                <span className="inline-flex w-fit min-w-[7.5rem] items-center justify-center gap-1 rounded-full bg-secondary-wopee/10 px-3 py-1 text-sm font-bold text-secondary-wopee dark:bg-primary-wopee/10 dark:text-primary-wopee">
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    Sprint
                  </span>
                  {s.sprint}
                </span>
                <span className="font-medium">{s.focus}</span>
                <span className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {s.outcome}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <div
          className={`${CARD} mt-8 flex flex-col items-center gap-4 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left`}
        >
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-white">
              Not sure your application is a fit?
            </span>{" "}
            That is what the first call is for. We will tell you if it is not.
          </p>
          <ButtonPrimary
            href={BOOK_DEMO}
            label="Book the first call"
            id="cta-pilot-mid"
            className="whitespace-nowrap"
          />
        </div>

        <Section
          eyebrow="Evidence"
          title="How we measure"
          intro="Every pilot records a baseline in Sprint 1 and compares against it in Sprint 8. The criteria are agreed in writing before work starts, so the result is read rather than interpreted."
        >
          <ul className="grid list-none gap-4 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {MEASURES.map((m) => (
              <li key={m.name} className={`${CARD} px-5 py-5`}>
                <span className="block font-semibold">{m.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {m.detail}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-gray-600 dark:text-gray-300">
            We report each of these against your own baseline. We do not quote
            percentages from other customers as your expected result, because
            every application and every team is different.
          </p>
        </Section>

        <Section
          eyebrow="Fit"
          title="Is a pilot right for you now?"
          intro="Read this as a self-check rather than a sales filter. If several of these are a no, we will say so on the first call and suggest a better quarter instead of starting something that stalls."
        >
          <ul className="grid list-none gap-3 pl-0 sm:grid-cols-2">
            {FIT.map((item) => (
              <LeadCard key={item.lead} lead={item.lead} detail={item.detail} />
            ))}
          </ul>
        </Section>

        <Section
          eyebrow="Boundaries"
          title="What a pilot does not do"
          intro="Worth knowing before you spend budget on it."
        >
          <ul className="grid list-none gap-3 pl-0 sm:grid-cols-2">
            {NOT.map((item) => (
              <LeadCard key={item.lead} lead={item.lead} detail={item.detail} />
            ))}
          </ul>
        </Section>

        <Section
          eyebrow="Afterwards"
          title="Both endings are clean"
          intro="At the end of Sprint 8 you have a viability report, a working suite, and a decision to make. Neither answer leaves you worse off than you started."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className={`${CARD} px-6 py-6`}>
              <h3 className="text-lg font-bold">You continue</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                The pilot fee is credited in full against your first year. The
                suite grows from the foundation you already built, and your team
                keeps our support.
              </p>
            </div>
            <div className={`${CARD} px-6 py-6`}>
              <h3 className="text-lg font-bold">You stop</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                You keep every test, exported as plain Playwright. We revoke our
                access and delete your data within 30 days. Nothing runs on our
                side afterwards.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-gray-600 dark:text-gray-300">
            Your data stays in the EU by default, a custom region or a full
            on-premise deployment is available, and we never train models on
            your code, test data, or screenshots. SOC 2 and ISO 27001 are on our
            roadmap, and we are happy to complete your supplier security
            questionnaire before the pilot starts.
          </p>
        </Section>

        <section className="mt-12 rounded-2xl bg-gradient-to-br from-secondary-wopee to-[#451f6b] px-6 py-12 text-center text-white sm:mt-14">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Start with a 30 minute call
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
            It is not a product demo. We go through the questions on this page
            for your organisation: which application and which flows, who owns
            the pilot and who decides, whether the capacity exists this quarter,
            and what your security review needs from us. If it fits, we send you
            the pilot charter pre-filled from that conversation. If it does not,
            we will tell you on the call.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
