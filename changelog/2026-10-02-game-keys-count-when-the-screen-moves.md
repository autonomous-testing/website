---
slug: game-keys-count-when-the-screen-moves
title: "Game key presses count only if the game reacts"
description: "A key press into a canvas game is checked against the picture before and after, so a press the game ignored is reported as having no effect, not as a success."
---

A key press sent to a canvas game used to count as done as soon as the browser delivered it, even when the game ignored it. Ten arrow presses could pass while the stake on screen never moved.

The agent now compares the game frame before and after each press, with idle animation masked out. A press that changes nothing is marked as having no effect, the agent is told, and a sequence of presses stops there instead of carrying on as if each one worked.
