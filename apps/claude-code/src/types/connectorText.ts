/**
 * Connector text block types for the Claude API streaming protocol.
 *
 * Connector text is an experimental content block type that carries
 * inter-block connective text (e.g. transition phrases between tool
 * calls). Gated behind the CONNECTOR_TEXT feature flag.
 */

export interface ConnectorTextBlock {
  type: 'connector_text'
  connector_text: string
}

export interface ConnectorTextDelta {
  type: 'connector_text_delta'
  connector_text: string
}

export function isConnectorTextBlock(
  block: unknown,
): block is ConnectorTextBlock {
  return (
    typeof block === 'object' &&
    block !== null &&
    (block as { type: string }).type === 'connector_text'
  )
}
