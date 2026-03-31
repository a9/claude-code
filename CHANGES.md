# Changes since init

All changes made to restore missing type definitions, restructure as monorepo, and enable dev runtime.

## Monorepo Structure

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modified | Converted to workspace root with `apps/*` and `packages/*` |
| `bun.lock` | Modified | Updated lockfile for workspace deps |
| `apps/claude-code/package.json` | Added | App package with workspace deps (`@ant/claude-for-chrome-mcp`, `color-diff-napi`) |

## Restored Type Definitions

| File | Description |
|------|-------------|
| `apps/claude-code/src/entrypoints/sdk/coreTypes.generated.ts` | ~90 types inferred from Zod schemas in `coreSchemas.ts` |
| `apps/claude-code/src/entrypoints/sdk/runtimeTypes.ts` | 18 runtime types (Query, SDKSession, Options, EffortLevel, etc.) |
| `apps/claude-code/src/entrypoints/sdk/controlTypes.ts` | 16 control protocol types (StdoutMessage, StdinMessage, etc.) |
| `apps/claude-code/src/entrypoints/sdk/sdkUtilityTypes.ts` | `NonNullableUsage` mapped type |
| `apps/claude-code/src/entrypoints/sdk/settingsTypes.generated.ts` | `Settings` placeholder type |
| `apps/claude-code/src/entrypoints/sdk/toolTypes.ts` | Empty module (re-exported, no direct imports) |
| `apps/claude-code/src/types/message.ts` | 30+ message types (Message, UserMessage, AssistantMessage, SystemMessage, etc.) |
| `apps/claude-code/src/types/messageQueueTypes.ts` | `QueueOperation`, `QueueOperationMessage` |
| `apps/claude-code/src/types/connectorText.ts` | `ConnectorTextBlock`, `ConnectorTextDelta`, `isConnectorTextBlock()` |
| `apps/claude-code/src/utils/filePersistence/types.ts` | File persistence constants and types |

## Stub Implementations

| File | Description |
|------|-------------|
| `apps/claude-code/src/tools/TungstenTool/TungstenTool.ts` | Tmux tool stub (ant-only) |
| `apps/claude-code/src/tools/TungstenTool/TungstenLiveMonitor.tsx` | Live monitor component stub |
| `apps/claude-code/src/tools/WorkflowTool/constants.ts` | `WORKFLOW_TOOL_NAME` constant |
| `apps/claude-code/src/ink/global.d.ts` | JSX intrinsic elements for Ink custom components |
| `apps/claude-code/src/skills/bundled/verify/SKILL.md` | Verify skill prompt (inferred) |
| `apps/claude-code/src/skills/bundled/verify/examples/cli.md` | CLI verification example (inferred) |
| `apps/claude-code/src/skills/bundled/verify/examples/server.md` | Server verification example (inferred) |
| `apps/claude-code/src/utils/ultraplan/prompt.txt` | Ultraplan prompt placeholder |

## Workspace Packages

| Package | Path | Description |
|---------|------|-------------|
| `@ant/claude-for-chrome-mcp` | `packages/claude-for-chrome-mcp/` | Mock of Anthropic internal Chrome MCP package |
| `color-diff-napi` | `packages/color-diff-napi/` | Re-exports TS port from `src/native-ts/color-diff/` |

## Dev Runtime

| File | Description |
|------|-------------|
| `apps/claude-code/src/dev-entry.ts` | Entry point with `MACRO` and `feature()` polyfills, TTY stubs |
