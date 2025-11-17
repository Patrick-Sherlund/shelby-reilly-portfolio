import React, {useEffect, useRef, useState} from 'react'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav"
import {GlobalStyles} from '@mui/material'
import {
    AffinityMappingBox,
    AffinityMappingContent,
    AffinityMappingImage,
    AffinityMappingImageWrapper,
    AffinityMappingTitle,
    BackButton,
    BoardContent,
    CompetitiveAnalysisBox,
    CompetitiveAnalysisContent,
    CompetitiveAnalysisList,
    CompetitiveAnalysisSubtitle,
    CompetitiveAnalysisTitle,
    CompetitiveImage,
    CompetitiveImageWrapper,
    ConclusionBanner,
    ConclusionBannerWrapper,
    ConclusionButton,
    ConclusionButtonsContainer,
    ConclusionContent,
    ConclusionHeader,
    ConclusionList,
    ConclusionListItem,
    ConclusionParagraph,
    ConclusionSectionContainer,
    ConclusionSquiggle,
    ConclusionSubsection,
    ConclusionSubtitle,
    ConclusionTitleText,
    ConclusionTitleWrapper,
    ContentWrapper,
    DesignHeader,
    DesignMainContent,
    DesignParagraph,
    DesignSectionContainer,
    DesignSquiggle,
    DesignSubsectionBox,
    DesignSubsectionContent,
    DesignSubsectionImage,
    DesignSubsectionImageWrapper,
    DesignSubsectionLabel,
    DesignSubsectionList,
    DesignSubsectionRow,
    DesignSubsectionText,
    DesignSubsectionTitle,
    DesignTitleText,
    DesignTitleWrapper,
    EvaluationContent,
    EvaluationExampleSection,
    EvaluationHeader,
    EvaluationImage,
    EvaluationParagraph,
    EvaluationResultsSection,
    EvaluationSectionContainer,
    EvaluationSquiggle,
    EvaluationTitleText,
    EvaluationTitleWrapper,
    ExampleImageBox,
    ExampleImageLabel,
    ExampleImageSubtext,
    ExampleLink,
    ExampleText,
    ExampleTitle,
    FindingsImage,
    FindingsImageWrapper,
    GoogleLetter,
    HeroBanner,
    HeroBannerWrapper,
    HeroContent,
    HeroDescription,
    HeroLogo,
    HeroSection,
    HeroSubtext,
    IdeationContent,
    IdeationHeader,
    IdeationLink,
    IdeationParagraph,
    IdeationSectionContainer,
    IdeationSquiggle,
    IdeationSubtitle,
    IdeationTitleText,
    IdeationTitleWrapper,
    IdeationVideo,
    InfoItem,
    InfoLabel,
    InfoSection,
    InfoSparkleLeft,
    InfoSparkleRight,
    InfoValue,
    OverallFindingsBox,
    OverallFindingsContent,
    OverallFindingsText,
    OverallFindingsTitle,
    PreviewImage,
    PreviewImageSection,
    ProcessContent,
    ProcessDescription,
    ProcessLabel,
    ProcessRow,
    ProcessSection,
    ProcessTitle,
    ProjectPageContainer,
    PrototypeBannerBg,
    PrototypeBannerContainer,
    PrototypeBannerSection,
    PrototypeOverlay,
    ResearchHeader,
    ResearchMainContent,
    ResearchParagraph,
    ResearchSectionContainer,
    ResearchSquiggle,
    ResearchTitleText,
    ResearchTitleWrapper,
    ResultItem,
    ResultItemScore,
    ResultItemTitle,
    ResultsColumn,
    ResultsList,
    ResultsText,
    ResultsTitle,
    SectionDivider,
    SprintOutcomeExample,
    SprintOutcomeHighlight,
    SprintOutcomeImage,
    SprintOutcomeImageWrapper,
    SprintOutcomeSection,
    SprintOutcomeText,
    SprintOutcomeTitle,
    VideoContainer,
} from './GoogleCodesignProjectPage.styles'

import codesignLogo from '../../assets/images/codesign-logo.png'
import codesignHeroBanner from '../../assets/images/codesign-hero-banner.png'
import codesignSparkleLeft from '../../assets/images/codesign-sparkle-left.png'
import codesignSparkleRight from '../../assets/images/codesign-sparkle-right.png'
import codesignPreview from '../../assets/images/codesign-preview.png'
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
import blueSquiggle from '../../assets/images/blue-squiggle.svg'
import evaluationImage1 from '../../assets/images/codesign-evaluation-1.png'
import evaluationImage2 from '../../assets/images/codesign-evaluation-2.png'
import conclusionBanner from '../../assets/images/codesign-conclusion-banner.png'
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
import SVGDraw from '../../components/SVG/SVGDraw'
import {ReactComponent as CutieIllustrationSVG} from '../../assets/images/cutie-illustration.svg'

