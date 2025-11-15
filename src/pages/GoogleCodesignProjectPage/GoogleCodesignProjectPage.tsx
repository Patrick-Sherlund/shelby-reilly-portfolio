// GoogleCodesignProjectPage.tsx
import React from 'react'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav"
import { GlobalStyles } from '@mui/material'
import {
    ProjectPageContainer,
    BoardContent,
    ContentWrapper,
    BackButton,
    HeroSection,
    HeroLogo,
    HeroBannerWrapper,
    HeroBanner,
    HeroContent,
    HeroDescription,
    HeroSubtext,
    InfoSection,
    InfoSparkleLeft,
    InfoSparkleRight,
    InfoItem,
    InfoLabel,
    InfoValue,
    SectionDivider,
    PreviewImageSection,
    PreviewImage,
    ProcessSection,
    ProcessTitle,
    ProcessContent,
    ProcessRow,
    ProcessLabel,
    ProcessDescription,
    ProcessIllustration,
    ResearchSectionContainer,
    ResearchHeader,
    ResearchTitleWrapper,
    ResearchSquiggle,
    ResearchTitleText,
    ResearchMainContent,
    ResearchParagraph,
    CompetitiveAnalysisBox,
    CompetitiveAnalysisContent,
    CompetitiveAnalysisTitle,
    CompetitiveAnalysisSubtitle,
    CompetitiveAnalysisList,
    CompetitiveImageWrapper,
    CompetitiveImage,
    AffinityMappingBox,
    AffinityMappingContent,
    AffinityMappingTitle,
    AffinityMappingImageWrapper,
    AffinityMappingImage,
    OverallFindingsBox,
    OverallFindingsContent,
    OverallFindingsTitle,
    OverallFindingsText,
    FindingsImageWrapper,
    FindingsImage,
    IdeationSectionContainer,
    IdeationHeader,
    IdeationTitleWrapper,
    IdeationSquiggle,
    IdeationTitleText,
    IdeationContent,
    IdeationParagraph,
    IdeationLink,
    GoogleLetter,
    VideoContainer,
    IdeationVideo,
    IdeationSubtitle,
    SprintOutcomeSection,
    SprintOutcomeTitle,
    SprintOutcomeText,
    SprintOutcomeHighlight,
    SprintOutcomeFlows,
    SprintOutcomeExample,
    SprintOutcomeImageWrapper,
    SprintOutcomeImage,
    DesignSectionContainer,
    DesignHeader,
    DesignTitleWrapper,
    DesignSquiggle,
    DesignTitleText,
    DesignMainContent,
    DesignParagraph,
    DesignSubsectionBox,
    DesignSubsectionContent,
    DesignSubsectionTitle,
    DesignSubsectionLabel,
    DesignSubsectionText,
    DesignSubsectionRow,
    DesignSubsectionImageWrapper,
    DesignSubsectionImage,
    DesignSubsectionList,
    PrototypeBannerSection,
    PrototypeBannerContainer,
    PrototypeBannerBg,
    PrototypeOverlay,
} from './GoogleCodesignProjectPage.styles'

