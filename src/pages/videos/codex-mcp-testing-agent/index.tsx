import React, { useState } from "react";

import { Head, Layout, Link } from "../../../components/ui/typedDocusaurus";
import SocialCard from "@site/src/components/seo/SocialCard";

const VIDEO_ID = "I3E5c1pg1YY";
const TITLE = "Codex MCP for Testing: Add a Testing Agent";
const PAGE_URL = "https://wopee.io/videos/codex-mcp-testing-agent/";
const WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}`;
const DOCS_MCP = "https://docs.wopee.io/guides/wopee-mcp/";
const DOCS_CODEX = "https://docs.wopee.io/guides/wopee-mcp/codex/";
const BOOK_DEMO = "/book-demo/";
const DURATION_SECONDS = 307;

const SUMMARY =
  "In this 5-minute walkthrough, OpenAI Codex connects to Wopee.io over MCP with one project file, .codex/config.toml, and the API key stays in the environment. Codex then lists the tests in the project, writes a new end-to-end test into an existing user story, dispatches the Wopee.io testing agent in the cloud and reads the result, without leaving the terminal. The video also covers how the Wopee.io MCP server differs from Playwright MCP and how to keep secrets out of the chat.";

type Chapter = { start: number; title: string; text: string };

const CHAPTERS: Chapter[] = [
  {
    start: 0,
    title: "Codex and Wopee.io",
    text: "Codex writes a new end-to-end test, runs it in the cloud, and reads the result, without leaving the terminal. And it passes.",
  },
  {
    start: 10,
    title: "Browser MCP vs testing agent",
    text: "Playwright MCP gives your agent a browser. The Wopee.io MCP server gives it a tester. With Playwright MCP, your agent drives a browser, click by click. It's free, it runs locally, and it can reach localhost, so it's great for quick checks. Wopee.io runs a testing agent in the cloud. It remembers your tests, your runs and your baselines, and it hands your agent a verdict it can act on. Many teams use both.",
  },
  {
    start: 39,
    title: "Get your API key and project",
    text: "You need two values from Commander. Open your project, then More, Settings, API Keys, and generate a new key. It's shown only once, so copy it right away. The same screen shows your project UUID. Your project repository already has a .env.example file, with the UUID filled in. Copy it to .env, paste the key, and keep that file out of git.",
  },
  {
    start: 65,
    title: "Add Wopee.io to Codex",
    text: "Codex keeps its MCP servers in a TOML file, config.toml. Your project repository has none yet, so add one: .codex/config.toml. The table is mcp_servers.wopee. The command is npx, with the args -y and wopee-mcp. And env_vars lists the two variable names. Codex forwards them from your shell, so the key never sits in the file. Here's the file in my project. I also pass the API address, because I record on our test instance. You don't need that. The last line lets the Wopee.io tools run without asking me every time. I load my .env file and start Codex. Then /mcp: wopee, connected, with fifteen tools.",
  },
  {
    start: 117,
    title: "Ask about your tests",
    text: "First question: how many tests do I have in Wopee.io, and which ones have never run? Codex calls the test inventory tool and answers with a table. Five tests. Two have never run, and the other three passed.",
  },
  {
    start: 135,
    title: "Write and run a new test",
    text: "Next: add a new Wopee.io test to the sorting user story. Sort the catalog by price from high to low, and check that the first product is the Sauce Labs Fleece Jacket. Sign in the same way the existing tests do. Then run it and wait for the result. Codex reads the existing tests first. Then it writes the new case into the user story, and dispatches the testing agent. The new case is US004:TC003. The password stays a project variable, TESTING_PASSWORD, just like in the existing tests. The run is asynchronous, so Codex waits, and checks again. I've cut the wait. About two minutes later: US004:TC003 passed. It signed in, selected Price, high to low, and the first product was the Sauce Labs Fleece Jacket. A new end-to-end test, written and run from the terminal.",
  },
  {
    start: 193,
    title: "What else it can do",
    text: "What else can it do? Generate tests from a spec: hand it a Jira epic or a README, and it builds a suite with test cases. File a failed run as a GitHub issue, with the failing step, a screenshot, and a link to the run. And point your tests at staging, by changing a project variable. A few tips. Keep the key in your environment, and commit the config with placeholders only. Each server entry works with one project, so a second project gets a second entry. And runs are asynchronous. If the result isn't there yet, just ask your agent to check again. One best practice. Keep secrets out of the chat. Your API key lives in your environment: the MCP server reads it, and your coding agent never sees it. For test logins, store the password as a Wopee.io project variable, and write the test with the variable, not the value. It's filled in only when the test runs. So never paste credentials into a prompt or a test step, and don't ask your agent to read your .env file either. Whatever it reads ends up in the model's context.",
  },
  {
    start: 263,
    title: "Next steps",
    text: "And if you'd rather not write tests at all, let our AI testing agent do the work. Describe in plain English what should work. It explores your app, turns your intent into tests, and runs them. Try it free at cmd.wopee.io, or book a demo at wopee.io/book-demo. The guide on docs.wopee.io has a page for each agent. And full walk-throughs for Claude Code, GitHub Copilot, Cursor and OpenCode are in the playlist. Thanks for watching. If this was useful, subscribe for more. Test better. Ship faster.",
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
  uploadDate: "2026-11-16T12:40:00+00:00",
  duration: "PT5M7S",
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

export default function CodexMcpTestingAgentVideo(): JSX.Element {
  const [start, setStart] = useState<number | null>(null);
  const src =
    start === null ? EMBED_URL : `${EMBED_URL}?start=${start}&autoplay=1`;

  const seek = (
    event: React.MouseEvent<HTMLAnchorElement>,
    seconds: number,
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    setStart(seconds);
    document
      .getElementById("player")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout
      title="Codex MCP for Testing: Add a Testing Agent, Video"
      description="Watch OpenAI Codex use the Wopee.io MCP server: list your tests, write a new end-to-end test, run it in the cloud and read the result. Chapters and transcript."
    >
      <SocialCard
        card={{
          image: `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: TITLE,
        }}
      />
      <Head>
        <meta property="og:type" content="video.other" />
        <meta property="og:video" content={EMBED_URL} />
        <script type="application/ld+json">
          {JSON.stringify(JSON_LD_VIDEO)}
        </script>
      </Head>
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className={`mb-4 text-sm ${MUTED}`}>
          <Link to="/videos/">Videos</Link> <span aria-hidden="true">/</span>{" "}
          <span aria-current="page">Codex MCP for testing</span>
        </nav>
        <p
          className={`mb-2 text-sm font-semibold uppercase tracking-wide ${ACCENT}`}
        >
          Video · 5:07
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

        <p className="mb-0 mt-5 text-base leading-relaxed sm:mt-6 sm:text-lg">
          {SUMMARY}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className={BUTTON_PRIMARY} to={BOOK_DEMO}>
            Book a demo
          </Link>
          <Link className={BUTTON_SECONDARY} to={DOCS_MCP}>
            Set up the Wopee.io MCP server
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
                  <span
                    className={`font-mono font-semibold tabular-nums ${ACCENT}`}
                  >
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
            Cleaned from the video's captions.
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
              <p className="mb-0 text-base leading-7">{c.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 border-0 border-t border-solid border-gray-200 pt-8 dark:border-white/10">
          <h2 className="mb-4 text-2xl font-extrabold">Try it yourself</h2>
          <ul className="mb-0 space-y-2 pl-5 leading-relaxed">
            <li>
              <Link to={DOCS_MCP}>Wopee.io MCP server docs</Link>: setup for
              Codex, Claude Code, Cursor and other MCP clients.
            </li>
            <li>
              <Link to={DOCS_CODEX}>Wopee.io MCP server in OpenAI Codex</Link>,
              the client used in this video.
            </li>
            <li>
              <Link to="/mcp/">What the Wopee.io MCP server does</Link>
            </li>
            <li>
              <Link to={BOOK_DEMO}>Book a demo</Link> to see it on your own app.
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
