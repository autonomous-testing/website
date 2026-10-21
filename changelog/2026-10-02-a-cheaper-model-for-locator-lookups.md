---
slug: a-cheaper-model-for-locator-lookups
title: "Pay less for the agent's routine lookups"
description: "Run element lookups and key presses on a cheaper Azure deployment with its own reasoning effort, and pick only the effort levels each model accepts."
---

On hybrid and self-hosted installations using Azure OpenAI, the Agent form in LLM settings has two new fields: a cheaper deployment on the same resource for the agent's element lookups and key presses, and the reasoning effort those calls send. Planning, coverage checks and click positions stay on the main model. Leave the fields empty and everything runs on the main model as before. The run log names the lookup model, and the token table gains a Model column so mixed runs can be priced.

Every reasoning-effort dropdown, in Prompts, LLM and Troubleshoot, now offers the full range from None to Max, filtered to the levels the selected model accepts. A saved or inherited level the model rejects is flagged where it is set, and the Agent form will not save it.
