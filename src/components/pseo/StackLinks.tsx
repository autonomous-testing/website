import React from "react";
import Link from "@docusaurus/Link";
import pseoData from "@site/data/pseo-pages.json";

type Page = { slug: string; subject: string; category: string };

const GROUPS: { key: string; label: string }[] = [
  { key: "framework", label: "By framework" },
  { key: "industry", label: "By industry" },
  { key: "use-case", label: "By testing job" },
];

/**
 * Link strip to the /ai-testing/ guides.
 *
 * The guides were reachable only from a single card on the hub, and the hub
 * only from the footer, leaving them two hops from any navigation surface.
 * Grouping by category mirrors how the guides are actually organised, so the
 * strip reads as a small index rather than a list of keywords.
 */
export default function StackLinks({
  heading = "AI testing for your stack",
  intro = "Guides for the framework you build on, the industry you ship into, and the testing job in front of you.",
}: {
  heading?: string;
  intro?: string;
}) {
  const pages = ((pseoData as { pages: Page[] }).pages || []).filter((p) =>
    GROUPS.some((g) => g.key === p.category),
  );
  if (pages.length === 0) return null;

  return (
    <section className="container my-12 px-5 lg:my-16 lg:px-10">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-8 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="m-0 text-2xl font-bold text-gray-950 sm:text-3xl dark:text-white">
            {heading}
          </h2>
          <Link
            href="/ai-testing/"
            className="font-semibold text-secondary-wopee hover:no-underline dark:text-primary-wopee"
          >
            All guides &rarr;
          </Link>
        </div>
        <p className="mt-2 mb-7 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          {intro}
        </p>

        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((group) => {
            const items = pages.filter((p) => p.category === group.key);
            if (items.length === 0) return null;
            return (
              <div key={group.key}>
                <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {group.label}
                </p>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {items.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/${p.slug}/`}
                        className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-secondary-wopee hover:bg-white hover:text-secondary-wopee hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-primary-wopee dark:hover:bg-white/[0.08] dark:hover:text-primary-wopee dark:focus-visible:outline-primary-wopee"
                      >
                        {p.subject}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
