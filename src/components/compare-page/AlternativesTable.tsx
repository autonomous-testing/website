import React from "react";

export type Alternative = {
  name: string;
  href: string;
  what: React.ReactNode;
  pricing: React.ReactNode;
  pickWhen: React.ReactNode;
  ours?: boolean;
};

type AlternativesTableProps = {
  title: string;
  subtitle?: string;
  items: Alternative[];
};

// One card per tool on mobile, a three-column row from md up. Facts live in
// the page's Sources section; nothing here ranks the tools.
const AlternativesTable = ({ title, subtitle, items }: AlternativesTableProps) => (
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
      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,2fr)] gap-4 px-4 text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
        <div>Tool</div>
        <div>What it is</div>
        <div>Pricing</div>
        <div>Pick it when</div>
      </div>
      {items.map((t) => (
        <div
          key={t.name}
          id={t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className={`grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,2fr)] gap-2 md:gap-4 rounded-2xl border border-solid p-4 scroll-mt-24 ${
            t.ours
              ? "border-yellow-400/60 bg-yellow-50 dark:bg-yellow-400/10"
              : "border-slate-200 dark:border-slate-800"
          }`}
        >
          <div className="flex flex-col gap-1">
            <a
              href={t.href}
              target={t.ours ? undefined : "_blank"}
              rel={t.ours ? undefined : "noopener noreferrer"}
              className="font-bold text-lg text-slate-900 dark:text-white"
            >
              {t.name}
            </a>
            {t.ours && (
              <span className="self-start rounded-full bg-secondary-wopee/10 px-2 py-0.5 text-xs font-semibold text-secondary-wopee dark:bg-yellow-400/15 dark:text-yellow-400">
                Our product
              </span>
            )}
          </div>
          <Field label="What it is">{t.what}</Field>
          <Field label="Pricing">{t.pricing}</Field>
          <Field label="Pick it when">{t.pickWhen}</Field>
        </div>
      ))}
    </div>
  </section>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <span className="md:hidden block text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
      {label}
    </span>
    <p className="m-0 text-slate-700 dark:text-slate-300">{children}</p>
  </div>
);

export default AlternativesTable;
