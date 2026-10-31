import React, { useState } from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";

import NotifyInline, { NOTIFY_CTA } from "@/components/learn/NotifyInline";
import Breadcrumb from "@/components/learn/Breadcrumb";
import Expander, { ExpanderGroup } from "@/components/learn/Expander";
import HeroPill from "@/components/learn/HeroPill";
import GradientCard from "@/components/ui/GradientCard";
import { trackLearn } from "@/components/learn/track";
import { tutorials, tutorialUrl } from "@/data/learn-tutorials";
import {
  accent,
  accentH2,
  codeSurface,
  container,
  h1,
  h2,
  heroBg,
  standaloneLink,
  surface,
  surfaceMuted,
  textLink,
} from "@/components/learn/styles";
import { cn } from "@/lib/utils";

const t1 = tutorials[0];
const t1Live = t1.status === "live";

const GETS: [string, string][] = [
  ["A 3-minute video", "per tutorial."],
  ["A browser lab", "in GitHub Codespaces. Nothing to install."],
  ["An automatic grade.", "A check grades the tests each tester writes."],
  [
    "A LinkedIn certificate",
    "for each tester. Tutorials 1 to 3, each at the Verified tier, earn the Agentic Testing Practitioner certificate.",
  ],
  ["A facilitator kit", "to run the sessions yourself, shipping with Tutorial 2."],
];

const PLAN: [string, string][] = [
  ["Block the time.", "Tutorial 1 takes about 2 hours per tester. Two sittings are fine."],
  ["Testers open the lab.", "Each starts it in their own personal GitHub account. No company code or access is involved."],
  ["Testers get certified.", "They pass the check and the quiz, then send you their certificate link."],
];

const PITCH =
  "Hi, I'd like our testers to take a free tutorial on AI testing agents from Wopee.io. Tutorial 1 takes about 2 hours per tester. The lab tests a public demo app, so no company code or data goes in, and it works with our own Copilot or with no AI. Each tester gets an automatic grade and a certificate link I can collect. Can we block 2 hours for it in the next sprint?";

const ANSWERS: [string, string][] = [
  [
    "Data",
    "The labs test a public demo app. No company code or data goes in. Nothing is sent unless the tester opts in.",
  ],
  ["Accounts", "Each tester uses a personal GitHub account. The lab touches no company code or systems."],
  [
    "AI use",
    "AI is optional. Use your organisation's Copilot, or no AI at all: every step has a path without it.",
  ],
  ["Licence", "CC BY-NC 4.0. Free for internal team training at any company. Not for resale or paid courses."],
];

const FAQ: [string, string][] = [
  [
    "Is it really free?",
    "Yes. Videos, labs, the check, the quiz and the certificate cost nothing. Testers give an email address only to receive their certificate.",
  ],
  [
    "Can I see my team's progress?",
    "Not in a dashboard; there isn't one. Each tester's certificate has its own link, so ask your testers to send it to you.",
  ],
  [
    "What does the Verified tier mean?",
    "Completion means the tester passed the automatic check and the quiz. It is not proctored. Verified means the same check also passed in GitHub Actions on the tester's own public copy of the lab. Many company GitHub accounts block public repositories, so testers use a personal GitHub account for the lab.",
  ],
  [
    "Do testers need a Wopee.io account?",
    "No. Tutorials 1 to 3 are vendor-neutral and use only Playwright, GitHub and, optionally, Copilot.",
  ],
  [
    "When does it open?",
    "Tutorial 1 opens first, then Tutorials 2 and 3. The facilitator kit ships with Tutorial 2. Leave your email above and we will tell you.",
  ],
];

