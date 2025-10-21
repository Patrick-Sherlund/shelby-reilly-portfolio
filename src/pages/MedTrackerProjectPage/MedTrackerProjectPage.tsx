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
import defineUserFlowsImg from '../../assets/images/define-user-flows.png'
import uiDesignDecisionsImg from '../../assets/images/ui-design-decisions.png'

export default function ProjectPage() {
  /* ----------------------------- DESIGN: state/refs ----------------------------- */
  const [activeDesignStep, setActiveDesignStep] = useState<number>(0)

  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)

  const processGridRef = useRef<HTMLDivElement>(null)
  const stickySlotRef  = useRef<HTMLDivElement>(null)
  const stickyInnerRef = useRef<HTMLDivElement>(null)
  const [stickyStyle, setStickyStyle] = useState<React.CSSProperties>({})
  const [slotMinH, setSlotMinH] = useState<number>(0)

  // STEP 1 image cap (desktop)
  const step1TextColRef = useRef<HTMLDivElement>(null)
  const [step1ImgMaxH, setStep1ImgMaxH] = useState<number | null>(null)
  useEffect(() => {
    const el = step1TextColRef.current
    if (!el) return
    const compute = () => {
      const isDesktop = window.matchMedia('(min-width:900px)').matches
      if (!isDesktop) { setStep1ImgMaxH(null); return }
      setStep1ImgMaxH(Math.max(160, Math.floor(el.getBoundingClientRect().height - 8)))
    }
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    window.addEventListener('resize', compute)
    compute()
    return () => { ro.disconnect(); window.removeEventListener('resize', compute) }
  }, [])

  // STEP 3 image cap (desktop)
  const step3TextColRef = useRef<HTMLDivElement>(null)
  const [step3ImgMaxH, setStep3ImgMaxH] = useState<number | null>(null)
  useEffect(() => {
    const el = step3TextColRef.current
    if (!el) return
    const compute = () => {
      const isDesktop = window.matchMedia('(min-width:900px)').matches
      if (!isDesktop) { setStep3ImgMaxH(null); return }
      setStep3ImgMaxH(Math.max(160, Math.floor(el.getBoundingClientRect().height - 8)))
    }
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    window.addEventListener('resize', compute)
    compute()
    return () => { ro.disconnect(); window.removeEventListener('resize', compute) }
  }, [])

  // Active step (DESIGN)
  useEffect(() => {
    const mapIdToIndex: Record<string, number> = {
      step_flows: 0,
      step_data: 1,
      step_ui: 2
    }
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id') || ''
          if (mapIdToIndex[id] !== undefined) setActiveDesignStep(mapIdToIndex[id])
        }
      }),
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    ;[step1Ref.current, step2Ref.current, step3Ref.current]
      .filter(Boolean)
      .forEach(n => observer.observe(n as Element))
    return () => observer.disconnect()
  }, [])

  // Sticky (DESIGN)
  useEffect(() => {
    const TOP_OFFSET = 96
    const MQ_DESKTOP = '(min-width:900px)'

    const recompute = () => {
      const grid  = processGridRef.current
      const slot  = stickySlotRef.current
      const inner = stickyInnerRef.current
      if (!grid || !slot || !inner) return

      const naturalH = inner.scrollHeight
      if (naturalH !== slotMinH) setSlotMinH(naturalH)

      const isDesktop = window.matchMedia(MQ_DESKTOP).matches
      if (!isDesktop) { setStickyStyle({ position: 'static' }); return }

      const gridRect = grid.getBoundingClientRect()
      const slotRect = slot.getBoundingClientRect()

      if (gridRect.top > TOP_OFFSET) { setStickyStyle({ position: 'static' }); return }

      if (gridRect.bottom - TOP_OFFSET <= naturalH) {
        setStickyStyle({ position: 'absolute', left: 0, right: 0, top: 'auto', bottom: 0, width: '100%' })
        return
      }

      setStickyStyle({ position: 'fixed', top: TOP_OFFSET, left: slotRect.left, width: slotRect.width, zIndex: 5 })
    }

    recompute()
    window.addEventListener('scroll', recompute, { passive: true })
    window.addEventListener('resize', recompute)
    const ro = new ResizeObserver(recompute)
    processGridRef.current && ro.observe(processGridRef.current)
    stickyInnerRef.current && ro.observe(stickyInnerRef.current)
    return () => { window.removeEventListener('scroll', recompute); window.removeEventListener('resize', recompute); ro.disconnect() }
  }, [slotMinH])

  /* ---------------------------- RESEARCH: state/refs ---------------------------- */
  const [activeResearchStep, setActiveResearchStep] = useState<number>(0)

  const rStep1Ref = useRef<HTMLDivElement>(null)
  const rStep2Ref = useRef<HTMLDivElement>(null)
  const rStep3Ref = useRef<HTMLDivElement>(null)

  const rProcessGridRef = useRef<HTMLDivElement>(null)
  const rStickySlotRef  = useRef<HTMLDivElement>(null)
  const rStickyInnerRef = useRef<HTMLDivElement>(null)
  const [rStickyStyle, setRStickyStyle] = useState<React.CSSProperties>({})
  const [rSlotMinH, setRSlotMinH] = useState<number>(0)

  // Active step (RESEARCH)
  useEffect(() => {
    const mapIdToIndex: Record<string, number> = {
      research_flows: 0,
      research_data: 1,
      research_ui: 2
    }
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id') || ''
          if (mapIdToIndex[id] !== undefined) setActiveResearchStep(mapIdToIndex[id])
        }
      }),
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    ;[rStep1Ref.current, rStep2Ref.current, rStep3Ref.current]
      .filter(Boolean)
      .forEach(n => observer.observe(n as Element))
    return () => observer.disconnect()
  }, [])

  // Sticky (RESEARCH)
  useEffect(() => {
    const TOP_OFFSET = 96
    const MQ_DESKTOP = '(min-width:900px)'

    const recompute = () => {
      const grid  = rProcessGridRef.current
      const slot  = rStickySlotRef.current
      const inner = rStickyInnerRef.current
      if (!grid || !slot || !inner) return

      const naturalH = inner.scrollHeight
      if (naturalH !== rSlotMinH) setRSlotMinH(naturalH)

      const isDesktop = window.matchMedia(MQ_DESKTOP).matches
      if (!isDesktop) { setRStickyStyle({ position: 'static' }); return }

      const gridRect = grid.getBoundingClientRect()
      const slotRect = slot.getBoundingClientRect()

      if (gridRect.top > TOP_OFFSET) { setRStickyStyle({ position: 'static' }); return }

      if (gridRect.bottom - TOP_OFFSET <= naturalH) {
        setRStickyStyle({ position: 'absolute', left: 0, right: 0, top: 'auto', bottom: 0, width: '100%' })
        return
      }

      setRStickyStyle({ position: 'fixed', top: TOP_OFFSET, left: slotRect.left, width: slotRect.width, zIndex: 5 })
    }

    recompute()
    window.addEventListener('scroll', recompute, { passive: true })
    window.addEventListener('resize', recompute)
    const ro = new ResizeObserver(recompute)
    rProcessGridRef.current && ro.observe(rProcessGridRef.current)
    rStickyInnerRef.current && ro.observe(rStickyInnerRef.current)
    return () => { window.removeEventListener('scroll', recompute); window.removeEventListener('resize', recompute); ro.disconnect() }
  }, [rSlotMinH])

  /* --------------------------------- helpers ---------------------------------- */
  const handleBackClick = () => { window.location.hash = '' }

  const StepChipDesign: React.FC<{ index: number; label: string; title: string }> = ({ index, label, title }) => {
    const isActive = activeDesignStep === index
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
          <Box sx={{ fontWeight: 800, fontSize: 12, letterSpacing: 0.7, textTransform: 'uppercase', opacity: 0.95, color: '#FFFFFF' }}>
            {label}
          </Box>
        </Box>
        <Box sx={{ mt: 0.5, fontWeight: 800, fontSize: 22, lineHeight: 1.15, color: '#FFFFFF' }}>
          {title}
        </Box>
      </Box>
    )
  }

  const StepChipResearch: React.FC<{ index: number; label: string; title: string }> = ({ index, label, title }) => {
    const isActive = activeResearchStep === index
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
          background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
          transition: 'all .25s ease',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
          cursor: 'pointer',
          mb: 1.25,
          boxShadow: isActive ? '0 8px 28px rgba(0,0,0,0.25)' : 'none',
          '&:hover': { borderColor: 'rgba(255,255,255,0.22)' }
        }}
        onClick={() => {
          const anchors = [rStep1Ref.current, rStep2Ref.current, rStep3Ref.current]
          anchors[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StepBadge aria-hidden>{index + 1}</StepBadge>
          <Box sx={{ fontWeight: 800, fontSize: 12, letterSpacing: 0.7, textTransform: 'uppercase', opacity: 0.95, color: '#FFFFFF' }}>
            {label}
          </Box>
        </Box>
        <Box sx={{ mt: 0.5, fontWeight: 800, fontSize: 22, lineHeight: 1.15, color: '#FFFFFF' }}>
          {title}
        </Box>
      </Box>
    )
  }

  const StepperRailDesign = (
    <Box sx={{ position: 'relative', pt: 1, pb: 2, px: 0, '::before': {
      content: '""', position: 'absolute', left: { md: 12 }, top: 0, bottom: 0, width: '3px',
      borderRadius: 999, background: 'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'
    }}}>
      <Box sx={{ pl: { md: 4 } }}>
        <StepChipDesign index={0} label="Step one" title="Defining the user flows" />
        <StepChipDesign index={1} label="Step two" title="Data mapping" />
        <StepChipDesign index={2} label="Step three" title="UI design decisions" />
      </Box>
    </Box>
  )

  const StepperRailResearch = (
    <Box sx={{ position: 'relative', pt: 1, pb: 2, px: 0, '::before': {
      content: '""', position: 'absolute', left: { md: 12 }, top: 0, bottom: 0, width: '3px',
      borderRadius: 999, background: 'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'
    }}}>
      <Box sx={{ pl: { md: 4 } }}>
        <StepChipResearch index={0} label="Step one" title="(empty ily)" />
        <StepChipResearch index={1} label="Step two" title="(empty ily)" />
        <StepChipResearch index={2} label="Step three" title="(empty ily)" />
      </Box>
    </Box>
  )

  /* ----------------------------------- UI ------------------------------------- */
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
                  <KPIChip><KPIValue>$4M+</KPIValue><KPILabel>annual savings</KPILabel></KPIChip>
                  <KPIChip><KPIValue>11k+</KPIValue><KPILabel>hours / year</KPILabel></KPIChip>
                  <KPIChip><KPIValue>5&nbsp;min</KPIValue><KPILabel>MED box fulfillment</KPILabel></KPIChip>
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

          {/* =============================== RESEARCH =============================== */}
          <Section id="research">
            <SectionTitle>Research</SectionTitle>
            <SectionContent>
              <Box
                ref={rProcessGridRef}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '320px 1fr' },
                  gap: { xs: 2, md: 4 },
                  alignItems: 'start',
                  position: 'relative'
                }}
              >
                {/* Sticky slot (Research) */}
                <Box
                  ref={rStickySlotRef}
                  sx={{ position: 'relative', alignSelf: 'start', minHeight: { md: rSlotMinH || 'auto' } }}
                >
                  <Box ref={rStickyInnerRef} style={rStickyStyle}>
                    {StepperRailResearch}
                  </Box>
                </Box>

                {/* RIGHT: empty step panels */}
                <Box sx={{ display: 'grid', gap: 8 }}>
                  <StepPanel
                    id="research_flows"
                    ref={rStep1Ref}
                    data-step="R1"
                    $active={activeResearchStep === 0}
                    aria-current={activeResearchStep === 0 ? 'true' : undefined}
                  >
                    <StepHeader>
                      <StepBadge aria-hidden>1</StepBadge>
                      <div><div className="eyebrow">STEP ONE</div><h3>(empty ily)</h3></div>
                    </StepHeader>

                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'minmax(0,1.18fr) minmax(0,0.82fr)' },
                        columnGap: { xs: 2, md: 3 },
                        alignItems: { md: 'stretch' }
                      }}
                    >
                      <Box sx={{ minHeight: { xs: 140, md: 220 } }} />
                      <Box sx={{ minHeight: { xs: 140, md: 220 } }} />
                    </Box>
                  </StepPanel>

                  <StepPanel
                    id="research_data"
                    ref={rStep2Ref}
                    data-step="R2"
                    $active={activeResearchStep === 1}
                    aria-current={activeResearchStep === 1 ? 'true' : undefined}
                  >
                    <StepHeader>
                      <StepBadge aria-hidden>2</StepBadge>
                      <div><div className="eyebrow">STEP TWO</div><h3>(empty ily)</h3></div>
                    </StepHeader>
                    <TwoColumn>
                      <Box sx={{ minHeight: { xs: 140, md: 220 } }} />
                      <Box sx={{ minHeight: { xs: 140, md: 220 } }} />
                    </TwoColumn>
                  </StepPanel>

                  <StepPanel
                    id="research_ui"
                    ref={rStep3Ref}
                    data-step="R3"
                    $active={activeResearchStep === 2}
                    aria-current={activeResearchStep === 2 ? 'true' : undefined}
                  >
                    <StepHeader>
                      <StepBadge aria-hidden>3</StepBadge>
                      <div><div className="eyebrow">STEP THREE</div><h3>(empty ily)</h3></div>
                    </StepHeader>
                    <TwoColumn>
                      <Box sx={{ minHeight: { xs: 140, md: 220 } }} />
                      <Box sx={{ minHeight: { xs: 140, md: 220 } }} />
                    </TwoColumn>
                  </StepPanel>
                </Box>
              </Box>
            </SectionContent>
          </Section>

          <SectionDivider />

          {/* ================================ DESIGN ================================ */}
          <Section id="design">
            <SectionTitle>Design</SectionTitle>
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
                {/* Sticky slot (Design) */}
                <Box
                  ref={stickySlotRef}
                  sx={{ position: 'relative', alignSelf: 'start', minHeight: { md: slotMinH || 'auto' } }}
                >
                  <Box ref={stickyInnerRef} style={stickyStyle}>
                    {StepperRailDesign}
                  </Box>
                </Box>

                {/* RIGHT: step panels control active state */}
                <Box sx={{ display: 'grid', gap: 8 }}>
                  {/* STEP ONE */}
                  <StepPanel
                    id="step_flows"
                    ref={step1Ref}
                    data-step="1"
                    $active={activeDesignStep === 0}
                    aria-current={activeDesignStep === 0 ? 'true' : undefined}
                  >
                    <StepHeader>
                      <StepBadge aria-hidden>1</StepBadge>
                      <div><div className="eyebrow">STEP ONE</div><h3>Defining the user flows</h3></div>
                    </StepHeader>

                    {/* text “reaches” toward image; image capped by text height; image centered vertically */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'minmax(0,1.18fr) minmax(0,0.82fr)' },
                        columnGap: { xs: 2, md: 3 },
                        alignItems: { md: 'stretch' }
                      }}
                    >
                      {/* LEFT: measured text column */}
                      <Box ref={step1TextColRef} sx={{ pr: { md: 1 } }}>
                        <TextBlock as="div" className="bullet-p">
                          We mapped the end-to-end tasks and decision points across roles to minimize hops and context
                          switching. The baseline contained 18 steps across in-processing, picking, packing, and
                          disposition. We collapsed redundant actions and clarified ownership to target a “3-clicks-or-less”
                          path to core tasks.
                        </TextBlock>

                        <div className="bullet-h" style={{ marginTop: 8 }}>Artifacts</div>
                        <ListItem>As-is / to-be flow diagrams per role</ListItem>
                        <ListItem>Task inventory &amp; success metrics</ListItem>
                        <ListItem>Entry/exit criteria for each stage</ListItem>

                        <div className="bullet-h" style={{ marginTop: 14 }}>Decisions</div>
                        <ListItem>Prioritized flows: in-processing, packing, disposition</ListItem>
                        <ListItem>Kept familiar cues; removed dead-ends</ListItem>
                        <ListItem>Introduced readiness &amp; expiration</ListItem>
                      </Box>

                      {/* RIGHT: image */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: { xs: 'center', md: 'flex-end' },
                          pr: { md: 1 },
                          mt: { xs: 2, md: 0 },
                          height: '100%'
                        }}
                      >
                        <Box
                          component="img"
                          src={defineUserFlowsImg}
                          alt="Defining the user flows photos"
                          loading="lazy"
                          sx={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: { xs: 'min(92%, 460px)', md: 'min(100%, 680px)' },
                            maxHeight: { md: step1ImgMaxH ? `${step1ImgMaxH}px` : 'none' },
                            display: 'block',
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.12)',
                            boxShadow: '0 20px 44px rgba(0,0,0,.55)'
                          }}
                        />
                      </Box>
                    </Box>
                  </StepPanel>

                  {/* STEP TWO */}
                  <StepPanel
                    id="step_data"
                    ref={step2Ref}
                    data-step="2"
                    $active={activeDesignStep === 1}
                    aria-current={activeDesignStep === 1 ? 'true' : undefined}
                  >
                    <StepHeader>
                      <StepBadge aria-hidden>2</StepBadge>
                      <div><div className="eyebrow">STEP TWO</div><h3>Data Mapping</h3></div>
                    </StepHeader>

                    <TwoColumn>
                      <div>
                        <TextBlock as="div" className="bullet-p">
                          With engineering, we defined the schema that powers search, bulk updates, and expiration
                          reporting. Required vs. optional fields were clarified, and system-derived values were introduced
                          to automate previously manual reporting.
                        </TextBlock>

                        <div className="bullet-h" style={{ marginTop: 8 }}>What we mapped</div>
                        <ListItem>Item → Lot → Set relationships &amp; ownership</ListItem>
                        <ListItem>Required fields, validation, and defaults</ListItem>
                        <ListItem>Primary/secondary keys for edits &amp; bulk ops</ListItem>

                        <div className="bullet-h" style={{ marginTop: 14 }}>Why it matters</div>
                        <ListItem>Reliable readiness signals per unit</ListItem>
                        <ListItem>Automated expiration &amp; disposition reporting</ListItem>
                        <ListItem>Fast, conflict-free updates from mobile</ListItem>
                      </div>

                      {/* small right card */}
                      <Box
                        sx={{
                          alignSelf: 'start',
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.12)'
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8 }}>data to include</div>
                        <ul style={{ margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
                          <li>all items expiring</li><li>item #</li><li>QTY</li><li>expiration</li><li>lot</li><li>set</li><li>box #</li>
                        </ul>

                        <div style={{ height: 10 }} />

                        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8 }}>User visualization needs</div>
                        <ul style={{ margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
                          <li>all items expiring</li><li>quantities</li><li>NSN/ NDC</li><li>a way to copy and paste into ordering systems</li>
                        </ul>
                      </Box>
                    </TwoColumn>
                  </StepPanel>

                 {/* STEP THREE */}
<StepPanel
  id="step_ui"
  ref={step3Ref}
  data-step="3"
  $active={activeDesignStep === 2}
  aria-current={activeDesignStep === 2 ? 'true' : undefined}
>
  <StepHeader>
    <StepBadge aria-hidden>3</StepBadge>
    <div>
      <div className="eyebrow">STEP THREE</div>
      <h3>UI Design Decisions</h3>
    </div>
  </StepHeader>

  {/* FIX: protect text width + tame image scaling */}
  <Box
    sx={{
      display: 'grid',
      // Ensure the text column never collapses (min 420px).
      gridTemplateColumns: { xs: '1fr', md: 'minmax(420px, 1fr) minmax(0, 0.9fr)' },
      columnGap: { xs: 2, md: 4 },
      alignItems: { md: 'stretch' }
    }}
  >
    {/* LEFT: measured text column (sets image maxHeight) */}
    <Box ref={step3TextColRef} sx={{ pr: { md: 1 } }}>
      <div className="bullet-h">Mobile First</div>
      <div className="bullet-p">saves users time of going back and forth</div>

      <div className="bullet-h">Updates real time</div>
      <div className="bullet-p">Enables collaboration and data visibility</div>

      <div className="bullet-h">Visual Indicators</div>
      <div className="bullet-p">Quick to understand and act on</div>

      <div className="bullet-h">User Validated</div>
      <div className="bullet-p">Rapid prototyping → field testing → updates</div>

      <div className="bullet-h">3 Clicks or less</div>
      <div className="bullet-p">
        Bottom Nav design + Search allow for 3 clicks or less to get main user flows complete
      </div>
    </Box>

    {/* RIGHT: image — centered vertically, width tamed, height capped to text */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-end' },
        alignItems: 'center',
        pr: { md: 1 },
        mt: { xs: 2, md: 0 },
        height: '100%' // lets flex centering use full row height
      }}
    >
      <Box
        component="img"
        src={uiDesignDecisionsImg}
        alt="Bulk Inventory and Sets screens"
        loading="lazy"
        sx={{
          width: 'auto',
          height: 'auto',
          // Never let the image demand more than its column or 640px.
          maxWidth: { xs: 'min(92%, 420px)', md: 'min(100%, 640px)' },
          // Key: cap the height to the measured left column height on desktop.
          maxHeight: { md: step3ImgMaxH ? `${step3ImgMaxH}px` : 'none' },
          display: 'block',
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.12)',
          filter: 'drop-shadow(0 20px 44px rgba(0,0,0,.55))'
        }}
      />
    </Box>
  </Box>
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
                      height: { xs: 220, sm: 260, md: 360 },
                      width: 'auto',
                      maxWidth: '100%',
                      display: 'block',
                      mx: 'auto',
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
                      height: { xs: 220, sm: 260, md: 360 },
                      width: 'auto',
                      maxWidth: '100%',
                      display: 'block',
                      mx: 'auto',
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
