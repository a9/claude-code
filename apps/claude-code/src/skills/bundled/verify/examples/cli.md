# CLI Verification Example

## Scenario
You changed a CLI command's argument parsing or output format.

## Steps

1. Build the project if needed:
   ```bash
   bun run build
   ```

2. Run the CLI command with the relevant arguments:
   ```bash
   ./bin/cli --help
   ./bin/cli <subcommand> --flag value
   ```

3. Verify the output matches expectations:
   - Check exit code: `echo $?`
   - Check stdout contains expected content
   - Check stderr for unexpected warnings/errors

4. Test edge cases:
   - Missing required arguments
   - Invalid input values
   - Empty input

## What to report
- The exact command(s) you ran
- The output produced
- Whether the output matches the expected behavior
