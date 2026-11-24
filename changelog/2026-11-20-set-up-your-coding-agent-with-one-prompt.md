---
slug: set-up-your-coding-agent-with-one-prompt
date: 2026-11-20T12:00:00Z
title: "Set up your coding agent with one prompt"
og_punchline: "One prompt, connected"
description: "Paste one line into Claude Code or another coding agent, compare three words and approve in Commander. The key goes to a git-ignored .env, never the chat."
---

Your coding agent can now connect itself to Wopee.io with one prompt. It shows you its plan, runs one open-source command, and you approve the connection in Commander.

{/* changelog-clip:start */}
<figure className="changelog-clip">
  <img src="/img/changelog/set-up-your-coding-agent-with-one-prompt.webp" alt="Claude Code gets the Wopee.io setup line, shows its plan, prints the words mellow-turtle-53; Commander shows the same words, the project is approved, and a read-only connection check passes" width="960" height="720" decoding="async" />
  <figcaption>{"Paste one line, check the same words in your terminal and in Commander, approve, and the agent is connected."}</figcaption>
</figure>
{/* changelog-clip:end */}

Paste this line into Claude Code or another coding agent:

> Set me up for Wopee.io: follow https://wopee.io/agent-setup/prompt.md, show me the plan first, and ask before changing anything.

The agent runs `npx -y @wopee-io/init@latest`, which prints a link and three words. Open the link, check that Commander shows the same words, pick a project you administer and approve. A new API key goes from Wopee.io straight to the command, encrypted for it, and lands in a git-ignored `.env`. It never passes through the agent's chat and never sits in an MCP config. Each approval creates its own named key, which you can revoke under API Keys.

No account yet? [Sign up](https://cmd.wopee.io/signup) first, since a project admin approves the connection. All steps are in the [agent setup guide](https://docs.wopee.io/agent-setup/).
