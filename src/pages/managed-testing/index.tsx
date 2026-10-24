import React, { useEffect, useState } from "react";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

const CAMPAIGN = "managed-testing";
const PRICING = "/pricing/";
const ENTERPRISE_PILOT = "/pilot/";
const STUDY = "/saas-app-health/";

// Forwards the visitor's utm_* params to the booking page so a call booked
// from a post or e-mail keeps its source in HubSpot.
function useBookingHref(cta: string) {
  const fallback = `/book-demo/?utm_source=website&utm_medium=managed-testing&utm_campaign=${CAMPAIGN}&utm_content=${cta}`;
  const [href, setHref] = useState(fallback);
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const params = new URLSearchParams();
    incoming.forEach((value, key) => {
      if (key.startsWith("utm_")) params.set(key, value);
    });
    if (!params.has("utm_source")) params.set("utm_source", "website");
    if (!params.has("utm_medium")) params.set("utm_medium", "managed-testing");
    params.set("utm_campaign", CAMPAIGN);
    if (!params.has("utm_content")) params.set("utm_content", cta);
    setHref(`/book-demo/?${params.toString()}`);
  }, [cta]);
  return href;
}

const AT_A_GLANCE = [
  "~10 critical flows",
  "Your CI or one click",
  "A person reviews every failure",
  "About an hour a week from you",
];

type Way = {
  name: string;
  tag: string;
  rows: { field: string; value: string }[];
  highlight?: boolean;
};

const WAYS: Way[] = [
  {
    name: "License",
    tag: "Self-serve. Your team drives the agents.",
    rows: [
      { field: "Who writes the tests", value: "Your team, with our AI agents" },
      { field: "Who runs and maintains them", value: "Your team" },
      { field: "Who reviews failures", value: "Your team" },
      { field: "Your effort", value: "Your people own the suite" },
      { field: "How you start", value: "Sign up free, no credit card" },
      { field: "Price", value: "Published, per user per month" },
    ],
  },
  {
    name: "Managed service",
    tag: "We write, run and maintain the tests for you.",
    highlight: true,
    rows: [
      { field: "Who writes the tests", value: "We do, from flows you confirm" },
      { field: "Who runs and maintains them", value: "We do, as your product changes" },
      { field: "Who reviews failures", value: "A person on our team, every one" },
      { field: "Your effort", value: "A test account and about an hour a week" },
      { field: "How you start", value: "A 6-week managed pilot" },
      { field: "Price", value: "Priced per scope, told on a call" },
    ],
  },
];

const STEPS: { title: string; body: string }[] = [
  {
    title: "We agree your flows",
    body: "Together we pick the ~10 flows your customers rely on: sign-up, login, payment, your core action. We write them in plain language and you confirm them.",
  },
  {
    title: "We write the tests",
    body: "An AI testing agent walks your app like a normal user. It reads the screen, not your code, so a renamed button doesn't break the test.",
  },
  {
    title: "They run before every release",
    body: "From your CI, or on demand: you or we click one button. The report with steps and screenshots is ready in a few minutes.",
  },
  {
    title: "A person reviews every failure",
    body: "A red test is a question: is it the app, or our test? We answer it before you see it. You get a green run or a short list of real defects.",
  },
];

type FlowStatus = "pass" | "defect";

const SAMPLE_FLOWS: { flow: string; status: FlowStatus }[] = [
  { flow: "Sign up as a new user", status: "pass" },
  { flow: "Verify the e-mail address", status: "pass" },
  { flow: "Wrong password, then the right one", status: "pass" },
  { flow: "Reset the password", status: "pass" },
  { flow: "Pay for a plan (sandbox)", status: "pass" },
  { flow: "First action in an empty account", status: "pass" },
  { flow: "Invite a colleague", status: "defect" },
  { flow: "Create a project (core action)", status: "pass" },
  { flow: "Upgrade, then downgrade", status: "defect" },
  { flow: "Cancel the subscription", status: "pass" },
];

