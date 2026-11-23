---
slug: connect-to-wopee-io-mcp-with-a-sign-in
title: "Connect to Wopee.io MCP with a sign-in"
og_punchline: "Sign in, no key"
description: "The Wopee.io MCP server also runs at mcp.wopee.io: your client signs in through Commander with read only or read and write access, and no key sits in a file."
---

The Wopee.io MCP server now also runs as a remote server at `https://mcp.wopee.io/mcp` on Wopee.io cloud. Your MCP client connects with OAuth: Commander opens, you pick the project, choose Read only, or Read and write if you administer the project, and allow it. No key is stored in any file.

In Claude Code, add it with `claude mcp add --transport http wopee https://mcp.wopee.io/mcp`, then authenticate from `/mcp`. Claude Code is the client tested so far; other clients that connect to remote MCP servers with OAuth use the same URL. The project's settings list the connected clients under MCP Connections, where members disconnect their own and admins any, and access ends on the next request. Dedicated and self-hosted installations keep the local server. Details are in the [MCP guide](https://docs.wopee.io/guides/wopee-mcp/#remote-server-oauth).
