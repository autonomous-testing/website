import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";

import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import PseoFaq from "@site/src/components/pseo/PseoFaq";
import PseoCard from "@site/src/components/pseo/PseoCard";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";

export type PseoData = {
  slug: string;
  category: "framework" | "industry" | "use-case";
  subject: string;
  keyword: string;
  title: string;
  description: string;
  aioOpener: string;
  problem: string;
  solution: string;
  steps: string[];
  comparison: { header: string[]; rows: string[][] };
  faqs: { q: string; a: string }[];
  related: { slug: string; label: string; category: "framework" | "industry" | "use-case"; description: string }[];
};

const eyebrowFor = (c: PseoData["category"]) =>
  c === "framework" ? "AI Testing · Framework" : c === "industry" ? "AI Testing · Industry" : "AI Testing · Use case";

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
  const isUseCase = data.category === "use-case";
  const subjLower = data.subject.charAt(0).toLowerCase() + data.subject.slice(1);
  const h1 = isUseCase ? `AI ${data.subject}` : `AI Testing for ${data.subject}`;
  const painHeading = isUseCase ? `Why ${subjLower} is hard` : `Why testing ${data.subject} is hard`;
  const solutionHeading = isUseCase ? `How Wopee.io approaches ${subjLower}` : `How Wopee.io tests ${data.subject}`;
  const ctaHeading = isUseCase ? `Start ${subjLower} with Wopee.io` : `Start testing ${data.subject} with AI`;

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
            {eyebrowFor(data.category)}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{h1}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            <RichText>{data.aioOpener}</RichText>
          </p>
          <div className="mt-8">
            <CtaButtons />
          </div>
        </header>

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
                <div className="flex-1 rounded-xl border border-gray-200 bg-gray-50/60 p-4 text-base leading-relaxed text-gray-700 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200">
                  <RichText>{step}</RichText>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Comparison */}
        <section id="approach-comparison" className="mt-16">
          <h2 className="text-2xl font-bold sm:text-3xl">{data.subject}: approach comparison</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">How the common ways to test {data.subject} stack up.</p>
          <div
            className={clsx(
              "mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2",
              data.comparison.rows.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            )}
          >
            {data.comparison.rows.map((row, ri) => {
              const isWopee = /wopee/i.test(row[0]);
              return (
                <div
                  key={ri}
                  className={clsx(
                    "flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition dark:bg-gray-900",
                    isWopee
                      ? "border-secondary-wopee shadow-xl ring-2 ring-secondary-wopee/40 dark:border-primary-wopee dark:ring-primary-wopee/40 lg:-translate-y-1"
                      : "border-gray-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800"
                  )}
                >
                  <div
                    className={clsx(
                      "flex items-center gap-2.5 px-5 py-4",
                      isWopee
                        ? "bg-gradient-to-br from-secondary-wopee to-[#451f6b] text-white"
                        : "bg-gray-50 text-gray-900 dark:bg-white/5 dark:text-white"
                    )}
                  >
                    {isWopee ? (
                      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white text-secondary-wopee">
                        <Check size={15} strokeWidth={3.5} />
                      </span>
                    ) : (
                      <span className="h-2 w-2 flex-none rounded-full bg-gray-300 dark:bg-gray-600" />
                    )}
                    <h3 className="m-0 text-[15px] font-bold leading-tight">{row[0]}</h3>
                  </div>
                  <dl
                    className={clsx(
                      "flex flex-1 flex-col divide-y divide-gray-100 px-5 dark:divide-gray-800",
                      isWopee && "bg-secondary-wopee/[0.04] dark:bg-primary-wopee/[0.04]"
                    )}
                  >
                    {data.comparison.header.slice(1).map((h, hi) => (
                      <div key={hi} className="flex min-h-[3.25rem] flex-col justify-center py-3">
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</dt>
                        <dd
                          className={clsx(
                            "m-0 mt-1 text-sm leading-snug",
                            isWopee ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                          )}
                        >
                          {row[hi + 1]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mid CTA band */}
        <section className="mt-16 rounded-2xl bg-gradient-to-br from-secondary-wopee to-[#451f6b] px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">{ctaHeading}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Generate your first autonomous tests in minutes — no brittle selectors, no manual baselines.
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
            <h2 className="text-2xl font-bold sm:text-3xl">Related</h2>
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
