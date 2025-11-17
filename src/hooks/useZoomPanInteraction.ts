import {useCallback, useEffect, useRef} from 'react'
import {useZoomPanContext} from '../context/ZoomPanContext'


const clampScale = (s: number) => {
    if (s < 1) return 1
    if (s > 3) return 3
    return s
}

export function useZoomPanInteraction(containerRef: React.RefObject<HTMLElement | null>) {
    const {
        stageRef,
        stageScale,
        setStageScale,
        stagePos,
        setStagePos,
        clampStagePosition
    } = useZoomPanContext()


    const wheelHandler = useCallback((e: WheelEvent) => {
        e.preventDefault()
        const deltaY = e.deltaY

        if (e.ctrlKey || e.metaKey) {
            if (!stageRef.current) return

            const oldScale = stageScale
            const newScale = clampScale(oldScale - deltaY * 0.01)
            if (newScale === oldScale) return

            const pointerPosition = {x: e.clientX, y: e.clientY}
            const stage = stageRef.current
            const mousePointTo = {
                x: (pointerPosition.x - stage.x()) / oldScale,
                y: (pointerPosition.y - stage.y()) / oldScale
            }
            const newPos = {
                x: pointerPosition.x - mousePointTo.x * newScale,
                y: pointerPosition.y - mousePointTo.y * newScale
            }
            newPos.y = clampStagePosition(newPos.y)
            setStageScale(newScale)
            setStagePos(newPos)
        } else {

            setStagePos(prev => {
                const newY = clampStagePosition(prev.y - deltaY)
                return {x: prev.x, y: newY}
            })
        }
    }, [stageScale, stageRef, clampStagePosition, setStageScale, setStagePos])


    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        container.addEventListener('wheel', wheelHandler, {passive: false})
        return () => {
            container.removeEventListener('wheel', wheelHandler)
        }
    }, [wheelHandler, containerRef])


    const isDraggingRef = useRef(false)
    const dragStartPosRef = useRef<{ x: number; y: number }>({x: 0, y: 0})
    const stageStartPosRef = useRef<{ x: number; y: number }>({x: 0, y: 0})

    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        if (e.button !== 0) return
        isDraggingRef.current = true
        dragStartPosRef.current = {x: e.clientX, y: e.clientY}
        stageStartPosRef.current = {...stagePos}
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!isDraggingRef.current) return
        const dx = e.clientX - dragStartPosRef.current.x
        const dy = e.clientY - dragStartPosRef.current.y
        setStagePos({
            x: stageStartPosRef.current.x + dx,
            y: clampStagePosition(stageStartPosRef.current.y + dy)
        })
    }

    const endDrag = () => {
        isDraggingRef.current = false
    }

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp: endDrag,
        handleMouseLeave: endDrag
    }
} 