import React from "react";
import Icon from "@mdi/react";
import {
  mdiRocket,
  mdiCurrencyUsd,
  mdiCheckboxMultipleOutline,
  mdiRunFast,
} from "@mdi/js";
import { X, Check } from "lucide-react";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

const ROWS = [
  {
    icon: mdiRocket,
    dimension: "Test preparation",
    manual: "Requires coding and complicated setup.",
    stat: "10x",
    statLabel: "Quicker preparation",
    wopee:
      "Point the testing bot at any web app and it starts exploring immediately.",
  },
  {
    icon: mdiCurrencyUsd,
    dimension: "Test maintenance",
    manual: "Traditional test frameworks break with every UI change.",
    stat: "30 - 40%",
    statLabel: "Cheaper maintenance",
    wopee: "Tests self-heal instead of breaking.",
  },
  {
    icon: mdiCheckboxMultipleOutline,
    dimension: "Test coverage",
    manual: "Manual methods miss bugs and lead to inconsistent results.",
    stat: "5x",
    statLabel: "Higher coverage",
    wopee: "Agents autonomously crawl your application and discover user flows.",
  },
  {
    icon: mdiRunFast,
    dimension: "Test execution",
    manual: "Testers face delays due to complex tools and manual testing.",
    stat: "50 - 70%",
    statLabel: "Quicker execution",
    wopee: "Multi-browser execution, results ready in 2 minutes.",
  },
];

const VersusManual = () => {
  return (
    <section className="container px-5 py-12 sm:py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="m-0 text-center text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
          Wopee.io vs{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee">
            manual testing
          </span>
        </h2>

        <div className="mt-10 flex w-full flex-col gap-4">
          <div className="hidden grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 md:grid dark:text-slate-400">
            <div className="col-span-3">Workflow</div>
            <div className="col-span-4">Manual testing</div>
            <div className="col-span-5">With Wopee.io agents</div>
          </div>

          {ROWS.map((row) => (
            <article
              key={row.dimension}
              className="grid grid-cols-1 items-stretch gap-3 rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-4 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] md:grid-cols-12 md:gap-4 md:p-5 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center gap-3 md:col-span-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                  <Icon
                    path={row.icon}
                    size={1.1}
                    className="text-secondary-wopee dark:text-primary-wopee"
                  />
                </span>
                <h3 className="m-0 text-lg font-bold text-slate-900 dark:text-slate-100">
                  {row.dimension}
                </h3>
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-slate-100/80 p-4 md:col-span-4 dark:bg-white/[0.045]">
                <X
                  size={18}
                  className="mt-1 shrink-0 text-slate-400 dark:text-slate-500"
                />
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 md:hidden dark:text-slate-400">
                    Manual testing
                  </p>
                  <p className="m-0 leading-6 text-slate-600 dark:text-slate-300">
                    {row.manual}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-secondary-wopee/15 bg-secondary-wopee/[0.045] p-4 md:col-span-5 dark:border-primary-wopee/15 dark:bg-primary-wopee/[0.045]">
                <Check
                  size={18}
                  className="mt-1 shrink-0 text-secondary-wopee dark:text-primary-wopee"
                />
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-secondary-wopee md:hidden dark:text-primary-wopee">
                    With Wopee.io agents
                  </p>
                  <p className="m-0 text-2xl font-bold leading-none text-slate-950 dark:text-white">
                    {row.stat}{" "}
                    <span className="align-middle text-sm font-bold text-secondary-wopee sm:text-base dark:text-primary-wopee">
                      {row.statLabel}
                    </span>
                  </p>
                  <p className="mb-0 mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {row.wopee}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonPrimary
            label="Start for free"
            href={`${cmdBaseUrl}/login`}
            className="h-[50px] w-full sm:w-60"
          />
          <p className="mb-0 mt-2 text-xs italic text-slate-500 dark:text-slate-400">
            No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default VersusManual;
