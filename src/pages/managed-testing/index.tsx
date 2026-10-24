import React, { useEffect, useRef, useState } from "react";

import ExplainerVideo from "../../components/ui/ExplainerVideo";
import { Head, Layout, Link } from "../../components/ui/typedDocusaurus";

const CAMPAIGN = "managed-testing";
const PRICING = "/pricing/";
const ENTERPRISE_PILOT = "/pilot/";
const STUDY = "/saas-app-health/";
const HUBSPOT_PORTAL = "139620033";
const HUBSPOT_FORM = "f6257e05-afe3-4f7c-8f84-75b186a7ea0c";
const HUBSPOT_SUBMIT = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL}/${HUBSPOT_FORM}`;
const GUARANTEE =
  "If the agreed flows aren't running by the end of week 3, the pilot is free.";
const HUBSPOT_MEETINGS = "https://meetings-eu1.hubspot.com/marcel-veselka";
const PAGE_URL = "https://wopee.io/managed-testing/";
const VIDEO_BASE = "managed-testing-explainer";
// Flip to true in the commit that adds the files to static/video/, so the
// VideoObject never points at a file that isn't deployed.
const VIDEO_PUBLISHED = true;

// The visitor's utm_* params, with this page's defaults filled in. Used for
// the inline calendar and the booking-page fallback, so a call booked from a
// post or e-mail keeps its source in HubSpot.
function useUtm(cta: string) {
  const defaults = `utm_source=website&utm_medium=managed-testing&utm_campaign=${CAMPAIGN}&utm_content=${cta}`;
  const [query, setQuery] = useState(defaults);
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
    setQuery(params.toString());
  }, [cta]);
  return query;
}

// Long blocks start collapsed below the lg breakpoint (phones, tablets) and
// stay open on desktop. Open on the server and on first render, so nothing is
// hidden without JavaScript.
function useCollapsedOnSmall() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
  }, []);
  return [open, setOpen] as const;
}

const track = (event: string, params: Record<string, string> = {}) => {
  const w = window as typeof window & { dataLayer?: object[] };
  w.dataLayer?.push({ event, page_path: window.location.pathname, ...params });
};

/* ------------------------------------------------------------------ copy */


const PAINS: { lead: string; detail: string }[] = [
  {
    lead: "Developers test what they changed.",
    detail:
      "Nobody walks sign-up or payment again after an unrelated change, and that's where things break quietly.",
  },
  {
    lead: "Customers don't file bug reports.",
    detail:
      "A stranger whose sign-up fails just leaves. You find out weeks later, as a dip in the numbers.",
  },
  {
    lead: "The test suite stopped when its owner left.",
    detail:
      "Someone set up automated tests once. Today they fail in the pipeline and nobody looks.",
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
    body: "From your CI, or with one click by you or us. The agent's run finishes in minutes, with steps and screenshots.",
  },
  {
    title: "A person checks every failure",
    body: "A red test is a question: is it your app, or our test? We answer it before you see it.",
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

const PILOT_WEEKS: { tag: string; text: string }[] = [
  {
    tag: "Week 1",
    text: "We pick your flows together and agree in writing what success looks like. First findings arrive with steps and screenshots.",
  },
  {
    tag: "Weeks 2 and 3",
    text: "The tests run from your CI or with one click. The first rounds include test fixes on our side.",
  },
  {
    tag: "Weeks 4 and 5",
    text: "The flows run before every release. We keep the tests working as your product changes.",
  },
  {
    tag: "Week 6",
    text: "An end-of-pilot report: what we found, what your team fixed, what's still open. We check it against the week 1 criteria, and you decide.",
  },
];

const MONTHLY = [
  "Your flows run before every release, from your CI or with one click.",
  "We update the tests when your product changes.",
  "A person checks every failure, so you only hear about real problems.",
  "A short monthly check-in: what we found, and which flows to add, drop or swap.",
  "Plain-language tests and reports anyone on your team can read and download.",
];

type GrowTag = "Included" | "On request";

const GROW: { name: string; tag: GrowTag; line: string; link?: string }[] = [
  {
    name: "More flows",
    tag: "On request",
    line: "Add flows as your product grows. Extra flows change the price from the next month.",
  },
  {
    name: "Release gate in your CI",
    tag: "Included",
    line: "A red run can block the release right away, on the agent's result. A person then checks whether it was your app or our test.",
  },
  {
    name: "Daily checks on your live site",
    tag: "On request",
    line: "Your key flows run every day on production, with sandbox payments only and nothing sent to real customers.",
  },
  {
    name: "Mobile web and API checks",
    tag: "On request",
    line: "Your flows in a phone-size browser, and checks on the API behind them.",
  },
  {
    name: "Visual, accessibility and speed checks",
    tag: "On request",
    line: "Catch layout changes and basic accessibility or speed problems. Not a legal or compliance audit.",
  },
  {
    name: "Handover when you hire QA",
    tag: "Included",
    line: "Your new QA person starts with running tests and evidence. Move to a license and keep the tests.",
  },
  {
    name: "A QA partner inside your team",
    tag: "On request",
    line: "For bigger teams, we work inside your release process with your people.",
    link: ENTERPRISE_PILOT,
  },
  {
    name: "Workshops for your team",
    tag: "On request",
    line: "A hands-on session for developers or product people on testing with AI agents.",
  },
];

const AFTER_PILOT: { lead: string; detail: string }[] = [
  {
    lead: "Continue",
    detail: "We keep running and maintaining your flows before every release.",
  },
  {
    lead: "Switch to a license",
    detail: "Your team runs the tests itself, and keeps the tests we wrote.",
  },
  {
    lead: "Stop",
    detail: "You keep the end-of-pilot report and the tests you downloaded.",
  },
];

const TERMS = [
  "Pilot first. No annual contract.",
  "Month to month after the pilot. Cancel any time, effective next month.",
  "Swap flows for free at the monthly check-in. Extra flows change the price.",
  "Fewer than 10 flows is fine. Start with your most important ones.",
  "You keep the downloaded tests and reports, even if you stop.",
  "Anything beyond your flows is quoted first.",
];

const NUMBERS: { value: string; label: string }[] = [
  { value: "28", label: "SaaS products we signed up for as strangers" },
  { value: "24 of 28", label: "had a defect in sign-up" },
  { value: "363 of 381", label: "findings held up when a person re-checked them" },
  { value: "15 of 381", label: "were our own mistake, and we published that" },
];

const PRICE_POINTS: { lead: string; detail: string }[] = [
  {
    lead: "What sets the price",
    detail: "How many flows we cover and how often you release. Nothing else.",
  },
  {
    lead: "What's included",
    detail:
      "Writing, running and maintaining the tests, a person checking every failure, and the monthly check-in.",
  },
  {
    lead: "Never billed",
    detail: "Runs, seats, reports, or fixing a test that was our mistake.",
  },
  {
    lead: "Compared with one QA hire",
    detail:
      "A hire means recruiting, onboarding and months before the first useful test, and testing pauses when they're on holiday or leave. With us, first findings arrive in week 1 and the tests stay when people change.",
  },
];

type Score = { dots: 1 | 2 | 3 | 4 | 5; label: string };

const OPTIONS: { name: string; who: string; highlight?: boolean }[] = [
  { name: "Managed testing", who: "We do the testing", highlight: true },
  { name: "Hire a QA engineer", who: "One person in-house" },
  { name: "Your developers test", who: "Your existing engineers" },
  { name: "A Wopee.io license", who: "Your team runs our agents" },
];

// More dots = better for you. Each row: Managed, QA hire, developers, license.
const METRICS: { name: string; question: string; scores: Score[] }[] = [
  {
    name: "Time to first results",
    question: "How soon do you see real findings?",
    scores: [
      { dots: 5, label: "Week 1" },
      { dots: 1, label: "Months: hiring, then onboarding" },
      { dots: 3, label: "Now, when someone has time" },
      { dots: 3, label: "After your team builds tests" },
    ],
  },
  {
    name: "Effort for your team",
    question: "How much of your people's time it takes",
    scores: [
      { dots: 5, label: "About an hour a week" },
      { dots: 3, label: "Hiring and managing a person" },
      { dots: 1, label: "Developer hours every release" },
      { dots: 2, label: "Your team writes and runs tests" },
    ],
  },
  {
    name: "Release confidence",
    question: "Are the flows that earn you money checked before each release?",
    scores: [
      { dots: 4, label: "Your ~10 key flows, every release" },
      { dots: 4, label: "Good, while they have time" },
      { dots: 2, label: "Mostly what they changed" },
      { dots: 3, label: "Good, if your team keeps it up" },
    ],
  },
  {
    name: "Trust in results",
    question: "When something is red, is it a real bug?",
    scores: [
      { dots: 4, label: "A person checks every failure" },
      { dots: 4, label: "Your hire checks them" },
      { dots: 2, label: "Checked when someone has time" },
      { dots: 3, label: "Your team checks them" },
    ],
  },
  {
    name: "Risk",
    question: "What happens on holidays, when people leave, or if it doesn't work out",
    scores: [
      { dots: 4, label: "Keeps running. Cancel monthly" },
      { dots: 2, label: "Pauses when they're away or leave" },
      { dots: 2, label: "Stops when deadlines hit" },
      { dots: 3, label: "Depends on your team" },
    ],
  },
  {
    name: "Cost",
    question: "Relative cost to you, all in",
    scores: [
      { dots: 3, label: "A fixed monthly fee" },
      { dots: 1, label: "A salary, plus recruiting" },
      { dots: 3, label: "Looks free, costs developer time" },
      { dots: 3, label: "License fee plus your team's time" },
    ],
  },
];

type Qa = { q: string; a: string; link?: { text: string; to: string } };

const FOR_CEO: Qa[] = [
  {
    q: "What will it cost?",
    a: "It's priced by your flows and how often you release. We look at your product, talk for 30 minutes, and send a written quote within one business day.",
  },
  {
    q: "What if it doesn't work for us?",
    a: "We agree the success criteria in writing in week 1 and check them in week 6. If it isn't worth it, you stop and keep the report.",
  },
  {
    q: "How much of my team's time does it take?",
    a: "About an hour a week, plus a test account.",
  },
  {
    q: "Are we locked in?",
    a: "No. Month to month after the pilot, cancel any time, effective next month. You keep the tests and reports you downloaded.",
  },
  {
    q: "Will it help when a customer or investor asks how we test?",
    a: "Every release gets a report of which flows ran and what failed. It's a record of your test process, not a certification.",
  },
];

const FOR_CTO: Qa[] = [
  {
    q: "How does it plug into our release?",
    a: "Trigger a run from your CI or with one click. If you switch the gate on, a red run blocks the release right away, on the agent's result. A person then reviews each failure, which can take longer than the run, and tells you whether it was your app or our test.",
  },
  {
    q: "What access do you need?",
    a: "A test account, on staging or production as you prefer, plus a bot-protection exception or a sandbox where needed. Nothing is sent to your real customers, payments run only in a sandbox with test cards, we never train models on your code or test data, and EU data residency with a DPA is standard.",
  },
  {
    q: "What about flaky tests?",
    a: "A person checks every failure first. When our test was wrong, we fix it and it never reaches your report. The agent can be wrong, so we promise evidence and review, not zero false alarms.",
  },
  {
    q: "Who owns the tests?",
    a: "They're written in plain language and you can download them. Prefer to run them yourselves later? Switch to a license and keep them.",
  },
  {
    q: "What can't it do?",
    a: "CAPTCHAs, bot walls and 2FA need a bypass or a test account. It doesn't replace unit tests, and it isn't a penetration test or a legal audit. Native mobile apps are out of scope today.",
  },
  {
    q: "Why not let our coding agent write the tests?",
    a: "A coding agent tests the code it just wrote. We test your app from the outside, like a stranger, and a person owns every failure.",
  },
];

const FAQS: Qa[] = [
  {
    q: "What if the pilot doesn't work out?",
    a: `${GUARANTEE} We agree the flows in writing in week 1, so there is nothing to argue about at the end of week 3.`,
  },
  {
    q: "How fast do we see results?",
    a: "In the first week. The agent signs up as a stranger and walks your flows, and the first findings arrive with steps and screenshots. From week 2 the tests run from your CI or with one click.",
  },
  {
    q: "What happens when our UI changes?",
    a: "Maintenance is part of the service. The agent reads the screen, not your code, so many changes don't break the tests at all. When one does, we update the test, and you only hear about it if the app is at fault.",
  },
  {
    q: "Can we change flows later?",
    a: "Yes. Swap flows for free at the monthly check-in. Extra flows change the price from the next month.",
  },
  {
    q: "Can you test our mobile app?",
    a: "Mobile web, in a phone-size browser, on request. Native mobile apps are out of scope today.",
  },
  {
    q: "Do you fix the bugs you find?",
    a: "No, fixing stays with your team. You get each defect with steps, screenshots and one line of business impact, so it's quick to act on.",
  },
  {
    q: "What happens to our tests if we stop?",
    a: "You keep the reports and the tests you downloaded. You can also switch to a license and keep running them yourselves.",
  },
  {
    q: "How is this different from a license?",
    a: "With a license your team drives the agents, and prices are public per user on the pricing page. With managed testing we do the work.",
    link: { text: "pricing page", to: PRICING },
  },
  {
    q: "How is this different from the enterprise pilot?",
    a: "The enterprise pilot is built for QA teams: 8 weeks, your people build about 20 tests with our coaching, and it asks 3 to 5 person-days per sprint. The 6-week managed pilot is for teams without QA: we do the work, and you give about an hour a week.",
    link: { text: "enterprise pilot", to: ENTERPRISE_PILOT },
  },
];

const JSON_LD_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wopee.io managed testing",
  serviceType: "Managed software testing",
  provider: { "@type": "Organization", name: "Wopee.io", url: "https://wopee.io/" },
  description:
    "We write, run and maintain tests for your most important flows before every release, and a person checks every failure. Starts with a 6-week managed pilot, then month to month. Priced by your flows and release cadence.",
  areaServed: "EU",
  url: PAGE_URL,
};

const JSON_LD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...FOR_CEO, ...FOR_CTO, ...FAQS].map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const JSON_LD_VIDEO = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Managed testing in 90 seconds",
  description:
    "How Wopee.io managed testing works: we pick your most important flows with you, test them before every release, and a person checks every failure.",
  thumbnailUrl: `https://wopee.io/video/${VIDEO_BASE}-poster.jpg`,
  uploadDate: "2026-10-24",
  duration: "PT1M30S",
  contentUrl: `https://wopee.io/video/${VIDEO_BASE}.mp4`,
  embedUrl: "https://www.youtube.com/watch?v=NzJEhzWA-NM",
};

