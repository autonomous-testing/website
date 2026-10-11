import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import { BadgeCheck, FlaskConical, SearchCheck } from "lucide-react";

import VideoBlock from "@/components/learn/VideoBlock";
import HowThisWasMade from "@/components/learn/HowThisWasMade";
import Expander from "@/components/learn/Expander";
import TryWidget from "@/components/learn/t1/TryWidget";
import LabTracker from "@/components/learn/t1/LabTracker";
import { CheckTabs, CompletionCodeForm } from "@/components/learn/t1/CheckSection";
import Quiz from "@/components/learn/t1/Quiz";
import Certificate from "@/components/learn/t1/Certificate";
import {
  Eyebrow,
  SectionTitle,
  Callout,
  CodeBlock,
  ExternalLink,
} from "@/components/learn/t1/shared";
import { learnConfig } from "@/data/learn-config";
import { t1Chapters, t1Links, t1Steps, t1StopAfter } from "@/data/learn-t1";
import { tutorials, tutorialUrl } from "@/data/learn-tutorials";
import { cn } from "@/lib/utils";

const TITLE = "Agentic Testing with Playwright's AI Agents: Free Tutorial";
const DESCRIPTION =
  "Free hands-on tutorial for QA testers: run Playwright's planner, generator and healer on a demo app and check every test they write. Browser lab, automatic grade, LinkedIn certificate.";

const launched = learnConfig.t1.launched;
const next = tutorials.find((t) => t.id === "T2");
const teamsHref = "/learn/teams/?utm_source=learn&utm_medium=page&utm_campaign=learn-t1";

const linkCls =
  "font-semibold text-secondary-wopee dark:text-primary-wopee underline underline-offset-2";

