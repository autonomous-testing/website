---
slug: how-to-start-with-ai-in-qa
title: "How to Start with AI in QA: The 4 Questions Every Team Asks"
description: "Four questions QA teams ask about AI, answered as one loop: validate docs, derive scenarios, generate tests, draft bugs. A person presses the last button."
tags: [ai-testing, qa-process, test-automation, coding-agents, mcp, getting-started]
image: ./hero.webp
authors: marcel
---

import {
  Loop,
  Terminal,
  StatTiles,
  Takeaway,
  Tiles,
  Pairs,
  Ladder,
  Gates,
  Fit,
  Objections,
} from "@site/src/components/blog/how-to-start-with-ai-in-qa";

Starting with AI in QA means giving an agent one recurring task, a written method for it, and the documents it needs, then checking the output before you automate anything. Teams that do this well treat their four usual questions as one loop: validate the documentation, derive scenarios for what changed, generate and run tests for those changes, and turn failing runs into defect reports. A person stays at the last button of every step.

<!--truncate-->

Over the last months we had the same conversation with several testing teams: a bank, an e-commerce company, a software house. The setting was always similar. Management had said "use AI to improve quality and efficiency". Someone on the team had already tried GitHub Copilot or Cursor for Playwright tests, someone else generated test data with ChatGPT, and someone had tried to generate test cases from the specification and was disappointed. Nothing was a process yet. And the questions were, almost word for word, the same four.

