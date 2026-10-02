---
slug: api-keys-behind-proxies-and-mcp
title: "Project API keys work behind proxies and over MCP"
title_meta: "API keys work behind proxies and over MCP"
description: "The project API key is also accepted in an x-api-key header that corporate gateways keep, and it can read back the runs it dispatched over MCP."
---

Corporate gateways and load balancers often drop header names that contain an underscore, so a request carrying the project key in `api_key` arrived without it and was refused as if the key were wrong. The API now also reads the key from `x-api-key`, and the testing agent sends both. Where `api_key` arrives, it still takes precedence.

A project API key can also read its own project's executions. Through the Wopee MCP server, an assistant that dispatches a run with the key can now fetch its results, and the test inventory shows executed test cases with their real status instead of Not run.
