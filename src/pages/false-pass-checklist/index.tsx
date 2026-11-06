import React from "react";

import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import { Link } from "../../components/ui/typedDocusaurus";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import SocialCard from "@site/src/components/seo/SocialCard";
import {
  ACCENT,
  CARD,
  MUTED,
  PreviewPill,
  VIDEO_ID,
  VIDEO_TITLE,
  VerdictCtas,
} from "@site/src/components/verdict/shared";
import {
  CHECKLIST,
  CHECKLIST_CLOSING,
  CHECKLIST_LEAD,
  CHECKLIST_SUBTITLE,
  CHECKLIST_TITLE,
} from "@site/src/data/false-pass-checklist";
import styles from "./checklist.module.css";

const PERMALINK = "/false-pass-checklist/";
const MUST_ANSWER = [2, 3, 5];
const VERDICTS = [
  { label: "PASSED", note: "proved by the run", cls: "passed" },
  { label: "INCOMPLETE", note: "not proven yet", cls: "incomplete" },
  { label: "FAILED", note: "proved broken", cls: "failed" },
] as const;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: CHECKLIST_TITLE,
  description: `${CHECKLIST_LEAD} ${CHECKLIST_SUBTITLE}`,
  url: `https://wopee.io${PERMALINK}`,
  step: CHECKLIST.map((c) => ({
    "@type": "HowToStep",
    position: c.n,
    name: c.question,
    text: c.why,
  })),
};

export default function FalsePassChecklistPage(): JSX.Element {
  return (
    <Layout
      title="The False Pass Checklist for AI Testing Tools"
      description="Seven questions to ask any AI testing tool before you trust its green: evidence, pass audits, unproven passes, shadow mode. Free, printable."
    >
      <SocialCard permalink={PERMALINK} />
      <Head>
        <body className="is-checklist" />
        <script type="application/ld+json">{JSON.stringify(JSON_LD)}</script>
      </Head>
      <main
        className={`${styles.page} mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16`}
      >
        <header>
          <div className={styles.brand}>
            <img
              src="/brand/svg/wopee-wordmark-mono-white.svg"
              alt="Wopee.io"
              width={110}
              height={24}
            />
            <span>wopee.io/false-pass-checklist</span>
          </div>
          <div className={styles.noPrint}>
            <PreviewPill>Free · no sign-up · printable</PreviewPill>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {CHECKLIST_TITLE}
          </h1>
          <p
            className={`${styles.lead} mt-3 text-xl font-semibold sm:text-2xl ${ACCENT}`}
          >
            {CHECKLIST_LEAD}
          </p>
          <p
            className={`mt-4 max-w-3xl text-base leading-relaxed sm:text-lg ${MUTED}`}
          >
            {CHECKLIST_SUBTITLE}
          </p>
          <div className={styles.legend}>
            {VERDICTS.map((v) => (
              <span key={v.label} className={`${styles.chip} ${styles[v.cls]}`}>
                <b>{v.label}</b> {v.note}
              </span>
            ))}
          </div>
          <div
            className={`${styles.noPrint} mt-6 flex flex-wrap items-center gap-4`}
          >
            <ButtonPrimaryInverted
              label="Download PDF"
              id="cta-checklist-pdf"
              href="pathname:///downloads/false-pass-checklist.pdf"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              One A4 page, ready to print or share.
            </span>
          </div>
        </header>

        <p className={`${styles.note} mt-10 mb-0 text-sm ${MUTED}`}>
          Wopee.io's answers describe verdict integrity, which is in
          experimental preview.
        </p>

        <ol
          className={`${styles.list} m-0 mt-4 flex list-none flex-col gap-4 p-0`}
        >
          {CHECKLIST.map((c) => (
            <li
              key={c.n}
              id={`q${c.n}`}
              className={`${styles.item} ${CARD} scroll-mt-24 px-5 py-5 sm:px-6`}
            >
              <div className="flex gap-4">
                <span
                  className={`${styles.num} flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-wopee/10 text-lg font-extrabold dark:bg-primary-wopee/10 ${ACCENT}`}
                >
                  {c.n}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="m-0 text-lg font-bold leading-snug sm:text-xl">
                    {c.question}
                    {MUST_ANSWER.includes(c.n) && (
                      <span
                        className={`${styles.must} ml-2 inline-block rounded-full bg-amber-500/15 px-2 py-0.5 align-middle text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300`}
                      >
                        Must answer
                      </span>
                    )}
                  </h2>
                  <p className={`m-0 mt-1.5 text-base ${MUTED}`}>
                    <span className="font-semibold">Why it matters: </span>
                    {c.why}
                  </p>
                  <p
                    className={`${styles.answer} m-0 mt-3 rounded-lg border-0 border-l-4 border-solid border-secondary-wopee bg-secondary-wopee/[0.06] px-3 py-2 text-sm leading-relaxed dark:border-primary-wopee dark:bg-primary-wopee/[0.06]`}
                  >
                    <span className="font-semibold">Wopee.io's answer: </span>
                    {c.answer}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p
          className={`${styles.closing} mt-10 text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl`}
        >
          {CHECKLIST_CLOSING}
        </p>

        <div className={styles.printOnly}>
          <div className={styles.footer}>
            <div>
              <p className={styles.footerClosing}>{CHECKLIST_CLOSING}</p>
              <p className={styles.footerText}>
                See a real run answer 2, 3 and 5: “{VIDEO_TITLE}”
                <br />
                youtube.com/watch?v={VIDEO_ID}
              </p>
              <p className={styles.footerCta}>
                Start free at wopee.io · no credit card
              </p>
            </div>
            <figure className={styles.qr}>
              <img
                src="/img/no-proof-no-pass/qr-checklist.svg"
                alt="QR code to wopee.io/no-proof-no-pass"
                width={96}
                height={96}
              />
              <figcaption>wopee.io/no-proof-no-pass</figcaption>
            </figure>
          </div>
        </div>

        <section
          className={`${styles.noPrint} ${CARD} mt-10 px-6 py-8 text-center`}
        >
          <p className="m-0 text-lg font-bold">
            See how Wopee.io answers 2, 3 and 5 on a real run.
          </p>
          <p className={`m-0 mt-2 text-sm ${MUTED}`}>
            Watch “{VIDEO_TITLE}” on{" "}
            <Link
              to="/no-proof-no-pass/"
              className={`font-semibold underline underline-offset-4 ${ACCENT}`}
            >
              No proof, no pass
            </Link>
            , or try it on your own runs.
          </p>
          <VerdictCtas
            content="checklist"
            medium="checklist"
            className="mt-6"
          />
        </section>
      </main>
    </Layout>
  );
}
