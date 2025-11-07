// BishopProjectPage.tsx
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav"
import { GlobalStyles, Typography } from '@mui/material'
import {
    ProjectPageContainer,
    BoardContent,
    ContentWrapper,
    BackButton,
    HeroSection,
    HeroLogo,
    HeroBannerWrapper,
    HeroBannerRight,
    HeroBanner,
    HeroContent,
    HeroDevices,
    SectionDivider,
    ChallengeSection,
    ChallengeTitle,
    ChallengeSubtitle,
    ChallengeGrid,
    ChallengeCard,
    ChallengeCardTitle,
    ChallengeCardContent,
    HurricaneImage,
    VisionSection,
    VisionTitle,
    VisionText,
    BoldText,
    VisionIconsContainer,
    VisionIcon,
    ResearchSection,
    ResearchTitle,
    ResearchGrid,
    ResearchCard,
    ResearchCardTitle,
    ResearchCardContent,
    DesignSection,
    DesignTitle,
    DesignSubtitle,
    DesignSubtitleText,
    DesignCarouselWrapper,
    DesignCarouselContainer,
    DesignCarouselRow,
    DesignSlide,
    DesignImage,
    DataDesignSection,
    DataDesignTitle,
    DataDesignSubtitle,
    DataDesignContent,
    DataDesignImageWrapper,
    DataDesignImage,
    DesignDecisionsSection,
    DesignDecisionsTitle,
    DesignDecisionsSubtitle,
    DesignDecisionsContent,
    DesignDecisionsImageWrapper,
    DesignDecisionsImage,
    DesignDecisionsList,
    DesignDecisionItem,
    DesignDecisionItemTitle,
    DesignDecisionItemDescription,
    SolutionSection,
    SolutionTitle,
    SolutionVideoWrapper,
    SolutionTabletImage,
    SolutionVideo,
    ImpactSection,
    ImpactTitle,
    ImpactStatement,
    ImpactHighlight,
    LearningsSection,
    LearningsTitle,
    LearningsGrid,
    LearningCard,
    LearningCardTitle,
    LearningEmoji,
    LearningCardContent,
    ThankYouSection,
    ThankYouTitle,
    ThankYouCard,
    ThankYouCardTitle,
    ThankYouCardText,
    ThankYouImage,
    LinksSection,
    LinksTitle,
    LinksContainer,
    LinkButton,
} from './BishopProjectPage.styles'

import bishopLogo from '../../assets/images/bishop-logo.png'
import bishopHeroBanner from '../../assets/images/bishop-hero-banner.png'
import bishopDevices from '../../assets/images/bishop_devices.png'
import bishopHurricaneImage from '../../assets/images/bishop_hurricane_image.png'
import droneIcon from '../../assets/images/drone-white.svg'
import sparkleIcon from '../../assets/images/sparkle-white.svg'
import handshakeIcon from '../../assets/images/handshake-white.svg'
import droneIconColor from '../../assets/images/drone-color.svg'
import sparkleIconColor from '../../assets/images/sparkle-color.svg'
import handshakeIconColor from '../../assets/images/handshake-color.svg'
import designIteration1 from '../../assets/images/design_iteration_1.png'
import designIteration2 from '../../assets/images/design_iteration_2.png'
import designIteration3 from '../../assets/images/design_iteration_3.png'
import designIteration4 from '../../assets/images/design_iteration_4.png'
import designIteration5 from '../../assets/images/design_iteration_5.png'
import designIteration6 from '../../assets/images/design_iteration_6.png'
import designIteration7 from '../../assets/images/design_iteration_7.png'
import designIteration8 from '../../assets/images/design_iteration_8.png'
import dataDesign1 from '../../assets/images/data_design_1.png'
import dataDesign2 from '../../assets/images/data_design_2.png'
import designDecisions1 from '../../assets/images/design_decisions_1.png'
import tabletImage from '../../assets/images/tablet.png'
import thankYou1 from '../../assets/images/thank_you_1.png'

