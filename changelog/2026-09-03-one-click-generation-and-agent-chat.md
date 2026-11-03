---
slug: one-click-generation-and-agent-chat
title: "Tests for every user story in one click"
description: "Every user story is preselected, so one click generates the whole set; long runs no longer time out, and one chat lets you talk to the agent while it works."
---

The generation picker now holds scopes, not actions. "Every user story" is preselected, so one click deep-generates the whole analysis; rebuilding the outline is a separate, confirmed action; and a line above the button says how many stories are in scope and roughly how long it will take. Long generations run detached, so a 22-story run no longer surfaces as a gateway timeout.

{/* changelog-clip:start */}
<figure className="changelog-clip">
  <img src="/img/changelog/one-click-generation-and-agent-chat.gif" alt="The Generate scenarios panel with Every user story preselected and a line saying it writes scenarios for 3 stories in about 1 to 2 minutes" width="960" height="667" decoding="async" />
  <figcaption>{"Every user story is preselected, and the line above the button says what is in scope and how long it takes."}</figcaption>
</figure>
{/* changelog-clip:end */}

In the Live panel, your nudges and the agent's questions share one chat dock with a transcript that survives a reload, in three sizes down to a pill. Running cards read "2 / 6 steps", analyses can be renamed from their menu, the crawl has a Browser | Logs switch, and the Scenarios grid groups by analysis so same-numbered stories no longer merge.
