import type z from "zod/v4";
import type { SDKControlRequestSchema, SDKControlResponseSchema } from "./controlSchemas";

export type SDKControlRequest = z.infer<typeof SDKControlRequestSchema>;
export type SDKControlResponse = z.infer<typeof SDKControlResponseSchema>;
