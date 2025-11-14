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
import PersonaCarousel from '../../components/PersonaCarousel/PersonaCarousel'

export default function GoogleCodesignProjectPage() {
    const handleBackClick = () => { window.location.hash = '' }

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
                </ContentWrapper>
            </BoardContent>


            <BackButton onClick={handleBackClick}>← Back to Portfolio</BackButton>
            <FloatingTopNav />
        </ProjectPageContainer>
    )
}
