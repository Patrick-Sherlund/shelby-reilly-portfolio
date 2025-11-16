import { useState, useCallback, RefObject } from 'react'
import Konva from 'konva'

export const DEFAULT_SCROLL_PAGES = 3

export function useZoomPan() {
    const [stageScale, setStageScale] = useState(1)
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
    const [maxScrollPages, setMaxScrollPages] = useState(DEFAULT_SCROLL_PAGES)

    const clampScale = useCallback((s: number) => {
        if (s < 1) return 1
        if (s > 3) return 3
        return s
    }, [])

    const clampStagePosition = useCallback((y: number) => {
        const minY = -maxScrollPages * window.innerHeight * stageScale
        if (y < minY) return minY
        if (y > 0) return 0
        return y
    }, [stageScale, maxScrollPages])

    const zoomStageToPoint = useCallback(
        (stageRef: RefObject<Konva.Stage>, deltaY: number, pointerPosition: { x: number; y: number }) => {
            if (!stageRef.current) return

            const stage = stageRef.current
            const oldScale = stageScale
            
            // Calculate new scale based on wheel delta
            // Smaller factor = more sensitive zoom
            const zoomFactor = 0.01
            const newScale = clampScale(oldScale - deltaY * zoomFactor)
            
            if (newScale === oldScale) return

            // Get pointer position relative to stage
            const mousePointTo = {
                x: (pointerPosition.x - stage.x()) / oldScale,
                y: (pointerPosition.y - stage.y()) / oldScale
            }

            // Calculate new position based on pointer as zoom center
            const newPos = {
                x: pointerPosition.x - mousePointTo.x * newScale,
                y: pointerPosition.y - mousePointTo.y * newScale
            }

            // Apply vertical limits
            newPos.y = clampStagePosition(newPos.y)
            
            // Update state
            setStageScale(newScale)
            setStagePos(newPos)
        },
        [stageScale, clampScale, clampStagePosition]
    )

    const handleWheel = useCallback(
        (e: Konva.KonvaEventObject<WheelEvent>, stageRef: RefObject<Konva.Stage>) => {
            e.evt.preventDefault()
            
            const pointerPosition = stageRef.current?.getPointerPosition() || { x: 0, y: 0 }
            const deltaY = e.evt.deltaY
            
            // Check if Ctrl/Cmd key is pressed
            if (e.evt.ctrlKey || e.evt.metaKey) {
                // Zoom when Ctrl/Cmd is pressed
                zoomStageToPoint(stageRef, deltaY, pointerPosition)
            } else {
                // Regular scrolling behavior when no modifier keys are pressed
                setStagePos((prev) => {
                    const newY = clampStagePosition(prev.y - deltaY)
                    return { x: prev.x, y: newY }
                })
            }
        },
        [zoomStageToPoint, setStagePos, clampStagePosition]
    )

    const handleTouchMove = useCallback(
        (e: Konva.KonvaEventObject<TouchEvent>, stageRef: RefObject<Konva.Stage>, prevTouch: React.MutableRefObject<{ 
            touches: Touch[];
            distance?: number;
            midpoint?: { x: number; y: number };
            time: number;
        } | null>) => {
            // Handle two-finger gestures
            if (e.evt.touches.length !== 2) {
                prevTouch.current = null;
                return;
            }
            
            e.evt.preventDefault();
            
            const touch1 = e.evt.touches[0];
            const touch2 = e.evt.touches[1];
            
            // Calculate the distance between the two touches
            const currentDistance = Math.sqrt(
                Math.pow(touch1.clientX - touch2.clientX, 2) + 
                Math.pow(touch1.clientY - touch2.clientY, 2)
            );
            
            // Calculate midpoint between the two touches
            const midpoint = {
                x: (touch1.clientX + touch2.clientX) / 2,
                y: (touch1.clientY + touch2.clientY) / 2
            };
            
            const currentTime = Date.now();
            
            // If we don't have previous touch data, just store the current data
            if (!prevTouch.current) {
                prevTouch.current = {
                    touches: [touch1, touch2],
                    distance: currentDistance,
                    midpoint,
                    time: currentTime
                };
                return;
            }
            
            const timeDelta = currentTime - prevTouch.current.time;
            
            // Make sure we have previous distance to compare
            if (prevTouch.current.distance !== undefined) {
                const distanceDelta = Math.abs(currentDistance - prevTouch.current.distance);
                
                // Calculate vertical movement of both fingers (average)
                const prevTouch1 = prevTouch.current.touches[0];
                const prevTouch2 = prevTouch.current.touches[1];
                
                const touch1YDelta = touch1.clientY - prevTouch1.clientY;
                const touch2YDelta = touch2.clientY - prevTouch2.clientY;
                const averageYDelta = (touch1YDelta + touch2YDelta) / 2;
                
                // If the distance changed significantly, it's a pinch gesture
                // Use a threshold to determine if it's a pinch or a scroll
                const PINCH_THRESHOLD = 5; // pixels
                
                if (distanceDelta > PINCH_THRESHOLD) {
                    // Pinch gesture - handle zoom
                    const deltaY = (prevTouch.current.distance - currentDistance) * 2;
                    zoomStageToPoint(stageRef, deltaY, midpoint);
                } else if (Math.abs(averageYDelta) > 0) {
                    // Two-finger scrolling - just move vertically
                    setStagePos((prev) => {
                        const newY = clampStagePosition(prev.y - averageYDelta);
                        return { x: prev.x, y: newY };
                    });
                }
            }
            
            // Update the previous touch state
            prevTouch.current = {
                touches: [touch1, touch2],
                distance: currentDistance,
                midpoint,
                time: currentTime
            };
        },
        [zoomStageToPoint, setStagePos, clampStagePosition]
    )

    const handleTouchEnd = useCallback((prevTouch: React.MutableRefObject<{ 
        touches: Touch[];
        distance?: number;
        midpoint?: { x: number; y: number };
        time: number;
    } | null>) => {
        prevTouch.current = null;
    }, [])

    // Function to zoom in with buttons (centered on screen)
    const zoomIn = useCallback((stageRef: RefObject<Konva.Stage>) => {
        if (!stageRef.current) return
        
        const center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        
        zoomStageToPoint(stageRef, -10, center)
    }, [zoomStageToPoint])

    // Function to zoom out with buttons (centered on screen)
    const zoomOut = useCallback((stageRef: RefObject<Konva.Stage>) => {
        if (!stageRef.current) return
        
        const center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        
        zoomStageToPoint(stageRef, 10, center)
    }, [zoomStageToPoint])

    return {
        stageScale,
        setStageScale,
        stagePos,
        setStagePos,
        maxScrollPages,
        setMaxScrollPages,
        clampScale,
        clampStagePosition,
        handleWheel,
        handleTouchMove,
        handleTouchEnd,
        zoomIn,
        zoomOut
    }
}
