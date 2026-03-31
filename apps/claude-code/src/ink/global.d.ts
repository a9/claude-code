/**
 * JSX intrinsic element declarations for the Ink terminal UI framework.
 *
 * Augments React's JSX namespace so TSX files can use custom Ink elements
 * like <ink-box>, <ink-text>, etc. without type errors.
 */

import type { DOMElement } from './dom.js'
import type { ClickEvent } from './events/click-event.js'
import type { FocusEvent } from './events/focus-event.js'
import type { KeyboardEvent } from './events/keyboard-event.js'
import type { Styles, TextStyles } from './styles.js'

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'ink-root': {
        children?: React.ReactNode
      }
      'ink-box': {
        ref?: React.Ref<DOMElement>
        children?: React.ReactNode
        style?: Styles
        tabIndex?: number
        autoFocus?: boolean
        stickyScroll?: boolean
        onClick?: (event: ClickEvent) => void
        onFocus?: (event: FocusEvent) => void
        onFocusCapture?: (event: FocusEvent) => void
        onBlur?: (event: FocusEvent) => void
        onBlurCapture?: (event: FocusEvent) => void
        onKeyDown?: (event: KeyboardEvent) => void
        onKeyDownCapture?: (event: KeyboardEvent) => void
        onMouseEnter?: () => void
        onMouseLeave?: () => void
      }
      'ink-text': {
        children?: React.ReactNode
        style?: Styles
        textStyles?: TextStyles
      }
      'ink-virtual-text': {
        children?: React.ReactNode
        style?: Styles
      }
      'ink-link': {
        children?: React.ReactNode
        href: string
      }
      'ink-progress': {
        children?: React.ReactNode
      }
      'ink-raw-ansi': {
        rawText: string
        rawWidth: number
        rawHeight: number
      }
    }
  }
}

// Ensure this file is treated as a module
export {}
