---
slug: flaky-tests-complete-guide
title: "Flaky Tests in E2E Test Suites: The Complete Guide to Detection, Root Causes, and Remediation"
description: "Flaky tests affect 16% of tests at Google and erode CI trust. Learn root causes, detection methods, and proven remediation patterns for E2E test suites."
tags: [flaky-tests, e2e-testing, test-automation, ci-cd, playwright, test-reliability, software-quality]
image: ./ci-trust-erosion.png
authors: marcel
---

Flaky tests affect 16% of all tests at Google, and 84% of pass-to-fail CI transitions involve a flaky test (Source: [Google Testing Blog](https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html), 2017). In E2E suites specifically, async-wait issues drive roughly 45% of all flakiness, while the real cost isn't wasted developer time — it's the CI trust erosion that lets genuine regressions slip to production undetected.
<!--truncate-->

![Flaky tests erode CI trust: the four-stage progression from investigate, to rerun, to ignore, to regressions escaping into production](./ci-trust-erosion.png)

If you're a test lead or engineering manager at a B2B SaaS company, you've probably watched your team default to "click rerun" instead of investigating failures. That behavioral shift is the inflection point where flaky tests stop being an annoyance and become a systemic threat. This guide synthesizes a decade of academic research and large-scale practitioner evidence from Google, Meta, Microsoft, Atlassian, Spotify, and Slack into a structured decision framework.

You'll learn what causes E2E test flakiness, how to detect it before it erodes your pipeline, which remediation patterns have proven durability at scale, and where emerging AI approaches fit — and don't fit — into the picture.

This guide covers: the formal definition and measurement of flakiness, the root-cause taxonomy for E2E suites, the detection ladder from reruns to ML prediction, proven remediation patterns, framework-level mitigation, quarantine lifecycle management, and the emerging research frontier.

## What Are Flaky Tests?