export default function BishopProjectPage() {
    const handleBackClick = () => { window.location.hash = '' }

    const [droneHover, setDroneHover] = useState(false)
    const [sparkleHover, setSparkleHover] = useState(false)
    const [handshakeHover, setHandshakeHover] = useState(false)

    // Design carousel hover state
    const [isPausedTop, setIsPausedTop] = useState(false)
    const [isPausedBottom, setIsPausedBottom] = useState(false)

    // Design images - 4 on top row, 4 on bottom row
    const topRowImages = [
        designIteration1,
        designIteration2,
        designIteration3,
        designIteration4,
    ]

    const bottomRowImages = [
        designIteration5,
        designIteration6,
        designIteration7,
        designIteration8,
    ]

    return (
        <ProjectPageContainer>
            {/* Root scroll stays on body/viewport; no nested scroll containers */}
            <GlobalStyles styles={{
                'html, body, #root': {
                    height: 'auto',
                    minHeight: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }
            }} />

            <BoardContent>
                <ContentWrapper>
                    {/* HERO */}
                    <HeroSection>
                        <HeroBannerWrapper>
                            <HeroBanner src={bishopHeroBanner} alt="hero banner" />
                            <HeroBannerRight />
                        </HeroBannerWrapper>

                        <HeroContent>
                            <HeroLogo src={bishopLogo} alt="Bishop logo" />

                            <Box sx={{ marginTop: '3rem' }}>
                                <Typography sx={{fontSize: '1.25rem', textAlign: "center" }}>
                                    AI-powered drone search & rescue platform
                                </Typography>

                                <Typography sx={{fontSize: '1.25rem', textAlign: "center" }}>
                                    designed for speed, safety, and hope.
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: { xs: 3, sm: 6, md: 12 },
                                marginTop: 12,
                                marginBottom: 4,
                                marginX: "auto",
                                padding: "32px",
                                borderRadius: 4,
                                width: "max-content",
                                backgroundColor: "#0E1224",
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <Typography fontWeight={'200'}>Role</Typography>
                                    <Typography fontWeight={'600'}>UX Designer</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <Typography fontWeight={'200'}>Team</Typography>
                                    <Typography fontWeight={'600'}>1 Eng, 1 Design</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <Typography fontWeight={'200'}>Timeline</Typography>
                                    <Typography fontWeight={'600'}>6 months</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <Typography fontWeight={'200'}>Tools/Skills</Typography>
                                    <Typography fontWeight={'600'}>AI, ML, UX, Video</Typography>
                                </Box>
                            </Box>

                            <SectionDivider />
                        </HeroContent>

                        <Box sx={{ marginY: 6, width: '80%', display: 'flex', justifyContent: 'center' }}>
                            <HeroDevices src={bishopDevices} alt="Bishop devices" />
                        </Box>
                    </HeroSection>

                    <SectionDivider />

                    {/* THE CHALLENGE */}
                    <ChallengeSection>
                        <ChallengeTitle>The Challenge</ChallengeTitle>
                        <ChallengeSubtitle>
                            locating people efficiently during<br />
                            search and rescue missions
                        </ChallengeSubtitle>

                        <ChallengeGrid>
                            <ChallengeCard>
                                <ChallengeCardTitle>Current Process</ChallengeCardTitle>
                                <ChallengeCardContent>
                                    Manual: limited processing capability to 1 person viewing drone footage
                                </ChallengeCardContent>
                            </ChallengeCard>

                            <ChallengeCard>
                                <ChallengeCardTitle>Natural Disasters</ChallengeCardTitle>
                                <ChallengeCardContent>
                                    Created in response to 2024 Southeast Coastal Hurricane tragedies
                                </ChallengeCardContent>
                            </ChallengeCard>

                            <ChallengeCard>
                                <ChallengeCardTitle>Urgency</ChallengeCardTitle>
                                <ChallengeCardContent>
                                    National Association for Search and Rescue reports the chance of finding someone alive plummets after 72 hrs
                                </ChallengeCardContent>
                            </ChallengeCard>
                        </ChallengeGrid>
                    </ChallengeSection>

                    <SectionDivider />

                    {/* THE VISION */}
                    <VisionSection>
                        <VisionTitle>The Vision</VisionTitle>

                        <VisionText>
                            <BoldText>AI-powered</BoldText> drone search & rescue platform<br />
                            designed for <BoldText>speed, safety, and hope.</BoldText>
                        </VisionText>

                        <VisionIconsContainer>
                            <VisionIcon
                                src={droneHover ? droneIconColor : droneIcon}
                                alt="Drone"
                                draggable={false}
                                onMouseEnter={() => setDroneHover(true)}
                                onMouseLeave={() => setDroneHover(false)}
                            />
                            <VisionIcon
                                src={sparkleHover ? sparkleIconColor : sparkleIcon}
                                alt="AI Sparkle"
                                draggable={false}
                                onMouseEnter={() => setSparkleHover(true)}
                                onMouseLeave={() => setSparkleHover(false)}
                            />
                            <VisionIcon
                                src={handshakeHover ? handshakeIconColor : handshakeIcon}
                                alt="Collaboration"
                                draggable={false}
                                onMouseEnter={() => setHandshakeHover(true)}
                                onMouseLeave={() => setHandshakeHover(false)}
                            />
                        </VisionIconsContainer>
                    </VisionSection>

                    <SectionDivider />

                    {/* RESEARCH */}
                    <ResearchSection>
                        <ResearchTitle>Research</ResearchTitle>

                        <ResearchGrid>
                            <ResearchCard>
                                <ResearchCardTitle>Market Research</ResearchCardTitle>
                                <ResearchCardContent>
                                    Analyzed current SAR software to discover gaps and new opportunities
                                </ResearchCardContent>
                            </ResearchCard>

                            <ResearchCard>
                                <ResearchCardTitle>User Identification</ResearchCardTitle>
                                <ResearchCardContent>
                                    Identified SAR teams / drone operators as primary users
                                </ResearchCardContent>
                            </ResearchCard>

                            <ResearchCard>
                                <ResearchCardTitle>User Research</ResearchCardTitle>
                                <ResearchCardContent>
                                    Understanding current user flows and pain points
                                </ResearchCardContent>
                            </ResearchCard>
                        </ResearchGrid>
                    </ResearchSection>

                    <SectionDivider />

                    {/* DESIGN */}
                    <DesignSection>
                        <DesignTitle>Design</DesignTitle>

                        <DesignSubtitle>
                            Many Iterations
                            <DesignSubtitleText>Aligning on</DesignSubtitleText>
                        </DesignSubtitle>

                        <DesignCarouselWrapper>
                            <DesignCarouselContainer>
                                {/* Top row - scrolls left */}
                                <DesignCarouselRow style={{ animationPlayState: isPausedTop ? 'paused' : 'running' }}>
                                    {/* Duplicate images for infinite scroll effect */}
                                    {[...topRowImages, ...topRowImages].map((img, idx) => (
                                        <DesignSlide
                                            key={`top-${idx}`}
                                            onMouseEnter={() => setIsPausedTop(true)}
                                            onMouseLeave={() => setIsPausedTop(false)}
                                        >
                                            <DesignImage
                                                src={img}
                                                alt={`Design iteration ${(idx % 4) + 1}`}
                                                draggable={false}
                                            />
                                        </DesignSlide>
                                    ))}
                                </DesignCarouselRow>

                                {/* Bottom row - scrolls right, offset */}
                                <DesignCarouselRow style={{ animationPlayState: isPausedBottom ? 'paused' : 'running' }}>
                                    {/* Duplicate images for infinite scroll effect */}
                                    {[...bottomRowImages, ...bottomRowImages].map((img, idx) => (
                                        <DesignSlide
                                            key={`bottom-${idx}`}
                                            onMouseEnter={() => setIsPausedBottom(true)}
                                            onMouseLeave={() => setIsPausedBottom(false)}
                                        >
                                            <DesignImage
                                                src={img}
                                                alt={`Design iteration ${(idx % 4) + 5}`}
                                                draggable={false}
                                            />
                                        </DesignSlide>
                                    ))}
                                </DesignCarouselRow>
                            </DesignCarouselContainer>
                        </DesignCarouselWrapper>
                    </DesignSection>

                    {/* DATA → DESIGN */}
                    <DataDesignSection>
                        <DataDesignTitle>Data → Design</DataDesignTitle>
                        <DataDesignSubtitle>
                            Clarifying data and actions needed in the interface for the best user experience. Designing the interface based on that.
                        </DataDesignSubtitle>

                        <DataDesignContent>
                            <DataDesignImageWrapper>
                                <DataDesignImage
                                    src={dataDesign1}
                                    alt="Data requirements and actions needed"
                                    draggable={false}
                                />
                            </DataDesignImageWrapper>

                            <DataDesignImageWrapper>
                                <DataDesignImage
                                    src={dataDesign2}
                                    alt="Interface design based on data requirements"
                                    draggable={false}
                                />
                            </DataDesignImageWrapper>
                        </DataDesignContent>
                    </DataDesignSection>

                    {/* DESIGN DECISIONS */}
                    <DesignDecisionsSection>
                        <DesignDecisionsTitle>Design Decisions</DesignDecisionsTitle>
                        <DesignDecisionsSubtitle>
                            Decisions and values that led my UI/UX design
                        </DesignDecisionsSubtitle>

                        <DesignDecisionsContent>
                            <DesignDecisionsImageWrapper>
                                <DesignDecisionsImage
                                    src={designDecisions1}
                                    alt="Bishop interface design"
                                    draggable={false}
                                />
                            </DesignDecisionsImageWrapper>

                            <DesignDecisionsList>
                                <DesignDecisionItem>
                                    <DesignDecisionItemTitle>Performance &gt;&gt;&gt;</DesignDecisionItemTitle>
                                    <DesignDecisionItemDescription>
                                        TONS of data - needs to be quick
                                    </DesignDecisionItemDescription>
                                </DesignDecisionItem>

                                <DesignDecisionItem>
                                    <DesignDecisionItemTitle>Visual</DesignDecisionItemTitle>
                                    <DesignDecisionItemDescription>
                                        Data needs to be shown visually (video/map)
                                    </DesignDecisionItemDescription>
                                </DesignDecisionItem>

                                <DesignDecisionItem>
                                    <DesignDecisionItemTitle>Clear Indicators</DesignDecisionItemTitle>
                                    <DesignDecisionItemDescription>
                                        Quick to understand and act on
                                    </DesignDecisionItemDescription>
                                </DesignDecisionItem>

                                <DesignDecisionItem>
                                    <DesignDecisionItemTitle>User Centered</DesignDecisionItemTitle>
                                    <DesignDecisionItemDescription>
                                        Rapid prototyping → field testing → updates
                                    </DesignDecisionItemDescription>
                                </DesignDecisionItem>

                                <DesignDecisionItem>
                                    <DesignDecisionItemTitle>Customizable</DesignDecisionItemTitle>
                                    <DesignDecisionItemDescription>
                                        Users can view and adjust confidence level
                                    </DesignDecisionItemDescription>
                                </DesignDecisionItem>
                            </DesignDecisionsList>
                        </DesignDecisionsContent>
                    </DesignDecisionsSection>

                    <SectionDivider />

                    {/* SOLUTION */}
                    <SolutionSection>
                        <SolutionTitle>Solution</SolutionTitle>

                        <SolutionVideoWrapper>
                            <SolutionTabletImage
                                src={tabletImage}
                                alt="Tablet frame"
                            />
                            <SolutionVideo
                                autoPlay
                                loop
                                muted
                                playsInline
                                disablePictureInPicture
                                controlsList="nodownload nofullscreen noremoteplayback"
                            >
                                <source src={`${process.env.PUBLIC_URL}/videos/bishop_demo.mp4`} type="video/mp4" />
                            </SolutionVideo>
                        </SolutionVideoWrapper>
                    </SolutionSection>

                    <SectionDivider />

                    {/* IMPACT */}
                    <ImpactSection>
                        <ImpactTitle>Impact</ImpactTitle>

                        <ImpactStatement>
                            SAR operators can now utilize Bishop to detect humans up to <ImpactHighlight>3,700× faster</ImpactHighlight> than manual scanning
                        </ImpactStatement>
                    </ImpactSection>

                    <SectionDivider />

                    {/* LEARNINGS */}
                    <LearningsSection>
                        <LearningsTitle>Learnings</LearningsTitle>

                        <LearningsGrid>
                            <LearningCard>
                                <LearningCardTitle>
                                    <LearningEmoji>‍🛟</LearningEmoji>
                                    Operators are Irreplaceable
                                </LearningCardTitle>
                                <LearningCardContent>
                                    No software can replace the Search and Rescue Operators
                                </LearningCardContent>
                            </LearningCard>

                            <LearningCard>
                                <LearningCardTitle>
                                    <LearningEmoji>⏳</LearningEmoji>
                                    Time is Crucial
                                </LearningCardTitle>
                                <LearningCardContent>
                                    Data needs to be quickly delivered and easy to understand
                                </LearningCardContent>
                            </LearningCard>

                            <LearningCard>
                                <LearningCardTitle>
                                    <LearningEmoji>🌍</LearningEmoji>
                                    Environments affect the algorithm
                                </LearningCardTitle>
                                <LearningCardContent>
                                    Varying environments need to be accounted for during model training
                                </LearningCardContent>
                            </LearningCard>

                            <LearningCard>
                                <LearningCardTitle>
                                    <LearningEmoji>🤖</LearningEmoji>
                                    Designing AI tools: Ever-evolving
                                </LearningCardTitle>
                                <LearningCardContent>
                                    Because AI evolved so quickly, designs were always rapidly evolving
                                </LearningCardContent>
                            </LearningCard>
                        </LearningsGrid>
                    </LearningsSection>

                    <SectionDivider />

                    {/* THANK YOU */}
                    <ThankYouSection>
                        <ThankYouTitle>Thank you!</ThankYouTitle>

                        <ThankYouCard>
                            <ThankYouCardTitle>Big thanks to our stakeholder and my cofounders!</ThankYouCardTitle>
                            <ThankYouCardText>
                                This project wouldnt have been possible without the continued codesign with our stakeholders and users. Thank you to Kyle Norfords! Thank you to Patrick Sherlund, my cofounder, for going through the agile dev/research/design cycle a million times with me and always being down to work through anything!
                            </ThankYouCardText>
                        </ThankYouCard>

                        <ThankYouImage
                            src={thankYou1}
                            alt="Design, research, and development collaboration"
                            draggable={false}
                        />
                    </ThankYouSection>

                    <SectionDivider />

                    {/* LINKS */}
                    <LinksSection>
                        <LinksTitle>Links</LinksTitle>

                        <LinksContainer>
                            <LinkButton
                                href="http://ctrly.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CTRL+Y Website
                            </LinkButton>

                            <LinkButton
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                Bishop x Austin Design Jam Event
                            </LinkButton>
                        </LinksContainer>
                    </LinksSection>

                </ContentWrapper>
            </BoardContent>

            <BackButton onClick={handleBackClick}>← Back to Portfolio</BackButton>
            <FloatingTopNav />
        </ProjectPageContainer>
    )
}
