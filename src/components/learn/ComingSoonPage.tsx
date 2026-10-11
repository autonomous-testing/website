import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";

import NotifyInline from "@/components/learn/NotifyInline";
import HowThisWasMade from "@/components/learn/HowThisWasMade";
import { tutorials, tutorialUrl, cardTitle } from "@/data/learn-tutorials";

const linkCls =
  "font-semibold text-secondary-wopee dark:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

// Route component for /learn/<slug>/ of every tutorial without its own page
// (registered by the learn-coming-soon plugin in docusaurus.config.js), so links
// in video descriptions and plans resolve before the tutorial ships.
export default function ComingSoonPage({ slug }: { slug: string }) {
  const t = tutorials.find((x) => x.slug === slug);
  if (!t) return null;
  const first = tutorials[0];
  const showFirst = first.slug !== slug && (first.status === "live" || first.hasPage);
  return (
    <Layout title={`${t.title}: free tutorial, coming soon`} description={t.oneLiner}>
      <PageMetadata image="/img/learn/learn-og.jpg" />
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="bg-gradient-to-b from-secondary-wopee/10 to-transparent dark:from-secondary-wopee/25">
        <div className="container px-5 lg:px-10 pt-8 pb-16 lg:pt-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <nav aria-label="Breadcrumb" className="text-sm opacity-80">
              <Link to="/learn/" className={linkCls}>
                Learn
              </Link>{" "}
              / Tutorial {t.id.slice(1)}
            </nav>
            <p className="m-0 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-gray-200 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Coming soon
              </span>
              {t.duration && <span className="opacity-75">{t.duration}</span>}
              <span className="opacity-75">· Free</span>
            </p>
            <h1 className="m-0 text-4xl sm:text-5xl leading-tight">{cardTitle(t)}</h1>
            <p className="m-0 text-lg sm:text-xl opacity-85">{t.oneLiner}</p>
            <NotifyInline
              id={`cta-learn-notify-${t.slug}`}
              className="max-w-xl"
              cta="Email me when it opens"
              note="One email when it opens. Unsubscribe anytime."
            />
            <p className="m-0">
              {showFirst ? (
                <Link to={tutorialUrl(first)} className={linkCls}>
                  Start with Tutorial 1: {cardTitle(first)} →
                </Link>
              ) : (
                <Link to="/learn/" className={linkCls}>
                  See all tutorials →
                </Link>
              )}
            </p>
            <HowThisWasMade className="mt-8" />
          </div>
        </div>
      </main>
    </Layout>
  );
}
