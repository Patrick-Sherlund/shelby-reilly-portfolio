import React, { useEffect, useRef, useState } from 'react'

// Chat bubble that appears near the user cursor whenever they start typing a "/" message
// The visual styling intentionally mirrors the ChatBubble that is used by the
// CursorSimulator so the end-user experience is identical.
export default function CursorChat() {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')

    // Cursor position in the viewport
    const [pos, setPos] = useState({ x: 0, y: 0 })

    // Opacity for the chat bubble only (label always stays)
    const [bubbleOpacity, setBubbleOpacity] = useState(0)

    // Last message that is animating upward/fading out
    const [sentText, setSentText] = useState('')
    const [animateOut, setAnimateOut] = useState(false)

    // timers so we can cancel / reset when needed
    const fadeTimeout = useRef<number | null>(null)
    const removeTimeout = useRef<number | null>(null)

    // --------------------------------------------------
    // Cursor tracking – we keep the current mouse position so the bubble can
    // always render relative to the pointer even while typing.
    // --------------------------------------------------
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    // --------------------------------------------------
    // Keyboard interaction & lifecycle: starts when user presses "/" while not
    // already chatting. Continues to build up text for ordinary printable
    // characters (length === 1). Supports Backspace, Escape to cancel, and
    // Enter to finish immediately. Once typing stops for a few seconds the
    // bubble gently fades out and is removed.
    // --------------------------------------------------
    useEffect(() => {
        const FADE_DELAY = 2000       // ms to wait after last keystroke
        const FADE_DURATION = 500     // ms for opacity transition

        const resetFadeTimers = (initialOpacity: number = 1) => {
            if (fadeTimeout.current) window.clearTimeout(fadeTimeout.current)
            if (removeTimeout.current) window.clearTimeout(removeTimeout.current)

            // Reset opacity instantly when we get another keypress
            setBubbleOpacity(initialOpacity)

            fadeTimeout.current = window.setTimeout(() => {
                // start fade-out animation
                setBubbleOpacity(0)
                // fully remove after transition completes
                removeTimeout.current = window.setTimeout(() => {
                    setOpen(false)
                    setText('')
                }, FADE_DURATION)
            }, FADE_DELAY)
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore key events when focus is inside an input / textarea or contenteditable element
            const target = e.target as HTMLElement
            if (
                target?.tagName === 'INPUT' ||
                target?.tagName === 'TEXTAREA' ||
                target?.isContentEditable
            ) {
                return
            }

            // If chat not started, listen for the triggering "/" key
            if (!open) {
                if (e.key === '/') {
                    e.preventDefault()
                    setOpen(true)
                    setText('')
                    // Show faint preview bubble as soon as "/" is pressed
                    resetFadeTimers(0.3)
                }
                return
            }

            // When chat is open, handle special keys first
            if (e.key === 'Escape') {
                e.preventDefault()
                setOpen(false)
                setText('')
                return
            }
            if (e.key === 'Enter') {
                e.preventDefault()
                if (text.trim() === '') return

                // Store current text for exit animation
                setSentText(text)
                setAnimateOut(false)
                // Trigger animation on next frame so the initial state (opacity 1, translateY 0)
                // is applied first, then transitions to the final state.
                requestAnimationFrame(() => setAnimateOut(true))

                // Clear the input so user can immediately start typing again
                setText('')

                // Keep bubble but in faint state until next typing
                resetFadeTimers(0.3)
                return
            }
            if (e.key === 'Backspace') {
                e.preventDefault()
                setText((prev) => prev.slice(0, -1))
                resetFadeTimers()
                return
            }

            // Append any printable single-character key (this filters out things
            // like Shift, F1, ArrowUp, etc.)
            if (e.key.length === 1) {
                setText((prev) => prev + e.key)
                // on first character typed, bump opacity to full
                if (text.length === 0) {
                    resetFadeTimers(1)
                } else {
                    resetFadeTimers(1)
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            if (fadeTimeout.current) window.clearTimeout(fadeTimeout.current)
            if (removeTimeout.current) window.clearTimeout(removeTimeout.current)
        }
    }, [open])

    // Clear sentText after the animation completes
    useEffect(() => {
        if (!animateOut) return
        const id = window.setTimeout(() => {
            setSentText('')
            setAnimateOut(false)
        }, 500) // match CSS transition duration
        return () => window.clearTimeout(id)
    }, [animateOut])

    // Small offset so the bubble clears the cursor image; these match the values
    // used in the CursorSimulator.ChatBubble component.
    const OFFSET_X = 10
    const OFFSET_Y = 24 // raised slightly for better alignment

    return (
        <div
            style={{
                position: 'fixed',
                left: pos.x + OFFSET_X,
                top: pos.y + OFFSET_Y,
                pointerEvents: 'none',
                zIndex: 999999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 4
            }}
        >
            {/* Chat bubble */}
            {(sentText || open) && (
            <div
                style={{
                    position: 'relative',
                    backgroundColor: '#6675FF',
                    border: '2px solid #5263FF',
                    borderTopRightRadius: 24,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    borderTopLeftRadius: 2,
                    padding: '8px 16px',
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'Futura, Arial, sans-serif',
                    whiteSpace: 'nowrap',
                    minHeight: 28,
                    display: 'flex',
                    alignItems: 'center',
                    opacity: bubbleOpacity,
                    transition: 'opacity 500ms ease'
                }}
            >
                {/* Outgoing text animation */}
                {sentText && (
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            padding: '0 16px',
                            transform: animateOut ? 'translateY(-12px)' : 'translateY(0)',
                            opacity: animateOut ? 0 : 1,
                            transition: 'transform 400ms ease, opacity 400ms ease'
                        }}
                    >
                        {sentText}
                    </div>
                )}
                {/* Current typing text (invisible placeholder keeps height) */}
                {text || ' '}
            </div>
            )}

            <div
                style={{
                    marginTop: 0,
                    backgroundColor: '#5263FF',
                    borderRadius: 0,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: 'Futura, Arial, sans-serif',
                    padding: '2px 6px',
                    width: 'max-content'
                }}
            >
                Bestie
            </div>
        </div>
    )
} 