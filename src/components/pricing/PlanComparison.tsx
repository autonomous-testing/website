import React from "react";
import Link from "@docusaurus/Link";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

type Cell = string | boolean;

type Row = {
  feature: string;
  starter: Cell;
  basic: Cell;
  premium: Cell;
  enterprise: Cell;
};

const plans = ["Starter", "Basic", "Premium", "Enterprise"] as const;

const rows: Row[] = [
  {
    feature: "Test steps / session",
    starter: "150",
    basic: "500",
    premium: "1,000",
    enterprise: "Unlimited",
  },
  {
    feature: "Active projects",
    starter: "10",
    basic: "100",
    premium: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "Team user management",
    starter: false,
    basic: "Basic",
    premium: "Advanced",
    enterprise: "Advanced",
  },
  {
    feature: "Onboarding assistance",
    starter: false,
    basic: true,
    premium: true,
    enterprise: true,
  },
  {
    feature: "Priority individual support",
    starter: false,
    basic: false,
    premium: true,
    enterprise: true,
  },
  {
    feature: "SSO, RBAC & audit logs",
    starter: false,
    basic: false,
    premium: false,
    enterprise: true,
  },
  {
    feature: "On-premise deployment",
    starter: false,
    basic: false,
    premium: false,
    enterprise: true,
  },
  {
    feature: "Dedicated CSM & SLA",
    starter: false,
    basic: false,
    premium: false,
    enterprise: true,
  },
];

const Check = () => (
  <svg
    className="w-4 h-4 mx-auto text-secondary-wopee dark:text-primary-wopee"
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

const Dash = () => (
  <span className="text-gray-300 dark:text-gray-700">·</span>
);

const renderCell = (cell: Cell) => {
  if (cell === true) return <Check />;
  if (cell === false) return <Dash />;
  return <span>{cell}</span>;
};

const planKey = (plan: string) =>
  plan.toLowerCase() as "starter" | "basic" | "premium" | "enterprise";

const PlanComparison = () => {
  return (
    <section className="my-20 max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
          Full comparison
        </div>
        <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-200 bg-clip-text text-transparent m-0 pb-1">
          Every feature, side by side
        </h2>
      </div>

      {/* DESKTOP — borderless table */}
      <div className="hidden md:block">
        <table className="w-full text-sm border-separate border-spacing-0 [&_td]:!border-0 [&_th]:!border-0 [&_tr]:!bg-transparent [&_thead]:!bg-transparent">
          <thead>
            <tr>
              <th className="w-2/5" />
              {plans.map((plan) => {
                const isBasic = plan === "Basic";
                return (
                  <th
                    key={plan}
                    className={`py-5 text-lg font-extrabold tracking-tight ${
                      isBasic
                        ? "text-secondary-wopee dark:text-primary-wopee bg-secondary-wopee/[0.04] dark:bg-primary-wopee/[0.04] rounded-t-2xl"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                    style={{ width: "15%" }}
                  >
                    {plan}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const isLast = idx === rows.length - 1;
              return (
                <tr key={row.feature} className="group transition-colors">
                  <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                    {row.feature}
                  </td>
                  {plans.map((plan) => {
                    const isBasic = plan === "Basic";
                    return (
                      <td
                        key={plan}
                        className={`py-4 px-2 text-center text-gray-700 dark:text-gray-200 ${
                          isBasic
                            ? `bg-secondary-wopee/[0.04] dark:bg-primary-wopee/[0.04] ${
                                isLast ? "rounded-b-2xl" : ""
                              }`
                            : ""
                        }`}
                      >
                        {renderCell(row[planKey(plan)])}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE — stacked plan cards */}
      <div className="md:hidden flex flex-col gap-4">
        {plans.map((plan) => {
          const isFeatured = plan === "Basic";
          return (
            <div
              key={plan}
              className={`rounded-2xl p-5 ${
                isFeatured
                  ? "bg-secondary-wopee/[0.07] dark:bg-primary-wopee/[0.07] ring-1 ring-secondary-wopee/30 dark:ring-primary-wopee/30"
                  : "bg-gray-50/60 dark:bg-gray-900/40"
              }`}
            >
              <div
                className={`text-xs uppercase tracking-widest font-bold mb-4 ${
                  isFeatured
                    ? "text-secondary-wopee dark:text-primary-wopee"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {plan}
              </div>
              <dl className="flex flex-col gap-3">
                {rows.map((row) => {
                  const value = row[planKey(plan)];
                  return (
                    <div
                      key={row.feature}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <dt className="text-gray-600 dark:text-gray-400">
                        {row.feature}
                      </dt>
                      <dd className="text-right font-medium text-gray-800 dark:text-gray-100 m-0 flex-shrink-0">
                        {value === true ? (
                          <Check />
                        ) : value === false ? (
                          <span className="text-gray-300 dark:text-gray-700">
                            —
                          </span>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
        All plans include autonomous test generation, visual regression
        testing, and Playwright + CI/CD integration. Step allowances reset
        every 5 hours.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="https://cmd.wopee.io" className="hover:no-underline">
          <ButtonGradientOutline className="w-60" label="Start for free" />
        </Link>
        <Link
          to="/book-demo"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-secondary-wopee dark:hover:text-primary-wopee transition-colors"
        >
          or talk to founders →
        </Link>
      </div>
    </section>
  );
};

export default PlanComparison;
