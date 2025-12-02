import {useEffect, useState} from 'react'

type Position = { x: number; y: number }

export function usePointerOverlay() {
    const [showOverlay, setShowOverlay] = useState(false)
    const [overlayPos, setOverlayPos] = useState<Position>({x: 0, y: 0})

    useEffect(() => {
        const moveListener = (e: MouseEvent) => {
            setOverlayPos({x: e.clientX, y: e.clientY})
        }

        const touchMoveListener = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0]
                setOverlayPos({x: touch.clientX, y: touch.clientY})
            }
        }

        const touchStartListener = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0]
                setOverlayPos({x: touch.clientX, y: touch.clientY})
            }
        }

        const touchEndListener = () => {
            setShowOverlay(false)
        }

        if (showOverlay) {
            window.addEventListener('mousemove', moveListener)
            window.addEventListener('touchstart', touchStartListener, { passive: true })
            window.addEventListener('touchmove', touchMoveListener, { passive: true })
            window.addEventListener('touchend', touchEndListener, { passive: true })
            window.addEventListener('touchcancel', touchEndListener, { passive: true })
        } else {
            window.removeEventListener('mousemove', moveListener)
            window.removeEventListener('touchstart', touchStartListener)
            window.removeEventListener('touchmove', touchMoveListener)
            window.removeEventListener('touchend', touchEndListener)
            window.removeEventListener('touchcancel', touchEndListener)
        }

        return () => {
            window.removeEventListener('mousemove', moveListener)
            window.removeEventListener('touchstart', touchStartListener)
            window.removeEventListener('touchmove', touchMoveListener)
            window.removeEventListener('touchend', touchEndListener)
            window.removeEventListener('touchcancel', touchEndListener)
        }
    }, [showOverlay])

    return {
        showOverlay,
        setShowOverlay,
        overlayPos
    }
}
