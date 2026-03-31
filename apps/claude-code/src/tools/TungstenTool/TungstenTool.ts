/**
 * TungstenTool - Tmux-based virtual terminal tool (ant-only).
 *
 * TODO: Implementation lost. This is a stub export to satisfy imports.
 * Original tool provides a Tmux virtual terminal abstraction for running
 * commands in persistent terminal sessions.
 */

import { z } from 'zod/v4'
import { buildTool } from '../../Tool.js'
import { lazySchema } from '../../utils/lazySchema.js'

const TUNGSTEN_TOOL_NAME = 'Tungsten'

const inputSchema = lazySchema(() =>
  z.strictObject({
    command: z.string().describe('The command to execute in the Tmux session'),
    session_name: z
      .string()
      .optional()
      .describe('Name of the Tmux session to use'),
  }),
)
type InputSchema = ReturnType<typeof inputSchema>

export const TungstenTool = buildTool({
  name: TUNGSTEN_TOOL_NAME,
  searchHint: 'run commands in persistent Tmux terminal sessions',
  maxResultSizeChars: 20_000,
  async description() {
    return 'Run commands in a persistent Tmux virtual terminal session. (ant-only)'
  },
  async prompt() {
    return 'Run commands in a persistent Tmux virtual terminal session.'
  },
  get inputSchema(): InputSchema {
    return inputSchema()
  },
  isReadOnly() {
    return false
  },
  userFacingName() {
    return 'Tungsten'
  },
  renderToolUseMessage() {
    return null
  },
  mapToolResultToToolResultBlockParam(content: string, toolUseID: string) {
    return {
      type: 'tool_result' as const,
      tool_use_id: toolUseID,
      content,
    }
  },
  async call() {
    // TODO: Implement Tmux session management
    return {
      data: 'TungstenTool is not implemented',
    }
  },
})

// Session tracking stubs used by commands/clear/caches.ts

/** Clear tracking of which sessions have used Tungsten. */
export function clearSessionsWithTungstenUsage(): void {
  // TODO: stub
}

/** Reset Tungsten initialization state. */
export function resetInitializationState(): void {
  // TODO: stub
}
