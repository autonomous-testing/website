---
slug: crawls-merge-into-your-scenarios
title: "Exploring again never wipes your edits"
description: "Scenarios you create while the agent explores keep their IDs; a new exploration updates only its own entries, and user stories keep their names."
---

A crawl used to write its own set of scenarios as the whole test list, so a scenario you created while it was running disappeared at its next save, and its ID could be reused. The crawl now merges: it marks what it writes, updates only those entries, keeps everything else with its ID, and numbers new entries after the highest existing one.

The automatic run after a crawl picks only the crawl's own scenarios. Crawled user stories also keep their names, so the scope picker shows them by name instead of a bare ID.
