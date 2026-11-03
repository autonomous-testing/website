---
slug: log-in-through-the-api
title: "Log in through your API, reuse the token"
og_punchline: "Log in via your API"
description: "An HTTP request step can keep a token from the response as a hidden value that later steps use, and it can call your API on another domain."
---

An HTTP request step can now keep what a login call returns: a response header, one cookie or a field of the JSON body. Give it a name such as AUTH_TOKEN and later steps use it as `${AUTH_TOKEN}` to fill a field, set a cookie, open a page or send the next request. The agent sees only that a value was captured and how long it is, never the value itself.

A step can call an API on a different domain than the app under test, as long as the step names that address. Redirects are followed for up to five hops, each one checked again, so a move from http to https or a trailing-slash redirect no longer ends the request.
