---
slug: verify-state-assertions
title: "Assert that a control is disabled, checked or read-only"
title_meta: "Verify state: disabled, checked, read-only"
description: "A new Verify state step asserts enabled/disabled, checked/unchecked, editable/read-only, and can wait for a gate to open."
---

A test about a gated control, "Submit stays disabled until the form is valid", could not be proven before, and the nearest workaround passed trivially. The step editor now has a Verify state step with an Expected state picker: enabled or disabled, checked or unchecked, editable or read-only.

The agent delegates the check to Playwright's own matchers, so `aria-disabled` on an ancestor and `aria-checked` are honoured, and a polling assert becomes wait-until instead of a sleep. URL assertions now also render and edit properly in the step list.
