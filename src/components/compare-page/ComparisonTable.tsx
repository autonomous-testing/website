import React from "react";
import { X, Check } from "lucide-react";

type ComparisonRow = {
  aspect: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

type ComparisonTableProps = {
  title: string;
  subtitle?: string;
  leftLabel: string;
  rightLabel?: string;
  rows: ComparisonRow[];
};

const ComparisonTable = ({
  title,
  subtitle,
  leftLabel,
  rightLabel = "Wopee.io",
  rows,
}: ComparisonTableProps) => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-center text-slate-600 dark:text-slate-400 max-w-3xl mb-8">
          {subtitle}
        </p>
      )}

      <div className="max-w-5xl w-full flex flex-col gap-4 mt-4">
        {/* column headers (md+) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <div className="md:col-span-3"></div>
          <div className="md:col-span-4">{leftLabel}</div>
          <div className="md:col-span-5">{rightLabel}</div>
        </div>

        {rows.map((row) => (
          <div
            key={row.aspect}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-stretch rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
          >
            <div className="md:col-span-3 flex items-center">
              <p className="font-bold text-lg m-0">{row.aspect}</p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-1 rounded-xl bg-slate-100 dark:bg-white/5 p-4">
              <span className="md:hidden text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {leftLabel}
              </span>
              <div className="flex items-start gap-2">
                <X
                  size={18}
                  className="shrink-0 mt-1 text-slate-400 dark:text-slate-500"
                />
                <p className="m-0 text-slate-600 dark:text-slate-400">
                  {row.left}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-1 rounded-xl border border-yellow-400/60 bg-yellow-50 dark:bg-yellow-400/10 p-4">
              <span className="md:hidden text-xs font-semibold uppercase tracking-wide text-secondary-wopee dark:text-yellow-400">
                {rightLabel}
              </span>
              <div className="flex items-start gap-2">
                <Check
                  size={18}
                  className="shrink-0 mt-1 text-secondary-wopee dark:text-yellow-400"
                />
                <p className="m-0 text-slate-700 dark:text-slate-300">
                  {row.right}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComparisonTable;
