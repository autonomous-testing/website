---
slug: agent-vision-on-by-default
title: "The agent now sees the screen"
description: "The agent gets a screenshot after every action and can look at the page when it needs to; existing projects switch on unless they chose Off."
---

Vision mode has been an opt-in project setting since April. It is now the default. In Observe, the agent receives a screenshot after each interaction and has an `observe` tool to look at the page on demand, so it notices visual state that text snapshots miss and needs fewer explicit visual assertions.

Image quality (Low, Medium, High) trades tokens for detail. Projects that had explicitly chosen Off keep that choice; every run logs where its vision mode came from.
