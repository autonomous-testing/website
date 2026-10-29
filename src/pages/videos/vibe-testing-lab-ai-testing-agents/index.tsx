import React, { useState } from "react";

import { Head, Layout, Link } from "../../../components/ui/typedDocusaurus";

const VIDEO_ID = "d-KRA2M5bwE";
const TITLE =
  "I tested 4 AI testing agents on one app. Which one reported the truth?";
const PAGE_URL = "https://wopee.io/videos/vibe-testing-lab-ai-testing-agents/";
const WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}`;
const DOCS_START = "https://docs.wopee.io/getting-started/";
const DOCS_MCP = "https://docs.wopee.io/guides/wopee-mcp/";
const WORKSHOP_REPO = "https://github.com/Wopee-io/tf-2026-vibe-testing";
const BOOK_DEMO = "/book-demo/";
const DURATION_SECONDS = 1376;

const SUMMARY =
  "The talk part of the Vibe Testing Lab, a full-day hands-on workshop Marcel Veselka, founder of Wopee.io, ran at Tesena Fest in Prague. Four ways to test a web app with AI agents, on one demo app and one task: a coding agent on its own, Playwright's test agents, the Playwright CLI with skills, and Wopee.io, including its MCP server. You'll see the new stack (coding agent, SKILL.md skills, command line and MCP), intent-driven testing, how to pick a model, and what each tool got wrong in our runs.";

type Chapter = { start: number; title: string; text: string };

const CHAPTERS: Chapter[] = [
  {
    start: 0,
    title: "Welcome",
    text: "\"Passing consistently.\" That's what Playwright's healer agent said, right after it fixed our failing test. We ran the test three more times, with retries off. It failed once. Green is not correct. Today: four AI testing tools, one app, one task. Including the one I build. You'll see where each one breaks, and what catches it. So who judges?\n\nHi, I'm Marcel Veselka. Welcome to the Vibe Testing Lab. It's about AI agents, MCP and the new stack for testing web apps. I ran it as a full-day, hands-on workshop at Tesena Fest in Prague. Four AI testing tools, one demo app, one task.\n\nFirst, who am I? I founded Tesena, a software testing company, and later Wopee.io. Wopee.io is an AI testing agent for apps. So I build one of the tools in this video. That's why I make one promise: every tool gets a fair test, including mine. And why a zookeeper? Because we're about to visit a zoo of AI testing tools.",
  },
  {
    start: 68,
    title: "The speed gap",
    text: "Let's start with a quick diagnostic. It takes one minute, and you only need two numbers. The first number is for development: how long does your team need to ship a feature, from ticket to merge? The second number is for testing: how long until you trust that feature in production? The distance between those two numbers is the speed gap.\n\nAnd with AI coding agents, that gap is growing. Google's DORA research on AI-assisted development shows it clearly. AI helps teams ship code faster, but it also brings more change failures and more rework. In GitLab's survey this year, eighty-five percent agreed on one thing: AI moved the bottleneck from writing code to reviewing and validating it.\n\nSo that's the goal for the rest of this video: close the gap between those two numbers. Write them down and keep them. We come back to them at the end.",
  },
  {
    start: 120,
    title: "The new stack",
    text: "First, the new stack. It's the minimum theory you need before you touch any tool. Four pieces, one loop. And one hard question: who judges the result?\n\nThis is the mood of 2026. Developers have mostly stopped typing code. The agent writes it. The developer asks, reviews and approves. So code is no longer the slow part. Something else is. Let me show you what.\n\nIn August, Anthropic published a playbook for AI-native software delivery. It splits the lifecycle into six stages. It starts with an intent file: what do we want, and why? Then a spec: what exactly must be true? Then a plan, and the agent writes the code. Now look at stage four. The agent proves its own fix with a test it wrote. Keep that in mind. Who checks that test? Then review and release gates. And what we learn in production flows back into a new intent. Every stage leaves a file that the next stage reads.\n\nSo what does this mean for us testers? Here is my answer. We shape the work, and we maintain it. We define the rules for what correct means. And we manage the whole process. Is that a new role, or a skill every engineer needs? Honestly, nobody knows yet.",
  },
  {
    start: 201,
    title: "Intent-driven testing and the judge",
    text: "If developers only say what they want, tests can do the same. That is intent-driven testing. The test states the user's goal, and what must be true afterwards. The agent works out the clicks. It's a vendor term, with no standard definition yet.\n\nThe tools fall into two camps. In the first camp, the agent plays the test on every run. It reads the goal and finds its own way. That survives a redesign, but every run costs a model call, and runs can differ. Wopee.io works this way. In the second camp, the agent writes the code once. You review a plan in plain text. The agent turns it into a normal Playwright test. That test then runs without any model at all. Wopee.io focuses on the first camp, but it also gives you the code. Once a test passes, you get standard Playwright code, plus the Wopee.io SDK, a small helper library. Wopee.io can re-run the test from that code. You'll see it in the demo.\n\nNow the catch. A study from March, called WebTestBench, gave agents real web apps with planted bugs. The best agent scored only twenty-six percent F1. Of the bugs they reported, about seven in ten were not bugs. Then the researchers gave them a human checklist of what to verify. The best score nearly doubled, to forty-nine percent. So the gain came from knowing what correct means. It did not come from better clicking. The agent can drive. It cannot yet decide what is right. That is your spec.\n\nSo can an agent judge its own result? I think yes, but it's not simple. Research on model judges is mixed. A strong model judging chat answers agreed with humans eighty percent of the time. That is as often as two humans agree. But a large study this June compared twenty-one judges. Only two stayed in the top three on all three benchmarks. Judges also tend to prefer the first answer they see, and they tend to prefer their own writing. It gets better when the judge can inspect the actual work. One study let an agent judge other coding agents. It agreed with human reviewers close to ninety percent of the time.\n\nThat is the shape on this slide. The agent says the test passed. That's only a claim. We check the claim against what the run really observed: which assertions ran, and which values it actually saw. No proof, no pass. At Wopee.io, every run passes a set of checks. We tune them every week. Often the honest verdict is Incomplete. That beats a confident wrong answer. Until your agent has something like it, watch its results. Or let it write plain Playwright code, and trust the test runner.",
  },
  {
    start: 372,
    title: "Agent, skills, CLI and MCP",
    text: "Here is the whole stack in one picture. You give a coding agent your intent, in one sentence: GitHub Copilot, Claude Code or Cursor. It writes, runs and fixes your tests. That agent is piece number one. Piece two is a skill file: know-how the agent loads only when a task needs it. Piece three is the command line. The agent drives a real browser with shell commands, and the answers land in files. Piece four is MCP: the same browser, through tools that sit in the agent's context. And next to it, a testing agent. Wopee.io maps your app on its own, or your coding agent calls it as one more MCP tool. I'll show you both later in this video, right after we compare the tools.\n\nHere's an easy way to remember it. The agent decides, and it has two hands. The first hand is the command line. The agent types commands it already knows, like git or npx. Big answers go to a file, so they cost nothing until needed. The second hand is MCP. You plug a server in with a few lines of config. Every tool then sits in the agent's context, from the start. No shell needed. In head-to-head studies, both succeed about equally often. The command line is usually two to three times cheaper in tokens. Playwright ships both. It recommends the command line for coding agents, and MCP for exploring and self-healing.\n\nLet me open up the agent itself. It's a model running in a loop: think, act, observe, again and again, until the job is done. Every agent you know is built from the same five parts. A model, which is the brain. A system prompt, like the AGENTS file in your repository. Your own prompt, which is the intent. Tools, like the terminal, files and MCP servers. And skills, loaded only when needed. Copilot, Claude Code, Cursor and the Wopee.io agent all follow this recipe. Playwright's planner, too. What differs is the parts.\n\nSo what is a skill? It's a folder with one Markdown file, called SKILL.md. Scripts, references and other files can sit next to it. Here is what the file looks like. This example logs in to a demo app. At the top, a name and a description. Below that, the steps. The description is the trigger. Until a task matches, the agent reads only those two fields. That costs about a hundred tokens per skill. So say when to use it, not only what it does. In one vendor test, a vague skill sat unused in over half the runs. Done well, skills really help. In one benchmark, curated skills lifted pass rates by about seventeen points. The format is open now: Copilot, Claude Code, Codex, Cursor and Gemini all read it. Our bar is that a skill runs cold: a fresh session, only the skill, no follow-up prompts, and it still does the job. One warning, though. A scan of almost four thousand public skills found seventy-six malicious ones. Read every line before you install someone else's.\n\nMCP stands for Model Context Protocol. Its own docs call it a USB-C port for AI apps. Your AI app holds the client. It plugs into a server that runs locally or over the web. A server offers three kinds of things. Tools, which the model decides to call, like click or run a test. Resources, which the app attaches, like files and specs. And prompts, which you pick yourself, like slash commands. Adoption is huge. The official registry lists about thirty thousand servers. The SDKs get close to half a billion downloads a month. Since December, it sits with the Linux Foundation, not with one vendor. But it isn't free. GitHub's server alone takes about twenty-six thousand tokens before you type anything. And a poisoned tool description can hijack your agent. In one benchmark, such attacks worked up to seventy-three percent of the time. So plug in only servers you trust.\n\nThe command line is the other hand. Agents like it for three reasons. First, it's lean. We measured one flow in our demo app: the command line used about a third of MCP's tokens. Second, it's fluent. Models have learned the shell from millions of repositories, and a skill teaches them the rest. Third, it's fenced. A shell can do anything, so the agent asks before each command. Only safe, read-only commands are approved in advance. A browser check then takes three commands. Open the page. Take a snapshot, which goes to a file, not into the chat. Then click an element the agent found in that file.",
  },
  {
    start: 666,
    title: "Picking the model",
    text: "Agent, skills, command line, MCP: every one of these pieces runs on one model. So pick the model on purpose. Same agent, same skill, different model, and you get different quality, a different bill and a different speed.\n\nHere is how different. Each line is one model. Each dot is one reasoning effort, from low to max. Higher means smarter. Further left means cheaper per task. The numbers come from Artificial Analysis, read in September. Claude Opus at max effort is the smartest here. It costs about six dollars per task. GPT Luna at medium effort is our default today. It's about three hundred fifty times cheaper, at half the score. Effort matters as much as the model: Luna from low to max almost doubles its score. Switch to speed, and the cheap models are also the fast ones.\n\nOne lesson from our rehearsals. Copilot's Auto mode often picked a smaller model. That model passed checks it should have failed. So we pin the model. We don't trust Auto.",
  },
  {
    start: 733,
    title: "API testing",
    text: "Everything I showed you works one layer down, too. Think of the test pyramid. API tests have fewer moving parts than UI tests. They run faster, and they break less often. So an agent automates them even more easily. The approach stays the same: give it the intent and the API contract, and take expected results from the spec. Our demo app has an API behind its UI. The workshop repository has a small API experiment, with a solution. Try it yourself.",
  },
  {
    start: 765,
    title: "The Zoo",
    text: "Enough theory. Let's visit the Zoo. Four exhibits, four ways to test with an agent: a coding agent on its own; Playwright's own test agents, over MCP; the Playwright CLI with skills; and Wopee.io, a testing agent built for the job. Every exhibit gets the same app and the same task. That keeps the comparison fair.\n\nThe app is a small food delivery demo: five restaurants, a cart and a checkout. No account needed. Next to it sits a written spec with eight user stories. The task never changes: order a meal, and prove it worked. \"Worked\" means what the spec says, not what the app happens to show.",
  },
  {
    start: 807,
    title: "Exhibit 1, the AI coding agent",
    text: "Exhibit one is the AI coding agent. You describe the intent. It writes the test, runs it and fixes it. Here it has no browser tools. It learns the app from the spec and the test output.\n\nSo what did the agent get wrong? A passing test is not the point. The negative case is. Ask for checkout with an empty cart. Agents tend to expect an error message. This app shows a calm empty state instead: no error, no toast, no disabled button. The agent wrote what checkouts usually do, not what this one does. Now flip it. An empty checkout form still places an order. The spec says those fields are required. Here the red test is right, and the app is wrong.\n\nLesson one: agents make confident mistakes. Judge every expected result against the spec.",
  },
  {
    start: 860,
    title: "Exhibit 2, Playwright agents",
    text: "Exhibit two is Playwright's own test agents. Three of them ship with Playwright. A planner explores the app and writes a plan in Markdown. A generator turns that plan into a test. A healer repairs tests that fail. Your job is to review what they produce.\n\nWould you trust that test? In our rehearsal, the answer was no. The plan said a twenty percent discount applies automatically. The generated test expected the total without the discount. The comment above it quoted the spec. The assertion encoded the bug. So the test passed, and told us the bug was fine. Then the healer made it green, not better. It swapped readable locators for positions on the page. It reported \"passing consistently\". We ran it three times with retries off. It failed once. Its own instructions even let it skip a test it cannot fix.\n\nLesson two: green is not the same as correct. Read every assertion. Run it three times, retries off.",
  },
  {
    start: 923,
    title: "Exhibit 3, Playwright CLI and skills",
    text: "Exhibit three is the Playwright CLI with skills. The agent drives a real browser from the shell. A skill tells it how. Nobody writes a locator by hand.\n\nWhat stayed out of the context? Most of the page. Remember the snapshot file? The agent reads back only the few lines it asks for. Skills work the same way. Only the name and description sit in context. The full instructions load when a task matches. So the description is the skill's real interface. Make it vague, and the agent never finds the skill.\n\nLesson three: write the description in the words testers type. And measure tokens on your own app. Published comparisons disagree a lot.",
  },
  {
    start: 966,
    title: "The Zoo verdict",
    text: "The fourth exhibit is Wopee.io. Full disclosure: I build it. So which one wins? I won't pick it for you. Score each one the same way. How fast is the first useful result? What does it cost? Does it check the right thing, twice in a row? Who fixes it when the app changes? Across all four, one lesson held. Every agent needs a judge. Today, that judge is still you.",
  },
  {
    start: 993,
    title: "Wopee.io demo",
    text: "So here is exhibit four, Wopee.io. I build this one, so judge it harder than the other three. We ran out of time for it in the workshop, so here is the short version. Same food delivery app, same task. And you'll see where it got something wrong, and what caught it.\n\nWopee.io is an AI testing agent for web apps. It starts with one form. I paste the URL of our demo app. I tell it what matters most: the checkout. Then one click. First, it asks me what to focus on. I pick the full flow, from restaurant to checkout. Then it clicks through the app in a real browser, like a user. That takes a few minutes, so it's sped up, and the clock shows real time.\n\nFrom what it found, it writes test scenarios. Each one states a goal, and what must be true afterwards. It also writes down the steps it found. On every run, an agent plays them in a real browser. That's intent-driven testing, from the start of this video. You can read every scenario, and change it. Then the first tests run on their own. Every run keeps its evidence: screenshots of every step, and a report you can read.\n\nNow the part I care about most. Here, our own agent called a pass it could not prove. Its report says the order total was $18.48. But no check in the test ever looked at that number. So the evidence check flags it: unverified. The test stays green, with a warning. Remember the healer that said \"passing consistently\"? Same problem: a claim nobody checked. Only this time, the judge is built in. Then you check the evidence yourself. And here, the screenshot does show that total.\n\nPassing tests also become Playwright code. Here it is, next to the steps: standard Playwright, plus the Wopee.io SDK. You can open it in VS Code or Cursor. And Wopee.io can re-run the test from that code.",
  },
  {
    start: 1121,
    title: "Wopee.io MCP: your agent calls the tester",
    text: "Now MCP. MCP is a standard way to plug tools into your coding agent, like a USB-C port. Wopee.io has its own MCP server. Plug it in, and your agent gets fifteen Wopee.io tools: explore, write tests, run them, read the results. Your agent asks. Wopee.io's agents do the testing.\n\nHere's Claude Code, a coding agent in my terminal. A few lines of config. Your API key stays out of the file. I ask which checkout rules have no test yet. My agent reads the spec, the app's written rules. Then it checks them against the Wopee.io tests. It finds five gaps. One is the bug from exhibit one: an empty checkout form still places an order. So I ask for that test, check it, and run it. The run takes a few minutes, so I skip ahead. It failed, for the right reason. The order went through with empty fields.\n\nNow the limits. Every run calls an AI model. That costs money, and two runs can differ. Exploring an app takes minutes, not seconds. Like any MCP server, its tool list takes up room in your agent's context. Want full control of every line from day one? Start with exhibit three, Playwright CLI and skills. Want to see it on your own app? Start free at Wopee.io. Paste your URL, and it writes your first tests. No credit card required.",
  },
  {
    start: 1234,
    title: "Redo it yourself",
    text: "Before the wrap-up: everything from the Zoo is public, so you can check me. You don't have to trust my demo. Check it yourself. Everything from this video is in one public repository. A playbook, one page for each part of the workshop. Follow it, and you can run the workshop on your own. The demo app, and its spec: what the app should do. The Zoo: four tools, one shared task. Redo it, and score them yourself. Ready-made skill files, the know-how your agent loads. Copy one, break it, then write your own. Answer keys, for when you get stuck. Plus the research behind the numbers, and all the slides. Scan the code, or find the link in the description.",
  },
  {
    start: 1272,
    title: "Wrap-up",
    text: "Remember the two numbers from the start? How long your team needs to ship a feature, and how long until you trust it in production. Look at your testing number again. With the stack you've just seen, what would it be now? Be honest. Smaller is great. Unchanged is useful to know, too. The debrief questions and a Monday plan are in the repository.\n\nAI has changed how code gets written. That's where the speed gap comes from. Testing is next. The tools are here today. The judgment is still yours.",
  },
  {
    start: 1305,
    title: "Your next step",
    text: "So here's your goal: shrink the time until you trust a release. Three next steps. Want to see a testing agent on your own app? Start free at Wopee.io. It takes one minute. Paste your URL. It explores your app and writes your first tests. Every run comes with screenshots and a report. No credit card required.\n\nWant help bringing this to your team's real product? Book a call with me at wopee.io/marcel. We can plan a paid pilot on your most important flows, or I can advise your team, so you get there faster. Or want this workshop for your team? We run it in-house, online or onsite, adapted to your team, your conditions and your environment. Same link: wopee.io/marcel.\n\nIf this video helped, subscribe. And tell me in the comments: which tool would you trust in your pipeline? I read every one. One more thing: the voice you heard is an AI clone of mine. Thanks for watching.",
  },
];

const TRANSCRIPT = CHAPTERS.map((c) => c.text).join("\n\n");

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

const JSON_LD_VIDEO = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": `${PAGE_URL}#video`,
  name: TITLE,
  description: SUMMARY,
  thumbnailUrl: [
    `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`,
  ],
  uploadDate: "2026-10-09T10:55:56+00:00",
  duration: "PT22M56S",
  contentUrl: WATCH_URL,
  embedUrl: EMBED_URL,
  inLanguage: "en",
  transcript: TRANSCRIPT,
  publisher: {
    "@type": "Organization",
    "@id": "https://wopee.io/#organization",
    name: "Wopee.io",
    url: "https://wopee.io/",
  },
  hasPart: CHAPTERS.map((c, i) => ({
    "@type": "Clip",
    name: c.title,
    startOffset: c.start,
    endOffset: CHAPTERS[i + 1]?.start ?? DURATION_SECONDS,
    url: `${WATCH_URL}&t=${c.start}s`,
  })),
};

