import React, { useEffect, useState } from "react";

import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";

const CAMPAIGN = "saas-app-health-2026";
const LINKEDIN = "https://www.linkedin.com/in/marcelveselka/";

// Forwards the visitor's utm_* params to the booking page so a call booked
// from a LinkedIn post or e-mail keeps its source in HubSpot.
function useBookingHref(cta: string) {
  const fallback = `/book-demo/?utm_source=wopee.io&utm_medium=landing-page&utm_campaign=${CAMPAIGN}&utm_content=${cta}`;
  const [href, setHref] = useState(fallback);
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const params = new URLSearchParams();
    incoming.forEach((value, key) => {
      if (key.startsWith("utm_")) params.set(key, value);
    });
    if (!params.has("utm_source")) params.set("utm_source", "wopee.io");
    if (!params.has("utm_medium")) params.set("utm_medium", "landing-page");
    params.set("utm_campaign", CAMPAIGN);
    if (!params.has("utm_content")) params.set("utm_content", cta);
    setHref(`/book-demo/?${params.toString()}`);
  }, [cta]);
  return href;
}

type Tone = "strong" | "mid" | "light" | "neutral" | "empty";

type Viz =
  | {
      kind: "dots";
      layers: { count: number; tone: Tone; label: string }[];
      rest?: string;
    }
  | {
      kind: "bar";
      total: number;
      segments: { value: number; tone: Tone; label: string }[];
    };

const KEY_NUMBERS: { value: string; label: string; viz: Viz }[] = [
  {
    value: "24 of 28",
    label:
      "had an open defect in sign-up, registration or the trial form. 17 of them at High or Medium.",
    viz: {
      kind: "dots",
      layers: [
        { count: 17, tone: "strong", label: "17 at High or Medium" },
        { count: 7, tone: "mid", label: "24 with an open defect" },
      ],
      rest: "4 with no sign-up we could use or test",
    },
  },
  {
    value: "10 of 28",
    label:
      "showed a price or a saving on the page that didn't match what you're charged or get.",
    viz: {
      kind: "dots",
      layers: [
        {
          count: 10,
          tone: "strong",
          label: "10 with a price that didn't match",
        },
        { count: 9, tone: "mid", label: "19 with a pricing or number defect" },
      ],
    },
  },
  {
    value: "10 of 28",
    label:
      "fired ad or analytics tags without consent: before the cookie banner was answered, or after “Reject all”.",
    viz: {
      kind: "dots",
      layers: [{ count: 10, tone: "strong", label: "10 of 28 products" }],
    },
  },
  {
    value: "12 of 28",
    label:
      "told a stranger, on login, sign-up or password reset, whether an e-mail address has an account.",
    viz: {
      kind: "dots",
      layers: [{ count: 12, tone: "strong", label: "12 of 28 products" }],
    },
  },
  {
    value: "About 55%",
    label: "of valid findings are visible before the user even logs in.",
    viz: {
      kind: "bar",
      total: 363,
      segments: [
        { value: 110, tone: "strong", label: "110 on the public website" },
        { value: 90, tone: "mid", label: "90 on sign-up, login and reset" },
        { value: 163, tone: "neutral", label: "The rest, inside the app" },
      ],
    },
  },
  {
    value: "67 of 250",
    label:
      "core app flows were not green. 60 of them failed on a real defect in the app.",
    viz: {
      kind: "bar",
      total: 250,
      segments: [
        { value: 183, tone: "neutral", label: "183 passed (73%)" },
        { value: 60, tone: "strong", label: "60 failed on a real defect" },
        { value: 1, tone: "mid", label: "1 our own wrong expectation" },
        { value: 6, tone: "empty", label: "6 couldn't run" },
      ],
    },
  },
];

const SEVERITY: { value: number; tone: Tone; label: string }[] = [
  { value: 37, tone: "strong", label: "37 High (10%)" },
  { value: 124, tone: "mid", label: "124 Medium (34%)" },
  { value: 202, tone: "light", label: "202 Low (56%)" },
];

const FACTS = [
  "28 products tested",
  "381 findings filed",
  "363 still valid after our re-check (95%)",
  "Median 12 valid findings per product",
  "25 of 28 with at least one High still open",
];

