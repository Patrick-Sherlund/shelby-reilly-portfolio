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

export default function GoogleCodesignPage() {
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
        </MainWrapper>
    )
} 