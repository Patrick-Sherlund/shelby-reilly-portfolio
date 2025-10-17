import { useEffect } from 'react'

/**
 * Hook that disables the browser's native zoom shortcuts (Ctrl/Cmd + Wheel and Ctrl/Cmd + +/-/0).
 * This is useful when the application implements its own custom zoom behaviour and wants to
 * ensure the browser does not interfere.
 */
export function useDisableBrowserZoom() {
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      // When the user is holding Ctrl (Windows/Linux) or Cmd (macOS), the browser interprets the
      // wheel gesture as a page-zoom command. Preventing the default behaviour disables that.
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
      }
    }

    const keydownHandler = (e: KeyboardEvent) => {
      // Ctrl/Cmd + '+', '-', or '0' triggers browser zoom reset/in-/out. Block those too.
      if (e.ctrlKey || e.metaKey) {
        const zoomKeys = ['=', '+', '-', '0']
        if (zoomKeys.includes(e.key)) {
          e.preventDefault()
        }
      }
    }

    // Add listeners. For the wheel event we must set passive: false so that
    // preventDefault() is honoured.
    window.addEventListener('wheel', wheelHandler, { passive: false })
    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('wheel', wheelHandler)
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [])
} 