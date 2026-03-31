import type z from "zod/v4";
import type {
  SDKControlRequestSchema,
  SDKControlResponseSchema,
  SDKControlInitializeRequestSchema,
  SDKControlInitializeResponseSchema,
  SDKControlMcpSetServersResponseSchema,
  SDKControlReloadPluginsResponseSchema,
  SDKControlPermissionRequestSchema,
  SDKControlRewindFilesResponseSchema,
  SDKControlCancelAsyncMessageResponseSchema,
  SDKControlGetContextUsageResponseSchema,
  SDKControlMcpStatusResponseSchema,
  SDKControlGetSettingsResponseSchema,
  SDKControlElicitationResponseSchema,
  SDKControlCancelRequestSchema,
  SDKControlRequestInnerSchema,
  StdoutMessageSchema,
  StdinMessageSchema,
  SDKHookCallbackMatcherSchema,
} from "./controlSchemas.js";

export type SDKControlRequest = z.infer<ReturnType<typeof SDKControlRequestSchema>>;
export type SDKControlResponse = z.infer<ReturnType<typeof SDKControlResponseSchema>>;
export type SDKControlInitializeRequest = z.infer<ReturnType<typeof SDKControlInitializeRequestSchema>>;
export type SDKControlInitializeResponse = z.infer<ReturnType<typeof SDKControlInitializeResponseSchema>>;
export type SDKControlMcpSetServersResponse = z.infer<ReturnType<typeof SDKControlMcpSetServersResponseSchema>>;
export type SDKControlReloadPluginsResponse = z.infer<ReturnType<typeof SDKControlReloadPluginsResponseSchema>>;
export type SDKControlPermissionRequest = z.infer<ReturnType<typeof SDKControlPermissionRequestSchema>>;
export type SDKControlRewindFilesResponse = z.infer<ReturnType<typeof SDKControlRewindFilesResponseSchema>>;
export type SDKControlCancelAsyncMessageResponse = z.infer<ReturnType<typeof SDKControlCancelAsyncMessageResponseSchema>>;
export type SDKControlGetContextUsageResponse = z.infer<ReturnType<typeof SDKControlGetContextUsageResponseSchema>>;
export type SDKControlMcpStatusResponse = z.infer<ReturnType<typeof SDKControlMcpStatusResponseSchema>>;
export type SDKControlGetSettingsResponse = z.infer<ReturnType<typeof SDKControlGetSettingsResponseSchema>>;
export type SDKControlElicitationResponse = z.infer<ReturnType<typeof SDKControlElicitationResponseSchema>>;
export type StdoutMessage = z.infer<ReturnType<typeof StdoutMessageSchema>>;
export type StdinMessage = z.infer<ReturnType<typeof StdinMessageSchema>>;
export type SDKHookCallbackMatcher = z.infer<ReturnType<typeof SDKHookCallbackMatcherSchema>>;

// Re-export SDKPartialAssistantMessage from coreTypes for convenience
export type { SDKPartialAssistantMessage } from './coreTypes.generated.js';

// Additional control types used by remote session management
export type SDKControlCancelRequest = z.infer<ReturnType<typeof SDKControlCancelRequestSchema>>;
export type SDKControlRequestInner = z.infer<ReturnType<typeof SDKControlRequestInnerSchema>>;
