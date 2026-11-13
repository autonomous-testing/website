---
slug: one-prompt-setup
title: "Your Coding Agent Can Now Set Up Its Own Tester"
og_punchline: "One prompt. One approval."
title_meta: "Set Up Wopee.io Testing From One Prompt"
description: "Tell your coding agent to set up Wopee.io testing for this repo. It runs one command, you approve once, and no API key lands in the chat or an MCP config."
tags: [ai-testing, ai-testing-agents, mcp, claude-code, test-automation, getting-started]
authors: marcel
draft: true
---

In March, AI agents opened 17% of the pull requests GitHub could attribute to them. By September it was more than 40%: 110 million pull requests in one month that started as an agent's first draft ([GitHub Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

Writing code got cheap. Checking it did not.

<!--truncate-->

In one vendor survey, 96% of developers said they don't fully trust that AI-generated code is correct, and only 48% said they always check it before they commit ([Sonar](https://www.sonarsource.com/company/press-releases/sonar-data-reveals-critical-verification-gap-in-ai-coding/)). Anthropic's own guide for Claude Code says it out loud: if the agent has nothing to run that tells it whether the work is done, "that makes you the test suite".

We think that's backwards. You shouldn't be the test suite. The agent should have a tester it can call, and it should be able to set that tester up on its own.

Starting today, it can.

## One prompt, one approval

Open your repo in Claude Code, Cursor, Codex, OpenCode or VS Code Copilot and say:

```text
Set up Wopee.io testing for this repo.
```

That's the setup. No dashboard tour, no copied key, no JSON to edit.

## What the agent runs, and what you approve

1. The agent runs one command: `npx -y @wopee-io/init`.
2. It shows you one link and a short pairing code, like `brave-otter-42`.
3. You open the link in Commander, check the code matches, pick the project and click Approve.
4. The CLI writes a git-ignored `.env` and a `wopee` MCP entry for your agents, runs a smoke test and prints your first prompt.

```text
$ npx -y @wopee-io/init
  Pairing words: brave-otter-42
  Approve here:  https://cmd.wopee.io/cli/authorize?session=…

  ✓ Approved in Commander
  ✓ .env written (git-ignored)
  ✓ MCP entry added: Claude Code, Cursor, Codex, OpenCode, VS Code Copilot
  ✓ Smoke test passed

  Restart your agent, then ask:
  "Run a Wopee analysis of https://your-app.example"
```

{/* LAUNCH CHECK: replace the block above with the literal output of the released CLI. */}

The approval stays with you by design. The agent proposes, you approve, and everything else is done by the time you switch back to your editor.

## No key in the chat, no key in any config

Most MCP setup guides tell you to paste an API key into a config file. Those files get committed. GitGuardian counted 24,008 secrets in MCP config files on public GitHub, and 2,117 of them still worked ([State of Secrets Sprawl 2026](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/)).

We built the setup so that never has to happen:

- The project key is created when you approve, named after the agent and machine that asked for it, and you can revoke it in Commander at any time.
- It travels encrypted to the CLI on your machine. It never passes through the agent's conversation.
- It lands in a git-ignored `.env`. The MCP entries hold no key at all, so they are safe to commit and share with your team.

## Then give it the real work

Setup is the boring part. This is the part we care about:

```text
Run a Wopee analysis of https://your-app.example
```

Your coding agent calls the Wopee.io MCP server. Wopee.io's own testing agents open your app in a real browser, explore it like a person would, write user stories and test cases, run them and come back with a verdict and the evidence behind it. Your agent reads the result and fixes what broke.

Playwright MCP gives your agent a browser to drive step by step. The Wopee.io MCP server gives it a tester. That matters, because the agent that wrote the code is the wrong one to grade it.

## Built for agents as much as for people

This is where we are taking Wopee.io. Testing is becoming something you ask for, not something you assemble. So every part of the product has to work for two kinds of users: the person who decides what matters, and the agent that does the work.

For people: Commander, where you see every run, every verdict and the proof behind it.

For agents: one prompt to get in, tools that answer in plain next steps, docs they can read as Markdown, and errors that say what to do next.

A fair warning, because we'd want one. Agent-run tests are slower and cost more than a script, so they don't replace your regression suite. And some decisions stay yours on purpose: approving a verdict, a baseline or a schedule still happens in Commander.

But the first step is now one sentence. Open your repo and tell your agent:

```text
Set up Wopee.io testing for this repo.
```

[See how it works](https://wopee.io/agent-setup/?utm_source=blog&utm_medium=post&utm_campaign=one-prompt-setup) · [Read the docs](https://docs.wopee.io/agent-setup/?utm_source=blog&utm_medium=post&utm_campaign=one-prompt-setup)
