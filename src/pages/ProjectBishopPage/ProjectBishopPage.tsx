import React, { useRef } from 'react'
import {
    MainWrapper,
    LogoImage,
    MidSection,
    DemoWrapper,
    IpadImage,
    DemoVideo,
    DescriptionWrapper,
    Title,
    LineText,
    CaseStudyButton
} from './ProjectBishopPage.styles'
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction'
import ipad from '../../assets/images/tablet.png';

export default function ProjectBishopPage() {
    // Refs for interaction areas
    const demoRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const demoInteraction = useZoomPanInteraction(demoRef)
    const descInteraction = useZoomPanInteraction(descRef)

    return (
        <MainWrapper>
            {/* Top-left logo */}
            <LogoImage
                src={`${process.env.PUBLIC_URL}/images/ctrly-logo.png`}
                alt="CTRL+Y Logo"
            />

            {/* Middle section */}
            <MidSection>
                {/* Left – Description */}
                <DescriptionWrapper
                    ref={descRef}
                    onMouseDown={descInteraction.handleMouseDown}
                    onMouseMove={descInteraction.handleMouseMove}
                    onMouseUp={descInteraction.handleMouseUp}
                    onMouseLeave={descInteraction.handleMouseLeave}
                >
                    <Title>Project Bishop</Title>
                    <LineText>2024</LineText>
                    <LineText>UX Designer</LineText>
                    <LineText>Frontend Engineer</LineText>

                    <div style={{ marginTop: '32px' }}>
                        <CaseStudyButton onClick={() => { window.location.hash = '#/bishop-project' }}>
                            READ CASE STUDY
                        </CaseStudyButton>
                    </div>
                </DescriptionWrapper>

                {/* Right – Web app demo video */}
                <DemoWrapper
                    ref={demoRef}
                    onMouseDown={demoInteraction.handleMouseDown}
                    onMouseMove={demoInteraction.handleMouseMove}
                    onMouseUp={demoInteraction.handleMouseUp}
                    onMouseLeave={demoInteraction.handleMouseLeave}
                >
                    <IpadImage
                        src={ipad}
                        alt="iPad frame"
                    />
                    <DemoVideo
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        controlsList="nodownload nofullscreen noremoteplayback"
                    >
                        <source src={`${process.env.PUBLIC_URL}/videos/bishop_demo.mp4`} type="video/mp4" />
                    </DemoVideo>
                </DemoWrapper>
            </MidSection>
        </MainWrapper>
    )
} 