const ACCENT = "text-secondary-wopee dark:text-primary-wopee";
const MUTED = "text-gray-600 dark:text-gray-300";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";
const BUTTON = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-solid px-6 py-3 text-center text-base font-bold no-underline transition ease-out hover:no-underline motion-reduce:transition-none ${FOCUS}`;
const BUTTON_PRIMARY = `${BUTTON} border-secondary-wopee bg-secondary-wopee text-white hover:bg-[#5e2786] hover:text-white dark:border-primary-wopee dark:bg-primary-wopee dark:text-[#1a1124] dark:hover:bg-[#ffd633] dark:hover:text-[#1a1124]`;
const BUTTON_SECONDARY = `${BUTTON} border-gray-300 bg-transparent text-inherit hover:border-secondary-wopee hover:text-secondary-wopee dark:border-white/20 dark:hover:border-primary-wopee dark:hover:text-primary-wopee`;

export default function VibeTestingLabVideo(): JSX.Element {
  const [start, setStart] = useState<number | null>(null);
  const src =
    start === null ? EMBED_URL : `${EMBED_URL}?start=${start}&autoplay=1`;

  const seek = (event: React.MouseEvent<HTMLAnchorElement>, seconds: number) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    setStart(seconds);
    document
      .getElementById("player")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout
      title="Vibe Testing Lab: 4 AI Testing Agents (Video)"
      description="Four AI testing tools, one app, one task: a coding agent, Playwright agents, Playwright CLI with skills and Wopee.io with MCP. Who judges? Full transcript."
    >
      <Head>
        <meta property="og:type" content="video.other" />
        <meta
          property="og:image"
          content={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
        />
        <meta property="og:video" content={EMBED_URL} />
        <script type="application/ld+json">{JSON.stringify(JSON_LD_VIDEO)}</script>
      </Head>
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className={`mb-4 text-sm ${MUTED}`}>
          <Link to="/videos/">Videos</Link> <span aria-hidden="true">/</span>{" "}
          <span aria-current="page">Vibe Testing Lab: 4 AI testing agents</span>
        </nav>
        <p className={`mb-2 text-sm font-semibold uppercase tracking-wide ${ACCENT}`}>
          Video · 22:56
        </p>
        <h1 className="mt-balance mb-4 text-[28px] font-extrabold leading-[1.15] tracking-tight sm:mb-6 sm:text-4xl">
          {TITLE}
        </h1>

        <div
          id="player"
          className="scroll-mt-24 aspect-video w-full overflow-hidden rounded-xl bg-black"
        >
          <iframe
            className="block h-full w-full border-0"
            src={src}
            title={TITLE}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <p className="mb-0 mt-5 text-base leading-relaxed sm:mt-6 sm:text-lg">{SUMMARY}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className={BUTTON_PRIMARY} to={BOOK_DEMO}>
            Book a demo
          </Link>
          <Link className={BUTTON_SECONDARY} to={DOCS_START}>
            Get started with Wopee.io
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-extrabold">Chapters</h2>
          <ol className="m-0 list-none p-0">
            {CHAPTERS.map((c) => (
              <li key={c.start}>
                <a
                  className={`grid min-h-11 grid-cols-[3rem_1fr] items-start gap-4 rounded-md px-2 py-2 text-inherit no-underline hover:bg-secondary-wopee/5 hover:text-inherit hover:no-underline dark:hover:bg-primary-wopee/5 ${FOCUS}`}
                  href={`${WATCH_URL}&t=${c.start}s`}
                  onClick={(e) => seek(e, c.start)}
                >
                  <span className={`font-mono font-semibold tabular-nums ${ACCENT}`}>
                    {clock(c.start)}
                  </span>
                  <span>{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-extrabold">Transcript</h2>
          <p className={`mb-6 text-sm ${MUTED}`}>
            Cleaned from the video's captions. Research figures, model prices
            and dates ("this year", "in September") are as of the October 2026
            recording.
          </p>
          {CHAPTERS.map((c) => (
            <div key={c.start} className="mb-8 max-w-[72ch]">
              <h3 className="mb-1 text-base font-bold">
                <a
                  className={`mr-2 font-mono tabular-nums ${ACCENT} ${FOCUS}`}
                  href={`${WATCH_URL}&t=${c.start}s`}
                  onClick={(e) => seek(e, c.start)}
                >
                  {clock(c.start)}
                </a>
                {c.title}
              </h3>
              {c.text.split("\n\n").map((p, i) => (
                <p key={i} className="mb-3 text-base leading-7 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </section>

        <section className="mt-12 border-0 border-t border-solid border-gray-200 pt-8 dark:border-white/10">
          <h2 className="mb-4 text-2xl font-extrabold">Try it yourself</h2>
          <ul className="mb-0 space-y-2 pl-5 leading-relaxed">
            <li>
              <Link to={WORKSHOP_REPO}>Vibe Testing Lab repository</Link>: the
              playbook, demo app and spec, the Zoo exhibits, skills, answer keys
              and slides (CC BY-NC 4.0).
            </li>
            <li>
              <Link to={DOCS_START}>Getting started</Link>: create your first
              project from a URL.
            </li>
            <li>
              <Link to={DOCS_MCP}>Wopee.io MCP setup</Link> for your coding agent.
            </li>
            <li>
              <Link to="/compare/wopee-vs-playwright-mcp/">
                Wopee.io vs Playwright MCP and test agents
              </Link>{" "}
              and{" "}
              <Link to="/compare/wopee-vs-playwright-cli/">
                Wopee.io vs Playwright CLI
              </Link>
            </li>
            <li>
              <Link to={BOOK_DEMO}>Book a call</Link> for a pilot, consulting, or
              this workshop for your team.
            </li>
            <li>
              <Link to={WATCH_URL}>Watch on YouTube</Link>
            </li>
            <li>
              <Link to="/videos/">More Wopee.io videos</Link>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
