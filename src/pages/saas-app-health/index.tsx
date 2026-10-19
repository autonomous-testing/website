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

const KEY_NUMBERS: { value: string; label: string }[] = [
  {
    value: "24 of 28",
    label:
      "had an open defect in sign-up, registration or the trial form. 17 of them at High or Medium.",
  },
  {
    value: "10 of 28",
    label:
      "showed a price or a saving on the page that didn't match what you're charged or get.",
  },
  {
    value: "11 of 28",
    label:
      "fired ad or analytics tags before the visitor touched the cookie banner.",
  },
  {
    value: "12 of 28",
    label:
      "told a stranger, on login, sign-up or password reset, whether an e-mail address has an account.",
  },
  {
    value: "About 55%",
    label: "of valid findings are visible before the user even logs in.",
  },
  {
    value: "67 of 250",
    label:
      "core app flows were not green. 60 of them failed on a real defect in the app.",
  },
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
  seen: string;
  saw: string;
  blind: string;
}[] = [
  {
    title: "The sign-up that fails on the first try",
    seen: "24 of 28 products · 17 at High or Medium",
    saw: "Sign-up forms that fail on the first submit and work on the second. E-mailed sign-in links that never work, so the only way in is “Forgot password”.",
    blind:
      "The last person to test sign-up is usually the person who built it, on their own logged-in machine.",
  },
  {
    title: "The price on the page is not the price you pay",
    seen: "10 of 28 products · 19 of 28 with a pricing or number defect",
    saw: "Two different products advertised “save 20%” on yearly billing. On both, the real saving was 16.7%.",
    blind:
      "Pricing lives in three places: the marketing site, the billing provider and the app. Nobody compares them after a price change.",
  },
  {
    title: "The trial that greets you with a bill",
    seen: "21 findings · 13 products",
    saw: "Free trials that asked for payment on day one, or blocked the account with a billing message that didn't apply to a trial.",
    blind:
      "Teams test onboarding with their own account, which has data, a paid plan and history. Nobody sees a fresh, empty trial.",
  },
  {
    title: "Errors that vanish, failures that stay silent",
    seen: "22 findings · 14 products",
    saw: "Wrong-password messages that disappear after a few seconds. Correct sign-ins that end on a dead page with no message.",
    blind:
      "Error paths get clicked least, so they get tested least. Nothing throws an error, so an error tracker has nothing to catch.",
  },
  {
    title: "Numbers on the dashboard that can't be true",
    seen: "23 findings · 14 products",
    saw: "Percentages computed on zero in empty trial accounts. Year-on-year tiles comparing part of this year with all of last year.",
    blind:
      "Reports get tested with realistic demo data. A new trial user sees empty data first.",
  },
  {
    title: "The banner asks. The tags already fired.",
    seen: "11 of 28 products · 18 findings, 13 of them High",
    saw: "Ad and analytics tags fired before the visitor touched the cookie banner, in some cases even after “Reject all”.",
    blind:
      "Marketing adds a tag through a tag manager. Nobody re-checks the network tab after the next campaign. (Observed network behaviour, not a legal opinion.)",
  },
  {
    title: "Your login screen answers strangers",
    seen: "21 findings · 15 products · 12 of 28 reveal who has an account",
    saw: "Login, sign-up or reset screens that confirm whether an e-mail has an account. Passwords e-mailed in plain text. No e-mail verification.",
    blind:
      "Each screen was written to be helpful. Nobody looked at all three together from an attacker's point of view.",
  },
  {
    title: "The most valuable button goes nowhere",
    seen: "33 findings · 19 products",
    saw: "The button that books a call or starts a trial, on a page or at the end of a tour, opened a 404.",
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

const WEEKS: { when: string; what: string; detail: string }[] = [
  {
    when: "Week 1",
    what: "Pick your flows, get the first findings",
    detail:
      "You send a URL and a test account. Together we pick your ~10 critical flows, usually the list above adjusted to your product. We write the tests in plain English, and you get the first findings with evidence.",
  },
  {
    when: "Weeks 2 to 6",
    what: "Before every release",
    detail:
      "The flows run before every release, triggered from your pipeline or on request. Where it makes sense (sign-up, login, checkout) they also run on a schedule, so you hear about a break before a customer does.",
  },
  {
    when: "At the end",
    what: "A short report",
    detail:
      "What we found, what your team fixed and what's still open. Then you decide whether to keep going.",
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
      "On the 18 products where all 10 flows ran, 101 of 180 passed. After we fixed our own test wording and test data, 123 of 180 (68%). All 22 extra passes came from fixing our side.",
  },
  {
    lead: "15 of 381 findings were our mistake",
    detail:
      "We misread a setting, or couldn't reproduce it. We closed them ourselves. That's 4% noise, and it's why a person reviews every finding.",
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
            matter. A person re-checked every finding. One trial form failed on
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
                I've spent 15+ years in testing. For weeks our own sign-up chart
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
          intro="On each product, an AI agent read the website, signed up for the free trial, logged in and tried the ~10 flows that matter most. We re-checked every finding and threw out anything we couldn't reproduce or that was our mistake."
        >
          <ul className="grid list-none gap-4 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_NUMBERS.map((n, i) => (
              <li
                key={n.value}
                className={`${CARD} px-5 py-5 ${
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
          <p className={`mt-6 max-w-3xl ${MUTED}`}>
            Of the 363 valid findings, 37 are High, 124 Medium and 202 Low. Most
            are small. That's the point: small things pile up where nobody is
            looking.
          </p>
        </Section>

        <Section
          id="patterns"
          eyebrow="Eight patterns"
          title="What kept coming back"
          intro="Recurring patterns, anonymised across products: never one product's exact text, amount or screen."
        >
          <ol className="grid list-none gap-4 pl-0 md:grid-cols-2">
            {PATTERNS.map((p, i) => (
              <li key={p.title} className={`${CARD} flex flex-col px-5 py-5`}>
                <div className="flex items-baseline gap-3">
                  <span
                    className={`text-sm font-extrabold tabular-nums ${ACCENT}`}
                  >
                    #{i + 1}
                  </span>
                  <h3 className="m-0 text-lg font-bold leading-snug">
                    {p.title}
                  </h3>
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
          intro="Wopee.io runs an AI agent that uses your web app like a real user. It reads the screen, not your code, so a renamed button doesn't break the test."
        >
          <ol className={`${CARD} m-0 list-none overflow-hidden p-0`}>
            {WEEKS.map((w, i) => (
              <li
                key={w.when}
                className={`m-0 grid gap-2 px-5 py-5 sm:grid-cols-[9rem,1fr] sm:gap-6 ${
                  i > 0
                    ? "border-0 border-t border-solid border-gray-200 dark:border-white/10"
                    : ""
                }`}
              >
                <span className="inline-flex h-fit w-fit items-center rounded-full bg-secondary-wopee/10 px-3 py-1 text-sm font-bold text-secondary-wopee dark:bg-primary-wopee/10 dark:text-primary-wopee">
                  {w.when}
                </span>
                <span>
                  <span className="block font-semibold">{w.what}</span>
                  <span
                    className={`mt-1 block text-sm leading-relaxed ${MUTED}`}
                  >
                    {w.detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className={`${CARD} px-6 py-6`}>
              <h3 className="text-lg font-bold">
                A person reviews every failure
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${MUTED}`}>
                A red test is a question: is it the app, or is it our test? We
                check the trace and the video before you see it. If the problem
                was our test, we fix our test and you never hear about it.
              </p>
            </div>
            <div className={`${CARD} px-6 py-6`}>
              <h3 className="text-lg font-bold">Defects with evidence</h3>
              <p className={`mt-2 text-sm leading-relaxed ${MUTED}`}>
                Steps, a screenshot, a video and an impact line in plain words.
                Not a dashboard to babysit. An example test: “Sign up with a new
                e-mail, open the confirmation link, check that the empty
                dashboard loads.”
              </p>
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
            What went right: from starting the sign-up to filing the first
            finding with screenshots took a median of 1 hour 41 minutes (13
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
              Every finding re-checked on 16 and 17 October. Of 381 filed, 15
              were closed as our mistake and 3 as apparently fixed by the
              vendor, which leaves 363 valid. All counts come from one export
              taken on 19 October 2026.
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