const SAMPLE_DEFECTS: {
  flow: string;
  title: string;
  steps: string[];
  impact: string;
  screen: string;
}[] = [
  {
    flow: "Invite a colleague",
    title: "The invite link opens an “expired link” page",
    steps: [
      "Log in as the account owner.",
      "Open Team and invite a new e-mail address.",
      "Open the invite e-mail in the test inbox and click the link.",
      "Expected: a sign-up form. Actual: “This link has expired.”",
    ],
    impact: "New teammates can't join, so accounts stay single-user.",
    screen: "This link has expired",
  },
  {
    flow: "Upgrade, then downgrade",
    title: "The plan page still shows the higher plan after a downgrade",
    steps: [
      "Upgrade to the higher plan with a sandbox test card.",
      "Downgrade back to the lower plan.",
      "Reload Billing.",
      "Expected: the lower plan. Actual: the higher plan and its price.",
    ],
    impact: "Customers may think they're still paying the higher price.",
    screen: "Current plan: Higher",
  },
];

const WE_DO = [
  "Define your ~10 critical flows with you, in plain language you confirm.",
  "Write the tests and run them before every release.",
  "Maintain the tests as your product changes.",
  "Review every failure before it reaches you.",
  "Send each defect with steps, screenshots and one line of business impact.",
];

const YOU_DO = [
  "Give us a test account, plus a bot-protection exception or a sandbox where needed.",
  "About an hour a week: read the report and answer our questions.",
  "Decide which defects to fix. Fixing them stays with your team.",
];

const PILOT_WEEKS: { tag: string; title: string; points: string[] }[] = [
  {
    tag: "Week 1",
    title: "Kickoff, flows and success criteria",
    points: [
      "We pick your ~10 flows together and agree the success criteria for the pilot.",
      "The agent signs up as a stranger and walks the flows.",
      "First findings with steps and screenshots in the first week.",
    ],
  },
  {
    tag: "Weeks 2 and 3",
    title: "Tests running",
    points: [
      "Tests for all your flows, run from your CI or with one click.",
      "We settle the tests: the first rounds include test fixes on our side.",
    ],
  },
  {
    tag: "Weeks 4 and 5",
    title: "Every release",
    points: [
      "The flows run before every release, and you get the report.",
      "We maintain the tests as your product changes.",
    ],
  },
  {
    tag: "Week 6",
    title: "Review and decision",
    points: [
      "An end-of-pilot report: what we found, what your team fixed, what's still open.",
      "We check the results against the success criteria from week 1.",
      "You decide what happens next.",
    ],
  },
];

const AFTER_PILOT: { lead: string; detail: string }[] = [
  {
    lead: "Continue",
    detail: "We keep running and maintaining your flows before every release.",
  },
  {
    lead: "Switch to a license",
    detail: "Your team runs the tests itself. You keep the tests we wrote.",
  },
  {
    lead: "Stop",
    detail: "You keep the end-of-pilot report and can download the tests.",
  },
];

const SAFETY = [
  "We test with a test account, on staging or production, as you prefer.",
  "Nothing is sent to your real customers or contacts.",
  "Payment flows run only in a sandbox, with test cards.",
  "We never train models on your code or test data. EU data residency with a DPA is standard.",
];

const LIMITS: { lead: string; detail: string }[] = [
  {
    lead: "CAPTCHAs, bot walls and 2FA stop any unattended agent",
    detail:
      "We need a test bypass, a test account, or one human step. A CAPTCHA is protection, not a bug.",
  },
  {
    lead: "The agent can be wrong",
    detail:
      "That's why a person reviews every failure. We promise evidence and review, not zero false alarms.",
  },
  {
    lead: "It doesn't replace unit tests",
    detail:
      "It covers the top layer unit tests can't see: can a user sign up, pay and do the main thing in today's build?",
  },
  {
    lead: "It isn't a penetration test or a legal audit",
    detail: "We test what your users do, the way a careful user would.",
  },
  {
    lead: "It takes a few rounds to settle",
    detail: "Expect the first week to include test fixes on our side.",
  },
];