const Section = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-h`}
    className={cn("container px-5 lg:px-10 py-7 sm:py-10 lg:py-14 scroll-mt-20", className)}
  >
    <div className="mx-auto max-w-4xl">{children}</div>
  </section>
);

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const LabButton = () =>
  launched ? (
    <a
      href={t1Links.codespaces}
      target="_blank"
      rel="noopener noreferrer"
      id="cta-t1-open-lab"
      className={cn(primaryBtn, "bg-secondary-wopee text-white hover:bg-purple-800 hover:text-white dark:bg-primary-wopee dark:text-secondary-wopee dark:hover:bg-yellow-300 dark:hover:text-secondary-wopee")}
    >
      Open the free lab
    </a>
  ) : (
    <span
      aria-disabled="true"
      className={cn(primaryBtn, "cursor-not-allowed bg-gray-200 text-gray-600 dark:bg-gray-800/70 dark:text-gray-400")}
    >
      Open the lab · at launch
    </span>
  );

const Hero = () => (
  <header className="bg-gradient-to-b from-secondary-wopee/10 to-transparent dark:from-secondary-wopee/25">
    <div className="container px-5 lg:px-10 pt-5 pb-5 lg:pt-12 lg:pb-8">
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm opacity-80">
          <Link to="/learn/" className="font-semibold text-secondary-wopee dark:text-primary-wopee">
            Learn
          </Link>{" "}
          / Tutorial 1
        </nav>
        <p className="m-0 mt-4 text-sm font-bold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee">
          Tutorial 1 · free
        </p>
        <h1 className="mt-2 mb-0 text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-balance">
          Agentic testing with{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee">Playwright's AI agents</span>
        </h1>
        <p className="m-0 mt-4 text-lg sm:text-2xl leading-snug opacity-90 max-w-3xl">
          Run Playwright's planner, generator and healer on a demo app, then
          check every test they write. No coding experience needed.
        </p>
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0 text-sm">
          {["About 2 hours", "Lab in your browser", "Automatic grade", "LinkedIn certificate"].map((c) => (
            <li
              key={c}
              className="rounded-full border border-solid border-gray-200 bg-white/70 dark:border-white/10 dark:bg-white/5 px-3 py-1 font-semibold"
            >
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          {launched ? (
            <>
              <LabButton />
              <a href="#try" className="font-semibold text-secondary-wopee dark:text-primary-wopee">
                Try the 60-second test ↓
              </a>
            </>
          ) : (
            <>
              <a
                href="#try"
                className={cn(primaryBtn, "bg-secondary-wopee text-white hover:bg-purple-800 hover:text-white dark:bg-primary-wopee dark:text-secondary-wopee dark:hover:bg-yellow-300 dark:hover:text-secondary-wopee")}
              >
                Try the 60-second test ↓
              </a>
              <LabButton />
            </>
          )}
        </div>
        <p className="m-0 mt-3 text-sm opacity-80">
          {launched ? (
            <>
              Free GitHub account needed. Not now?{" "}
              <ExternalLink href={t1Links.calendar}>Add 2 hours to your calendar</ExternalLink>.
              Prefer your laptop?{" "}
              <ExternalLink href={t1Links.localSetup}>Local setup</ExternalLink>.
            </>
          ) : (
            <>
              Not open yet.{" "}
              <Link to="/learn/#notify" className={linkCls}>
                Get one email at launch
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </div>
  </header>
);

const STEPS = [
  { Icon: SearchCheck, title: "Watch a 3-minute video", body: "One idea, explained with a real test run, plus a 60-second exercise." },
  { Icon: FlaskConical, title: "Do the lab in your browser", body: "Run Playwright's AI agents on a demo food-delivery app and fix what they get wrong." },
  { Icon: BadgeCheck, title: "Get graded, get certified", body: "An automatic check grades your tests. Pass the quiz, then add the certificate to LinkedIn." },
];

const HowItWorks = () => (
  <Section id="steps">
    <SectionTitle id="steps-h">How it works</SectionTitle>
    <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
      {STEPS.map(({ Icon, title, body }, i) => (
        <li key={title} className="flex gap-4 md:flex-col md:gap-3">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary-wopee/10 text-secondary-wopee dark:bg-primary-wopee/10 dark:text-primary-wopee">
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
  </Section>
);

const Divider = () => (
  <div className="container px-5 lg:px-10">
    <hr className="mx-auto max-w-4xl border-0 border-t border-solid border-gray-200 dark:border-gray-800 m-0" />
  </div>
);

const Concepts = () => (
  <div className="flex flex-col gap-4">
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        ["Scripted", "You decide", "You write every step and every check."],
        ["AI-assisted", "You still decide", "A copilot suggests code, and you still decide the steps."],
        ["Agentic", "The agent proposes", "You give a goal. The agent plans, acts, observes and judges in a loop until it thinks it's done."],
      ].map(([h, who, p], i) => (
        <div
          key={h}
          className={cn(
            "rounded-xl border border-solid p-4",
            i === 2
              ? "border-secondary-wopee dark:border-primary-wopee bg-secondary-wopee/5 dark:bg-primary-wopee/5"
              : "border-gray-200 dark:border-gray-800",
          )}
        >
          <h3 className="m-0 text-lg font-bold">{h}</h3>
          <p className="m-0 mt-1 text-sm font-semibold text-secondary-wopee dark:text-primary-wopee">{who}</p>
          <p className="m-0 mt-2 opacity-85">{p}</p>
        </div>
      ))}
    </div>
    <p className="m-0">
      The weak spot is the judging. An agent needs an <strong>oracle</strong>,
      a source of truth for what "correct" means. For our demo app, FoodDash,
      that's the spec, not the app.
    </p>
    <p className="m-0">
      <strong>You stay in the loop in four places:</strong> you choose the
      oracle, review the plan, review every assertion and every fix, and judge
      flakiness over several runs.
    </p>
    <p className="m-0">
      <strong>Playwright's three agents</strong> are set up with one command.
      They reach Playwright through its test-runner <strong>MCP server</strong>.
      MCP is a standard plug that lets an AI agent use a tool; tutorial 2 is
      all about it. Each agent starts from a seed test that opens the app.
    </p>
    <div className="grid gap-3">
      {[
        ["Planner", "writes: a plan", "Explores the app and writes a plan in plain English. It has no file-edit tool, but it can run code in the browser, and by default on your machine. The lab removes that last tool."],
        ["Generator", "writes: new test files", "Replays the plan in a real browser and writes new test files. Its expected values come from what it saw."],
        ["Healer", "edits: any test file", null],
      ].map(([name, may, body]) => (
        <div key={name} className="rounded-xl border border-solid border-gray-200 dark:border-gray-800 p-4">
          <p className="m-0 flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold">{name}</span>
            <span className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 font-mono text-xs">{may}</span>
          </p>
          <p className="m-0 mt-2 opacity-85">
            {body ?? (
              <>
                Runs, debugs and edits your tests until they pass. If it
                decides the app is broken, it marks the test{" "}
                <code>fixme</code>, which means skipped.
              </>
            )}
          </p>
        </div>
      ))}
    </div>
    <p className="m-0 text-sm opacity-75">
      On Copilot Free, delete the <code>model:</code> line the setup writes
      into each agent file. The lab does it for you.
    </p>
  </div>
);

const T1Page = () => (
  <Layout title={TITLE} description={DESCRIPTION}>
    <PageMetadata image="/img/learn/learn-og.jpg" />
    {!launched && (
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    )}
    <main>
      <Hero />

      <Section id="try" className="pt-2 sm:pt-4 lg:pt-6">
        <Eyebrow>60 seconds</Eyebrow>
        <SectionTitle id="try-h">Is this test correct?</SectionTitle>
        <p className="mb-5 text-lg">
          An AI agent wrote this test. It passes. The spec, the written rules
          for the app: <em>orders over $25 get 20 % off food, delivery $2.99,
          service $1.50.</em>
        </p>
        <TryWidget />
      </Section>

      <Divider />
      <HowItWorks />

      {learnConfig.t1.videoId && (
        <>
          <Divider />
          <Section id="video">
            <Eyebrow>Green is not correct · 3 min</Eyebrow>
            <SectionTitle id="video-h">Watch first</SectionTitle>
            <VideoBlock
              videoId={learnConfig.t1.videoId}
              title="Green is not correct: T1 part 1"
              comingLabel=""
            />
            <p className="mt-3 text-sm opacity-70">
              AI voice of Marcel. Script, test runs and results are real.
            </p>
            <Callout label="Predict.">
              An agent tests checkout with an empty form. What will its test
              expect?
            </Callout>
            <Expander className="mt-4" summary="Chapters of the full 11-minute video">
              <ol className="m-0 grid list-none gap-x-8 gap-y-1.5 p-0 sm:grid-cols-2">
                {t1Chapters.map(([t, label]) => (
                  <li key={t} className="flex gap-3">
                    <time className="w-12 flex-shrink-0 font-mono text-sm opacity-60">{t}</time>
                    <span>{label}</span>
                  </li>
                ))}
              </ol>
            </Expander>
          </Section>
        </>
      )}

      <Divider />

      <Section id="learn">
        <SectionTitle id="learn-h">What you'll learn</SectionTitle>
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2 text-base sm:text-lg">
          {[
            "Tell scripted, AI-assisted and agentic testing apart",
            "Run Playwright's three AI agents and know what each may change",
            'Make the spec, not the app, decide what "correct" means',
            "Review an agent's test in 5 minutes",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-green-600 dark:text-green-400">✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Divider />

      <Section id="before">
        <SectionTitle id="before-h">Before you start</SectionTitle>
        <ul className="m-0 flex list-none flex-col gap-2 p-0 text-base sm:text-lg">
          {[
            <>A free <strong>GitHub account</strong>. That's all you need.</>,
            <><strong>Copilot Free</strong> is optional: 5 prompts. Every step also works without AI.</>,
            <>Never written code? You'll read and edit tests, not write them.</>,
            <>Two sittings are fine. Your work waits for you.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-green-600 dark:text-green-400">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Expander className="mt-4" summary="Details: free hours, prompts, fast lane">
          <ul className="m-0 flex flex-col gap-2 pl-5">
            <li>
              The lab runs in <strong>GitHub Codespaces</strong>, a computer in
              the cloud with VS Code in your browser: about 60 free hours a
              month on the default machine. This lab uses about 2.
            </li>
            <li>
              Turn on <strong>GitHub Copilot Free</strong> in your{" "}
              <ExternalLink href={t1Links.copilotSettings}>GitHub settings</ExternalLink>.
              This lab uses 5 chat prompts, 6 with one retry. All three
              tutorials together: up to about 20 Copilot prompts, spread over
              two months, or use the no-AI paths.
            </li>
            <li>
              <strong>First time with code?</strong> Plan two sittings: steps 0
              to 2, then 3 and 4. Stop the codespace in between and your work
              waits for you. The lab starts with a short guide to reading a test.
            </li>
            <li>
              <strong>Done this kind of thing before?</strong> Answer three
              questions; at 3 of 3, go straight to step 3 and the boss challenge.
            </li>
            <li>
              <strong>Taking this with your team?</strong> Company accounts,
              cohorts and a facilitator guide:{" "}
              <Link to={teamsHref} className={linkCls}>For QA leads</Link>
            </li>
          </ul>
        </Expander>
      </Section>

      <Divider />

      <Section id="concepts">
        <Eyebrow>The ideas</Eyebrow>
        <SectionTitle id="concepts-h">Who decides what "pass" means?</SectionTitle>
        <p className="m-0 text-lg">
          Scripted: you. AI-assisted: still you. Agentic: the agent proposes,
          and you check it against the spec.
        </p>
        <Expander className="mt-4" summary="The ideas in 5 minutes">
          <Concepts />
        </Expander>
      </Section>

      <Divider />

      <Section id="lab">
        <Eyebrow>60 to 90 min · GitHub Codespaces</Eyebrow>
        <SectionTitle id="lab-h">The lab: 6 steps</SectionTitle>
        <p className="m-0 mb-4 text-lg">
          Some of your tests will <strong>fail</strong>. That's the point:
          where the app breaks the spec, the failing test is your finding.
        </p>
        <ol className="m-0 grid list-none gap-1.5 p-0 sm:grid-cols-2 sm:gap-x-8">
          {t1Steps.map((s) => (
            <li key={s.key} className="flex gap-3">
              <span className="w-7 flex-shrink-0 font-mono font-bold text-secondary-wopee dark:text-primary-wopee">
                {s.key}
              </span>
              <span>
                {s.title} <span className="text-sm opacity-60">· {s.time}</span>
                {s.key === t1StopAfter && (
                  <span className="block text-sm opacity-70">Good place to stop.</span>
                )}
              </span>
            </li>
          ))}
        </ol>
        <Expander className="mt-5" summary="Open the step tracker: what you do, checkpoints, clips">
          <LabTracker />
        </Expander>
        <Expander className="mt-3" summary="Stuck? Hints and reset">
          <p className="m-0">
            In the terminal, <code>npm run check -- t1 --step N --hint 1</code>{" "}
            gives a nudge; <code>--hint 2</code> the shape; <code>--hint 3</code>{" "}
            the answer. <code>npm run reset -- t1 cpN</code> goes back to your
            last passed checkpoint. Still stuck after 10 minutes?{" "}
            <ExternalLink href={t1Links.discussions}>Ask in Discussions</ExternalLink>{" "}
            and tell us the step.
          </p>
        </Expander>
        <Expander className="mt-3" summary="Before step 4: before you trust a pass (2.5 min clip)">
          <p className="m-0">
            In our own rehearsal, the generator expected an order total of
            $36.43. The spec says $30.04. The healer kept the wrong value,
            swapped readable locators for positions, and reported "passing
            consistently". Three runs with retries off: it failed once.
          </p>
          <p className="m-0 mt-2">
            Before you trust a pass: run it several times with retries off,
            search for <code>test.fixme</code> and <code>test.skip</code>, and
            read the diff. Three runs is a quick smoke check. To call a test
            stable, run it 20 times.
          </p>
          <CodeBlock>{`npx playwright test --retries=0 --repeat-each=3   # smoke
