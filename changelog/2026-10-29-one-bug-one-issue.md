---
slug: one-bug-one-issue
title: "One bug, one issue"
og_punchline: "One bug, one issue"
description: "A defect the agent sees more than once is reported once, with every sighting under it, and the run log ends with the agent's verdict, not just Playwright's."
---

When the agent runs into the same defect twice, for example a sort order that resets on two pages, it now files the second sighting under the first issue instead of reporting it again. The report shows one entry per defect, with the checks from each sighting listed under it.

The run log now ends with the agent's verdict, printed under Playwright's summary. A failed run no longer finishes on a line that says "1 passed".
