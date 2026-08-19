---
slug: generation-updates-not-replaces
title: "Regeneration updates your suite instead of replacing it"
description: "Test-case regeneration keeps what you wrote: cases the model omits are retained, removals need an explicit request, and generated code keeps the locators the agent verified in the browser."
---

Regenerating test cases no longer risks your edits. A test case the model omits is kept rather than deleted, removals happen only when you explicitly ask for them, and cross-story generation now checks existing coverage so you stop getting duplicates. Generated Playwright code also keeps the locators the agent actually verified in the browser instead of rewriting them as guesses.