import codesignLogo from '../../assets/images/codesign-logo.png'
import codesignHeroBanner from '../../assets/images/codesign-hero-banner.png'
import codesignSparkleLeft from '../../assets/images/codesign-sparkle-left.png'
import codesignSparkleRight from '../../assets/images/codesign-sparkle-right.png'
import codesignPreview from '../../assets/images/codesign-preview.png'
import cutieIllustration from '../../assets/images/cutie-illustration.png'
import squiggleBlip from '../../assets/images/squigle-blip.svg'
import competitiveIndustries from '../../assets/images/codesign-competitive-industries.png'
import codesignWorkflows from '../../assets/images/codesign-workflows.png'
import codesignFindings from '../../assets/images/codesign-findings.png'
import personaBackground from '../../assets/images/codesign-persona-background.png'
import persona1 from '../../assets/images/codesign-persona-1.png'
import persona2 from '../../assets/images/codesign-persona-2.png'
import persona3 from '../../assets/images/codesign-persona-3.png'
import purpleSquiggle from '../../assets/images/codesign-purple-squigley.png'
import wireframeSketch from '../../assets/images/codesign-wireframe-sketch.png'
import greenSquiggle from '../../assets/images/green_squigle.svg'
import designWireframes from '../../assets/images/codesign-design-wireframes.png'
import designMockups from '../../assets/images/codesign-design-mockups.png'
import designPrototypes from '../../assets/images/codesign-design-prototypes.png'
import prototypeBg from '../../assets/images/codesign-prototype/codesign-prototype-bg.png'
import prototype1 from '../../assets/images/codesign-prototype/codesign-prototype-1.png'
import prototype2 from '../../assets/images/codesign-prototype/codesign-prototype-2.png'
import prototype3 from '../../assets/images/codesign-prototype/codesign-prototype-3.png'
import prototype4 from '../../assets/images/codesign-prototype/codesign-prototype-4.png'
import prototype5 from '../../assets/images/codesign-prototype/codesign-prototype-5.png'
import prototype6 from '../../assets/images/codesign-prototype/codesign-prototype-6.png'
import prototype7 from '../../assets/images/codesign-prototype/codesign-prototype-7.png'
import prototype8 from '../../assets/images/codesign-prototype/codesign-prototype-8.png'
import prototype9 from '../../assets/images/codesign-prototype/codesign-prototype-9.png'
import prototype10 from '../../assets/images/codesign-prototype/codesign-prototype-10.png'
import prototype11 from '../../assets/images/codesign-prototype/codesign-prototype-11.png'
import prototype12 from '../../assets/images/codesign-prototype/codesign-prototype-12.png'
import prototype13 from '../../assets/images/codesign-prototype/codesign-prototype-13.png'
import prototype14 from '../../assets/images/codesign-prototype/codesign-prototype-14.png'
import PersonaCarousel from '../../components/PersonaCarousel/PersonaCarousel'
import { useRef, useEffect, useState } from 'react'

