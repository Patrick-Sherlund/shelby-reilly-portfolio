import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {useZoomPanContext} from '../../context/ZoomPanContext'

export type Side = 'left' | 'right' | 'top' | 'bottom'
export type Anchor =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center'
    | 'left-center'
    | 'right-center'
    | 'center'
export type PathStyle = 'bezier' | 'straight'

export type ChatData = {
    text: string
    typingDuration?: number
    startTiming?: 'before' | 'after'
    waitAfterTyping?: number
    bgColor?: string
    borderColor?: string
}

export type WaveData = {
    waveSpeed?: number
    waveDuration?: number
}

export type PointingData = {
    pointingSpeed?: number
    pointingDuration?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    distance?: number
}

export type Waypoint = {
    element: HTMLElement
    waitTime?: number
    speed?: number
    anchor?: Anchor
    pathStyle?: PathStyle
    offsetX?: number
    offsetY?: number
    midOffsetX1?: number
    midOffsetY1?: number
    midOffsetX2?: number
    midOffsetY2?: number
    chat?: ChatData
    wave?: WaveData
    pointing?: PointingData
    cursor?: string
}

export type CursorSimulatorProps = {
    waypoints: Waypoint[]
    startSide: Side
    endSide?: Side
    start: boolean
    onComplete?: () => void
    offScreenSpeed?: number
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
    const dx = b.x - a.x
    const dy = b.y - a.y
    return Math.sqrt(dx * dx + dy * dy)
}

function clamp(value: number, minVal: number, maxVal: number) {
    return Math.max(minVal, Math.min(maxVal, value))
}

function calcBezierPoint(
    t: number,
    start: { x: number; y: number },
    cp1: { x: number; y: number },
    cp2: { x: number; y: number },
    end: { x: number; y: number }
) {
    const cX = 3 * (cp1.x - start.x)
    const bX = 3 * (cp2.x - cp1.x) - cX
    const aX = end.x - start.x - cX - bX
    const cY = 3 * (cp1.y - start.y)
    const bY = 3 * (cp2.y - cp1.y) - cY
    const aY = end.y - start.y - cY - bY
    const px = aX * t ** 3 + bX * t ** 2 + cX * t + start.x
    const py = aY * t ** 3 + bY * t ** 2 + cY * t + start.y
    return {x: px, y: py}
}

function getOffscreenPosition(
    side: Side,
    stageXOffset: number = 0,
    stageYOffset: number = 0,
    scale: number = 1
) {


    let viewportX = 0
    let viewportY = 0

    if (side === 'left') {
        viewportX = -50
        viewportY = window.innerHeight / 2
    } else if (side === 'right') {
        viewportX = window.innerWidth + 50
        viewportY = window.innerHeight / 2
    } else if (side === 'top') {
        viewportX = window.innerWidth / 2
        viewportY = -50
    } else {
        viewportX = window.innerWidth / 2
        viewportY = window.innerHeight + 50
    }

    return {
        x: (viewportX - stageXOffset) / scale,
        y: (viewportY - stageYOffset) / scale
    }
}

function getAnchorPosition(
    rect: DOMRect,
    anchor: Anchor,
    stageYOffset: number = 0,
    stageXOffset: number = 0,
    scale: number = 1
) {


    const left = (rect.left - stageXOffset) / scale
    const right = (rect.right - stageXOffset) / scale
    const top = (rect.top - stageYOffset) / scale
    const bottom = (rect.bottom - stageYOffset) / scale
    const cx = left + (rect.width / scale) / 2
    const cy = top + (rect.height / scale) / 2
    if (anchor === 'top-left') return {x: left, y: top}
    if (anchor === 'top-right') return {x: right, y: top}
    if (anchor === 'bottom-left') return {x: left, y: bottom}
    if (anchor === 'bottom-right') return {x: right, y: bottom}
    if (anchor === 'top-center') return {x: cx, y: top}
    if (anchor === 'bottom-center') return {x: cx, y: bottom}
    if (anchor === 'left-center') return {x: left, y: cy}
    if (anchor === 'right-center') return {x: right, y: cy}
    return {x: cx, y: cy}
}

