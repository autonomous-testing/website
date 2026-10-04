---
slug: reasoning-effort-per-model
title: "AI settings that fit each model"
description: "Every reasoning level from none to max is checked against the model it is set for, GPT-6 runs as a reasoning model, and the AI chat respects the setting."
---

Reasoning effort now covers every level, none, low, medium, high, xhigh and max, and each one is checked against the model it applies to. Saving an LLM configuration with a level its own or inherited model rejects is refused with a clear message, and a stored level a model no longer accepts moves to the nearest one it does, with the change written to the run log.

GPT-6 models are treated as reasoning models, so they no longer receive temperature and seed. The configured effort now also reaches AI chat and Azure deployments on Chat Completions. On hybrid and self-hosted installations, the environment defaults for reasoning effort and verbosity reach generation, and a new output cap limits the length of each response.