const PATTERNS: {
  title: string;
  products: number;
  short: string;
  seen: string;
  saw: string;
  blind: string;
}[] = [
  {
    title: "The front door: sign-up, registration, trial form",
    products: 24,
    short: "A defect in sign-up or the trial form",
    seen: "24 of 28 products · 17 at High or Medium",
    saw: "One trial form failed on every first submit and worked on the second. E-mailed sign-in links that never work, so the only way in is “Forgot password”.",
    blind:
      "The last person to test sign-up is usually the person who built it, on their own logged-in machine.",
  },
  {
    title: "The price on the page is not the price you pay",
    products: 10,
    short: "The price on the page is not the price you pay",
    seen: "10 of 28 products · 19 of 28 with a pricing or number defect",
    saw: "Two different products advertised “save 20%” on yearly billing. On both, the real saving was 16.7%.",
    blind:
      "Pricing lives in three places: the marketing site, the billing provider and the app. Nobody compares them after a price change.",
  },
  {
    title: "The banner asks. The tags already fired.",
    products: 10,
    short: "Tags fire without consent",
    seen: "10 of 28 products · 18 findings, 13 of them High",
    saw: "Ad and analytics tags fired before the visitor answered the cookie banner, in some cases even after “Reject all”.",
    blind:
      "Marketing adds a tag through a tag manager. Nobody re-checks the network tab after the next campaign. (Observed network behaviour, not a legal opinion.)",
  },
  {
    title: "Your login screen answers strangers",
    products: 12,
    short: "Login tells a stranger who has an account",
    seen: "21 findings · 15 products · 12 of 28 reveal who has an account",
    saw: "Login, sign-up or reset screens that confirm whether an e-mail has an account. Passwords e-mailed in plain text. No e-mail verification.",
    blind:
      "Each screen was written to be helpful. Nobody looked at all three together from an attacker's point of view.",
  },
  {
    title: "Failures that stay silent or unclear",
    products: 14,
    short: "Silent or unclear errors",
    seen: "22 findings · 14 products",
    saw: "A refused deletion reported as a success. Endless spinners instead of an error. A generic “unknown error” when the real problem was a server that couldn't be found.",
    blind:
      "Error paths get clicked least, so they get tested least. Nothing throws an error, so an error tracker has nothing to catch.",
  },
  {
    title: "The trial that leaves you stuck",
    products: 13,
    short: "Onboarding dead ends in a fresh trial",
    seen: "21 findings · 13 products",
    saw: "Trials that couldn't connect a data source or upload a file, locked features with no word on how to unlock them, wizards that saved an empty draft. In one product, a payment request on the first day of the free trial.",
    blind:
      "Teams test onboarding with their own account, which has data, a paid plan and history. Nobody sees a fresh, empty trial.",
  },
  {
    title: "Data that shows up wrong",
    products: 14,
    short: "Dates, statuses and contact data shown wrong",
    seen: "23 findings · 14 products",
    saw: "Dates in several formats across one app, times in the wrong time zone, a status that means one thing on the dashboard and another in the list, different phone numbers for the same office.",
    blind:
      "Each screen formats its own data. Nobody compares the same record across screens, or the website with the app.",
  },
  {
    title: "Broken links, sometimes on the money button",
    products: 19,
    short: "A broken or wrong link",
    seen: "33 findings · 19 products · 3 with a call or trial button that opened a 404",
    saw: "Links to pages that no longer exist, across navigation, help and policy pages. In 3 products, it was the button that books a call or starts a trial.",
    blind:
      "The site and the app are deployed separately. URLs change on one side, and the other side never hears about it.",
  },
];

const FLOWS: { flow: string; done: string }[] = [
  {
    flow: "Sign up with a fresh e-mail",
    done: "You're inside the app on the first submit",
  },
  { flow: "Verify e-mail / magic link", done: "The link logs you in" },
  {
    flow: "Log in with a wrong password, then the right one",
    done: "The error stays visible, then you get in",
  },
  { flow: "Reset password", done: "The new password works" },
  {
    flow: "Pick a plan and pay (sandbox)",
    done: "The invoice matches the pricing page",
  },
  {
    flow: "First “aha” action in an empty account",
    done: "It works with zero data",
  },
  { flow: "Invite a teammate", done: "They can log in" },
  {
    flow: "Your core action (send, publish, export...)",
    done: "The result arrives",
  },
  { flow: "Upgrade or downgrade", done: "Plan and price change correctly" },
  { flow: "Cancel", done: "It actually cancels" },
];

const CMD = "my-1 block overflow-x-auto whitespace-pre px-3 py-2 text-xs";

