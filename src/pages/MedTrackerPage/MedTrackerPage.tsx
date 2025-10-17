import React, { useRef, useEffect } from 'react'
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
import { useSearchContext } from '../../context/SearchContext'

export default function MedTrackerPage() {
    // Refs for interaction areas
    const sectionRef = useRef<HTMLDivElement>(null)
    const imagesRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const imagesInteraction = useZoomPanInteraction(imagesRef)
    const descInteraction = useZoomPanInteraction(descRef)
    const { registerItem, unregisterItem, registerGroupAnchor } = useSearchContext()

    useEffect(() => {
        const items: { id: string; ref: React.RefObject<HTMLElement> }[] = [
            { id: 'med-images', ref: imagesRef },
            { id: 'med-description', ref: descRef }
        ]

        items.forEach((it) => {
            if (it.ref.current) {
                registerItem({ id: it.id, element: it.ref.current })
            }
        })

        if (sectionRef.current) {
            registerGroupAnchor('MedTracker', sectionRef.current, 1)
        }

        return () => {
            items.forEach((it) => unregisterItem(it.id))
        }
    }, [registerItem, unregisterItem, registerGroupAnchor])

    const handleCaseStudyClick = () => {
        window.location.hash = '#/medtracker-project'
    }

    return (
        <MainWrapper ref={sectionRef}>
            <LogoImage
                src={`${process.env.PUBLIC_URL}/images/vmware.png`}
                alt="VMware Logo"
            />
            <MidSection>
                <ImagesWrapper
                    ref={imagesRef}
                    onMouseDown={imagesInteraction.handleMouseDown}
                    onMouseMove={imagesInteraction.handleMouseMove}
                    onMouseUp={imagesInteraction.handleMouseUp}
                    onMouseLeave={imagesInteraction.handleMouseLeave}
                >
                    <Box sx={{ height: 'clamp(240px, 32vw, 360px)', width: '246px' }}>
                        <IphoneOutline initialTab={0} />
                    </Box>
                    <Box sx={{ height: 'clamp(240px, 32vw, 360px)', width: '246px', transform:'translateY(-20%)' }}>
                        <IphoneOutline initialTab={1} />
                    </Box>
                    <Box sx={{ height: 'clamp(240px, 32vw, 360px)', width: 'auto', transform:'translateY(0%)' }}>
                        <IphoneOutline initialTab={2} />
                    </Box>
                </ImagesWrapper>

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
                        <CaseStudyButton onClick={handleCaseStudyClick}>READ CASE STUDY</CaseStudyButton>
                    </div>
                </DescriptionWrapper>
            </MidSection>
        </MainWrapper>
    )
}