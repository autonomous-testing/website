import React from "react";

const stepActions = ["Click a button", "Fill a field", "Assert a result"];

const planBudgets = [
  { plan: "Free", steps: "50 steps", note: "≈ a few full test runs" },
  { plan: "Starter", steps: "150 steps", note: "" },
  { plan: "Basic", steps: "500 steps", note: "" },
  { plan: "Premium", steps: "1,000 steps", note: "" },
];

const CheckIcon = () => (
  <svg
    className="w-4 h-4 flex-shrink-0 text-secondary-wopee dark:text-primary-wopee mt-0.5"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const StepsExplainer = () => {
  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
          Usage explained
        </div>
        <h3 className="text-xl xl:text-2xl font-extrabold tracking-tight bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-200 bg-clip-text text-transparent m-0 pb-1">
          How test steps work
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-gray-50/60 dark:bg-gray-900 shadow-sm shadow-purple-900/5">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            One step, one action
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug m-0 mb-3">
            A step is a single action the agent performs.
          </p>
          <ul className="flex flex-col gap-2 m-0 p-0 list-none">
            {stepActions.map((action) => (
              <li
                key={action}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <CheckIcon />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-gray-50/60 dark:bg-gray-900 shadow-sm shadow-purple-900/5">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            A typical autonomous test
          </div>
          <div className="text-3xl font-extrabold bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-300 bg-clip-text text-transparent tracking-tight">
            ≈ 15 steps
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug m-0 mt-3">
            Simple checks use fewer steps. Complex flows use more.
          </p>
        </div>
        <div className="rounded-2xl border border-secondary-wopee/40 dark:border-primary-wopee/40 p-6 bg-secondary-wopee/[0.04] dark:bg-primary-wopee/[0.04]">
          <div className="text-xs uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee mb-3">
            Your session budget
          </div>
          <dl className="flex flex-col gap-2 m-0">
            {planBudgets.map((b) => (
              <div
                key={b.plan}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <dt className="text-gray-600 dark:text-gray-400">{b.plan}</dt>
                <dd className="m-0 text-right font-medium text-gray-800 dark:text-gray-100">
                  {b.steps}
                  {b.note && (
                    <span className="block text-[11px] font-normal text-gray-500 dark:text-gray-400">
                      {b.note}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug m-0 mt-3">
            Per 5-hour session. Usage resets automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepsExplainer;
