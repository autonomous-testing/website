---
slug: faker-pattern-variables
title: "Test data your forms accept"
description: "Test data can follow a pattern you define, and Slovak and Czech IBAN generators now produce real, bank-valid account numbers that sign-up forms accept."
---

Data-driven variables gain a Custom pattern faker type: describe the shape of the value with a regex-like pattern and every run gets a fresh value that matches it, for identifiers, codes and formats no built-in generator covers.

The Slovak and Czech IBAN generators now produce account numbers that pass bank-side validation, so a registration flow that verifies the IBAN no longer fails on the test data itself.
