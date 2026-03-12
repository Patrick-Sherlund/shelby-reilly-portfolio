import React from 'react'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav"
import {GlobalStyles} from '@mui/material'
import {
    BackButton,
    CtaButton,
    CtaLabel,
    CtaWrap,
    FacesLeft,
    FacesRight,
    HeroBottom,
    HeroSection,
    HeroTop,
    InfoCard,
    InfoCol,
    InfoLabel,
    InfoValue,
    InfoWrap,
    LogoImage,
    MountainImage,
    MountainWrap,
    ProjectPageContainer
} from './HobbyistProjectPage.styles'

import heroBackground from '../../assets/images/hobbyist/hero-background.png'
import leftSideFaces from '../../assets/images/hobbyist/left-side-faces.png'
import rightSideFaces from '../../assets/images/hobbyist/right-side-faces.png'
import mountainPersonSun from '../../assets/images/hobbyist/mountain-person-sun.png'
import logo from '../../assets/images/hobbyist/logo.png'

export default function HobbyistProjectPage() {
    const handleBackClick = () => {
        window.location.hash = ''
    }

    return (
        <ProjectPageContainer>
            <GlobalStyles styles={{
                'html, body, #root': {
                    height: 'auto',
                    minHeight: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    backgroundColor: '#FFFFFF'
                }
            }}/>

            <HeroSection>
                <HeroTop style={{backgroundImage: `url(${heroBackground})`}}>
                    <MountainWrap>
                        <MountainImage src={mountainPersonSun} alt="Person climbing a mountain under a sun"/>
                    </MountainWrap>

                    <LogoImage src={logo} alt="Hobbyist"/>

                    <InfoWrap>
                        <FacesLeft src={leftSideFaces} alt="Hobbyist faces left"/>
                        <InfoCard>
                            <InfoCol>
                                <InfoLabel>Role</InfoLabel>
                                <InfoValue>End-to-end{'\n'}Product Designer</InfoValue>
                            </InfoCol>
                            <InfoCol>
                                <InfoLabel>Team</InfoLabel>
                                <InfoValue>2 Designers</InfoValue>
                            </InfoCol>
                            <InfoCol>
                                <InfoLabel>Timeline</InfoLabel>
                                <InfoValue>6 Months</InfoValue>
                            </InfoCol>
                            <InfoCol>
                                <InfoLabel>Tools/Skills</InfoLabel>
                                <InfoValue>Visual Design, AI{'\n'}Illustration, Vibecode</InfoValue>
                            </InfoCol>
                        </InfoCard>
                        <FacesRight src={rightSideFaces} alt="Hobbyist faces right"/>
                    </InfoWrap>
                </HeroTop>

                <HeroBottom>
                    <CtaWrap>
                        <CtaLabel>Want to try it out?</CtaLabel>
                        <CtaButton href="https://hobbyist.fun/" target="_blank" rel="noreferrer">
                            Go to Hobbyist
                        </CtaButton>
                    </CtaWrap>
                </HeroBottom>
            </HeroSection>

            <BackButton onClick={handleBackClick}>← Back to Portfolio</BackButton>
            <FloatingTopNav/>
        </ProjectPageContainer>
    )
}
