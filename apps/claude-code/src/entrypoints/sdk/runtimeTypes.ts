/**
 * SDK Runtime Types - Non-serializable types (callbacks, interfaces with methods).
 *
 * These types are used by SDK consumers and builders for runtime interactions.
 * Types here may contain functions, class instances, or other non-serializable values.
 */

import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import type { Server } from '@modelcontextprotocol/sdk/server/index.js'
import type { SDKMessage, SDKResultMessage, SDKSessionInfo, SDKUserMessage, PermissionMode } from './coreTypes.generated.js'

// ============================================================================
// Effort Level
// ============================================================================

/** Effort level for reasoning. */
export type EffortLevel = 'low' | 'medium' | 'high' | 'max'

// ============================================================================
// Zod Utility Types
// ============================================================================

/** Any Zod raw shape (used for tool schema definitions). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyZodRawShape = Record<string, any>

/** Infer the TypeScript type from a Zod raw shape. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferShape<T extends AnyZodRawShape> = { [K in keyof T]: any }

// ============================================================================
// MCP Tool Definition
// ============================================================================

/** SDK MCP tool definition wrapping a tool handler with its schema. */
export interface SdkMcpToolDefinition<Schema extends AnyZodRawShape> {
  name: string
  description: string
  inputSchema: Schema
  handler: (args: InferShape<Schema>, extra: unknown) => Promise<CallToolResult>
  extras?: {
    annotations?: Record<string, unknown>
    searchHint?: string
    alwaysLoad?: boolean
  }
}

/** MCP server config with an attached Server instance. */
export interface McpSdkServerConfigWithInstance {
  type: 'sdk'
  name: string
  server: Server
}

// ============================================================================
// Query Types
// ============================================================================

/** Options for SDK query. */
export interface Options {
  model?: string
  maxTurns?: number
  maxBudgetUsd?: number
  systemPrompt?: string
  appendSystemPrompt?: string
  permissionMode?: PermissionMode
  abortController?: AbortController
  cwd?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mcpServers?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tools?: Array<SdkMcpToolDefinition<any>>
  outputFormat?: { type: 'json_schema'; schema: Record<string, unknown> }
  /** @internal */
  enableRemoteControl?: boolean
}

/** @internal */
export interface InternalOptions extends Options {
  // TODO: Add internal-only options as discovered
  [key: string]: unknown
}

/** Async iterable query result. */
export interface Query extends AsyncIterable<SDKMessage> {
  result: Promise<SDKResultMessage>
  abort(): void
}

/** @internal */
export interface InternalQuery extends Query {
  // TODO: Add internal-only query properties as discovered
}

// ============================================================================
// Session Types
// ============================================================================

/** Options for creating/resuming an SDK session. */
export interface SDKSessionOptions {
  model?: string
  permissionMode?: PermissionMode
  systemPrompt?: string
  appendSystemPrompt?: string
  cwd?: string
  maxTurns?: number
  maxBudgetUsd?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mcpServers?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tools?: Array<SdkMcpToolDefinition<any>>
  abortController?: AbortController
}

/** SDK session handle for multi-turn conversations. */
export interface SDKSession {
  readonly sessionId: string
  send(message: string | AsyncIterable<SDKUserMessage>): Query
  abort(): void
}

/** A message from a session transcript. */
export interface SessionMessage {
  role: 'user' | 'assistant' | 'system'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  uuid?: string
  timestamp?: string
}

// ============================================================================
// Session Management Types
// ============================================================================

/** Options for listing sessions. */
export interface ListSessionsOptions {
  dir?: string
  limit?: number
  offset?: number
}

/** Options for getting session info. */
export interface GetSessionInfoOptions {
  dir?: string
}

/** Options for getting session messages. */
export interface GetSessionMessagesOptions {
  dir?: string
  limit?: number
  offset?: number
  includeSystemMessages?: boolean
}

/** Options for session mutation operations (rename, tag). */
export interface SessionMutationOptions {
  dir?: string
}

/** Options for forking a session. */
export interface ForkSessionOptions {
  dir?: string
  upToMessageId?: string
  title?: string
}

/** Result of forking a session. */
export interface ForkSessionResult {
  sessionId: string
}
