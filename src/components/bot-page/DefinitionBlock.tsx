import React from "react";

const DefinitionBlock = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-8">
        What are AI testing agents?
      </h2>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg lg:text-xl leading-relaxed text-slate-900 dark:text-white">
          <strong>
            AI testing agents are autonomous software programs that explore a
            web app, generate test cases, execute them, and adapt when the UI
            changes — without human-written scripts.
          </strong>{" "}
          Wopee.io's testing bot works by crawling your application from a
          single URL, discovering user flows, and generating Playwright tests
          that run across browsers. Key benefit: tests self-heal instead of
          breaking — your team focuses on shipping, not fixing flaky tests.
        </p>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mt-5">
          Dive deeper in our guide{" "}
          <a href="/blog/ai-testing-agents/">
            AI Testing Agents in 2026: Hype, Reality, and What Actually Works
          </a>
          , or plug the agents into LLM workflows with the{" "}
          <a href="/mcp/">Wopee MCP server</a>.
        </p>
      </div>
    </section>
  );
};

export default DefinitionBlock;
