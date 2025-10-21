// MedTrackerProjectPage.tsx
import React, { useRef, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav";
import { GlobalStyles } from '@mui/material';
import {
  ProjectPageContainer,
  BoardContent,
  ContentWrapper,
  BackButton,
  HeroSection,
  HeroLogo,
  HeroBadge,
  HeroGrid,
  HeroDevices,
  HeroGlass,
  HeroMetaList,
  HeroMetaKey,
  HeroMetaVal,
  HeroKPIGrid,
  KPIChip,
  KPIValue,
  KPILabel,
  HeroProblemTitle,
  HeroDescription,
  SectionDivider,
  Section,
  SectionTitle,
  SectionContent,
  TwoColumn,
  ThreeColumn,
  TextBlock,
  BoldText,
  ListItem,
  StatCard,
  StatNumber,
  StatLabel,
  StatDescription,
  StepPanel,
  StepHeader,
  StepBadge
} from './MedTrackerProjectPage.styles'

import medTrackerLogo from '../../assets/images/MedTracker-Logo.png'
import iphoneRefraction from '../../assets/images/iphone-refraction.png'
import inventoryImg from '../../assets/images/Inventory.png'
import setsImg from '../../assets/images/Sets.png'

export default function ProjectPage() {
  // ——— Process sticky + active step ———
  const [activeStep, setActiveStep] = useState<number>(0)

  // Refs for right-side panels (active step detection)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)

  // Refs for left sticky column (bullet-proof sticky within section)
  const processGridRef = useRef<HTMLDivElement>(null)   // the grid that wraps left+right
  const stickySlotRef  = useRef<HTMLDivElement>(null)   // the left grid cell (static flow)
  const stickyInnerRef = useRef<HTMLDivElement>(null)   // the element we pin/fix
  const [stickyStyle, setStickyStyle] = useState<React.CSSProperties>({})
  const [slotMinH, setSlotMinH] = useState<number>(0)   // preserve layout when fixed

  // Active step via intersection around mid-viewport
  useEffect(() => {
    const mapIdToIndex: Record<string, number> = {
      step_flows: 0,
      step_data: 1,
      step_ui: 2
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || ''
            if (mapIdToIndex[id] !== undefined) setActiveStep(mapIdToIndex[id])
          }
        })
      },
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    const nodes = [step1Ref.current, step2Ref.current, step3Ref.current].filter(Boolean) as Element[]
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  // Robust sticky behavior (works even if any ancestor has overflow, grid, etc.)
  useEffect(() => {
    const TOP_OFFSET = 96 // keep under your top nav
    const MQ_DESKTOP = '(min-width:900px)' // MUI md

    const recompute = () => {
      const grid  = processGridRef.current
      const slot  = stickySlotRef.current
      const inner = stickyInnerRef.current
      if (!grid || !slot || !inner) return

      // reserve space equal to inner's natural height so layout doesn't jump
      const naturalH = inner.scrollHeight
      if (naturalH !== slotMinH) setSlotMinH(naturalH)

      const isDesktop = window.matchMedia(MQ_DESKTOP).matches
      if (!isDesktop) {
        setStickyStyle({ position: 'static' })
        return
      }

      const gridRect = grid.getBoundingClientRect()
      const slotRect = slot.getBoundingClientRect()

      // Above the section → normal flow
      if (gridRect.top > TOP_OFFSET) {
        setStickyStyle({ position: 'static' })
        return
      }

      // Past the bottom of the section → lock to bottom INSIDE the section
      if (gridRect.bottom - TOP_OFFSET <= naturalH) {
        setStickyStyle({
          position: 'absolute',
          left: 0,
          right: 0,
          top: 'auto',
          bottom: 0,
          width: '100%',
        })
        return
      }

      // Within the section → fixed to viewport
      setStickyStyle({
        position: 'fixed',
        top: TOP_OFFSET,
        left: slotRect.left,
        width: slotRect.width,
        zIndex: 5
      })
    }

    // Initial + on scroll/resize
    recompute()
    window.addEventListener('scroll', recompute, { passive: true })
    window.addEventListener('resize', recompute)
    const ro = new ResizeObserver(recompute)
    if (processGridRef.current) ro.observe(processGridRef.current)
    if (stickyInnerRef.current) ro.observe(stickyInnerRef.current)

    return () => {
      window.removeEventListener('scroll', recompute)
      window.removeEventListener('resize', recompute)
      ro.disconnect()
    }
  }, [slotMinH])

  const handleBackClick = () => { window.location.hash = '' }

  const StepChip: React.FC<{ index: number; label: string; title: string }> = ({ index, label, title }) => {
    const isActive = activeStep === index
    return (
      <Box
        role="link"
        aria-current={isActive ? 'step' : undefined}
        sx={{
          position: 'relative',
          p: 1.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: isActive ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.14)',
          // gradient removed:
          background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
          transition: 'all .25s ease',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
          cursor: 'pointer',
          mb: 1.25,
          boxShadow: isActive ? '0 8px 28px rgba(0,0,0,0.25)' : 'none',
          '&:hover': { borderColor: 'rgba(255,255,255,0.22)' }
        }}
        onClick={() => {
          const anchors = [step1Ref.current, step2Ref.current, step3Ref.current]
          anchors[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StepBadge aria-hidden>{index + 1}</StepBadge>
          <Box
            sx={{
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: 0.7,
              textTransform: 'uppercase',
              opacity: 0.95,
              color: '#FFFFFF'
            }}
          >
            {label}
          </Box>
        </Box>
        <Box sx={{ mt: 0.5, fontWeight: 800, fontSize: 22, lineHeight: 1.15, color: '#FFFFFF' }}>
          {title}
        </Box>
      </Box>
    )
  }

  const StepperRail = (
    <Box
      sx={{
        position: 'relative',
        pt: 1,
        pb: 2,
        px: 0,
        '::before': {
          content: '""',
          position: 'absolute',
          left: { md: 12 },
          top: 0,
          bottom: 0,
          width: '3px',
          borderRadius: 999,
          background:
            'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'
        }
      }}
    >
      <Box sx={{ pl: { md: 4 } }}>
        <StepChip index={0} label="Step one" title="Defining the user flows" />
        <StepChip index={1} label="Step two" title="Data mapping" />
        <StepChip index={2} label="Step three" title="UI design decisions" />
      </Box>
    </Box>
  )

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
            <HeroLogo src={medTrackerLogo} alt="Med Tracker logo" />
            <HeroBadge>VMware by Broadcom</HeroBadge>

            <HeroGrid>
              <HeroDevices src={iphoneRefraction} alt="MedTracker iPhone screens" />

              <HeroGlass>
                <HeroMetaList>
                  <HeroMetaKey>Project Type</HeroMetaKey>
                  <HeroMetaVal>Medical Inventory Tracking • 0–1</HeroMetaVal>

                  <HeroMetaKey>Timeline</HeroMetaKey>
                  <HeroMetaVal>6 months</HeroMetaVal>

                  <HeroMetaKey>Team</HeroMetaKey>
                  <HeroMetaVal>6 Eng, 2 Design, 1 PM</HeroMetaVal>

                  <HeroMetaKey>Impact</HeroMetaKey>
                  <HeroMetaVal>$4M saved annually • 11k+ hours saved</HeroMetaVal>
                </HeroMetaList>

                <HeroKPIGrid>
                  <KPIChip>
                    <KPIValue>$4M+</KPIValue>
                    <KPILabel>annual savings</KPILabel>
                  </KPIChip>
                  <KPIChip>
                    <KPIValue>11k+</KPIValue>
                    <KPILabel>hours / year</KPILabel>
                  </KPIChip>
                  <KPIChip>
                    <KPIValue>5&nbsp;min</KPIValue>
                    <KPILabel>MED box fulfillment</KPILabel>
                  </KPIChip>
                </HeroKPIGrid>

                <Box sx={{ mt: 2 }}>
                  <HeroProblemTitle>Problem Overview</HeroProblemTitle>
                  <HeroDescription>
                    “Limited tooling and fragmented workflows reduced visibility into <BoldText>$12M</BoldText> of on-hand
                    medical inventory, introducing risk to supply accuracy and readiness.”
                  </HeroDescription>
                </Box>
              </HeroGlass>
            </HeroGrid>
          </HeroSection>

          <SectionDivider />

          {/* PROCESS — left column stays in view while within this section */}
          <Section id="process">
            <SectionTitle>Process</SectionTitle>
            <SectionContent>
              <Box
                ref={processGridRef}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '320px 1fr' },
                  gap: { xs: 2, md: 4 },
                  alignItems: 'start',
                  position: 'relative'
                }}
              >
                {/* Sticky slot (kept in normal flow). We pin the child via inline style. */}
                <Box
                  ref={stickySlotRef}
                  sx={{
                    position: 'relative',
                    alignSelf: 'start',
                    minHeight: { md: slotMinH || 'auto' }
                  }}
                >
                  <Box ref={stickyInnerRef} style={stickyStyle}>
                    {StepperRail}
                  </Box>
                </Box>

                {/* RIGHT: step panels control active state */}
                <Box sx={{ display: 'grid', gap: 8 }}>
                  <StepPanel
                    id="step_flows"
                    ref={step1Ref}
                    data-step="1"
                    $active={activeStep === 0}
                    aria-current={activeStep === 0 ? 'true' : undefined}
                  >
                    <StepHeader>
                      <StepBadge aria-hidden>1</StepBadge>
                      <div>
                        <div className="eyebrow">Step one</div>
                        <h3>Defining the user flows</h3>
                      </div>
                    </StepHeader>

                    <TextBlock>
                      We mapped the end-to-end tasks and decision points across roles to minimize hops and context
                      switching. The baseline contained 18 steps across in-processing, picking, packing, and
                      disposition. We collapsed redundant actions and clarified ownership to target a “3-clicks-or-less”
                      path to core tasks.
                    </TextBlock>
                    <TwoColumn>
                      <div>
                        <h4>Artifacts</h4>
                        <ListItem>As-is / to-be flow diagrams per role</ListItem>
                        <ListItem>Task inventory &amp; success metrics</ListItem>
                        <ListItem>Entry/exit criteria for each stage</ListItem>
                      </div>
                      <div>
                        <h4>Decisions</h4>
                        <ListItem>Prioritized flows: in-processing, packing, disposition</ListItem>
                        <ListItem>Kept familiar cues; removed dead-ends</ListItem>
                        <ListItem>Introduced readiness &amp; expiration shortcuts</ListItem>
                      </div>
                    </TwoColumn>
                  </StepPanel>

                  <StepPanel
                    id="step_data"
                    ref={step2Ref}
                    data-step="2"
                    $active={activeStep === 1}
                    aria-current={activeStep === 1 ? 'true' : undefined}
                  >
                    <StepHeader>
                      <StepBadge aria-hidden>2</StepBadge>
                      <div>
                        <div className="eyebrow">Step two</div>
                        <h3>Data mapping</h3>
                      </div>
                    </StepHeader>

                    <TextBlock>
                      With engineering, we defined the schema that powers search, bulk updates, and expiration
                      reporting. Required vs. optional fields were clarified, and system-derived values (e.g., viability
                      windows) were introduced to automate previously manual reporting.
                    </TextBlock>
                    <TwoColumn>
                      <div>
                        <h4>What we mapped</h4>
                        <ListItem>Item → Lot → Set relationships &amp; ownership</ListItem>
                        <ListItem>Required fields, validation, and defaults</ListItem>
                        <ListItem>Primary/secondary keys for edits &amp; bulk ops</ListItem>
                      </div>
                      <div>
                        <h4>Why it matters</h4>
                        <ListItem>Reliable readiness signals per unit</ListItem>
                        <ListItem>Automated expiration &amp; disposition reporting</ListItem>
                        <ListItem>Fast, conflict-free updates from mobile</ListItem>
                      </div>
                    </TwoColumn>
                  </StepPanel>

                  <StepPanel
                    id="step_ui"
                    ref={step3Ref}
                    data-step="3"
                    $active={activeStep === 2}
                    aria-current={activeStep === 2 ? 'true' : undefined}
                  >
                    <StepHeader>
                      <StepBadge aria-hidden>3</StepBadge>
                      <div>
                        <div className="eyebrow">Step three</div>
                        <h3>UI design decisions (UI/UX)</h3>
                      </div>
                    </StepHeader>

                    <TextBlock>
                      We optimized the information architecture for scan-ability: prominent readiness and expiration
                      signals, clear set/lot hierarchy, and in-place editing. Mobile-first patterns and a familiar
                      table-detail model enabled quick wins without cognitive overhead.
                    </TextBlock>
                    <ThreeColumn>
                      <div>
                        <h4>IA &amp; patterns</h4>
                        <p>List → detail with persistent context; 3-click rule; prominent status chips.</p>
                      </div>
                      <div>
                        <h4>Affordances</h4>
                        <p>Inline edits for qty/lot; bulk actions; search &amp; filters tuned to tasks.</p>
                      </div>
                      <div>
                        <h4>Signals</h4>
                        <p>Readiness bands (0–80 / 81–99 / 100%), expiration badges, disposition prompts.</p>
                      </div>
                    </ThreeColumn>
                  </StepPanel>
                </Box>
              </Box>
            </SectionContent>
          </Section>

          <SectionDivider />

          {/* SOLUTION */}
