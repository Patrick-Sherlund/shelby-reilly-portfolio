import React, { useRef, useEffect } from 'react'
import {
    CaseStudyWrapper,
    BackButton,
    HeroSection,
    HeroTitle,
    HeroSubtitle,
    MetaInfo,
    MetaItem,
    MetaLabel,
    MetaValue,
    ContentContainer,
    Section,
    SectionHeader,
    SectionLabel,
    SectionTitle,
    SectionText,
    ImageContainer,
    ImageContainerCropped,
    FullBleedImage,
    TwoColumnGrid,
    ImpactGrid,
    ImpactCard,
    ImpactTitle,
    ImpactStat,
    ImpactDescription,
    InsightBox,
    InsightTitle,
    InsightText,
    KeyPointsList,
    KeyPoint,
    ProcessTimeline,
    ProcessStep,
    ProcessNumber,
    ProcessLabel,
    ProcessDescription,
    Divider,
    QuickSummary,
    SummaryTitle,
    SummaryGrid,
    SummaryItem,
    SummaryItemLabel,
    SummaryItemValue,
    StatHighlight,
    StatNumber,
    StatLabel,
    ImageCaption
} from './MedTrackerCaseStudyPage.styles'
import { useSearchContext } from '../../context/SearchContext'
import { useZoomPanContext } from '../../context/ZoomPanContext'

