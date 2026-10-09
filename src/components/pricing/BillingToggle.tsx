import React from "react";

import type { Billing } from "./PlanCard";

const options: { value: Billing; label: string; badge?: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual", badge: "2 months free" },
];

export default function BillingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (value: Billing) => void;
}) {
  const onKeyDown = (event: React.KeyboardEvent, option: Billing) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange(option);
    } else if (
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    ) {
      event.preventDefault();
      const next = option === "monthly" ? "annual" : "monthly";
      onChange(next);
      const group = (event.currentTarget as HTMLElement).parentElement;
      group
        ?.querySelector<HTMLElement>(`[data-billing="${next}"]`)
        ?.focus();
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 p-1 rounded-full border border-solid border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <div
            key={option.value}
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            data-billing={option.value}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, option.value)}
            className={`cursor-pointer select-none inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 focus-visible:ring-secondary-wopee dark:focus-visible:ring-primary-wopee ${
              selected
                ? "bg-secondary-wopee text-white dark:bg-primary-wopee dark:text-gray-900"
                : "text-gray-600 dark:text-gray-300 hover:text-secondary-wopee dark:hover:text-primary-wopee"
            }`}
          >
            {option.label}
            {option.badge && (
              <span
                className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                  selected
                    ? "bg-white/20 text-white dark:bg-gray-900/15 dark:text-gray-900"
                    : "bg-secondary-wopee/10 dark:bg-primary-wopee/10 text-secondary-wopee dark:text-primary-wopee"
                }`}
              >
                {option.badge}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