A **flaky test** is one that produces non-deterministic outcomes — sometimes passing, sometimes failing — when run against the same version of the source code (Source: [Luo et al., FSE 2014](https://mir.cs.illinois.edu/lamyaa/publications/fse14.pdf), 2014). The code hasn't changed, the test hasn't changed, yet the result varies between runs.

This isn't random noise. There's always a triggering condition — a timing window, a resource contention issue, a shared-state dependency — that only manifests intermittently. The test is deterministic in theory but non-deterministic in practice because some environmental condition is uncontrolled.

How does this differ from a genuine failure? A real regression fails consistently after a specific commit. A flaky test fails sporadically across commits, often correlating with CI load, time of day, or test execution order rather than code changes.

Martin Fowler framed the stakes clearly in 2011: "Non-deterministic tests have two problems: firstly they are useless, secondly they are a virulent infection that can completely ruin your entire test suite" (Source: [Fowler, "Eradicating Non-Determinism in Tests"](https://martinfowler.com/articles/nonDeterminism.html), 2011). That assessment remains accurate fifteen years later.

Meta's engineering team adds a critical refinement: every real-world test is flaky to some non-zero degree. The right question isn't whether a test is flaky, but *how flaky* it is (Source: [Meta Engineering, "Probabilistic Flakiness"](https://engineering.fb.com/2020/12/10/developer-tools/probabilistic-flakiness/), 2020). This motivates continuous measurement over binary classification.

## How Prevalent Is E2E Test Flakiness?

The data from large engineering organizations converges on a consistent picture: flaky tests aren't rare exceptions. They're a structural feature of testing at scale.

| Organization | Metric | Source |
|---|---|---|
| Google | 16% of tests exhibit flaky behavior; 84% of pass-to-fail transitions involve a flake | Memon et al., 2017 |
| Meta | E2E flakiness rate ~10%; unit tests well below 1% | Machalica et al., 2020 |
| Microsoft | 26% of distinct builds affected by flaky tests | Lam & Godefroid, ISSTA 2019 |
| Atlassian | 15–21% of build failures from flaky tests | Atlassian Engineering, 2025 |
| GitHub Actions | 67.73% of rerun builds exhibited flaky behavior | Large-scale study, 2025 |

Why does this hit E2E suites hardest? Individual per-test flake rates compound across suite size. For a suite of 300 tests each with a 0.5% individual failure rate, the probability of a clean suite run is 0.995^300 — roughly 22%. That means 78% of your suite runs will contain at least one flaky failure, even with individually "well-behaved" tests.

![300-test grid visualization showing how a 0.5% per-test flake rate compounds to a 78% suite-failure probability — small per-test risks accumulate dramatically at suite scale](./flake-rate-suite-probability.png)

The economic impact is measurable. A peer-reviewed industrial case study quantified the direct cost at 2.5% of total productive developer time — 1.1% investigating, 1.3% repairing (Source: [Kowalczyk et al., TUM](https://mediatum.ub.tum.de/doc/1730194/gbm0plj5hiwtahxthafyg16bl.cost-of-flaky-tests-in-ci.pdf), 2024). Atlassian reported over 150,000 developer hours per year consumed by flaky test investigation in their Jira backend alone.

But the largest cost isn't time — it's trust. When developers learn that red CI means "probably a flake," they stop investigating failures entirely. [INTERNAL_LINK: What the Data Says About the Real Cost of Flaky Tests]

## What Causes E2E Test Flakiness?

The foundational taxonomy from Luo et al. (2014) analyzed 201 flaky-test fix commits across 51 Apache projects and identified 10 root-cause categories. This classification has been independently validated by multiple subsequent studies across a decade of research.

| Root Cause | Prevalence | Source |
|---|---|---|
| Async wait / timing | ~45% | Luo et al. (2014), confirmed by Parry et al. (2021) |
| Concurrency / race conditions | ~20% | Luo et al. (2014) |
| Test order dependency | ~12% | Luo et al. (2014); 59% in Python (Gruber et al., 2021) |
| Resource leaks | ~8% | Luo et al. (2014) |
| Network / external dependencies | ~5% | Luo et al. (2014) |
| Time, I/O, randomness, other | ~10% | Luo et al. (2014) |

For E2E browser tests, the picture shifts. Romano et al.'s ICSE 2021 study of 235 flaky UI test samples identified four additional E2E-specific categories: animation timing issues, platform/browser inconsistencies, test runner API misuse, and DOM selector fragility (Source: [Romano et al., ICSE 2021](https://dl.acm.org/doi/10.1109/ICSE43902.2021.00139), 2021).

What does this look like in practice? Your `click()` action fires before an event listener is attached. Your assertion checks DOM state before a framework re-render completes. Your test passes locally but fails in CI because a third-party API responds 200ms slower under load.

For a detailed breakdown of each mechanism and its fix, see [INTERNAL_LINK: 7 Root Causes of Flaky E2E Tests (And How to Fix Each One)].

### The Systemic Flakiness Discovery

Recent research introduces a pattern that challenges how we think about flaky tests. Parry et al. (2025) found that 75% of flaky tests belong to co-occurring failure clusters with a mean size of 13.5 tests (Source: [Parry et al., ICSE 2025](https://arxiv.org/abs/2504.16777), 2025). Intermittent networking issues and external dependency instabilities were the predominant causes. This means fixing one shared root cause can resolve a dozen-plus flaky tests simultaneously — batch remediation is possible when you identify the cluster.

## How Do You Detect and Classify Flaky Tests?

Detection has matured along a clear ladder, from simple reruns to ML-based prediction. Each step trades computational cost for detection accuracy.

### Rerun-Based Detection

The simplest approach: run the test N times and flag inconsistent outcomes. It's cheap and widely deployed, but Bell et al. showed that Maven's built-in rerun caught only 23% of confirmed flakes (Source: [Bell et al., "DeFlaker," ICSE 2018](https://dl.acm.org/doi/10.1145/3180155.3180164), 2018). Even 10,000 reruns don't catch all flakes. Gruber et al. found that achieving 95% confidence a test is *not* flaky requires an average of 170 reruns.

### Differential Coverage (DeFlaker)

DeFlaker monitors which code lines changed since the last green build. If a newly failing test didn't execute any changed code, it's flagged as flaky. The approach achieved 95.5% recall with only a 1.5% false alarm rate across 96 Java projects. The trade-off? It requires coverage instrumentation at every CI run — impractical for many E2E suites where the system-under-test runs separately from the test runner.

### ML-Based Prediction

FlakeFlagger (ICSE 2021) predicts flakiness from test/code features — test smells, churn, runtime, assertion density — without requiring reruns. Flakify (IEEE TSE 2022) fine-tunes CodeBERT on test source alone and outperforms FlakeFlagger by +10pp precision and +18pp recall (Source: [Fatima et al., IEEE TSE 2022](https://ieeexplore.ieee.org/document/9796326), 2022).

### The Critical Caveat

Can you trust automated flake classification to suppress failures? Lampel et al. (2023) applied a state-of-the-art flakiness predictor to Chromium's CI pipeline. Despite 99.2% precision in detecting flaky tests, the system misclassified 76.2% of genuine fault-triggering failures as flaky (Source: [Lampel et al., ESEC/FSE 2023](https://dl.acm.org/doi/10.1145/3611643.3616298), 2023). One-third of real faults were revealed by tests that are also sometimes flaky. Aggressive flake suppression can mask real regressions.

## How Do You Fix Flaky Tests?

The proven remediation hierarchy moves from framework-level fixes (cheapest, highest impact) through isolation patterns to organizational process.

### Replace Sleeps with State-Based Waits

Playwright's official documentation explicitly states: "Never wait for timeout in production tests. Tests that wait for time are inherently flaky" (Source: [Playwright docs](https://playwright.dev/docs/best-practices), 2026). Replace every `page.waitForTimeout()` with a web-first assertion like `expect(locator).toBeVisible()` that auto-retries until the condition is met or the timeout expires.

```typescript
// Flaky: timing-dependent
await page.waitForTimeout(2000);
await page.click('#submit');

// Stable: state-dependent
await expect(page.locator('#submit')).toBeEnabled();
await page.locator('#submit').click();
```

### Isolate Test State

Each test should be independently runnable in any order. Use fresh browser contexts per test (Playwright's default), per-test database transactions where feasible, and API-level test data setup instead of UI-based workflows that introduce additional flakiness vectors.

### Mock External Dependencies

Real third-party API calls in CI are a category error. Use `page.route()` in Playwright or equivalent network interception to mock external services. Keep a small number of true end-to-end paths for critical journeys, and stub everything else. [INTERNAL_LINK: Eliminating Flaky Tests in Playwright: Auto-Waiting, Isolation, and Network Mocking]

### Use Resilient Locators

Ban XPath structural queries from new tests. Prefer `getByRole()`, `getByLabel()`, and `getByTestId()` — locators tied to user-facing semantics rather than DOM structure. Romano et al. (2021) identified selector brittleness as a first-class E2E flakiness category that barely exists in unit-test research.

## Does Framework Choice Materially Affect Flakiness?

Yes. This is one of the cleanest empirical patterns in the field. Framework architecture determines the flakiness baseline before you write a single test.

Playwright performs five actionability checks before executing any action: visible, stable, receives events, enabled, and editable (for input actions). These checks happen automatically — the test author doesn't need to implement them. This eliminates the #1 root cause (async wait, 45% of all flakiness) by construction rather than by discipline.

The Selenium-era approach relied on explicit waits written by test authors. Miss one `WebDriverWait` call, and you have a flaky test. The difference is structural: Playwright makes stability the default; Selenium makes it opt-in.

Practitioner reports consistently align with this analysis. Slack's CI failure rate dropped from 56.76% to 3.85% after a dedicated initiative that included framework-level changes (Source: [Slack Engineering](https://slack.engineering/handling-flaky-tests-at-scale-auto-detection-suppression/), 2023). GitHub achieved an 18x reduction in flaky builds (Source: [GitHub Engineering](https://github.blog/engineering/infrastructure/reducing-flaky-builds-by-18x/), 2020).

<!-- BENCHMARK_DISCLAIMER: Results depend on workload, environment, and version. Reproduce on your own workload before drawing conclusions. -->

Does this mean migrating frameworks eliminates all flakiness? No. Auto-waiting addresses timing issues but can't fix data pollution, external dependency variance, or non-deterministic test logic. It reduces the baseline meaningfully — think of it as removing the most common category from your flake budget. [INTERNAL_LINK: Eliminating Flaky Tests in Playwright: Auto-Waiting, Isolation, and Network Mocking]

## How Should You Manage Flaky Tests at Scale?

Quarantine — isolating known flaky tests from the CI gate while continuing to execute them for monitoring — is the dominant industry pattern. Every major engineering organization studied employs some variant. But without lifecycle management, quarantine becomes a permanent test graveyard.

![The flaky-test quarantine lifecycle in five steps: detect the flaky test, move it out of the blocking CI path, assign a named owner with a deadline, monitor stability over time, and either reintroduce when health returns or delete past the SLA. Tests with no owner and no deadline become a test graveyard.](./quarantine-lifecycle.png)

### The Quarantine Trap

Martin Fowler recommended a hard cap: maximum 8 tests in quarantine, maximum one-week quarantine period (2011). The failure mode is well-documented: without enforced expiry and ownership, quarantine lists grow unboundedly and become ignored. The quarantine itself becomes unmanaged technical debt.

### What Works at Scale

Slack's "Project Cornflake" reduced build failure rates from 56.76% to 3.85% by switching from result suppression (hiding failures in UI) to execution suppression (actually disabling tests with tracking tickets assigned to owners). The key lesson: visibility and ownership drive resolution, not detection algorithms.

Atlassian's Flakinator processes 350 million+ test executions daily, detected 7,000 unique flaky tests, and recovered 22,000+ builds per quarter. Their approach: Bayesian inference for detection, code-ownership routing for accountability, Jira tickets with deadlines, and automated reintroduction after sustained health (Source: [Atlassian Engineering](https://www.atlassian.com/blog/atlassian-engineering/taming-test-flakiness-how-we-built-a-scalable-tool-to-detect-and-manage-flaky-tests), 2025).

### The Five Principles

1. **Named owner, not "the team"** — every quarantined test needs a specific person accountable
2. **Enforced expiry** — 30-day maximum; auto-disable if unfixed
3. **Automated ticketing** — detection to ticket to notification, no manual steps
4. **Health monitoring during quarantine** — continue running in non-blocking mode
5. **Metric-driven demotion** — tests past SLA get deleted, not perpetually quarantined

For implementation details, see [INTERNAL_LINK: How to Build a Flaky Test Quarantine System That Doesn't Become Technical Debt].

## What's Next: AI, Systemic Flakiness, and the Research Frontier

### Pre-Merge Detection as Highest-Leverage Intervention

Lam et al. (2020) found that 75% of flaky tests are flaky from the moment they're committed (Source: [Lam et al., ICSE 2020](https://dl.acm.org/doi/10.1145/3377811.3380437), 2020). Running detectors on newly added tests catches 75% of flaky tests before they enter the main suite. Extending to directly modified tests raises coverage to 85%. This makes pre-merge detection — running new tests N times before promotion — the highest-ROI intervention point.

### AI-Assisted Repair

FlakyGuard (ASE 2025) reportedly repaired 47.6% of reproducible flaky tests with a 51.8% developer acceptance rate. A peer-reviewed ICSE 2024 study showed LLMs repairing 79% of order-dependent flakes and 58% of implementation-dependent ones.

The honest assessment: AI tools can defensibly heal locator drift and trivial async patterns today. They don't reliably distinguish a flake from a real bug, and they don't address the deep async/concurrency root causes that drive the majority of E2E flakiness. Vendor "self-healing" claims remain largely unbenchmarked in peer-reviewed literature.

### Systemic Flakiness Clusters

Parry et al.'s 2025 finding that 75% of flaky tests cluster by shared root cause opens a new remediation paradigm: fix one underlying infrastructure issue and resolve 13+ tests simultaneously. ML models trained on static test-case distance measures can identify these clusters without expensive 10,000-rerun approaches.

## Deeper Dives: Articles in This Series

This guide is part of our series on flaky tests in E2E suites:

- [INTERNAL_LINK: What the Data Says About the Real Cost of Flaky Tests] — quantitative evidence for the business case behind flaky-test investment
- [INTERNAL_LINK: 7 Root Causes of Flaky E2E Tests (And How to Fix Each One)] — deep dive into each root-cause category with code-level fixes
- [INTERNAL_LINK: Eliminating Flaky Tests in Playwright: Auto-Waiting, Isolation, and Network Mocking] — hands-on implementation guide for Playwright-based suites
- [INTERNAL_LINK: How to Build a Flaky Test Quarantine System That Doesn't Become Technical Debt] — quarantine lifecycle management for growing teams

<!-- AUTHOR_BIO_PLACEHOLDER
Author: [Name]
Role: [Title] — [X] years in test/QA/engineering
Notable work: [OSS contributions, conference talks, or named production deployments]
Website/Profile: [URL]
-->

<!-- AUTHOR_EXPERIENCE: Add 1–2 sentences from the author about hands-on experience applying this pattern on a real project before publication -->

## Key Takeaways

- **Flaky tests are pervasive**: 16% of tests at Google exhibit flakiness; E2E suites are 10x more affected than unit tests due to their larger blast radius and environmental dependencies.
- **Async wait is the #1 root cause at ~45%**: framework-native auto-waiting (Playwright) eliminates this category by construction, not by developer discipline.
- **75% of flaky tests are born flaky**: pre-merge detection on new and modified tests is the highest-leverage intervention, catching issues before they enter the main suite.
- **CI trust erosion is the hidden cost**: the behavioral shift from "investigate red builds" to "click rerun" lets genuine regressions escape — and it's harder to reverse than any technical fix.
- **Quarantine without lifecycle management becomes a graveyard**: named owners, 30-day SLAs, and automated reintroduction are non-negotiable for sustainable flake management.
- **AI repair works for locator drift today**: emerging tools show promise but don't yet address async/concurrency root causes that drive the majority of E2E flakiness.

## FAQ

### What percentage of tests are typically flaky?

Google reports 16% of tests exhibit some flaky behavior, while Meta finds E2E tests reach approximately 10% flakiness compared to well below 1% for unit tests. For mid-market B2B SaaS teams running browser-based E2E suites, expect 5–15% depending on framework choice, suite maturity, and external dependency isolation (Source: [Memon et al., ICSE-SEIP 2017](https://research.google/pubs/taming-google-scale-continuous-testing/), 2017).

### What's the most common cause of flaky E2E tests?

Async-wait issues account for approximately 45% of all test flakiness according to Luo et al.'s foundational taxonomy, confirmed by multiple subsequent studies. In E2E suites specifically, this share is even higher because browser rendering, network responses, and JavaScript event handlers all introduce asynchronous behavior that tests must synchronize against correctly.

### Should you retry flaky tests?

Retries have a narrow legitimate role: surfacing which tests are flaky and preventing false-negative CI signals from blocking deployments. Set `retries: 1-2` in CI configuration and treat every retried pass as flake telemetry to investigate — not as evidence the test is healthy. Retries become harmful when used as a substitute for root-cause investigation.

### How do you distinguish a flaky failure from a real bug?

No fully automated approach reliably solves this. DeFlaker's differential-coverage method (95.5% recall) is the strongest academic result, but Lampel et al. showed that even high-precision predictors misclassify 76.2% of genuine faults in real CI pipelines. The safest operational pattern: retry once, investigate on second failure, and never auto-suppress a test that was previously stable.

### Is it better to fix or delete flaky tests?

Kent Beck advocates deleting non-deterministic tests immediately and rewriting if coverage is needed. Most practitioners prefer a time-bounded quarantine (30 days maximum) with a named owner. The right answer depends on coverage criticality: tests covering payment flows or auth may warrant the fix investment; tests covering non-critical UI styling can be safely deleted.

### Does migrating to Playwright eliminate flaky tests?

Playwright's auto-waiting eliminates the #1 root cause (async-wait, ~45%) by construction. But it can't fix data pollution, external dependency variance, or non-deterministic test logic. Teams migrating from Selenium-based frameworks report roughly 50% fewer flaky tests — directional evidence from practitioner case studies, not controlled experiments.

## Conclusion

Flaky tests in E2E suites aren't a quality problem you can solve once. They're an ongoing operational challenge that requires framework-level prevention, organizational process, and continuous measurement. The research is clear on the hierarchy: start with framework-native auto-waiting to eliminate the dominant root cause, isolate test state to prevent contamination, mock external dependencies for determinism, and quarantine what remains with strict lifecycle management.

The gap between teams that manage flakiness well and those that don't isn't tooling sophistication — it's discipline. Spotify reduced their flake rate by 2 percentage points in two months through visibility alone, before deploying any enforcement tooling. Start by measuring, assign ownership, and enforce time-bounded SLAs.

For hands-on implementation guidance, start with our [INTERNAL_LINK: Eliminating Flaky Tests in Playwright: Auto-Waiting, Isolation, and Network Mocking] technical guide. If you're evaluating your current flakiness burden, the [INTERNAL_LINK: What the Data Says About the Real Cost of Flaky Tests] analysis provides the quantitative framework for building the business case.

<!-- BENCHMARK_DISCLAIMER: Results depend on workload, environment, and version. Reproduce on your own workload before drawing conclusions. -->
