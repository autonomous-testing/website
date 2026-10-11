import React from "react";
import Link from "@docusaurus/Link";
import NewsletterForm from "@/components/hub-spot/NewsletterForm";
import { learnConfig } from "@/data/learn-config";
import { t1Certificate } from "@/data/learn-t1";

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
      <div className="grid gap-4 sm:grid-cols-2">
        {TIERS.map((t, i) => (
          <div
            key={t.name}
            className={
              i === 1
                ? "rounded-xl border-2 border-solid border-secondary-wopee/60 dark:border-primary-wopee/60 p-5"
                : "rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-5"
            }
          >
            <h3 className="text-xl font-bold">
              {t.name}{" "}
              <span className="ml-1 align-middle text-xs font-semibold uppercase tracking-wide opacity-60">
                {t.level}
              </span>
            </h3>
            <p className="mt-1 opacity-85">{t.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4">
        Both come with a verify page, LinkedIn "Add to profile" and an Open
        Badges 3.0 credential.
      </p>
      <p className="mt-2">
        <strong>Agentic Testing Practitioner</strong> = T1 + T2 + T3 at the
        Verified tier.
      </p>
      <p className="mt-5">It names what you did, not only that you finished:</p>

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

      <div className="mt-8 rounded-2xl bg-gray-50 dark:bg-gray-900 p-5 sm:p-8">
        <h3 className="text-2xl font-bold">Get your certificate</h3>
        <p className="mt-1">We email you a PDF and a link you can add to LinkedIn.</p>
        <p className="mt-3 text-sm italic opacity-80">
          We use your email to send your certificate, its verify link and the
          lab solutions. Nothing else, unless you tick the box below.{" "}
          <Link
            to="/privacy/"
            className="font-semibold not-italic text-secondary-wopee dark:text-primary-wopee"
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
            The certificate form opens when T1 launches. It asks for the name
            on the certificate and your email, with a separate, unticked box:
            "Send me the next tutorial and occasional Wopee.io news. You can
            unsubscribe from any email."
          </p>
        )}
        <p className="mt-4 text-xs opacity-70">
          The certificate confirms you completed the lab check and the quiz.
          It is not a proctored exam.
        </p>
      </div>
    </div>
  );
}
