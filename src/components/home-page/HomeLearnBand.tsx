import React from "react";
import Link from "@docusaurus/Link";
import { learnConfig } from "@/data/learn-config";

// One slim row below every signup CTA; appears with the T1 launch flag.
export default function HomeLearnBand() {
  if (!learnConfig.t1.launched) return null;
  return (
    <section className="container px-5 lg:px-10 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 rounded-2xl border border-solid border-secondary-wopee/25 dark:border-primary-wopee/25 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-base sm:text-lg">
          <span className="font-bold">New to AI testing agents?</span> Free
          hands-on tutorials with real labs.
        </p>
        <Link
          id="cta-home-learn"
          to="/learn/?utm_source=home&utm_medium=band&utm_campaign=learn"
          className="inline-flex flex-shrink-0 items-center rounded-lg border border-solid border-secondary-wopee/40 px-5 py-2.5 font-semibold text-secondary-wopee hover:border-secondary-wopee hover:text-secondary-wopee hover:no-underline dark:border-primary-wopee/40 dark:text-primary-wopee dark:hover:border-primary-wopee dark:hover:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee"
        >
          Start learning →
        </Link>
      </div>
    </section>
  );
}
