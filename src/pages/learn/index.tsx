import React from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { Button } from "@/components/ui/button";
import GradientCard from "@/components/ui/GradientCard";
import { Badge } from "@/components/ui/badge";
import HeroPill from "@/components/learn/HeroPill";
import NotifyInline, { NOTIFY_CTA, NOTIFY_NOTE } from "@/components/learn/NotifyInline";
import LyingTestCard from "@/components/learn/LyingTestCard";
import Expander from "@/components/learn/Expander";
import {
  tutorials,
  featuredTutorials,
  roadmapTutorials,
  tutorialUrl,
  cardTitle,
  type Tutorial,
} from "@/data/learn-tutorials";
import { whyAiSummary } from "@/data/learn-why-ai";
import { cn } from "@/lib/utils";
import {
  accent,
  accentH2,
  codeSurface,
  container,
  ctaSize,
  focusRing,
  h1,
  h2,
  heroBg,
  standaloneLink,
} from "@/components/learn/styles";

const TITLE = "Free Hands-on Tutorials on AI Testing Agents";
const DESCRIPTION =
  "Free hands-on tutorials for QA testers: learn to use AI testing agents and check their work. Video, browser lab, automatic grade and a LinkedIn certificate.";

const t1 = tutorials[0];
const t1Live = t1.status === "live";

const STEPS = [
  {
    title: "Watch a 3-minute video",
    body: "One idea, explained with a real test run.",
  },
  {
    title: "Do the lab in your browser",
    body: "Runs in GitHub Codespaces, a free browser workspace. AI is optional.",
  },
  {
    title: "Get graded, get certified",
    body: "An automatic check grades your tests. Pass it and the quiz, then add the certificate to LinkedIn.",
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free AI testing tutorials for QA testers",
  description: DESCRIPTION,
  itemListElement: tutorials.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${t.id}: ${t.title}`,
    ...(t.status === "live" ? { url: `https://wopee.io${tutorialUrl(t)}` } : {}),
  })),
};

const CHIPS = ["3-minute video", "Lab in your browser", "LinkedIn certificate"];

