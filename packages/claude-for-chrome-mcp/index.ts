// Mock implementation of @ant/claude-for-chrome-mcp

export interface BrowserTool {
  name: string
  description: string
}

export type PermissionMode = 'default' | 'acceptEdits' | 'bypassPermissions' | 'plan' | 'dontAsk'

export interface Logger {
  info(...args: unknown[]): void
  warn(...args: unknown[]): void
  error(...args: unknown[]): void
  debug(...args: unknown[]): void
}

export interface ClaudeForChromeContext {
  getSocketPaths: () => string[]
  permissionMode: PermissionMode
  logger?: Logger
  [key: string]: unknown
}

export interface ClaudeForChromeMcpServerOptions {
  context?: ClaudeForChromeContext
  [key: string]: unknown
}

export const BROWSER_TOOLS: BrowserTool[] = [
  { name: 'javascript_tool', description: 'Execute JavaScript in the browser' },
  { name: 'read_page', description: 'Read the current page content' },
  { name: 'find', description: 'Find elements on the page' },
  { name: 'form_input', description: 'Fill form inputs' },
  { name: 'computer', description: 'Computer interaction tool' },
  { name: 'navigate', description: 'Navigate to a URL' },
  { name: 'resize_window', description: 'Resize the browser window' },
  { name: 'gif_creator', description: 'Create GIF recordings' },
  { name: 'upload_image', description: 'Upload an image' },
  { name: 'get_page_text', description: 'Get page text content' },
  { name: 'tabs_context_mcp', description: 'Get browser tab context' },
  { name: 'tabs_create_mcp', description: 'Create a new browser tab' },
  { name: 'update_plan', description: 'Update the current plan' },
  { name: 'read_console_messages', description: 'Read browser console messages' },
  { name: 'read_network_requests', description: 'Read network requests' },
  { name: 'shortcuts_list', description: 'List available keyboard shortcuts' },
  { name: 'shortcuts_execute', description: 'Execute a keyboard shortcut' },
  { name: 'switch_browser', description: 'Switch between browsers' },
]

export function createClaudeForChromeMcpServer(
  _options?: ClaudeForChromeMcpServerOptions,
) {
  return {
    connect: async () => {},
    close: async () => {},
  }
}
