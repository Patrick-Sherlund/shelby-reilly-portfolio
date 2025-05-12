import React, { useRef, useEffect, useState } from 'react'
import { CursorSimulator } from '../../components/CursorSimulator/CursorSimulator'
import PolaroidCollection from '../../components/Polaroid/PolaroidCollection'
import {
    MainWrapper,
    PolaroidContainer,
    TextsWrapper,
    SingleTextContainer,
    SparklesImage,
    ProductDesignerText
} from './IntroductionPage.styles'

export default function IntroductionPage() {
    const topLeftRef = useRef<HTMLDivElement>(null)
    const textSectionRef = useRef<HTMLDivElement>(null)
    const bottomRightRef = useRef<HTMLDivElement>(null)
    const [waypoints, setWaypoints] = useState<any[]>([])

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

            <PolaroidContainer>
                <PolaroidCollection />
            </PolaroidContainer>

            <div
                ref={textSectionRef}
                style={{ position: 'relative' }}
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

                    <ProductDesignerText>I'm a Product Designer</ProductDesignerText>
                </TextsWrapper>
            </div>

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
