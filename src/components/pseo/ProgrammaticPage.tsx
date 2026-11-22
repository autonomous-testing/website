import React from "react";

import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import PseoFaq from "@site/src/components/pseo/PseoFaq";
import PseoCard from "@site/src/components/pseo/PseoCard";
import ComparisonJourney from "@site/src/components/pseo/ComparisonJourney";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";
import AnswerFirst from "@site/src/components/ui/AnswerFirst";

type Category = "framework" | "industry" | "use-case" | "visual-stack";

export type PseoData = {
  slug: string;
  category: Category;
  subject: string;
  // visual-stack pages: the test tool the visual checks are added to, and an example test.
  tool?: string;
  code?: { language: string; title: string; snippet: string };
  keyword: string;
  title: string;
  description: string;
  aioOpener: string;
  shortAnswer?: { q: string; a: string; lastChecked: string };
  problem: string;
  solution: string;
  steps: string[];
  comparison: { header: string[]; rows: string[][] };
  faqs: { q: string; a: string }[];
  related: { slug: string; label: string; category: Category; description: string }[];
  // framework pages: the visual-stack pages for that framework.
  toolGuides?: { slug: string; label: string }[];
};

const EYEBROW: Record<Category, string> = {
  framework: "AI Testing · Framework",
  industry: "AI Testing · Industry",
  "use-case": "AI Testing · Use case",
  "visual-stack": "Visual Testing · Stack",
};

function headings(data: PseoData) {
  const s = data.subject;
  if (data.category === "visual-stack") {
    return {
      h1: `Visual Testing for ${s} with ${data.tool}`,
      pain: `Why visual testing ${s} with ${data.tool} is hard`,
      solution: `How Wopee.io adds visual checks to ${data.tool}`,
      cta: `Add visual checks to your ${data.tool} tests`,
    };
  }
  if (data.category === "use-case") {
    const lower = s.charAt(0).toLowerCase() + s.slice(1);
    return {
      h1: `AI ${s}`,
      pain: `Why ${lower} is hard`,
      solution: `How Wopee.io approaches ${lower}`,
      cta: `Start ${lower} with Wopee.io`,
    };
  }
  return {
    h1: `AI Testing for ${s}`,
    pain: `Why testing ${s} is hard`,
    solution: `How Wopee.io tests ${s}`,
    cta: `Start testing ${s} with AI`,
  };
}

// Render `inline code` and [markdown](/links) inside otherwise-plain copy, so the
// data file can use backticks (e.g. `css-1a2b3c`) and in-body cross-links.
function RichText({ children }: { children: string }) {
  const parts = children.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em]">
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <Link
              key={i}
              to={link[2]}
              className="font-medium text-secondary-wopee underline-offset-2 hover:underline dark:text-primary-wopee"
            >
              {link[1]}
            </Link>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

function CtaButtons() {
  const loginUrl = useCmdLoginUrl();
  return (
    <div className="flex justify-center">
      <ButtonPrimary href={loginUrl} label="Start for free" id="pseo-cta-primary" />
    </div>
  );
}

export default function ProgrammaticPage({ data }: { data: PseoData }) {
  const { h1, pain: painHeading, solution: solutionHeading, cta: ctaHeading } = headings(data);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Layout title={data.title} description={data.description}>
      <Head>
        <meta name="keywords" content={data.keyword} />
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>

      <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Hero */}
        <header className="text-center">
          <span className="inline-block rounded-full border border-secondary-wopee/40 bg-secondary-wopee/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-wopee dark:border-primary-wopee/40 dark:bg-primary-wopee/10 dark:text-primary-wopee">
            {EYEBROW[data.category]}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{h1}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            <RichText>{data.aioOpener}</RichText>
          </p>
          <div className="mt-8">
            <CtaButtons />
          </div>
        </header>

        {data.shortAnswer && (
          <AnswerFirst
            question={data.shortAnswer.q}
            lastChecked={data.shortAnswer.lastChecked}
            className="mt-12 !px-0"
          >
            <RichText>{data.shortAnswer.a}</RichText>
          </AnswerFirst>
        )}

        {/* Problem */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold sm:text-3xl">{painHeading}</h2>
          <p className="mt-4 border-l-2 border-secondary-wopee/60 pl-4 text-base leading-relaxed text-gray-600 dark:border-primary-wopee/60 dark:text-gray-300 sm:text-lg">
            <RichText>{data.problem}</RichText>
          </p>
        </section>

        {/* Solution */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold sm:text-3xl">{solutionHeading}</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            <RichText>{data.solution}</RichText>
          </p>
          {data.toolGuides && data.toolGuides.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Visual testing with your test tool:
              </span>
              {data.toolGuides.map((g) => (
                <Link
                  key={g.slug}
                  to={`/${g.slug}/`}
                  className="inline-flex rounded-lg border border-solid border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-secondary-wopee hover:text-secondary-wopee hover:no-underline dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200 dark:hover:border-primary-wopee dark:hover:text-primary-wopee"
                >
                  {g.label}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Steps */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold sm:text-3xl">How to get started</h2>
          <ol className="mt-8 space-y-0">
            {data.steps.map((step, i) => (
              <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                {i < data.steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-5 top-12 w-px -translate-x-1/2 bg-gradient-to-b from-secondary-wopee/50 to-secondary-wopee/0 dark:from-primary-wopee/50 dark:to-primary-wopee/0"
                  />
                )}
                <span className="z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-secondary-wopee text-base font-bold text-white shadow-sm dark:bg-primary-wopee dark:text-black">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50/60 p-4 [overflow-wrap:anywhere] text-base leading-relaxed text-gray-700 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200">
                  <RichText>{step}</RichText>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Example test (visual-stack pages) */}
        {data.code && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold sm:text-3xl">Example: a {data.tool} test with visual checks</h2>
            <div className="mt-6 text-sm">
              <CodeBlock language={data.code.language} title={data.code.title}>
                {data.code.snippet}
              </CodeBlock>
            </div>
          </section>
        )}

        {/* Comparison */}
        <ComparisonJourney comparison={data.comparison} />

        {/* Mid CTA band */}
        <section className="mt-16 rounded-2xl bg-gradient-to-br from-secondary-wopee to-[#451f6b] px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">{ctaHeading}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            {data.category === "visual-stack"
              ? "Keep your tests, add a few track calls, and review every visual change in one place."
              : "Generate your first autonomous tests in minutes, no brittle selectors, no manual baselines."}
          </p>
          <div className="mt-7">
            <CtaButtons />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6">
            <PseoFaq faqs={data.faqs} />
          </div>
        </section>

        {/* Related */}
        {data.related.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="m-0 text-2xl font-bold sm:text-3xl">Related</h2>
              <Link
                href="/ai-testing/"
                className="font-semibold text-secondary-wopee hover:no-underline dark:text-primary-wopee"
              >
                All AI testing guides &rarr;
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {data.related.map((r) => (
                <PseoCard
                  key={r.slug}
                  href={`/${r.slug}/`}
                  category={r.category}
                  title={r.label}
                  description={r.description}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