function ChatBubble({
                        text,
                        x,
                        y,
                        bgColor = '#5263FF',
                        borderColor = '#3646d9ff',
                        cursorWidth,
                        cursorHeight
                    }: {
    text: string
    x: number
    y: number
    bgColor?: string
    borderColor?: string
    cursorWidth: number
    cursorHeight: number
}) {
    const isMobile = window.innerWidth < 900
    const fontSize = isMobile ? 11 : 16
    const padding = isMobile ? '6px 10px' : '8px 16px'
    const borderRadius = isMobile ? 14 : 24

    return (
        <div
            style={{
                position: 'absolute',
                left: x + cursorWidth / 2 + 10,
                top: y + cursorHeight / 2 + 10,
                transform: 'translate(0, -50%)',
                pointerEvents: 'none',
                zIndex: 2147483647,
                backgroundColor: bgColor,
                border: `2px solid ${borderColor}`,
                borderTopRightRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
                borderTopLeftRadius: 2,
                padding,
                color: '#fff',
                fontSize,
                fontWeight: 'bold',
                fontFamily: 'Futura, Arial, sans-serif',
                whiteSpace: 'nowrap'
            }}
        >
            {text}
        </div>
    )
}

function NameLabel({
                       x,
                       y,
                       cursorWidth,
                       cursorHeight,
                       typing,
                       bgColor = '#5263FF'
                   }: {
    x: number
    y: number
    cursorWidth: number
    cursorHeight: number
    typing: boolean
    bgColor?: string
}) {
    const isMobile = window.innerWidth < 900
    const CHAT_HEIGHT = isMobile ? 20 : 28
    const fontSize = isMobile ? 9 : 12
    const padding = isMobile ? '1px 4px' : '2px 6px'
    const offsetY = cursorHeight / 2 + 10 + (typing ? CHAT_HEIGHT + 4 : 0)

    return (
        <div
            style={{
                position: 'absolute',
                left: x + cursorWidth / 2 + 10,
                top: y + offsetY,
                pointerEvents: 'none',
                zIndex: 2147483647,
                backgroundColor: bgColor,
                border: '2px solid #5160e1ff',
                color: '#fff',
                fontSize,
                fontWeight: 600,
                fontFamily: 'Futura, Arial, sans-serif',
                padding,
                borderRadius: 0,
                whiteSpace: 'nowrap'
            }}
        >
            Shelby Reilly
        </div>
    )
}

