import React, { useRef } from 'react'
import {
    MainWrapper,
    DemoSection,
    CtrlYBadge,
    CtrlYLogoImage,
    MidSection,
    DemoWrapper,
    IpadImage,
    DemoVideo,
    DescriptionWrapper,
    ProjectBishopLogo,
    DescriptiveParagraph,
    RoleText,
    DatesText,
    LearnMoreButton
} from './ProjectBishopPage.styles'
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction'
import ipad from '../../assets/images/tablet.png';
import bishopLogoSmall from '../../assets/images/bishop_logo_small.png';

export default function ProjectBishopPage() {
    // Refs for interaction areas
    const demoRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const demoInteraction = useZoomPanInteraction(demoRef)
    const descInteraction = useZoomPanInteraction(descRef)

    return (
        <MainWrapper>
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
                    <ProjectBishopLogo
                        src={bishopLogoSmall}
                        alt="Project Bishop"
                        draggable={false}
                        data-testid="pb-logo-small"
                    />

                    <DescriptiveParagraph>
                        Making search and rescue faster,
                        <br />
                        safer, and more effective with AI,
                        <br />
                        drones, and User Centered Design.
                    </DescriptiveParagraph>

                    <RoleText>Chief Product Designer</RoleText>
                    <DatesText>2024 – 2025</DatesText>

                    <LearnMoreButton
                        onClick={() => { window.location.hash = '#/bishop-project' }}
                        data-testid="pb-cta"
                    >
                        Learn More
                    </LearnMoreButton>
                </DescriptionWrapper>

                {/* Right – CTRL+Y logo and Web app demo video */}
                <DemoSection>
                    <CtrlYBadge data-testid="ctrl-y-badge">
                        <CtrlYLogoImage
                            src={`${process.env.PUBLIC_URL}/images/ctrly-logo.png`}
                            alt="CTRL+Y Logo"
                            draggable={false}
                        />
                    </CtrlYBadge>

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
                </DemoSection>
            </MidSection>
        </MainWrapper>
    )
} 