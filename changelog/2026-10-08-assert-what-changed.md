---
slug: assert-what-changed
title: "Assert what changed, not just what is there"
description: "New steps check that exactly one new row appeared or that a balance moved by the right amount, by capturing a reading and comparing a later one to it."
---

A test can now check a change instead of a fixed value. A text check can capture what it reads under a name, such as OPENING_BALANCE, and a later step can expect an expression like opening balance minus the withdrawal. The generated test code compares the amounts as numbers, so a replayed deposit fails when no money moved.

A new Verify count step checks how many elements a locator matches, including "exactly one new row" against a count captured earlier. A text check saved as a format-only check, where the value describes the shape of what the run read, is marked with a chip in the editor.
