import React, {useEffect, useRef, useState} from 'react'


export default function CursorChat() {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')


    const [pos, setPos] = useState({x: 0, y: 0})


    const [bubbleOpacity, setBubbleOpacity] = useState(0)


    const [sentText, setSentText] = useState('')
    const [animateOut, setAnimateOut] = useState(false)


    const fadeTimeout = useRef<number | null>(null)
    const removeTimeout = useRef<number | null>(null)


    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPos({x: e.clientX, y: e.clientY})
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])


    useEffect(() => {
        const FADE_DELAY = 2000
        const FADE_DURATION = 500

        const resetFadeTimers = (initialOpacity: number = 1) => {
            if (fadeTimeout.current) window.clearTimeout(fadeTimeout.current)
            if (removeTimeout.current) window.clearTimeout(removeTimeout.current)


            setBubbleOpacity(initialOpacity)

            fadeTimeout.current = window.setTimeout(() => {

                setBubbleOpacity(0)

                removeTimeout.current = window.setTimeout(() => {
                    setOpen(false)
                    setText('')
                }, FADE_DURATION)
            }, FADE_DELAY)
        }

        const handleKeyDown = (e: KeyboardEvent) => {

            const target = e.target as HTMLElement
            if (
                target?.tagName === 'INPUT' ||
                target?.tagName === 'TEXTAREA' ||
                target?.isContentEditable
            ) {
                return
            }


            if (!open) {
                if (e.key === '/') {
                    e.preventDefault()
                    setOpen(true)
                    setText('')

                    resetFadeTimers(0.3)
                }
                return
            }


            if (e.key === 'Escape') {
                e.preventDefault()
                setOpen(false)
                setText('')
                return
            }
            if (e.key === 'Enter') {
                e.preventDefault()
                if (text.trim() === '') return


                setSentText(text)
                setAnimateOut(false)


                requestAnimationFrame(() => setAnimateOut(true))


                setText('')


                resetFadeTimers(0.3)
                return
            }
            if (e.key === 'Backspace') {
                e.preventDefault()
                setText((prev) => prev.slice(0, -1))
                resetFadeTimers()
                return
            }


            if (e.key.length === 1) {
                setText((prev) => prev + e.key)

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


    useEffect(() => {
        if (!animateOut) return
        const id = window.setTimeout(() => {
            setSentText('')
            setAnimateOut(false)
        }, 500)
        return () => window.clearTimeout(id)
    }, [animateOut])


    const OFFSET_X = 10
    const OFFSET_Y = 24

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

            {(sentText || open) && (() => {
                const isMobile = window.innerWidth < 900
                const fontSize = isMobile ? 11 : 16
                const padding = isMobile ? '6px 10px' : '8px 16px'
                const borderRadius = isMobile ? 14 : 24
                const minHeight = isMobile ? 20 : 28

                return (
                    <div
                        style={{
                            position: 'relative',
                            backgroundColor: '#5263FF',
                            border: '2px solid #3646d9ff',
                            borderTopRightRadius: borderRadius,
                            borderBottomLeftRadius: borderRadius,
                            borderBottomRightRadius: borderRadius,
                            borderTopLeftRadius: 2,
                            padding,
                            color: '#fff',
                            fontSize,
                            fontWeight: 'bold',
                            fontFamily: 'Futura, Arial, sans-serif',
                            whiteSpace: 'nowrap',
                            minHeight,
                            display: 'flex',
                            alignItems: 'center',
                            opacity: bubbleOpacity,
                            transition: 'opacity 500ms ease'
                        }}
                    >


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

                        {text || ' '}
                    </div>
                )
            })()}
        </div>
    )
} 