const Hero = () => (
  <section className="relative overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent dark:from-transparent" style={heroBg} />
    <div className={cn(container, "relative pt-6 pb-10 lg:pt-16 lg:pb-20")}>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:items-center xl:gap-14">
        <div className="flex min-w-0 flex-col items-start gap-5">
          <HeroPill>
            <strong className="font-semibold">Free</strong> tutorials for QA testers
          </HeroPill>
          <h1 className={h1}>
            Hands-on tutorials on{" "}
            <span className={accent}>AI testing agents</span>
          </h1>
          <p className="m-0 max-w-[36rem] text-lg sm:text-xl leading-snug text-gray-700 dark:text-gray-300">
            Learn to use Playwright's AI agents, MCP and agent skills, and to
            check every test they write.
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 text-sm">
            {CHIPS.map((c) => (
              <li
                key={c}
                className="rounded-full border border-solid border-gray-200 bg-white/80 px-3 py-1 font-semibold dark:border-white/10 dark:bg-white/5"
              >
                <span aria-hidden="true" className="mr-1 text-green-700 dark:text-green-400">
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-1 w-full max-w-xl">
            {t1Live ? (
              <div className="flex flex-col items-start gap-1">
                <Button asChild variant="wopeeFlat" className={ctaSize}>
                  <Link to={tutorialUrl(t1)} id="cta-learn-start-hero">
                    Start Tutorial 1, free
                  </Link>
                </Button>
                <a href="#notify" className={cn(standaloneLink, "text-sm")}>
                  Get notified about the next ones
                </a>
              </div>
            ) : (
              <NotifyInline
                id="cta-learn-notify-hero"
                cta={NOTIFY_CTA}
                note={NOTIFY_NOTE}
              />
            )}
          </div>
          {t1.hasPage ? (
            <Link to={`${tutorialUrl(t1)}#try`} className={cn(standaloneLink, "-mt-2 text-sm")}>
              Try the 60-second test →
            </Link>
          ) : (
            <a
              href="#tutorials"
              className={cn(standaloneLink, "-mt-2 hidden text-sm text-gray-600 dark:text-gray-400 dark:no-underline xl:inline-flex")}
            >
              See the tutorials ↓
            </a>
          )}
        </div>
        <LyingTestCard className="w-full max-w-2xl" />
      </div>
    </div>
  </section>
);

// Three small artefacts instead of icons: what you watch, run and get.
const VideoArt = () => (
  <div className="relative flex h-full items-center justify-center rounded-xl bg-[#0d0d0d]">
    <span
      style={{ fontFamily: 'Bungee, "Arial Black", sans-serif' }}
      className="absolute left-3 top-2 text-2xl text-primary-wopee"
    >
      EP.1
    </span>
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-wopee">
      <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-black">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-xs text-white">3:00</span>
    <span className="absolute inset-x-3 bottom-3 mr-14 h-1 overflow-hidden rounded-full bg-white/20">
      <span className="block h-full w-1/3 bg-primary-wopee" />
    </span>
  </div>
);

const TerminalArt = () => (
  <div className={cn("flex h-full flex-col justify-center gap-1 rounded-xl px-4 font-mono text-[13px]", codeSurface)}>
    <span className="text-gray-400">$ npm run check -- t1</span>
    <span className="text-gray-300">
      <span className="text-green-400">PASS</span> pass where right
    </span>
    <span className="text-gray-300">
      <span className="text-green-400">PASS</span> fail where wrong
    </span>
    <span className="font-bold text-green-400">✓ 8/8 · code t1-K3M7…</span>
  </div>
);

const CertArt = () => (
  <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white text-gray-900 dark:bg-gray-100 shadow-sm ring-1 ring-gray-200 dark:ring-white/10">
    <span className="h-2 bg-secondary-wopee" />
    <div className="flex flex-1 flex-col justify-center gap-1 px-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-wopee">Completion</span>
      <span className="text-sm font-bold leading-tight">Agentic testing for testers</span>
      <span className="mt-1 h-1.5 w-24 rounded bg-gray-200" />
      <span className="h-1.5 w-16 rounded bg-gray-200" />
    </div>
    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary-wopee text-white">
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
        <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </div>
);

const ARTS = [VideoArt, TerminalArt, CertArt];

const HowItWorks = () => (
  <section aria-labelledby="steps-h" className={cn(container, "py-14 lg:py-20")}>
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="steps-h" className={h2}>
          How it <span className={accentH2}>works</span>
        </h2>
        <p className="m-0 mt-3 text-balance text-lg text-gray-700 dark:text-gray-300">
          All free. Email only for the certificate.
        </p>
      </div>
      <ol className="relative m-0 mt-10 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-6 lg:gap-8">
        <span
          aria-hidden="true"
          className="absolute left-[16.6%] right-[16.6%] top-[11.125rem] hidden h-px bg-gradient-to-r from-secondary-wopee/40 via-purple-400/40 to-primary-wopee/60 md:block"
        />
        {STEPS.map(({ title, body }, i) => {
          const Art = ARTS[i];
          return (
            <li key={title} className="flex flex-col">
              <div aria-hidden="true" className="h-36">
                <Art />
              </div>
              <span
                aria-hidden="true"
                className="relative z-10 mx-auto mt-4 hidden h-9 w-9 items-center justify-center rounded-full border border-solid border-secondary-wopee/40 bg-white font-mono text-sm font-bold text-secondary-wopee dark:border-white/20 dark:bg-[#1b1b1d] dark:text-gray-200 md:flex md:self-center"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 mt-4 text-center text-lg font-bold md:mt-3">
                <span className="font-mono text-secondary-wopee dark:text-gray-400 md:hidden">
                  {String(i + 1).padStart(2, "0")} ·{" "}
                </span>
                {title}
              </h3>
              <p className="m-0 mt-1 text-center text-gray-700 dark:text-gray-300">{body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

// Only "Live" gets a badge; "coming soon" is said once, in the section subhead.
const StatusBadge = ({ t }: { t: Tutorial }) =>
  t.status === "live" ? (
    <Badge className="border-transparent bg-green-700 text-white shadow-none hover:bg-green-700 uppercase tracking-wide font-bold">
      Live
    </Badge>
  ) : null;

const TutorialCard = ({ t, lead }: { t: Tutorial; lead: boolean }) => {
  const live = t.status === "live";
  return (
    <li className={cn("list-none", lead && "md:col-span-2 lg:col-span-1 lg:row-span-2")}>
      <Link
        to={tutorialUrl(t)}
        className={cn(
          "group block h-full rounded-2xl text-inherit hover:text-inherit hover:no-underline",
          focusRing,
        )}
      >
        <GradientCard
          variant="default"
          padding="none"
          className={cn("h-full transition-[box-shadow,transform] group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0", lead ? "shadow-purple-900/40 group-hover:shadow-purple-900/60" : "shadow-purple-900/20 group-hover:shadow-purple-900/40")}
          innerClassName="flex flex-col dark:bg-[#232326]"
        >
          {lead && (
            <div className="relative flex h-24 items-center gap-4 overflow-hidden rounded-t-[14px] bg-[#0d0d0d] px-6 sm:h-28 lg:h-32">
              <span
                style={{ fontFamily: 'Bungee, "Arial Black", sans-serif' }}
                className="text-3xl uppercase leading-none text-primary-wopee sm:text-4xl"
              >
                EP.1
              </span>
              <span className="absolute bottom-3 right-4 font-mono text-sm text-red-300">
                order total: $36.43 <strong>≠</strong> $30.04
              </span>
            </div>
          )}
          <div className={cn("flex flex-1 flex-col", lead ? "p-6 sm:p-8" : "p-5 sm:p-6")}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-bold text-secondary-wopee dark:text-gray-300">{t.id}</span>
              <StatusBadge t={t} />
              {t.duration && <span className="text-sm text-gray-600 dark:text-gray-400">{t.duration}</span>}
            </div>
            <h3 className={cn("m-0 mt-3 font-bold leading-snug tracking-tight text-balance", lead ? "text-2xl sm:text-3xl" : "text-xl")}>
              {cardTitle(t)}
            </h3>
            <p className="m-0 mt-2 flex-1 text-gray-700 dark:text-gray-300">{t.oneLiner}</p>
            <span className="mt-5 text-sm font-semibold text-secondary-wopee underline-offset-4 group-hover:underline dark:text-gray-100 dark:underline dark:decoration-primary-wopee/60 dark:group-hover:text-primary-wopee">
              {live ? "Start the tutorial →" : "See the tutorial →"}
            </span>
          </div>
        </GradientCard>
      </Link>
    </li>
  );
};

const Tutorials = () => (
  <section
    id="tutorials"
    aria-labelledby="tutorials-h"
    className="bg-gray-50 py-14 dark:bg-white/[0.02] lg:py-20 scroll-mt-16"
  >
    <div className={container}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="tutorials-h" className={h2}>
            The first <span className={accentH2}>three tutorials</span>
          </h2>
          <p className="m-0 mt-3 text-balance text-lg text-gray-700 dark:text-gray-300">
            {t1Live ? "" : "Opening soon. "}Take them in order. All three together earn the Agentic Testing
            Practitioner certificate.
          </p>
        </div>
        <ul className="m-0 mt-10 grid grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
          {featuredTutorials.map((t, i) => (
            <TutorialCard key={t.id} t={t} lead={i === 0} />
          ))}
        </ul>
        {roadmapTutorials.length > 0 && (
          <Expander
            className="mt-8 rounded-2xl dark:bg-[#232326]"
            summary={`${roadmapTutorials.length} more coming, from Playwright basics to rolling out AI testing in a team`}
          >
            <ol className="m-0 grid list-none gap-x-8 gap-y-3 p-0 md:grid-cols-2">
              {roadmapTutorials.map((t) => (
                <li key={t.id} className="flex gap-3">
                  <span className="w-9 flex-shrink-0 font-mono text-sm font-bold text-secondary-wopee dark:text-gray-400">
                    {t.id}
                  </span>
                  <span>
                    <span className="font-semibold">{cardTitle(t)}</span>
                    {t.tag && (
                      <span className="ml-2 whitespace-nowrap rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-300">
                        {t.tag}
                      </span>
                    )}
                    <span className="block text-sm text-gray-600 dark:text-gray-400">{t.oneLiner}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Expander>
        )}
      </div>
    </div>
  </section>
);

// The two closing cards share the tutorial cards' surface, so the page ends on one grid.
const BottomCard = ({
  id,
  title,
  children,
  to,
  cta,
  media,
}: {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  to: string;
  cta: string;
  media?: React.ReactNode;
}) => (
  <section aria-labelledby={id} className="h-full">
    <GradientCard
      variant="default"
      padding="none"
      className="h-full shadow-purple-900/20"
      innerClassName="flex h-full flex-col gap-4 p-5 sm:flex-row sm:gap-5 sm:p-6 dark:bg-[#232326]"
    >
      {media}
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 id={id} className="m-0 text-xl font-bold leading-snug tracking-tight">
          {title}
        </h2>
        <p className="m-0 mt-2 flex-1 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>
        <Link to={to} className={cn(standaloneLink, "self-start whitespace-nowrap")}>
          {cta}
        </Link>
      </div>
    </GradientCard>
  </section>
);

const BottomCards = () => {
  const photo = useBaseUrl("/img/learn/marcel.jpg");
  return (
    <div className={cn(container, "py-14 lg:py-20")}>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2 lg:gap-8">
        <BottomCard
          id="why-h"
          title={
            <>
              Made with AI, <span className={accentH2}>checked by me</span>
            </>
          }
          to="/learn/how-we-make-this/"
          cta="How I make this course →"
          media={
            <img
              src={photo}
              alt="Marcel Veselka"
              width={128}
              height={128}
              loading="eager"
              decoding="async"
              className="h-16 w-16 flex-shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
            />
          }
        >
          {whyAiSummary}
        </BottomCard>
        <BottomCard id="teams-h" title="Training a QA team?" to="/learn/teams/" cta="Run it with your team →">
          A team plan, a pitch for your manager and answers for your security team.
        </BottomCard>
      </div>
    </div>
  );
};

// Ends like every product page: the site's yellow (dark: purple) closing gradient.
const NotifyBand = () => (
  <section
    id="notify"
    aria-labelledby="notify-h"
    className="scroll-mt-24 border-0 border-b border-solid border-black/5 bg-gradient-to-b from-transparent to-primary-wopee/50 dark:border-white/5 dark:to-secondary-wopee/60"
  >
    <div className={cn(container, "pb-14 pt-10 lg:pb-20 lg:pt-14")}>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-end gap-6 lg:grid-cols-2 lg:gap-8">
        <h2 id="notify-h" className={h2}>
          Get an email when a tutorial opens
        </h2>
        <NotifyInline id="cta-learn-notify-band" cta={NOTIFY_CTA} note={NOTIFY_NOTE} />
      </div>
    </div>
  </section>
);

const LearnPage = () => (
  <Layout title={TITLE} description={DESCRIPTION}>
    <PageMetadata image="/img/learn/learn-og.jpg" />
    <Head>
      <script type="application/ld+json">{JSON.stringify(JSONLD)}</script>
    </Head>
    <main>
      <Hero />
      <HowItWorks />
      <Tutorials />
      <BottomCards />
      <NotifyBand />
    </main>
  </Layout>
);

export default LearnPage;
