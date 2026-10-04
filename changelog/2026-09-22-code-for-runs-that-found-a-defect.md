---
slug: code-for-runs-that-found-a-defect
title: "Found a bug? You still get the test code"
description: "A run that did every step and failed only on its checks now leaves a Playwright test asserting the expected values, so it turns green once the bug is fixed."
---

A crawl queues the test cases most likely to catch a defect first, so on an application with a real bug every one of them could fail and leave no Playwright code behind. Code generation now also covers a run that executed every defined step and failed only because the page showed the wrong value.

The spec asserts the values the test expected, not what the page showed, and is headed "Expected to fail until the defect is fixed". It goes green on its own once the defect is fixed. Any other failure, such as a step that could not run or a run the integrity gates question, still generates no code, and steps are never rewritten from a failed run.