const SignupCard = () => (
  <GradientCard variant="solid" padding="none" className="w-full">
    <div className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-8">
      <div>
        <h2 className="m-0 text-balance text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
          Get an email when the tutorials open
        </h2>
        <p className="m-0 mt-1 hidden text-sm text-white/85 sm:block sm:text-base">
          We announce each new tutorial and the facilitator kit in the Wopee.io newsletter.
        </p>
      </div>
      <NotifyInline
        id="cta-learn-notify-teams"
        tone="dark"
        team
        source="learn-teams"
        cta={t1Live ? "Email me when the kit ships" : NOTIFY_CTA}
        note="Unsubscribe from any email."
        success={
          t1Live
            ? "Done. We'll email you when the facilitator kit ships."
            : "Done. We'll email you when Tutorial 1 opens and again when the facilitator kit ships."
        }
      />
      <p className="m-0 text-sm text-white/85">
        Nobody from Wopee.io will contact you about buying anything unless you ask.
      </p>
    </div>
  </GradientCard>
);

const Clock = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="-mt-0.5 mr-1.5 inline h-4 w-4 fill-current align-middle">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z" />
  </svg>
);

const HeroLinks = () => (
  <>
    <Link to="/book-demo/" id="cta-learn-teams-talk" className={standaloneLink}>
      Talk to us →
    </Link>
    <Link
      to={tutorialUrl(t1)}
      className={cn(standaloneLink, "font-normal text-gray-700 dark:text-gray-300")}
      onClick={() => trackLearn("learn_tutorial_click", { tutorial_id: t1.id, cta: "see_tutorial", placement: "teams" })}
    >
      See what Tutorial 1 covers
    </Link>
  </>
);