npx playwright test --retries=0 --repeat-each=20  # stability
git grep -nE "test\\.(fixme|skip)"
git diff`}</CodeBlock>
        </Expander>
        <Expander className="mt-3" summary="After the lab: where agents break (1.5 min clip)">
          <p className="m-0">
            Models differ, and some go silent mid-task. Every run uses quota.
            Two runs of one prompt can give different tests. Agents copy what
            they find, including answer keys. And no agent checks an intent
            nobody wrote down.
          </p>
          <p className="m-0 mt-2">
            <strong>When not to use an agent:</strong> for regression runs.
            Once a test is reviewed, run it as plain Playwright in CI, with no
            model in the loop: same answer every time, no tokens. Agents earn
            their keep writing, exploring and triaging.
          </p>
          <h3 className="mt-4 text-lg font-bold">Recap</h3>
          <ul className="m-0 mt-2 pl-5 [&_li]:mt-1">
            <li>Agentic = the agent plans its own steps and proposes what "pass" means.</li>
            <li>The planner plans, the generator writes what it sees, the healer optimises for green.</li>
            <li>The spec is your oracle. Green is not correct until you've checked it.</li>
          </ul>
        </Expander>
      </Section>

      <Divider />

      <Section id="check">
        <SectionTitle id="check-h">Check my work</SectionTitle>
        <p className="m-0">In your codespace terminal, run:</p>
        <CodeBlock>npm run check -- t1</CodeBlock>
        <p className="m-0">
          It checks that your tests pass where the app is right and fail where
          it's wrong. Nothing leaves your codespace. At 8/8 you get a code.
          Paste it here.
        </p>
        <CompletionCodeForm />
        <Expander className="mt-2" summary="See sample output">
          <p className="m-0 text-sm opacity-85">
            It runs your tests against frozen builds of the app, in your
            codespace, and sends nothing anywhere unless you opt in with{" "}
            <code>LEARN_SHARE=1</code>.
          </p>
          <CheckTabs />
        </Expander>
      </Section>

      <Divider />

      <Section id="quiz">
        <Eyebrow>About 8 minutes</Eyebrow>
        <SectionTitle id="quiz-h">Quiz</SectionTitle>
        <p className="m-0 text-lg">
          10 questions, answers explained as you go. 8 of 10 passes. Retake
          anytime.
        </p>
        <Expander className="mt-4" summary="Start the quiz">
          <Quiz />
        </Expander>
      </Section>

      <Divider />

      <Section id="certificate">
        <SectionTitle id="certificate-h">Your certificate</SectionTitle>
        <Certificate />
      </Section>

      <Divider />

      <Section id="after">
        <SectionTitle id="after-h">After the certificate</SectionTitle>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          <li>
            <strong>Boss challenge.</strong> Two more bugs hide in a newer
            build. No hints.{" "}
            <ExternalLink href={t1Links.boss}>Open the boss challenge</ExternalLink>
          </li>
          <li>
            <strong>Going deeper, for test engineers and leads.</strong> Agents
            in a real pipeline, review rules, cost. Stretch task: your first
            agent eval. <ExternalLink href={t1Links.goingDeeper}>Read more</ExternalLink>
          </li>
        </ul>
        {next && (
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-secondary-wopee to-purple-800 p-6 sm:p-8 text-white">
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-primary-wopee">
              Next tutorial
            </p>
            <h3 className="m-0 mt-1 text-2xl font-bold text-white">{next.title}</h3>
            <p className="m-0 mt-2 text-white/90">
              You used an MCP server today without looking inside. Next,
              connect one yourself.
            </p>
            <Link
              to={tutorialUrl(next)}
              className="mt-4 inline-flex rounded-lg bg-primary-wopee px-5 py-2.5 font-semibold text-secondary-wopee hover:text-secondary-wopee hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {next.status === "live" ? "Start the next tutorial" : "Email me when it's out"}
            </Link>
          </div>
        )}
        <p className="m-0 mt-6 text-sm">
          <strong>Try it at scale.</strong> Run an agent on every build, each
          pass checked against recorded evidence.{" "}
          <Link
            to="/?utm_source=learn&utm_medium=page&utm_campaign=learn-t1&utm_content=sidebar"
            className={linkCls}
          >
            Try Wopee.io free
          </Link>
        </p>
      </Section>

      <div className="container px-5 lg:px-10 pb-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-base">
            Training a QA team? Company accounts, cohorts and a facilitator
            guide.{" "}
            <Link to={teamsHref} className={linkCls}>
              For QA leads →
            </Link>
          </p>
          <HowThisWasMade teamsLink={false}>
            <p className="opacity-80 mt-1">
              FoodDash is a demo app built for this course, not affiliated with
              any delivery company.
            </p>
            <p className="opacity-80 mt-1">
              <ExternalLink href={t1Links.goingDeeper}>Agents in a real pipeline</ExternalLink>
              {" · "}
              <ExternalLink href={t1Links.boss}>Boss challenge: FD-10 and FD-11</ExternalLink>
              {" · "}
              <ExternalLink href={t1Links.issues}>Found a problem? Report it on GitHub</ExternalLink>
            </p>
          </HowThisWasMade>
        </div>
      </div>
    </main>
  </Layout>
);

export default T1Page;
