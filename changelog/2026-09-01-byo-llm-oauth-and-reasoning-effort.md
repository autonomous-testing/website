---
slug: byo-llm-oauth-and-reasoning-effort
title: "Bring your own LLM: OAuth gateways and per-prompt reasoning effort"
title_meta: "BYO LLM: OAuth gateways, per-prompt effort"
description: "LLM calls can authenticate with OAuth 2.0 client credentials, and reasoning effort is tunable per prompt with inherited defaults shown."
---

Enterprise LLM gateways often refuse a static API key. Wopee.io now obtains an OAuth 2.0 client-credentials token, with a private-key JWT or a client secret, caches it and refreshes it before it expires. Both the API and the testing agent use it, so a gateway-fronted model works end to end.

On hybrid and self-hosted installations, a new Prompts section in settings lists every prompt the generation path uses with its effective model, reasoning effort and verbosity, each marked inherited or overridden. One parameter can be tuned without restating the connection, and every run log names which setting supplied the effort, which now also reaches Anthropic and Vertex models.