export default function MedTrackerCaseStudyPage() {
    const pageRef = useRef<HTMLDivElement>(null)
    const { registerItem, unregisterItem, registerGroupAnchor } = useSearchContext()
    const { closeCaseStudy } = useZoomPanContext()

    useEffect(() => {
        if (pageRef.current) {
            registerItem({ id: 'medtracker-case-study', element: pageRef.current })
            registerGroupAnchor('MedTracker Case Study', pageRef.current, 4)
        }

        return () => {
            unregisterItem('medtracker-case-study')
        }
    }, [registerItem, unregisterItem, registerGroupAnchor])

    const handleBackClick = () => {
        if (closeCaseStudy) {
            closeCaseStudy()
        }
    }

    return (
        <CaseStudyWrapper ref={pageRef}>
            <BackButton onClick={handleBackClick}>← Back to Projects</BackButton>

            {/* Hero Section */}
            <HeroSection>
                <HeroTitle>MedTracker</HeroTitle>
                <HeroSubtitle>
                    Transforming medical inventory management for a $12M supply chain
                </HeroSubtitle>
                <MetaInfo>
                    <MetaItem>
                        <MetaLabel>ROLE</MetaLabel>
                        <MetaValue>Lead UX Designer</MetaValue>
                    </MetaItem>
                    <MetaItem>
                        <MetaLabel>TIMELINE</MetaLabel>
                        <MetaValue>6 Months</MetaValue>
                    </MetaItem>
                    <MetaItem>
                        <MetaLabel>TEAM</MetaLabel>
                        <MetaValue>PM, 3 Engineers, 1 Designer</MetaValue>
                    </MetaItem>
                    <MetaItem>
                        <MetaLabel>PLATFORM</MetaLabel>
                        <MetaValue>Mobile & Web</MetaValue>
                    </MetaItem>
                </MetaInfo>
            </HeroSection>

            <FullBleedImage>
                <img
                    src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Medtracker.png`}
                    alt="MedTracker Overview"
                />
            </FullBleedImage>

            {/* Quick Summary */}
            <ContentContainer>
                <QuickSummary>
                    <SummaryTitle>AT A GLANCE</SummaryTitle>
                    <SummaryGrid>
                        <SummaryItem>
                            <SummaryItemLabel>Challenge</SummaryItemLabel>
                            <SummaryItemValue>
                                Fragmented tools creating $12M inventory visibility gap
                            </SummaryItemValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemLabel>Solution</SummaryItemLabel>
                            <SummaryItemValue>
                                Mobile-first system with real-time tracking
                            </SummaryItemValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemLabel>Impact</SummaryItemLabel>
                            <SummaryItemValue>
                                16,250+ hours saved yearly, $8.6M recovered
                            </SummaryItemValue>
                        </SummaryItem>
                    </SummaryGrid>
                </QuickSummary>
            </ContentContainer>

            {/* Problem Section */}
            <ContentContainer>
                <Section>
                    <SectionHeader>
                        <SectionLabel>THE CHALLENGE</SectionLabel>
                        <SectionTitle>Managing critical medical inventory without visibility</SectionTitle>
                    </SectionHeader>
                    <SectionText>
                        Medical teams were managing $12M in supplies using paper-based tracking and disconnected systems.
                        This created dangerous gaps in supply readiness and prevented real-time collaboration.
                    </SectionText>

                    <StatHighlight>
                        <StatNumber>$12M</StatNumber>
                        <StatLabel>in medical inventory with zero real-time visibility</StatLabel>
                    </StatHighlight>

                    <InsightBox>
                        <InsightTitle>Key Problem</InsightTitle>
                        <InsightText>
                            "We had no way to know what supplies were actually in our boxes until we physically opened them.
                            By then, it was often too late if something was missing or expired."
                        </InsightText>
                    </InsightBox>

                    <ImageContainerCropped>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Problem.png`}
                            alt="Problem Overview"
                        />
                    </ImageContainerCropped>
                </Section>

                {/* User Impact */}
                <Section>
                    <SectionHeader>
                        <SectionLabel>USER & PROCESS IMPACTS</SectionLabel>
                        <SectionTitle>Critical workflow bottlenecks</SectionTitle>
                    </SectionHeader>

                    <KeyPointsList>
                        <KeyPoint>Medical personnel wasting 40+ minutes per box fulfillment</KeyPoint>
                        <KeyPoint>Zero visibility into expiration dates until physical inspection</KeyPoint>
                        <KeyPoint>No collaboration between warehouse staff and field teams</KeyPoint>
                        <KeyPoint>Manual tracking leading to mission-critical supply errors</KeyPoint>
                    </KeyPointsList>

                    <ImageContainerCropped>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/User/Process Impacts.png`}
                            alt="User and Process Impacts"
                        />
                        <ImageCaption>Pain points across the complete inventory lifecycle</ImageCaption>
                    </ImageContainerCropped>
                </Section>

                <Divider />

                {/* Research Section */}
                <Section>
                    <SectionHeader>
                        <SectionLabel>RESEARCH & DISCOVERY</SectionLabel>
                        <SectionTitle>Deep dive into user workflows</SectionTitle>
                    </SectionHeader>
                    <SectionText>
                        I conducted on-site research to understand the complete inventory lifecycle —
                        from order placement to field deployment.
                    </SectionText>

                    <KeyPointsList>
                        <KeyPoint>15+ user interviews across 4 user types (medical staff, warehouse, admin, field)</KeyPoint>
                        <KeyPoint>8 hours of on-site workflow observation and shadowing</KeyPoint>
                        <KeyPoint>Mapped 3 distinct end-to-end process flows</KeyPoint>
                        <KeyPoint>Identified 40+ pain points and optimization opportunities</KeyPoint>
                    </KeyPointsList>

                    <ImageContainerCropped>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Process.png`}
                            alt="Research Process"
                        />
                        <ImageCaption>Research methodology and stakeholder mapping</ImageCaption>
                    </ImageContainerCropped>
                </Section>

                {/* Process Mapping */}
                <Section>
                    <ImageContainerCropped>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Process Mapping.png`}
                            alt="Detailed Process Mapping"
                        />
                        <ImageCaption>Comprehensive process mapping revealing inefficiencies and handoff failures</ImageCaption>
                    </ImageContainerCropped>

                    <InsightBox>
                        <InsightTitle>Key Insight</InsightTitle>
                        <InsightText>
                            The biggest bottleneck wasn't the tools—it was the disconnect between warehouse operations
                            and field teams. They were operating in silos with no shared visibility.
                        </InsightText>
                    </InsightBox>
                </Section>

                <Divider />

                {/* Design Process */}
                <Section>
                    <SectionHeader>
                        <SectionLabel>DESIGN PROCESS</SectionLabel>
                        <SectionTitle>From research to working software</SectionTitle>
                    </SectionHeader>

                    <ProcessTimeline>
                        <ProcessStep>
                            <ProcessNumber>1</ProcessNumber>
                            <ProcessLabel>Understand</ProcessLabel>
                            <ProcessDescription>User research</ProcessDescription>
                        </ProcessStep>
                        <ProcessStep>
                            <ProcessNumber>2</ProcessNumber>
                            <ProcessLabel>Align</ProcessLabel>
                            <ProcessDescription>Stakeholder workshops</ProcessDescription>
                        </ProcessStep>
                        <ProcessStep>
                            <ProcessNumber>3</ProcessNumber>
                            <ProcessLabel>Ideate</ProcessLabel>
                            <ProcessDescription>Concept exploration</ProcessDescription>
                        </ProcessStep>
                        <ProcessStep>
                            <ProcessNumber>4</ProcessNumber>
                            <ProcessLabel>Prototype</ProcessLabel>
                            <ProcessDescription>User testing</ProcessDescription>
                        </ProcessStep>
                        <ProcessStep>
                            <ProcessNumber>5</ProcessNumber>
                            <ProcessLabel>Build</ProcessLabel>
                            <ProcessDescription>Iterative development</ProcessDescription>
                        </ProcessStep>
                    </ProcessTimeline>
                </Section>
            </ContentContainer>

            <FullBleedImage>
                <img
                    src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Process_ Align.png`}
                    alt="Alignment and Ideation Process"
                />
            </FullBleedImage>

            {/* Solution Section */}
            <ContentContainer>
                <Section>
                    <SectionHeader>
                        <SectionLabel>THE SOLUTION</SectionLabel>
                        <SectionTitle>Mobile-first inventory with real-time collaboration</SectionTitle>
                    </SectionHeader>
                    <SectionText>
                        A unified system that works where users work — on the warehouse floor, in the field, and at their desks.
                        Real-time updates enable instant collaboration and visibility across the entire organization.
                    </SectionText>

                    <TwoColumnGrid>
                        <ImageContainerCropped>
                            <img
                                src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Solution_ Needs.png`}
                                alt="Defining Data Needs"
                            />
                            <ImageCaption>Data architecture aligned to user needs</ImageCaption>
                        </ImageContainerCropped>
                        <ImageContainerCropped>
                            <img
                                src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Solution_ Data flow.png`}
                                alt="User Flows and Data Architecture"
                            />
                            <ImageCaption>Streamlined workflows and data flows</ImageCaption>
                        </ImageContainerCropped>
                    </TwoColumnGrid>

                    <ImageContainerCropped>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Solution_ INterface.png`}
                            alt="Interface Design"
                        />
                        <ImageCaption>Mobile-first interface optimized for on-the-go inventory management</ImageCaption>
                    </ImageContainerCropped>
                </Section>

                <Divider />

                {/* Design Decisions */}
                <Section>
                    <SectionHeader>
                        <SectionLabel>KEY DECISIONS</SectionLabel>
                        <SectionTitle>Design principles that shaped the solution</SectionTitle>
                    </SectionHeader>

                    <ImageContainerCropped>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Solution_ Design Decisions.png`}
                            alt="Design Decisions"
                        />
                    </ImageContainerCropped>

                    <KeyPointsList>
                        <KeyPoint>
                            <strong>Mobile First</strong> — Eliminated wasted time walking between warehouse floor and desktop computers
                        </KeyPoint>
                        <KeyPoint>
                            <strong>Real-time Updates</strong> — Enabled instant collaboration and visibility for distributed teams
                        </KeyPoint>
                        <KeyPoint>
                            <strong>Visual Indicators</strong> — Color-coded status made critical information instantly actionable
                        </KeyPoint>
                        <KeyPoint>
                            <strong>Field-Tested Design</strong> — Rapid prototyping and in-context testing ensured usability under pressure
                        </KeyPoint>
                        <KeyPoint>
                            <strong>3-Click Rule</strong> — Bottom nav + universal search = complete workflows in 3 clicks or fewer
                        </KeyPoint>
                    </KeyPointsList>
                </Section>

                <Divider />

                {/* Impact Section */}
                <Section>
                    <SectionHeader>
                        <SectionLabel>OUTCOMES</SectionLabel>
                        <SectionTitle>Measurable business impact</SectionTitle>
                    </SectionHeader>

                    <StatHighlight>
                        <StatNumber>16,250+</StatNumber>
                        <StatLabel>hours saved annually across all workflows</StatLabel>
                    </StatHighlight>

                    <StatHighlight style={{ marginLeft: '16px' }}>
                        <StatNumber>$8.6M</StatNumber>
                        <StatLabel>in cost savings and recovered inventory</StatLabel>
                    </StatHighlight>

                    <ImageContainerCropped style={{ marginTop: '48px' }}>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Business Impacts.png`}
                            alt="Business Impact Overview"
                        />
                    </ImageContainerCropped>

                    <ImpactGrid>
                        <ImpactCard>
                            <ImpactTitle>Box Fulfillment</ImpactTitle>
                            <ImpactStat>87% faster</ImpactStat>
                            <ImpactStat>5,250 hrs saved/year</ImpactStat>
                            <ImpactDescription>
                                Warehouse optimization and mobile tools reduced medical box fulfillment from 40 minutes to 5 minutes.
                            </ImpactDescription>
                        </ImpactCard>

                        <ImpactCard>
                            <ImpactTitle>Inventory Visibility</ImpactTitle>
                            <ImpactStat>$4M recovered</ImpactStat>
                            <ImpactDescription>
                                Real-time tracking identified over $4M in expired and excess inventory, preventing future waste and optimizing budget allocation.
                            </ImpactDescription>
                        </ImpactCard>

                        <ImpactCard>
                            <ImpactTitle>Expiration Management</ImpactTitle>
                            <ImpactStat>11,000 hrs saved/year</ImpactStat>
                            <ImpactDescription>
                                Automated expiration reporting with configurable viability windows eliminated manual tracking for 900+ medical boxes.
                            </ImpactDescription>
                        </ImpactCard>

                        <ImpactCard>
                            <ImpactTitle>Resource Allocation</ImpactTitle>
                            <ImpactStat>$4.6M saved annually</ImpactStat>
                            <ImpactDescription>
                                Disposition features enabled the organization to reallocate usable inventory to partner entities instead of disposal.
                            </ImpactDescription>
                        </ImpactCard>
                    </ImpactGrid>
                </Section>

                <Divider />

                {/* Learnings */}
                <Section>
                    <SectionHeader>
                        <SectionLabel>REFLECTION</SectionLabel>
                        <SectionTitle>Key learnings from this project</SectionTitle>
                    </SectionHeader>

                    <TwoColumnGrid>
                        <div>
                            <ImageContainerCropped>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Learnings_Med.png`}
                                    alt="Medical Domain Learnings"
                                />
                            </ImageContainerCropped>
                            <KeyPointsList style={{ marginTop: '32px' }}>
                                <KeyPoint>
                                    <strong>Concise design wins</strong> — With massive data sets, show only what's actionable right now
                                </KeyPoint>
                                <KeyPoint>
                                    <strong>Early engineering alignment is critical</strong> — Data-heavy features need tight dev collaboration from day one
                                </KeyPoint>
                                <KeyPoint>
                                    <strong>Users know best</strong> — Some "simplifications" confused users who relied on familiar workflow cues
                                </KeyPoint>
                            </KeyPointsList>
                        </div>
                        <div>
                            <ImageContainerCropped>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Learnings_ Eng.png`}
                                    alt="Engineering Collaboration"
                                />
                            </ImageContainerCropped>
                        </div>
                    </TwoColumnGrid>
                </Section>

                <Divider />

                {/* Next Steps */}
                <Section style={{ paddingBottom: '120px' }}>
                    <SectionHeader>
                        <SectionLabel>WHAT'S NEXT</SectionLabel>
                        <SectionTitle>Future enhancements</SectionTitle>
                    </SectionHeader>

                    <ImageContainerCropped>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/medtracker-casestudy/Next Steps_Med.png`}
                            alt="Roadmap and Next Steps"
                        />
                    </ImageContainerCropped>

                    <KeyPointsList>
                        <KeyPoint>
                            <strong>Smart Notifications</strong> — Proactive alerts for items nearing expiration with configurable windows
                        </KeyPoint>
                        <KeyPoint>
                            <strong>Advanced Search</strong> — Enhanced filtering, saved searches, and intelligent suggestions
                        </KeyPoint>
                        <KeyPoint>
                            <strong>Integrated Ordering</strong> — Direct connection to procurement systems for seamless replenishment
                        </KeyPoint>
                    </KeyPointsList>
                </Section>
            </ContentContainer>

        </CaseStudyWrapper>
    )
}
