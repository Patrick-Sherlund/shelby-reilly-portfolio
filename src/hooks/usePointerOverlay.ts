import {useEffect, useState} from 'react'

type Position = { x: number; y: number }

export function usePointerOverlay() {
    const [showOverlay, setShowOverlay] = useState(false)
    const [overlayPos, setOverlayPos] = useState<Position>({x: 0, y: 0})

    useEffect(() => {
        const moveListener = (e: MouseEvent) => {
            setOverlayPos({x: e.clientX, y: e.clientY})
        }


        if (showOverlay) {
            window.addEventListener('mousemove', moveListener)
        } else {
            window.removeEventListener('mousemove', moveListener)
        }

        return () => {
            window.removeEventListener('mousemove', moveListener)
        }
    }, [showOverlay])

    return {
        showOverlay,
        setShowOverlay,
        overlayPos
    }
}
