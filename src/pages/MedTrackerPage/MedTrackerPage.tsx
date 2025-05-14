import React, { useRef } from 'react'
import {
    MainWrapper,
    LogoImage,
    MidSection,
    ImagesWrapper,
    DescriptionWrapper,
    IphoneImg
} from './MedTrackerPage.styles'
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction'

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
                    <IphoneImg
                        src={`${process.env.PUBLIC_URL}/images/iphone-battalions.png`}
                        alt="Battalions screen"
                        style={{ transform: 'translateY(0%)' }}
                    />
                    <IphoneImg
                        src={`${process.env.PUBLIC_URL}/images/iphone-bulk-inventory.png`}
                        alt="Bulk inventory screen"
                        style={{ transform: 'translateY(-20%)' }}
                    />
                    <IphoneImg
                        src={`${process.env.PUBLIC_URL}/images/iphone-move-items.png`}
                        alt="Move items screen"
                        style={{ transform: 'translateY(0%)' }}
                    />
                </ImagesWrapper>

                {/* Right – description copy */}
                <DescriptionWrapper
                    ref={descRef}
                    onMouseDown={descInteraction.handleMouseDown}
                    onMouseMove={descInteraction.handleMouseMove}
                    onMouseUp={descInteraction.handleMouseUp}
                    onMouseLeave={descInteraction.handleMouseLeave}
                >
                    <h2>MedTracker</h2>
                    <p>
                        MedTracker is a concept mobile application I designed to help field
                        medics and logistics teams quickly record, track, and move
                        medical inventory during disaster relief operations.
                    </p>
                    <ul>
                        <li>Real-time battalion-level inventory dashboards</li>
                        <li>Bulk inventory adjustments with barcode scanning</li>
                        <li>Intuitive drag-and-drop UI for moving items between units</li>
                    </ul>
                </DescriptionWrapper>
            </MidSection>
        </MainWrapper>
    )
} 