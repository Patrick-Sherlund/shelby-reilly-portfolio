import React, {useRef} from 'react'
import {
    CaseStudyButton,
    DemoPlaceholder,
    DemoVideo,
    DemoWrapper,
    DescriptionWrapper,
    LineText,
    LogoImage,
    MacBookImage,
    MainWrapper,
    MidSection,
    SubLineText,
    GoogleCodesignLogo
} from './GoogleCodesignPage.styles'
import {useZoomPanInteraction} from '../../hooks/useZoomPanInteraction'
import macbook from "../../assets/images/macbook.png"
import {useZoomPanContext} from '../../context/ZoomPanContext'
import codesignLogo from '../../assets/images/codesign-logo.png'
import {Box, useMediaQuery, useTheme} from '@mui/material'

export default function GoogleCodesignPage() {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const demoRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const demoInteraction = useZoomPanInteraction(demoRef)
    const descInteraction = useZoomPanInteraction(descRef)
    const {activeTool} = useZoomPanContext()

    const handleCaseStudyClick = () => {
        window.location.hash = '#/googlecodesign-project'
    }

    return (
        <MainWrapper>
            {isDesktop ? (
                <>
                    <LogoImage
                        src={`${process.env.PUBLIC_URL}/images/google-logo.png`}
                        alt="Google Logo"
                        $activeTool={activeTool}
                    />

                    <MidSection>
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
                                    <source src={`${process.env.PUBLIC_URL}/videos/codesign_demo.mp4`} type="video/mp4"/>
                                </DemoVideo>
                            </DemoPlaceholder>
                        </DemoWrapper>
                        <DescriptionWrapper
                            ref={descRef}
                            onMouseDown={descInteraction.handleMouseDown}
                            onMouseMove={descInteraction.handleMouseMove}
                            onMouseUp={descInteraction.handleMouseUp}
                            onMouseLeave={descInteraction.handleMouseLeave}
                        >
                             <GoogleCodesignLogo
                                src={codesignLogo}
                                alt="Google Codesign"
                                draggable={false}
                                data-testid="pb-logo-small"
                            />
                            <LineText>Web Component-based Prototyping Tool bridging the gap between design and
                                engineering</LineText>
                            <SubLineText>UX Designer</SubLineText>
                            <SubLineText>2021</SubLineText>

                            <div style={{marginTop: '32px'}}>
                                <CaseStudyButton onClick={handleCaseStudyClick}>
                                    READ CASE STUDY
                                </CaseStudyButton>
                            </div>
                        </DescriptionWrapper>
                    </MidSection>
                </>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '16px', width: '100%' }}>
                    {/* Logos */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <LogoImage
                            src={`${process.env.PUBLIC_URL}/images/google-logo.png`}
                            alt="Google Logo"
                            $activeTool={activeTool}
                            style={{ margin: 0, height: 'clamp(52.5px, 8.75vw, 105px)' }}
                        />
                        <GoogleCodesignLogo
                            src={codesignLogo}
                            alt="Google Codesign"
                            draggable={false}
                            data-testid="pb-logo-small"
                        />
                    </Box>

                    {/* Text content - smaller */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                        <LineText style={{ fontSize: '16px' }}>
                            Web Component-based Prototyping Tool bridging the gap between design and engineering
                        </LineText>

                        <SubLineText style={{ fontSize: '14px' }}>UX Designer</SubLineText>
                        <SubLineText style={{ fontSize: '14px' }}>2021</SubLineText>
                    </Box>

                    {/* Device + video */}
                    <Box sx={{ width: '100%' }}>
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
                                    <source src={`${process.env.PUBLIC_URL}/videos/codesign_demo.mp4`} type="video/mp4"/>
                                </DemoVideo>
                            </DemoPlaceholder>
                        </DemoWrapper>
                    </Box>

                    {/* Case study button */}
                    <Box sx={{ marginTop: '24px' }}>
                        <CaseStudyButton onClick={handleCaseStudyClick}>
                            READ CASE STUDY
                        </CaseStudyButton>
                    </Box>
                </Box>
            )}
        </MainWrapper>
    )
} 