import React, { useRef } from 'react'
import {
    MainWrapper,
    LogoImage,
    MidSection,
    ImagesWrapper,
    DescriptionWrapper,
    Title,
    LineText,
    CaseStudyButton,
    CornerSketch
} from './MedTrackerPage.styles'
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction'
import IphoneOutline from '../../components/IphoneOutline/IphoneOutline'
import { Box } from '@mui/material'

export default function MedTrackerPage() {
    // Refs for interaction areas
    const imagesRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const imagesInteraction = useZoomPanInteraction(imagesRef)
    const descInteraction = useZoomPanInteraction(descRef)

    return (
        <MainWrapper>
            {/* Top-left logo */}
            <LogoImage
                src={`${process.env.PUBLIC_URL}/images/vmware.png`}
                alt="VMware Logo"
            />

            {/* Middle section */}
            <MidSection>
                {/* Left – iPhone mock-ups */}
                <ImagesWrapper
                    ref={imagesRef}
                    onMouseDown={imagesInteraction.handleMouseDown}
                    onMouseMove={imagesInteraction.handleMouseMove}
                    onMouseUp={imagesInteraction.handleMouseUp}
                    onMouseLeave={imagesInteraction.handleMouseLeave}
                >
                    {/* Battalions demo */}
                    <Box sx={{ height: 'clamp(240px, 32vw, 360px)', width: '246px' }}>
                        <IphoneOutline initialTab={0} />
                    </Box>
                    {/* Bulk inventory demo */}
                    <Box sx={{ height: 'clamp(240px, 32vw, 360px)', width: '246px', transform:'translateY(-20%)' }}>
                        <IphoneOutline initialTab={1} />
                    </Box>
                    {/* Move items demo */}
                    <Box sx={{ height: 'clamp(240px, 32vw, 360px)', width: 'auto', transform:'translateY(0%)' }}>
                        <IphoneOutline initialTab={2} />
                    </Box>
                </ImagesWrapper>

                {/* Right – Description */}
                <DescriptionWrapper
                    ref={descRef}
                    onMouseDown={descInteraction.handleMouseDown}
                    onMouseMove={descInteraction.handleMouseMove}
                    onMouseUp={descInteraction.handleMouseUp}
                    onMouseLeave={descInteraction.handleMouseLeave}
                >
                    <Title>MedTracker</Title>
                    <LineText>2024</LineText>
                    <LineText>UX Designer</LineText>
                    <LineText>Hardware Engineer</LineText>

                    <div style={{ marginTop: '32px' }}>
                        <CaseStudyButton>READ CASE STUDY</CaseStudyButton>
                    </div>
                </DescriptionWrapper>
            </MidSection>
        </MainWrapper>
    )
}