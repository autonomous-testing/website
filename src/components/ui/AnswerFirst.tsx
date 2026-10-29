import React from "react";

type AnswerFirstProps = {
  question: string;
  children: React.ReactNode;
  lastChecked: string;
  id?: string;
  className?: string;
};

// A short, self-contained answer to the question a page is built for, placed
// right under the hero. Visible text only; no schema.
const AnswerFirst = ({
  question,
  children,
  lastChecked,
  id = "short-answer",
  className = "",
}: AnswerFirstProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-q`}
    className={`w-full flex justify-center px-5 lg:px-10 scroll-mt-24 ${className}`}
  >
    <div className="max-w-3xl w-full rounded-xl border border-solid border-slate-200 border-l-4 border-l-secondary-wopee bg-white p-5 text-left sm:p-6 dark:border-white/10 dark:border-l-primary-wopee dark:bg-white/[0.04]">
      <p className="m-0 text-xs font-semibold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee">
        Short answer
      </p>
      <h2
        id={`${id}-q`}
        className="mt-2 mb-0 text-xl font-bold leading-snug sm:text-2xl"
      >
        {question}
      </h2>
      <p className="mt-3 mb-0 text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-200">
        {children}
      </p>
      <p className="mt-3 mb-0 text-xs text-slate-500 dark:text-slate-400">
        Last checked: {lastChecked}
      </p>
    </div>
  </section>
);

export default AnswerFirst;
