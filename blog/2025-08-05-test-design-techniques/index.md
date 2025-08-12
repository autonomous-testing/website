---
slug: test-design-techniques
title: "Essential test design techniques for web apps"
description: "Learn proven test design techniques for web applications—including boundary value analysis, equivalence partitioning, risk-based prioritization, and model-driven strategies—to maximize testing efficiency and coverage."
tags: [qa, test automation, test design techniques, user stories]
image: /img/blog/test-design-techniques.png
authors: marcel
---

Want broader coverage with fewer tests?

These **test design techniques** help you create a **smallest set of most effective tests**.

This short guide covers **boundary value analysis (BVA)**, **equivalence partitioning (EP)**, **risk-based prioritization**, and **model/state-transition testing**.

You’ll learn **when to use each technique, how to design the cases, and the minimal set** that gives maximum signal.

<!--truncate-->

## Why test design techniques matter

Without structure, testing devolves into guesswork and redundancy. Design techniques give you a repeatable way to select high-value tests and avoid wasted effort.

**What good test design delivers**

- **Eliminates redundancy** using **equivalence partitioning (EP)**
- **Catches edge bugs early** with **boundary value analysis (BVA)**
- **Focuses where it hurts** via **risk-based prioritization**
- **Covers complex flows** using **model- and state-transition testing**
- **Improves maintenance** by organizing tests around **models and risks**, not pages

---

## Use boundary & equivalence to minimize cases

**When to use**: Any input validation (forms, APIs, ranges, enums, formats).

**How to design**

1. Identify input domains (range, set, format).
2. Create **partitions** (valid + invalid).
3. Pick **one representative** per partition (EP).
4. Add **BVA** around each limit: just below, at, just above.

**Minimal set example (age: 18–65 inclusive)**

| Partition        | Representative |
| ---------------- | -------------- |
| valid (in-range) | 25             |
| valid (in-range) | 45             |
| valid (in-range) | 60             |
| invalid (< 18)   | 17             |
| invalid (> 65)   | 66             |

**BVA targets**: 17, **18**, **65**, 66

> Tip: one mid-range value per valid partition is usually enough. Add more only if the code handles subranges differently.

## Decision table (small, real example)

Discount applies when **loyalty = gold** **and** **cart ≥ 100**.

| Loyalty | Cart ≥ 100 | Expect           |
| ------- | ---------- | ---------------- |
| bronze  | false      | no discount      |
| bronze  | true       | no discount      |
| gold    | false      | no discount      |
| gold    | true       | discount applied |

> If rules × inputs explode, consider pairwise generation or MBT to keep the table tractable.

---

## Prioritize risks, then explore to find surprises

**When to use**: Planning sprints/releases; scoping a suite under time pressure.

**How to design**

1. Score features on **Impact** (business/user) × **Likelihood** (defect/complexity/change).
2. Test **high-impact/high-likelihood** first; **high-impact/low-likelihood** next.
3. Allocate **exploratory charters** to the highest-risk zones.

**Quick 2×2**

- **High/High** → automate critical paths + explore each release
- **High/Low** → smoke checks + targeted exploration
- **Low/High** → lightweight checks, observe in prod/telemetry
- **Low/Low** → sample or defer

**Exploratory session charter (template)**

- **Area**: Payments → promo codes
- **Start with**: expired code, special characters, rapid apply/remove
- **Risks**: rounding, concurrency, caching
- **Timebox**: 45 minutes
- **Capture**: notes, defects, screenshots, data used

**Error-guessing checklist (starter)**

- empty/huge inputs, whitespace, special characters
- copy/paste, different keyboard layouts, IME input
- rapid submit/double-click/back/refresh sequences
- timeouts, slow network, offline/restore
- concurrency: two tabs/users editing the same entity

<img
src={require('./prioritize-risks.png').default}
alt="Prioritizing risks"
style={{ width: '50%', height: 'auto', display: 'block', margin: '1rem auto' }}
/>

_Prioritizing risks_

---

## Model workflows with state transitions & BDD

**When to use**: Multi-step flows, role-based behavior, approvals, wizards.

**How to design**

1. List states and allowed transitions (a sketch or bullets is enough).
2. Cover **all valid transitions** at least once; include **invalid transitions** as negative tests.
3. Use **0-switch/1-switch coverage**: single transitions and adjacent transition pairs.

**Example transitions (account recovery)**

- Valid: `Start → RequestToken → EmailSent → ResetForm → Success`
- Invalid: `Start → ResetForm` (no token) → expect a clear error

**BDD scenario (executable specification)**

```gherkin
Feature: Password reset

  Scenario: Valid token enables password reset
    Given a user requested a reset token
    And the token is valid and not expired
    When the user sets a new password that meets complexity
    Then the user can sign in with the new password
```

**User story → tests (traceability mini-map)**

- Extract **happy path**, **alternate paths**, **negative paths**
- Link each scenario to **acceptance criteria**
- Map tests → story IDs for coverage reporting

---

## Implementation tips

- **Start each feature** with EP + BVA for inputs—keep it tiny and repeatable.
- **Re-score risks each sprint**; prune or elevate tests based on change and incident data.
- **Schedule exploratory charters** for top-risk areas every release.
- **Automate from models**: generate cases from state charts/decision tables where feasible.
- **Track four signals**:

  - **defect yield** (by technique)
  - **redundancy removed** (tests deleted/merged)
  - **flake rate** (before/after design cleanup)
  - **requirements coverage** (stories ↔ tests)

---

## Summary

- **Strategic efficiency**: choose tests that add unique value, not volume.
- **EP + BVA**: cover representative inputs and edges with minimal cases.
- **Risk + exploration**: spend time where failures matter and surprises hide.
- **Models & states**: make complex flows testable and maintainable.
- **Traceability**: turn user stories and acceptance criteria into executable checks.

:::tip transform your test design approach 🎯
Skip manual test case creation.
[Wopee.io](https://wopee.io) maps your app, applies user story-based test generation, explores high-risk flows, and generates coverage in minutes.

**Test better. Ship faster.**

---

Tip: Read more about [how to apply test design techniques](test-design-techniques-w-wopee) when you generate tests with [Wopee.io](https://wopee.io).

:::
