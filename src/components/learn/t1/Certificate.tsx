import React from "react";
import Link from "@docusaurus/Link";
import NewsletterForm from "@/components/hub-spot/NewsletterForm";
import { learnConfig } from "@/data/learn-config";
import { t1Certificate } from "@/data/learn-t1";
import Expander from "@/components/learn/Expander";
import LyingCheck from "@/components/learn/LyingCheck";

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
        className="relative mx-auto mt-8 max-w-2xl -rotate-[0.6deg] rounded-xl bg-[#fffdf7] text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,.08),0_12px_32px_-8px_rgba(60,20,90,.25)] ring-1 ring-gray-200 dark:shadow-[0_0_0_1px_rgba(255,255,255,.08),0_24px_60px_-20px_rgba(0,0,0,.8)] dark:ring-white/10"
      >
        <div className="h-2 rounded-t-xl bg-gradient-to-r from-secondary-wopee via-purple-500 to-primary-wopee" />
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-lg font-extrabold tracking-tight text-secondary-wopee">Wopee.io</span>
            <small className="text-gray-600">Preview · wopee.io/learn/cert/&lt;id&gt;</small>
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-secondary-wopee">
            Completion
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Agentic testing for testers
          </p>
          <p className="mt-5 inline-block border-0 border-b-2 border-solid border-gray-300 pb-1 pr-16 text-xl font-semibold text-gray-700">
            Your name
          </p>
          <ul className="mt-5 pl-5 text-sm sm:text-base">
            {t1Certificate.findings.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="mt-6 flex items-end justify-between gap-4 border-0 border-t border-solid border-gray-200 pt-4">
            <div>
              <p className="text-sm text-gray-700">Lab check 8/8 · quiz ≥ 8/10 · not proctored</p>
              <p className="mt-1 text-xs text-gray-600">
                Course content made with AI, checked by Marcel Veselka.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="flex h-16 w-16 flex-shrink-0 rotate-[-8deg] items-center justify-center rounded-full border-2 border-dashed border-secondary-wopee/50 bg-secondary-wopee/5"
            >
              <LyingCheck label="" size="lg" />
            </span>
          </div>
        </div>
      </figure>

      <div className="mt-10 rounded-2xl border border-solid border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
        <h3 className="text-2xl font-bold tracking-tight">Get your certificate</h3>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
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
            className="mt-4 rounded-xl border border-dashed border-gray-300 dark:border-white/15 p-4 text-sm"
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
