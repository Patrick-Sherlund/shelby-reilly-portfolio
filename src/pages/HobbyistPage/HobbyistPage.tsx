import React, {useRef} from 'react'
import {
    DemoPlaceholder,
    DemoVideo,
    DemoWrapper,
    DescriptionWrapper,
    HobbyistLogoImage,
    LineText,
    MacBookImage,
    MainWrapper,
    MidSection,
    SubLineText,
    SubLogoImage,
    ViewMoreButton
} from './HobbyistPage.styles'
import {useZoomPanInteraction} from '../../hooks/useZoomPanInteraction'
import macbook from '../../assets/images/macbook.png'
import hobbyistSublogo from '../../assets/images/hobbyist-sublogo.png'
import hobbyistLogo from '../../assets/images/hobbyist-logo.png'
import hobbyistVideo from '../../assets/videos/hobbyist-video.mp4'
import {useZoomPanContext} from '../../context/ZoomPanContext'
import {Box, useMediaQuery, useTheme} from '@mui/material'

export default function HobbyistPage() {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const demoRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const demoInteraction = useZoomPanInteraction(demoRef)
    const descInteraction = useZoomPanInteraction(descRef)
    const {activeTool} = useZoomPanContext()
    const handleViewMore = () => {
        window.location.hash = '#/hobbyist-project'
    }

    return (
        <MainWrapper>
            {isDesktop ? (
                <>
                    <SubLogoImage
                        src={hobbyistSublogo}
                        alt="Hobbyist"
                        $activeTool={activeTool}
                    />

                    <MidSection>
                        <DescriptionWrapper
                            ref={descRef}
                            onMouseDown={descInteraction.handleMouseDown}
                            onMouseMove={descInteraction.handleMouseMove}
                            onMouseUp={descInteraction.handleMouseUp}
                            onMouseLeave={descInteraction.handleMouseLeave}
                        >
                            <HobbyistLogoImage
                                src={hobbyistLogo}
                                alt="Hobbyist"
                                draggable={false}
                            />
                            <LineText>A fun app to find your next hobby!</LineText>
                            <SubLineText>Product Designer</SubLineText>
                            <SubLineText>2025</SubLineText>
                            <ViewMoreButton onClick={handleViewMore}>
                                View More
                            </ViewMoreButton>
                            
                        </DescriptionWrapper>

                        <DemoWrapper
                            ref={demoRef}
                            onMouseDown={demoInteraction.handleMouseDown}
                            onMouseMove={demoInteraction.handleMouseMove}
                            onMouseUp={demoInteraction.handleMouseUp}
                            onMouseLeave={demoInteraction.handleMouseLeave}
                        >
                            <DemoPlaceholder>
                                <MacBookImage
                                    src={macbook}
                                    alt="MacBook Pro"
                                />
                                <DemoVideo
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    disablePictureInPicture
                                    controlsList="nodownload nofullscreen noremoteplayback"
                                >
                                    <source src={hobbyistVideo} type="video/mp4"/>
                                </DemoVideo>
                            </DemoPlaceholder>
                        </DemoWrapper>
                    </MidSection>
                </>
            ) : (
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '16px', width: '100%'}}>
                    {/* Logos */}
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'}}>
                        <SubLogoImage
                            src={hobbyistSublogo}
                            alt="Hobbyist"
                            $activeTool={activeTool}
                            style={{margin: 0, height: 'clamp(52.5px, 8.75vw, 80px)', alignSelf: 'center'}}
                        />
                        <HobbyistLogoImage
                            src={hobbyistLogo}
                            alt="Hobbyist"
                            draggable={false}
                        />
                    </Box>

                    {/* Text content */}
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center'}}>
                        <LineText style={{fontSize: '16px'}}>
                            A fun app to find your next hobby!
                        </LineText>
                        <SubLineText style={{fontSize: '14px'}}>Product Designer</SubLineText>
                        <SubLineText style={{fontSize: '14px'}}>2025</SubLineText>
                    </Box>

                    {/* Device + video */}
                    <Box sx={{width: '100%'}}>
                        <DemoWrapper
                            ref={demoRef}
                            onMouseDown={demoInteraction.handleMouseDown}
                            onMouseMove={demoInteraction.handleMouseMove}
                            onMouseUp={demoInteraction.handleMouseUp}
                            onMouseLeave={demoInteraction.handleMouseLeave}
                        >
                            <DemoPlaceholder>
                                <MacBookImage
                                    src={macbook}
                                    alt="MacBook Pro"
                                />
                                <DemoVideo
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    disablePictureInPicture
                                    controlsList="nodownload nofullscreen noremoteplayback"
                                >
                                    <source src={hobbyistVideo} type="video/mp4"/>
                                </DemoVideo>
                            </DemoPlaceholder>
                        </DemoWrapper>
                    </Box>

                    {/* View more button */}
                    <Box sx={{marginTop: '24px'}}>
                        <ViewMoreButton onClick={handleViewMore}>
                            View More
                        </ViewMoreButton>
                    </Box>
                </Box>
            )}
        </MainWrapper>
    )
}