/* --------------------------------------------------------------- styling */

const CARD =
  "rounded-2xl border border-solid border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]";
const ACCENT = "text-secondary-wopee dark:text-primary-wopee";
const MUTED = "text-gray-600 dark:text-gray-300";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const FOCUS_ON_DARK =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-wopee";
const BUTTON = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-solid px-6 py-3 text-center text-base font-bold no-underline transition ease-out hover:no-underline motion-reduce:transition-none`;
const BUTTON_YELLOW = `${BUTTON} border-primary-wopee bg-primary-wopee text-[#1a1124] shadow-[0_10px_30px_-10px_rgba(255,204,0,0.6)] hover:-translate-y-px hover:bg-[#ffd633] hover:text-[#1a1124] ${FOCUS_ON_DARK}`;
const BUTTON_PRIMARY = `${BUTTON} border-secondary-wopee bg-secondary-wopee text-white hover:bg-[#5e2786] hover:text-white dark:border-primary-wopee dark:bg-primary-wopee dark:text-[#1a1124] dark:hover:bg-[#ffd633] dark:hover:text-[#1a1124] ${FOCUS}`;
const BUTTON_OUTLINE = `${BUTTON} border-secondary-wopee bg-transparent text-secondary-wopee hover:bg-secondary-wopee/10 hover:text-secondary-wopee dark:border-primary-wopee dark:text-primary-wopee dark:hover:bg-primary-wopee/10 dark:hover:text-primary-wopee ${FOCUS}`;
const TEXT_LINK = `rounded-sm font-semibold underline decoration-1 underline-offset-4 ${ACCENT} ${FOCUS}`;
const DARK_BAND =
  "relative isolate overflow-hidden bg-[#0b0a10] text-white [background-image:radial-gradient(ellipse_70%_60%_at_15%_0%,rgba(112,48,160,0.55),transparent_70%),radial-gradient(ellipse_50%_50%_at_95%_100%,rgba(112,48,160,0.35),transparent_70%)]";

const PAGE_CSS = `
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
@media (max-width: 767px) {
  .theme-back-to-top-button { bottom: calc(5.5rem + env(safe-area-inset-bottom, 0px)) !important; }
}
.mt-balance { text-wrap: balance; }
@keyframes mt-tick { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: none; } }
@keyframes mt-stamp { 0% { opacity: 0; transform: rotate(-8deg) scale(1.25); } 100% { opacity: 1; transform: rotate(-4deg) scale(1); } }
.mt-tick { animation: mt-tick 0.35s ease-out both; }
.mt-stamp { animation: mt-stamp 0.4s cubic-bezier(.2,.9,.3,1.3) both; animation-delay: 1.5s; }
@media (prefers-reduced-motion: reduce) { .mt-tick, .mt-stamp { animation: none; } }
`;

/* ---------------------------------------------------------- primitives */

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
    <section id={id} className="scroll-mt-24 pt-16 sm:pt-24">
      <header className="mb-8 max-w-3xl sm:mb-10">
        {eyebrow ? (
          <span
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${ACCENT}`}
          >
            <span
              aria-hidden="true"
              className="h-px w-6 bg-secondary-wopee dark:bg-primary-wopee"
            />
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-balance mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${MUTED}`}>
            {intro}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`mt-[0.2rem] h-4 w-4 shrink-0 ${className}`}
    >
      <path
        d="M4 10.5l3.5 3.5L16 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Bullets({ items, dark }: { items: React.ReactNode[]; dark?: boolean }) {
  return (
    <ul
      className={`m-0 list-none space-y-2.5 pl-0 text-base leading-relaxed sm:text-[0.95rem] ${
        dark ? "text-white/80" : MUTED
      }`}
    >
      {items.map((item, i) => (
        <li key={i} className="m-0 flex gap-2.5">
          <Check
            className={dark ? "text-primary-wopee" : "text-secondary-wopee dark:text-primary-wopee"}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LeadCard({ lead, detail }: { lead: string; detail: string }) {
  return (
    <li className={`${CARD} m-0 px-5 py-5`}>
      <span className="block text-base font-bold">{lead}</span>
      <span className={`mt-1.5 block text-base leading-relaxed sm:text-[0.95rem] ${MUTED}`}>
        {detail}
      </span>
    </li>
  );
}

function renderAnswer({ a, link }: Qa) {
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

// Every primary button on the page scrolls to the inline calendar.
function BookButton({
  cta,
  onDark,
  className = "",
}: {
  cta: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#book"
      id={`cta-managed-testing-${cta}`}
      onClick={() => track("managed_testing_cta", { cta })}
      className={`${onDark ? BUTTON_YELLOW : BUTTON_PRIMARY} ${className}`}
    >
      Book a 30-minute pilot call
      <span aria-hidden="true">→</span>
    </a>
  );
}

function RiskLine({ onDark, short }: { onDark?: boolean; short?: boolean }) {
  const check = onDark ? "text-primary-wopee" : "text-secondary-wopee dark:text-primary-wopee";
  return (
    <div
      className={`flex max-w-xl flex-col gap-2 text-base sm:text-sm leading-relaxed ${
        onDark ? "text-white/80" : MUTED
      }`}
    >
      <p className={`m-0 flex gap-2 font-semibold ${onDark ? "text-white" : "text-gray-900 dark:text-white"}`}>
        <Check className={check} />
        <span>{GUARANTEE}</span>
      </p>
      <p className={`m-0 gap-2 ${short ? "hidden sm:flex" : "flex"}`}>
        <Check className={check} />
        <span>
          6-week pilot with success criteria agreed in writing in week 1. Then
          month to month, no annual contract.
        </span>
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- hero */

function ReleaseCard() {
  const green = SAMPLE_FLOWS.filter((f) => f.status === "pass").length;
  return (
    <figure className="relative m-0">
      <div className="rounded-2xl border border-solid border-white/15 bg-white/[0.06] p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-wopee">
              Fri 17:02 · from CI
            </div>
            <div className="mt-1 text-lg font-bold text-white">Release 2.14</div>
          </div>
          <div className="flex gap-2 text-xs font-semibold tabular-nums">
            <span className="rounded-full bg-green-400/15 px-2.5 py-1 text-green-300">
              {green} green
            </span>
            <span className="rounded-full bg-red-400/15 px-2.5 py-1 text-red-300">
              {SAMPLE_FLOWS.length - green} real defects
            </span>
          </div>
        </div>
        <ol className="m-0 mt-4 list-none space-y-1.5 border-0 border-t border-solid border-white/10 pl-0 pt-4">
          {SAMPLE_FLOWS.map((f, i) => (
            <li
              key={f.flow}
              className="mt-tick m-0 flex items-center justify-between gap-3 text-sm"
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <span className="min-w-0 truncate text-white/85">{f.flow}</span>
              {f.status === "pass" ? (
                <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-green-300">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Green
                </span>
              ) : (
                <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-red-300">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  Real defect
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <div
        aria-hidden="true"
        className="mt-stamp relative mb-3 inline-block rounded-lg border-2 border-solid border-primary-wopee bg-[#1a1124] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-primary-wopee shadow-xl sm:absolute sm:-right-5 sm:-top-4 sm:mb-0 sm:rotate-[-4deg] sm:tracking-[0.14em]"
      >
        Every failure checked by a person
      </div>
      <figcaption className="mt-3 text-xs text-white/60">
        Sample report, invented demo data.
      </figcaption>
    </figure>
  );
}

function Hero() {
  return (
    <section className={`${DARK_BAND} px-4 pb-12 pt-8 sm:px-6 sm:pb-24 sm:pt-20`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_30%_30%,black,transparent_75%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <span className="hidden items-center gap-2 rounded-2xl border border-solid border-white/20 bg-white/5 px-3 py-1 text-xs sm:rounded-full font-semibold uppercase leading-relaxed tracking-[0.08em] text-white/85 sm:inline-flex sm:tracking-[0.16em]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary-wopee" />
            Managed testing for software companies without QA
          </span>
          <h1 className="mt-balance mt-0 text-5xl sm:mt-6 font-extrabold leading-[1] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]">
            We test.{" "}
            <span className="text-primary-wopee">You ship.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg font-semibold leading-snug text-white sm:mt-6 sm:text-2xl">
            Your ~10 most important flows, like sign-up and payment, tested
            before every release, so your customers don't find the bugs first.
          </p>
          <p className="mt-3 max-w-xl text-base leading-snug text-white/80 sm:hidden">
            We write and maintain the tests. A person checks every failure.
          </p>
          <p className="mt-4 hidden max-w-xl text-lg leading-relaxed text-white/75 sm:block">
            We write and maintain the tests, and a person on our team checks
            every failure. You get a green run, or a short list of real defects.
          </p>
          <div className="mt-6 flex flex-col items-start gap-4 sm:mt-8">
            <BookButton cta="hero" onDark />
            <RiskLine onDark short />
            <p className="m-0 hidden text-base text-white/65 sm:block sm:text-sm">
              A founder looks at your product before the call. Written quote
              within one business day after it.
            </p>
            <a
              href="#send-your-url"
              className={`hidden min-h-11 items-center rounded-sm text-sm font-semibold text-white underline decoration-white/40 sm:inline-flex decoration-1 underline-offset-4 hover:text-primary-wopee hover:decoration-primary-wopee ${FOCUS_ON_DARK}`}
            >
              Not ready for a call? Send your URL, get 3 findings free
            </a>
          </div>
        </div>
        <div className="hidden lg:block">
          <ReleaseCard />
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl sm:mt-16">
        <ExplainerVideo
          base={VIDEO_BASE}
          title="Managed testing in 90 seconds"
          duration="90 s"
          pendingNote="The video is on its way. Everything it says is on this page."
        />
        <a
          href="#send-your-url"
          className={`mt-3 inline-flex min-h-11 items-center rounded-sm text-base font-semibold text-white underline decoration-white/40 decoration-1 underline-offset-4 hover:text-primary-wopee sm:hidden ${FOCUS_ON_DARK}`}
        >
          Not ready for a call? Send your URL, get 3 findings free
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ sections */

function Problem() {
  return (
    <Section
      id="today"
      eyebrow="Right now"
      title="Who tests your release today?"
      intro="In most small software companies, the developer who built the feature tests it, logged in, on their own laptop. The next people to try it are your customers."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
        {PAINS.map((p) => (
          <div key={p.lead} className={`${CARD} px-5 py-5`}>
            <div className="text-base font-bold">{p.lead}</div>
            <p className={`mb-0 mt-2 text-base leading-relaxed sm:text-[0.95rem] ${MUTED}`}>
              {p.detail}
            </p>
          </div>
        ))}
        <div className="flex flex-col justify-between rounded-2xl bg-secondary-wopee px-5 py-5 text-white">
          <div className="text-5xl font-extrabold tracking-tight tabular-nums text-primary-wopee">
            24 of 28
          </div>
          <p className="mb-0 mt-3 text-base leading-relaxed text-white/90">
            SaaS products we signed up for as strangers in our latest research batch had a
            defect in sign-up.{" "}
            <Link
              to={STUDY}
              className={`inline-flex min-h-11 items-center rounded-sm font-semibold text-white underline decoration-1 underline-offset-4 hover:text-primary-wopee ${FOCUS_ON_DARK}`}
            >
              See the study
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how-it-works" eyebrow="How it works" title="Four steps, then it runs with every release">
      <ol className="m-0 grid list-none gap-4 pl-0 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative m-0 border-0 border-t-2 border-solid border-secondary-wopee pt-5 dark:border-primary-wopee">
            <span className={`font-mono text-sm font-bold ${ACCENT}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mb-0 mt-2 text-lg font-bold leading-snug">{s.title}</h3>
            <p className={`mb-0 mt-2 text-base leading-relaxed sm:text-[0.95rem] ${MUTED}`}>
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
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
      className="flex h-24 w-full max-w-xs shrink-0 flex-col gap-1.5 rounded-md border border-solid border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-[#1b1b1d]"
    >
      <span className="h-2 w-1/2 rounded bg-gray-200 dark:bg-white/15" />
      <span className="mt-1 flex flex-1 items-center justify-center rounded border border-dashed border-red-400 text-[11px] font-semibold text-red-700 dark:text-red-300">
        {text}
      </span>
      <span className="h-2 w-1/3 rounded bg-gray-200 dark:bg-white/15" />
    </div>
  );
}

function SampleReport() {
  const [open, setOpen] = useCollapsedOnSmall();
  const green = SAMPLE_FLOWS.filter((f) => f.status === "pass").length;
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-solid border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-0 border-b border-solid border-gray-200 bg-gray-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03] sm:px-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Release report · Demo app
            </div>
            <div className="mt-1 text-lg font-bold">Release 2.14 · triggered from CI</div>
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
          <ol className="m-0 list-none border-0 border-b border-solid border-gray-200 px-5 py-4 dark:border-white/10 sm:px-6 lg:border-b-0 lg:border-r">
            {SAMPLE_FLOWS.map((f, i) => (
              <li key={f.flow} className="m-0 flex items-center justify-between gap-3 py-1.5 text-base sm:text-sm">
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
            <button
              type="button"
              aria-expanded={open}
              aria-controls="sample-defects"
              onClick={() => setOpen(!open)}
              className={`inline-flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg border border-solid border-gray-300 bg-white px-4 text-base font-semibold text-gray-900 dark:border-white/20 dark:bg-white/[0.06] dark:text-white lg:hidden ${FOCUS}`}
            >
              {open ? "Hide the defect write-ups" : `Show the ${SAMPLE_DEFECTS.length} defect write-ups`}
              <span aria-hidden="true">{open ? "−" : "+"}</span>
            </button>
            <div id="sample-defects" className={`flex-col gap-4 ${open ? "flex" : "hidden lg:flex"}`}>
            {SAMPLE_DEFECTS.map((d) => (
              <article key={d.title} className="rounded-xl border border-solid border-gray-200 p-4 dark:border-white/10">
                <div className="text-xs font-semibold uppercase tracking-widest text-red-700 dark:text-red-300">
                  Defect · {d.flow}
                </div>
                <h3 className="mb-0 mt-1 text-base font-bold leading-snug">{d.title}</h3>
                <div className="mt-3 flex flex-col gap-4">
                  <ol className={`m-0 list-decimal space-y-1 pl-5 text-base sm:text-sm leading-relaxed ${MUTED}`}>
                    {d.steps.map((s) => (
                      <li key={s} className="m-0">
                        {s}
                      </li>
                    ))}
                  </ol>
                  <ScreenshotSketch text={d.screen} />
                </div>
                <p className="mb-0 mt-3 text-base sm:text-sm">
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
      </div>
      <figcaption className="mt-3 text-base sm:text-sm text-gray-500 dark:text-gray-400">
        A sample built from invented demo data. Your report uses your flows and your release.
      </figcaption>
    </figure>
  );
}

function StageHead({ step, when, name }: { step: string; when: string; name: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${ACCENT}`}>
          {step}
        </span>
        <span className="rounded-full border border-solid border-gray-300 px-2.5 py-0.5 text-xs font-semibold text-gray-700 dark:border-white/20 dark:text-gray-200">
          {when}
        </span>
      </div>
      <h3 className="mb-0 mt-3 text-2xl font-extrabold leading-tight">{name}</h3>
    </div>
  );
}

function WeekBar() {
  return (
    <div aria-hidden="true" className="mt-4 grid grid-cols-6 gap-1">
      {[1, 2, 3, 4, 5, 6].map((w) => (
        <span
          key={w}
          className={`h-1.5 rounded-full ${
            w === 1 || w === 6
              ? "bg-secondary-wopee dark:bg-primary-wopee"
              : "bg-secondary-wopee/30 dark:bg-primary-wopee/35"
          }`}
        />
      ))}
    </div>
  );
}

function Offer() {
  return (
    <Section
      id="offer"
      eyebrow="The offer"
      title="Start with six weeks. Keep going only if it pays off."
      intro="One way in, one service after it, and more when you need it. No tiers to compare and no annual contract."
    >
      <ol className="m-0 grid list-none gap-4 pl-0 lg:grid-cols-2">
        <li className="m-0 flex flex-col rounded-2xl border-2 border-solid border-secondary-wopee bg-secondary-wopee/[0.04] px-5 py-6 dark:border-primary-wopee dark:bg-primary-wopee/[0.05] sm:px-6">
          <StageHead step="Step 1" when="6 weeks" name="6-week managed pilot" />
          <p className="mb-0 mt-3 text-base leading-relaxed">
            In six weeks, your ~10 most important flows are tested before every
            release, and you decide with evidence whether to keep going.
          </p>
          <WeekBar />
          <dl className="m-0 mt-5 space-y-3">
            {PILOT_WEEKS.map((w) => (
              <div key={w.tag}>
                <dt className="text-sm font-bold">{w.tag}</dt>
                <dd className={`m-0 mt-0.5 text-base leading-relaxed sm:text-[0.95rem] ${MUTED}`}>{w.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mb-0 mt-5 flex gap-2.5 rounded-xl border border-solid border-secondary-wopee/40 bg-white px-4 py-3 text-base font-bold leading-snug dark:border-primary-wopee/40 dark:bg-white/[0.06]">
            <Check className="text-secondary-wopee dark:text-primary-wopee" />
            <span>{GUARANTEE}</span>
          </p>
          <p className="mb-0 mt-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold dark:bg-white/[0.06]">
            From you: a test account and about an hour a week.
          </p>
        </li>

        <li className={`${CARD} m-0 flex flex-col px-5 py-6 sm:px-6`}>
          <StageHead step="Step 2" when="Month to month" name="Managed testing" />
          <p className="mb-0 mt-3 text-base leading-relaxed">
            After the pilot, we keep doing the work.
          </p>
          <div className="mt-5">
            <Bullets items={MONTHLY} />
          </div>
          <div className="mt-auto pt-6">
            <div className="rounded-xl bg-white px-4 py-4 dark:bg-white/[0.06]">
              <div className="text-sm font-bold">Not included</div>
              <p className={`mb-0 mt-1 text-base sm:text-sm leading-relaxed ${MUTED}`}>
                Fixing your bugs (that stays with your team), penetration tests
                or legal audits, unit tests, and native mobile apps.
              </p>
            </div>
          </div>
        </li>

      </ol>

      <div className={`${CARD} mt-4 px-5 py-6 sm:px-6`}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-10">
          <div>
            <StageHead step="Step 3" when="When you need it" name="Grow with us" />
            <p className="mb-0 mt-3 text-base leading-relaxed">
              Add more when your business does. We quote it first and start
              only after you say yes.
            </p>
          </div>
          <ul className="m-0 grid list-none gap-x-8 gap-y-5 pl-0 sm:grid-cols-2">
            {GROW.map((g) => (
              <li key={g.name} className="m-0">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                    g.tag === "Included"
                      ? "bg-green-100 text-green-800 dark:bg-green-400/15 dark:text-green-300"
                      : "bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-200"
                  }`}
                >
                  {g.tag}
                </span>
                <div className="mt-2 text-base font-bold">
                  {g.link ? (
                    <Link to={g.link} className={`${TEXT_LINK} inline-flex min-h-11 items-center`}>
                      {g.name}
                    </Link>
                  ) : (
                    g.name
                  )}
                </div>
                <p className={`mb-0 mt-1 text-base sm:text-sm leading-relaxed ${MUTED}`}>{g.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mb-0 mt-12 text-xl font-bold">After week 6, you choose</h3>
      <ul className="m-0 mt-4 grid list-none gap-3 pl-0 md:grid-cols-3">
        {AFTER_PILOT.map((o) => (
          <LeadCard key={o.lead} lead={o.lead} detail={o.detail} />
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-dashed border-gray-300 px-5 py-6 dark:border-white/20 sm:px-8">
        <h3 className="m-0 text-xl font-bold">Flexible terms</h3>
        <ul className="m-0 mt-4 grid list-none gap-x-8 gap-y-2.5 pl-0 md:grid-cols-2 lg:grid-cols-3">
          {TERMS.map((t) => (
            <li key={t} className={`m-0 flex gap-2.5 text-base leading-relaxed sm:text-[0.95rem] ${MUTED}`}>
              <Check className="text-secondary-wopee dark:text-primary-wopee" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col items-start gap-4 border-0 border-t border-solid border-gray-200 pt-6 dark:border-white/10 md:flex-row md:items-center md:gap-8">
          <BookButton cta="offer" />
          <RiskLine />
        </div>
      </div>
    </Section>
  );
}

function ReviewDiagram() {
  const node =
    "m-0 flex items-center justify-center rounded-md border border-solid px-3 py-2.5 text-center text-sm font-semibold leading-snug";
  const plain = "border-gray-300 bg-white text-gray-900 dark:border-white/15 dark:bg-white/[0.06] dark:text-white";
  const strong =
    "border-secondary-wopee bg-secondary-wopee text-white dark:border-primary-wopee dark:bg-primary-wopee dark:text-gray-900";
  return (
    <div role="group" aria-label="What happens to a red test" className="flex flex-col items-stretch">
      <div className={`${node} ${plain}`}>
        <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 rounded-full bg-red-500" />
        Red test
      </div>
      <span aria-hidden="true" className="flex h-7 items-center justify-center text-gray-500 dark:text-gray-400">
        ↓
      </span>
      <div className={`${node} ${plain}`}>A person checks the trace and video</div>
      <div aria-hidden="true" className="relative h-6">
        <span className="absolute left-1/2 top-0 h-3 w-px bg-gray-400" />
        <span className="absolute left-1/4 right-1/4 top-3 h-3 border-0 border-x border-t border-solid border-gray-400" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className={`${node} ${strong}`}>App defect: sent to you, with evidence</div>
        <div className={`${node} ${plain}`}>Our test: we fix it, it never reaches your report</div>
      </div>
    </div>
  );
}

function Trust() {
  return (
    <Section id="trust" eyebrow="Why you can trust what we send" title="A person behind every result">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <figure className={`${CARD} m-0 flex flex-col gap-5 px-5 py-6 sm:flex-row sm:px-7`}>
          <img
            src={require("@site/static/img/team/marcel-black-tshirt.jpg").default}
            decoding="async"
            alt="Marcel Veselka, founder of Wopee.io"
            width={112}
            height={112}
            className="h-24 w-24 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-28"
          />
          <blockquote className="m-0 border-0 p-0">
            <p className="m-0 text-base leading-relaxed sm:text-lg">
              I've spent more than 20 years in software testing, and I run a
              small SaaS company too. For weeks our own sign-up chart showed
              zero while people were signing up. The sign-up worked; the
              tracking behind it didn't, and nobody owned it. That's the gap we
              fill: someone owns your critical flows, every release. You talk to
              me on the first call.
            </p>
            <figcaption className="mt-4 text-sm font-semibold">
              Marcel Veselka
              <span className={`font-normal ${MUTED}`}>, founder of Wopee.io</span>
            </figcaption>
          </blockquote>
        </figure>

        <div>
          <ul className="m-0 grid list-none grid-cols-2 gap-3 pl-0">
            {NUMBERS.map((n) => (
              <li key={n.value} className={`${CARD} m-0 px-4 py-4`}>
                <span className={`block text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl ${ACCENT}`}>
                  {n.value}
                </span>
                <span className={`mt-1 block text-base sm:text-sm leading-snug ${MUTED}`}>{n.label}</span>
              </li>
            ))}
          </ul>
          <p className={`mb-0 mt-3 text-base sm:text-sm ${MUTED}`}>
            From our latest public research batch.{" "}
            <Link to={STUDY} className={`${TEXT_LINK} inline-flex min-h-11 items-center`}>
              Read how we tested 28 SaaS products
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
        <div>
          <h3 className="m-0 text-xl font-bold">How we decide a failure is real</h3>
          <p className={`mb-0 mt-3 text-base leading-relaxed ${MUTED}`}>
            The agent's run finishes in minutes. Then a person on our team looks
            at every red test against the trace and the video, which can take
            longer. If our test was wrong, we fix it. Only defects in your app
            reach you, each with steps, a screenshot and one line of business
            impact.
          </p>
        </div>
        <div className={`${CARD} px-5 py-5 sm:px-6`}>
          <ReviewDiagram />
        </div>
      </div>
    </Section>
  );
}

function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="How pricing works"
      title="Priced by your flows. No seats, no per-run fees."
      intro="We don't publish a price for managed testing, because it depends on your product. Here is what sets it, and what you get for it."
    >
      <ul className="m-0 grid list-none gap-3 pl-0 md:grid-cols-2">
        {PRICE_POINTS.map((p) => (
          <LeadCard key={p.lead} lead={p.lead} detail={p.detail} />
        ))}
      </ul>
      <p className="mb-0 mt-6 flex max-w-3xl gap-2.5 text-base font-semibold leading-relaxed">
        <Check className="text-secondary-wopee dark:text-primary-wopee" />
        After the 30-minute call, you get a written quote within one business day.
      </p>
    </Section>
  );
}

function Dots({ score, strong }: { score: Score; strong?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
    <span
      role="img"
      aria-label={`${score.dots} of 5`}
      className="inline-flex gap-1"
    >
      {[1, 2, 3, 4, 5].map((d) => (
        <span
          key={d}
          aria-hidden="true"
          className={`box-border h-2.5 w-2.5 rounded-full border border-solid ${
            d <= score.dots
              ? strong
                ? "border-primary-wopee bg-primary-wopee"
                : "border-secondary-wopee bg-secondary-wopee dark:border-gray-200 dark:bg-gray-200"
              : strong
                ? "border-white/70 bg-transparent"
                : "border-gray-500 bg-transparent dark:border-gray-400"
          }`}
        />
      ))}
    </span>
    <span
      aria-hidden="true"
      className={`text-xs font-semibold tabular-nums ${strong ? "text-white/85" : MUTED}`}
    >
      {score.dots}/5
    </span>
    </span>
  );
}

function ScoreCell({ score, strong }: { score: Score; strong?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Dots score={score} strong={strong} />
      <span
        className={`text-sm leading-snug ${
          strong ? "font-semibold text-white" : MUTED
        }`}
      >
        {score.label}
      </span>
    </div>
  );
}

function Compare() {
  return (
    <Section
      id="compare"
      eyebrow="Compared with the alternatives"
      title="What changes when we do the testing"
      intro="Six things owners and CTOs weigh when nobody owns testing yet. More dots means better for you: 1 is least favourable, 5 most."
    >
      {/* Wide screens: one grid, managed testing as a raised column. */}
      <div
        role="table"
        aria-label="Managed testing compared with the alternatives"
        className="hidden lg:block"
      >
        <div role="row" className="grid grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))]">
          <div role="columnheader" className="px-4 pb-4 pt-6">
            <span className="sr-only">What you weigh</span>
          </div>
          {OPTIONS.map((o) => (
            <div
              key={o.name}
              role="columnheader"
              className={
                o.highlight
                  ? "rounded-t-2xl border-0 border-t-4 border-solid border-primary-wopee bg-secondary-wopee px-5 pb-4 pt-5 text-white dark:bg-[#2a1640]"
                  : "px-5 pb-4 pt-6"
              }
            >
              <div className="text-lg font-extrabold leading-tight">{o.name}</div>
              <div
                className={`mt-1 text-base sm:text-sm ${o.highlight ? "text-white/80" : MUTED}`}
              >
                {o.who}
              </div>
            </div>
          ))}
        </div>
        {METRICS.map((m, r) => {
          const last = r === METRICS.length - 1;
          return (
            <div key={m.name} role="row" className="grid grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))]">
              <div
                role="rowheader"
                className="border-0 border-t border-solid border-gray-200 px-4 py-4 dark:border-white/10"
              >
                <div className="text-base font-bold">{m.name}</div>
                <div className={`mt-0.5 text-base sm:text-sm leading-snug ${MUTED}`}>
                  {m.question}
                </div>
              </div>
              {m.scores.map((sc, i) => (
                <div
                  key={i}
                  role="cell"
                  className={
                    OPTIONS[i].highlight
                      ? `border-0 border-t border-solid border-white/15 bg-secondary-wopee px-5 py-4 dark:bg-[#2a1640] ${
                          last ? "rounded-b-2xl" : ""
                        }`
                      : "border-0 border-t border-solid border-gray-200 px-5 py-4 dark:border-white/10"
                  }
                >
                  <ScoreCell score={sc} strong={OPTIONS[i].highlight} />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Phones and tablets: one card per option, swipe sideways. */}
      <p className={`mb-3 mt-0 text-base sm:text-sm lg:hidden ${MUTED}`}>
        Swipe to compare all four.
      </p>
      <ul
        tabIndex={0}
        aria-label="Managed testing compared with the alternatives, one card per option"
        className={`-mx-4 my-0 flex list-none snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 pl-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:hidden ${FOCUS}`}
      >
        {OPTIONS.map((o, i) => (
          <li
            key={o.name}
            className={`m-0 w-[85%] max-w-sm shrink-0 snap-start rounded-2xl px-5 py-5 ${
              o.highlight
                ? "bg-secondary-wopee text-white dark:bg-[#2a1640] dark:ring-1 dark:ring-primary-wopee"
                : CARD
            }`}
          >
            <div className="text-lg font-extrabold leading-tight">{o.name}</div>
            <div className={`mt-1 text-base sm:text-sm ${o.highlight ? "text-white/80" : MUTED}`}>
              {o.who}
            </div>
            <dl className="m-0 mt-4 space-y-3.5">
              {METRICS.map((m) => (
                <div
                  key={m.name}
                  className={`border-0 border-t border-solid pt-3 ${
                    o.highlight ? "border-white/15" : "border-gray-200 dark:border-white/10"
                  }`}
                >
                  <dt className="text-xs font-bold uppercase tracking-wider">
                    {m.name}
                  </dt>
                  <dd className="m-0 mt-1.5">
                    <ScoreCell score={m.scores[i]} strong={o.highlight} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <p className={`mb-0 mt-4 text-base sm:text-sm ${MUTED}`}>
        Prefer to run it yourself? License prices are public, per user per month, on the{" "}
        <Link to={PRICING} className={TEXT_LINK}>
          pricing page
        </Link>
        .
      </p>
    </Section>
  );
}

function ForwardButton({ anchor, who }: { anchor: string; who: string }) {
  const [copied, setCopied] = useState(false);
  const link = `${PAGE_URL}#${anchor}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      track("managed_testing_forward", { to: who });
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.hash = anchor;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`mt-auto inline-flex min-h-11 cursor-pointer self-start items-center gap-2 rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-secondary-wopee dark:border-white/20 dark:bg-white/[0.06] dark:text-white dark:hover:border-primary-wopee ${FOCUS}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" strokeLinecap="round" />
      </svg>
      <span aria-live="polite">{copied ? "Link copied" : `Copy a link for your ${who}`}</span>
    </button>
  );
}

function QaColumn({ id, role, items, forward, topics }: { id: string; role: string; items: Qa[]; forward: string; topics: string }) {
  const [open, setOpen] = useCollapsedOnSmall();
  return (
    <div id={id} className={`${CARD} flex scroll-mt-24 flex-col px-5 py-6 sm:px-7`}>
      <h3 className="m-0 flex items-center gap-3 text-xl font-extrabold">
        <span className="rounded-md bg-secondary-wopee px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-white dark:bg-primary-wopee dark:text-[#1a1124]">
          {role}
        </span>
        Questions we hear from the {role}
      </h3>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-answers`}
        onClick={() => setOpen(!open)}
        className={`mt-4 mb-3 inline-flex min-h-11 cursor-pointer items-center justify-between gap-3 text-left rounded-lg border border-solid border-gray-300 bg-white px-4 text-base font-semibold text-gray-900 dark:border-white/20 dark:bg-white/[0.06] dark:text-white lg:hidden ${FOCUS}`}
      >
        {open ? "Hide the answers" : `Show ${items.length} answers on ${topics}`}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <dl id={`${id}-answers`} className={`m-0 mb-6 mt-5 space-y-5 ${open ? "" : "hidden lg:block"}`}>
        {items.map((it) => (
          <div key={it.q}>
            <dt className="text-base font-bold">{it.q}</dt>
            <dd className={`m-0 mt-1 text-base leading-relaxed sm:text-[0.95rem] ${MUTED}`}>{it.a}</dd>
          </div>
        ))}
      </dl>
      <ForwardButton anchor={id} who={forward} />
    </div>
  );
}

function Decide() {
  return (
    <Section
      id="decide"
      eyebrow="Two people decide this"
      title="Answers for the CEO, and for the CTO"
      intro="Money, risk and time on one side. Access, CI, noise and ownership on the other. Send each half to the person who asks."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <QaColumn id="for-ceo" role="CEO" items={FOR_CEO} forward="CTO" topics="cost, risk and time" />
        <QaColumn id="for-cto" role="CTO" items={FOR_CTO} forward="CEO" topics="access, CI and ownership" />
      </div>
    </Section>
  );
}

const INPUT =
  "block min-h-12 w-full rounded-lg border border-solid border-gray-300 bg-white px-4 text-base text-gray-900 placeholder:text-gray-500 dark:border-white/20 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-gray-400 " +
  FOCUS;

// Trim, add https:// when no scheme is given, and accept only an http(s)
// address whose host has a dot. Anything with "@" or a space is refused, so an
// e-mail address typed into the URL field never passes.
function normalizeUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value || /[\s@]/.test(value)) return null;
  const hasScheme = /^[a-z][a-z0-9+.-]*:(\/\/|(?!\d))/i.test(value);
  if (hasScheme && !/^https?:\/\//i.test(value)) return null;
  try {
    const u = new URL(hasScheme ? value : `https://${value}`);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (u.username || u.password) return null;
    const labels = u.hostname.split(".");
    if (labels.length < 2 || labels.some((l) => !l) || !/^[a-z]{2,}$|^xn--/i.test(labels[labels.length - 1]))
      return null;
    return u.toString();
  } catch {
    return null;
  }
}

const FREE_MAIL = /@(gmail|googlemail|yahoo|hotmail|outlook|live|icloud|me|aol|proton|protonmail|gmx|seznam|centrum|azet|post)\./i;

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

function UrlForm() {
  const utm = useUtm("url-check");
  const [step, setStep] = useState<1 | 2>(1);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const urlRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 2) emailRef.current?.focus();
  }, [step]);
  useEffect(() => {
    if (status === "done" || status === "error") resultRef.current?.focus();
  }, [status]);

  const bookingHref = `${HUBSPOT_MEETINGS}?${utm}`;

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizeUrl(url);
    if (!clean) {
      setFieldError("Enter your website address, e.g. https://yourapp.com");
      urlRef.current?.focus();
      return;
    }
    setFieldError("");
    setUrl(clean);
    setStep(2);
    track("managed_testing_url_step1");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setFieldError("Enter a valid e-mail address, e.g. you@yourcompany.com");
      emailRef.current?.focus();
      return;
    }
    setFieldError("");
    setStatus("sending");
    const params = new URLSearchParams(utm);
    const hutk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];
    try {
      const res = await fetch(HUBSPOT_SUBMIT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "website", value: url },
            { name: "email", value: email.trim() },
            { name: "utm_source", value: params.get("utm_source") ?? "" },
            { name: "utm_medium", value: params.get("utm_medium") ?? "" },
            { name: "utm_campaign", value: params.get("utm_campaign") ?? "" },
          ],
          context: {
            pageUri: window.location.href,
            pageName: document.title,
            ...(hutk ? { hutk } : {}),
          },
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      track("managed_testing_url_submit");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className={`${CARD} px-5 py-5 outline-none`}>
        <p className="m-0 flex gap-2.5 text-lg font-bold">
          <Check className="text-secondary-wopee dark:text-primary-wopee" />
          <span>Thanks. We'll send your 3 findings within 2 business days.</span>
        </p>
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-bold";
  return (
    <div className={`${CARD} px-5 py-5`}>
      <p className={`m-0 mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] ${ACCENT}`}>
        Step {step} of 2
      </p>
      {step === 1 ? (
        <form onSubmit={next} noValidate>
          <label htmlFor="mt-url" className={label}>
            Your product's URL
          </label>
          <input
            ref={urlRef}
            id="mt-url"
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="https://yourapp.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? "mt-form-error" : undefined}
            className={INPUT}
          />
          {fieldError ? (
            <p id="mt-form-error" role="alert" className="m-0 mt-2 text-sm font-semibold text-red-700 dark:text-red-300">
              {fieldError}
            </p>
          ) : null}
          <button type="submit" id="cta-managed-testing-url-check" className={`${BUTTON_PRIMARY} mt-4 w-full sm:w-auto`}>
            Next
            <span aria-hidden="true">→</span>
          </button>
        </form>
      ) : (
        <form onSubmit={submit} noValidate>
          <p className={`m-0 mb-4 break-all text-base sm:text-sm ${MUTED}`}>
            Checking <strong className="text-gray-900 dark:text-white">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</strong>{" "}
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setStatus("idle");
                setFieldError("");
              }}
              className={`cursor-pointer border-0 bg-transparent p-0 text-sm ${TEXT_LINK}`}
            >
              Change
            </button>
          </p>
          <label htmlFor="mt-email" className={label}>
            Your work e-mail
          </label>
          <input
            ref={emailRef}
            id="mt-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? "mt-form-error mt-email-hint" : "mt-email-hint"}
            className={INPUT}
          />
          {fieldError ? (
            <p id="mt-form-error" role="alert" className="m-0 mt-2 text-sm font-semibold text-red-700 dark:text-red-300">
              {fieldError}
            </p>
          ) : null}
          <p id="mt-email-hint" aria-live="polite" className={`m-0 mt-2 text-sm ${MUTED}`}>
            {FREE_MAIL.test(email)
              ? "A work e-mail helps us match the findings to your team. A personal one works too."
              : "Use your work e-mail, so the findings reach your team."}
          </p>
          <button
            type="submit"
            id="cta-managed-testing-url-send"
            disabled={status === "sending"}
            className={`${BUTTON_PRIMARY} mt-4 w-full sm:w-auto`}
          >
            {status === "sending" ? "Sending…" : "Get my 3 findings"}
          </button>
          {status === "error" ? (
            <div ref={resultRef} tabIndex={-1} role="alert" className="mt-4 text-base sm:text-sm font-semibold outline-none">
              That didn't go through.{" "}
              <a
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("managed_testing_cta", { cta: "url-check-fallback" })}
                className={TEXT_LINK}
              >
                Book a call instead
              </a>{" "}
              and send your URL there.
            </div>
          ) : null}
        </form>
      )}
      <p className={`m-0 mt-4 text-xs leading-relaxed ${MUTED}`}>
        We use your e-mail only to send the findings and one follow-up.
      </p>
    </div>
  );
}

function SendUrl() {
  return (
    <section id="send-your-url" className="scroll-mt-24 pt-16 sm:pt-24">
      <div className="grid gap-6 rounded-2xl border-2 border-dashed border-secondary-wopee/50 px-5 py-8 dark:border-primary-wopee/50 sm:px-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
        <div>
          <span className={`text-xs font-bold uppercase tracking-[0.18em] ${ACCENT}`}>
            Not ready for a call?
          </span>
          <h2 className="mt-balance mb-0 mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
            Send your URL, get 3 findings free
          </h2>
          <p className={`mb-0 mt-3 text-base leading-relaxed ${MUTED}`}>
            Send us your product's URL. An agent signs up as a stranger and
            walks your first steps, and you get 3 findings with steps and
            screenshots within 2 business days. If we find fewer, you hear that
            too. Nothing from the check is ever posted.
          </p>
          <ol aria-label="How the free check works" className="m-0 mt-6 list-none space-y-2 pl-0">
            {["Your URL", "We sign up as a stranger", "3 findings in your inbox"].map((s, i) => (
              <li key={s} className="m-0 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 font-semibold dark:bg-white/[0.05]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-wopee font-mono text-xs font-bold text-white dark:bg-primary-wopee dark:text-[#1a1124]">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <UrlForm />
          <p className="m-0 mt-4">
            <a href="#book" className={`inline-flex min-h-11 items-center text-sm ${TEXT_LINK}`}>
              or bring it to a pilot call
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Other questions">
      <div className="flex flex-col gap-3">
        {FAQS.map((f) => (
          <details key={f.q} className={`${CARD} group`}>
            <summary
              className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-base font-semibold sm:px-6 [&::-webkit-details-marker]:hidden ${FOCUS}`}
            >
              <span>{f.q}</span>
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-wopee/10 text-lg text-secondary-wopee transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none dark:bg-primary-wopee/10 dark:text-primary-wopee"
              >
                +
              </span>
            </summary>
            <p className={`mb-0 max-w-3xl px-5 pb-5 text-base leading-relaxed sm:px-6 ${MUTED}`}>
              {renderAnswer(f)}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

// Loads HubSpot's embed script once the section is near the viewport. The
// script turns .meetings-iframe-container into the same calendar /book-demo/
// shows, and passes the page URL (with its utm_* params) to HubSpot.
function Calendar() {
  const utm = useUtm("inline-calendar");
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [stalled, setStalled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!load) return;
    const script = document.createElement("script");
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);
    const timer = window.setTimeout(() => {
      if (!ref.current?.querySelector("iframe")) setStalled(true);
    }, 10000);
    return () => {
      window.clearTimeout(timer);
      script.remove();
    };
  }, [load]);

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={ref}
        className="relative min-h-[640px] overflow-hidden rounded-2xl bg-white text-gray-900"
      >
        <div className="absolute inset-x-0 top-1/2 m-0 -translate-y-1/2 px-6 text-center text-sm text-gray-600">
          {stalled ? (
            <>
              <p className="m-0 font-semibold text-gray-900">
                The calendar didn't load here.
              </p>
              <a
                href={`/book-demo/?${utm}`}
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg bg-secondary-wopee px-5 font-bold text-white no-underline hover:text-white hover:no-underline"
              >
                Open the calendar on its own page
              </a>
            </>
          ) : (
            <p className="m-0">Loading Marcel's calendar…</p>
          )}
        </div>
        {load ? (
          <div
            key={utm}
            className="meetings-iframe-container relative z-10 bg-white"
            data-src={`${HUBSPOT_MEETINGS}?embed=true&${utm}`}
          />
        ) : null}
        <noscript>
          <p className="p-6">
            <a href={`/book-demo/?${utm}`}>Open the booking calendar</a>
          </p>
        </noscript>
      </div>
      <a
        href={`/book-demo/?${utm}`}
        className={`inline-flex min-h-11 items-center self-start rounded-sm py-2 text-sm font-semibold text-white/80 underline decoration-1 underline-offset-4 hover:text-primary-wopee ${FOCUS_ON_DARK}`}
      >
        Calendar not loading? Open it on its own page
      </a>
    </div>
  );
}

function Book() {
  return (
    <section id="book" className={`${DARK_BAND} mt-16 scroll-mt-16 px-4 py-16 sm:mt-24 sm:px-6 sm:py-24`}>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-0">
        <div className="lg:col-start-1 lg:row-start-1">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-wopee">
            Book a 30-minute pilot call
          </span>
          <h2 className="mt-balance mb-0 mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Pick a time. We look at your product first.
          </h2>
          <div className="mt-4">
            <RiskLine onDark />
          </div>
        </div>
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Calendar />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <ol className="m-0 mt-8 list-none space-y-5 pl-0">
            {[
              ["Before the call", "A founder looks at your product."],
              ["On the call", "Which flows we'd start with, and how the pilot would run."],
              ["Within one business day", "A written quote."],
            ].map(([when, what], i) => (
              <li key={when} className="m-0 flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-solid border-primary-wopee font-mono text-sm font-bold text-primary-wopee">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-bold text-white">{when}</span>
                  <span className="block text-white/75">{what}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-solid border-white/15 bg-white/[0.05] px-5 py-5">
            <p className="m-0 flex gap-2.5 text-base leading-relaxed text-white/90">
              <Check className="text-primary-wopee" />
              <span>
                After week 6: continue, switch to a license and keep the tests,
                or stop and keep the report.
              </span>
            </p>
            <p className="m-0 mt-3 flex gap-2.5 text-base leading-relaxed text-white/90">
              <Check className="text-primary-wopee" />
              <span>No deck. No sales sequence afterwards.</span>
            </p>
          </div>
          <p className="mb-0 mt-6 text-base sm:text-sm text-white/70">
            Prefer to run the tests yourself?{" "}
            <Link
              to={PRICING}
              className={`inline-flex min-h-11 items-center rounded-sm font-semibold text-white underline decoration-1 underline-offset-4 hover:text-primary-wopee ${FOCUS_ON_DARK}`}
            >
              See license pricing
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// One button in a bottom bar on phones: shown once the hero CTA has scrolled
// away, hidden again while the calendar is on screen.
function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("cta-managed-testing-hero");
    const book = document.getElementById("book");
    const urlSection = document.getElementById("send-your-url");
    if (!hero || !book || !("IntersectionObserver" in window)) return;
    let heroVisible = true;
    let bookVisible = false;
    let urlVisible = false;
    const update = () => setShow(!heroVisible && !bookVisible && !urlVisible);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting || e.boundingClientRect.top > 0;
        if (e.target === book) bookVisible = e.isIntersecting;
        if (e.target === urlSection) urlVisible = e.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    io.observe(book);
    if (urlSection) io.observe(urlSection);
    // The on-screen keyboard would put the bar on top of the field being typed in.
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
    const onIn = (e: FocusEvent) => isField(e.target) && setShow(false);
    const onOut = (e: FocusEvent) => isField(e.target) && update();
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-0 border-t border-solid border-white/10 bg-[#0b0a10]/95 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-3 backdrop-blur transition-[transform,visibility] duration-300 motion-reduce:transition-none md:hidden ${
        show ? "visible translate-y-0" : "pointer-events-none invisible translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href="#book"
        tabIndex={show ? 0 : -1}
        id="cta-managed-testing-sticky"
        onClick={() => track("managed_testing_cta", { cta: "sticky" })}
        className={`${BUTTON_YELLOW} w-full`}
      >
        Book a 30-minute pilot call
      </a>
    </div>
  );
}

/* ---------------------------------------------------------------- page */

export default function ManagedTestingPage() {
  return (
    <Layout
      title="Managed testing for teams without QA"
      description="We test your most important flows before every release, and a person checks every failure. Start with a 6-week pilot, then go month to month."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(JSON_LD_SERVICE)}</script>
        <script type="application/ld+json">{JSON.stringify(JSON_LD_FAQ)}</script>
        {VIDEO_PUBLISHED ? (
          <script type="application/ld+json">{JSON.stringify(JSON_LD_VIDEO)}</script>
        ) : null}
        <style>{PAGE_CSS}</style>
      </Head>

      <main className="w-full overflow-x-clip">
        <Hero />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Problem />
          <HowItWorks />
          <Section
            id="sample-report"
            eyebrow="What lands before every release"
            title="A green run, or a short list of real defects"
            intro="Every defect comes with the steps to reproduce it, a screenshot and one line of business impact. Nothing else reaches you."
          >
            <SampleReport />
          </Section>
          <Offer />
          <Trust />
          <Pricing />
          <Compare />
          <Decide />
          <SendUrl />
          <Faq />
        </div>
        <Book />
        <StickyCta />
      </main>
    </Layout>
  );
}
