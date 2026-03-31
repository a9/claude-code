---
name: verify
description: Verify a code change does what it should by running the app.
---

# Verify

Verify that a code change works correctly by actually running the application and checking the results.

## Process

1. **Identify what changed** — Read the recent diff or ask the user what was changed.
2. **Determine how to verify** — Pick the most appropriate verification strategy:
   - Run existing tests (`bun test`, `npm test`, `pytest`, etc.)
   - Start the app and manually check behavior
   - Run a specific command and inspect output
   - Use the browser (if available) to check UI changes
3. **Execute verification** — Run the verification steps.
4. **Report results** — Clearly state whether the change works as expected, with evidence.

## Guidelines

- Prefer automated verification (tests, scripts) over manual checks.
- If tests exist for the changed code, run them first.
- For UI changes, take screenshots if browser tools are available.
- If verification fails, report what went wrong and suggest fixes.
- Don't skip verification — always confirm the change actually works.

## Examples

See the examples directory for verification recipes for common scenarios.
