---
slug: saved-locators-stay-true
title: "Self-healing that keeps the right button"
description: "Saved locators drop state such as item counts and keep every role option on replay, and a heal can no longer swap Finish for a differently named button."
---

A locator saved as the button named "Cart, 1 items" matched only while the cart held exactly one item. When an element's name carries a number, the agent now saves a state-free form: the element's own test attributes first, otherwise the stable start of the name. Replay honours every role option, such as heading level, checked or expanded, instead of quietly widening the match, and a locator replay cannot run is not saved.

Self-healing now holds a step to the name it recorded: a missing Finish button can no longer heal to Continue, and the step fails as unresolved instead. Money assertions stay exact when the amount equals one of the project's variables, so a fixed deposit is checked as that amount, not as any number.
