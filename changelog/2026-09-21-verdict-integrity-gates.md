---
slug: verdict-integrity-gates
title: "No proof, no pass"
og_punchline: "No proof, no pass"
description: "A run that asserted nothing or skipped a step can no longer show green: it is flagged for review in amber, and runs left hanging are closed."
---

Every run now passes through integrity gates: a defined assertion that never executed, a run that asserted nothing, an input that never reached the page, a report resting on values nothing observed. In the default Report only mode, the report gains a Verdict Integrity section with a shadow verdict. When it disagrees with a stored pass, the run paints half green, half amber on the Analysis, Library and Runs tabs, with the gate named in the tooltip. Counts and filters are unchanged.

{/* changelog-clip:start */}
<figure className="changelog-clip">
  <img src="/img/changelog/verdict-integrity-gates.gif" alt="A passed test card marked verdict gate disagreed with a half green, half amber dot, then a run report scrolling to its Verdict Integrity section" width="960" height="539" decoding="async" />
  <figcaption>{"A pass the gates disagree with turns half amber, and the report adds a Verdict Integrity section."}</figcaption>
</figure>
{/* changelog-clip:end */}

Switch a project to Enforce and such a pass is downgraded to Incomplete: amber, not red, because the run proved nothing rather than found a defect. Incomplete is now a verdict everywhere. A run whose agent died, a workflow cancelled during setup or a suite whose checks never reached the page no longer sits "In progress" forever or reads as a clean pass, and test-environment problems such as dropped clicks or a dead browser are listed apart from application issues.
