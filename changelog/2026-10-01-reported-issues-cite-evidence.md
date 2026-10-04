---
slug: reported-issues-cite-evidence
title: "Bug reports show the actions behind them"
description: "Each reported issue is checked against what the run did: a claim the record contradicts is withdrawn, and locator failures are listed apart from bugs."
---

When the agent reports an issue, it now cites the actions and screenshots behind it, and the claim is checked against the action record. A control reported as doing nothing is confirmed only by a click the page ignored. The report gains a Reported Issues evidence section, and a failure claim about a target the agent acted on successfully is withdrawn, turning the run Incomplete with the contradiction named under Verdict Integrity.

A saved locator that no longer matches is reported as an automation problem with its recovery, not under Issues Encountered, which now lists application defects only. A dropdown the page puts back, or text typed into a field that did not keep it, is caught on read-back and recorded as a finding instead of a silent success.
