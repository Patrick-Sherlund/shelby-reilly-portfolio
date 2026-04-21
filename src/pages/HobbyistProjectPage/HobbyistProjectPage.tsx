import React, {useEffect, useRef, useState} from 'react'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav"
import {GlobalStyles} from '@mui/material'
import {
    BackButton,
    BrainstormColumn,
    BrainstormGrid,
    BrainstormInner,
    BrainstormLabel,
    BrainstormLargeCard,
    BrainstormSection,
    BrainstormSmallCard,
    BrainstormTitle,
    StickyBoard,
    StickyNoteImage,
    StickyNoteWrap,
    CtaButton,
    CtaLabel,
    CtaWrap,
    FacesLeft,
    FacesRight,
    GreenFace,
    HeroBottom,
    HeroSection,
    HeroTop,
    HeroTopFade,
    InfoCard,
    InfoCol,
    InfoLabel,
    InfoValue,
    InfoWrap,
    LeftGreenFace,
    LeftPinkFace,
    LogoImage,
    MountainImage,
    MountainScene,
    MountainSun,
    MountainWrap,
    PinkFace,
    PurpleFace,
    ProjectPageContainer,
    RightYellowFace,
    UnderConstructionEmoji,
    UnderConstructionArc,
    UnderConstructionInner,
    UnderConstructionSection,
    UnderConstructionText,
    UnderConstructionVisual,
    YellowFace
} from './HobbyistProjectPage.styles'

import heroBackground from '../../assets/images/hobbyist/hero-background.png'
import greenFace from '../../assets/images/hobbyist/green_face.png'
import mountainPersonSun from '../../assets/images/hobbyist/mountain-person-sun.png'
import logo from '../../assets/images/hobbyist/logo.png'
import pinkFace from '../../assets/images/hobbyist/pink_face.png'
import purpleFace from '../../assets/images/hobbyist/purple_face.png'
import sun from '../../assets/images/hobbyist/sun.png'
import yellowFace from '../../assets/images/hobbyist/yellow_face.png'
import brainstormGroupsSticky1 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_1.png'
import brainstormGroupsSticky2 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_2.png'
import brainstormGroupsSticky3 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_3.png'
import brainstormGroupsSticky4 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_4.png'
import brainstormGroupsSticky5 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_5.png'
import brainstormGroupsSticky6 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_6.png'
import brainstormGroupsSticky7 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_7.png'
import brainstormGroupsSticky8 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_8.png'
import brainstormGroupsSticky9 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_9.png'
import brainstormGroupsSticky10 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_10.png'
import brainstormGroupsSticky11 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_11.png'
import brainstormGroupsSticky12 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_12.png'
import brainstormGroupsSticky13 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_13.png'
import brainstormGroupsSticky14 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_14.png'
import brainstormGroupsSticky15 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_15.png'
import brainstormGroupsSticky16 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_16.png'
import brainstormGroupsSticky17 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_17.png'
import brainstormGroupsSticky18 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_18.png'
import brainstormGroupsSticky19 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_19.png'
import brainstormGroupsSticky20 from '../../assets/images/hobbyist/groups/brainstorm_groups_sticky_20.png'
import brainstormTopSticky1 from '../../assets/images/hobbyist/top_5/brainstorm_top_sticky_1.png'
import brainstormTopSticky2 from '../../assets/images/hobbyist/top_5/brainstorm_top_sticky_2.png'
import brainstormTopSticky3 from '../../assets/images/hobbyist/top_5/brainstorm_top_sticky_3.png'
import brainstormTopSticky4 from '../../assets/images/hobbyist/top_5/brainstorm_top_sticky_4.png'
import brainstormTopSticky5 from '../../assets/images/hobbyist/top_5/brainstorm_top_sticky_5.png'
import brainstormTopSticky6 from '../../assets/images/hobbyist/top_5/brainstorm_top_sticky_6.png'
import brainstormTopSticky7 from '../../assets/images/hobbyist/top_5/brainstorm_top_sticky_7.png'
import shelbyGarden from '../../assets/images/hobbyist/shelby-garden.png'

