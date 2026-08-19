import React from "react";

const DefinitionBlock = () => {
  return (
    <section className="border-y border-slate-200/80 bg-slate-50/70 py-12 sm:py-16 lg:py-20 dark:border-white/10 dark:bg-white/[0.025]">
      <div className="container px-5 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="m-0 text-center text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            What are{" "}
            <span className="text-secondary-wopee dark:text-primary-wopee">
              AI testing agents?
            </span>
          </h2>

          <article className="mt-10 rounded-xl border border-slate-200 border-t-2 border-t-secondary-wopee/70 bg-white p-6 shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10 dark:border-white/10 dark:border-t-primary-wopee/70 dark:bg-white/[0.035] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]">
            <p className="m-0 text-base leading-7 text-slate-700 sm:text-lg lg:text-xl lg:leading-8 dark:text-slate-200">
              <strong>
                AI testing agents are autonomous software programs that explore
                a web app, generate and execute test cases, and adapt when the
                UI changes without human-written scripts.
              </strong>{" "}
              Wopee.io's testing bot crawls your application from one URL,
              discovers user flows, and generates Playwright tests that run
              across browsers. When the interface changes, tests self-heal
              instead of breaking, so your team can focus on shipping rather
              than fixing flaky tests.
            </p>

            <p className="mb-0 mt-6 border-t border-slate-200 pt-6 text-base leading-7 text-slate-600 dark:border-white/10 dark:text-slate-300">
              Dive deeper in our guide{" "}
              <a href="/blog/ai-testing-agents/">
                AI Testing Agents in 2026: Hype, Reality, and What Actually
                Works
              </a>
              , or plug the agents into LLM workflows with the{" "}
              <a href="/mcp/">Wopee.io MCP server</a>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default DefinitionBlock;
