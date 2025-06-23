import React, { useRef } from 'react'
import {
    MainWrapper,
    LogoImage,
    MidSection,
    DemoWrapper,
    DemoPlaceholder,
    DescriptionWrapper,
    Title,
    LineText,
    CaseStudyButton
} from './GoogleCodesignPage.styles'
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction'

export default function GoogleCodesignPage() {
    // Refs for interaction areas
    const demoRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const demoInteraction = useZoomPanInteraction(demoRef)
    const descInteraction = useZoomPanInteraction(descRef)

    return (
        <MainWrapper>
            {/* Top-left logo */}
            <LogoImage
                src={`${process.env.PUBLIC_URL}/images/google-logo.png`}
                alt="Google Logo"
            />

            {/* Middle section */}
            <MidSection>
                {/* Left – Web app / Figma prototype */}
                <DemoWrapper
                    ref={demoRef}
                    onMouseDown={demoInteraction.handleMouseDown}
                    onMouseMove={demoInteraction.handleMouseMove}
                    onMouseUp={demoInteraction.handleMouseUp}
                    onMouseLeave={demoInteraction.handleMouseLeave}
                >
                    <DemoPlaceholder>
                        {/* Embedded Figma prototype */}
                        <iframe
                            title="Google Codesign Prototype"
                            src={`https://www.figma.com/embed?embed_host=share&scaling=scale-down&content-scaling=fixed&url=${encodeURIComponent('https://www.figma.com/proto/9GkFUccLaG4OcDgoqlzeUy?node-id=1605-6829&t=WufZgx0NQqJRKphg-6')}`}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            allowFullScreen
                        />
                    </DemoPlaceholder>
                </DemoWrapper>

                {/* Right – Description */}
                <DescriptionWrapper
                    ref={descRef}
                    onMouseDown={descInteraction.handleMouseDown}
                    onMouseMove={descInteraction.handleMouseMove}
                    onMouseUp={descInteraction.handleMouseUp}
                    onMouseLeave={descInteraction.handleMouseLeave}
                >
                    <Title>Google Codesign</Title>
                    <LineText>2024</LineText>
                    <LineText>UX Designer</LineText>
                    <LineText>Frontend Engineer</LineText>

                    <div style={{ marginTop: '32px' }}>
                        <CaseStudyButton>READ CASE STUDY</CaseStudyButton>
                    </div>
                </DescriptionWrapper>
            </MidSection>
        </MainWrapper>
    )
} 