export default function GoogleCodesignProjectPage() {
    const handleBackClick = () => {
        window.location.hash = ''
    }
    const [visiblePrototypes, setVisiblePrototypes] = useState<Set<number>>(new Set())
    const prototypeRefs = useRef<(HTMLImageElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = prototypeRefs.current.indexOf(entry.target as HTMLImageElement)
                        if (index !== -1) {
                            setVisiblePrototypes((prev) => new Set([...prev, index]))
                        }
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            }
        )

        prototypeRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref)
            }
        })

        return () => {
            prototypeRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref)
                }
            })
        }
    }, [])

    return (
        <ProjectPageContainer>

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
            `}/>

            <BoardContent>
                <ContentWrapper>

                    <HeroSection>
                        <HeroBannerWrapper>
                            <HeroBanner src={codesignHeroBanner} alt="Codesign hero banner"/>
                        </HeroBannerWrapper>

                        <HeroContent>
                            <HeroLogo src={codesignLogo} alt="Codesign logo"/>

                            <HeroDescription>
                                Codesign is <strong>Web Component-based Prototyping Tool.</strong><br/>
                                Similar to Figma but components can be <strong>design or code.</strong>
                            </HeroDescription>

                            <HeroSubtext>
                                Codesign has 3 different marketplaces but users are barely using<br/>
                                them. With user numbers increasing and 2 new asset types coming<br/>
                                to Codesign Marketplaces, it's time to improve usability.
                            </HeroSubtext>

                            <InfoSection>
                                <InfoSparkleLeft src={codesignSparkleLeft} alt=""/>
                                <InfoSparkleRight src={codesignSparkleRight} alt=""/>

                                <InfoItem>
                                    <InfoLabel>Role</InfoLabel>
                                    <InfoValue>End-to-end<br/>Product Designer</InfoValue>
                                </InfoItem>

                                <InfoItem>
                                    <InfoLabel>Team</InfoLabel>
                                    <InfoValue>7 Eng, 1 PM<br/>2 Designers</InfoValue>
                                </InfoItem>

                                <InfoItem>
                                    <InfoLabel>Timeline</InfoLabel>
                                    <InfoValue>6 Months</InfoValue>
                                </InfoItem>

                                <InfoItem>
                                    <InfoLabel>Tools/Skills</InfoLabel>
                                    <InfoValue>UX/UI, User Research<br/>Google Design Sprint</InfoValue>
                                </InfoItem>
                            </InfoSection>
                        </HeroContent>
                    </HeroSection>

                    <SectionDivider/>

                    <PreviewImageSection>
                        <PreviewImage src={codesignPreview} alt="Codesign preview"/>
                    </PreviewImageSection>

                    <SectionDivider/>

                    <ProcessSection>
                        <ProcessTitle>PROCESS</ProcessTitle>

                        <ProcessContent>
                            <ProcessRow>
                                <ProcessLabel>Research</ProcessLabel>
                                <ProcessDescription>Competitive Analysis, Current State Audit, User
                                    Interviews</ProcessDescription>
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

                        <div style={{display: 'block', margin: '0 auto', width: '300px'}}>
                            <SVGDraw
                                width={300}
                                height="auto"
                                duration={2}
                                stagger={0.15}
                                trigger="inView"
                                threshold={0.5}
                                preserveStroke={true}
                                preserveColors={true}
                            >
                                <CutieIllustrationSVG/>
                            </SVGDraw>
                        </div>
                    </ProcessSection>

                    <SectionDivider/>

                    <ResearchSectionContainer>
                        <ResearchHeader>
                            <ResearchTitleWrapper>
                                <ResearchSquiggle src={squiggleBlip} alt=""/>
                                <ResearchTitleText>RESEARCH</ResearchTitleText>
                            </ResearchTitleWrapper>

                            <ResearchMainContent>
                                <ResearchParagraph>
                                    The focus in this phase is getting to know the app, users, and problem space.
                                </ResearchParagraph>
                                <ResearchParagraph>
                                    Through competitive analysis and current state analysis, we started to pick up on 3
                                    core focus areas.
                                </ResearchParagraph>
                                <ResearchParagraph>
                                    With these focus areas in mind, we interviewed 8 Google Users (UXE,IxD,UXR) and 6
                                    Designers outside of Google. The goal here was to go in depth about how
                                    users <strong>navigated marketplaces</strong> in their current design tools and
                                    identify <strong>pain points and gain points.</strong>
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
                                    <div style={{fontWeight: 600}}>Clarity, Discoverability, Predictability</div>
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

                    <IdeationSectionContainer>
                        <IdeationHeader>
                            <IdeationTitleWrapper>
                                <IdeationSquiggle src={purpleSquiggle} alt=""/>
                                <IdeationTitleText>IDEATION</IdeationTitleText>
                            </IdeationTitleWrapper>

                            <IdeationContent>
                                <IdeationParagraph>
                                    Now that we knew who our users were and what they needed, we could get to ideating!
                                </IdeationParagraph>

                                <IdeationParagraph>
                                    We quickly planned and executed a 3 day long <IdeationLink
                                    href="https://www.figma.com/design/6O5pdrMjNgZyf9HUjVLHCs/Design-Sprint--Google-Codesign-Marketplace?t=9UwSIsBxKm6xV4hn-0"
                                    target="_blank" rel="noopener noreferrer">
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
                                    The goal of the sprint was to walk away with wireframes that would lead creation of
                                    a better experience for marketplace for publishing, version control, as well as
                                    search.
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
                            We had a good time and learned a lot. Here's a little glimpse. <IdeationLink href="#">More
                            here.</IdeationLink>
                        </IdeationSubtitle>

                        <SprintOutcomeSection>
                            <SprintOutcomeTitle>Sprint Outcome</SprintOutcomeTitle>

                            <SprintOutcomeText>
                                We diverged to ideate then came back together and left the sprint on the same page with
                                a path forward which created{' '}
                                <SprintOutcomeHighlight>4 newly defined flows: Starting a project, Marketplace search,
                                    Component Publishing, and Component Updates.</SprintOutcomeHighlight>
                            </SprintOutcomeText>

                            <SprintOutcomeExample>
                                Example 👀 ➡️
                            </SprintOutcomeExample>

                            <SprintOutcomeImageWrapper>
                                <SprintOutcomeImage
                                    src={wireframeSketch}
                                    alt="Sprint outcome wireframe sketches"
                                />
                            </SprintOutcomeImageWrapper>
                        </SprintOutcomeSection>
                    </IdeationSectionContainer>
                    <SectionDivider/>

                    <DesignSectionContainer>
                        <DesignHeader>
                            <DesignTitleWrapper>
                                <DesignSquiggle src={greenSquiggle} alt=""/>
                                <DesignTitleText>DESIGN</DesignTitleText>
                            </DesignTitleWrapper>

                            <DesignMainContent>
                                <DesignParagraph>
                                    After identifying the flows where we could have the most user impact we moved
                                    forward to wireframes, mockups, and prototyping.
                                </DesignParagraph>
                                <DesignParagraph>
                                    During this phase we had weekly design reviews with the <span
                                    style={{color: '#4285F4'}}>G</span><span style={{color: '#EA4335'}}>o</span><span
                                    style={{color: '#FBBC04'}}>o</span><span style={{color: '#4285F4'}}>g</span><span
                                    style={{color: '#34A853'}}>l</span><span
                                    style={{color: '#EA4335'}}>e</span> Codesign team including Eng, Prod, Design.
                                </DesignParagraph>
                                <DesignParagraph>
                                    It was a whirlwind of rapid prototyping. We were moving so quickly that one of our
                                    Google team members told us "I can't believe how much you guys are getting done" 💪
                                </DesignParagraph>
                            </DesignMainContent>
                        </DesignHeader>

                        <DesignSubsectionBox>
                            <DesignSubsectionImageWrapper>
                                <DesignSubsectionImage src={designWireframes} alt="Wireframes"/>
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
                                    <DesignSubsectionLabel>⬅️ Example</DesignSubsectionLabel>
                                    <DesignSubsectionList>
                                        <div>Overlay of marketplace search</div>
                                        <div>Attribute based filtering</div>
                                        <div>Verified/Accessibility chips</div>
                                    </DesignSubsectionList>
                                </div>
                            </DesignSubsectionContent>
                        </DesignSubsectionBox>

                        <DesignSubsectionBox>
                            <DesignSubsectionContent>
                                <DesignSubsectionTitle>Mockups</DesignSubsectionTitle>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Goal</DesignSubsectionLabel>
                                    <DesignSubsectionText>Consistency, Integration, Details</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Focus</DesignSubsectionLabel>
                                    <DesignSubsectionText>Flow 1,2,3,4 (Starting a project, Marketplace search,
                                        Component Publishing, and Component Updates)</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <div>
                                    <DesignSubsectionLabel>Example ➡️</DesignSubsectionLabel>
                                    <DesignSubsectionList>
                                        <div>Publish Flow</div>
                                        <div>Interactive Component</div>
                                        <div>Accessibility</div>
                                        <div>Side Panel Drawer</div>
                                    </DesignSubsectionList>
                                </div>
                            </DesignSubsectionContent>
                            <DesignSubsectionImageWrapper>
                                <DesignSubsectionImage src={designMockups} alt="Mockups"/>
                            </DesignSubsectionImageWrapper>
                        </DesignSubsectionBox>


                        <DesignSubsectionBox>
                            <DesignSubsectionImageWrapper>
                                <DesignSubsectionImage src={designPrototypes} alt="Prototypes"/>
                            </DesignSubsectionImageWrapper>
                            <DesignSubsectionContent>
                                <DesignSubsectionTitle>Prototypes</DesignSubsectionTitle>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Goal</DesignSubsectionLabel>
                                    <DesignSubsectionText>Testing Predictability, Consistency, Ease of
                                        Use</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <DesignSubsectionRow>
                                    <DesignSubsectionLabel>Focus</DesignSubsectionLabel>
                                    <DesignSubsectionText>Flow 1,2,3,4 (Starting a project, Marketplace search,
                                        Component Publishing, and Component Updates)</DesignSubsectionText>
                                </DesignSubsectionRow>
                                <div>
                                    <DesignSubsectionLabel>⬅️ Example</DesignSubsectionLabel>
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

                    <PrototypeBannerSection>
                        <PrototypeBannerContainer>
                            <PrototypeBannerBg src={prototypeBg} alt="Prototype Background"/>

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[0] = el)}
                                src={prototype1}
                                alt="Prototype 1"
                                $top="4%"
                                $left="10.5%"
                                $width="30%"
                                $zIndex={2}
                                $delay={0.05}
                                $isVisible={visiblePrototypes.has(0)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[1] = el)}
                                src={prototype2}
                                alt="Prototype 2"
                                $top="37%"
                                $left="4%"
                                $width="28%"
                                $zIndex={3}
                                $delay={0.1}
                                $isVisible={visiblePrototypes.has(1)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[2] = el)}
                                src={prototype3}
                                alt="Prototype 3"
                                $top="69%"
                                $left="4%"
                                $width="32%"
                                $zIndex={4}
                                $delay={0.15}
                                $isVisible={visiblePrototypes.has(2)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[3] = el)}
                                src={prototype4}
                                alt="Prototype 4"
                                $top="25%"
                                $left="25%"
                                $width="25%"
                                $zIndex={5}
                                $delay={0.2}
                                $isVisible={visiblePrototypes.has(3)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[4] = el)}
                                src={prototype5}
                                alt="Prototype 5"
                                $top="47%"
                                $left="33%"
                                $width="38%"
                                $zIndex={1}
                                $delay={0.25}
                                $isVisible={visiblePrototypes.has(4)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[5] = el)}
                                src={prototype6}
                                alt="Prototype 6"
                                $top="75%"
                                $left="45%"
                                $width="12%"
                                $zIndex={7}
                                $delay={0.3}
                                $isVisible={visiblePrototypes.has(5)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[6] = el)}
                                src={prototype7}
                                alt="Prototype 7"
                                $top="3%"
                                $left="46%"
                                $width="14%"
                                $zIndex={8}
                                $delay={0.35}
                                $isVisible={visiblePrototypes.has(6)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[7] = el)}
                                src={prototype8}
                                alt="Prototype 8"
                                $top="3%"
                                $left="61.5%"
                                $width="20%"
                                $zIndex={9}
                                $delay={0.4}
                                $isVisible={visiblePrototypes.has(7)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[8] = el)}
                                src={prototype9}
                                alt="Prototype 9"
                                $top="32%"
                                $left="58%"
                                $width="30%"
                                $zIndex={10}
                                $delay={0.45}
                                $isVisible={visiblePrototypes.has(8)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[9] = el)}
                                src={prototype10}
                                alt="Prototype 10"
                                $top="77%"
                                $left="63%"
                                $width="18%"
                                $zIndex={11}
                                $delay={0.5}
                                $isVisible={visiblePrototypes.has(9)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[10] = el)}
                                src={prototype11}
                                alt="Prototype 11"
                                $top="26%"
                                $left="82.5%"
                                $width="10%"
                                $zIndex={12}
                                $delay={0.55}
                                $isVisible={visiblePrototypes.has(10)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[11] = el)}
                                src={prototype12}
                                alt="Prototype 12"
                                $top="8%"
                                $left="78.5%"
                                $width="16%"
                                $zIndex={13}
                                $delay={0.6}
                                $isVisible={visiblePrototypes.has(11)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[12] = el)}
                                src={prototype13}
                                alt="Prototype 13"
                                $top="60%"
                                $left="86.5%"
                                $width="10%"
                                $zIndex={14}
                                $delay={0.65}
                                $isVisible={visiblePrototypes.has(12)}
                            />

                            <PrototypeOverlay
                                ref={(el) => (prototypeRefs.current[13] = el)}
                                src={prototype14}
                                alt="Prototype 14"
                                $top="73%"
                                $left="82.5%"
                                $width="12%"
                                $zIndex={15}
                                $delay={0.7}
                                $isVisible={visiblePrototypes.has(13)}
                            />
                        </PrototypeBannerContainer>
                    </PrototypeBannerSection>


                    <EvaluationSectionContainer>
                        <EvaluationHeader>
                            <EvaluationTitleWrapper>
                                <EvaluationSquiggle src={blueSquiggle} alt=""/>
                                <EvaluationTitleText>EVALUATION</EvaluationTitleText>
                            </EvaluationTitleWrapper>

                            <EvaluationContent>
                                <EvaluationParagraph>
                                    After identifying the user needs of clarity, discoverability, and predictability in
                                    our initial testing, then building out the 4 flows to account for those needs, it is
                                    now time to test out the prototypes.
                                </EvaluationParagraph>

                                <EvaluationParagraph>
                                    We ran two rounds of testing with 19 users in total.
                                </EvaluationParagraph>

                                <EvaluationParagraph>
                                    For the 4 flows, we laid out the metrics we will use to measure success. ⬇️
                                </EvaluationParagraph>
                            </EvaluationContent>
                        </EvaluationHeader>

                        <EvaluationImage src={evaluationImage1} alt="Codesign Marketplace evaluation flows"/>

                        <EvaluationResultsSection>
                            <ResultsColumn>
                                <ResultsTitle>Findings</ResultsTitle>
                                <ResultsList>
                                    <ResultItem>
                                        <ResultItemTitle>Project Templates</ResultItemTitle>
                                        <ResultItemScore>4.6/5</ResultItemScore>
                                    </ResultItem>
                                    <ResultItem>
                                        <ResultItemTitle>Codesign Marketplace</ResultItemTitle>
                                        <ResultItemScore>4.4/5 & 4.9/5</ResultItemScore>
                                    </ResultItem>
                                    <ResultItem>
                                        <ResultItemTitle>Component Publishing</ResultItemTitle>
                                        <ResultItemScore>5/5</ResultItemScore>
                                    </ResultItem>
                                    <ResultItem>
                                        <ResultItemTitle>Component Updates</ResultItemTitle>
                                        <ResultItemScore>5/5 & 4.5/5</ResultItemScore>
                                    </ResultItem>
                                </ResultsList>
                            </ResultsColumn>

                            <ResultsColumn>
                                <ResultsTitle>Sidenotes</ResultsTitle>
                                <ResultsText>
                                    We decided to focus efforts on flows 1 & 2 for the second round of testing.
                                </ResultsText>
                                <ResultsText style={{marginTop: '16px'}}>
                                    Flows 3&4 only underwent one testing round due to the high usability scores and our
                                    need to prioritize user time.
                                </ResultsText>
                            </ResultsColumn>
                        </EvaluationResultsSection>

                        <EvaluationExampleSection>
                            <ExampleTitle>Example</ExampleTitle>
                            <ExampleText>
                                We we made usability tweaks to all 4 flows.<br/>
                                Below is 1 portion of designs that I took the lead on. For more <ExampleLink
                                target='_blank'
                                href="https://docs.google.com/presentation/d/1lEyUje8HDCOtqq-gOQUrQ3E0DX50e55oNg_7pHaMXGY/edit">go
                                here.</ExampleLink>
                            </ExampleText>

                            <ExampleImageBox>
                                <ExampleImageLabel>Example ⬇️</ExampleImageLabel>
                                <ExampleImageSubtext>Codesign Marketplace</ExampleImageSubtext>
                                <ExampleImageSubtext>Change to allow for multi-select of components from marketplace
                                    view and detail view</ExampleImageSubtext>
                            </ExampleImageBox>

                            <EvaluationImage src={evaluationImage2} alt="Codesign Marketplace multi-select example"/>
                        </EvaluationExampleSection>
                    </EvaluationSectionContainer>

                    <SectionDivider/>


                    <ConclusionSectionContainer>
                        <ConclusionHeader>
                            <ConclusionTitleWrapper>
                                <ConclusionSquiggle src={squiggleBlip} alt=""/>
                                <ConclusionTitleText>CONCLUSION</ConclusionTitleText>
                            </ConclusionTitleWrapper>

                            <ConclusionContent>
                                <ConclusionSubsection>
                                    <ConclusionSubtitle>Overall</ConclusionSubtitle>
                                    <ConclusionParagraph>
                                        We were able to take an open ended brief, identify user needs and pain points,
                                        identify the flows and feature work needed to address those pains and execute
                                        from there.
                                    </ConclusionParagraph>
                                    <ConclusionParagraph>
                                        Of course our final metrics show that we were able to reach our goals, but it
                                        was also great to have our stakeholders invested and congratulatory on our work
                                        done for Codesign.
                                    </ConclusionParagraph>
                                </ConclusionSubsection>

                                <ConclusionSubsection>
                                    <ConclusionSubtitle>Next Steps</ConclusionSubtitle>
                                    <ConclusionList>
                                        <ConclusionListItem>Expand to other types of assets</ConclusionListItem>
                                        <ConclusionListItem>Analytics dashboard with component usage details for design
                                            contributors</ConclusionListItem>
                                        <ConclusionListItem>Adding component groups and favorites</ConclusionListItem>
                                    </ConclusionList>
                                </ConclusionSubsection>

                                <ConclusionSubsection>
                                    <ConclusionSubtitle>Learnings</ConclusionSubtitle>
                                    <ConclusionList>
                                        <ConclusionListItem>It's always best to come to design review with 3 options or
                                            less</ConclusionListItem>
                                        <ConclusionListItem>Watching the users actions &gt; Listening to their
                                            responses</ConclusionListItem>
                                        <ConclusionListItem>How to pivot during a design sprint and encourage
                                            confidence</ConclusionListItem>
                                    </ConclusionList>
                                </ConclusionSubsection>

                                <ConclusionSubsection>
                                    <ConclusionSubtitle>Thank you</ConclusionSubtitle>
                                    <ConclusionParagraph>
                                        Thank you to the Codesign Users for their time, the Codesign team for the
                                        mentorship, and my teammate Guru for teaching me new figma-isms. 👩‍💻 And...
                                        Thank you for taking the time to check out my work!
                                    </ConclusionParagraph>
                                </ConclusionSubsection>
                            </ConclusionContent>
                        </ConclusionHeader>

                        <ConclusionBannerWrapper>
                            <ConclusionBanner src={conclusionBanner} alt="Codesign prototype screenshots"/>
                            <ConclusionButtonsContainer>
                                <ConclusionButton
                                    href="https://www.figma.com/proto/9GkFUccLaG4OcDgoqlzeUy?node-id=1605-6829&t=WufZgx0NQqJRKphg-6"
                                    target="_blank" rel="noopener noreferrer">
                                    View Prototype
                                </ConclusionButton>
                                <ConclusionButton
                                    href="https://docs.google.com/presentation/d/1lEyUje8HDCOtqq-gOQUrQ3E0DX50e55oNg_7pHaMXGY"
                                    target="_blank" rel="noopener noreferrer">
                                    View Design Sprint Slides
                                </ConclusionButton>
                            </ConclusionButtonsContainer>
                        </ConclusionBannerWrapper>
                    </ConclusionSectionContainer>

                </ContentWrapper>
            </BoardContent>


            <BackButton onClick={handleBackClick}>← Back to Portfolio</BackButton>
            <FloatingTopNav/>
        </ProjectPageContainer>
    )
}
