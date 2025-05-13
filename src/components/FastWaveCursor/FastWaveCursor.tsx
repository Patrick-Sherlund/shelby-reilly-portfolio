import { useEffect, useRef } from 'react'

export default function FastWaveCursor() {
    const lastPos = useRef<{ x: number; y: number; t: number } | null>(null)
    const resetTimeout = useRef<number | null>(null)
    const lastFast = useRef<{ dirX: number; dirY: number; t: number } | null>(null)

    useEffect(() => {
        const REGULAR = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
        const WAVE = `url(${process.env.PUBLIC_URL}/images/wave.png) 16 16, auto`

        // Trigger when two consecutive fast moves in opposite directions occur within WINDOW_MS
        const SPEED_THRESHOLD = 0.8 // px per ms (~800 px/s)
        const WINDOW_MS = 120
        const RESET_MS = 500

        const handleMove = (e: MouseEvent) => {
            const now = performance.now()
            if (lastPos.current) {
                const dt = now - lastPos.current.t
                if (dt > 0) {
                    const dx = e.clientX - lastPos.current.x
                    const dy = e.clientY - lastPos.current.y
                    const speed = Math.sqrt(dx * dx + dy * dy) / dt

                    if (speed > SPEED_THRESHOLD) {
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        const dirX = dx / dist
                        const dirY = dy / dist

                        if (lastFast.current) {
                            const timeSince = now - lastFast.current.t
                            const dot = dirX * lastFast.current.dirX + dirY * lastFast.current.dirY
                            if (dot < -0.5 && timeSince < WINDOW_MS) {
                                // Opposite fast move detected within window
                                document.body.style.cursor = WAVE
                                if (resetTimeout.current) window.clearTimeout(resetTimeout.current)
                                resetTimeout.current = window.setTimeout(() => {
                                    document.body.style.cursor = REGULAR
                                }, RESET_MS)
                                lastFast.current = null
                            } else {
                                lastFast.current = { dirX, dirY, t: now }
                            }
                        } else {
                            lastFast.current = { dirX, dirY, t: now }
                        }
                    }
                }
            }
            lastPos.current = { x: e.clientX, y: e.clientY, t: now }
        }
        window.addEventListener('mousemove', handleMove)
        return () => {
            window.removeEventListener('mousemove', handleMove)
            if (resetTimeout.current) window.clearTimeout(resetTimeout.current)
        }
    }, [])

    return null
} 