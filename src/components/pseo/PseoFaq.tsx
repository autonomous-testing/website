import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

// Same accordion visual as the homepage FAQ (src/components/home-page/HomeFaqSection.tsx):
// +/- toggle rows, slate dividers, expand/collapse animation. Kept as a small
// data-driven component so programmatic pages reuse the look without duplicating
// the homepage's hardcoded question list.
export default function PseoFaq({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (index: number) =>
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  return (
    <div>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
        >
          <button
            className="bg-transparent border-none w-full flex justify-between items-center py-4 text-left focus:outline-none focus:ring-0 group text-slate-900 dark:text-white"
            onClick={() => toggle(index)}
          >
            <span className="text-lg font-bold">{faq.q}</span>
            <Icon
              path={openIndices.includes(index) ? mdiMinus : mdiPlus}
              size={1}
              className="flex-shrink-0 ml-4 text-slate-500 dark:text-slate-400"
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndices.includes(index)
                ? "max-h-[1000px] opacity-100 mb-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-slate-600 dark:text-slate-400">
              <p>{faq.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
