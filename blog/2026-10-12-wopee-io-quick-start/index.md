---
slug: wopee-io-quick-start
title: "Wopee.io Quick Start: Your First AI Test in 6 Minutes"
title_meta: "Wopee.io Quick Start: First AI Test in 6 Minutes"
description: "Paste a URL, let the AI agent explore your app, read the verdict, schedule a test plan and find every test in your own GitHub repo. A 6-minute walkthrough."
tags: [getting-started, ai-testing, test-automation, playwright, tutorial]
image: ./hero.webp
authors: marcel
---

Your first AI test, from a URL to a verdict, in about six minutes. No code, no setup. This walkthrough shows the current Wopee.io, step by step.

<!--truncate-->

<div style={{ width: '100%', aspectRatio: '16 / 9', margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
<iframe style={{ width: '100%', height: '100%', border: 0, display: 'block' }} src="https://www.youtube.com/embed/o5ThjRddZfw" title="Wopee.io quick start: your first AI test in 6 minutes" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
</div>

## Chapters

- [0:00](https://youtu.be/o5ThjRddZfw) Your first AI test in a few minutes
- [0:28](https://youtu.be/o5ThjRddZfw?t=28) The projects dashboard
- [0:58](https://youtu.be/o5ThjRddZfw?t=58) Create a project, start the first Analysis
- [1:34](https://youtu.be/o5ThjRddZfw?t=94) Join your GitHub organization
- [1:54](https://youtu.be/o5ThjRddZfw?t=114) Watch the agent explore
- [2:12](https://youtu.be/o5ThjRddZfw?t=132) What you get: description, user flows, scenarios
- [3:13](https://youtu.be/o5ThjRddZfw?t=193) Read the verdict
- [4:11](https://youtu.be/o5ThjRddZfw?t=251) Test Plans and Runs
- [4:44](https://youtu.be/o5ThjRddZfw?t=284) Everything lives in your GitHub repo
- [5:09](https://youtu.be/o5ThjRddZfw?t=309) Add your own test in plain English
- [5:46](https://youtu.be/o5ThjRddZfw?t=346) Next steps

## Step by step

1. **Sign in** at [cmd.wopee.io](https://cmd.wopee.io) with GitHub, Google or GitLab. You land on the projects dashboard.
2. **Click New project.** Paste the URL of your app, or pick a demo (the E-shop demo comes with test instructions already filled in). Write what matters to you in plain English, for example "log in, buy a product, check the thank-you message". Then click **Create project and generate tests**.
3. **Accept the GitHub invitation.** Every project gets its own GitHub repository. Open the menu under your avatar, click **GH Invitation**, and join the organization so you can open the repository.
4. **Watch the agent explore.** The first Analysis starts right away. You see the agent's browser live: it logs in, clicks through the pages and checks what it sees.
5. **Review what it built.** An application description, the user flows, and test scenarios. Every scenario runs once, so you start with real results. Edit any of them, or add instructions and regenerate.
6. **Read the verdict.** Each run ends with a report: every step, what was expected and what the agent verified. When a test fails, the report tells you why. On the demo shop it found a real bug: three different jackets share one product image.
7. **Group tests into a Test Plan** and run it by hand or on a schedule, for example every morning at six. Every execution lands in **Runs**, with each screenshot compared against the approved baseline.
8. **Find everything in your repository.** Each Analysis has its own branch; user flows are a Markdown file, scenarios with their Playwright locators are a JSON file, and every change is a commit.
9. **Write your own test** in plain English with **New test**. On the first run the agent works out the steps; keep **Save steps from this run** on, and later runs replay them.

The free plan gives you 50 agent steps every 5 hours and 2 projects. Need more? Every paid plan starts with the first month on us.

## More short videos

- [Wopee.io in 2 minutes](https://youtu.be/X4vKIrlauik): the whole idea, from a URL to a verdict.
- [Visual checks: it passed, but it looks broken](https://youtu.be/jLA-rA1AHd0): baselines, highlighted differences, approve or reject. Works with the AI agent and with Playwright, Cypress, Robot Framework, WebdriverIO or any framework through the API.
- [Your tests, your repo](https://youtu.be/7yLnLJBpBB4): GitHub, VS Code, API keys for CI, scheduled plans, Slack and Teams.

:::tip Get started 🔥

[Start free at cmd.wopee.io](https://cmd.wopee.io), or [book a free 15-minute setup call](https://wopee.io/marcel) and we set it up with you on your own app.

:::
