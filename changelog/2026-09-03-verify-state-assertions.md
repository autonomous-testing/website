---
slug: verify-state-assertions
title: "Check that a button stays disabled"
description: "A new step checks a control's state: enabled or disabled, checked or unchecked, editable or read-only, and it can wait until a gate opens."
---

A test about a gated control, "Submit stays disabled until the form is valid", could not be proven before, and the nearest workaround passed trivially. The step editor now has a Verify state step with an Expected state picker: enabled or disabled, checked or unchecked, editable or read-only.

The agent delegates the check to Playwright's own matchers, so `aria-disabled` on an ancestor and `aria-checked` are honoured, and a polling assert becomes wait-until instead of a sleep. URL assertions now also render and edit properly in the step list.
