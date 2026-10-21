---
slug: fewer-false-alarms-on-real-values
title: "Fewer false alarms on values the run really read"
description: "The check for report values nothing observed now recognises what assertions matched or received, numbers in lists and amounts typed as plain numbers."
---

Every report is checked for values nothing in the run observed. That check now accepts the readings a run really took: the text a passing pattern assertion matched, the value a failed assertion received, each number in a list, and an amount typed as a plain number and shown with a currency.

A value is no longer flagged as belonging to another field when a second reading of the same field, or a confirmed screenshot observation, holds it, and an example written to show a format is not treated as a claim. Runs that read the right values stop being sent to review.
