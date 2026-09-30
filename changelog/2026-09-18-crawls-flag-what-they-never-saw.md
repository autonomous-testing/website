---
slug: crawls-flag-what-they-never-saw
title: "Crawls that flag what they never actually saw"
description: "Expected text the crawl never saw is flagged, the agent's scenario picks run first, steps visit only crawled URLs, and broken images are reported."
---

A crawl now records the text it saw. Any expected text in a generated assertion that never appeared during the crawl gets a warning icon on the scenario card and on the step, with the text in the tooltip. It is a flag, not a refusal: edit the value and the flag clears.

After the crawl, the scenarios the agent chose run first, starting with any that exercise a defect it observed, instead of the first three in file order. Generated steps may only navigate to the start URL, documented URLs and deep links the crawl actually loaded, and a 404 is reported as a wrong URL rather than an application defect.

The crawl also detects one image reused across different items and images that failed to load. They are listed in a Content Anomalies section, and you can save a visual test case that fails on the defect.
