import React from "react";
import Link from "@docusaurus/Link";
import NewsletterForm from "@/components/hub-spot/NewsletterForm";
import { learnConfig } from "@/data/learn-config";
import { t1Certificate } from "@/data/learn-t1";
import Expander from "@/components/learn/Expander";

const TIERS = [
  {
    name: "Completion",
    level: "tier 1",
    body: "Lab check 8/8 and quiz ≥ 8/10.",
  },
  {
    name: "Verified",
    level: "tier 2",
    body: "The same check, green in GitHub Actions on your own public fork.",
  },
];

export default function Certificate() {
  const formId = learnConfig.t1.certFormId;
  return (
    <div>
      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-base sm:text-lg">
        <li>
          <strong>Completion:</strong> lab check 8/8 and quiz 8 of 10.
        </li>
        <li>
          <strong>Verified:</strong> the same check, green on your fork (your
          own copy of the lab on GitHub).
        </li>
      </ul>
      <p className="mt-3">
        Both name the bugs you caught and add to LinkedIn in one click.
      </p>

      <figure
        aria-label="Certificate preview"
        className="mx-0 mt-4 overflow-hidden rounded-2xl border border-solid border-secondary-wopee/30 dark:border-primary-wopee/30 bg-white text-gray-900 shadow-xl"
      >
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between bg-secondary-wopee px-5 py-3 text-white">
          <span className="font-bold tracking-wide">Wopee.io</span>
          <small className="opacity-80">Preview · wopee.io/learn/cert/&lt;id&gt;</small>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary-wopee">
            Completion
          </p>
          <p className="mt-1 text-2xl sm:text-3xl font-bold">
            Agentic testing for testers
          </p>
          <p className="mt-4 font-serif text-xl italic">Your name</p>
          <ul className="mt-4 pl-5 text-sm sm:text-base">
            {t1Certificate.findings.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Lab check 8/8 · quiz ≥ 8/10 · not proctored
          </p>
          <p className="mt-3 border-0 border-t border-solid border-gray-200 pt-3 text-xs text-gray-500">
            Course content made with AI, checked by Marcel Veselka.
          </p>
        </div>
      </figure>

      <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-900 p-5 sm:p-6">
        <h3 className="text-2xl font-bold">Get your certificate</h3>
        <p className="mt-1 text-sm opacity-85">
          We email you a PDF and a LinkedIn link. Your email is used for the
          certificate and the lab solutions only, unless you tick the box.{" "}
          <Link
            to="/privacy/"
            className="font-semibold text-secondary-wopee dark:text-primary-wopee"
          >
            Privacy
          </Link>
        </p>
        {formId ? (
          <div className="mt-4 rounded-xl bg-white p-4 text-gray-900 sm:p-6">
            <div id="learn-cert-form" />
            <NewsletterForm formId={formId} target="#learn-cert-form" />
          </div>
        ) : (
          <p
            role="note"
            className="mt-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-4 text-sm"
          >
            The certificate form opens when T1 launches.
          </p>
        )}
      </div>
      <Expander className="mt-4" summary="About the certificate">
        <div className="flex flex-col gap-2 text-sm sm:text-base">
          {TIERS.map((t) => (
            <p key={t.name} className="m-0">
              <strong>{t.name}</strong> ({t.level}): {t.body}
            </p>
          ))}
          <p className="m-0">
            Both come with a verify page, LinkedIn "Add to profile" and an Open
            Badges 3.0 credential.
          </p>
          <p className="m-0">
            <strong>Agentic Testing Practitioner</strong> = T1 + T2 + T3 at the
            Verified tier.
          </p>
          <p className="m-0">
            The certificate confirms you completed the lab check and the quiz.
            It is not a proctored exam.
          </p>
        </div>
      </Expander>
    </div>
  );
}
