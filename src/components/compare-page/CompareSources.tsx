import React from "react";

export type CompareSource = { label: string; href: string };

type CompareSourcesProps = {
  title?: string;
  checked: string;
  sources: CompareSource[];
};

const CompareSources = ({
  title = "Sources",
  checked,
  sources,
}: CompareSourcesProps) => (
  <section id="sources" className="w-full flex justify-center px-4 pb-10">
    <div className="max-w-3xl w-full">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Checked {checked}. Vendor pages change; if something here is out of
        date, tell us at help@wopee.io and we will correct it.
      </p>
      <ul className="list-disc pl-5 m-0 flex flex-col gap-1 text-sm">
        {sources.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-wopee dark:text-primary-wopee underline break-words"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CompareSources;