const PRICING_POINTS: { lead: string; detail: string }[] = [
  {
    lead: "Priced by your flows and release cadence",
    detail:
      "How many flows we cover and how often you release decide the price. Nothing else does.",
  },
  {
    lead: "Told to you on a 30-minute call",
    detail:
      "After we've looked at your product. The 6-week managed pilot is priced the same way.",
  },
  {
    lead: "No per-run or per-seat fees",
    detail:
      "Run the flows on every release and share the reports with anyone on your team.",
  },
];

type Faq = { q: string; a: string; link?: { text: string; to: string } };

const FAQS: Faq[] = [
  {
    q: "What do I get, and what do I have to do?",
    a: "You get your ~10 critical flows tested before every release, and a green run or a short list of real defects with steps and screenshots. We write, run and maintain the tests and review every failure. From you: a test account and about an hour a week.",
  },
  {
    q: "How fast do we see results?",
    a: "In the first week. The agent signs up as a stranger and walks your flows, and the first findings arrive with steps and screenshots. From week 2 the tests run from your CI or with one click.",
  },
  {
    q: "How much does it cost?",
    a: "It's priced by your flows and your release cadence, so we can't give a fair number before we've seen your product. We look at it first and tell you the price on a 30-minute call. There are no per-run or per-seat fees. If you'd rather run the tests yourself, license prices are public on the pricing page.",
    link: { text: "pricing page", to: PRICING },
  },
  {
    q: "How does it plug into our release?",
    a: "The tests run from your CI, or on demand: you or we click one button. The run's report with steps and screenshots is ready in a few minutes. A person reviews every failure before it reaches you, and that review can take longer than the run.",
  },
  {
    q: "Can we trust the results?",
    a: "Every failure is checked by a person against the trace and the video before you hear about it. If our test was wrong, we fix it and you never see it. The agent can be wrong, so we promise evidence and review, not zero false alarms.",
  },
  {
    q: "What happens when our UI changes?",
    a: "Maintenance is part of the service. The agent reads the screen, not your code, so many changes don't break the tests at all. When a change does break a test, we update it, and you only hear about it if the app is at fault.",
  },
  {
    q: "Why not let our coding agent write tests, or hire a QA engineer?",
    a: "A coding agent tests the code it just wrote. We test your app from the outside, like a stranger, and someone owns every failure. When you hire QA later, they start from running flows and evidence, not a blank page.",
  },
  {
    q: "What access do you need, and is our data safe?",
    a: "A test account, and a bot-protection exception or a sandbox where needed. Nothing is sent to your real customers or contacts, and payment flows run only in a sandbox with test cards. We never train models on your code or test data.",
  },
  {
    q: "Who owns the tests, and what if we stop?",
    a: "The tests are written in plain language that product and management can read, and you can download them. If you stop, you keep the reports and the tests.",
  },
  {
    q: "What happens after the 6-week managed pilot?",
    a: "We check the results against the success criteria agreed in week 1. Then you decide: continue, switch to a license and keep the tests, or stop and keep the report.",
  },
  {
    q: "How is this different from the enterprise pilot?",
    a: "The enterprise pilot is built for QA teams: 8 weeks, your people build about 20 tests with our coaching, and it asks 3 to 5 person-days per sprint from your team. The 6-week managed pilot is for teams without QA: we do the work, and you give about an hour a week.",
    link: { text: "enterprise pilot", to: ENTERPRISE_PILOT },
  },
];

const JSON_LD_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wopee.io managed testing service",
  serviceType: "Managed software testing",
  provider: {
    "@type": "Organization",
    name: "Wopee.io",
    url: "https://wopee.io/",
  },
  description:
    "We define your ~10 critical flows with you, write and maintain AI tests for them, run them before every release from your CI or with one click, and a person reviews every failure. Starts with a 6-week managed pilot. Priced per scope.",
  areaServed: "EU",
  url: "https://wopee.io/managed-testing/",
};

