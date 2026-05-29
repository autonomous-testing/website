import React from "react";
import clsx from "clsx";

import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";

const APP_SIGNUP = "https://cmd.wopee.io/login";

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
  related: { slug: string; label: string }[];
};

const eyebrowFor = (c: PseoData["category"]) =>
  c === "framework" ? "AI Testing · Framework" : c === "industry" ? "AI Testing · Industry" : "AI Testing · Use case";

// Render `inline code` spans inside otherwise-plain copy so the data file can
// keep using markdown-style backticks (e.g. `css-1a2b3c`).
function RichText({ children }: { children: string }) {
  const parts = children.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em]">
            {part.slice(1, -1)}
          </code>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

function CtaButtons({ subject, inverted = false }: { subject: string; inverted?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <ButtonPrimary href={APP_SIGNUP} label="Start for free" id="pseo-cta-primary" />
      <Link
        href="/book-demo/"
        className={clsx(
          "rounded-lg border px-5 py-2.5 text-sm font-semibold transition ease-out hover:bg-white/10 md:text-base xl:text-lg",
          inverted ? "border-white/40 text-white" : "border-secondary-wopee text-secondary-wopee dark:border-white/30 dark:text-white"
        )}
      >
        Book a demo
      </Link>
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
            <CtaButtons subject={data.subject} />
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
          <ol className="mt-6 space-y-4">
            {data.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-secondary-wopee font-bold text-white dark:bg-primary-wopee dark:text-black">
                  {i + 1}
                </span>
                <span className="pt-1 text-base leading-relaxed text-gray-700 dark:text-gray-200">
                  <RichText>{step}</RichText>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Comparison */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold sm:text-3xl">{data.subject}: approach comparison</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {data.comparison.header.map((h, i) => (
                    <th
                      key={i}
                      className="border-b border-gray-300 px-3 py-2.5 text-left font-semibold dark:border-gray-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.comparison.rows.map((row, ri) => {
                  const highlight = /wopee/i.test(row[0]);
                  return (
                    <tr
                      key={ri}
                      className={clsx(
                        highlight && "bg-secondary-wopee/10 dark:bg-primary-wopee/10"
                      )}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={clsx(
                            "border-b border-gray-200 px-3 py-2.5 align-top dark:border-gray-700",
                            ci === 0 && "font-semibold",
                            highlight && ci === 0 && "text-secondary-wopee dark:text-primary-wopee"
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mid CTA band */}
        <section className="mt-16 rounded-2xl bg-gradient-to-br from-secondary-wopee to-[#451f6b] px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">{ctaHeading}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Generate your first autonomous tests in minutes — no brittle selectors, no manual baselines.
          </p>
          <div className="mt-7">
            <CtaButtons subject={data.subject} inverted />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
            {data.faqs.map((f, i) => (
              <details key={i} className="group py-4" {...(i === 0 ? { open: true } : {})}>
                <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">
                  <span className="text-secondary-wopee dark:text-primary-wopee">{f.q}</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        {data.related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold sm:text-2xl">Related</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}/`}
                  className="rounded-xl border border-gray-200 p-4 font-semibold text-secondary-wopee transition hover:border-secondary-wopee hover:shadow-sm dark:border-gray-700 dark:text-primary-wopee dark:hover:border-primary-wopee"
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
