import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ComparisonTable from "@site/src/components/compare-page/ComparisonTable";
import WhenToChoose from "@site/src/components/compare-page/WhenToChoose";
import CompareFaq, {
  CompareFaqItem,
} from "@site/src/components/compare-page/CompareFaq";
import CompareCta from "@site/src/components/compare-page/CompareCta";
import LastChecked from "@site/src/components/compare-page/LastChecked";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";

const TLDR_ROWS = [
  {
    aspect: "Focus",
    left: "Desktop, web, and mobile UI automation, built around Windows",
    right: "Autonomous testing for web apps",
  },
  {
    aspect: "Platform",
    left: "Windows-only Studio IDE; Windows agents for CI",
    right: "Browser-based SaaS; nothing to install",
  },
  {
    aspect: "Test creation",
    left: "Recorder plus C#/VB.NET code; AI in Studio is still under development, per Ranorex's own blog (January 2026)",
    right:
      "AI agents explore your app from a URL and generate user stories, test cases, and Playwright code",
  },
  {
    aspect: "Licensing",
    left: "Quote-based; subscription-only for new customers since 2025, and access ends when the subscription lapses",
    right:
      "Published: start free, then 19 to 179 € per user per month; exported tests keep running without Wopee.io",
  },
  {
    aspect: "Execution",
    left: "Runtime licenses required per additional concurrent endpoint",
    right: "Cloud runs included; on-premise for Enterprise",
  },
  {
    aspect: "Ecosystem",
    left: "Selenium WebDriver integration; no Playwright support in its documentation",
    right: "Native Playwright output, exportable at any time",
  },
];

const FAQS: CompareFaqItem[] = [
  {
    question: "How much does Ranorex Studio cost?",
    answer:
      "Ranorex does not publish prices; its licensing page offers a quote form. Third-party review sites and user reports mention figures around 2,790 USD per seat for older perpetual licenses and low-to-high four-figure euro amounts per year for subscriptions. Wopee.io publishes its pricing: start free, then 19 to 179 € per user per month.",
    render: (
      <>
        Ranorex does not publish prices; its licensing page offers a quote
        form. Third-party review sites and user reports mention figures
        around 2,790 USD per seat for older perpetual licenses and
        low-to-high four-figure euro amounts per year for subscriptions.
        Wopee.io publishes its pricing:{" "}
        <Link href="/pricing/">
          start free, then 19 to 179 € per user per month
        </Link>
        .
      </>
    ),
  },
  {
    question: "What happens to Ranorex tests if the subscription ends?",
    answer:
      "Ranorex's own licensing FAQ states that when a subscription lapses you lose access to the software immediately; project files remain but cannot run without renewing. Wopee.io works the other way: generated tests are deterministic Playwright code you can export at any time, and exported tests run as plain Playwright with no Wopee.io runtime.",
  },
  {
    question: "Does Ranorex support Playwright?",
    answer:
      "No. Ranorex integrates with Selenium WebDriver for web execution, and as of August 2026 its documentation contains no Playwright support. Playwright appears on ranorex.com only in competitive blog posts.",
  },
  {
    question: "Is Ranorex still a good choice for desktop apps?",
    answer:
      "Yes, honestly. Ranorex is actively developed (Studio 12.8.0 shipped in July 2026) and automates desktop technologies like WPF, WinForms, Qt, Delphi, and Java desktop that web-only tools cannot touch. If desktop automation on Windows is your core need, Ranorex is built for it. Wopee.io focuses on web applications.",
  },
];

const OwnershipWedge = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-yellow-400 mb-6">
          Who owns your tests when you stop paying?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Ranorex tests are C#/VB.NET projects, but they reference Ranorex's
          proprietary assemblies and need a valid license to execute, with
          runtime licenses per additional concurrent endpoint. Ranorex's own
          FAQ is clear: when a subscription lapses, access ends immediately;
          your files remain, your test runs do not.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Wopee.io generates deterministic Playwright code you can export at
          any time. Exported tests run as plain, open-source Playwright, in
          your CI, on any OS, with no Wopee.io runtime and no per-endpoint
          run licenses.
        </p>
        <ButtonPrimary
          label="Start for free"
          href={loginUrl}
          className="w-60 h-[50px]"
          id="cta-vs-ranorex-ownership"
        />
        <p className="text-sm italic mt-2">No credit card required</p>
      </div>
    </section>
  );
};

const WopeeVsRanorex = () => {
  const loginUrl = useCmdLoginUrl();
  return (
    <Layout
      title="Wopee.io vs Ranorex"
      description="Wopee.io vs Ranorex Studio: self-serve autonomous web testing with exportable Playwright code vs a quote-based, Windows-only toolchain with runtime licenses."
    >
      <div className="flex flex-col justify-center items-center gap-8 my-12 lg:mt-16 lg:mb-8 px-5 lg:px-10 container text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl leading-tight">
            Wopee.io{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              vs
            </span>{" "}
            Ranorex
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto text-left sm:text-center">
            Ranorex Studio is a veteran Windows toolchain: recorder plus
            C#/VB.NET automation for desktop, web, and mobile, licensed by
            quote with runtime licenses per execution endpoint. Wopee.io is
            web-native and autonomous: agents generate Playwright suites from
            a URL, pricing is published, and exported tests keep running even
            if you leave. Where your app lives decides this one.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <ButtonPrimary
                label="Start for free"
                href={loginUrl}
                className="w-60 h-[50px]"
                id="cta-vs-ranorex-hero"
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

      <ComparisonTable
        title="TL;DR comparison"
        subtitle="Where the two tools actually differ, from Ranorex's own public pages and documentation."
        leftLabel="Ranorex Studio"
        rows={TLDR_ROWS}
      />

      <WhenToChoose
        title="Which one fits your team?"
        stickTitle="Stick with Ranorex when"
        stickItems={[
          "You automate Windows desktop apps: WPF, WinForms, Qt, Delphi, or Java desktop",
          "One Windows toolchain must cover desktop, web, and mobile together",
          "You hold perpetual licenses from before the 2025 subscription switch",
          "Your team works in C#/VB.NET and wants code-level control",
        ]}
        switchTitle="Switch to Wopee.io when"
        switchItems={[
          "Your product is a web app and desktop coverage is dead weight",
          "You want tests that outlive the subscription, as exportable Playwright code",
          "You don't want Windows-only tooling in the loop",
          "You want AI test generation that ships today, not a roadmap item",
          "You want the price on the page and a free start, not a quote form",
        ]}
      />

      <OwnershipWedge />

      <CompareFaq
        title="Wopee.io vs Ranorex: frequently asked questions"
        faqs={FAQS}
      />

      <LastChecked note="Last checked: August 2026. Ranorex details come from ranorex.com and its official documentation; price figures are third-party and user reports, labeled as such." />

      <CompareCta
        heading="Testing a web app?"
        subheading="Start free and own the generated Playwright code."
        ctaId="cta-vs-ranorex-footer"
      />
    </Layout>
  );
};

export default WopeeVsRanorex;
