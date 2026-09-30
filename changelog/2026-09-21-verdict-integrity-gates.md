---
slug: verdict-integrity-gates
title: "A pass the agent could not prove is not a pass"
description: "Integrity gates catch runs that asserted nothing or skipped steps, mark them Incomplete in amber, and close stranded runs instead of leaving them hanging."
---

Every run now passes through integrity gates: a defined assertion that never executed, a run that asserted nothing, an input that never reached the page, a report resting on values nothing observed. In the default Report only mode, the report gains a Verdict Integrity section with a shadow verdict. When it disagrees with a stored pass, the run paints half green, half amber on the Analysis, Library and Runs tabs, with the gate named in the tooltip. Counts and filters are unchanged.

Switch a project to Enforce and such a pass is downgraded to Incomplete: amber, not red, because the run proved nothing rather than found a defect. Incomplete is now a verdict everywhere. A run whose agent died, a workflow cancelled during setup or a suite whose checks never reached the page no longer sits "In progress" forever or reads as a clean pass, and test-environment problems such as dropped clicks or a dead browser are listed apart from application issues.
