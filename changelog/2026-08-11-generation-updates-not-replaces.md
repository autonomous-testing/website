---
slug: generation-updates-not-replaces
title: "Regeneration updates your suite instead of replacing it"
title_meta: "Regeneration updates your suite, not replaces it"
description: "Regeneration keeps what you wrote: omitted cases are retained, removals need an explicit request, and verified locators stay in the generated code."
---

Regenerating test cases no longer risks your edits. A test case the model omits is kept rather than deleted, removals happen only when you explicitly ask for them, and cross-story generation now checks existing coverage so you stop getting duplicates. Generated Playwright code also keeps the locators the agent actually verified in the browser instead of rewriting them as guesses.
