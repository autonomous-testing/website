import React from "react";

import { Link } from "../ui/typedDocusaurus";

export default function HomeVerdictBand() {
  return (
    <div className="flex justify-center px-4 py-6">
      <Link
        to="/no-proof-no-pass/"
        id="cta-home-verdict"
        className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-solid border-amber-500/50 bg-amber-500/10 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:no-underline hover:border-amber-500 dark:text-gray-100"
      >
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-amber-500"
        />
        New: the AI tester that audits its own passes. No proof, no pass.
        <span className="font-normal text-gray-500 dark:text-gray-400">
          (experimental preview)
        </span>
        <span aria-hidden="true" className="text-amber-600 dark:text-amber-300">
          →
        </span>
      </Link>
    </div>
  );
}
