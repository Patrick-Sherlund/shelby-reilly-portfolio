import React, {useRef} from 'react'
import {
    CtrlYBadge,
    CtrlYLogoImage,
    DatesText,
    DemoSection,
    DemoVideo,
    DemoWrapper,
    DescriptionWrapper,
    DescriptiveParagraph,
    IpadImage,
    LearnMoreButton,
    MainWrapper,
    MidSection,
    ProjectBishopLogo,
    RoleText
} from './ProjectBishopPage.styles'
import {useZoomPanInteraction} from '../../hooks/useZoomPanInteraction'
import ipad from '../../assets/images/tablet.png';
import bishopLogoSmall from '../../assets/images/bishop_logo_small.png';
import {useZoomPanContext} from '../../context/ZoomPanContext'
import {Box, useMediaQuery, useTheme} from '@mui/material'

export default function ProjectBishopPage() {

    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const demoRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const demoInteraction = useZoomPanInteraction(demoRef)
    const descInteraction = useZoomPanInteraction(descRef)
    const {activeTool} = useZoomPanContext()

    return (
        <MainWrapper>
            {isDesktop ? (
                <MidSection>
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
                            
                            onClick={() => {
                                window.location.hash = '#/bishop-project'
                            }}
                        />

                        <DescriptiveParagraph>
                            Making search and rescue faster,
                            <br/>
                            safer, and more effective with AI,
                            <br/>
                            drones, and User Centered Design.
                        </DescriptiveParagraph>

                        <RoleText>Chief Product Designer</RoleText>
                        <DatesText>2024 – 2025</DatesText>

                        <LearnMoreButton
                            onClick={() => {
                                window.location.hash = '#/bishop-project'
                            }}
                            data-testid="pb-cta"
                        >
                            View More
                        </LearnMoreButton>
                    </DescriptionWrapper>

                    <DemoSection>
                        <CtrlYBadge data-testid="ctrl-y-badge" $activeTool={activeTool}>
                            <CtrlYLogoImage
                                src={`${process.env.PUBLIC_URL}/images/ctrly-logo.png`}
                                alt="CTRL+Y Logo"
                                draggable={false}
                                
                            onClick={() => {
                                window.location.hash = '#/bishop-project'
                            }}
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
                                <source src={`${process.env.PUBLIC_URL}/videos/bishop_demo.mp4`} type="video/mp4"/>
                            </DemoVideo>
                        </DemoWrapper>
                    </DemoSection>
                </MidSection>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '16px', width: '100%' }}>
                    {/* Logos */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', width: '100%' }}>
                        <CtrlYBadge data-testid="ctrl-y-badge" $activeTool={activeTool}>
                            <CtrlYLogoImage
                                src={`${process.env.PUBLIC_URL}/images/ctrly-logo.png`}
                                alt="CTRL+Y Logo"
                                draggable={false}
                            />
                        </CtrlYBadge>
                        <ProjectBishopLogo
                            src={bishopLogoSmall}
                            alt="Project Bishop"
                            draggable={false}
                            data-testid="pb-logo-small"
                            style={{ height: '60px' }}
                        />
                    </Box>

                    {/* Text content - smaller */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                        <DescriptiveParagraph style={{ fontSize: '16px' }}>
                            Making search and rescue faster, safer, and more effective with AI, drones, and User Centered Design.
                        </DescriptiveParagraph>

                        <RoleText style={{ fontSize: '14px' }}>Chief Product Designer</RoleText>
                        <DatesText style={{ fontSize: '14px' }}>2024 – 2025</DatesText>
                    </Box>

                    {/* Device + video */}
                    <Box sx={{ width: '100%', maxWidth: '400px' }}>
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
                                <source src={`${process.env.PUBLIC_URL}/videos/bishop_demo.mp4`} type="video/mp4"/>
                            </DemoVideo>
                        </DemoWrapper>
                    </Box>

                    {/* Learn more button */}
                    <Box sx={{ marginTop: '24px' }}>
                        <LearnMoreButton
                            onClick={() => {
                                window.location.hash = '#/bishop-project'
                            }}
                            data-testid="pb-cta"
                        >
                            View More
                        </LearnMoreButton>
                    </Box>
                </Box>
            )}
        </MainWrapper>
    )
} 