The public forums say the same thing. One tester wrote that management expected a 50% productivity gain from AI, allowed only two tools, and offered no guidance on how (Source: [Ministry of Testing club, 2025](https://club.ministryoftesting.com/t/ai-in-manual-testing/86889)).

This post is for the next team that asks those four questions. No customer names, no tool pitch in the middle, and no theory without a worked example.

## TL;DR

- The four questions (validate docs, derive scenarios, generate and run tests, report defects) are one loop. The changelog item is the unit of work, and the validated documentation is the only source of expected results. Tests run twice: in the merge request, to prove they can fail, and on every scheduled run, which is what step four triages.
- Every step follows one rule: scripts and CI do whatever is the same every time, the model does only the judgement that remains, a named person decides, and every AI output is labelled.
- The model's output is a draft with evidence, never a verdict. A finding must quote the sentence it objects to. An expected result must cite the spec clause or say "unspecified". A bug draft must cite log lines.
- Start with one slash command per step, run by hand on three real tickets, on a fixed day of the week. Automate the trigger later. Add gates last.

## What does "starting with AI in QA" actually mean?

Teams usually send us the questions as a list. We redraw them as one loop, because the output of each step is the input of the next one, and because a single running example makes the whole thing concrete.

Our running example is changelog item **CHG-1234: daily transfer limit raised from 50 000 to 100 000 for verified clients**. The specification lives in the wiki as REQ-PAY-042, the ticket is CHG-1234 in the tracker, the code change is merge request !482. Everything below is illustrative, but the shape is what every team we talked to already had.

<Loop
  caption="The loop the four questions form. The changelog item is the unit of work; the validated documentation is the only source of expected results; every step ends with a person deciding. Execution sits inside step three (CI runs each new test in the merge request) and between steps three and four (the nightly or release run, whose failures step four triages)."
  steps={[
    { title: "Validate docs", ai: "checks completeness, flags contradictions, quotes the sentence", human: "analyst triages the findings", out: "doc report + key areas to test" },
    { title: "Derive scenarios", ai: "boundary table first, then one scenario per cell, citing clauses", human: "tester approves or rejects each one", out: "approved scenarios in the repo" },
    { title: "Generate and run tests", ai: "writes the test; CI runs it three times and on the old code", human: "reviewer approves the CI run and the MR", out: "tagged tests, green in CI", edge: "every scheduled run" },
    { title: "Report defects", ai: "classifies each failure of the scheduled run, drafts the bug with evidence", human: "QA lead presses create", out: "a bug someone can act on" },
  ]}
/>

<Takeaway>The figure is the whole method. Everything else in this post is detail on one step.</Takeaway>

## Question 1: Can AI validate our documentation before we test against it?

**The problem.** Almost every team told us the same story: they tried generating test cases straight from the specification and the result was useless, because the specification was incomplete, contradicted itself, or described a version of the feature that never shipped. The model did not fail. It faithfully turned bad input into confident output.

**What does not work.** One generic prompt, "review this document", returns a page of plausible remarks, most of them noise. You cannot tell which ones matter, and after a week nobody reads them. A test lead who evaluated several generation tools described the same experience from the other side: the same requirement produced a different number of test cases on every run, duplicates everywhere, and only the login-style flows came out right (Source: [Ministry of Testing club, 2025](https://club.ministryoftesting.com/t/how-will-you-validate-or-check-ai-generated-test-cases-in-real-projects/86289)). Do not chase that with temperature settings; the same prompt can still differ between runs. Enumeration, a schema and a gold set are the fix.

**The solution** is to split "validate documentation" into three checks that need three different techniques.

1. **Is the set complete?** Your methodology already says which documents a change must have: an approved functional specification, an integration document, mockups, whatever your process prescribes. Write that checklist down once. The agent's first job is deterministic: pull the ticket and the metadata of every linked document (title, type, approval status, version) and tick the list. Only the checklist documents are fetched in full, one link deep, with a size cap. No model needed for this part.
2. **Is each statement usable?** Now the model earns its place. It scores each requirement against a short rubric (unambiguous, testable, complete, singular) and must quote the exact sentence it objects to. A finding without a quoted sentence is rejected automatically: the model returns JSON that must match a schema you wrote, a script checks that every quote string-matches the source document, and the run is rejected if either check fails. That is what "rejected automatically" means everywhere below. Give the rubric ten to twenty examples of what your own reviewers flagged in the past. Without them, the model flags everything.
3. **What changed?** Compare the document version with the previous one and classify each change as behavioural, editorial or structural, with the quoted span. Behavioural changes are the ones that need new scenarios.

In practice this is one command, `/check-spec CHG-1234`, and its output looks like this:

<Terminal
  cmd="/check-spec CHG-1234"
  step={1}
  who="Tester types"
  out={`Documents: functional spec ✓ approved · integration doc ✗ missing · mockup ✓
REQ-PAY-042 §3: "verified clients" is used, but the glossary defines "verified"
two ways (KYC level 2 vs 3).
Missing acceptance criterion: what happens at exactly 100 000.00?
Key areas to test: limit boundary, unverified client, daily reset.`}
  lands={[{ text: "Comment on the ticket and the spec page", kind: "plain" }, { text: "Sub-task for the analyst", kind: "plain" }, { text: "No document is edited automatically", kind: "human" }]}
/>

The report goes to the ticket as a comment and to the analyst as a sub-task. Nothing is edited automatically, and this step has no write tools beyond that comment: it reads documents other people wrote, which is exactly where a planted instruction would sit (more on that in the FAQ). The metric that tells you whether this works is not "findings raised", it is the share of findings the analyst confirms. Make triage mandatory only once the analyst confirms roughly seventy percent of findings.

<Takeaway>Documentation validation is three checks, not one prompt: a deterministic completeness checklist, a grounded rubric review that quotes the sentence, and a semantic diff of versions. The confirmed-finding rate is the metric.</Takeaway>

## Question 2: How do we derive test scenarios from changes, not from the whole app?

**The problem.** Asked for scenarios, a model produces sixty variations of the happy path and skips the boundaries. Worse, if you give it the code, it derives expected results from the implementation and then writes tests that confirm the bug.

**The solution** has two halves, and only the second one uses the model.

First, scope the change deterministically. Resolve the changelog item to its ticket and merge request, take the diff, map the changed files to endpoints and screens, and look up which requirements and existing tests touch them. Tools like `git diff`, an OpenAPI diff, and per-test coverage maps do this without a single token. If you have neither, the impact set is a one-page table written by hand for the pioneer project: screen or endpoint, requirement ID, tests carrying that ID. The developer fills the first column in the merge request description. Crude, and enough. Either way the result is an impact set: what this change can affect. Add a risk column while you are there: anything that moves money, changes an entitlement or writes an audit record is high risk regardless of size, gets approved first and gets the executable checks of step three.

Second, make the model enumerate instead of improvise. Two passes work far better than one:

- Pass one: "list every input, state and rule in the affected clauses; for each give the valid partitions, the invalid partitions and the boundaries." The output is a table, and a script checks that every numeric partition has boundaries and every rule has both branches.
- Pass two: "produce exactly one scenario per table cell; at least forty percent must be negative or error cases; every expected result must quote a clause of the specification, and if the specification is silent write UNSPECIFIED and a question."

The last rule is the most important sentence in this post. We call it cite-or-abstain. It turns the model from a guesser into a reader.

<Terminal
  cmd="/scenarios CHG-1234"
  step={2}
  who="Tester types"
  out={`S1  99 999.99, verified   → accepted                REQ-PAY-042 §3
S2  100 000.00, verified  → accepted                REQ-PAY-042 §3
S3  100 000.01, verified  → rejected E-LIMIT-01     REQ-PAY-042 §4
S4  60 000, unverified    → rejected (limit 50 000) REQ-PAY-042 §2
S5  limit resets at 00:00 → UNSPECIFIED → question back to the analyst
S6  40 000 + 60 000.01 same day, verified → second rejected E-LIMIT-01 REQ-PAY-042 §3
T-118 (existing) asserts rejection at 60 000 for verified → now wrong: update or retire`}
  lands={[{ text: "Scenarios in the test repo or the test tool of record, keyed by requirement and change ID", kind: "plain" }, { text: "Tester approves 5, rejects 1, updates T-118", kind: "human" }]}
/>

S6 is the line a model skips unless the table forces accumulated state: a daily limit is cumulative, not per transfer. T-118 is the other line worth the whole exercise: an existing test that the change makes wrong. Each scenario also names its data precondition (a verified client at KYC level 3, balance above 100 000, no transfers today); the tester checks the data exists or can be created, and a scenario without data is approved as a scenario and parked as a test. A tester reviews the list next to the quoted clause and the diff, approves five, rejects one and sends T-118 back for an update. Nothing is automated until that approval. The metric is the acceptance rate after review. Teams we know consider seventy percent a good pilot result, and the largest industrial study we found lands in the same place: engineers at Meta accepted 73% of the tests its mutation-guided generator proposed (Source: [Foster et al., FSE 2025](https://arxiv.org/abs/2501.12862)). If Xray, Zephyr, TestRail or ALM is your system of record, the approved scenarios are created there through its API, keyed by requirement ID and change ID, and the Markdown is the review copy; do not keep two sources of truth. If you want the classic techniques the model should be forced through, we wrote them up in [test design techniques with Wopee.io](/blog/test-design-techniques-w-wopee/).

<Takeaway>Scope the change deterministically, then make the model fill a boundary table before it writes scenarios, and require every expected result to cite the specification or abstain. The tester's acceptance rate is the metric.</Takeaway>

## Question 3: How do we generate and run automated tests for changelog items?

**The problem.** Tests written by a model tend to pass. That is not good news: a test generated after the code is written asserts what the code does, including its bugs. Coverage will not warn you: on real Python bugs, test suites with near-identical line coverage around 85% detected anywhere between 17% and 69% of the bugs (Source: [Vathana et al., 2026](https://arxiv.org/abs/2606.08588)). Teams also discover the maintenance debt later than the demo: tests that do not compile, magic numbers, assertions on private fields.

**The solution** is to treat this as code generation with a hard oracle (the approved scenario decides what is correct, never the code), inside the merge-request workflow you already have. Execution is not a separate step, it happens twice: CI runs each new test in the merge request, where it has to prove it can fail, and the whole tagged suite then runs on the schedule you already have (nightly, per release, on a deploy to the test environment). The second run is the one step four listens to.

- **Route by layer.** A logic change gets a unit test, a service change gets an API test from the OpenAPI spec, and only a user-visible flow gets one end-to-end test. Many changelog items never need a browser; for a QA team that tests on a shared acceptance environment the share is lower, and that is fine. If your QA team does not own unit tests, the lowest layer you own is the API test: propose the unit test to the developer in the merge request comment and count the change as covered only when it exists. For the ones that do, Playwright itself has shipped planner, generator and healer agents since version 1.56 (October 2025), and they are still part of the current release (Source: [Playwright release notes](https://playwright.dev/docs/release-notes)). The healer replays the failing test, inspects the live page and patches the test, typically a locator, a wait or test data. Out of the box it may also change assertions and expected values, and mark a test it cannot fix as `test.fixme()`. That is why every healer diff is a merge request: locator and wait changes get a quick look, any change to an assertion or a fixme is reviewed as a possible product bug (Source: [Playwright test agents](https://playwright.dev/docs/test-agents)).
- **Let a coding agent open a merge request.** Whether it is Copilot in VS Code, Cursor, Claude Code or another agent, give it the approved scenario, a short conventions file (which page objects and fixtures exist, how tests are tagged, what "done" means) and a sandbox with no production credentials. It writes `transfer-limit.spec.ts`, tags it `@CHG-1234` and opens the MR. The pipeline waits for a human to approve the run.
- **Prove the test can fail.** Start with the revert check: run the new test against the parent commit, and it must fail there with an assertion failure, not a compile error or a missing route. For end-to-end tests against a shared environment there is no parent commit: use the previous release build, or flip the expected value on purpose and check that the test fails. A test that passes both ways is hollow. Once your CI already runs a mutation tool (it plants small bugs and checks that the new test catches them), add it on the changed files and treat a drop in score as a blocker, not a rise as proof. A 2026 replication study of 8,268 generated suites found that mutation score tracks real-bug detection well when comparing models on correct code, weakly for individual suites, and not at all when the code under test is itself buggy; treat it as a floor that catches assertion-free tests, and let the revert check cover the one thing mutation analysis skips, whether the test notices the actual bug (Source: [Zhao, Zhou and Cohen, ISSTA 2026](https://arxiv.org/abs/2607.22880)). New tests also run three times, and any flaky result blocks the merge; three runs catch only the worst flakes, so keep the per-source flake metric running after merge.
- **Review with a checklist.** Behavioural assertion, existing helpers reused, one scenario per test, readable in thirty seconds.

<Terminal
  cmd="/write-tests CHG-1234"
  step={3}
  who="Tester types"
  out={`lint ........ ok
tests x3 .... 5 passed, 0 flaky
mutation .... 84% on LimitService (was 71%)
revert-check  transfer-limit.spec.ts fails on parent ✓`}
  lands={[{ text: "Merge request reviewed by a developer with a checklist", kind: "human" }, { text: "Test tagged @CHG-1234 lives in your repo and runs on every scheduled run", kind: "plain" }]}
/>

Report coverage of changelog items, not lines: "seventy percent of this release's changes had a tagged green test before release" is a number management understands and cannot inflate. And when the next change breaks a locator, that is a maintenance problem with known answers, covered in [self-healing in test automation](/blog/self-healing-in-sw-test-automation/).

<Takeaway>Generate tests from the approved scenario, at the lowest layer that observes the behaviour, inside a normal merge request, and gate on a revert check and mutation score rather than line coverage.</Takeaway>

## Question 4: Can AI report defects from test results?

**The problem.** Most red in a nightly run is not a product bug. It is a flaky test, a broken environment, stale test data or a locator that moved. Any system that files a ticket per failure becomes a spam generator, and after the first week of false alarms nobody trusts it again. Ignoring everything flaky is not the answer either: a nine-month study of Chromium's CI found that tests which are flaky at some point still reveal more than a third of all regression faults (Source: [Haben et al., 2023](https://arxiv.org/abs/2302.10594)).

**The solution** is to classify failures, not tests, and to keep the model for the residual.

1. **Deterministic triage first.** Normalise every run to one JSON report (the community [CTRF](https://ctrf.io/docs/intro) format is a pragmatic choice) so the rules see the same fields whatever the runner. Passed on retry: flaky. Same error signature (fingerprint) as an open issue: known, add an occurrence. Half the suite failed with DNS errors: infrastructure. Report platforms you may already run do this with fingerprints and simple rules, and they dispose of most failures without a model call. If flakiness itself is your problem, start with the [flaky tests guide](/blog/flaky-tests-complete-guide/).
2. **The model drafts, for new fingerprints only.** It receives the trace, the relevant log lines, the requirement text and the merge requests merged since the last green run, and returns a structured draft: classification with confidence, expected versus actual, a minimal reproduction, the suspected change, a severity proposal. Every claim must reference a log line or a request. "Insufficient evidence" is a valid answer. Severity is not a model judgement: put your defect policy in the skill as a table (money moved or blocked wrongly is critical, a wrong amount shown is high, a wrong message is low), let the model apply the table and quote the row, and count the overrides; a rising count means the table is wrong, not the model. Attachments are masked before they leave the runner: a HAR file from a test environment with production-derived data carries names and account numbers, and that is a compliance issue before it is a testing one.
3. **A person presses the button.** For the first sixty days everything stays a draft. Only after you have measured precision do you let high-confidence, new, non-duplicate product bugs be filed automatically, with a cap per run. A confidence the model prints about itself is a label, not a probability: before you use it as a threshold, check on the gold set what share of drafts at 0.8 were actually accepted.

<Terminal
  cmd="nightly run → /triage"
  step={4}
  who="What happens"
  returns="Agent drafts"
  out={`PAY-1311 [payments] Transfer over limit accepted (transfer-limit.spec.ts:88)
Expected: rejected with E-LIMIT-01 (REQ-PAY-042 §4)
Actual:   HTTP 200, transfer created (screenshot, HAR #17)
Suspected: MR !487 "Refactor limit check", merged 2 h before first red
Severity proposal: High · confidence 0.82 · label ai-draft`}
  lands={[{ text: "Draft only: the QA lead presses create", kind: "human" }, { text: "Flaky and known failures never reach the model", kind: "plain" }]}
/>

Google's Auto-Diagnose does this for integration-test failures inside code review: on 71 hand-checked real failures it named the root cause correctly 90% of the time, and after a company-wide rollout only 5.8% of user feedback rated it "not helpful" (Source: [Ziftci et al., ICSE 2026](https://arxiv.org/abs/2604.12108)). That is exactly the range where drafting saves hours and unreviewed filing would still be wrong once in ten. The metrics are the share of drafts accepted without rework, the false-positive rate and the duplicate rate.

<Takeaway>Retries, fingerprints and infrastructure signatures dispose of most failures; the model drafts a bug with cited evidence for new failures only; a human files it. Measure precision before any auto-filing.</Takeaway>

## The question behind the questions: how do we know the output is good?

This is the one people ask last and mean first. In one analysis of 510 questions asked at testing webinars, two thirds carried a human-oversight concern (Source: [TestGuild, 2026](https://testguild.com/automation-testing-trends/)). One testing methodologist calls responsibility the human moat: an operator who cannot evaluate and reject the tool's output is not using it responsibly (Source: [Satisfice, 2026](https://www.satisfice.com/blog/archives/488082)). The honest answer is that you do not know by reading it. You know by designing the loop so that something other than your eyes checks the output:

One number per step tells you whether it works: confirmed findings, accepted scenarios, changelog items covered by a green test, drafts accepted without rework. Start the gold set small: twenty reviewed requirements, five closed changelog items with known outcomes, thirty labelled failures, grown from every output a reviewer rejects during the pilot. Score precision and recall against the labels, run it three times to see the variance, re-run it whenever the model or a prompt changes, pin the model version and stamp every artefact with the model ID and the prompt's commit hash.

Across the industrial results we could find, AI-generated tests are accepted somewhere between 44% and 73% of the time when an engineer decides: Uber reports explicit acceptance of about 44% of the viable tests its AutoCover pipeline proposes in the IDE, and Meta's engineers accepted 73% of the tests from its mutation-guided generator (Sources: [Rastenis et al., ICSE 2026](https://homes.cs.washington.edu/~rjust/publ/auto_cover_icse_2026.pdf); [Foster et al., FSE 2025](https://arxiv.org/abs/2501.12862)). That range is the point: good enough to save time, not good enough to skip review.

<Pairs
  left="Failure mode"
  right="Guardrail"
  rows={[
    { a: "A finding that sounds plausible but points at nothing.", b: "Every finding must quote the sentence or log line it is about. Uncited findings are dropped before a human sees them." },
    { a: "An expected result invented from the implementation.", b: "Cite or abstain: expected results cite the specification or say \"unspecified\". Code is never the oracle." },
    { a: "A generated test that passes because it asserts the current behaviour.", b: "Run it on the parent commit (it must fail) and through mutation testing before anyone reviews it." },
    { a: "A prompt or model change that silently shifts quality.", b: "A gold set of reviewed requirements, closed changes and labelled failures, re-run on every change." },
  ]}
/>

## Skills vs MCP vs scripts: what the agent needs to know, reach, and run

Three words come up in every conversation and they mean three different things. The rule that sorts them: if it is the same every time, script it; if it needs judgement, write a skill; if it needs access, expose it through MCP.

<Tiles
  cols={3}
  items={[
    { tag: "Holds your methodology", title: "Skill", text: "A folder with a SKILL.md: a name, a description, the instructions, and any scripts or examples it needs. Which documents a ticket must link, how a scenario is written, what a good bug report looks like. Reviewed like code. Costs tokens per run." },
    { tag: "Holds the agent's reach", title: "MCP", text: "Read a ticket by ID, fetch a spec page, open a merge request, run a suite, fetch results, file an issue. Costs tokens per call, so use it for lookups by ID." },
    { tag: "Holds the deterministic parts", title: "Script", text: "Export the tracker nightly, compute the diff and the impact set, build the test list, post results to CI. Runs a thousand times without tokens." },
  ]}
/>

A skill is a folder with a SKILL.md file whose front matter carries a name and a description, followed by the instructions and optional scripts or reference files. The agent reads only the name and description at startup and loads the full instructions when a task matches the description, or when you call the skill by name (a slash command in Claude Code, a $ mention in Codex). The format is an open standard started by Anthropic and supported by Claude Code, Codex, Gemini CLI, Cursor, GitHub Copilot, VS Code and dozens of other agents, so a skill written once travels with the team, not with the tool (Source: [Agent Skills specification](https://agentskills.io/specification)). Newer models need less hand-holding, but they still do not know how your organisation works. That is what the skill is for. Every connected MCP server also costs context on every turn, because its tool descriptions travel with the prompt: connect only the servers a skill needs, and run each one under a service account that reads one project and writes to one, never under a person's login.

Teams that got past experimenting all ended up in the same place: one shared repository of skills, team skills kept apart from personal ones, and the agent proposing skill changes after each session as a merge request with a plain-language description. That habit is what keeps five people from experimenting in five directions. The alternative shows up in telemetry: across more than 10,000 developers, AI adoption raised pull requests by 98% and review time by 91% while delivery metrics stayed flat, and the authors conclude that specification discipline, not model capability, is the binding constraint (Source: [Farrag, 2026](https://arxiv.org/abs/2605.01160)).

## How to roll it out: manual first, then automate the trigger

Pressure from management and no time set aside: every team had both. Fix the second one first. This is how to use AI in the QA process without a big programme. A senior testing consultant's advice for picking the first task is still the best we know: find the place where you lose four minutes every day and start with that (Source: [Qt blog, 2025](https://www.qt.io/software-insights/exploratory-testing-with-genai-how-ai-becomes-an-external-imagination-in-software-qa)). Then climb this ladder, bottom rung first, one rung per step of the loop, with an exit criterion before you move up.

<Ladder
  rungs={[
    { title: "Draw your own process", example: "The boxes in order, the ticket ID as the unit of work. One hour. It will be redrawn in two weeks and that is fine.", note: "Exit: the drawing exists and management has agreed a fixed day per week for one team and one pioneer project." },
    { title: "One slash command per step, by hand", example: "Run /check-spec on three real tickets on the first Friday. Read the report. Write down what was missing.", note: "Exit: three consecutive runs where the reviewer deleted or rewrote fewer than one finding in five. Count items, not words." },
    { title: "Write the skill when you know what you want", example: "The document checklist, the report format, one good and one bad example.", note: "Exit: a new team member gets the same quality of output on their first run." },
    { title: "Automate the trigger", example: "A status change in the tracker (\"ready for test\") fires a webhook to CI; the report arrives as a ticket comment or an email. Key every run on ticket ID plus document version, so a repeated webhook does not post a second comment.", note: "Exit: a measured false-positive rate you are willing to live with." },
    { title: "Chain, then gate", example: "Step one triggers step two; later steps three and four, each with a cap on tool calls and tokens. Only then a gate with explicit rules for what must hold.", note: "Exit for chaining: the chain completes unattended twice. Gates only with measured precision." },
  ]}
/>

A strict gate on day one stalls everything. The first weeks feel slower because you check everything. DORA's 2026 ROI report calls this the J-curve: a dip before the return, and its own illustrative model for a large engineering organisation lands at roughly a 39% first-year return with an eight-month payback, which DORA itself calls a high-uncertainty estimate (Source: [DORA, 2026](https://dora.dev/ai/roi/report/)). The same report cites Stanford research that gains of 35 to 40% on simple greenfield tasks shrink to 10% or less on complex legacy code. Plan the business case on the legacy number, not on the demo.

Agree the stop rules before the first Friday, too. Stop a step if, after ten runs, fewer than half of its findings or scenarios are confirmed, if reviewer edits per artefact are not falling by week six, or if tests alive after 30 days are below your human-written baseline. Stopping one step does not stop the loop; it sends that step back a rung.

## What not to hand to AI first

<Tiles
  cols={2}
  items={[
    { title: "Exploratory testing", text: "The value is in the human noticing what nobody wrote down." },
    { title: "Release decisions", text: "An agent can summarise evidence; it should not sign the release." },
    { title: "Anything where the agent grades its own output", text: "A model judging its own test's assertions, or its own bug draft's severity, is the oracle problem in a loop." },
    { title: "Bulk regeneration of the whole suite", text: "Regenerate for the delta, keyed by requirement and change, or you throw away every test a human already improved." },
    { title: "Your existing manual test cases", text: "They stay where they are. The loop adds scenarios per change; when a change touches a requirement ID, the agent lists the existing cases under that ID and marks the affected ones, so the tester updates them instead of receiving duplicates." },
  ]}
/>

<Objections
  items={[
    { claim: "Newer models make skills unnecessary.", answer: "Models get better at reasoning, not at knowing which documents your change process requires or which labels your tracker uses. A skill is that knowledge, versioned. Refactor it now and then like code; do not delete it." },
    { claim: "AI-written code needs less testing.", answer: "It needs more, and different testing. Generated tests tend to lock in what the code does, and AI raises throughput before it raises stability. More code, produced faster, with tests that agree with it, is exactly the situation the four-step loop exists for." },
    { claim: "We should buy a platform first.", answer: "Assemble first with what you have: a coding agent, a shared skills repository, MCP connectors, your CI. Buy where you lack a framework or automation capacity. Build your own platform last, if ever. Keep the three parts separable: skills are Markdown in your repository, MCP is an open protocol, scripts are yours. That is the exit from any vendor, including us. Ask every vendor two questions before you sign: where does our data sit, and what do we keep if we leave." },
  ]}
/>

## What to measure before you add gates

An AI testing strategy for a QA team fits in four numbers, from a baseline measured before the pilot. None of them is "prompts sent" or "tests generated".

| Number | What it tells you | Healthy direction |
|---|---|---|
| Time to first useful output | How long from a ticket to a report or scenario set a reviewer accepted | Minutes, not days, after week four |
| Reviewer edits per artefact | How much of the AI output a person had to change | Falling week over week |
| False positives per week | Findings, scenarios and bug drafts rejected as wrong | Known and falling before any automation |
| Tests alive after 30 days | Generated tests still green and still in the suite a month later | Above your human-written baseline, or 90% if you have none |
| Tokens per accepted artefact | What one useful output costs, from the provider's usage log | Known from week one; a per-day cap before any automation |

Add the two stability numbers from your delivery pipeline, change failure rate and rework, from day one. AI raises throughput first; if stability drops at the same time, you have found the limit of your foundations, not of the model.

A few figures worth carrying into the management conversation, all from primary sources.

<StatTiles
  items={[
    { value: "90%", label: "of nearly 5,000 technology professionals use AI at work; throughput is up, delivery instability too", source: "DORA 2025", href: "https://dora.dev/dora-report-2025/" },
    { value: "33%", label: "of developers trust the accuracy of AI output; 46% distrust it", source: "Stack Overflow Developer Survey 2025", href: "https://survey.stackoverflow.co/2025/ai" },
    { value: "89% vs 15%", label: "organisations piloting GenAI in quality engineering vs running it enterprise-wide", source: "World Quality Report 2025-26", href: "https://www.capgemini.com/insights/research-library/world-quality-report-2025-26/" },
    { value: "73%", label: "of generated tests accepted by engineers at Meta; 44% explicit acceptance at Uber", source: "Foster et al. 2025; Rastenis et al. 2026", href: "https://arxiv.org/abs/2501.12862" },
  ]}
/>

Two more figures belong in the same conversation. In METR's randomised trial, experienced developers took 19% longer with early-2025 tools while believing they were about 20% faster (Source: [METR, 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)). And 76.8% of testers already use AI while 2.1% rate their practice "optimized" (Source: [State of Testing 2026](https://www.practitest.com/state-of-testing/)).

The same World Quality Report names the barriers to scaling: data privacy (67%), integration complexity (64%), hallucination and reliability (60%) and a skills gap (50%). The loop above answers the third and the fourth; the first two are contract and platform questions, and the section below is where they belong. The vendors of coding agents themselves say that once agents build in hours, the bottleneck moves to planning, review, testing and approval (Source: [Claxton, 2026](https://claude.com/blog/the-ai-native-sdlc-playbook)); even at half that pace, the QA team is where the queue forms. The pattern is consistent: adoption is universal, trust and maturity are not, and the teams that get value are the ones that put verification design first.

## What it costs, and when to stop

The tokens are not the line item. A `/check-spec` run that pulls five linked specification pages into the model (about 25,000 input and 2,000 output tokens) costs roughly $0.07 on a mid-tier model and $0.18 on a top-tier one at September 2026 list prices; a team of six checking 40 tickets a month spends about $3 to $7 on tokens, or $8 to $21 if every ticket takes three iterations (Sources: [GitHub Copilot plans](https://docs.github.com/en/copilot/get-started/plans); [Claude pricing](https://claude.com/pricing)). The seats are the real cost: six coding-agent seats run from about $114 a month on Copilot Business to $240 on Cursor Teams, and agentic loops re-send context on every turn, so a per-day token cap belongs in the CI job before any trigger is automated.

Two questions go to every vendor in writing before the pilot: where does the data physically sit when a prompt is processed and when it is stored, and what do we keep, and what gets deleted, on the day we leave? In September 2026 the honest answers differ: some vendors pin inference to the EU for a surcharge, others offer US or global routing only, and deletion terms range from thirty days to "the life of the account". Business plans of the main coding agents exclude customer code from training by default; check the current terms, because two of them changed this year. The stop rules from the roll-out section are the other half of the budget: a step that does not earn its review time after ten runs goes back a rung, and that decision is cheap only if it was agreed before the first Friday.

## Where Wopee.io fits, and where it does not

[Wopee.io](/ai-testing-agents/) is built for steps two and three of this loop, for web applications. Its agents crawl the app, build an app context, derive user stories and tests, run them in a real browser, keep them alive when the UI changes and add visual checks where pixels matter (the pipeline is on the [how it works](/how-it-works/) page). It speaks MCP: our [MCP server](/mcp/) exposes running a suite, fetching executed test cases and creating an issue as tools any coding agent can call, which is how "turn a failed run into a filed bug" works from inside an editor (see the [changelog entry](/changelog/mcp-chat-and-bug-filing/)), and scheduled [test plans](/changelog/test-plans/) are the concrete form of "automate the trigger". What Wopee.io does not do is own your loop. For an honest map of what agents can and cannot do today, read [AI testing agents in 2026](/blog/ai-testing-agents/).

<Fit
  best="Steps two and three, for web apps, driven from your coding agent through MCP."
  notFor="Owning your loop. Checklist, gates, skills repository and metrics stay with your team; they are what make any AI output trustworthy."
/>

## What to do on Monday

<Gates
  items={[
    { title: "Draw the four boxes for your own process", text: "Write the changelog item ID on the arrow between them. One hour, one whiteboard." },
    { title: "Write your document checklist as one Markdown file", text: "Then run /check-spec on three real tickets by hand and note what was missing." },
    { title: "Ask management for one fixed day a week, in writing", text: "For one team and one pioneer project, with the pass criteria and the stop rules agreed before the first Friday." },
    { title: "Get the model endpoint and the data classification approved in writing", text: "Which model, which endpoint, which documents may go in, under which service account. The agent acts under a named service account; the human approval is recorded on the ticket under the human's name. Otherwise security cancels the first Friday, not the model." },
  ]}
/>

Everything else follows from those three.

:::tip Want the loop on a real web app?
[Wopee.io](https://wopee.io) covers steps two and three: AI testing agents that generate and run tests in a real browser, keep them alive when the UI changes, and plug into your coding agent through MCP. Your process, your gates, your metrics.
:::

## FAQ: starting with AI in QA

### Where should a QA team start with AI?

With documentation validation and scenario derivation for changed features. Both produce advisory output, both have an easy acceptance metric, and neither touches production. Run them by hand on real tickets for a few weeks before automating anything.

### How do I generate tests from a changelog or pull request?

Resolve the item to its ticket and diff, build the impact set with scripts, let a coding agent write the test from an approved scenario inside a merge request, and prove the test fails on the parent commit before anyone reviews it. Tag the test with the changelog ID so coverage can be reported per change.

### Do I need to know how to code to use AI in QA?

Not for steps one and two. Validating documentation and deriving scenarios are prose-in, prose-out; the slash command can run from a chat window or a ticket comment, and approval is a comment or a status change in the tracker, not a git review. Steps three and four live in the code repository and the CI pipeline, so a developer or automation engineer reviews those merge requests.

### What is the difference between a skill, an MCP server and a script?

A skill is a SKILL.md folder in the open Agent Skills format, loaded when a task matches its description or when you call it by name. Judgement goes in a skill, access goes through MCP, repetition goes in a script.

### How accurate are AI-generated tests, and how do I check them?

Between about 44% and 73% acceptance in the industrial studies we found, depending on the setting. Check them with executable evidence, not by reading: the test must fail on the old code or the previous build, and run three times without flaking.

### Should AI-generated tests block a release automatically?

Not at first. Gates come last, after the false-positive rate and the acceptance rate are measured and stable for a release cycle. A gate added on day one blocks the pipeline on unverified output and the team routes around it within a week.

### Can AI file bugs from failed test runs?

Yes, as drafts, with a person on the "create" button for at least sixty days. Then allow automatic filing only for high-confidence, new, non-duplicate product bugs with a cap per run.

### Does AI-generated code reduce the need for testing, or demand more?

More. It was the most-upvoted anonymous question across 510 testing webinar Q&As (Source: [TestGuild, 2026](https://testguild.com/automation-testing-trends/)), and the studies above say why: generated tests tend to lock in what the code does.

### Is it safe to give an AI agent access to our app and repository?

Only with limits that are written down, because an agent reading your bug tickets is also reading whatever an attacker wrote in them. Tickets, wiki pages, logs and HAR files are untrusted input: a planted line that reads like an instruction can be followed, and OWASP lists this indirect prompt injection as the top risk for LLM applications (Source: [OWASP LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)). So decide what the agent can write before you decide what it can read. Start it read-only; the step that reads documents gets no write tools at all. Give it its own service account scoped to one repository and one tracker project, never a tester's personal token. Let nothing it produces run in CI until a person approves it (GitHub's coding agent, for example, pushes to a single branch and its workflows wait for a human's "Approve and run" by default; Source: [GitHub Docs](https://docs.github.com/en/copilot/responsible-use/copilot-coding-agent)). Wrap fetched content in a labelled block the skill tells the model not to take instructions from, demand a fixed output shape and an allow-list of tools. And run it in a sandbox with staging credentials, an outbound allow-list and a log of every tool call, because the goal is not to stop it reading a poisoned page but to make sure nothing leaves when it does. Separately, the model endpoint itself needs approval for the data class of your specifications and code; that is a contract question, answered in the section on cost and vendors.

## References

1. DORA, *State of AI-assisted Software Development 2025*, Google Cloud, September 2025. [dora.dev/dora-report-2025](https://dora.dev/dora-report-2025/)
2. DORA, *ROI of AI-assisted Software Development* (v.2026.1), April 2026. [dora.dev/ai/roi/report](https://dora.dev/ai/roi/report/)
3. METR, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity", July 2025. [metr.org](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
4. Stack Overflow, *2025 Developer Survey*, AI section, July 2025. [survey.stackoverflow.co/2025/ai](https://survey.stackoverflow.co/2025/ai)
5. Capgemini, Sogeti and OpenText, *World Quality Report 2025-26*, November 2025. [capgemini.com](https://www.capgemini.com/insights/research-library/world-quality-report-2025-26/)
6. PractiTest, *The 2026 State of Testing Report*, January 2026. [practitest.com/state-of-testing](https://www.practitest.com/state-of-testing/)
7. Foster et al., "Mutation-Guided LLM-based Test Generation at Meta", FSE 2025. [arXiv 2501.12862](https://arxiv.org/abs/2501.12862)
8. Rastenis, Chou, Roy Choudhary and Just, "Automated Software Test Generation at Industry Scale Using a Multi-Agent Architecture and Workflow Integration", ICSE-SEIP 2026. [PDF](https://homes.cs.washington.edu/~rjust/publ/auto_cover_icse_2026.pdf)
9. Haroon, Khan and Gulzar, "Evaluating LLM-Based Test Generation Under Software Evolution", March 2026. [arXiv 2603.23443](https://arxiv.org/abs/2603.23443)
10. Vathana, Bhatt, Patel and Eisty, "LLM vs. Human Unit Tests: Fault Detection on Real Python Bugs", June 2026. [arXiv 2606.08588](https://arxiv.org/abs/2606.08588)
11. Ziftci, Liu, Greene and Dalloro, "LLM-Based Automated Diagnosis of Integration Test Failures at Google", ICSE-SEIP 2026. [arXiv 2604.12108](https://arxiv.org/abs/2604.12108)
12. Haben, Habchi, Papadakis, Cordy and Le Traon, "The Importance of Discerning Flaky from Fault-triggering Test Failures: A Case Study on the Chromium CI", 2023. [arXiv 2302.10594](https://arxiv.org/abs/2302.10594)
13. Microsoft, Playwright release notes and Test Agents documentation. [playwright.dev/docs/test-agents](https://playwright.dev/docs/test-agents)
14. ctrf-io, *Common Test Report Format* specification (working draft). [ctrf.io](https://ctrf.io/docs/intro)
15. Louis Claxton, "The AI-Native SDLC playbook", Claude by Anthropic blog, August 2026. [claude.com/blog](https://claude.com/blog/the-ai-native-sdlc-playbook)
