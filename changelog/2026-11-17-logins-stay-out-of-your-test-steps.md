---
slug: logins-stay-out-of-your-test-steps
title: "Logins stay out of your test steps"
og_punchline: "Passwords stay variables"
description: "A login written into your instructions becomes TESTING_USERNAME and TESTING_PASSWORD project variables, and generated tests use the variables, not the values."
---

When your instructions spell out a login and the project has no credentials yet, Wopee.io saves them as `TESTING_USERNAME` and `TESTING_PASSWORD` project variables, with `_2` and `_3` for more accounts. Generated tests then type `${TESTING_PASSWORD}` instead of the password, and any step value that matches a credential or secret variable is replaced with that variable.

The E-shop and Website demo projects work the same way: their demo logins are project variables from the start, and their instructions no longer spell them out.
