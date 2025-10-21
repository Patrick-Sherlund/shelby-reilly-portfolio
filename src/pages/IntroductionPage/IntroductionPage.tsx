import React, { useRef, useEffect, useState } from 'react'
import { CursorSimulator } from '../../components/CursorSimulator/CursorSimulator'
import PolaroidCollection from '../../components/Polaroid/PolaroidCollection'
import {
    MainWrapper,
    PolaroidContainer,
    TextsWrapper,
    SingleTextContainer,
    SparklesImage,
    StickyNotesWrapper,
    StickyNote,
    LogoRow,
    ContentWrapper
} from './IntroductionPage.styles'
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction'
import { useZoomPanContext } from '../../context/ZoomPanContext'
import { useSearchContext } from '../../context/SearchContext'

export default function IntroductionPage() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const topLeftRef = useRef<HTMLDivElement>(null)
    const textSectionRef = useRef<HTMLDivElement>(null)

    // Chat waypoint — we push it left on phones so chat bubbles never bleed off-screen.
    const bottomRightRef = useRef<HTMLDivElement>(null)

    // Polaroid container (we measure & fit it on mobile so nothing overflows)
    const polaroidSectionRef = useRef<HTMLDivElement>(null)

    const [waypoints, setWaypoints] = useState<any[]>([])

    // sticky notes zoom/pan interaction
    const stickyRef = useRef<HTMLDivElement>(null)
    const {
        handleMouseDown: stickyMouseDown,
        handleMouseMove: stickyMouseMove,
        handleMouseUp: stickyMouseUp,
        handleMouseLeave: stickyMouseLeave
    } = useZoomPanInteraction(stickyRef)

    // ---- DRAGGABLE STICKY NOTES ----
    const { stageScale } = useZoomPanContext()
    const [noteOffsets, setNoteOffsets] = useState<Record<string, { x: number; y: number }>>({
        note1: { x: 0, y: 0 },
        note2: { x: 0, y: 0 },
        note3: { x: 0, y: 0 }
    })
    const dragInfoRef = useRef<{
        id: string
        startX: number
        startY: number
        initialX: number
        initialY: number
    } | null>(null)

    const { registerItem, unregisterItem, registerGroupAnchor } = useSearchContext()

    const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!dragInfoRef.current) return
        const { id, startX, startY, initialX, initialY } = dragInfoRef.current
        const dx = (e.clientX - startX) / stageScale
        const dy = (e.clientY - startY) / stageScale
        setNoteOffsets((prev) => ({
            ...prev,
            [id]: { x: initialX + dx, y: initialY + dy }
        }))
    }

    const endDrag = () => {
        dragInfoRef.current = null
        window.removeEventListener('mousemove', handleGlobalMouseMove)
        window.removeEventListener('mouseup', endDrag)
    }

    const handleNoteMouseDown = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation()
        if (e.button !== 0) return // left button only
        dragInfoRef.current = {
            id,
            startX: e.clientX,
            startY: e.clientY,
            initialX: noteOffsets[id].x,
            initialY: noteOffsets[id].y
        }
        window.addEventListener('mousemove', handleGlobalMouseMove)
        window.addEventListener('mouseup', endDrag)
    }

    // --- responsive runtime flags ---
    const isClient = typeof window !== 'undefined'
    const vw = isClient ? window.innerWidth : 1200
    const vh = isClient ? window.innerHeight : 800
    const isMobile = vw < 900

    // CursorSimulator normalization by viewport size (keeps motion consistent)
    const diag = Math.hypot(vw, vh)
    const norm = Math.min(1.0, Math.max(0.72, diag / 1450))
    const SPEED = Math.round(600 * norm)
    const WAVE_SPEED = Math.round(100 * norm)
    const POINT_SPEED = Math.round(200 * norm)

    // ---- MOBILE POLAROID FITTING (guarantees all 3 stay inside the blue frame) ----
    const [polaroidX, setPolaroidX] = useState<number>(0)
    const [polaroidScale, setPolaroidScale] = useState<number>(() =>
        isMobile ? Math.min(0.84, Math.max(0.68, vw / 520)) : 1
    )

    // Fit logic: compute a scale that keeps the inner composition inside safe bounds,
    // then micro-nudge horizontally so nothing clips either edge.
    useEffect(() => {
        if (!isMobile || !polaroidSectionRef.current) return

        const fitOnce = () => {
            const wrap = polaroidSectionRef.current!
            const child = wrap.firstElementChild as HTMLElement | null
            if (!child) return

            const wrapRect = wrap.getBoundingClientRect()
            const childRect = child.getBoundingClientRect()
            const currentScale = polaroidScale

            // "Natural" size before our CSS scale
            const naturalW = childRect.width / currentScale
            const naturalH = childRect.height / currentScale

            // Safe area inside the container on phones
            const horizontalMargin = 16
            const targetW = Math.max(240, wrapRect.width - horizontalMargin * 2)
            // keep height modest so the stack doesn't dominate the viewport
            const targetH = Math.max(220, Math.min(vh * 0.42, 360))

            const scaleW = targetW / naturalW
            const scaleH = targetH / naturalH
            const desired = Math.min(0.9, Math.max(0.62, Math.min(scaleW, scaleH)))

            // Only apply when meaningfully different to avoid loops
            if (Math.abs(desired - currentScale) > 0.01) {
                setPolaroidScale(desired)
                // After scale applies, measure again and nudge horizontally to remove any overflow.
                requestAnimationFrame(() => {
                    const rect = child.getBoundingClientRect()
                    let shift = 0
                    if (rect.right > wrapRect.right - horizontalMargin) {
                        shift -= rect.right - (wrapRect.right - horizontalMargin)
                    }
                    if (rect.left < wrapRect.left + horizontalMargin) {
                        shift += (wrapRect.left + horizontalMargin) - rect.left
                    }
                    setPolaroidX(Math.round(shift))
                })
            } else {
                // even if scale is already good, still correct any overflow due to rotations/shadows
                const rect = child.getBoundingClientRect()
                let shift = 0
                if (rect.right > wrapRect.right - horizontalMargin) {
                    shift -= rect.right - (wrapRect.right - horizontalMargin)
                }
                if (rect.left < wrapRect.left + horizontalMargin) {
                    shift += (wrapRect.left + horizontalMargin) - rect.left
                }
                setPolaroidX(Math.round(shift))
            }
        }

        fitOnce()
        const onResize = () => {
            // Re-seed scale from viewport, then fit precisely
            const base = Math.min(0.84, Math.max(0.68, window.innerWidth / 520))
            setPolaroidScale(base)
            requestAnimationFrame(fitOnce)
        }
        window.addEventListener('resize', onResize)
        window.addEventListener('orientationchange', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
            window.removeEventListener('orientationchange', onResize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, vh])

    // ---- Cursor waypoints (chat bubble never off-screen on phones) ----
    useEffect(() => {
        if (
            topLeftRef.current &&
            textSectionRef.current &&
            bottomRightRef.current
        ) {
            setWaypoints([
                {
                    element: topLeftRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`
                },
                {
                    element: topLeftRef.current,
                    speed: 0,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/wave.png`,
                    wave: {
                        waveSpeed: WAVE_SPEED,
                        waveDuration: 1500
                    },
                    chat: {
                        text: 'Hey there! 👋',
                        typingDuration: 500,
                        startTiming: 'before',
                        waitAfterTyping: 1200
                    }
                },
                {
                    element: textSectionRef.current,
                    speed: SPEED,
                    anchor: 'top-center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`,
                    chat: {
                        text: 'Welcome to my Portfolio :D',
                        typingDuration: 500,
                        startTiming: 'after',
                        waitAfterTyping: 1800
                    }
                },
                {
                    element: bottomRightRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`
                },
                {
                    element: bottomRightRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/pointer-down.png`,
                    chat: {
                        text: 'Follow me!!',
                        typingDuration: 300,
                        startTiming: 'after',
                        waitAfterTyping: 1500
                    },
                    pointing: {
                        pointingSpeed: POINT_SPEED,
                        pointingDuration: 1500,
                        direction: 'down',
                        distance: 8
                    }
                },
                {
                    element: bottomRightRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`
                },
            ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SPEED, WAVE_SPEED, POINT_SPEED])

    /* --- Register search items --- */
    useEffect(() => {
        const items: { id: string; ref: React.RefObject<HTMLElement> }[] = [
            { id: 'intro-polaroids', ref: polaroidSectionRef as React.RefObject<HTMLElement> },
            { id: 'intro-text', ref: textSectionRef as React.RefObject<HTMLElement> },
            { id: 'intro-sticky', ref: stickyRef as React.RefObject<HTMLElement> }
        ]

        if (sectionRef.current) {
            registerGroupAnchor('Home', sectionRef.current, 0)
        }

        items.forEach((it) => {
            if (it.ref.current) {
                registerItem({ id: it.id, element: it.ref.current })
            }
        })

        return () => {
            items.forEach((it) => unregisterItem(it.id))
        }
    }, [registerItem, unregisterItem, registerGroupAnchor])

    const textTop = isMobile ? 0 : -50

    // --- MOBILE sticky anchors (safe inside viewport & above toolbar) ---
    const noteW = isMobile ? 120 : 160
    const leftMargin = isMobile ? 16 : 50
    const bottomRow = isMobile ? Math.max(86, Math.round(vh * 0.12) + 24) : 0
    const topRow = isMobile ? bottomRow + Math.round(noteW * 0.7) : 140
    const rightPosLeft = isMobile
        ? Math.min(vw - leftMargin - noteW, 180)
        : 200

    const sticky1Pos = isMobile
        ? { bottom: topRow, left: leftMargin } // yellow (top-left)
        : { bottom: 140, left: 50 }

    const sticky2Pos = isMobile
        ? { bottom: bottomRow, left: leftMargin } // pink (bottom-left)
        : { bottom: 0, left: 10 }

    const sticky3Pos = isMobile
        ? { bottom: bottomRow, left: rightPosLeft } // white (bottom-right) — never off-screen
        : { bottom: 20, left: 200 }

    return (
        <MainWrapper ref={sectionRef}>
            <div
                ref={topLeftRef}
                style={{
                    position: 'absolute',
                    top: 60,
                    left: 60,
                    width: 1,
                    height: 1,
                    opacity: 0
                }}
            />

            <ContentWrapper>
                <PolaroidContainer
                    ref={polaroidSectionRef}
                    style={
                        isMobile
                            ? ({
                                ['--polaroidScale' as any]: polaroidScale,
                                ['--polaroidX' as any]: `${polaroidX}px`,
                                ['--polaroidY' as any]: '-6px'
                              } as React.CSSProperties)
                            : undefined
                    }
                >
                    <PolaroidCollection />
                </PolaroidContainer>

                <div
                    ref={textSectionRef}
                    style={{ position: 'relative', top: textTop }}
                >
                    <div
                        ref={bottomRightRef}
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            // push anchor farther left on phones so bubble text never bleeds
                            right: isMobile ? Math.max(160, Math.round(vw * 0.28)) : 20,
                            width: 1,
                            height: 1,
                            opacity: 0
                        }}
                    />
                    <TextsWrapper>
                        <SingleTextContainer>
                            <SparklesImage
                                src={`${process.env.PUBLIC_URL}/images/sparkles.png`}
                                alt="sparkles"
                            />
                            Hi!
                        </SingleTextContainer>

                        <SingleTextContainer>
                            I'm Shelby :)
                        </SingleTextContainer>
                    </TextsWrapper>
                </div>
            </ContentWrapper>

            {/* Sticky Notes Cluster */}
            <StickyNotesWrapper
                ref={stickyRef}
                onMouseDown={stickyMouseDown}
                onMouseMove={stickyMouseMove}
                onMouseUp={stickyMouseUp}
                onMouseLeave={stickyMouseLeave}
            >
                <StickyNote
                    onMouseDown={handleNoteMouseDown('note1')}
                    style={{
                        backgroundColor: '#FFE066',
                        ...sticky1Pos,
                        zIndex: 3,
                        transform: `translate(${noteOffsets.note1.x}px, ${noteOffsets.note1.y}px)`,
                        cursor: dragInfoRef.current?.id === 'note1' ? 'grabbing' : 'grab'
                    }}
                >
                    I'm a product designer in Austin Texas 🤠
                </StickyNote>

                <StickyNote
                    onMouseDown={handleNoteMouseDown('note2')}
                    style={{
                        backgroundColor: '#FF66FC',
                        ...sticky2Pos,
                        zIndex: 1,
                        transform: `translate(${noteOffsets.note2.x}px, ${noteOffsets.note2.y}px)`,
                        cursor: dragInfoRef.current?.id === 'note2' ? 'grabbing' : 'grab'
                    }}
                >
                    M.S. HCI @ Georgia Tech
                </StickyNote>

                <StickyNote
                    onMouseDown={handleNoteMouseDown('note3')}
                    style={{
                        backgroundColor: '#FFFFFF',
                        ...sticky3Pos,
                        zIndex: 2,
                        transform: `translate(${noteOffsets.note3.x}px, ${noteOffsets.note3.y}px)`,
                        cursor: dragInfoRef.current?.id === 'note3' ? 'grabbing' : 'grab'
                    }}
                >
                    Previously:
                    <LogoRow>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/intro/airforce.png`}
                            alt="U.S. Air Force"
                            height={18}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/images/intro/jamba.png`}
                            alt="Jamba"
                            height={20}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/images/intro/vmware.png`}
                            alt="VMware"
                            height={20}
                        />
                        <img
                            src={`${process.env.PUBLIC_URL}/images/intro/google.png`}
                            alt="Google"
                            height={20}
                        />
                    </LogoRow>
                </StickyNote>
            </StickyNotesWrapper>

            {waypoints.length > 0 && (
                <CursorSimulator
                    startSide="left"
                    endSide="bottom"
                    waypoints={waypoints}
                    start={true}
                    offScreenSpeed={Math.round(800 * norm)}
                />
            )}
        </MainWrapper>
    )
}
