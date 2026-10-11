import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

const link =
  "font-semibold text-secondary-wopee dark:text-primary-wopee underline underline-offset-2";

const COLLECTED = [
  {
    what: "Email address",
    when: '"Notify me" form',
    why: "To tell you when a tutorial opens.",
    basis: "Your consent.",
  },
  {
    what: "Name on the certificate, email address, GitHub username, completion code",
    when: "Certificate form",
    why: "To issue your certificate, its verify link and the lab solutions.",
    basis: "Our service to you, at your request.",
  },
  {
    what: "Team code (optional)",
    when: "Certificate form",
    why: 'To show your progress to the team lead who gave you the code, only if you tick "share with my team lead".',
    basis: "Your consent.",
  },
  {
    what: "Marketing consent (optional, unticked)",
    when: "Certificate form",
    why: "To send you the next tutorial and occasional Wopee.io news.",
    basis: "Your consent.",
  },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl sm:text-3xl font-bold mt-10 mb-3">{children}</h2>
);

const PrivacyPage = () => (
  <Layout
    title="Privacy notice for wopee.io/learn"
    description="How wopee labs s.r.o. handles the email, name, GitHub username and consent you give on the free Wopee.io tutorials at wopee.io/learn."
  >
    <Head>
      <meta name="robots" content="noindex, follow" />
    </Head>
    <main className="container px-5 lg:px-10 py-12 lg:py-16">
      <article className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed [&_p]:mt-3 [&_li]:mt-2">
        <h1 className="text-4xl sm:text-5xl leading-tight">
          Privacy notice for wopee.io/learn
        </h1>
        <p className="text-sm opacity-70">Last updated: 11 October 2026</p>
        <p>
          This notice covers the free tutorials at{" "}
          <Link to="/learn/" className={link}>wopee.io/learn</Link>: the
          "notify me" form, the certificate form, and the lab you run in
          GitHub Codespaces. The Wopee.io product is covered by our{" "}
          <Link to="/terms-and-conditions/" className={link}>
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link to="/gdpr/" className={link}>Data Processing Agreement</Link>.
        </p>

        <H2>Who is responsible</H2>
        <p>
          wopee labs s.r.o., Pujmanove 883/23, 140 00 Prague, Czech Republic,
          is the controller of the personal data described here. Contact:{" "}
          <a href="mailto:help@wopee.io" className={link}>help@wopee.io</a>.
        </p>

        <H2>What we collect, and why</H2>
        <ul className="list-none p-0 m-0 grid gap-3">
          {COLLECTED.map((c) => (
            <li
              key={c.what}
              className="!mt-0 rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-4 sm:p-5"
            >
              <p className="!mt-0 font-semibold">{c.what}</p>
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-base">
                <dt className="opacity-60">When</dt>
                <dd className="m-0">{c.when}</dd>
                <dt className="opacity-60">Why</dt>
                <dd className="m-0">{c.why}</dd>
                <dt className="opacity-60">Legal basis</dt>
                <dd className="m-0">{c.basis}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <p>
          You never need to give an email to watch the videos, read the
          lessons, run the lab, run the check or take the quiz. Marketing
          consent is never a condition of the certificate.
        </p>

        <H2>What we do not collect</H2>
        <ul className="pl-5">
          <li>
            <strong>The lab.</strong> The lab check runs in your own codespace
            or on your own laptop and sends nothing to us, unless you opt in
            by setting <code>LEARN_SHARE=1</code>.
          </li>
          <li>
            <strong>Videos.</strong> Embedded videos load from YouTube
            (youtube-nocookie.com) only after you press play.
          </li>
        </ul>

        <H2>Who processes it for us</H2>
        <ul className="pl-5">
          <li>HubSpot (forms and contact records)</li>
          <li>Brevo (sending email)</li>
          <li>
            Google (website analytics through Google Tag Manager with Consent
            Mode; YouTube when you press play)
          </li>
        </ul>
        <p>GitHub Codespaces runs under your own GitHub account and GitHub's terms.</p>

        <H2>How long we keep it</H2>
        <ul className="pl-5">
          <li>
            Notify and marketing emails: until you unsubscribe or ask us to
            delete your data.
          </li>
          <li>
            Certificate records: as long as the certificate's verify link
            exists, so that anyone you show it to can check it. You can ask us
            to delete it at any time; the verify link then stops working.
          </li>
        </ul>

        <H2>Your rights</H2>
        <p>
          You can ask for a copy of your data, its correction or deletion,
          restriction of processing, or data portability, and you can object
          to processing or withdraw consent at any time, without affecting
          what we did before. Every email has an unsubscribe link. Write to{" "}
          <a href="mailto:help@wopee.io" className={link}>help@wopee.io</a>.
          You can also complain to the Czech data protection authority, the
          Office for Personal Data Protection (
          <a href="https://uoou.gov.cz/" target="_blank" rel="noopener noreferrer" className={link}>
            uoou.gov.cz
          </a>
          ).
        </p>
      </article>
    </main>
  </Layout>
);

export default PrivacyPage;