export default function GoogleCodesignProjectPage() {
    const handleBackClick = () => { window.location.hash = '' }
    const prototypeBannerRef = useRef<HTMLDivElement>(null)
    const [isPrototypeBannerVisible, setIsPrototypeBannerVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isPrototypeBannerVisible) {
                        setIsPrototypeBannerVisible(true)
                    }
                })
            },
            { threshold: 0.4 } // Trigger when 20% of the section is visible
        )

        if (prototypeBannerRef.current) {
            observer.observe(prototypeBannerRef.current)
        }

        return () => {
            if (prototypeBannerRef.current) {
                observer.unobserve(prototypeBannerRef.current)
            }
        }
    }, [isPrototypeBannerVisible])

    return (
        <ProjectPageContainer>
            {/* Root scroll stays on body/viewport; no nested scroll containers */}
            <GlobalStyles styles={`
                @font-face {
                    font-family: 'Google Sans';
                    src: url('/fonts/GoogleSans-Regular.ttf') format('truetype');
                    font-weight: 400;
                    font-style: normal;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Google Sans';
                    src: url('/fonts/GoogleSans-Italic.ttf') format('truetype');
                    font-weight: 400;
                    font-style: italic;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Google Sans';
                    src: url('/fonts/GoogleSans-Medium.ttf') format('truetype');
                    font-weight: 500;
                    font-style: normal;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Google Sans';
                    src: url('/fonts/GoogleSans-MediumItalic.ttf') format('truetype');
                    font-weight: 500;
                    font-style: italic;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Google Sans';
                    src: url('/fonts/GoogleSans-Bold.ttf') format('truetype');
                    font-weight: 700;
                    font-style: normal;
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Google Sans';
                    src: url('/fonts/GoogleSans-BoldItalic.ttf') format('truetype');
                    font-weight: 700;
                    font-style: italic;
                    font-display: swap;
                }

                html, body, #root {
                    height: auto;
                    min-height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                }

                * {
                    font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
                }
            `} />

            <BoardContent>
                <ContentWrapper>
                    {/* HERO */}
                    <HeroSection>
                        <HeroBannerWrapper>
                            <HeroBanner src={codesignHeroBanner} alt="Codesign hero banner" />
                        </HeroBannerWrapper>

                        <HeroContent>
                            <HeroLogo src={codesignLogo} alt="Codesign logo" />

                            <HeroDescription>
                                Codesign is <strong>Web Component-based Prototyping Tool.</strong><br />
                                Similar to Figma but components can be <strong>design or code.</strong>
                            </HeroDescription>

                            <HeroSubtext>
                                Codesign has 3 different marketplaces but users are barely using<br />
                                them. With user numbers increasing and 2 new asset types coming<br />
                                to Codesign Marketplaces, it's time to improve usability.
                            </HeroSubtext>

                            <InfoSection>
                                <InfoSparkleLeft src={codesignSparkleLeft} alt="" />
                                <InfoSparkleRight src={codesignSparkleRight} alt="" />

                                <InfoItem>
                                    <InfoLabel>Role</InfoLabel>
                                    <InfoValue>End-to-end<br />Product Designer</InfoValue>
                                </InfoItem>

                                <InfoItem>
                                    <InfoLabel>Team</InfoLabel>
                                    <InfoValue>7 Eng, 1 PM<br />2 Designers</InfoValue>
                                </InfoItem>

                                <InfoItem>
                                    <InfoLabel>Timeline</InfoLabel>
                                    <InfoValue>6 Months</InfoValue>
                                </InfoItem>

                                <InfoItem>
                                    <InfoLabel>Tools/Skills</InfoLabel>
                                    <InfoValue>UX/UI, User Research<br />Google Design Sprint</InfoValue>
                                </InfoItem>
                            </InfoSection>
                        </HeroContent>
                    </HeroSection>

                    <SectionDivider />

                    {/* PREVIEW IMAGE */}
                    <PreviewImageSection>
                        <PreviewImage src={codesignPreview} alt="Codesign preview" />
                    </PreviewImageSection>

                    <SectionDivider />

                    {/* PROCESS */}
                    <ProcessSection>
                        <ProcessTitle>PROCESS</ProcessTitle>

                        <ProcessContent>
                            <ProcessRow>
                                <ProcessLabel>Research</ProcessLabel>
                                <ProcessDescription>Competitive Analysis, Current State Audit, User Interviews</ProcessDescription>
                            </ProcessRow>

                            <ProcessRow>
                                <ProcessLabel>Ideation</ProcessLabel>
                                <ProcessDescription>User Research, 3-Day Google Design Sprint</ProcessDescription>
                            </ProcessRow>

                            <ProcessRow>
                                <ProcessLabel>Design</ProcessLabel>
                                <ProcessDescription>Wireframes, Mockups, Prototypes</ProcessDescription>
                            </ProcessRow>

                            <ProcessRow>
                                <ProcessLabel>Evaluation</ProcessLabel>
                                <ProcessDescription>Task-based User Testing, Updating Designs</ProcessDescription>
                            </ProcessRow>
                        </ProcessContent>

                        <ProcessIllustration src={cutieIllustration} alt="Process illustration" />
                    </ProcessSection>

                    <SectionDivider />

                    {/* RESEARCH */}
                    <ResearchSectionContainer>
                        <ResearchHeader>
                            <ResearchTitleWrapper>
                                <ResearchSquiggle src={squiggleBlip} alt="" />
                                <ResearchTitleText>RESEARCH</ResearchTitleText>
                            </ResearchTitleWrapper>

                            <ResearchMainContent>
                                <ResearchParagraph>
                                    The focus in this phase is getting to know the app, users, and problem space.
                                </ResearchParagraph>
                                <ResearchParagraph>
                                    Through competitive analysis and current state analysis, we started to pick up on 3 core focus areas.
                                </ResearchParagraph>
                                <ResearchParagraph>
                                    With these focus areas in mind, we interviewed 8 Google Users (UXE,IxD,UXR) and 6 Designers outside of Google. The goal here was to go in depth about how users <strong>navigated marketplaces</strong> in their current design tools and identify <strong>pain points and gain points.</strong>
                                </ResearchParagraph>
                            </ResearchMainContent>
                        </ResearchHeader>

                        <CompetitiveAnalysisBox>
                            <CompetitiveAnalysisContent>
                                <CompetitiveAnalysisTitle>Competitive Analysis</CompetitiveAnalysisTitle>
                                <CompetitiveAnalysisSubtitle>Focus Areas</CompetitiveAnalysisSubtitle>
                                <CompetitiveAnalysisList>
                                    <div>Finding assets</div>
                                    <div>Publishing Assets</div>
                                    <div>Updating Assets</div>
                                </CompetitiveAnalysisList>
                            </CompetitiveAnalysisContent>
                            <CompetitiveImageWrapper>
                                <CompetitiveImage
                                    src={competitiveIndustries}
                                    alt="Competitive Industries Analysis"
                                />
                            </CompetitiveImageWrapper>
                        </CompetitiveAnalysisBox>

                        <AffinityMappingBox>
                            <AffinityMappingContent>
                                <AffinityMappingTitle>Affinity Mapping Categories</AffinityMappingTitle>
                                <CompetitiveAnalysisList>
                                    <div>Users are looking for</div>
                                    <div style={{ fontWeight: 600 }}>Clarity, Discoverability, Predictability</div>
                                </CompetitiveAnalysisList>
                            </AffinityMappingContent>
                            <AffinityMappingImageWrapper>
                                <AffinityMappingImage
                                    src={codesignWorkflows}
                                    alt="Codesign Workflows"
                                />
                            </AffinityMappingImageWrapper>
                        </AffinityMappingBox>

                        <OverallFindingsBox>
                            <OverallFindingsContent>
                                <OverallFindingsTitle>Overall Findings</OverallFindingsTitle>
                                <OverallFindingsText>
                                    With these findings we were able to create personas and move into the next phase.
                                </OverallFindingsText>
                            </OverallFindingsContent>
                            <FindingsImageWrapper>
                                <FindingsImage
                                    src={codesignFindings}
                                    alt="Overall Research Findings"
                                />
                            </FindingsImageWrapper>
                        </OverallFindingsBox>
                    </ResearchSectionContainer>

                    <PersonaCarousel
                        personas={[persona1, persona2, persona3]}
                        backgroundImage={personaBackground}
                    />

                    {/* IDEATION */}
                    <IdeationSectionContainer>
                        <IdeationHeader>
                            <IdeationTitleWrapper>
                                <IdeationSquiggle src={purpleSquiggle} alt="" />
                                <IdeationTitleText>IDEATION</IdeationTitleText>
                            </IdeationTitleWrapper>

                            <IdeationContent>
                                <IdeationParagraph>
                                    Now that we knew who our users were and what they needed, we could get to ideating!
                                </IdeationParagraph>

                                <IdeationParagraph>
                                    We quickly planned and executed a 3 day long <IdeationLink href="https://www.figma.com/design/6O5pdrMjNgZyf9HUjVLHCs/Design-Sprint--Google-Codesign-Marketplace?t=9UwSIsBxKm6xV4hn-0" target="_blank" rel="noopener noreferrer">
                                        <GoogleLetter $color="#4285F4">G</GoogleLetter>
                                        <GoogleLetter $color="#EA4335">o</GoogleLetter>
                                        <GoogleLetter $color="#FBBC04">o</GoogleLetter>
                                        <GoogleLetter $color="#4285F4">g</GoogleLetter>
                                        <GoogleLetter $color="#34A853">l</GoogleLetter>
                                        <GoogleLetter $color="#EA4335">e</GoogleLetter>
                                        {' '}Design Sprint
                                    </IdeationLink> with the team, users, and stakeholders.
                                </IdeationParagraph>

                                <IdeationParagraph>
                                    The goal of the sprint was to walk away with wireframes that would lead creation of a better experience for marketplace for publishing, version control, as well as search.
                                </IdeationParagraph>
                            </IdeationContent>
                        </IdeationHeader>

                        <VideoContainer>
                            <IdeationVideo
                                src={`${process.env.PUBLIC_URL}/videos/codesign_demo.mp4`}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </VideoContainer>

                        <IdeationSubtitle>
                            We had a good time and learned a lot. Here's a little glimpse. <IdeationLink href="#">More here.</IdeationLink>
                        </IdeationSubtitle>

                        <SprintOutcomeSection>
                            <SprintOutcomeTitle>Sprint Outcome</SprintOutcomeTitle>

                            <SprintOutcomeText>
                                We diverged to ideate then came back together and left the sprint on the same page with a path forward which created{' '}
                                <SprintOutcomeHighlight>4 newly defined flows: Starting a project, Marketplace search, Component Publishing, and Component Updates.</SprintOutcomeHighlight>
                            </SprintOutcomeText>

                            <SprintOutcomeExample>
                                Example 👀 📸
                            </SprintOutcomeExample>

                            <SprintOutcomeImageWrapper>
                                <SprintOutcomeImage
                                    src={wireframeSketch}
                                    alt="Sprint outcome wireframe sketches"
                                />
                            </SprintOutcomeImageWrapper>
                        </SprintOutcomeSection>
                    </IdeationSectionContainer>
                    <SectionDivider />

                    {/* DESIGN */}
                    <DesignSectionContainer>
                        <DesignHeader>
                            <DesignTitleWrapper>
                                <DesignSquiggle src={greenSquiggle} alt="" />
                                <DesignTitleText>DESIGN</DesignTitleText>
                            </DesignTitleWrapper>

                            <DesignMainContent>
                                <DesignParagraph>
                                    After identifying the flows where we could have the most user impact we moved forward to wireframes, mockups, and prototyping.
                                </DesignParagraph>
                                <DesignParagraph>
                                    During this phase we had weekly design reviews with the <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC04' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span> Codesign team including Eng, Prod, Design.
                                </DesignParagraph>
                                <DesignParagraph>
                                    It was a whirlwind of rapid prototyping. We were moving so quickly that one of our Google team members told us "I can't believe how much you guys are getting done" 💪
                                </DesignParagraph>
                            </DesignMainContent>
                        </DesignHeader>

                        {/* Wireframes */}
                        <DesignSubsectionBox>
                            <DesignSubsectionImageWrapper>
                                <DesignSubsectionImage src={designWireframes} alt="Wireframes" />
                            </DesignSubsectionImageWrapper>
                            <DesignSubsectionContent>
                                <DesignSubsectionTitle>Wireframes</DesignSubsectionTitle>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Goal</DesignSubsectionLabel>
                                    <DesignSubsectionText>Working on higher level concepts</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Focus</DesignSubsectionLabel>
                                    <DesignSubsectionText>Flow 2: Codesign Marketplace Search</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <div>
                                    <DesignSubsectionLabel>📸 Example</DesignSubsectionLabel>
                                    <DesignSubsectionList>
                                        <div>Overlay of marketplace search</div>
                                        <div>Attribute based filtering</div>
                                        <div>Verified/Accessibility chips</div>
                                    </DesignSubsectionList>
                                </div>
                            </DesignSubsectionContent>
                        </DesignSubsectionBox>

                        {/* Mockups */}
                        <DesignSubsectionBox>
                            <DesignSubsectionContent>
                                <DesignSubsectionTitle>Mockups</DesignSubsectionTitle>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Goal</DesignSubsectionLabel>
                                    <DesignSubsectionText>Consistency, Integration, Details</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Focus</DesignSubsectionLabel>
                                    <DesignSubsectionText>Flow 1,2,3,4 (Starting a project, Marketplace search, Component Publishing, and Component Updates)</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <div>
                                    <DesignSubsectionLabel>Example 📸</DesignSubsectionLabel>
                                    <DesignSubsectionList>
                                        <div>Publish Flow</div>
                                        <div>Interactive Component</div>
                                        <div>Accessibility</div>
                                        <div>Side Panel Drawer</div>
                                    </DesignSubsectionList>
                                </div>
                            </DesignSubsectionContent>
                            <DesignSubsectionImageWrapper>
                                <DesignSubsectionImage src={designMockups} alt="Mockups" />
                            </DesignSubsectionImageWrapper>
                        </DesignSubsectionBox>

                        {/* Prototypes */}
                        <DesignSubsectionBox>
                            <DesignSubsectionImageWrapper>
                                <DesignSubsectionImage src={designPrototypes} alt="Prototypes" />
                            </DesignSubsectionImageWrapper>
                            <DesignSubsectionContent>
                                <DesignSubsectionTitle>Prototypes</DesignSubsectionTitle>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Goal</DesignSubsectionLabel>
                                    <DesignSubsectionText>Testing Predictability, Consistency, Ease of Use</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Focus</DesignSubsectionLabel>
                                    <DesignSubsectionText>Flow 1,2,3,4 (Starting a project, Marketplace search, Component Publishing, and Component Updates)</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <div>
                                    <DesignSubsectionLabel>📸 Example</DesignSubsectionLabel>
                                    <DesignSubsectionList>
                                        <div>Marketplace Search Flow</div>
                                        <div>Most Used</div>
                                        <div>Trending</div>
                                        <div>Recently used</div>
                                        <div>Recommended</div>
                                    </DesignSubsectionList>
                                </div>
                            </DesignSubsectionContent>
                        </DesignSubsectionBox>
                    </DesignSectionContainer>

                    <PrototypeBannerSection ref={prototypeBannerRef}>
                        <PrototypeBannerContainer>
                            <PrototypeBannerBg src={prototypeBg} alt="Prototype Background" />

                            <PrototypeOverlay
                                src={prototype1}
                                alt="Prototype 1"
                                $top="4%"
                                $left="10.5%"
                                $width="30%"
                                $zIndex={2}
                                $delay={0.05}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype2}
                                alt="Prototype 2"
                                $top="37%"
                                $left="4%"
                                $width="28%"
                                $zIndex={3}
                                $delay={0.1}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype3}
                                alt="Prototype 3"
                                $top="69%"
                                $left="4%"
                                $width="32%"
                                $zIndex={4}
                                $delay={0.15}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype4}
                                alt="Prototype 4"
                                $top="25%"
                                $left="25%"
                                $width="25%"
                                $zIndex={5}
                                $delay={0.2}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype5}
                                alt="Prototype 5"
                                $top="47%"
                                $left="33%"
                                $width="38%"
                                $zIndex={1}
                                $delay={0.25}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype6}
                                alt="Prototype 6"
                                $top="75%"
                                $left="45%"
                                $width="12%"
                                $zIndex={7}
                                $delay={0.3}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype7}
                                alt="Prototype 7"
                                $top="3%"
                                $left="46%"
                                $width="14%"
                                $zIndex={8}
                                $delay={0.35}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype8}
                                alt="Prototype 8"
                                $top="3%"
                                $left="61.5%"
                                $width="20%"
                                $zIndex={9}
                                $delay={0.4}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype9}
                                alt="Prototype 9"
                                $top="32%"
                                $left="58%"
                                $width="30%"
                                $zIndex={10}
                                $delay={0.45}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype10}
                                alt="Prototype 10"
                                $top="77%"
                                $left="63%"
                                $width="18%"
                                $zIndex={11}
                                $delay={0.5}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype11}
                                alt="Prototype 11"
                                $top="26%"
                                $left="82.5%"
                                $width="10%"
                                $zIndex={12}
                                $delay={0.55}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype12}
                                alt="Prototype 12"
                                $top="8%"
                                $left="78.5%"
                                $width="16%"
                                $zIndex={13}
                                $delay={0.6}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype13}
                                alt="Prototype 13"
                                $top="60%"
                                $left="86.5%"
                                $width="10%"
                                $zIndex={14}
                                $delay={0.65}
                                $isVisible={isPrototypeBannerVisible}
                            />

                            <PrototypeOverlay
                                src={prototype14}
                                alt="Prototype 14"
                                $top="73%"
                                $left="82.5%"
                                $width="12%"
                                $zIndex={15}
                                $delay={0.7}
                                $isVisible={isPrototypeBannerVisible}
                            />
                        </PrototypeBannerContainer>
                    </PrototypeBannerSection>
                </ContentWrapper>
            </BoardContent>


            <BackButton onClick={handleBackClick}>← Back to Portfolio</BackButton>
            <FloatingTopNav />
        </ProjectPageContainer>
    )
}
