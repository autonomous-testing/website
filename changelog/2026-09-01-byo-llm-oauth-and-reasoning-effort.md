---
slug: byo-llm-oauth-and-reasoning-effort
title: "Use your approved AI model, through your gateway"
description: "Connect the model your security team approved through an OAuth 2.0 gateway, and set how hard each prompt thinks, with the inherited defaults shown."
---

Enterprise LLM gateways often refuse a static API key. Wopee.io now obtains an OAuth 2.0 client-credentials token, with a private-key JWT or a client secret, caches it and refreshes it before it expires. Both the API and the testing agent use it, so a gateway-fronted model works end to end.

On hybrid and self-hosted installations, a new Prompts section in settings lists every prompt the generation path uses with its effective model, reasoning effort and verbosity, each marked inherited or overridden. One parameter can be tuned without restating the connection, and every run log names which setting supplied the effort, which now also reaches Anthropic and Vertex models.
