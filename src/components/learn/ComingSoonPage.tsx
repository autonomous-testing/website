import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";

import NotifyInline, { NOTIFY_CTA, NOTIFY_NOTE } from "@/components/learn/NotifyInline";
import Breadcrumb from "@/components/learn/Breadcrumb";
import HeroPill from "@/components/learn/HeroPill";
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
    ["You need", t.prerequisites],
    ["Lab", t.tag ?? (t.track === "neutral" ? "Vendor-neutral, free" : "Uses a free Wopee.io account")],
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
            <HeroPill className="self-start">
              Coming soon · <strong className="font-semibold">Free</strong>
              {t.practitioner ? <> · Episode {n}</> : null}
            </HeroPill>
            <h1 className={h1}>{cardTitle(t)}</h1>
            <p className="m-0 max-w-[60ch] text-lg sm:text-xl text-gray-700 dark:text-gray-300">{t.oneLiner}</p>
            <NotifyInline
              id={`cta-learn-notify-${t.slug}`}
              className="max-w-xl"
              cta={NOTIFY_CTA}
              note={NOTIFY_NOTE}
            />
            <dl className={cn("m-0 mt-2 grid grid-cols-1 gap-x-8 gap-y-4 rounded-xl p-4 sm:grid-cols-2 sm:p-5", surface)}>
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
          </div>
        </div>
      </main>
    </Layout>
  );
}
