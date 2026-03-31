/**
 * Message types used throughout the CLI application.
 *
 * TODO: Some types here are inferred from usage patterns in the codebase.
 * They may need refinement as more context becomes available.
 */

import type {
  ContentBlockParam,
  ToolResultBlockParam,
} from '@anthropic-ai/sdk/resources/index.mjs'
import type {
  BetaContentBlock,
  BetaMessage,
} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type { BetaUsage as Usage } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type { UUID } from 'crypto'
import type { SDKAssistantMessageError } from '../entrypoints/sdk/coreTypes.generated.js'
import type { PermissionMode } from '../entrypoints/sdk/coreTypes.generated.js'
import type { Progress, AnyObject } from '../Tool.js'
import type { Attachment } from '../utils/attachments.js'

// ============================================================================
// Base Message Fields
// ============================================================================

interface BaseMessage {
  uuid: UUID
  timestamp: string
}

// ============================================================================
// Message Origin
// ============================================================================

/** Provenance of a user message. undefined = human (keyboard). */
export type MessageOrigin =
  | 'hook'
  | 'agent'
  | 'replay'
  | 'slash_command'
  | 'synthetic'
  | 'bridge'
  | 'scheduled_task'
  | undefined

// ============================================================================
// System Message Level
// ============================================================================

export type SystemMessageLevel = 'info' | 'warning' | 'error'

// ============================================================================
// Core Message Types
// ============================================================================

export interface UserMessage extends BaseMessage {
  type: 'user'
  message: {
    role: 'user'
    content: string | ContentBlockParam[]
  }
  isMeta?: true
  isVisibleInTranscriptOnly?: true
  isVirtual?: true
  isCompactSummary?: true
  summarizeMetadata?: {
    messagesSummarized: number
    userContext?: string
    direction?: PartialCompactDirection
  }
  toolUseResult?: unknown
  mcpMeta?: {
    _meta?: Record<string, unknown>
    structuredContent?: Record<string, unknown>
  }
  imagePasteIds?: number[]
  sourceToolAssistantUUID?: UUID
  permissionMode?: PermissionMode
  origin?: MessageOrigin
}

export interface AssistantMessage extends BaseMessage {
  type: 'assistant'
  message: BetaMessage & {
    context_management?: unknown | null
  }
  requestId?: string
  isApiErrorMessage?: boolean
  apiError?: {
    status?: number
    message?: string
    error?: unknown
  }
  error?: SDKAssistantMessageError
  errorDetails?: string
  isMeta?: true
  isVirtual?: true
  advisorModel?: string
}

export interface ProgressMessage<P extends Progress = Progress> extends BaseMessage {
  type: 'progress'
  data: P
  toolUseID: string
  parentToolUseID: string
}

export interface AttachmentMessage<A extends Attachment = Attachment> extends BaseMessage {
  type: 'attachment'
  attachment: A
}

// ============================================================================
// System Message Types
// ============================================================================

interface BaseSystemMessage extends BaseMessage {
  isMeta?: boolean
}

export interface SystemInformationalMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'informational'
  content: string
  level: SystemMessageLevel
  toolUseID?: string
  preventContinuation?: boolean
}

export interface SystemAPIErrorMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'api_error'
  level: 'error'
  cause?: Error
  error: unknown
  retryInMs: number
  retryAttempt: number
  maxRetries: number
}

export interface SystemPermissionRetryMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'permission_retry'
  content: string
  commands: string[]
  level: SystemMessageLevel
}

export interface SystemBridgeStatusMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'bridge_status'
  content: string
  url: string
  upgradeNudge?: string
}

export interface SystemScheduledTaskFireMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'scheduled_task_fire'
  content: string
}

export interface SystemStopHookSummaryMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'stop_hook_summary'
  hookCount: number
  hookInfos: StopHookInfo[]
  hookErrors: string[]
  preventedContinuation: boolean
  stopReason: string | undefined
  hasOutput: boolean
  level: SystemMessageLevel
  toolUseID?: string
  hookLabel?: string
  totalDurationMs?: number
}

export interface SystemTurnDurationMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'turn_duration'
  durationMs: number
  budgetTokens?: number
  budgetLimit?: number
  budgetNudges?: number
  messageCount?: number
}

export interface SystemAwaySummaryMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'away_summary'
  content: string
}

export interface SystemMemorySavedMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'memory_saved'
  writtenPaths: string[]
}

export interface SystemAgentsKilledMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'agents_killed'
}

export interface SystemApiMetricsMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'api_metrics'
  ttftMs: number
  otps: number
  isP50?: boolean
  hookDurationMs?: number
  turnDurationMs?: number
  toolDurationMs?: number
  classifierDurationMs?: number
  toolCount?: number
  hookCount?: number
  classifierCount?: number
  configWriteCount?: number
}

export interface SystemLocalCommandMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'local_command'
  content: string
  level: SystemMessageLevel
}

export interface SystemCompactBoundaryMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'compact_boundary'
  content: string
  level: SystemMessageLevel
  compactMetadata: {
    trigger: 'manual' | 'auto'
    preTokens: number
    userContext?: string
    messagesSummarized?: number
  }
  logicalParentUuid?: UUID
}

export interface SystemMicrocompactBoundaryMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'microcompact_boundary'
  content: string
  level: SystemMessageLevel
  microcompactMetadata: {
    trigger: 'auto'
    preTokens: number
    tokensSaved: number
    compactedToolIds: string[]
    clearedAttachmentUUIDs: string[]
  }
}

export interface SystemThinkingMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'thinking'
  content: string
}

export interface SystemFileSnapshotMessage extends BaseSystemMessage {
  type: 'system'
  subtype: 'file_snapshot'
  content: string
  level: SystemMessageLevel
  snapshotFiles: Array<{
    key: string
    path: string
    content: string
  }>
}

// ============================================================================
// Stop Hook Info
// ============================================================================

export interface StopHookInfo {
  hookName: string
  output: string
  exitCode?: number
  outcome: 'success' | 'error' | 'cancelled'
}

// ============================================================================
// Tombstone Message
// ============================================================================

export interface TombstoneMessage extends BaseMessage {
  type: 'tombstone'
  originalType: string
  reason: string
}

// ============================================================================
// Tool Use Summary Message
// ============================================================================

export interface ToolUseSummaryMessage extends BaseMessage {
  type: 'tool_use_summary'
  summary: string
  precedingToolUseIds: string[]
}

// ============================================================================
// Union Types
// ============================================================================

export type SystemMessage =
  | SystemInformationalMessage
  | SystemAPIErrorMessage
  | SystemPermissionRetryMessage
  | SystemBridgeStatusMessage
  | SystemScheduledTaskFireMessage
  | SystemStopHookSummaryMessage
  | SystemTurnDurationMessage
  | SystemAwaySummaryMessage
  | SystemMemorySavedMessage
  | SystemAgentsKilledMessage
  | SystemApiMetricsMessage
  | SystemLocalCommandMessage
  | SystemCompactBoundaryMessage
  | SystemMicrocompactBoundaryMessage
  | SystemThinkingMessage
  | SystemFileSnapshotMessage

export type Message =
  | UserMessage
  | AssistantMessage
  | ProgressMessage
  | AttachmentMessage
  | SystemMessage
  | TombstoneMessage
  | ToolUseSummaryMessage

// ============================================================================
// Hook Result Message
// ============================================================================

/** A message produced by hook execution — either a progress update or an attachment. */
export type HookResultMessage = ProgressMessage | AttachmentMessage

// ============================================================================
// Normalized Message Types (single content block per message)
// ============================================================================

export interface NormalizedUserMessage extends Omit<UserMessage, 'message'> {
  type: 'user'
  message: {
    role: 'user'
    content: ContentBlockParam[]
  }
}

export interface NormalizedAssistantMessage extends Omit<AssistantMessage, 'message'> {
  type: 'assistant'
  message: BetaMessage & {
    content: [BetaContentBlock]
    context_management: unknown | null
  }
}

export type NormalizedMessage =
  | NormalizedUserMessage
  | NormalizedAssistantMessage
  | AttachmentMessage
  | ProgressMessage
  | SystemMessage
  | TombstoneMessage
  | ToolUseSummaryMessage

// ============================================================================
// Renderable Message Types (for UI display)
// ============================================================================

export type RenderableMessage =
  | NormalizedUserMessage
  | NormalizedAssistantMessage
  | AttachmentMessage
  | ProgressMessage
  | SystemMessage
  | GroupedToolUseMessage
  | CollapsedReadSearchGroup
  | TombstoneMessage
  | ToolUseSummaryMessage

// ============================================================================
// Grouped / Collapsed Message Types
// ============================================================================

/** A group of tool use messages collapsed for display. */
export interface GroupedToolUseMessage extends BaseMessage {
  type: 'grouped_tool_use'
  messages: NormalizedMessage[]
}

/** A group of read/search tool calls collapsed in the UI. */
export interface CollapsedReadSearchGroup extends BaseMessage {
  type: 'collapsed_read_search'
  messages: NormalizedAssistantMessage[]
  toolResults: NormalizedUserMessage[]
}

/**
 * A message that can be collapsed in the read/search group.
 * Includes assistant tool_use, user tool_result, and grouped_tool_use messages.
 */
export type CollapsibleMessage =
  | NormalizedAssistantMessage
  | NormalizedUserMessage
  | GroupedToolUseMessage

// ============================================================================
// Compact Direction
// ============================================================================

/** Direction of partial compaction. */
export type PartialCompactDirection = 'prefix' | 'suffix'

/** Metadata for a compact boundary message (internal representation). */
export interface CompactMetadata {
  trigger: 'manual' | 'auto'
  preTokens: number
  userContext?: string
  messagesSummarized?: number
  preservedSegment?: {
    headUuid: string
    anchorUuid: string
    tailUuid: string
  }
}

// ============================================================================
// Stream / Request Types
// ============================================================================

/** TODO: Infer exact shape from usage */
export interface StreamEvent {
  type: string
  [key: string]: unknown
}

/** TODO: Infer exact shape from usage */
export interface RequestStartEvent {
  type: 'request_start'
  requestId: string
  [key: string]: unknown
}
