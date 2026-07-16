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
    <section className="w-full flex flex-col items-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-10">
        Wopee.io vs Manual testing
      </h2>

      <div className="max-w-5xl w-full flex flex-col gap-4">
        {/* column headers (md+) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <div className="md:col-span-3"></div>
          <div className="md:col-span-4">Manual testing</div>
          <div className="md:col-span-5">With Wopee.io agents</div>
        </div>

        {ROWS.map((row) => (
          <div
            key={row.dimension}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-stretch rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
          >
            <div className="md:col-span-3 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800">
                <Icon
                  path={row.icon}
                  size={1.1}
                  className="text-secondary-wopee dark:text-yellow-400"
                />
              </span>
              <p className="font-bold text-lg m-0">{row.dimension}</p>
            </div>

            <div className="md:col-span-4 flex items-start gap-2 rounded-xl bg-slate-100 dark:bg-white/5 p-4">
              <X
                size={18}
                className="shrink-0 mt-1 text-slate-400 dark:text-slate-500"
              />
              <p className="m-0 text-slate-600 dark:text-slate-400">
                {row.manual}
              </p>
            </div>

            <div className="md:col-span-5 flex items-start gap-3 rounded-xl border border-yellow-400/60 bg-yellow-50 dark:bg-yellow-400/10 p-4">
              <Check
                size={18}
                className="shrink-0 mt-1 text-secondary-wopee dark:text-yellow-400"
              />
              <div>
                <p className="m-0 text-3xl font-bold leading-none">
                  {row.stat}{" "}
                  <span className="text-base font-bold text-secondary-wopee dark:text-yellow-400 align-middle">
                    {row.statLabel}
                  </span>
                </p>
                <p className="m-0 mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {row.wopee}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <ButtonPrimary
          label="Start for free"
          href="/pricing/"
          className="w-60 h-[50px]"
        />
        <p className="text-sm italic">No credit card required</p>
      </div>
    </section>
  );
};

export default VersusManual;
