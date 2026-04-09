import React from "react";

import PlanComparison from "./PlanComparison";
import PlanCard, { PlanCards } from "./PlanCard";
import Link from "@docusaurus/Link";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";
import GradientCard from "@/components/ui/GradientCard";

const trustLogos = [
  "Multitude",
  "Generali",
  "SYNOT",
  "Inventi",
  "Tesena",
  "Nice Project",
  "Flashscore",
  "Accenture",
];

const integrations = [
  "Playwright",
  "Cypress",
  "Robot Framework",
  "WebdriverIO",
  "GitHub Actions",
  "GitLab CI",
  "CircleCI",
  "Jenkins",
];

const heroBenefits = [
  "Zero scripts to maintain",
  "Set up in minutes",
  "Self-healing test suites",
  "85% less test maintenance",
];

const competitors = [
  {
    feature: "Setup time",
    wopee: "60 seconds",
    others: "Days to weeks",
  },
  {
    feature: "Test scripts to write",
    wopee: "Zero — AI generates them",
    others: "Hundreds, manually",
  },
  {
    feature: "Maintenance overhead",
    wopee: "Self-healing",
    others: "Constant babysitting",
  },
  {
    feature: "Flaky test rate",
    wopee: "< 1%",
    others: "10–30%",
  },
  {
    feature: "On-prem option",
    wopee: "Yes",
    others: "Rarely",
  },
];

const testimonials = [
  {
    quote:
      "Wopee.io saves us serious time keeping our app's visual integrity intact across 60+ web and mobile properties.",
    author: "Martin Šimon",
    role: "Test Automation Lead",
    company: "Livesport",
    avatar: "/img/customers/avatars/martin-livesport.webp",
    metric: "60+ apps covered",
  },
  {
    quote:
      "Autonomous testing has been extremely valuable for keeping our marketing and customer account pages bug-free.",
    author: "Juraj Žabka",
    role: "Engineering Lead",
    company: "Multitude",
    avatar: "/img/customers/avatars/juraj-multitude.jpeg",
    metric: "400k+ customers",
  },
  {
    quote:
      "Before Wopee.io's visual testing, some of our scenarios simply weren't testable. Now they are.",
    author: "Jakub Miakyš",
    role: "QA Automation Lead",
    company: "SYNOT TECH",
    avatar: "/img/customers/avatars/jakub-synot.webp",
    metric: "New coverage unlocked",
  },
];

const enterpriseFeatures = [
  "Unlimited everything",
  "On-premise deployment",
  "SSO, RBAC & audit logs",
  "Dedicated CSM & SLA",
  "Custom integrations",
  "Security review & DPA",
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need a credit card to start?",
    a: "No. You can start using Wopee.io completely free — no credit card, no commitment. Upgrade only when you're ready.",
  },
  {
    q: "What counts as a 'test step'?",
    a: "A test step is a single interaction the AI agent performs — clicking a button, filling a field, asserting a result. A typical autonomous test consumes around 15 steps; a visual check around 3.",
  },
  {
    q: "What happens when I hit my limit?",
    a: "Step allowances apply per 5-hour session window and reset automatically. You'll see a clear in-app indicator before you run out, and you can upgrade in one click without losing the current session.",
  },
  {
    q: "Can I change or cancel plans anytime?",
    a: "Yes. Plan changes take effect immediately and don't reset your current session usage. You can downgrade or cancel at any time from the billing page.",
  },
  {
    q: "Do you offer discounts for startups, students, or open source?",
    a: "Yes — early-stage startups, students, and OSS maintainers can apply for a discounted plan. Just talk to our founders.",
  },
  {
    q: "Is my data and source code safe?",
    a: "Yes. We never train models on your code or test data. Enterprise customers can run Wopee.io fully on-premise. We're happy to walk you through our security posture.",
  },
];