const CHECKS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Sign up as a stranger after every release",
    body: (
      <>
        Incognito window, a new e-mail (
        <code className="break-all">you+release42@yourdomain.com</code>), no
        saved passwords. Submit once. Did it work the first time?
      </>
    ),
  },
  {
    title: "Do the pricing math",
    body: (
      <>
        For every “save X%”, compute{" "}
        <code className="whitespace-nowrap">1 − yearly ÷ (12 × monthly)</code>.
        Pay for 10 months and get 12: that saves 16.7%, not 20%. Then compare
        the pricing card, the comparison table, the checkout button and the
        invoice.
      </>
    ),
  },
  {
    title: "Open DevTools before you touch the cookie banner",
    body: "In the Network tab, filter by your ad and analytics domains. Load the page, click “Reject all” and reload. Anything that fires is a finding.",
  },
  {
    title: "Ask your login screens who exists",
    body: "Try login, sign-up and reset with an e-mail that has no account, then with one that does. If any message differs, a stranger can tell them apart.",
  },
  {
    title: "Crawl your links",
    body: (
      <>
        <code className={CMD}>
          npx linkinator https://your-site.com --recurse
        </code>
        Then click every call-to-action at the end of your product tour by hand.
      </>
    ),
  },
  {
    title: "Run a quick accessibility pass on sign-up and pricing",
    body: (
      <code className={CMD}>
        npx lighthouse https://your-site.com/signup
        --only-categories=accessibility --view
      </code>
    ),
  },
  {
    title: "Mistype the password and look away for 10 seconds",
    body: "Is the error still there when you look back?",
  },
  {
    title: "Open the dashboard of a brand-new account",
    body: "Do the numbers make sense with zero data? Does any percentage divide by zero?",
  },
  {
    title: "Switch the language and read only the buttons",
    body: "Leftovers hide in buttons, e-mails and error messages, not in headlines.",
  },
];

const TIMELINE = ["W1", "W2", "W3", "W4", "W5", "W6", "END"];

type PilotStep = {
  tag: string;
  active: number[];
  title: string;
  points: React.ReactNode[];
  diagram?: "release" | "review";
  proof?: React.ReactNode;
  note?: string;
};

const PILOT_STEPS: PilotStep[] = [
  {
    tag: "Week 1",
    active: [0],
    title: "Pick the flows, get the first findings",
    points: [
      "We agree on your ~10 flows together: sign-up, login, pricing to checkout, your core action, invites, cancel.",
      "The agent signs up as a stranger and walks them.",
      "First findings with steps and screenshots in the first week.",
    ],
    proof: (
      <>
        In October: <strong>median 1 h 41 min</strong> from starting on a new
        product to its first filed findings (13 products timed).
      </>
    ),
  },
  {
    tag: "Weeks 2 to 6",
    active: [1, 2, 3, 4, 5],
    title: "From your CI, or on demand",
    diagram: "release",
    points: [
      "We run it from your CI, or on demand: you or we click one button and get the report in a few minutes.",
      "We improve and maintain the tests for you as your product changes.",
      <>
        You see a green run or a short list of real defects.{" "}
        <strong>Nothing else.</strong>
      </>,
    ],
  },
  {
    tag: "Every week",
    active: [0, 1, 2, 3, 4, 5],
    title: "A person reviews every failure",
    diagram: "review",
    points: [
      "A red test is a question: is it the app, or is it our test? We answer it before you see it.",
    ],
    proof: (
      <>
        In October, <strong>15 of 381 findings</strong> didn't hold up on our
        own re-check. We closed them ourselves.
      </>
    ),
    note: "Some sign-ups need a human step (CAPTCHA). We'll ask you for a test account.",
  },
  {
    tag: "End of week 6",
    active: [6],
    title: "What you get",
    points: [
      "Defects with steps, a recording and one line of business impact.",
      "Your ~10 flows, running and maintained by us. Green means they work, red means a reviewed defect.",
      "An end-of-pilot report: what we found, what your team fixed, what's still open.",
      "When you hire QA later, they start from running flows and evidence, not a blank page.",
    ],
    note: "End of week 6: the report, and you decide whether to keep going.",
  },
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
      "Or a QA lead's judgement. It covers the thin top layer unit tests can't see: can a user sign up, pay and do the main thing in today's build?",
  },
  {
    lead: "It isn't a penetration test or a legal audit",
    detail:
      "The security and consent findings are the basics a careful user would notice.",
  },
  {
    lead: "It takes a few rounds to settle",
    detail: "Expect the first week to include test fixes on our side.",
  },
];

