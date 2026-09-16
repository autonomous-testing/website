import React from "react";

// Which side is genuinely stronger on this aspect. Rows without an edge render
// neutral: most aspects are trade-offs, not wins.
type Edge = "left" | "right" | "even";

type ComparisonRow = {
  aspect: string;
  left: React.ReactNode;
  right: React.ReactNode;
  edge?: Edge;
};

type ComparisonTableProps = {
  title: string;
  subtitle?: string;
  leftLabel: string;
  rightLabel?: string;
  rows: ComparisonRow[];
};

const StrongerBadge = () => (
  <span className="self-start rounded-full bg-secondary-wopee/10 px-2 py-0.5 text-xs font-semibold text-secondary-wopee dark:bg-yellow-400/15 dark:text-yellow-400">
    Stronger here
  </span>
);

const Cell = ({
  label,
  children,
  stronger,
}: {
  label: string;
  children: React.ReactNode;
  stronger: boolean;
}) => (
  <div
    className={`flex flex-col gap-2 rounded-xl p-4 ${
      stronger
        ? "border border-solid border-secondary-wopee/40 bg-white dark:border-yellow-400/40 dark:bg-white/10"
        : "bg-slate-100 dark:bg-white/5"
    }`}
  >
    <span className="md:hidden text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
      {label}
    </span>
    {stronger && <StrongerBadge />}
    <p className="m-0 text-slate-700 dark:text-slate-300">{children}</p>
  </div>
);

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
        <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,2fr)] gap-4 px-4 text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          <div></div>
          <div>{leftLabel}</div>
          <div>{rightLabel}</div>
        </div>

        {rows.map((row) => (
          <div
            key={row.aspect}
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,2fr)] gap-3 md:gap-4 items-stretch rounded-2xl border border-solid border-slate-200 dark:border-slate-800 p-4"
          >
            <div className="flex items-center">
              <p className="font-bold text-lg m-0">{row.aspect}</p>
            </div>
            <Cell label={leftLabel} stronger={row.edge === "left"}>
              {row.left}
            </Cell>
            <Cell label={rightLabel} stronger={row.edge === "right"}>
              {row.right}
            </Cell>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComparisonTable;