export default function Pricing(): JSX.Element {
  return (
    <main className="relative pt-16 mb-12 px-4">
      {/* HERO GLOW BACKDROP — full-bleed, breaks out of the container */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 -top-32 w-screen h-[800px] -z-10 pointer-events-none hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 45%, rgba(112,48,160,0.28), transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 -top-32 w-screen h-[800px] -z-10 pointer-events-none dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 45%, rgba(112,48,160,0.10), transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 -top-32 w-screen h-[800px] -z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(112,48,160,0.18) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 45%, black, transparent 80%)",
        }}
      />

      {/* HERO */}
      <header className="text-center max-w-3xl mx-auto mb-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee text-[11px] font-semibold uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-wopee dark:bg-primary-wopee animate-pulse" />
          Built for ambitious engineers
        </div>
        <h1 className="text-4xl xl:text-6xl font-extrabold leading-[1.02] tracking-tight bg-gradient-to-br from-secondary-wopee via-purple-600 to-purple-800 dark:from-primary-wopee dark:via-yellow-200 dark:to-primary-wopee bg-clip-text text-transparent pb-1">
          Replace your QA backlog with autonomous testing.
        </h1>
        <p className="mt-5 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          AI agents that find bugs before your users do. No scripts, no
          maintenance, no QA backlog. Start free in 60 seconds.
        </p>

        {/* HERO BENEFITS */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {heroBenefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
            >
              <svg
                className="w-4 h-4 flex-shrink-0 text-secondary-wopee dark:text-primary-wopee"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {benefit}
            </div>
          ))}
        </div>

      </header>

      {/* PLAN CARDS */}
      <div className="flex flex-col items-center gap-10">
        <div
          id="plans"
          className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap justify-center items-stretch gap-6 sm:gap-7 scroll-mt-24"
        >
          {PlanCards.map((props, idx) => (
            <PlanCard key={idx} {...props} />
          ))}
        </div>

        {/* Guarantee strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-secondary-wopee dark:text-primary-wopee text-lg">✓</span>
            14-day money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary-wopee dark:text-primary-wopee text-lg">✓</span>
            No credit card to start
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary-wopee dark:text-primary-wopee text-lg">✓</span>
            Cancel anytime, no questions
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary-wopee dark:text-primary-wopee text-lg">✓</span>
            SOC 2 ready
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="w-full max-w-5xl">
          <div className="text-center text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-8">
            Teams shipping faster with Wopee.io
          </div>
          <div className="flex flex-wrap items-center justify-center gap-y-4">
            {trustLogos.map((logo, idx) => (
              <React.Fragment key={logo}>
                {idx > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden sm:inline-block w-1 h-1 mx-5 rounded-full bg-gray-300 dark:bg-gray-700"
                  />
                )}
                <span className="px-3 sm:px-0 text-base font-semibold tracking-wide text-gray-500 dark:text-gray-400 transition-colors hover:text-secondary-wopee dark:hover:text-primary-wopee">
                  {logo}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ENTERPRISE STRIP */}
        <GradientCard
          padding="roomy"
          className="w-full max-w-5xl"
          innerClassName="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 relative overflow-hidden"
        >
          <img
            src="/img/subscription-plans/enterprise.png"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 w-32 h-32 object-contain opacity-50 dark:opacity-30 pointer-events-none select-none rotate-[8deg]"
          />
          <div className="flex-1 text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-secondary-wopee dark:text-primary-wopee mb-2">
              Enterprise
            </div>
            <h3 className="text-xl xl:text-2xl font-bold m-0 mb-3 leading-tight">
              For teams that need on-prem, SSO, and a dedicated partner.
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 m-0 p-0 list-none text-sm text-gray-600 dark:text-gray-300">
              {enterpriseFeatures.map((f) => (
                <li
                  key={f}
                  className="before:content-['✓'] before:mr-2 before:font-bold before:text-secondary-wopee before:dark:text-primary-wopee"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:flex-shrink-0 flex flex-col gap-2">
            <Link to="/book-demo" className="hover:no-underline">
              <ButtonGradientOutline
                className="w-full md:w-56"
                label="Talk to founders"
              />
            </Link>
            <div className="text-[11px] text-center text-gray-500 dark:text-gray-400">
              30-min call · No sales pitch
            </div>
          </div>
        </GradientCard>

        {/* INTEGRATIONS STRIP */}
        <div className="w-full max-w-5xl">
          <div className="text-center text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">
            Plays nicely with your stack
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {integrations.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 text-xs font-semibold text-gray-600 dark:text-gray-400 backdrop-blur-sm hover:border-secondary-wopee/40 dark:hover:border-primary-wopee/40 hover:text-secondary-wopee dark:hover:text-primary-wopee transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ROI strip */}
      <section className="my-20 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Return on investment
          </div>
          <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-200 bg-clip-text text-transparent m-0 pb-1">
            Cheaper than your last QA hire
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            One Premium seat replaces hundreds of hours of manual regression
            work — at a fraction of the cost.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-7 bg-gray-50/60 dark:bg-gray-900 shadow-sm shadow-purple-900/5 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
              Manual QA engineer
            </div>
            <div className="text-4xl font-extrabold text-gray-400 dark:text-gray-600 line-through tracking-tight">
              3,000 €
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-snug">
              Hire, onboard, retain. Tests still flake.
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-7 bg-gray-50/60 dark:bg-gray-900 shadow-sm shadow-purple-900/5 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
              In-house Playwright suite
            </div>
            <div className="text-4xl font-extrabold text-gray-400 dark:text-gray-600 line-through tracking-tight">
              80 hrs
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-snug">
              Engineers babysitting brittle tests.
            </div>
          </div>
          <div className="rounded-2xl border border-secondary-wopee/40 dark:border-primary-wopee/40 p-7 bg-secondary-wopee/[0.04] dark:bg-primary-wopee/[0.04] hover:-translate-y-1 transition-transform">
            <div className="text-xs uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee mb-3">
              Wopee.io Premium
            </div>
            <div className="text-4xl font-extrabold bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-300 bg-clip-text text-transparent tracking-tight">
              179 €
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-snug">
              Set up in minutes. Tests itself. Always on.
            </div>
          </div>
        </div>
      </section>

      <PlanComparison />

      {/* WHY WOPEE — competitor comparison */}
      <section className="my-20 max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Why us
          </div>
          <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-200 bg-clip-text text-transparent m-0 pb-1">
            Why teams choose Wopee.io
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            A different approach from script-based test tools and legacy QA
            SaaS.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-x-4 text-sm">
          <div />
          <div className="text-center text-lg font-extrabold tracking-tight text-secondary-wopee dark:text-primary-wopee pb-4 pt-5 bg-secondary-wopee/[0.04] dark:bg-primary-wopee/[0.04] rounded-t-2xl">
            Wopee.io
          </div>
          <div className="text-center text-lg font-extrabold tracking-tight text-gray-700 dark:text-gray-200 pb-4 pt-5">
            Other test tools
          </div>
          {competitors.map((row, idx) => {
            const isLast = idx === competitors.length - 1;
            return (
              <React.Fragment key={row.feature}>
                <div className="py-4 text-center text-gray-600 dark:text-gray-400">
                  {row.feature}
                </div>
                <div
                  className={`py-4 text-center text-secondary-wopee dark:text-primary-wopee font-medium bg-secondary-wopee/[0.04] dark:bg-primary-wopee/[0.04] ${
                    isLast ? "rounded-b-2xl" : ""
                  }`}
                >
                  {row.wopee}
                </div>
                <div className="py-4 text-center text-gray-500 dark:text-gray-500">
                  {row.others}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="my-20 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Customers
          </div>
          <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-200 bg-clip-text text-transparent m-0 pb-1">
            Loved by engineering teams
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
            Real teams, real velocity gains.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900 p-7 flex flex-col gap-4 shadow-sm shadow-purple-900/5 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1 hover:border-secondary-wopee/30 dark:hover:border-primary-wopee/30 transition-all overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-2 text-[140px] leading-none font-serif text-secondary-wopee/[0.07] dark:text-primary-wopee/[0.07] select-none pointer-events-none"
              >
                "
              </div>
              <div className="flex items-center justify-between relative">
                <div className="text-secondary-wopee dark:text-primary-wopee text-lg tracking-widest">
                  ★★★★★
                </div>
                <div className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee">
                  {t.metric}
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed m-0 flex-1 relative">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 border-t border-gray-200 dark:border-gray-800 pt-4">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
                />
                <div className="text-xs">
                  <div className="font-semibold text-gray-800 dark:text-gray-100">
                    {t.author}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="my-20 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            FAQ
          </div>
          <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-200 bg-clip-text text-transparent m-0 pb-1">
            Frequently asked
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
            Still wondering? These are the questions teams ask us most.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900 px-6 py-5 shadow-sm shadow-purple-900/5 open:shadow-lg open:shadow-purple-900/5 hover:border-secondary-wopee/30 dark:hover:border-primary-wopee/30 transition-all"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-gray-900 dark:text-gray-100">
                <span>{faq.q}</span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee text-lg flex items-center justify-center transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="my-20 max-w-4xl mx-auto relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(112,48,160,0.4), transparent 70%)",
          }}
        />
        <GradientCard
          variant="solid"
          padding="roomy"
          className="text-center relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl xl:text-5xl font-extrabold text-white m-0 mb-3 tracking-tight leading-[1.05]">
              Stop maintaining tests.
              <br />
              <span className="bg-gradient-to-br from-primary-wopee to-yellow-200 bg-clip-text text-transparent">
                Start shipping.
              </span>
            </h2>
            <p className="text-white/85 mb-7 max-w-xl mx-auto">
              Let autonomous agents catch bugs before your users do. Free to
              start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="https://cmd.wopee.io" className="hover:no-underline">
                <ButtonGradientOutline className="w-60" label="Start for free" />
              </Link>
              <Link
                to="/book-demo"
                className="text-white/90 hover:text-white underline-offset-4 hover:underline text-sm font-medium"
              >
                or book a 30-min demo →
              </Link>
            </div>
          </div>
        </GradientCard>
      </section>
    </main>
  );
}