const stickyNotes = [
    {src: brainstormGroupsSticky1, top: '3.5%', left: '5.2%', width: '22.4%', rotation: -0.6, zIndex: 10},
    {src: brainstormGroupsSticky2, top: '1.6%', left: '31.9%', width: '22.8%', rotation: 0.5, zIndex: 11},
    {src: brainstormGroupsSticky3, top: '5.8%', left: '73.8%', width: '22.3%', rotation: -0.4, zIndex: 10},
    {src: brainstormGroupsSticky4, top: '13.6%', left: '24.3%', width: '22.9%', rotation: 0.2, zIndex: 9},
    {src: brainstormGroupsSticky5, top: '20.5%', left: '54.6%', width: '22.8%', rotation: 0.2, zIndex: 8},
    {src: brainstormGroupsSticky6, top: '29.8%', left: '-1.0%', width: '22.8%', rotation: -0.3, zIndex: 8},
    {src: brainstormGroupsSticky7, top: '33.5%', left: '12.8%', width: '22.4%', rotation: 0.3, zIndex: 8},
    {src: brainstormGroupsSticky8, top: '32.4%', left: '33.1%', width: '22.3%', rotation: -0.3, zIndex: 8},
    {src: brainstormGroupsSticky9, top: '30.8%', left: '86.0%', width: '22.9%', rotation: 0.4, zIndex: 7},
    {src: brainstormGroupsSticky10, top: '48.0%', left: '-1.1%', width: '22.8%', rotation: -0.3, zIndex: 7},
    {src: brainstormGroupsSticky11, top: '52.2%', left: '22.1%', width: '23.3%', rotation: -0.5, zIndex: 9},
    {src: brainstormGroupsSticky12, top: '53.5%', left: '45.1%', width: '22.4%', rotation: 0.2, zIndex: 8},
    {src: brainstormGroupsSticky13, top: '45.9%', left: '61.8%', width: '22.8%', rotation: 0.1, zIndex: 7},
    {src: brainstormGroupsSticky14, top: '54.0%', left: '76.8%', width: '22.8%', rotation: -0.3, zIndex: 7},
    {src: brainstormGroupsSticky15, top: '74.8%', left: '10.0%', width: '22.4%', rotation: -0.1, zIndex: 6},
    {src: brainstormGroupsSticky16, top: '71.2%', left: '23.8%', width: '22.9%', rotation: 0.4, zIndex: 7},
    {src: brainstormGroupsSticky17, top: '74.4%', left: '42.0%', width: '22.8%', rotation: -0.2, zIndex: 6},
    {src: brainstormGroupsSticky18, top: '75.0%', left: '64.2%', width: '22.8%', rotation: 0.2, zIndex: 6},
    {src: brainstormGroupsSticky19, top: '72.2%', left: '85.8%', width: '22.8%', rotation: -0.3, zIndex: 7},
    {src: brainstormGroupsSticky20, top: '77.7%', left: '19.6%', width: '22.0%', rotation: -0.1, zIndex: 7}
]

const topFiveStickyNotes = [
    {src: brainstormTopSticky1, top: '7.0%', left: '7.5%', width: '39.0%', rotation: -0.2, zIndex: 8},
    {src: brainstormTopSticky2, top: '11.2%', left: '30.6%', width: '40.3%', rotation: 0.3, zIndex: 7},
    {src: brainstormTopSticky3, top: '5.4%', left: '64.6%', width: '41.8%', rotation: -0.3, zIndex: 8},
    {src: brainstormTopSticky4, top: '33.8%', left: '19.6%', width: '38.0%', rotation: 0.2, zIndex: 7},
    {src: brainstormTopSticky5, top: '32.0%', left: '58.2%', width: '39.1%', rotation: -0.1, zIndex: 7},
    {src: brainstormTopSticky6, top: '58.1%', left: '18.3%', width: '40.5%', rotation: -0.2, zIndex: 6},
    {src: brainstormTopSticky7, top: '68.0%', left: '62.2%', width: '40.5%', rotation: 0.2, zIndex: 6}
]

