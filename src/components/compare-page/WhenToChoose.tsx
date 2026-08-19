import React from "react";
import { Check } from "lucide-react";

type WhenToChooseProps = {
  title: string;
  stickTitle: string;
  stickItems: React.ReactNode[];
  switchTitle: string;
  switchItems: React.ReactNode[];
};

const WhenToChoose = ({
  title,
  stickTitle,
  stickItems,
  switchTitle,
  switchItems,
}: WhenToChooseProps) => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-slate-50 dark:bg-white/5">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-10">
        {title}
      </h2>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-6 lg:p-8">
          <h3 className="text-xl lg:text-2xl font-bold mb-5">{stickTitle}</h3>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {stickItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-yellow-400/60 bg-yellow-50 dark:bg-yellow-400/10 p-6 lg:p-8">
          <h3 className="text-xl lg:text-2xl font-bold mb-5">{switchTitle}</h3>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {switchItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check
                  size={18}
                  className="shrink-0 mt-1 text-secondary-wopee dark:text-yellow-400"
                />
                <span className="text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhenToChoose;