const Hero = () => (
  <section className="relative overflow-hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent dark:from-transparent"
      style={heroBg}
    />
    <div className={cn(container, "relative pt-2 pb-12 lg:pt-8 lg:pb-20")}>
      <div className="mx-auto max-w-6xl">
        <Breadcrumb here="For QA leads" />
        <div className="mt-2 grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-12">
          <div className="flex min-w-0 flex-col items-start gap-4 lg:pt-4">
            <HeroPill>
              {t1Live ? "Tutorial 1 is live" : "Coming soon"} · <strong className="font-semibold">Free</strong>
            </HeroPill>
            <h1 className={h1}>
              Free AI testing tutorials for <span className={accent}>your whole QA team</span>
            </h1>
            <p className="m-0 max-w-[36rem] text-lg leading-snug text-gray-700 dark:text-gray-300 sm:text-xl">
              Your testers learn to use Playwright's AI agents and check every test they write. Each tutorial: video,
              browser lab, automatic grade, certificate.
            </p>
            <p className="m-0 text-base font-semibold">
              <Clock />
              About 2 hours per tester for Tutorial 1 · No company code or data
            </p>
            <div className="hidden flex-wrap items-center gap-x-6 gap-y-1 lg:flex">
              <HeroLinks />
            </div>
          </div>
          <section id="notify" aria-label="Team sign-up" className="w-full max-w-xl scroll-mt-24 lg:max-w-none">
            <SignupCard />
          </section>
          <div className="-mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 lg:hidden">
            <HeroLinks />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Gets = () => (
  <section aria-labelledby="gets-h" className={cn(container, "py-12 lg:py-16")}>
    <div className="mx-auto max-w-6xl">
      <h2 id="gets-h" className={h2}>
        What your <span className={accentH2}>team gets</span>
      </h2>
      {/* Five items: 2 + 2 + 1 wide on tablet, 3 + 2 on desktop, so no cell is left empty. */}
      <ul className="m-0 mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-6">
        {GETS.map(([title, body]) => (
          <li
            key={title}
            className={cn(
              "flex gap-3 rounded-xl p-4 sm:p-5 sm:last:col-span-2 lg:col-span-2 lg:[&:nth-child(n+4)]:col-span-3",
              surface,
            )}
          >
            <span aria-hidden="true" className="mt-0.5 font-bold text-green-700 dark:text-green-400">
              ✓
            </span>
            <p className="m-0 leading-relaxed">
              <strong>{title}</strong> <span className="text-gray-700 dark:text-gray-300">{body}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const CopyPitch = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PITCH);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className={cn("flex h-full flex-col rounded-2xl p-5 sm:p-6", codeSurface)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="m-0 text-lg font-bold text-white">Pitch it to your manager</h3>
        <button
          type="button"
          onClick={copy}
          className="min-h-[44px] cursor-pointer rounded-lg border border-solid border-white/20 bg-white/10 px-4 text-sm font-semibold font-[inherit] text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-wopee"
        >
          {copied ? "Copied" : "Copy text"}
        </button>
      </div>
      <p className="m-0 mt-3 leading-relaxed text-gray-200">{PITCH}</p>
      <span role="status" className="sr-only">
        {copied ? "Pitch copied to the clipboard" : ""}
      </span>
    </div>
  );
};

const Plan = () => (
  <section aria-labelledby="plan-h" className={cn("py-12 lg:py-16", surfaceMuted)}>
    <div className={container}>
      <div className="mx-auto max-w-6xl">
        <h2 id="plan-h" className={h2}>
          How a team <span className={accentH2}>runs it</span>
        </h2>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2 lg:gap-12">
          <ol className="m-0 flex list-none flex-col gap-5 p-0">
            {PLAN.map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-solid border-secondary-wopee/40 bg-white font-mono text-sm font-bold text-secondary-wopee dark:border-white/20 dark:bg-[#1b1b1d] dark:text-gray-200"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="m-0 pt-1 text-lg leading-relaxed">
                  <strong>{title}</strong> <span className="text-gray-700 dark:text-gray-300">{body}</span>
                </p>
              </li>
            ))}
          </ol>
          <CopyPitch />
        </div>
      </div>
    </div>
  </section>
);

const Answers = () => (
  <section aria-labelledby="answers-h" className={cn(container, "py-12 lg:py-16")}>
    <div className="mx-auto max-w-6xl">
      <h2 id="answers-h" className={h2}>
        What your <span className={accentH2}>security team</span> will ask
      </h2>
      <dl className={cn("m-0 mt-8 max-w-4xl overflow-hidden rounded-2xl", surface)}>
        {ANSWERS.map(([k, v], i) => (
          <div
            key={k}
            className={cn(
              "grid gap-1 px-5 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 sm:px-6",
              i > 0 && "border-0 border-t border-solid border-gray-200 dark:border-white/10",
            )}
          >
            <dt className="font-bold">{k}</dt>
            <dd className="m-0 leading-relaxed text-gray-700 dark:text-gray-300">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

const Faq = () => (
  <section aria-labelledby="faq-h" className={cn(container, "pb-12 lg:pb-16")}>
    <div className="mx-auto max-w-6xl">
      <h2 id="faq-h" className={cn(h2, "text-2xl sm:text-3xl")}>
        Questions from QA leads
      </h2>
      <ExpanderGroup className="mt-6 max-w-4xl">
        {FAQ.map(([q, a]) => (
          <Expander key={q} grouped summary={<span className="text-base sm:text-lg">{q}</span>}>
            <p className="m-0 max-w-[68ch] leading-relaxed text-gray-700 dark:text-gray-300">{a}</p>
          </Expander>
        ))}
      </ExpanderGroup>
    </div>
  </section>
);

const Commercial = () => (
  <div className={cn(container, "pb-16")}>
    <p className="mx-auto m-0 max-w-6xl border-0 border-t border-solid border-gray-200 pt-6 text-base dark:border-white/10">
      Want help rolling out AI testing on your own app? Wopee.io runs paid pilots and consulting.{" "}
      <Link to="/pilot/" className={cn(textLink, "whitespace-nowrap")}>
        Pilot projects →
      </Link>
    </p>
  </div>
);

const LearnTeamsPage = () => (
  <Layout
    title="Agentic Testing Training for QA Teams"
    description="Free hands-on tutorials on AI testing agents for your QA team. Video, browser lab, automatic grade and LinkedIn certificate. No company data needed."
  >
    <PageMetadata image="/img/learn/learn-og.jpg" />
    <Head>
      <meta name="robots" content="noindex, follow" />
    </Head>
    <main>
      <Hero />
      <Gets />
      <Plan />
      <Answers />
      <Faq />
      <Commercial />
    </main>
  </Layout>
);

export default LearnTeamsPage;
