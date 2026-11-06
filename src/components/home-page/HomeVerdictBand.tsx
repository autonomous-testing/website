import React from "react";

import { Link } from "../ui/typedDocusaurus";

export default function HomeVerdictBand() {
  return (
    <div className="flex justify-center px-4 py-6">
      <Link
        to="/no-proof-no-pass/"
        id="cta-home-verdict"
        className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-solid border-gray-300 bg-white px-4 py-2 text-center text-sm font-semibold text-gray-900 transition-colors hover:no-underline hover:border-gray-900 hover:bg-gray-900/5 hover:text-gray-900 dark:border-white/15 dark:bg-white/[0.04] dark:text-gray-100 dark:hover:border-white dark:hover:bg-white/10 dark:hover:text-white"
      >
        <span className="rounded-full bg-primary-wopee px-1.5 py-px text-[10px] font-bold uppercase leading-4 tracking-wide text-gray-900">
          New
        </span>
        The AI tester that audits its own passes. No proof, no pass.
        <span className="font-normal text-gray-500 dark:text-gray-400">
          (experimental preview)
        </span>
        <span aria-hidden="true" className="text-gray-500 dark:text-gray-400">
          →
        </span>
      </Link>
    </div>
  );
}