const WRONG: { lead: string; detail: string }[] = [
  {
    lead: "Our first round was only 56% green",
    detail:
      "On the 18 products with a full first round, 101 of 180 passed. After we fixed our own test wording and test data, 123 of 180 (68%). 20 of the 22 extra passes came from fixing our own tests; 2 came after the vendor apparently fixed the bug.",
  },
  {
    lead: "15 of 381 findings were our mistake",
    detail:
      "We misread a setting, or couldn't reproduce it. We closed them ourselves. That's 4% noise, and it's why a person reviews findings before you see them.",
  },
  {
    lead: "Our pass/fail judge doubted 8 of 10 passes on one product",
    detail:
      "Every one was checked against the trace. The rule now: proof, or it isn't a pass.",
  },
  {
    lead: "Bot walls won some rounds",
    detail:
      "7 sign-ups stayed blocked for an unattended agent, and three app suites never ran.",
  },
  {
    lead: "We forgot a file",
    detail:
      "5 tests on one product couldn't run because our sample file was missing. Not their bug. Ours.",
  },
  {
    lead: "The cookie banner comes first",
    detail:
      "Banners blocked clicks until we made “accept cookies” the first step of every test. Obvious in hindsight.",
  },
];

const CARD =
  "rounded-2xl border border-solid border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]";
const ACCENT = "text-secondary-wopee dark:text-primary-wopee";
const MUTED = "text-gray-600 dark:text-gray-300";

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
      className="mt-12 scroll-mt-24 border-0 border-t border-solid border-gray-200 pt-12 dark:border-white/[0.14] sm:mt-14 sm:pt-14"
    >
      <header className="mb-8">
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

function LeadCard({ lead, detail }: { lead: string; detail: string }) {
  return (
    <li className={`${CARD} flex gap-3 px-5 py-4`}>
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

const TONE: Record<Tone, string> = {
  strong: "bg-secondary-wopee dark:bg-primary-wopee",
  mid: "bg-secondary-wopee/45 dark:bg-primary-wopee/50",
  light: "bg-secondary-wopee/20 dark:bg-primary-wopee/25",
  neutral: "bg-gray-300 dark:bg-white/25",
  empty:
    "border border-solid border-gray-300 bg-transparent dark:border-white/40",
};

function Swatch({ tone, round }: { tone: Tone; round?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`box-border inline-block h-2.5 w-2.5 shrink-0 ${
        round ? "rounded-full" : "rounded-sm"
      } ${TONE[tone]}`}
    />
  );
}

function Legend({
  items,
  round,
}: {
  items: { tone: Tone; label: string; tones?: Tone[] }[];
  round?: boolean;
}) {
  return (
    <ul
      className={`m-0 mt-3 flex list-none flex-col gap-1 pl-0 text-xs ${MUTED}`}
    >
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-2">
          {it.tones ? (
            <span
              aria-hidden="true"
              className="inline-flex h-2.5 w-2.5 shrink-0 overflow-hidden rounded-full"
            >
              {it.tones.map((t) => (
                <span key={t} className={`block h-full w-1/2 ${TONE[t]}`} />
              ))}
            </span>
          ) : (
            <Swatch tone={it.tone} round={round} />
          )}
          {it.label}
        </li>
      ))}
    </ul>
  );
}

// One dot per product tested; layers fill in order, the rest stay empty.
function DotGrid({
  layers,
  rest,
  columns = 14,
  legend = true,
}: {
  layers: { count: number; tone: Tone; label: string }[];
  rest?: string;
  columns?: 14 | 28;
  legend?: boolean;
}) {
  const tones: Tone[] = [];
  layers.forEach((l) => {
    for (let i = 0; i < l.count; i++) tones.push(l.tone);
  });
  while (tones.length < 28) tones.push("empty");
  const filled = layers.reduce((n, l) => n + l.count, 0);
  return (
    <div>
      <div
        role="img"
        aria-label={`${filled} of 28 products`}
        className={`grid ${
          columns === 14
            ? "max-w-[15rem] grid-cols-[repeat(14,minmax(0,1fr))] gap-1"
            : "grid-cols-[repeat(28,minmax(0,1fr))] gap-[3px]"
        }`}
      >
        {tones.map((t, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`box-border block aspect-square rounded-full ${TONE[t]}`}
          />
        ))}
      </div>
      {legend && (layers.length > 1 || rest) ? (
        <Legend
          round
          items={[
            // Layer labels are cumulative: a later layer's label counts
            // every dot up to it, so its swatch shows all tones so far.
            ...layers.map((l, i) => ({
              tone: l.tone,
              label: l.label,
              tones:
                i > 0 ? layers.slice(0, i + 1).map((x) => x.tone) : undefined,
            })),
            ...(rest ? [{ tone: "empty" as Tone, label: rest }] : []),
          ]}
        />
      ) : null}
    </div>
  );
}

