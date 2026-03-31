import type { BetaUsage as Usage } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'

/**
 * Usage type with all fields guaranteed non-null.
 * Mapped from the SDK's Usage type where nullable fields become required.
 */
export type NonNullableUsage = {
  [K in keyof Usage]-?: NonNullable<Usage[K]>
}
