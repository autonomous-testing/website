import React from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { BadgeCheck, FlaskConical, PlayCircle } from "lucide-react";

import LearnButton from "@/components/learn/LearnButton";
import VideoBlock from "@/components/learn/VideoBlock";
import NotifyInline from "@/components/learn/NotifyInline";
import LyingTestCard from "@/components/learn/LyingTestCard";
import Expander from "@/components/learn/Expander";
import HowThisWasMade from "@/components/learn/HowThisWasMade";
import {
  tutorials,
  featuredTutorials,
  roadmapTutorials,
  tutorialUrl,
  cardTitle,
  type Tutorial,
} from "@/data/learn-tutorials";
import { learnConfig } from "@/data/learn-config";
import { whyAiSummary, whyAiPoints } from "@/data/learn-why-ai";
import { cn } from "@/lib/utils";

const TITLE = "Free Hands-on Tutorials on AI Testing Agents";
const DESCRIPTION =
  "Free hands-on tutorials for QA testers: learn to use AI testing agents and check their work. Video, browser lab, automatic grade and a LinkedIn certificate.";

const t1 = tutorials[0];
const t1Live = t1.status === "live";

const STEPS = [
  {
    Icon: PlayCircle,
    title: "Watch a 3-minute video",
    body: "One idea, explained with a real test run.",
  },
  {
    Icon: FlaskConical,
    title: "Do the lab in your browser",
    body: "Runs in GitHub Codespaces, a free browser workspace. AI is optional.",
  },
  {
    Icon: BadgeCheck,
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

const textLink =
  "font-semibold text-secondary-wopee dark:text-primary-wopee underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const Hero = () => (
  <section className="bg-gradient-to-b from-secondary-wopee/10 to-transparent dark:from-secondary-wopee/25">
    <div className="container px-5 lg:px-10 pt-6 pb-4 lg:pt-16 lg:pb-8">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div className="flex min-w-0 flex-col items-start gap-4 sm:gap-5">
          <span className="text-sm font-bold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee">
            Free · for QA testers
          </span>
          <h1 className="m-0 text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-balance">
            Hands-on tutorials on{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              AI testing agents
            </span>
          </h1>
          <p className="m-0 text-lg sm:text-xl opacity-85 max-w-xl text-balance">
            Learn to use Playwright's AI agents, MCP and agent skills, and to
            check every test they write.
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 text-sm">
            {["3-minute video", "Lab in your browser", "Automatic grade", "LinkedIn certificate"].map((c) => (
              <li
                key={c}
                className="rounded-full border border-solid border-gray-200 bg-white/70 dark:border-white/10 dark:bg-white/5 px-3 py-1 font-semibold"
              >
                <span aria-hidden="true" className="mr-1 text-green-600 dark:text-green-400">
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-1 w-full max-w-xl">
            {t1Live ? (
              <div className="flex flex-col items-start gap-3">
                <LearnButton to={tutorialUrl(t1)} id="cta-learn-start-hero">
                  Start Tutorial 1, free
                </LearnButton>
                <a href="#notify" className={cn(textLink, "text-sm")}>
                  Get notified about the next ones
                </a>
              </div>
            ) : (
              <NotifyInline
                id="cta-learn-notify-hero"
                cta="Email me at launch"
                note="One email when Tutorial 1 opens. Unsubscribe anytime."
              />
            )}
          </div>
          {t1.hasPage ? (
            <Link to={`${tutorialUrl(t1)}#try`} className={cn(textLink, "text-sm")}>
              Try the 60-second test →
            </Link>
          ) : (
            <a href="#tutorials" className={cn(textLink, "text-sm")}>
              See the tutorials ↓
            </a>
          )}
        </div>
        <LyingTestCard className="w-full max-w-xl lg:max-w-none mx-auto" />
      </div>
    </div>
  </section>
);

// Hidden until the intro video exists: no empty poster in the second screen.
const Intro = () =>
  learnConfig.introVideoId ? (
    <section aria-labelledby="intro-h" className="container px-5 lg:px-10 pb-12 lg:pb-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee">
          Green is not correct · 3 min
        </p>
        <h2 id="intro-h" className="sr-only">
          Intro video
        </h2>
        <VideoBlock
          videoId={learnConfig.introVideoId}
          poster={learnConfig.introPoster}
          title="Green Is Not Correct: what this series teaches"
          comingLabel=""
        />
        <p className="mt-3 text-sm opacity-70">
          AI voice of Marcel. Script, test runs and results are real.
        </p>
      </div>
    </section>
  ) : null;

const HowItWorks = () => (
  <section aria-labelledby="steps-h" className="container px-5 lg:px-10 py-10 lg:py-16">
    <div className="mx-auto max-w-6xl">
      <h2 id="steps-h" className="text-3xl sm:text-4xl font-bold mb-6 lg:mb-8">
        How it works
      </h2>
      <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-3 lg:gap-6">
        {STEPS.map(({ Icon, title, body }, i) => (
          <li key={title} className="flex gap-4 md:flex-col md:gap-3">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary-wopee/10 text-secondary-wopee dark:bg-primary-wopee/10 dark:text-primary-wopee">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="m-0 text-lg font-bold">
                <span className="opacity-60">{i + 1}.</span> {title}
              </h3>
              <p className="m-0 mt-1 opacity-80">{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="m-0 mt-6 text-sm font-semibold opacity-75">
        All free. Email only for the certificate.
      </p>
    </div>
  </section>
);

const StatusBadge = ({ t }: { t: Tutorial }) =>
  t.status === "live" ? (
    <span className="rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
      Live
    </span>
  ) : (
    <span className="rounded-full bg-gray-200 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
      Coming soon
    </span>
  );

const TutorialCard = ({ t, lead }: { t: Tutorial; lead: boolean }) => {
  const live = t.status === "live";
  return (
    <li className="list-none">
      <Link
        to={tutorialUrl(t)}
        className={cn(
          "flex h-full flex-col rounded-2xl border border-solid p-5 sm:p-6 transition-colors bg-white dark:bg-gray-900",
          "text-inherit hover:text-inherit hover:no-underline hover:border-secondary-wopee dark:hover:border-primary-wopee",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee",
          lead
            ? "border-secondary-wopee/50 dark:border-primary-wopee/50"
            : "border-gray-200 dark:border-gray-800",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm font-bold text-secondary-wopee dark:text-primary-wopee">
            {t.id}
          </span>
          <StatusBadge t={t} />
          {t.duration && <span className="text-sm opacity-70">{t.duration}</span>}
        </div>
        <h3 className="m-0 mt-3 text-xl font-bold leading-snug">{cardTitle(t)}</h3>
        <p className="m-0 mt-2 flex-1 opacity-80">{t.oneLiner}</p>
        <span className="mt-4 text-sm font-semibold text-secondary-wopee dark:text-primary-wopee">
          {live ? "Start the tutorial →" : t.hasPage ? "Preview it →" : "Get notified →"}
        </span>
      </Link>
    </li>
  );
};

const Tutorials = () => (
  <section
    id="tutorials"
    aria-labelledby="tutorials-h"
    className="bg-gray-50 dark:bg-gray-900/50 py-10 lg:py-16 scroll-mt-16"
  >
    <div className="container px-5 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 id="tutorials-h" className="text-3xl sm:text-4xl font-bold mb-2">
          The first three tutorials
        </h2>
        <p className="m-0 mb-6 lg:mb-8 text-lg opacity-80">
          Take them in order. All three together earn the Agentic Testing Practitioner certificate.
        </p>
        <ul className="m-0 grid grid-cols-1 gap-4 p-0 md:grid-cols-3 lg:gap-6">
          {featuredTutorials.map((t, i) => (
            <TutorialCard key={t.id} t={t} lead={i === 0} />
          ))}
        </ul>
        {roadmapTutorials.length > 0 && (
          <Expander
            className="mt-6"
            summary={`${roadmapTutorials.length} more coming, from Playwright basics to rolling out AI testing in a team`}
          >
            <ol className="m-0 grid list-none gap-x-8 gap-y-3 p-0 md:grid-cols-2">
              {roadmapTutorials.map((t) => (
                <li key={t.id} className="flex gap-3">
                  <span className="w-9 flex-shrink-0 font-mono text-sm font-bold text-secondary-wopee dark:text-primary-wopee">
                    {t.id}
                  </span>
                  <span>
                    <span className="font-semibold">{cardTitle(t)}</span>
                    {t.tag && (
                      <span className="ml-2 whitespace-nowrap rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-semibold opacity-80">
                        {t.tag}
                      </span>
                    )}
                    <span className="block text-sm opacity-75">{t.oneLiner}</span>
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

const MadeWithAI = () => {
  const photo = useBaseUrl("/img/team/marcel.jpg");
  return (
    <section aria-labelledby="why-h" className="container px-5 lg:px-10 py-10 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <h2 id="why-h" className="text-2xl sm:text-3xl font-bold mb-4">
          Made with AI, checked by me
        </h2>
        <div className="flex items-start gap-4">
          <img
            src={photo}
            alt="Marcel Veselka"
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="m-0 text-base sm:text-lg leading-relaxed">{whyAiSummary}</p>
            <p className="m-0 mt-2 text-sm opacity-70">
              Marcel Veselka · Founder of Wopee.io
            </p>
          </div>
        </div>
        <Expander className="mt-5" summary="Read my 5 reasons">
          <ol className="m-0 flex list-none flex-col gap-3 p-0">
            {whyAiPoints.map((text, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-solid border-secondary-wopee/40 dark:border-primary-wopee/40 text-xs font-bold text-secondary-wopee dark:text-primary-wopee"
                >
                  {i + 1}
                </span>
                <p className="m-0 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </Expander>
      </div>
    </section>
  );
};

const NotifyBand = () => (
  <section id="notify" aria-labelledby="notify-h" className="container px-5 lg:px-10 pb-10 scroll-mt-24">
    <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-br from-secondary-wopee to-purple-800 dark:to-purple-900 p-6 sm:p-10 text-white">
      <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="m-0 text-xs font-bold uppercase tracking-widest text-primary-wopee">
            Notify me
          </p>
          <h2 id="notify-h" className="m-0 mt-1 text-2xl sm:text-3xl font-bold text-white">
            Get an email when a tutorial opens
          </h2>
        </div>
        <NotifyInline
          id="cta-learn-notify-band"
          tone="dark"
          cta="Notify me"
          note="One email per new tutorial, from Wopee.io. Unsubscribe anytime."
        />
      </div>
    </div>
  </section>
);

const TeamsLine = () => (
  <div className="container px-5 lg:px-10 pb-6">
    <p className="mx-auto max-w-6xl m-0 text-base">
      Training a QA team? Company accounts, cohorts and a facilitator guide.{" "}
      <Link to="/learn/teams/" className={textLink}>
        For QA leads →
      </Link>
    </p>
  </div>
);

const LearnPage = () => (
  <Layout title={TITLE} description={DESCRIPTION}>
    <PageMetadata image="/img/learn/learn-og.jpg" />
    <Head>
      <script type="application/ld+json">{JSON.stringify(JSONLD)}</script>
    </Head>
    <main>
      <Hero />
      <Intro />
      <HowItWorks />
      <Tutorials />
      <MadeWithAI />
      <NotifyBand />
      <TeamsLine />
      <div className="container px-5 lg:px-10 pb-16">
        <HowThisWasMade className="mx-auto max-w-6xl" teamsLink={false} />
      </div>
    </main>
  </Layout>
);

export default LearnPage;
