import React from "react";
import clsx from "clsx";
import { User, Code2, Disc3, Eye, Sparkles, ArrowRight, Check } from "lucide-react";

type Comparison = { header: string[]; rows: string[][] };
type IconCmp = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

function iconFor(name: string): IconCmp {
  const n = name.toLowerCase();
  if (/wopee/.test(n)) return Sparkles;
  if (/manual/.test(n)) return User;
  if (/record|replay/.test(n)) return Disc3;
  if (/pixel|visual/.test(n)) return Eye;
  return Code2; // scripted / framework tooling / default
}

function splitTitle(name: string): [string, string | null] {
  const m = name.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  if (m) return [m[1].trim(), `(${m[2].trim()})`];
  return [name, null];
}

// A "journey" comparison: a milestone rail rising toward the glowing Wopee.io
// node, with one card per approach (Wopee.io highlighted). Replaces the plain
// comparison grid. Generic across pages — approaches are ordered manual → AI.
export default function ComparisonJourney({ comparison }: { comparison: Comparison }) {
  const rows = comparison.rows;
  const metrics = comparison.header.slice(1);
  const four = rows.length >= 4;

  const gridCols = four ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3";
  const railVis = four ? "hidden xl:grid" : "hidden lg:grid";
  const railCols = four ? "xl:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section id="approach-comparison" className="mt-16">
      <div className={four ? "xl:-mx-24" : ""}>
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          From manual effort to{" "}
          <span className="bg-gradient-to-r from-secondary-wopee via-fuchsia-500 to-primary-wopee bg-clip-text text-transparent">
            AI-assisted testing
          </span>
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">More automation. Less maintenance. Faster review.</p>

        {/* milestone rail (single-row layouts only) */}
        <div className={clsx("relative mt-10 grid-cols-1 gap-5", railVis, railCols)}>
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-6 border-t-2 border-dashed border-secondary-wopee/30 dark:border-primary-wopee/25" />
          {rows.map((row, i) => {
            const Icon = iconFor(row[0]);
            const isWopee = /wopee/i.test(row[0]);
            return (
              <div key={i} className="relative flex justify-center">
                <span
                  className={clsx(
                    "relative flex h-12 w-12 items-center justify-center rounded-full",
                    isWopee
                      ? "bg-gradient-to-br from-primary-wopee to-amber-500 text-black shadow-[0_0_30px_-4px_rgba(255,204,0,0.75)]"
                      : "border border-secondary-wopee/40 bg-white text-secondary-wopee dark:border-primary-wopee/30 dark:bg-gray-900 dark:text-primary-wopee"
                  )}
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                {isWopee && (
                  <ArrowRight
                    size={22}
                    className="absolute top-3 right-0 translate-x-7 text-primary-wopee"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* cards */}
        <div className={clsx("mt-8 grid grid-cols-1 gap-5", gridCols)}>
          {rows.map((row, i) => {
            const isWopee = /wopee/i.test(row[0]);
            const Icon = iconFor(row[0]);
            const [title, sub] = splitTitle(row[0]);
            return (
              <div
                key={i}
                className={clsx(
                  "flex h-full flex-col rounded-2xl border p-5 transition",
                  isWopee
                    ? "border-primary-wopee bg-white shadow-[0_0_45px_-12px_rgba(255,204,0,0.55)] ring-1 ring-primary-wopee/40 dark:bg-gray-900"
                    : "border-gray-200 bg-white hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60"
                )}
              >
                {/* header: icon / logo + title */}
                <div className="min-h-[7rem]">
                  {isWopee ? (
                    <>
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-secondary-wopee to-[#451f6b]">
                          <img src="/img/logo.png" alt="" className="h-5 w-5" />
                        </span>
                        <span className="text-lg font-extrabold text-gray-900 dark:text-white">Wopee.io</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="rounded-md bg-primary-wopee px-2 py-0.5 text-xs font-bold text-black">AI testing</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-wopee text-black">
                          <Check size={12} strokeWidth={3.5} />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-wopee/10 text-secondary-wopee dark:bg-primary-wopee/10 dark:text-primary-wopee">
                        <Icon size={18} />
                      </span>
                      <h3 className="m-0 mt-3 break-words text-lg font-bold leading-tight text-gray-900 dark:text-white">
                        {title}
                      </h3>
                      {sub && <p className="m-0 mt-0.5 text-sm text-gray-500 dark:text-gray-400">{sub}</p>}
                    </>
                  )}
                </div>

                {/* metrics */}
                <dl className="mt-2 flex flex-1 flex-col divide-y divide-gray-100 border-t border-gray-100 dark:divide-gray-800 dark:border-gray-800">
                  {metrics.map((m, mi) => (
                    <div key={mi} className="flex min-h-[3.25rem] flex-col justify-center py-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-secondary-wopee/80 dark:text-primary-wopee/80">
                        {m}
                      </dt>
                      <dd
                        className={clsx(
                          "m-0 mt-1 text-sm leading-snug",
                          isWopee ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                        )}
                      >
                        {row[mi + 1]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
