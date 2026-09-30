---
slug: atomic-step-sequences
title: "Steps that belong together replay as one"
description: "Recorded action sequences are marked atomic, replay as a single call, can repeat until the page says stop, and may declare optional elements."
---

Some steps only work back to back: a dropdown that re-arms itself, a filter that reacts as you type, a modal that reopens between clicks. The agent now records such a run of steps as one sequence and replays it as a single call, so the page state between the steps can no longer break the test.

The step list marks the first step of a sequence with an "atomic sequence" chip. Expand it to see the declaration, including which elements may legitimately be absent on a given run. A repeated sequence can also end on the page's own state, "click Load more until it disappears", instead of a guessed repeat count.