<Section>
  <SectionTitle>Solution</SectionTitle>
  <SectionContent>
    <TextBlock>
      MedTracker is a mobile-first web app with real-time updates, visual indicators, and three-clicks-or-less
      access to the core jobs.
    </TextBlock>

    <TwoColumn>
      {/* Inventory */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <h4>Inventory</h4>
        <Box
          component="img"
          src={inventoryImg}
          alt="Inventory flows: list, detail, and edit screens"
          loading="lazy"
          sx={{
  // make both images the same height across breakpoints
  height: { xs: 220, sm: 260, md: 360 },
  width: 'auto',          // keep aspect ratio
  maxWidth: '100%',       // don't overflow the column
  display: 'block',
  mx: 'auto',             // center it
  borderRadius: 2,
}}
        />
      </Box>

      {/* Sets */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <h4>Sets</h4>
        <Box
          component="img"
          src={setsImg}
          alt="Sets flows: set overview, type groups, and items"
          loading="lazy"
          sx={{
  // make both images the same height across breakpoints
  height: { xs: 220, sm: 260, md: 360 },
  width: 'auto',          // keep aspect ratio
  maxWidth: '100%',       // don't overflow the column
  display: 'block',
  mx: 'auto',             // center it
  borderRadius: 2,
}}

        />
      </Box>
    </TwoColumn>
  </SectionContent>
</Section>


          <SectionDivider />

          {/* RESULTS / IMPACT */}
          <Section>
            <SectionTitle>Results &amp; Impact</SectionTitle>
            <SectionContent>
              <ThreeColumn>
                <StatCard>
                  <StatNumber>5 min</StatNumber>
                  <StatLabel>MED box fulfillment</StatLabel>
                  <StatDescription>Reduced from ~40 min (≈87% faster)</StatDescription>
                </StatCard>
                <StatCard>
                  <StatNumber>11,000+</StatNumber>
                  <StatLabel>hours saved / year</StatLabel>
                  <StatDescription>Across the inventory lifecycle</StatDescription>
                </StatCard>
                <StatCard>
                  <StatNumber>$4M+</StatNumber>
                  <StatLabel>identified &amp; removed</StatLabel>
                  <StatDescription>Expired / excess inventory surfaced</StatDescription>
                </StatCard>
              </ThreeColumn>
            </SectionContent>
          </Section>
        </ContentWrapper>
      </BoardContent>
          <BackButton onClick={handleBackClick}>← Back to Portfolio</BackButton>

      <FloatingTopNav />
    </ProjectPageContainer>
  )
}