export function CursorSimulator({
                                    waypoints,
                                    startSide,
                                    endSide,
                                    start,
                                    onComplete,
                                    offScreenSpeed
                                }: CursorSimulatorProps) {
    const {stagePos, stageScale} = useZoomPanContext()
    const [position, setPosition] = useState(() => getOffscreenPosition(startSide))
    const [visible, setVisible] = useState(false)
    const [index, setIndex] = useState(0)
    const [moving, setMoving] = useState(false)
    const [initialized, setInitialized] = useState(false)
    const [typing, setTyping] = useState(false)
    const [chatText, setChatText] = useState('')
    const typingRef = useRef(0)
    const [pauseAfterArrival, setPauseAfterArrival] = useState(false)
    const animateRef = useRef(0)
    const pathRef = useRef<{
        start: { x: number; y: number }
        cp1: { x: number; y: number }
        cp2: { x: number; y: number }
        end: { x: number; y: number }
        total: number
        startTime: number
        wait: number
        fraction?: number
    } | null>(null)
    const [cursorRotation, setCursorRotation] = useState(0)
    const [waveInterval, setWaveInterval] = useState<any>(null)
    const [pointInterval, setPointInterval] = useState<any>(null)
    const [waypointCursor, setWaypointCursor] = useState<string>('')
    const [cursorSize, setCursorSize] = useState({width: 24, height: 24})
    const [pointerOffset, setPointerOffset] = useState({x: 0, y: 0})

    useEffect(() => {
        return () => {
            if (waveInterval) clearInterval(waveInterval)
            if (pointInterval) clearInterval(pointInterval)
        }
    }, [waveInterval, pointInterval])

    useEffect(() => {
        if (!waypointCursor) return
        const img = new Image()
        img.onload = () => {
            setCursorSize({width: img.width, height: img.height})
        }
        img.src = waypointCursor
    }, [waypointCursor])

    useEffect(() => {
        function handleResizeScroll() {
            if (!moving || !pathRef.current) return
            const now = performance.now()
            const elapsed = now - pathRef.current.startTime
            const frac = clamp(elapsed / pathRef.current.total, 0, 1)
            if (frac >= 1) return
            pathRef.current.fraction = frac
            const partial = calcBezierPoint(
                frac,
                pathRef.current.start,
                pathRef.current.cp1,
                pathRef.current.cp2,
                pathRef.current.end
            )
            setPosition(partial)
            const leftover = pathRef.current.total * (1 - frac)
            pathRef.current.start = partial
            pathRef.current.total = leftover
            pathRef.current.startTime = performance.now()
        }

        window.addEventListener('scroll', handleResizeScroll)
        window.addEventListener('resize', handleResizeScroll)
        return () => {
            window.removeEventListener('scroll', handleResizeScroll)
            window.removeEventListener('resize', handleResizeScroll)
        }
    }, [moving])

    useLayoutEffect(() => {
        if (!moving) return
        const loop = () => {
            if (!moving || !pathRef.current) return
            const now = performance.now()
            const elapsed = now - pathRef.current.startTime
            const r = clamp(elapsed / pathRef.current.total, 0, 1)
            const pt = calcBezierPoint(
                r,
                pathRef.current.start,
                pathRef.current.cp1,
                pathRef.current.cp2,
                pathRef.current.end
            )
            setPosition(pt)
            if (r >= 1) {
                setMoving(false)
                const hold = pathRef.current.wait
                window.setTimeout(() => {
                    if (!pauseAfterArrival) setIndex(v => v + 1)
                    else setPauseAfterArrival(false)
                }, hold)
            } else {
                animateRef.current = requestAnimationFrame(loop)
            }
        }
        animateRef.current = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(animateRef.current)
    }, [moving, pauseAfterArrival])

    useEffect(() => {
        if (!start) return
        if (!initialized && waypoints.length) {
            setInitialized(true)
            setVisible(true)
            setPosition(getOffscreenPosition(startSide, stagePos.x, stagePos.y, stageScale))
            setIndex(0)
        }
    }, [start, waypoints, startSide, initialized, stagePos.x, stagePos.y, stageScale])

    useEffect(() => {
        if (!visible || index > waypoints.length) return
        if (index === waypoints.length) {
            if (endSide) {
                leaveOffscreen()
            } else if (onComplete) {
                onComplete()
            }
            return
        }
        processWaypoint(index)
    }, [index, visible])

    function processWaypoint(i: number) {
        const w = waypoints[i]
        if (!w) return
        setWaypointCursor(w.cursor || '')
        if (w.wave) handleWave(w.wave.waveSpeed || 100, w.wave.waveDuration || 1000)
        if (w.pointing) {
            handlePointing(
                w.pointing.pointingSpeed || 100,
                w.pointing.pointingDuration || 1000,
                w.pointing.direction || 'down',
                w.pointing.distance || 15
            )
        }
        if (!w.chat) {
            moveCursor(i)
            return
        }
        if (w.chat.startTiming === 'before') {
            setTyping(true)
            handleTyping(w.chat.text, w.chat.typingDuration || 1000, w.chat.waitAfterTyping || 0, () => {
                setTyping(false)
                moveCursor(i)
            })
        } else {
            moveCursor(i)
            setPauseAfterArrival(true)
            const ms = (w.waitTime || 0) + (w.speed || 150)
            window.setTimeout(() => {
                setTyping(true)
                if (!!w?.chat)
                    handleTyping(
                        w.chat.text,
                        w.chat.typingDuration || 1000,
                        w.chat.waitAfterTyping || 0,
                        () => {
                            setTyping(false)
                            setPauseAfterArrival(false)
                            setIndex(v => v + 1)
                        }
                    )
            }, ms)
        }
    }

    function handleTyping(
        text: string,
        typingMs: number,
        waitAfterTyping: number,
        done: () => void
    ) {
        window.clearTimeout(typingRef.current)
        setChatText('')
        let idx = 0
        const totalChars = text.length
        const msPerChar = typingMs / totalChars
        const nextChar = () => {
            idx++
            setChatText(text.slice(0, idx))
            if (idx < totalChars) {
                typingRef.current = window.setTimeout(nextChar, msPerChar)
            } else {
                window.setTimeout(() => {
                    done()
                }, waitAfterTyping)
            }
        }
        nextChar()
    }

    function handleWave(waveSpeed: number, waveDuration: number) {
        if (waveInterval) clearInterval(waveInterval)
        const startTime = performance.now()
        let direction = 1
        const interval = setInterval(() => {
            const now = performance.now()
            if (now - startTime >= waveDuration) {
                clearInterval(interval)
                setCursorRotation(0)
            } else {
                setCursorRotation(r => {
                    const next = r + direction * 20
                    if (next >= 20) direction = -1
                    if (next <= -20) direction = 1
                    return next
                })
            }
        }, waveSpeed)
        setWaveInterval(interval)
    }

    function handlePointing(
        pointingSpeed: number,
        pointingDuration: number,
        direction: 'up' | 'down' | 'left' | 'right',
        distance: number
    ) {
        if (pointInterval) clearInterval(pointInterval)
        const startTime = performance.now()
        let dirSign = 1
        const interval = setInterval(() => {
            const now = performance.now()
            if (now - startTime >= pointingDuration) {
                clearInterval(interval)
                setPointerOffset({x: 0, y: 0})
            } else {
                setPointerOffset(prev => {
                    let {x, y} = prev
                    if (direction === 'up' || direction === 'down') {
                        const shift = dirSign * distance
                        y = direction === 'down' ? shift : -shift
                    } else {
                        const shift = dirSign * distance
                        x = direction === 'right' ? shift : -shift
                    }
                    dirSign *= -1
                    return {x, y}
                })
            }
        }, pointingSpeed)
        setPointInterval(interval)
    }

    function moveCursor(i: number) {
        const w = waypoints[i]
        if (!w) return
        const rect = w.element.getBoundingClientRect()

        const anchorPos = getAnchorPosition(rect, w.anchor || 'center', stagePos.y, stagePos.x, stageScale)
        const targetPos = {
            x: anchorPos.x + (w.offsetX || 0),
            y: anchorPos.y + (w.offsetY || 0)
        }
        const stPos = {x: position.x, y: position.y}
        const distVal = distance(stPos, targetPos)
        const speedVal = w.speed || 150
        const totalTime = (distVal / speedVal) * 1000
        let cp1 = stPos
        let cp2 = targetPos
        if (w.pathStyle === 'bezier') {
            const mx1 = (stPos.x + targetPos.x) / 2 + (w.midOffsetX1 || 0)
            const my1 = (stPos.y + targetPos.y) / 2 + (w.midOffsetY1 || 0)
            const mx2 = (stPos.x + targetPos.x) / 2 + (w.midOffsetX2 || 0)
            const my2 = (stPos.y + targetPos.y) / 2 + (w.midOffsetY2 || 0)
            cp1 = {x: mx1, y: my1}
            cp2 = {x: mx2, y: my2}
        }
        pathRef.current = {
            start: stPos,
            cp1,
            cp2,
            end: targetPos,
            total: totalTime,
            startTime: performance.now(),
            wait: w.waitTime || 0
        }
        setMoving(true)
    }

    function leaveOffscreen() {
        const stPos = {x: position.x, y: position.y}
        const offPos = getOffscreenPosition(endSide!, stagePos.x, stagePos.y, stageScale)
        const distVal = distance(stPos, offPos)
        const speedForOffscreen = offScreenSpeed || 150
        const dur = (distVal / speedForOffscreen) * 1000
        pathRef.current = {
            start: stPos,
            cp1: stPos,
            cp2: offPos,
            end: offPos,
            total: dur,
            startTime: performance.now(),
            wait: 0
        }
        setMoving(true)
        window.setTimeout(() => {
            setVisible(false)
            if (onComplete) onComplete()
        }, dur)
    }

    if (!visible) return null


    const adjustedX = (position.x * stageScale) + stagePos.x
    const adjustedY = (position.y * stageScale) + stagePos.y

    return (
        <>
            <img
                src={waypointCursor || ''}
                alt=""
                style={{
                    position: 'absolute',
                    left: adjustedX + pointerOffset.x,
                    top: adjustedY + pointerOffset.y,
                    pointerEvents: 'none',
                    transform: `translate(-50%, -50%) rotate(${cursorRotation}deg)`,
                    zIndex: 2147483647
                }}
            />
            {typing && (
                <ChatBubble
                    text={chatText}
                    x={adjustedX}
                    y={adjustedY}
                    bgColor={waypoints[index]?.chat?.bgColor}
                    borderColor={waypoints[index]?.chat?.borderColor}
                    cursorWidth={cursorSize.width}
                    cursorHeight={cursorSize.height}
                />
            )}
            <NameLabel
                x={adjustedX}
                y={adjustedY}
                cursorWidth={cursorSize.width}
                cursorHeight={cursorSize.height}
                typing={typing}
                bgColor={waypoints[index]?.chat?.bgColor || '#5263FF'}
            />
        </>
    )
}
