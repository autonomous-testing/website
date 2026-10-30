---
slug: drag-and-drop-steps
title: "Tests that drag and drop"
description: "The agent can now drag an item onto a drop target and confirm it really moved, and you can write and edit drag-and-drop steps in the test case editor."
---

Kanban boards, sortable lists and file drop zones are now testable. The agent drags an item onto its drop target and checks the result on the page, so a drop the app rejected is not reported as done.

In the test case editor, a Drag and drop step has a source locator, a target locator and optional offsets, and reads as "drag: source → target".
