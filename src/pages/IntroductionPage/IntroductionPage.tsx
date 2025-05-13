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

export default function IntroductionPage() {
    const topLeftRef = useRef<HTMLDivElement>(null)
    const textSectionRef = useRef<HTMLDivElement>(null)
    const bottomRightRef = useRef<HTMLDivElement>(null)
    const [waypoints, setWaypoints] = useState<any[]>([])

    // sticky notes zoom/pan interaction
    const stickyRef = useRef<HTMLDivElement>(null)
    const {
        handleMouseDown: stickyMouseDown,
        handleMouseMove: stickyMouseMove,
        handleMouseUp: stickyMouseUp,
        handleMouseLeave: stickyMouseLeave
    } = useZoomPanInteraction(stickyRef)

    useEffect(() => {
        if (
            topLeftRef.current &&
            textSectionRef.current &&
            bottomRightRef.current
        ) {
            setWaypoints([
                {
                    element: topLeftRef.current,
                    speed: 600,
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
                        waveSpeed: 100,
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
                    speed: 600,
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
                    speed: 600,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`
                },
                {
                    element: bottomRightRef.current,
                    speed: 600,
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
                        pointingSpeed: 200,
                        pointingDuration: 1500,
                        direction: 'down',
                        distance: 8
                    }
                },
                {
                    element: bottomRightRef.current,
                    speed: 600,
                    anchor: 'center',
                    pathStyle: 'straight',
                    cursor: `${process.env.PUBLIC_URL}/images/regular-cursor.png`
                },
            ])
        }
    }, [])

    return (
        <MainWrapper>
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
            <PolaroidContainer>
                <PolaroidCollection />
            </PolaroidContainer>

            <div
                ref={textSectionRef}
                style={{ position: 'relative', top: -50 }}
            >
                <div
                    ref={bottomRightRef}
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
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
                {/* Top Sticky */}
                <StickyNote
                    style={{ backgroundColor: '#FFE066', bottom: 140, left: 50, zIndex: 3 }}
                >
                    I'm a product designer in Austin Texas 🤠
                </StickyNote>

                {/* Bottom Left Sticky */}
                <StickyNote
                    style={{ backgroundColor: '#FF66FC', bottom: 0, left: 10, zIndex: 1 }}
                >
                    M.S. HCI @ Georgia Tech
                </StickyNote>

                {/* Bottom Right Sticky */}
                <StickyNote
                    style={{ backgroundColor: '#FFFFFF', bottom: 20, left: 200, zIndex: 2 }}
                >
                    Previously:
                    <LogoRow>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/intro/airforce.png`}
                            alt="Air Force"
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
                    offScreenSpeed={800}
                />
            )}
        </MainWrapper>
    )
}
