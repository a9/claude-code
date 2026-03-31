/**
 * Development entry point.
 *
 * Polyfills compile-time macros (MACRO, feature) that are normally
 * injected by Bun's bundler, then calls main().
 */

// Polyfill MACRO — build-time constants injected by bun:bundle
;(globalThis as Record<string, unknown>).MACRO = {
  VERSION: '1.0.100-dev',
  BUILD_TIME: new Date().toISOString(),
  PACKAGE_URL: '@anthropic-ai/claude-code',
  NATIVE_PACKAGE_URL: undefined,
  FEEDBACK_CHANNEL: 'https://github.com/anthropics/claude-code/issues',
  ISSUES_EXPLAINER:
    'report the issue at https://github.com/anthropics/claude-code/issues',
  VERSION_CHANGELOG: '',
}

// Polyfill feature() — bun:bundle compile-time feature flags
// In dev mode all features are disabled (return false)
;(globalThis as Record<string, unknown>).feature = (_name: string) => false

// Ensure stdout/stdin are recognized as TTY for interactive mode.
// bun run / npm scripts / some terminals lose the isTTY flag.
if (process.stdout.isTTY === undefined && !process.argv.includes('-p') && !process.argv.includes('--print')) {
  Object.defineProperty(process.stdout, 'isTTY', { value: true })
  Object.defineProperty(process.stdin, 'isTTY', { value: true })
  // Stub TTY stream methods that Ink expects on stdin
  if (typeof process.stdin.ref !== 'function') {
    process.stdin.ref = () => process.stdin
  }
  if (typeof process.stdin.unref !== 'function') {
    process.stdin.unref = () => process.stdin
  }
  if (typeof (process.stdin as any).setRawMode !== 'function') {
    ;(process.stdin as any).setRawMode = () => process.stdin
  }
}

import { main } from './main.js'

main().catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})
