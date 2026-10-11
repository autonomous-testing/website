import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";

import { Badge } from "@/components/ui/badge";
import NotifyInline from "@/components/learn/NotifyInline";
import HowThisWasMade from "@/components/learn/HowThisWasMade";
import Breadcrumb from "@/components/learn/Breadcrumb";
import EpisodeTag from "@/components/learn/EpisodeTag";
import { tutorials, tutorialUrl, cardTitle } from "@/data/learn-tutorials";
import { container, h1, standaloneLink, surface } from "@/components/learn/styles";
import { cn } from "@/lib/utils";

// Route component for /learn/<slug>/ of every tutorial without its own page
// (registered by the learn-coming-soon plugin in docusaurus.config.js), so links
// in video descriptions and plans resolve before the tutorial ships.
export default function ComingSoonPage({ slug }: { slug: string }) {
  const t = tutorials.find((x) => x.slug === slug);
  if (!t) return null;
  const n = Number(t.id.slice(1));
  const first = tutorials[0];
  const showFirst = first.slug !== slug && (first.status === "live" || first.hasPage);
  const facts: [string, string | undefined][] = [
    ["Level", t.level],
    ["Time", t.duration],
    ["Before this", t.prerequisites],
    ["Lab", t.track === "neutral" ? "Vendor-neutral, free" : "Free Wopee.io account"],
  ];
  return (
    <Layout title={`${t.title}: free tutorial, coming soon`} description={t.oneLiner}>
      <PageMetadata image="/img/learn/learn-og.jpg" />
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main>
        <div className={cn(container, "pt-6 pb-16 lg:pt-12")}>
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <Breadcrumb here={`Tutorial ${n}`} />
            {t.practitioner ? <EpisodeTag n={n} /> : null}
            <h1 className={h1}>{cardTitle(t)}</h1>
            <p className="m-0 flex flex-wrap items-center gap-2 text-sm">
              <Badge variant="wopee">Coming soon</Badge>
              <span className="text-gray-700 dark:text-gray-300">Free</span>
            </p>
            <p className="m-0 max-w-[60ch] text-lg sm:text-xl text-gray-700 dark:text-gray-300">{t.oneLiner}</p>
            <NotifyInline
              id={`cta-learn-notify-${t.slug}`}
              className="max-w-xl"
              cta="Email me when it opens"
              note="One email when it opens. Unsubscribe anytime."
            />
            <dl className={cn("m-0 mt-4 grid grid-cols-1 gap-x-8 gap-y-4 rounded-2xl p-5 sm:grid-cols-2 sm:p-6", surface)}>
              {facts
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">{k}</dt>
                    <dd className="m-0 mt-1 font-semibold">{v}</dd>
                  </div>
                ))}
            </dl>
            <p className="m-0">
              {showFirst ? (
                <Link to={tutorialUrl(first)} className={standaloneLink}>
                  Start with Tutorial 1: {cardTitle(first)} →
                </Link>
              ) : (
                <Link to="/learn/" className={standaloneLink}>
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
