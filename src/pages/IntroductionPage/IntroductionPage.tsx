import React, {useEffect, useRef, useState} from 'react'
import PolaroidCollection from '../../components/Polaroid/PolaroidCollection'
import {useCursorSimulator} from '../../context/CursorSimulatorContext'
import {
    ContentWrapper,
    MainWrapper,
    PolaroidContainer,
    PolaroidStage,
    SingleTextContainer,
    SparklesImage,
    StickyNote,
    StickyNotesWrapper,
    TextsWrapper,
    StickyNoteTextBold,
    StickyNoteTextRegular
} from './IntroductionPage.styles'
import {useZoomPanInteraction} from '../../hooks/useZoomPanInteraction'
import {useZoomPanContext} from '../../context/ZoomPanContext'
import {useSearchContext} from '../../context/SearchContext'
import GemDraw from '../../components/SVG/GemDraw'
import {Typography} from '@mui/material'

const MOBILE_CHAT_SHIFT_X = -40

export default function IntroductionPage() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const topLeftRef = useRef<HTMLDivElement>(null)
    const textSectionRef = useRef<HTMLDivElement>(null)


    const textChatLeftRef = useRef<HTMLDivElement>(null)


    const bottomRightRef = useRef<HTMLDivElement>(null)


    const polaroidSectionRef = useRef<HTMLDivElement>(null)
    const polaroidInnerRef = useRef<HTMLDivElement>(null)


    const polaroidTopLeftRef = useRef<HTMLDivElement>(null)
    const stickyNoteTargetRef = useRef<HTMLDivElement>(null)


    const stickyRef = useRef<HTMLDivElement>(null)
    const {
        handleMouseDown: stickyMouseDown,
        handleMouseMove: stickyMouseMove,
        handleMouseUp: stickyMouseUp,
        handleMouseLeave: stickyMouseLeave
    } = useZoomPanInteraction(stickyRef)


    const {stageScale} = useZoomPanContext()
    const [noteOffsets, setNoteOffsets] = useState<Record<string, { x: number; y: number }>>({
        note1: {x: 0, y: 0},
        note2: {x: 0, y: 0},
        note3: {x: 0, y: 0}
    })
    const dragInfoRef = useRef<{
        id: string
        startX: number
        startY: number
        initialX: number
        initialY: number
    } | null>(null)

    const {registerItem, unregisterItem, registerGroupAnchor} = useSearchContext()
    const {setWaypoints: setCursorWaypoints, setStartCursor} = useCursorSimulator()

    const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!dragInfoRef.current) return
        const {id, startX, startY, initialX, initialY} = dragInfoRef.current
        const dx = (e.clientX - startX) / stageScale
        const dy = (e.clientY - startY) / stageScale
        setNoteOffsets((prev) => ({
            ...prev,
            [id]: {x: initialX + dx, y: initialY + dy}
        }))
    }

    const endDrag = () => {
        dragInfoRef.current = null
        window.removeEventListener('mousemove', handleGlobalMouseMove)
        window.removeEventListener('mouseup', endDrag)
    }

    const handleNoteMouseDown = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation()
        if (e.button !== 0) return
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


    const isClient = typeof window !== 'undefined'
    const vw = isClient ? window.innerWidth : 1200
    const vh = isClient ? window.innerHeight : 800
    const isMobile = vw < 900
    const isSmallMobile = vw < 380


    const diag = Math.hypot(vw, vh)
    const norm = Math.min(1.0, Math.max(0.72, diag / 1450))
    const SPEED = Math.round(600 * norm)
    const WAVE_SPEED = Math.round(100 * norm)
    const POINT_SPEED = Math.round(200 * norm)




    useEffect(() => {
        if (
            topLeftRef.current &&
            textSectionRef.current &&
            bottomRightRef.current &&
            polaroidTopLeftRef.current &&
            stickyNoteTargetRef.current
        ) {
            const chatTarget =
                isMobile && textChatLeftRef.current
                    ? textChatLeftRef.current
                    : textSectionRef.current

            setCursorWaypoints([
                {
                    element: topLeftRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`,
                    offsetX: isMobile ? 10 : 0,
                    offsetY: isMobile ? 10 : 0
                },
                {
                    element: topLeftRef.current,
                    speed: 0,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/wave.png`,
                    offsetX: isMobile ? 10 : 0,
                    offsetY: isMobile ? 10 : 0,
                    wave: {
                        waveSpeed: WAVE_SPEED,
                        waveDuration: 1800
                    },
                    chat: {
                        text: 'Hey there! 👋',
                        typingDuration: 500,
                        startTiming: 'before',
                        waitAfterTyping: 1500
                    }
                },
                {
                    element: chatTarget,
                    speed: SPEED,
                    anchor: 'top-center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`,
                    chat: {
                        text: 'Welcome to my Portfolio :D',
                        typingDuration: 800,
                        startTiming: 'after',
                        waitAfterTyping: 2500
                    }
                },
                {
                    element: polaroidTopLeftRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`,
                    offsetX: isMobile ? -window.innerWidth * 0.2 : 0,
                    chat: {
                        text: 'These are some of my past projects :)',
                        typingDuration: 800,
                        startTiming: 'after',
                        waitAfterTyping: 3000
                    }
                },
                {
                    element: stickyNoteTargetRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`,
                    offsetX: isMobile ? -window.innerWidth * 0.14 : 0,
                    chat: {
                        text: 'I have a Master\'s in HCI from Georgia Tech',
                        typingDuration: 800,
                        startTiming: 'after',
                        waitAfterTyping: 3400
                    }
                },
                {
                    element: bottomRightRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`,
                    chat: {
                        text: 'Come check out my work!!',
                        typingDuration: 800,
                        startTiming: 'after',
                        waitAfterTyping: 3000
                    }
                },
                {
                    element: bottomRightRef.current,
                    speed: SPEED,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`
                }
            ])
            setStartCursor(true)
        }
    }, [SPEED, WAVE_SPEED, norm, isMobile, setCursorWaypoints, setStartCursor])


    useEffect(() => {
        const items: { id: string; ref: React.RefObject<HTMLElement> }[] = [
            {id: 'intro-polaroids', ref: polaroidSectionRef as React.RefObject<HTMLElement>},
            {id: 'intro-text', ref: textSectionRef as React.RefObject<HTMLElement>},
            {id: 'intro-sticky', ref: stickyRef as React.RefObject<HTMLElement>}
        ]

        if (sectionRef.current) {
            registerGroupAnchor('Home', sectionRef.current, 0)
        }

        items.forEach((it) => {
            if (it.ref.current) {
                registerItem({id: it.id, element: it.ref.current})
            }
        })

        return () => {
            items.forEach((it) => unregisterItem(it.id))
        }
    }, [registerItem, unregisterItem, registerGroupAnchor])

    const textTop = isMobile ? 0 : -50


    const NOTE = isMobile ? (isSmallMobile ? 88 : 104) : 160
    const DY = isMobile ? Math.round(NOTE * 0.16) : 20

    const sticky1Pos = isMobile
        ? {bottom: NOTE + DY + 8, left: Math.max(20, Math.min(28, vw * 0.075))}
        : {bottom: 140, left: 50}

    const sticky2Pos = isMobile
        ? {bottom: Math.max(32, Math.min(38, vh * 0.048)), left: Math.max(4, Math.min(8, vw * 0.02))}
        : {bottom: 0, left: 10}

    const sticky3Pos = isMobile
        ? {bottom: Math.max(50, Math.min(58, vh * 0.072)), left: NOTE + Math.max(16, Math.min(20, vw * 0.053))}
        : {bottom: 20, left: 200}


    return (
        <MainWrapper ref={sectionRef}>
            <div
                ref={topLeftRef}
                style={{
                    position: 'absolute',
                    top: isMobile ? Math.max(20, Math.min(24, vh * 0.03)) : 60,
                    left: isMobile ? Math.max(12, Math.min(16, vw * 0.043)) : 60,
                    width: 1,
                    height: 1,
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />

            <PolaroidContainer
                ref={polaroidSectionRef}
                style={
                    isSmallMobile
                        ? { transform: 'scale(0.85)', transformOrigin: 'top right' }
                        : undefined
                }
            >
                <PolaroidStage
                    ref={polaroidInnerRef}
                    className={isMobile ? 'mobile-compact-captions' : undefined}
                >

                    <div
                        ref={polaroidTopLeftRef}
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: 180,
                            width: 1,
                            height: 1,
                            opacity: 0,
                            pointerEvents: 'none',
                            zIndex: 100
                        }}
                    />
                    <PolaroidCollection/>
                </PolaroidStage>
            </PolaroidContainer>

            <ContentWrapper>
                <div
                    ref={textSectionRef}
                    style={{position: 'relative', top: textTop}}
                >

                    <div
                        ref={textChatLeftRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: isMobile ? -MOBILE_CHAT_SHIFT_X : 0,
                            width: 1,
                            height: 1,
                            opacity: 0,
                            pointerEvents: 'none',
                        }}
                    />

                    <div
                        ref={bottomRightRef}
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            right: isMobile ? Math.max(160, Math.round(vw * 0.28)) : 20,
                            width: 1,
                            height: 1,
                            opacity: 0,
                            pointerEvents: 'none',
                        }}
                    />
                    <TextsWrapper>
                        <SingleTextContainer>
                            <SparklesImage as="div">
                                <GemDraw
                                    width={isMobile ? Math.max(120, Math.min(180, vw * 0.48)) : 160}
                                    height={isMobile ? Math.max(80, Math.min(119, vw * 0.32)) : 172}
                                    stroke="#FFFFFF"
                                    strokeWidth={isMobile ? 4 : 6}
                                    duration={0.3}
                                    stagger={0.3}
                                    trigger="mount"
                                />
                            </SparklesImage>
                            Hi!
                        </SingleTextContainer>

                        <SingleTextContainer>
                            I'm Shelby :)
                        </SingleTextContainer>
                    </TextsWrapper>
                </div>
            </ContentWrapper>

            <StickyNotesWrapper
                ref={stickyRef}
                onMouseDown={stickyMouseDown}
                onMouseMove={stickyMouseMove}
                onMouseUp={stickyMouseUp}
                onMouseLeave={stickyMouseLeave}
            >

                <div
                    ref={stickyNoteTargetRef}
                    style={{
                        position: 'absolute',
                        bottom: sticky2Pos.bottom + NOTE / 2 + 40,
                        left: sticky2Pos.left + NOTE / 2 + 20,
                        width: 1,
                        height: 1,
                        opacity: 0,
                        pointerEvents: 'none',
                        zIndex: 10
                    }}
                />
                <StickyNote
                    onMouseDown={handleNoteMouseDown('note1')}
                    style={{
                        backgroundColor: '#FFE066',
                        width: NOTE, height: NOTE,
                        ...sticky1Pos,
                        zIndex: 3,
                        transform: `translate(${noteOffsets.note1.x}px, ${noteOffsets.note1.y}px)`,
                        cursor: dragInfoRef.current?.id === 'note1' ? 'grabbing' : 'grab'
                    }}
                >
                    <StickyNoteTextRegular>I'm a </StickyNoteTextRegular>
                    <StickyNoteTextBold>product designer</StickyNoteTextBold>
                    <StickyNoteTextRegular> in </StickyNoteTextRegular>
                    <StickyNoteTextBold>Austin Texas 🤠</StickyNoteTextBold>
                </StickyNote>

                <StickyNote
                    onMouseDown={handleNoteMouseDown('note2')}
                    style={{
                        backgroundColor: '#FF66FC',
                        width: NOTE, height: NOTE,
                        ...sticky2Pos,
                        zIndex: 1,
                        transform: `translate(${noteOffsets.note2.x}px, ${noteOffsets.note2.y}px)`,
                        cursor: dragInfoRef.current?.id === 'note2' ? 'grabbing' : 'grab',
                        fontSize: isMobile ? 'clamp(8px, 2.5vw, 11px)' : undefined
                    }}
                >
                    <div style={{fontSize: isMobile ? 'clamp(8px, 2.5vw, 11px)' : undefined}}>
                        M.S. HCI @ Georgia Tech
                    </div>
                    <Typography sx={{fontSize: isMobile ? 'clamp(12px, 3vw, 14px)' : 24}}>🐝</Typography>
                </StickyNote>

                <StickyNote
                    onMouseDown={handleNoteMouseDown('note3')}
                    style={{
                        backgroundColor: '#FFFFFF',
                        width: NOTE, height: NOTE,
                        paddingTop: isMobile ? 8 : 18,
                        ...sticky3Pos,
                        zIndex: 2,
                        transform: `translate(${noteOffsets.note3.x}px, ${noteOffsets.note3.y}px)`,
                        cursor: dragInfoRef.current?.id === 'note3' ? 'grabbing' : 'grab'
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: isMobile ? 'clamp(9px, 2.8vw, 11px)' : 20,
                            mb: isMobile ? 0.3 : 1.5,
                            lineHeight: 1.1,
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                        }}
                    >
                        Previously @
                    </Typography>
                    <img
                        src={`${process.env.PUBLIC_URL}/images/intro/logos.png`}
                        alt="Previously at logos"
                        style={{
                            width: isMobile ? '92%' : '96%',
                            height: 'auto',
                            objectFit: 'contain',
                            marginTop: isMobile ? 0 : 2,
                            borderRadius: isMobile ? 4 : 8,
                            padding: isMobile ? 0 : 2,
                            background: 'rgba(255,255,255,0.9)'
                        }}
                    />
                </StickyNote>
            </StickyNotesWrapper>
        </MainWrapper>
    )
}