function StackBar({
  segments,
}: {
  segments: { value: number; tone: Tone; label: string }[];
}) {
  return (
    <div>
      <div
        role="img"
        aria-label={segments.map((s) => s.label).join(", ")}
        className="grid h-3.5 w-full gap-[2px]"
        style={{
          gridTemplateColumns: segments
            .map((seg) => `minmax(0, ${seg.value}fr)`)
            .join(" "),
        }}
      >
        {segments.map((seg) => (
          <span
            key={seg.label}
            title={seg.label}
            className={`box-border block rounded-[3px] ${TONE[seg.tone]}`}
          />
        ))}
      </div>
      <Legend items={segments} />
    </div>
  );
}

function NumberViz({ viz }: { viz: Viz }) {
  return viz.kind === "dots" ? (
    <DotGrid layers={viz.layers} rest={viz.rest} />
  ) : (
    <StackBar segments={viz.segments} />
  );
}

function PatternChart() {
  return (
    <figure className={`${CARD} m-0 mb-6 px-5 py-5 sm:px-6`}>
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-bold">
          How many of the 28 products each pattern hit
        </span>
        <span className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Swatch tone="strong" round /> one product
          </span>
          <span className="flex items-center gap-1.5">
            <Swatch tone="empty" round /> not seen
          </span>
        </span>
      </figcaption>
      <ol className="m-0 grid list-none gap-3 pl-0">
        {PATTERNS.map((p, i) => (
          <li
            key={p.title}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 lg:grid-cols-[16rem_minmax(0,1fr)_3rem]"
          >
            <a
              href={`#pattern-${i + 1}`}
              className="text-sm font-medium text-inherit no-underline hover:text-inherit hover:underline"
            >
              <span className={`mr-2 font-extrabold tabular-nums ${ACCENT}`}>
                #{i + 1}
              </span>
              {p.short}
            </a>
            <span className="text-right text-sm font-bold tabular-nums lg:order-last">
              {p.products}/28
            </span>
            <div className="col-span-2 min-w-0 lg:col-span-1">
              <DotGrid
                columns={28}
                legend={false}
                layers={[{ count: p.products, tone: "strong", label: p.short }]}
              />
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Timeline({ active }: { active: number[] }) {
  return (
    <ol
      aria-hidden="true"
      className="relative m-0 flex list-none items-center justify-between gap-1 pl-0"
    >
      <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-gray-300 dark:bg-white/20" />
      {TIMELINE.map((t, i) => (
        <li
          key={t}
          className={`relative m-0 rounded-full border border-solid px-1.5 py-0.5 text-[10px] font-medium leading-tight tabular-nums sm:px-2 sm:text-[11px] ${
            active.includes(i)
              ? "border-secondary-wopee bg-secondary-wopee text-white dark:border-primary-wopee dark:bg-primary-wopee dark:text-gray-900"
              : "border-gray-300 bg-white text-gray-500 dark:border-white/20 dark:bg-[#1b1b1d] dark:text-gray-400"
          }`}
        >
          {t}
        </li>
      ))}
    </ol>
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
        inverted ? "text-white/80" : "text-gray-400 dark:text-gray-400"
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

function PilotStepCard({ step, index }: { step: PilotStep; index: number }) {
  return (
    <li className={`${CARD} m-0 flex flex-col px-5 py-5 sm:px-6`}>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-wopee text-sm font-extrabold text-white dark:bg-primary-wopee dark:text-gray-900"
        >
          {index + 1}
        </span>
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${ACCENT}`}
        >
          {step.tag}
        </span>
      </div>
      <h3 className="mb-0 mt-2 text-lg font-bold leading-snug">{step.title}</h3>
      <div className="mt-3">
        <Timeline active={step.active} />
      </div>
      {step.diagram === "release" ? (
        <div className="mt-4">
          <FlowRow
            label="Your CI or one click, then the flows run, then the report in a few minutes"
            nodes={[
              "Your CI or one click",
              "~10 flows run",
              "Report in minutes",
            ]}
          />
        </div>
      ) : null}
      <ul
        className={`m-0 mt-4 list-none space-y-2 pl-0 text-sm leading-relaxed ${MUTED}`}
      >
        {step.points.map((pt, i) => (
          <li key={i} className="m-0 flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-wopee dark:bg-primary-wopee"
            />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
      {step.diagram === "review" ? (
        <div className="mt-4">
          <ReviewDiagram />
        </div>
      ) : null}
      {step.proof || step.note ? (
        <div className="mt-4">
          {step.proof ? (
            <p className="m-0 rounded-lg bg-gray-900 px-4 py-3 text-sm leading-relaxed text-white dark:bg-black/40 [&_strong]:text-primary-wopee">
              {step.proof}
            </p>
          ) : null}
          {step.note ? (
            <p
              className={`m-0 rounded-lg border border-dashed border-gray-400 px-4 py-3 text-sm leading-relaxed dark:border-white/30 ${
                step.proof ? "mt-3" : ""
              } ${MUTED}`}
            >
              {step.note}
            </p>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

function Ctas({ cta }: { cta: string }) {
  const bookHref = useBookingHref(cta);
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <ButtonPrimary
        href={bookHref}
        label="Send me your URL"
        id={`cta-saas-health-${cta}`}
      />
      <ButtonPrimaryInverted href={LINKEDIN} label="Message me on LinkedIn" />
    </div>
  );
}

const BAND_BUTTON =
  "inline-block rounded-lg border border-solid px-5 py-2.5 text-sm font-semibold no-underline transition ease-out hover:no-underline md:text-base xl:text-lg";

function BandCtas() {
  const bookHref = useBookingHref("closing");
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Link
        href={bookHref}
        id="cta-saas-health-closing"
        className={`${BAND_BUTTON} border-primary-wopee bg-primary-wopee text-secondary-wopee hover:bg-transparent hover:text-primary-wopee`}
      >
        Send me your URL
      </Link>
      <Link
        href={LINKEDIN}
        className={`${BAND_BUTTON} border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white`}
      >
        Message me on LinkedIn
      </Link>
    </div>
  );
}

export default function SaasAppHealthPage() {
  return (
    <Layout
      title="28 SaaS sign-ups, tested as strangers"
      description="We signed up for 28 SaaS products as strangers. 24 had a defect in sign-up. Eight patterns, a checklist for this week, and how a 6-week pilot works."
    >
      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-solid border-secondary-wopee/40 bg-secondary-wopee/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-wopee dark:border-primary-wopee/40 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-primary-wopee"
            />
            SaaS app health · October 2026
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            We signed up for 28 SaaS products as strangers.{" "}
            <span className={ACCENT}>24 had a defect in sign-up.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-semibold sm:text-2xl">
            Your sign-up works. On the second try.
          </p>
          <p
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${MUTED}`}
          >
            In October we did what your next customer does: started the free
            trials of 28 SaaS products, signed up and tried the ~10 flows that
            matter. A person re-checked the findings. One trial form failed on
            the first submit, every time. The second try worked. None of it
            threw an error. An uptime check sees a green page.
          </p>
          <div className="mt-8">
            <Ctas cta="hero" />
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            A 30-minute call with me. I'll tell you which of the eight patterns
            I'd check first on your product. No deck.
          </p>
        </header>

        <figure className={`${CARD} mx-auto mt-12 max-w-3xl px-6 py-6 sm:px-8`}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <img
              src={require("@site/static/img/team/marcel.jpg").default}
              alt="Marcel Veselka, founder of Wopee.io"
              width={72}
              height={72}
              className="hidden h-[72px] w-[72px] shrink-0 rounded-full object-cover sm:block"
            />
            <blockquote className="m-0 border-0 p-0">
              <p className="text-base leading-relaxed">
                I'm not writing this from above. I run a small SaaS too, and
                I've spent 20+ years in testing. For weeks our own sign-up chart
                showed zero while people were signing up. The sign-up worked.
                The tracking event behind it didn't. Nobody broke it. Nobody
                owned it.
              </p>
              <p className="mt-3 text-lg font-bold">
                Not careless teams. Unowned flows.
              </p>
              <figcaption className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <img
                  src={require("@site/static/img/team/marcel.jpg").default}
                  alt="Marcel Veselka"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover sm:hidden"
                />
                Marcel Veselka, founder of Wopee.io
              </figcaption>
            </blockquote>
          </div>
        </figure>

        <Section
          id="numbers"
          eyebrow="The numbers"
          title="Six numbers from 28 products"
          intro="On each product, an AI agent read the website, signed up for the free trial, logged in and tried the ~10 flows that matter most. We re-checked the findings by hand and threw out anything we couldn't reproduce or that was our mistake."
        >
          <ul className="grid list-none gap-4 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_NUMBERS.map((n, i) => (
              <li
                key={n.value}
                className={`${CARD} flex flex-col px-5 py-5 ${
                  i === 0
                    ? "!border-secondary-wopee/50 !bg-secondary-wopee/[0.06] dark:!border-primary-wopee/40 dark:!bg-primary-wopee/[0.06]"
                    : ""
                }`}
              >
                <span
                  className={`block text-3xl font-extrabold tracking-tight ${ACCENT}`}
                >
                  {n.value}
                </span>
                <span className={`mt-2 block text-sm leading-relaxed ${MUTED}`}>
                  {n.label}
                </span>
                <div className="mt-auto pt-5 lg:min-h-[7.5rem]">
                  <NumberViz viz={n.viz} />
                </div>
              </li>
            ))}
          </ul>
          <ul
            className={`mt-6 flex list-none flex-wrap gap-x-5 gap-y-1 pl-0 text-sm ${MUTED}`}
          >
            {FACTS.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-gray-400"
                />
                {f}
              </li>
            ))}
          </ul>
          <figure className={`${CARD} m-0 mt-6 px-5 py-5 sm:px-6`}>
            <figcaption className="mb-3 font-bold">
              The 363 valid findings by severity
            </figcaption>
            <StackBar segments={SEVERITY} />
            <p className={`m-0 mt-4 max-w-3xl text-sm ${MUTED}`}>
              Most are small. That's the point: small things pile up where
              nobody is looking.
            </p>
          </figure>
        </Section>

        <Section
          id="patterns"
          eyebrow="Eight patterns"
          title="What kept coming back"
          intro="Recurring patterns, anonymised across products: never one product's exact text, amount or screen."
        >
          <PatternChart />
          <ol className="grid list-none gap-4 pl-0 md:grid-cols-2">
            {PATTERNS.map((p, i) => (
              <li
                key={p.title}
                id={`pattern-${i + 1}`}
                className={`${CARD} flex scroll-mt-24 flex-col px-5 py-5`}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                  <span
                    className={`text-sm font-extrabold tabular-nums ${ACCENT}`}
                  >
                    #{i + 1}
                  </span>
                  <h3 className="m-0 text-lg font-bold leading-snug">
                    {p.title}
                  </h3>
                  <span className="col-start-2 justify-self-start rounded-md bg-secondary-wopee px-2 py-0.5 sm:col-start-auto text-xs font-bold tabular-nums text-white dark:bg-primary-wopee dark:text-gray-900">
                    {p.products}/28
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {p.seen}
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${MUTED}`}>
                  {p.saw}
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    The blind spot:{" "}
                  </span>
                  {p.blind}
                </p>
              </li>
            ))}
          </ol>
          <p className={`mt-6 max-w-3xl ${MUTED}`}>
            And the small stuff that adds up: 25 of 28 had a language leftover
            or a typo. None of these will lose you a customer on its own.
            Together they tell a prospect how carefully the rest was built.
          </p>
        </Section>

        <section className="mt-12 rounded-2xl bg-gradient-to-br from-secondary-wopee to-[#451f6b] px-6 py-10 text-center text-white sm:mt-14">
          <p className="m-0 text-2xl font-bold leading-snug sm:text-3xl">
            If nobody signs up as a stranger,{" "}
            <span className="text-primary-wopee">
              a stranger finds your bugs first.
            </span>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Want to know which pattern to check first on yours?{" "}
            <a
              href="#send-your-url"
              className="font-semibold text-primary-wopee underline hover:text-white"
            >
              Send me your URL
            </a>
            .
          </p>
        </section>

        <Section
          id="checklist"
          eyebrow="Free, without us"
          title="What you can do this week"
          intro="Each item takes under an hour. Do 1, 2 and 3 before every release and you're ahead of most of the 28 products we tested."
        >
          <h3 className="text-lg font-bold">
            1. Write down your 10 critical flows
          </h3>
          <p className={`mt-1 text-sm ${MUTED}`}>
            The ones that would hurt if they broke silently. A starter list:
          </p>
          <div className={`${CARD} mt-4 overflow-x-auto`}>
            <table className="m-0 table w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="w-10 border-0 bg-transparent px-4 py-3 font-semibold">
                    #
                  </th>
                  <th className="border-0 bg-transparent px-4 py-3 font-semibold">
                    Flow
                  </th>
                  <th className="hidden border-0 bg-transparent px-4 py-3 font-semibold sm:table-cell">
                    Done when
                  </th>
                </tr>
              </thead>
              <tbody>
                {FLOWS.map((f, i) => (
                  <tr
                    key={f.flow}
                    className="border-0 border-t border-solid border-gray-200 bg-transparent dark:border-white/10"
                  >
                    <td
                      className={`border-0 px-4 py-3 font-bold tabular-nums ${ACCENT}`}
                    >
                      {i + 1}
                    </td>
                    <td className="border-0 px-4 py-3 font-medium">
                      {f.flow}
                      <span
                        className={`mt-1 block text-sm font-normal sm:hidden ${MUTED}`}
                      >
                        Done when: {f.done}
                      </span>
                    </td>
                    <td
                      className={`hidden border-0 px-4 py-3 sm:table-cell ${MUTED}`}
                    >
                      {f.done}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-lg font-bold">
            2 to 10. The one-hour checks
          </h3>
          <ol className="mt-4 grid list-none gap-3 pl-0 md:grid-cols-2">
            {CHECKS.map((c, i) => (
              <li
                key={c.title}
                className={`${CARD} flex min-w-0 gap-4 px-5 py-4`}
              >
                <span
                  className={`text-lg font-extrabold tabular-nums ${ACCENT}`}
                >
                  {i + 2}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{c.title}</span>
                  <span
                    className={`mt-1 block break-words text-sm leading-relaxed ${MUTED}`}
                  >
                    {c.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="how-it-works"
          eyebrow="If you'd rather hand it off"
          title="How a 6-week pilot works"
          intro={
            <>
              <strong className="text-gray-900 dark:text-white">
                Your ~10 critical flows, run from your CI or with one click.
              </strong>{" "}
              A 6-week pilot for SaaS teams with no QA yet. Wopee.io runs an AI
              agent that uses your web app like a real user. It reads the
              screen, not your code, so a renamed button doesn't break the test.
            </>
          }
        >
          <ol className="m-0 grid list-none gap-4 pl-0 md:grid-cols-2">
            {PILOT_STEPS.map((step, i) => (
              <PilotStepCard key={step.title} step={step} index={i} />
            ))}
          </ol>

          <h3 className="mt-10 text-lg font-bold">Honest limits</h3>
          <ul className="mt-4 grid list-none gap-3 pl-0 md:grid-cols-2">
            {LIMITS.map((l) => (
              <LeadCard key={l.lead} lead={l.lead} detail={l.detail} />
            ))}
          </ul>
        </Section>

        <Section
          id="what-we-got-wrong"
          eyebrow="What we got wrong"
          title="Our own mistakes, with the numbers"
          intro="I run a small SaaS too. We shipped 262 releases in six weeks. I know the “we'll test it properly after this release” feeling from the inside. Here's what went wrong during these 28 runs."
        >
          <ul className="grid list-none gap-3 pl-0 md:grid-cols-2">
            {WRONG.map((w) => (
              <LeadCard key={w.lead} lead={w.lead} detail={w.detail} />
            ))}
          </ul>
          <p className={`mt-6 max-w-3xl ${MUTED}`}>
            What went right: from starting on a new product to its first filed
            findings with screenshots took a median of 1 hour 41 minutes (13
            products timed). 21 products got their first findings in one
            evening, with agents working in parallel and one person supervising.
          </p>
        </Section>

        <section
          id="send-your-url"
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
            Start here: send me your URL
          </h2>
          <div className="mx-auto mt-6 max-w-2xl">
            <FlowRow
              inverted
              label="Your URL, then the flows we'd check first, then a 30-minute call if it fits"
              nodes={[
                "Your URL",
                "The flows we'd check first",
                "30-min call, if it fits",
              ]}
            />
          </div>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
            Book 30 minutes or message me on LinkedIn. I'll tell you which of
            the eight patterns I'd check first on your product, and whether a
            pilot makes sense for you. No deck. Nothing from the check is ever
            posted.
          </p>
          <div className="mt-8">
            <BandCtas />
          </div>
        </section>

        <Section
          id="method"
          eyebrow="Method and caveats"
          title="How we counted"
        >
          <ul
            className={`list-disc space-y-2 pl-5 text-sm leading-relaxed ${MUTED}`}
          >
            <li>
              28 products from the top of a scored list of Czech and Slovak
              software companies, tested between 14 and 17 October 2026. Not a
              random sample of SaaS. Almost all are bilingual, which inflates
              the mixed-language numbers.
            </li>
            <li>
              Free or trial plans and public pages only, as any new user would.
              No paid tiers, real customer data, load tests or security probing
              beyond what a normal sign-up shows.
            </li>
            <li>
              Findings re-checked by a person on 16 and 17 October (341 of the
              363 valid ones carry a re-check note). Of 381 filed, 15 were
              closed as our mistake and 3 as apparently fixed by the vendor,
              which leaves 363 valid. All counts come from one export taken on
              19 October 2026.
            </li>
            <li>
              Severity and categories are ours. No vendor had confirmed any
              finding by 19 October. Consent findings describe network behaviour
              only and aren't a legal opinion.
            </li>
            <li>
              We don't publish product names, screenshots of tested apps, quoted
              error texts, exact amounts or details that would identify a
              product. If you think you recognise yours, you probably recognise
              a pattern that 10 other products share.
            </li>
          </ul>
        </Section>
      </main>
    </Layout>
  );
}
