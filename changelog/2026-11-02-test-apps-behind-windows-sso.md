---
slug: test-apps-behind-windows-sso
title: "Test apps behind Windows sign-in"
og_punchline: "Windows sign-in, tested"
description: "Runs can sign in to apps that use Windows single sign-on: set the domain account as project variables and the runner gets a Kerberos ticket before it starts."
---

Some company apps sign you in with your Windows account and never show a login form. On hybrid and self-hosted installations, Wopee.io runs can now test them: set the domain account as `KERBEROS_*` project or suite variables, and the runner gets a Kerberos ticket before the browser starts, so the app opens already signed in.

Different tests can sign in as different accounts, and a test can opt out to see the app as a signed-out visitor. If the sign-in fails, the run stops with the reason, such as a wrong password, a locked account or an unreachable domain controller. The passwords never reach the agent.