export default function HobbyistProjectPage() {
    const boardRef = useRef<HTMLDivElement | null>(null)
    const topFiveBoardRef = useRef<HTMLDivElement | null>(null)
    const [boardVisible, setBoardVisible] = useState(false)
    const [topFiveVisible, setTopFiveVisible] = useState(false)

    useEffect(() => {
        if (!boardRef.current) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setBoardVisible(true)
                    observer.disconnect()
                }
            },
            {threshold: 0.14}
        )

        observer.observe(boardRef.current)
        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!topFiveBoardRef.current) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTopFiveVisible(true)
                    observer.disconnect()
                }
            },
            {threshold: 0.14}
        )

        observer.observe(topFiveBoardRef.current)
        return () => {
            observer.disconnect()
        }
    }, [])

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
                        <MountainScene>
                            <MountainImage src={mountainPersonSun} alt="Person climbing a mountain under a sun"/>
                            <MountainSun src={sun} alt=""/>
                        </MountainScene>
                    </MountainWrap>

                    <LogoImage src={logo} alt="Hobbyist"/>

                    <InfoWrap>
                        <FacesLeft aria-hidden="true">
                            <PurpleFace src={purpleFace} alt=""/>
                            <LeftPinkFace src={pinkFace} alt=""/>
                            <LeftGreenFace src={greenFace} alt=""/>
                        </FacesLeft>
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
                        <FacesRight aria-hidden="true">
                            <PurpleFace src={purpleFace} alt=""/>
                            <PinkFace src={pinkFace} alt=""/>
                            <RightYellowFace src={yellowFace} alt=""/>
                        </FacesRight>
                    </InfoWrap>
                    <HeroTopFade/>
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

            <BrainstormSection>
                <BrainstormInner>
                    <BrainstormTitle>Brainstorm</BrainstormTitle>
                    <BrainstormGrid>
                        <BrainstormColumn>
                            <BrainstormLabel>Different groups of people that we can relate to (and problems they face)</BrainstormLabel>
                            <BrainstormLargeCard>
                                <StickyBoard ref={boardRef}>
                                    {stickyNotes.map((note, index) => (
                                        <StickyNoteWrap
                                            key={`${note.src}-${index}`}
                                            top={note.top}
                                            left={note.left}
                                            widthValue={note.width}
                                            zIndexValue={note.zIndex}
                                        >
                                            <StickyNoteImage
                                                src={note.src}
                                                alt=""
                                                revealed={boardVisible}
                                                delayMs={index * 55}
                                                rotation={note.rotation}
                                            />
                                        </StickyNoteWrap>
                                    ))}
                                </StickyBoard>
                            </BrainstormLargeCard>
                        </BrainstormColumn>
                        <BrainstormColumn>
                            <BrainstormLabel>Top 5 ideas</BrainstormLabel>
                            <BrainstormSmallCard>
                                <StickyBoard ref={topFiveBoardRef}>
                                    {topFiveStickyNotes.map((note, index) => (
                                        <StickyNoteWrap
                                            key={`${note.src}-${index}`}
                                            top={note.top}
                                            left={note.left}
                                            widthValue={note.width}
                                            zIndexValue={note.zIndex}
                                        >
                                            <StickyNoteImage
                                                src={note.src}
                                                alt=""
                                                revealed={topFiveVisible}
                                                delayMs={index * 55}
                                                rotation={note.rotation}
                                            />
                                        </StickyNoteWrap>
                                    ))}
                                </StickyBoard>
                            </BrainstormSmallCard>
                        </BrainstormColumn>
                    </BrainstormGrid>
                </BrainstormInner>
            </BrainstormSection>

            <UnderConstructionSection>
                <UnderConstructionInner>
                    <UnderConstructionVisual>
                        <UnderConstructionArc viewBox="0 0 760 210" aria-hidden="true">
                            <path id="under-construction-arc" d="M 90 170 Q 380 20 670 170" fill="none"/>
                            <UnderConstructionText>
                                <textPath href="#under-construction-arc" startOffset="50%" textAnchor="middle">
                                    Under construction!!
                                </textPath>
                            </UnderConstructionText>
                        </UnderConstructionArc>
                        <UnderConstructionEmoji src={shelbyGarden} alt="Shelby gardening"/>
                    </UnderConstructionVisual>
                </UnderConstructionInner>
            </UnderConstructionSection>

            <BackButton onClick={handleBackClick}>← Back to Portfolio</BackButton>
            <FloatingTopNav/>
        </ProjectPageContainer>
    )
}
