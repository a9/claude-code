/** Type of queue operation. */
export type QueueOperation = 'enqueue' | 'dequeue' | 'remove' | string

/** A log entry for a queue operation. */
export type QueueOperationMessage = {
  type: 'queue-operation'
  operation: QueueOperation
  timestamp: string
  sessionId: string
  content?: string
}
