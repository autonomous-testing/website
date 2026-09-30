---
slug: faker-pattern-variables
title: "Faker variables take a custom pattern"
description: "A Custom pattern faker type generates values from a regex-like pattern, and Slovak and Czech IBAN generators now produce bank-valid account numbers."
---

Data-driven variables gain a Custom pattern faker type: describe the shape of the value with a regex-like pattern and every run gets a fresh value that matches it, for identifiers, codes and formats no built-in generator covers.

The Slovak and Czech IBAN generators now produce account numbers that pass bank-side validation, so a registration flow that verifies the IBAN no longer fails on the test data itself.