const JSON_LD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const CARD =
  "rounded-2xl border border-solid border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]";
const ACCENT = "text-secondary-wopee dark:text-primary-wopee";
const MUTED = "text-gray-600 dark:text-gray-300";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const BUTTON = `inline-flex min-h-11 items-center justify-center rounded-lg border border-solid px-5 py-2.5 text-center text-sm font-semibold no-underline transition ease-out hover:no-underline md:text-base xl:text-lg ${FOCUS}`;
const BUTTON_PRIMARY = `${BUTTON} border-secondary-wopee bg-secondary-wopee text-white hover:bg-transparent hover:text-secondary-wopee dark:border-primary-wopee dark:bg-primary-wopee dark:text-secondary-wopee dark:hover:bg-transparent dark:hover:text-primary-wopee`;
const BUTTON_OUTLINE = `${BUTTON} border-secondary-wopee bg-transparent text-secondary-wopee hover:bg-secondary-wopee/10 hover:text-secondary-wopee dark:border-primary-wopee dark:text-primary-wopee dark:hover:bg-primary-wopee/10 dark:hover:text-primary-wopee`;
const TEXT_LINK = `rounded-sm font-semibold underline decoration-1 underline-offset-4 ${ACCENT} ${FOCUS}`;

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mt-10 scroll-mt-24 border-0 border-t border-solid border-gray-200 pt-8 dark:border-white/[0.14] sm:mt-14 sm:pt-14"
    >
      <header className="mb-6 sm:mb-8">
        {eyebrow ? (
          <span
            className={`text-xs font-semibold uppercase tracking-widest ${ACCENT}`}
          >
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        {intro ? (
          <p className={`mt-4 max-w-3xl text-base leading-relaxed ${MUTED}`}>
            {intro}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee"
    />
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul
      className={`m-0 list-none space-y-2 pl-0 text-sm leading-relaxed ${MUTED}`}
    >
      {items.map((item, i) => (
        <li key={i} className="m-0 flex gap-2.5">
          <Dot />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LeadCard({ lead, detail }: { lead: string; detail: string }) {
  return (
    <li className={`${CARD} m-0 flex gap-3 px-5 py-4`}>
      <span
        aria-hidden="true"
        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee"
      />
      <span>
        <span className="block font-semibold">{lead}</span>
        <span className={`mt-1 block text-sm leading-relaxed ${MUTED}`}>
          {detail}
        </span>
      </span>
    </li>
  );
}

const NODE =
  "m-0 flex items-center justify-center rounded-lg border border-solid px-3 py-2 text-center text-xs font-semibold leading-snug sm:text-sm";
const NODE_PLAIN =
  "border-gray-300 bg-white text-gray-900 dark:border-white/20 dark:bg-white/[0.06] dark:text-white";
const NODE_STRONG =
  "border-secondary-wopee bg-secondary-wopee text-white dark:border-primary-wopee dark:bg-primary-wopee dark:text-gray-900";

function Arrow({ down, inverted }: { down?: boolean; inverted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center text-base ${
        inverted ? "text-white/80" : "text-gray-500 dark:text-gray-400"
      } ${down ? "h-6" : "h-6 sm:h-auto sm:w-6"}`}
    >
      {down ? (
        "↓"
      ) : (
        <>
          <span className="sm:hidden">↓</span>
          <span className="hidden sm:inline">→</span>
        </>
      )}
    </span>
  );
}

function FlowRow({
  nodes,
  label,
  inverted,
}: {
  nodes: string[];
  label: string;
  inverted?: boolean;
}) {
  const plain = inverted
    ? "border-white/40 bg-white/10 text-white"
    : NODE_PLAIN;
  const strong = inverted
    ? "border-primary-wopee bg-white/10 text-primary-wopee"
    : NODE_STRONG;
  return (
    <ol
      aria-label={label}
      className="m-0 flex list-none flex-col items-stretch pl-0 sm:flex-row"
    >
      {nodes.map((n, i) => (
        <React.Fragment key={n}>
          {i > 0 ? (
            <li aria-hidden="true" className="m-0 flex justify-center">
              <Arrow inverted={inverted} />
            </li>
          ) : null}
          <li
            className={`${NODE} sm:flex-1 ${
              i === nodes.length - 1 ? strong : plain
            }`}
          >
            {n}
          </li>
        </React.Fragment>
      ))}
    </ol>
  );
}

function ReviewDiagram() {
  return (
    <div
      role="group"
      aria-label="What happens to a red test"
      className="flex flex-col items-stretch"
    >
      <div className={`${NODE} ${NODE_PLAIN}`}>
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-2 w-2 rounded-full bg-red-500"
        />
        Red test
      </div>
      <Arrow down />
      <div className={`${NODE} ${NODE_PLAIN}`}>
        A person checks the trace and video
      </div>
      <div aria-hidden="true" className="relative h-6">
        <span className="absolute left-1/2 top-0 h-3 w-px bg-gray-400" />
        <span className="absolute left-1/4 right-1/4 top-3 h-3 border-0 border-x border-t border-solid border-gray-400" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className={`${NODE} ${NODE_STRONG}`}>
          App defect: sent to you, with evidence
        </div>
        <div className={`${NODE} ${NODE_PLAIN}`}>
          Our test: we fix it, you never hear about it
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: FlowStatus }) {
  return status === "pass" ? (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-400/15 dark:text-green-300">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400" />
      Green
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-400/15 dark:text-red-300">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400" />
      Reviewed defect
    </span>
  );
}

function ScreenshotSketch({ text }: { text: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-24 w-full shrink-0 flex-col gap-1.5 rounded-md border border-solid border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-[#1b1b1d] sm:w-36"
    >
      <span className="h-2 w-1/2 rounded bg-gray-200 dark:bg-white/15" />
      <span className="mt-1 flex flex-1 items-center justify-center rounded border border-dashed border-red-400 text-[10px] font-semibold text-red-700 dark:text-red-300">
        {text}
      </span>
      <span className="h-2 w-1/3 rounded bg-gray-200 dark:bg-white/15" />
    </div>
  );
}

function SampleReport() {
  const green = SAMPLE_FLOWS.filter((f) => f.status === "pass").length;
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-solid border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-0 border-b border-solid border-gray-200 bg-gray-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03] sm:px-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Release report · Demo app
            </div>
            <div className="mt-1 text-lg font-bold">
              Release 2.14 · triggered from CI
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm tabular-nums">
            <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-800 dark:bg-green-400/15 dark:text-green-300">
              {green} of {SAMPLE_FLOWS.length} green
            </span>
            <span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-800 dark:bg-red-400/15 dark:text-red-300">
              {SAMPLE_FLOWS.length - green} reviewed defects
            </span>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <ol className="m-0 list-none border-0 border-b border-solid border-gray-200 px-5 py-4 pl-5 dark:border-white/10 sm:px-6 lg:border-b-0 lg:border-r">
            {SAMPLE_FLOWS.map((f, i) => (
              <li
                key={f.flow}
                className="m-0 flex items-center justify-between gap-3 py-1.5 text-sm"
              >
                <span className="flex min-w-0 gap-2">
                  <span className="w-5 shrink-0 text-right tabular-nums text-gray-500 dark:text-gray-400">
                    {i + 1}
                  </span>
                  <span className="min-w-0">{f.flow}</span>
                </span>
                <StatusPill status={f.status} />
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-4 px-5 py-5 sm:px-6">
            {SAMPLE_DEFECTS.map((d) => (
              <article
                key={d.title}
                className="rounded-xl border border-solid border-gray-200 p-4 dark:border-white/10"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-red-700 dark:text-red-300">
                  Defect · {d.flow}
                </div>
                <h3 className="mb-0 mt-1 text-base font-bold leading-snug">
                  {d.title}
                </h3>
                <div className="mt-3 flex flex-col gap-4 sm:flex-row">
                  <ol
                    className={`m-0 flex-1 list-decimal space-y-1 pl-5 text-sm leading-relaxed ${MUTED}`}
                  >
                    {d.steps.map((s) => (
                      <li key={s} className="m-0">
                        {s}
                      </li>
                    ))}
                  </ol>
                  <ScreenshotSketch text={d.screen} />
                </div>
                <p className="mb-0 mt-3 text-sm">
                  <strong>Business impact:</strong> {d.impact}
                </p>
                <p className="mb-0 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Reviewed by a person on our team before it was sent.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        A sample built from invented demo data. Your report uses your flows and
        your release.
      </figcaption>
    </figure>
  );
}

function renderAnswer({ a, link }: Faq) {
  if (!link) return a;
  const at = a.indexOf(link.text);
  if (at === -1) return a;
  return (
    <>
      {a.slice(0, at)}
      <Link to={link.to} className={TEXT_LINK}>
        {link.text}
      </Link>
      {a.slice(at + link.text.length)}
    </>
  );
}

function Ctas({ cta }: { cta: string }) {
  const bookHref = useBookingHref(cta);
  return (
    <div className="flex flex-col items-center gap-4">
      <Link
        href={bookHref}
        id={`cta-managed-testing-${cta}`}
        className={BUTTON_PRIMARY}
      >
        Book a pilot call
      </Link>
      <Link
        to={PRICING}
        className={`inline-flex min-h-11 items-center text-sm ${TEXT_LINK}`}
      >
        Prefer to run it yourself? See license pricing
      </Link>
    </div>
  );
}

function BandCtas() {
  const bookHref = useBookingHref("closing");
  return (
    <div className="flex flex-col items-center gap-4">
      <Link
        href={bookHref}
        id="cta-managed-testing-closing"
        className={`${BUTTON} border-primary-wopee bg-primary-wopee text-secondary-wopee hover:bg-transparent hover:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
      >
        Book a pilot call
      </Link>
      <Link
        to={PRICING}
        className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-white underline decoration-1 underline-offset-4 hover:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Prefer to run it yourself? See license pricing
      </Link>
    </div>
  );
}

function WayCard({ way, cta }: { way: Way; cta: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-solid px-5 py-5 sm:px-6 ${
        way.highlight
          ? "border-secondary-wopee bg-secondary-wopee/[0.04] dark:border-primary-wopee dark:bg-primary-wopee/[0.05]"
          : "border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]"
      }`}
    >
      <h3 className="m-0 text-xl font-bold">{way.name}</h3>
      <p className={`mb-0 mt-1 text-sm ${MUTED}`}>{way.tag}</p>
      <dl className="m-0 mt-4 flex-1">
        {way.rows.map((r) => (
          <div
            key={r.field}
            className="border-0 border-t border-solid border-gray-200 py-2.5 dark:border-white/10"
          >
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {r.field}
            </dt>
            <dd className="m-0 mt-0.5 text-sm font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">{cta}</div>
    </div>
  );
}

function ManagedWayCta() {
  const bookHref = useBookingHref("comparison");
  return (
    <Link
      href={bookHref}
      id="cta-managed-testing-comparison"
      className={BUTTON_PRIMARY}
    >
      Book a pilot call
    </Link>
  );
}

export default function ManagedTestingPage() {
  return (
    <Layout
      title="Managed testing service for SaaS teams"
      description="We write, run and maintain AI tests for your ~10 critical flows, and a person reviews every failure. Start with a 6-week managed pilot, priced per scope."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(JSON_LD_SERVICE)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(JSON_LD_FAQ)}
        </script>
      </Head>

      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-solid border-secondary-wopee/40 bg-secondary-wopee/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-wopee dark:border-primary-wopee/40 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-primary-wopee"
            />
            Managed testing service
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Your critical flows, tested before every release.{" "}
            <span className={ACCENT}>We do the work.</span>
          </h1>
          <p
            className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${MUTED}`}
          >
            We write, run and maintain AI tests for the ~10 flows your customers
            rely on. They run from your CI or with one click, and a person
            reviews every failure before it reaches you. You get a green run or
            a short list of real defects.
          </p>

          <ul className="mx-auto mt-6 flex max-w-3xl list-none flex-wrap justify-center gap-2 pl-0">
            {AT_A_GLANCE.map((item) => (
              <li
                key={item}
                className="m-0 rounded-full border border-solid border-gray-200 px-3 py-1 text-sm text-gray-600 dark:border-white/10 dark:text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Ctas cta="hero" />
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            A 30-minute call with a founder. We look at your product first. No
            deck.
          </p>
          <div className="mx-auto mt-10 max-w-3xl">
            <FlowRow
              label="Your release, then your ~10 flows run, then a person reviews every failure, then a green run or a short list of real defects"
              nodes={[
                "Your release",
                "~10 flows run",
                "A person reviews failures",
                "Green, or real defects",
              ]}
            />
          </div>
        </header>

        <Section
          id="two-ways"
          eyebrow="Two ways to use Wopee.io"
          title="Run it yourself, or have us run it"
          intro="Same AI testing agents, two ways to work with them. A license is for teams that want to drive the agents themselves. The managed service is for teams without QA who want the work done."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <WayCard
              way={WAYS[0]}
              cta={
                <Link to={PRICING} className={BUTTON_OUTLINE}>
                  See license pricing
                </Link>
              }
            />
            <WayCard way={WAYS[1]} cta={<ManagedWayCta />} />
          </div>
        </Section>

        <Section
          id="how-it-works"
          eyebrow="How it works"
          title="Four steps, then it runs with every release"
        >
          <ol className="m-0 grid list-none gap-4 pl-0 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`${CARD} m-0 px-5 py-5`}>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-wopee text-sm font-extrabold text-white dark:bg-primary-wopee dark:text-gray-900"
                >
                  {i + 1}
                </span>
                <h3 className="mb-0 mt-3 text-base font-bold leading-snug">
                  {s.title}
                </h3>
                <p className={`mb-0 mt-2 text-sm leading-relaxed ${MUTED}`}>
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="sample-report"
          eyebrow="What lands before every release"
          title="A green run, or a short list of real defects"
          intro="Every defect comes with the steps to reproduce it, a screenshot and one line of business impact. Nothing else reaches you."
        >
          <SampleReport />
        </Section>

        <Section
          id="who-does-what"
          eyebrow="Who does what"
          title="We do the testing. You give us about an hour a week."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className={`${CARD} px-5 py-5 sm:px-6`}>
              <h3 className="m-0 text-lg font-bold">What we do</h3>
              <div className="mt-4">
                <Bullets items={WE_DO} />
              </div>
            </div>
            <div className={`${CARD} px-5 py-5 sm:px-6`}>
              <h3 className="m-0 text-lg font-bold">What you do</h3>
              <div className="mt-4">
                <Bullets items={YOU_DO} />
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="pilot"
          eyebrow="Start here"
          title="The 6-week managed pilot"
          intro="Your ~10 critical flows, tested and maintained by us for six weeks. Success criteria are agreed in week 1, so the decision at the end is based on what we agreed."
        >
          <ol className="m-0 grid list-none gap-4 pl-0 md:grid-cols-2">
            {PILOT_WEEKS.map((w) => (
              <li
                key={w.tag}
                className={`${CARD} m-0 flex flex-col px-5 py-5 sm:px-6`}
              >
                <span
                  className={`text-xs font-semibold uppercase tracking-widest ${ACCENT}`}
                >
                  {w.tag}
                </span>
                <h3 className="mb-0 mt-2 text-lg font-bold leading-snug">
                  {w.title}
                </h3>
                <div className="mt-3">
                  <Bullets items={w.points} />
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-10 text-lg font-bold">After week 6, you choose</h3>
          <ul className="mt-4 grid list-none gap-3 pl-0 md:grid-cols-3">
            {AFTER_PILOT.map((o) => (
              <LeadCard key={o.lead} lead={o.lead} detail={o.detail} />
            ))}
          </ul>
          <p className={`mt-6 max-w-3xl text-sm leading-relaxed ${MUTED}`}>
            Looking for the 8-week pilot where your QA team builds the tests
            with our coaching? That's the{" "}
            <Link to={ENTERPRISE_PILOT} className={TEXT_LINK}>
              enterprise pilot
            </Link>
            .
          </p>
        </Section>

        <Section
          id="review"
          eyebrow="Every finding checked by a person"
          title="A red test is a question. We answer it before you see it."
          intro={
            <>
              The run's report is ready in a few minutes. A person then reviews
              each failure against the trace and video, which can take longer.
              You hear about real defects only. In October we tested{" "}
              <Link to={STUDY} className={TEXT_LINK}>
                28 SaaS products as strangers
              </Link>
              : 24 had a defect in sign-up.
            </>
          }
        >
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className={`${CARD} px-5 py-5 sm:px-6`}>
              <ReviewDiagram />
            </div>
            <div className={`${CARD} px-5 py-5 sm:px-6`}>
              <h3 className="m-0 text-lg font-bold">
                Safe for your customers and data
              </h3>
              <div className="mt-4">
                <Bullets items={SAFETY} />
              </div>
            </div>
          </div>

          <h3 className="mt-10 text-lg font-bold">Honest limits</h3>
          <ul className="mt-4 grid list-none gap-3 pl-0 md:grid-cols-2">
            {LIMITS.map((l) => (
              <LeadCard key={l.lead} lead={l.lead} detail={l.detail} />
            ))}
          </ul>
        </Section>

        <Section
          id="pricing"
          eyebrow="How pricing works"
          title="Priced by your scope, not by seats"
          intro="We don't publish a price for the managed service, because it depends on your product. Here is how we set it."
        >
          <ul className="m-0 grid list-none gap-3 pl-0 md:grid-cols-3">
            {PRICING_POINTS.map((p) => (
              <LeadCard key={p.lead} lead={p.lead} detail={p.detail} />
            ))}
          </ul>
          <p className={`mt-6 max-w-3xl text-sm leading-relaxed ${MUTED}`}>
            Running the tests yourself? License prices are public, per user per
            month, on the{" "}
            <Link to={PRICING} className={TEXT_LINK}>
              pricing page
            </Link>
            .
          </p>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Questions CTOs ask us">
          <div className="flex flex-col gap-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className={`${CARD} group`}
              >
                <summary
                  className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold sm:px-6 [&::-webkit-details-marker]:hidden ${FOCUS}`}
                >
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-wopee/10 text-lg text-secondary-wopee transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none dark:bg-primary-wopee/10 dark:text-primary-wopee"
                  >
                    +
                  </span>
                </summary>
                <p
                  className={`mb-0 max-w-3xl px-5 pb-4 text-sm leading-relaxed sm:px-6 ${MUTED}`}
                >
                  {renderAnswer(f)}
                </p>
              </details>
            ))}
          </div>
        </Section>

        <section
          id="book"
          className="mt-12 scroll-mt-24 rounded-2xl bg-gradient-to-br from-secondary-wopee to-[#451f6b] px-6 py-12 text-center text-white sm:mt-14"
        >
          <img
            src="/img/wopee_head_1_2023-10-10-640.webp"
            alt="Wopee.io monkey"
            width={96}
            height={124}
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Start with the 6-week managed pilot
          </h2>
          <div className="mx-auto mt-6 max-w-2xl">
            <FlowRow
              inverted
              label="Book a call, then we look at your product, then a 30-minute call with your price and pilot plan"
              nodes={[
                "Book a call",
                "We look at your product",
                "30 minutes: price and plan",
              ]}
            />
          </div>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
            Book 30 minutes with a founder and tell us your product and how
            often you release. We look at your product before we talk, then
            tell you which flows we'd start with and what the pilot costs. No
            deck.
          </p>
          <div className="mt-8">
            <BandCtas />
          </div>
        </section>
      </main>
    </Layout>
  );
}
