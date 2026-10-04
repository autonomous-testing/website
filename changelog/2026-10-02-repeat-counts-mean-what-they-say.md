---
slug: repeat-counts-mean-what-they-say
title: '"Repeat 3 times" means three real times'
description: "A repeat count runs exactly as written, a stop condition that already holds is refused before the run starts, and only repetitions with evidence count."
---

A sequence with a repeat count now runs exactly that many times. Only a sequence with no count gets the default ceiling, and that ceiling never overshoots what the test still needs. A repeat of one with an until condition runs one pass and checks the condition once.

Before a loop starts, its until condition is read, and a condition that already holds is refused before anything runs, so a loop can no longer end after one pass and read as success. When a test asks for a number of iterations, such as ten spins, only iterations backed by a passing assertion whose reading changed count toward it. The agent's own narration is reported, never counted.
