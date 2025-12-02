import React, {useCallback, useEffect, useRef, useState} from 'react'
import Box from '@mui/material/Box'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav";
import {GlobalStyles, Typography, useTheme} from '@mui/material';
import {
    BackButton,
    BoardContent,
    BoldText,
    ContentWrapper,
    HeroBanner,
    HeroBannerRight,
    HeroBannerWrapper,
    HeroContent,
    HeroLogo,
    HeroSection,
    ListItem,
    MobileStepBadge,
    MobileStepChip,
    MobileStepLabel,
    MobileStepTrackInner,
    MobileStepTracker,
    MobileStepSpacer,
    ProjectPageContainer,
    Section,
    SectionContent,
    SectionDivider,
    SectionTitle,
    StatCard,
    StatDescription,
    StatLabel,
    StatNumber,
    StepBadge,
    StepContent,
    StepHeader,
    StepPanel,
    TextBlock,
    ThreeColumn,
    TwoColumn
} from './MedTrackerProjectPage.styles'

import medTrackerLogo from '../../assets/images/MedTracker-Logo.png'
import inventoryImg from '../../assets/images/Inventory.png'
import setsImg from '../../assets/images/Sets.png'
import defineUserFlowsImg from '../../assets/images/define-user-flows.png'
import uiDesignDecisionsImg from '../../assets/images/ui-design-decisions.png'
import medTrackerHeroBanner from '../../assets/images/med-tracker-hero-banner.png'
import researchPic1 from '../../assets/images/research-pic-1.png'
import researchPic2 from '../../assets/images/research-pic-2.png'
import researchPic3 from '../../assets/images/research-pic-3.png'
import researchPic4 from '../../assets/images/research-pic-4.png'
import iphone1 from '../../assets/images/iphone_1.png'
import iphone2 from '../../assets/images/iphone_2.png'
import iphone3 from '../../assets/images/iphone_3.png'
import iphone4 from '../../assets/images/iphone_4.png'
import iphone5 from '../../assets/images/iphone_5.png'
import IPhoneCarousel from '../../components/IPhoneCarousel/IPhoneCarousel'

export default function ProjectPage() {

    const MOBILE_MEDIA_QUERY = '(max-width:900px)'

    const [activeDesignStep, setActiveDesignStep] = useState<number>(0)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    const step1Ref = useRef<HTMLDivElement>(null)
    const step2Ref = useRef<HTMLDivElement>(null)
    const step3Ref = useRef<HTMLDivElement>(null)

    const processGridRef = useRef<HTMLDivElement>(null)
    const stickySlotRef = useRef<HTMLDivElement>(null)
    const stickyInnerRef = useRef<HTMLDivElement>(null)
    const [stickyStyle, setStickyStyle] = useState<React.CSSProperties>({})
    const [slotMinH, setSlotMinH] = useState<number>(0)


    const step1TextColRef = useRef<HTMLDivElement>(null)
    const [step1ImgMaxH, setStep1ImgMaxH] = useState<number | null>(null)
    useEffect(() => {
        const el = step1TextColRef.current
        if (!el) return
        const compute = () => {
            const isDesktop = window.matchMedia('(min-width:900px)').matches
            if (!isDesktop) {
                setStep1ImgMaxH(null);
                return
            }
            setStep1ImgMaxH(Math.max(160, Math.floor(el.getBoundingClientRect().height - 8)))
        }
        const ro = new ResizeObserver(compute)
        ro.observe(el)
        window.addEventListener('resize', compute)
        compute()
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', compute)
        }
    }, [])


    const step3TextColRef = useRef<HTMLDivElement>(null)
    const [step3ImgMaxH, setStep3ImgMaxH] = useState<number | null>(null)
    useEffect(() => {
        const el = step3TextColRef.current
        if (!el) return
        const compute = () => {
            const isDesktop = window.matchMedia('(min-width:900px)').matches
            if (!isDesktop) {
                setStep3ImgMaxH(null);
                return
            }
            setStep3ImgMaxH(Math.max(160, Math.floor(el.getBoundingClientRect().height - 8)))
        }
        const ro = new ResizeObserver(compute)
        ro.observe(el)
        window.addEventListener('resize', compute)
        compute()
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', compute)
        }
    }, [])


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
                {root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0}
            )
        ;[step1Ref.current, step2Ref.current, step3Ref.current]
            .filter(Boolean)
            .forEach(n => observer.observe(n as Element))
        return () => observer.disconnect()
    }, [])


    useEffect(() => {
        const TOP_OFFSET = 96
        const MQ_DESKTOP = '(min-width:900px)'

        const recompute = () => {
            const grid = processGridRef.current
            const slot = stickySlotRef.current
            const inner = stickyInnerRef.current
            if (!grid || !slot || !inner) return

            const naturalH = inner.scrollHeight
            if (naturalH !== slotMinH) setSlotMinH(naturalH)

            const isDesktop = window.matchMedia(MQ_DESKTOP).matches
            if (!isDesktop) {
                setStickyStyle({position: 'static'});
                return
            }

            const gridRect = grid.getBoundingClientRect()
            const slotRect = slot.getBoundingClientRect()

            if (gridRect.top > TOP_OFFSET) {
                setStickyStyle({position: 'static'});
                return
            }

            if (gridRect.bottom - TOP_OFFSET <= naturalH) {
                setStickyStyle({position: 'absolute', left: 0, right: 0, top: 'auto', bottom: 0, width: '100%'})
                return
            }

            setStickyStyle({position: 'fixed', top: TOP_OFFSET, left: slotRect.left, width: slotRect.width, zIndex: 5})
        }

        recompute()
        window.addEventListener('scroll', recompute, {passive: true})
        window.addEventListener('resize', recompute)
        const ro = new ResizeObserver(recompute)
        processGridRef.current && ro.observe(processGridRef.current)
        stickyInnerRef.current && ro.observe(stickyInnerRef.current)
        return () => {
            window.removeEventListener('scroll', recompute);
            window.removeEventListener('resize', recompute);
            ro.disconnect()
        }
    }, [slotMinH])


    const [activeResearchStep, setActiveResearchStep] = useState<number>(0)

    const rStep1Ref = useRef<HTMLDivElement>(null)
    const rStep2Ref = useRef<HTMLDivElement>(null)
    const rStep3Ref = useRef<HTMLDivElement>(null)
    const rStep4Ref = useRef<HTMLDivElement>(null)

    const rProcessGridRef = useRef<HTMLDivElement>(null)
    const rStickySlotRef = useRef<HTMLDivElement>(null)
    const rStickyInnerRef = useRef<HTMLDivElement>(null)
    const [rStickyStyle, setRStickyStyle] = useState<React.CSSProperties>({})
    const [rSlotMinH, setRSlotMinH] = useState<number>(0)

    const researchSectionRef = useRef<HTMLDivElement>(null)
    const designSectionRef = useRef<HTMLDivElement>(null)
    const researchTrackerRef = useRef<HTMLDivElement>(null)
    const designTrackerRef = useRef<HTMLDivElement>(null)
    const [researchTrackerHeight, setResearchTrackerHeight] = useState<number>(0)
    const [designTrackerHeight, setDesignTrackerHeight] = useState<number>(0)
    const [pinResearchTracker, setPinResearchTracker] = useState(false)
    const [pinDesignTracker, setPinDesignTracker] = useState(false)
    const researchChipRefs = useRef<Array<HTMLButtonElement | null>>([])
    const designChipRefs = useRef<Array<HTMLButtonElement | null>>([])
    const setResearchChipRef = useCallback((el: HTMLButtonElement | null, idx: number) => {
        researchChipRefs.current[idx] = el
    }, [])
    const setDesignChipRef = useCallback((el: HTMLButtonElement | null, idx: number) => {
        designChipRefs.current[idx] = el
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const mql = window.matchMedia(MOBILE_MEDIA_QUERY)
        const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches)
        setIsMobile(mql.matches)
        mql.addEventListener('change', handler)
        return () => mql.removeEventListener('change', handler)
    }, [])

    useEffect(() => {
        const el = researchTrackerRef.current
        if (!el) return
        const measure = () => setResearchTrackerHeight(el.getBoundingClientRect().height)
        const ro = new ResizeObserver(measure)
        ro.observe(el)
        measure()
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const el = designTrackerRef.current
        if (!el) return
        const measure = () => setDesignTrackerHeight(el.getBoundingClientRect().height)
        const ro = new ResizeObserver(measure)
        ro.observe(el)
        measure()
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const MOBILE_TOP_OFFSET = 96
        const recompute = () => {
            if (!isMobile) {
                setPinResearchTracker(false)
                setPinDesignTracker(false)
                return
            }

            const researchRect = researchSectionRef.current?.getBoundingClientRect()
            const designRect = designSectionRef.current?.getBoundingClientRect()
            const researchSpace = researchTrackerHeight ? researchTrackerHeight + 32 : 0
            const designSpace = designTrackerHeight ? designTrackerHeight + 32 : 0
            const viewportH = window.innerHeight || 0
            const researchStart = viewportH - researchSpace
            const designStart = viewportH - designSpace

            setPinResearchTracker(
                !!researchRect &&
                researchRect.top <= researchStart &&
                researchRect.bottom >= researchSpace
            )

            setPinDesignTracker(
                !!designRect &&
                designRect.top <= designStart &&
                designRect.bottom >= designSpace
            )
        }

        recompute()
        window.addEventListener('scroll', recompute, {passive: true})
        window.addEventListener('resize', recompute)
        return () => {
            window.removeEventListener('scroll', recompute)
            window.removeEventListener('resize', recompute)
        }
    }, [isMobile, designTrackerHeight, researchTrackerHeight])

    useEffect(() => {
        if (!isMobile) return
        const chip = researchChipRefs.current[activeResearchStep]
        const container = researchTrackerRef.current
        if (!chip || !container) return

        const rect = container.getBoundingClientRect()
        const inView = rect.bottom > 0 && rect.top < (window.innerHeight || 0)
        if (!inView) return

        if (activeResearchStep === 0) {
            container.scrollTo({left: 0, behavior: 'smooth'})
            chip.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'nearest'})
        } else {
            chip.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'})
        }
    }, [activeResearchStep, isMobile])

    useEffect(() => {
        if (!isMobile) return
        const chip = designChipRefs.current[activeDesignStep]
        const container = designTrackerRef.current
        if (!chip || !container) return

        const rect = container.getBoundingClientRect()
        const inView = rect.bottom > 0 && rect.top < (window.innerHeight || 0)
        if (!inView) return

        if (activeDesignStep === 0) {
            container.scrollTo({left: 0, behavior: 'smooth'})
            chip.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'nearest'})
        } else {
            chip.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'})
        }
    }, [activeDesignStep, isMobile])


    useEffect(() => {
        const mapIdToIndex: Record<string, number> = {
            research_flows: 0,
            research_data: 1,
            research_ui: 2,
            research_readout: 3
        }
        const observer = new IntersectionObserver(
                entries => entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id') || ''
                        if (mapIdToIndex[id] !== undefined) setActiveResearchStep(mapIdToIndex[id])
                    }
                }),
                {root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0}
            )
        ;[rStep1Ref.current, rStep2Ref.current, rStep3Ref.current, rStep4Ref.current]
            .filter(Boolean)
            .forEach(n => observer.observe(n as Element))
        return () => observer.disconnect()
    }, [])


    useEffect(() => {
        const TOP_OFFSET = 96
        const MQ_DESKTOP = '(min-width:900px)'

        const recompute = () => {
            const grid = rProcessGridRef.current
            const slot = rStickySlotRef.current
            const inner = rStickyInnerRef.current
            if (!grid || !slot || !inner) return

            const naturalH = inner.scrollHeight
            if (naturalH !== rSlotMinH) setRSlotMinH(naturalH)

            const isDesktop = window.matchMedia(MQ_DESKTOP).matches
            if (!isDesktop) {
                setRStickyStyle({position: 'static'});
                return
            }

            const gridRect = grid.getBoundingClientRect()
            const slotRect = slot.getBoundingClientRect()

            if (gridRect.top > TOP_OFFSET) {
                setRStickyStyle({position: 'static'});
                return
            }

            if (gridRect.bottom - TOP_OFFSET <= naturalH) {
                setRStickyStyle({position: 'absolute', left: 0, right: 0, top: 'auto', bottom: 0, width: '100%'})
                return
            }

            setRStickyStyle({position: 'fixed', top: TOP_OFFSET, left: slotRect.left, width: slotRect.width, zIndex: 5})
        }

        recompute()
        window.addEventListener('scroll', recompute, {passive: true})
        window.addEventListener('resize', recompute)
        const ro = new ResizeObserver(recompute)
        rProcessGridRef.current && ro.observe(rProcessGridRef.current)
        rStickyInnerRef.current && ro.observe(rStickyInnerRef.current)
        return () => {
            window.removeEventListener('scroll', recompute);
            window.removeEventListener('resize', recompute);
            ro.disconnect()
        }
    }, [rSlotMinH])


    const handleBackClick = () => {
        window.location.hash = ''
    }

    const StepChipDesign: React.FC<{ index: number; label: string; title: string }> = ({index, label, title}) => {
        const isActive = activeDesignStep === index
        const theme = useTheme()
        return (
            <Box
                role="link"
                aria-current={isActive ? 'step' : undefined}
                sx={{
                    position: 'relative',
                    p: 1.5,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: isActive
                        ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)')
                        : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)'),
                    background: isActive
                        ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)')
                        : 'transparent',
                    transition: 'all .25s ease',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    cursor: 'pointer',
                    mb: 1.25,
                    boxShadow: isActive ? '0 8px 28px rgba(0,0,0,0.25)' : 'none',
                    '&:hover': {
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)'
                    }
                }}
                onClick={() => {
                    const anchors = [step1Ref.current, step2Ref.current, step3Ref.current]
                    anchors[index]?.scrollIntoView({behavior: 'smooth', block: 'center'})
                }}
            >
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 0.5}}>
                    <StepBadge aria-hidden>{index + 1}</StepBadge>
                    <Box sx={{
                        fontWeight: 900,
                        fontSize: 11,
                        letterSpacing: 0.8,
                        textTransform: 'uppercase',
                        color: theme.palette.text.primary
                    }}>
                        {label}
                    </Box>
                </Box>
                <Box sx={{fontWeight: 900, fontSize: 20, lineHeight: 1.2, color: theme.palette.text.primary}}>
                    {title}
                </Box>
            </Box>
        )
    }

    const StepChipResearch: React.FC<{ index: number; label: string; title: string }> = ({index, label, title}) => {
        const isActive = activeResearchStep === index
        const theme = useTheme()
        return (
            <Box
                role="link"
                aria-current={isActive ? 'step' : undefined}
                sx={{
                    position: 'relative',
                    p: 1.5,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: isActive
                        ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)')
                        : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)'),
                    background: isActive
                        ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)')
                        : 'transparent',
                    transition: 'all .25s ease',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    cursor: 'pointer',
                    mb: 1.25,
                    boxShadow: isActive ? '0 8px 28px rgba(0,0,0,0.25)' : 'none',
                    '&:hover': {
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)'
                    }
                }}
                onClick={() => {
                    const anchors = [rStep1Ref.current, rStep2Ref.current, rStep3Ref.current, rStep4Ref.current]
                    anchors[index]?.scrollIntoView({behavior: 'smooth', block: 'center'})
                }}
            >
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 0.5}}>
                    <StepBadge aria-hidden>{index + 1}</StepBadge>
                    <Box sx={{
                        fontWeight: 900,
                        fontSize: 11,
                        letterSpacing: 0.8,
                        textTransform: 'uppercase',
                        color: theme.palette.text.primary
                    }}>
                        {label}
                    </Box>
                </Box>
                <Box sx={{fontWeight: 900, fontSize: 20, lineHeight: 1.2, color: theme.palette.text.primary}}>
                    {title}
                </Box>
            </Box>
        )
    }

    const StepperRailDesign = (
        <Box sx={{
            position: 'relative', pt: 1, pb: 2, px: 0, '::before': {
                content: '""',
                position: 'absolute',
                left: {md: 12},
                top: 0,
                bottom: 0,
                width: '3px',
                borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'
            }
        }}>
            <Box sx={{pl: {md: 4}}}>
                <StepChipDesign index={0} label="Step one" title="Defining the user flows"/>
                <StepChipDesign index={1} label="Step two" title="Data mapping"/>
                <StepChipDesign index={2} label="Step three" title="UI design decisions"/>
            </Box>
        </Box>
    )

    const StepperRailResearch = (
        <Box sx={{
            position: 'relative', pt: 1, pb: 2, px: 0, '::before': {
                content: '""',
                position: 'absolute',
                left: {md: 12},
                top: 0,
                bottom: 0,
                width: '3px',
                borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'
            }
        }}>
            <Box sx={{pl: {md: 4}}}>
                <StepChipResearch index={0} label="Step one" title="On-Site Research & Contextual Inquiry"/>
                <StepChipResearch index={1} label="Step two" title="Affinity + Process Mapping"/>
                <StepChipResearch index={2} label="Step three" title="Problem Prioritization"/>
                <StepChipResearch index={3} label="Step four" title="Problem Statement Alignment"/>
            </Box>
        </Box>
    )


    return (
        <ProjectPageContainer>

            <GlobalStyles styles={{
                'html, body, #root': {
                    height: 'auto',
                    minHeight: '100%',
                    overflowY: 'auto'
                }
            }}/>

            <BoardContent>

                <ContentWrapper>

                    <HeroSection>
                        <HeroBannerWrapper>
                            <HeroBanner src={medTrackerHeroBanner} alt="hero banner"/>
                            <HeroBannerRight/>
                        </HeroBannerWrapper>

                        <HeroContent>
                            <HeroLogo src={medTrackerLogo} alt="Med Tracker logo"/>

                            <Box sx={{marginTop: '3rem'}}>
                                <Typography sx={{textAlign: "center"}}>
                                    Designed mobile app to Streamline medical inventory process from 18 steps to 5
                                    steps,
                                </Typography>

                                <Typography sx={{textAlign: "center"}}>
                                    improving visibility and decision speed, saving {'>'} 11,000 hours annually
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: {xs: 'column', sm: 'row'},
                                gap: {xs: 3, sm: 6, md: 12},
                                marginTop: 12,
                                marginBottom: 4,
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: {xs: 'center', sm: 'flex-start'}
                                }}>
                                    <Typography fontWeight={'200'}>Role</Typography>
                                    <Typography fontWeight={'600'}>UX Designer</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: {xs: 'center', sm: 'flex-start'}
                                }}>
                                    <Typography fontWeight={'200'}>Team</Typography>
                                    <Typography fontWeight={'600'}>6 Eng, 2 Design, 1 PM</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: {xs: 'center', sm: 'flex-start'}
                                }}>
                                    <Typography fontWeight={'200'}>Timeline</Typography>
                                    <Typography fontWeight={'600'}>6 months</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: {xs: 'center', sm: 'flex-start'}
                                }}>
                                    <Typography fontWeight={'200'}>Tools/Skills</Typography>
                                    <Typography fontWeight={'600'}>Mobile, Dataviz, x</Typography>
                                </Box>
                            </Box>

                            <SectionDivider/>
                        </HeroContent>

                        <Box sx={{marginY: 6, width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <IPhoneCarousel
                                images={[iphone1, iphone2, iphone3, iphone4, iphone5]}
                                height={680}
                            />
                        </Box>
                    </HeroSection>

                    <SectionDivider/>

                    <Section id="research" ref={researchSectionRef}>
                        <SectionTitle>Research</SectionTitle>

                        {/* Mobile Sticky Step Tracker for Research */}
                        <MobileStepSpacer $height={pinResearchTracker ? researchTrackerHeight : 0}/>
                        <MobileStepTracker ref={researchTrackerRef} $pinned={pinResearchTracker}>
                            <MobileStepTrackInner>
                                <MobileStepChip
                                    $active={activeResearchStep === 0}
                                    ref={(el) => setResearchChipRef(el, 0)}
                                    onClick={() => rStep1Ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'})}
                                >
                                    <MobileStepBadge $active={activeResearchStep === 0}>1</MobileStepBadge>
                                    <MobileStepLabel>On-Site Research</MobileStepLabel>
                                </MobileStepChip>
                                <MobileStepChip
                                    $active={activeResearchStep === 1}
                                    ref={(el) => setResearchChipRef(el, 1)}
                                    onClick={() => rStep2Ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'})}
                                >
                                    <MobileStepBadge $active={activeResearchStep === 1}>2</MobileStepBadge>
                                    <MobileStepLabel>Affinity Mapping</MobileStepLabel>
                                </MobileStepChip>
                                <MobileStepChip
                                    $active={activeResearchStep === 2}
                                    ref={(el) => setResearchChipRef(el, 2)}
                                    onClick={() => rStep3Ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'})}
                                >
                                    <MobileStepBadge $active={activeResearchStep === 2}>3</MobileStepBadge>
                                    <MobileStepLabel>Prioritization</MobileStepLabel>
                                </MobileStepChip>
                                <MobileStepChip
                                    $active={activeResearchStep === 3}
                                    ref={(el) => setResearchChipRef(el, 3)}
                                    onClick={() => rStep4Ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'})}
                                >
                                    <MobileStepBadge $active={activeResearchStep === 3}>4</MobileStepBadge>
                                    <MobileStepLabel>Problem Statement</MobileStepLabel>
                                </MobileStepChip>
                            </MobileStepTrackInner>
                        </MobileStepTracker>

                        <SectionContent>
                            <Box
                                ref={rProcessGridRef}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {xs: '1fr', md: '320px 1fr'},
                                    gap: {xs: 2, md: 4},
                                    alignItems: 'start',
                                    position: 'relative'
                                }}
                            >
                                <Box
                                    ref={rStickySlotRef}
                                    sx={{
                                        display: {xs: 'none', md: 'block'},
                                        position: 'relative',
                                        alignSelf: 'start',
                                        minHeight: {md: rSlotMinH || 'auto'}
                                    }}
                                >
                                    <Box ref={rStickyInnerRef} style={rStickyStyle}>
                                        {StepperRailResearch}
                                    </Box>
                                </Box>

                                <Box sx={{display: 'grid', gap: 8}}>
                                    <StepPanel
                                        id="research_flows"
                                        ref={rStep1Ref}
                                        data-step="R1"
                                        $active={activeResearchStep === 0}
                                        aria-current={activeResearchStep === 0 ? 'true' : undefined}
                                    >
                                        <StepHeader>
                                            <StepBadge aria-hidden>1</StepBadge>
                                            <div>
                                                <div className="eyebrow">STEP ONE</div>
                                                <h3>On‑Site Research & Contextual Inquiry</h3></div>
                                        </StepHeader>

                                        <StepContent>
                                            <Box
                                                sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns: {xs: '1fr', md: '1.5fr 1fr'},
                                                    columnGap: {xs: 2, md: 4},
                                                    alignItems: {md: 'start'}
                                                }}
                                            >
                                                <Box>
                                                    <TextBlock as="div">
                                                        We embedded with medical logistics and engineering teams to
                                                        observe real workflows from intake to disposition.
                                                    </TextBlock>

                                                    <div className="bullet-h" style={{marginTop: 16}}>What we did</div>
                                                    <ListItem>Stakeholder & user interviews across 3 key
                                                        roles</ListItem>
                                                    <ListItem>Contextual inquiry in active warehouses</ListItem>
                                                    <ListItem>Captured task flows, tools, and pain points</ListItem>

                                                    <div className="bullet-h" style={{marginTop: 16}}>Key insights</div>
                                                    <ListItem>No standardized in-processing or disposition
                                                        workflow</ListItem>
                                                    <ListItem>18+ manual steps per med box, paper
                                                        reconciliation</ListItem>
                                                    <ListItem>Limited visibility into SMs in inventory</ListItem>

                                                    <div className="bullet-h" style={{marginTop: 16}}>Impact</div>
                                                    <TextBlock as="div" style={{marginTop: 4}}>
                                                        Surfaced systemic bottlenecks that informed the redesign
                                                        priorities and readiness metrics.
                                                    </TextBlock>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: {xs: 'center', md: 'flex-end'},
                                                        alignItems: 'start',
                                                        mt: {xs: 2, md: 0}
                                                    }}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={researchPic1}
                                                        alt="On-site research photos"
                                                        loading="lazy"
                                                        sx={{
                                                            width: 'auto',
                                                            height: 'auto',
                                                            maxWidth: {xs: '100%', md: '280px'},
                                                            maxHeight: {md: '420px'},
                                                            display: 'block',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </StepContent>
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
                                            <div>
                                                <div className="eyebrow">STEP TWO</div>
                                                <h3>Affinity + Process Mapping</h3></div>
                                        </StepHeader>

                                        <StepContent>
                                            <TextBlock as="div" style={{marginBottom: 16}}>
                                                We synthesized observations into affinity clusters and built a
                                                comprehensive as-is map of every task, decision, and dependency.
                                            </TextBlock>

                                            <div className="bullet-h">What we produced</div>
                                            <ListItem>Current-state process map with annotated pain points</ListItem>
                                            <ListItem>Affinity board clustering themes: redundancy, ownership, data
                                                fragmentation</ListItem>
                                            <ListItem>Workshop outcomes aligning Eng + Ops on opportunities</ListItem>

                                            <div className="bullet-h" style={{marginTop: 16}}>Impact</div>
                                            <TextBlock as="div" style={{marginTop: 4}}>
                                                Created a shared understanding of how things actually work — a single
                                                reference that grounded the redesign phase.
                                            </TextBlock>

                                            <Box
                                                sx={{
                                                    mt: 3,
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={researchPic2}
                                                    alt="Process map"
                                                    loading="lazy"
                                                    sx={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        maxWidth: '100%',
                                                        display: 'block'
                                                    }}
                                                />
                                            </Box>
                                        </StepContent>
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
                                            <div>
                                                <div className="eyebrow">STEP THREE</div>
                                                <h3>Problem Prioritization</h3></div>
                                        </StepHeader>

                                        <StepContent>
                                            <Box
                                                sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns: {xs: '1fr', md: '1.5fr 1fr'},
                                                    columnGap: {xs: 2, md: 4},
                                                    alignItems: {md: 'start'}
                                                }}
                                            >
                                                <Box>
                                                    <div className="bullet-h">Top User Pains</div>
                                                    <ListItem>Lack of Visibility into inventory</ListItem>
                                                    <ListItem>Doesn't allow for easy collaboration</ListItem>
                                                    <ListItem>Expired and excess inventory undetected</ListItem>
                                                    <ListItem>Excessive time spent on inventory management</ListItem>

                                                    <div className="bullet-h" style={{marginTop: 16}}>Top prioritized
                                                        problems to solve
                                                    </div>
                                                    <ListItem>In-processing inventory</ListItem>
                                                    <ListItem>Reduce Cycle Time/Increase Automation</ListItem>
                                                    <ListItem>Tracking Expired Inventory</ListItem>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: {xs: 'center', md: 'flex-end'},
                                                        alignItems: 'start',
                                                        mt: {xs: 2, md: 0}
                                                    }}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={researchPic3}
                                                        alt="Problem prioritization visualization"
                                                        loading="lazy"
                                                        sx={{
                                                            width: 'auto',
                                                            height: 'auto',
                                                            maxWidth: {xs: '100%', md: '280px'},
                                                            maxHeight: {md: '320px'},
                                                            display: 'block',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </StepContent>
                                    </StepPanel>

                                    <StepPanel
                                        id="research_readout"
                                        ref={rStep4Ref}
                                        data-step="R4"
                                        $active={activeResearchStep === 3}
                                        aria-current={activeResearchStep === 3 ? 'true' : undefined}
                                    >
                                        <StepHeader>
                                            <StepBadge aria-hidden>4</StepBadge>
                                            <div>
                                                <div className="eyebrow">STEP FOUR</div>
                                                <h3>Problem Statement Alignment</h3></div>
                                        </StepHeader>

                                        <StepContent>
                                            <Box sx={{mb: 3}}>
                                                <div className="bullet-h">Problem Statement</div>
                                                <TextBlock as="div" style={{marginTop: 4}}>
                                                    as a warehouse worker, <BoldText>I don't know what viable supplies
                                                    we have</BoldText> which leads to the sets not being ready to
                                                    deploy, or wasting of $Ms of items
                                                </TextBlock>
                                            </Box>

                                            <Box
                                                sx={{
                                                    mt: 3,
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={researchPic4}
                                                    alt="User process and system flow diagrams"
                                                    loading="lazy"
                                                    sx={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        maxWidth: '100%',
                                                        display: 'block'
                                                    }}
                                                />
                                            </Box>
                                        </StepContent>
                                    </StepPanel>
                                </Box>
                            </Box>
                        </SectionContent>
                    </Section>

                    <SectionDivider/>

                    <Section id="design" ref={designSectionRef}>
                        <SectionTitle>Design</SectionTitle>

                        {/* Mobile Sticky Step Tracker for Design */}
                        <MobileStepSpacer $height={pinDesignTracker ? designTrackerHeight : 0}/>
                        <MobileStepTracker ref={designTrackerRef} $pinned={pinDesignTracker}>
                            <MobileStepTrackInner>
                                <MobileStepChip
                                    $active={activeDesignStep === 0}
                                    ref={(el) => setDesignChipRef(el, 0)}
                                    onClick={() => step1Ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'})}
                                >
                                    <MobileStepBadge $active={activeDesignStep === 0}>1</MobileStepBadge>
                                    <MobileStepLabel>User Flows</MobileStepLabel>
                                </MobileStepChip>
                                <MobileStepChip
                                    $active={activeDesignStep === 1}
                                    ref={(el) => setDesignChipRef(el, 1)}
                                    onClick={() => step2Ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'})}
                                >
                                    <MobileStepBadge $active={activeDesignStep === 1}>2</MobileStepBadge>
                                    <MobileStepLabel>Data Mapping</MobileStepLabel>
                                </MobileStepChip>
                                <MobileStepChip
                                    $active={activeDesignStep === 2}
                                    ref={(el) => setDesignChipRef(el, 2)}
                                    onClick={() => step3Ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'})}
                                >
                                    <MobileStepBadge $active={activeDesignStep === 2}>3</MobileStepBadge>
                                    <MobileStepLabel>UI Design</MobileStepLabel>
                                </MobileStepChip>
                            </MobileStepTrackInner>
                        </MobileStepTracker>

                        <SectionContent>
                            <Box
                                ref={processGridRef}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {xs: '1fr', md: '320px 1fr'},
                                    gap: {xs: 2, md: 4},
                                    alignItems: 'start',
                                    position: 'relative'
                                }}
                            >

                                <Box
                                    ref={stickySlotRef}
                                    sx={{
                                        display: {xs: 'none', md: 'block'},
                                        position: 'relative',
                                        alignSelf: 'start',
                                        minHeight: {md: slotMinH || 'auto'}
                                    }}
                                >
                                    <Box ref={stickyInnerRef} style={stickyStyle}>
                                        {StepperRailDesign}
                                    </Box>
                                </Box>


                                <Box sx={{display: 'grid', gap: 8}}>

                                    <StepPanel
                                        id="step_flows"
                                        ref={step1Ref}
                                        data-step="1"
                                        $active={activeDesignStep === 0}
                                        aria-current={activeDesignStep === 0 ? 'true' : undefined}
                                    >
                                        <StepHeader>
                                            <StepBadge aria-hidden>1</StepBadge>
                                            <div>
                                                <div className="eyebrow">STEP ONE</div>
                                                <h3>Defining the user flows</h3></div>
                                        </StepHeader>

                                        <StepContent>

                                            <Box
                                                sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns: {
                                                        xs: '1fr',
                                                        md: 'minmax(0,1.18fr) minmax(0,0.82fr)'
                                                    },
                                                    columnGap: {xs: 2, md: 3},
                                                    alignItems: {md: 'stretch'}
                                                }}
                                            >

                                                <Box ref={step1TextColRef} sx={{pr: {md: 1}}}>
                                                    <TextBlock as="div" className="bullet-p">
                                                        We mapped the end-to-end tasks and decision points across roles
                                                        to minimize hops and context
                                                        switching. The baseline contained 18 steps across in-processing,
                                                        picking, packing, and
                                                        disposition. We collapsed redundant actions and clarified
                                                        ownership to target a “3-clicks-or-less”
                                                        path to core tasks.
                                                    </TextBlock>

                                                    <div className="bullet-h" style={{marginTop: 8}}>Artifacts</div>
                                                    <ListItem>As-is / to-be flow diagrams per role</ListItem>
                                                    <ListItem>Task inventory &amp; success metrics</ListItem>
                                                    <ListItem>Entry/exit criteria for each stage</ListItem>

                                                    <div className="bullet-h" style={{marginTop: 14}}>Decisions</div>
                                                    <ListItem>Prioritized flows: in-processing, packing,
                                                        disposition</ListItem>
                                                    <ListItem>Kept familiar cues; removed dead-ends</ListItem>
                                                    <ListItem>Introduced readiness &amp; expiration</ListItem>
                                                </Box>


                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: {xs: 'center', md: 'flex-end'},
                                                        pr: {md: 1},
                                                        mt: {xs: 2, md: 0},
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
                                                            maxWidth: {xs: 'min(92%, 460px)', md: 'min(100%, 680px)'},
                                                            maxHeight: {md: step1ImgMaxH ? `${step1ImgMaxH}px` : 'none'},
                                                            display: 'block',
                                                            borderRadius: 2,
                                                            border: '1px solid rgba(255,255,255,0.12)',
                                                            boxShadow: '0 20px 44px rgba(0,0,0,.55)'
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </StepContent>
                                    </StepPanel>


                                    <StepPanel
                                        id="step_data"
                                        ref={step2Ref}
                                        data-step="2"
                                        $active={activeDesignStep === 1}
                                        aria-current={activeDesignStep === 1 ? 'true' : undefined}
                                    >
                                        <StepHeader>
                                            <StepBadge aria-hidden>2</StepBadge>
                                            <div>
                                                <div className="eyebrow">STEP TWO</div>
                                                <h3>Data Mapping</h3></div>
                                        </StepHeader>

                                        <StepContent>
                                            <TwoColumn>
                                                <div>
                                                    <TextBlock as="div" className="bullet-p">
                                                        With engineering, we defined the schema that powers search, bulk
                                                        updates, and expiration
                                                        reporting. Required vs. optional fields were clarified, and
                                                        system-derived values were introduced
                                                        to automate previously manual reporting.
                                                    </TextBlock>

                                                    <div className="bullet-h" style={{marginTop: 8}}>What we mapped
                                                    </div>
                                                    <ListItem>Item → Lot → Set relationships &amp; ownership</ListItem>
                                                    <ListItem>Required fields, validation, and defaults</ListItem>
                                                    <ListItem>Primary/secondary keys for edits &amp; bulk ops</ListItem>

                                                    <div className="bullet-h" style={{marginTop: 14}}>Why it matters
                                                    </div>
                                                    <ListItem>Reliable readiness signals per unit</ListItem>
                                                    <ListItem>Automated expiration &amp; disposition
                                                        reporting</ListItem>
                                                    <ListItem>Fast, conflict-free updates from mobile</ListItem>
                                                </div>


                                                <Box
                                                    sx={{
                                                        alignSelf: 'start',
                                                        p: 2,
                                                        borderRadius: 2,
                                                        background: 'rgba(255,255,255,0.06)',
                                                        border: '1px solid rgba(255,255,255,0.12)'
                                                    }}
                                                >
                                                    <div style={{fontWeight: 800, fontSize: 14, marginBottom: 8}}>data
                                                        to include
                                                    </div>
                                                    <ul style={{margin: 0, paddingLeft: 16, lineHeight: 1.6}}>
                                                        <li>all items expiring</li>
                                                        <li>item #</li>
                                                        <li>QTY</li>
                                                        <li>expiration</li>
                                                        <li>lot</li>
                                                        <li>set</li>
                                                        <li>box #</li>
                                                    </ul>

                                                    <div style={{height: 10}}/>

                                                    <div style={{fontWeight: 800, fontSize: 14, marginBottom: 8}}>User
                                                        visualization needs
                                                    </div>
                                                    <ul style={{margin: 0, paddingLeft: 16, lineHeight: 1.6}}>
                                                        <li>all items expiring</li>
                                                        <li>quantities</li>
                                                        <li>NSN/ NDC</li>
                                                        <li>a way to copy and paste into ordering systems</li>
                                                    </ul>
                                                </Box>
                                            </TwoColumn>
                                        </StepContent>
                                    </StepPanel>


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

                                        <StepContent>

                                            <Box
                                                sx={{
                                                    display: 'grid',

                                                    gridTemplateColumns: {
                                                        xs: '1fr',
                                                        md: 'minmax(420px, 1fr) minmax(0, 0.9fr)'
                                                    },
                                                    columnGap: {xs: 2, md: 4},
                                                    alignItems: {md: 'stretch'}
                                                }}
                                            >

                                                <Box ref={step3TextColRef} sx={{pr: {md: 1}}}>
                                                    <div className="bullet-h">Mobile First</div>
                                                    <div className="bullet-p">saves users time of going back and forth
                                                    </div>

                                                    <div className="bullet-h">Updates real time</div>
                                                    <div className="bullet-p">Enables collaboration and data
                                                        visibility
                                                    </div>

                                                    <div className="bullet-h">Visual Indicators</div>
                                                    <div className="bullet-p">Quick to understand and act on</div>

                                                    <div className="bullet-h">User Validated</div>
                                                    <div className="bullet-p">Rapid prototyping → field testing →
                                                        updates
                                                    </div>

                                                    <div className="bullet-h">3 Clicks or less</div>
                                                    <div className="bullet-p">
                                                        Bottom Nav design + Search allow for 3 clicks or less to get
                                                        main user flows complete
                                                    </div>
                                                </Box>


                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: {xs: 'center', md: 'flex-end'},
                                                        alignItems: 'center',
                                                        pr: {md: 1},
                                                        mt: {xs: 2, md: 0},
                                                        height: '100%'
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

                                                            maxWidth: {xs: 'min(92%, 420px)', md: 'min(100%, 640px)'},

                                                            maxHeight: {md: step3ImgMaxH ? `${step3ImgMaxH}px` : 'none'},
                                                            display: 'block',
                                                            borderRadius: 2,
                                                            border: '1px solid rgba(255,255,255,0.12)',
                                                            filter: 'drop-shadow(0 20px 44px rgba(0,0,0,.55))'
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </StepContent>
                                    </StepPanel>

                                </Box>
                            </Box>
                        </SectionContent>
                    </Section>

                    <SectionDivider/>


                    <Section>
                        <SectionTitle>Solution</SectionTitle>
                        <SectionContent>
                            <TextBlock>
                                MedTracker is a mobile-first web app with real-time updates, visual indicators, and
                                three-clicks-or-less
                                access to the core jobs.
                            </TextBlock>

                            <TwoColumn>

                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                    <h4>Inventory</h4>
                                    <Box
                                        component="img"
                                        src={inventoryImg}
                                        alt="Inventory flows: list, detail, and edit screens"
                                        loading="lazy"
                                        sx={{
                                            height: {xs: 220, sm: 260, md: 360},
                                            width: 'auto',
                                            maxWidth: '100%',
                                            display: 'block',
                                            mx: 'auto',
                                            borderRadius: 2,
                                        }}
                                    />
                                </Box>


                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                    <h4>Sets</h4>
                                    <Box
                                        component="img"
                                        src={setsImg}
                                        alt="Sets flows: set overview, type groups, and items"
                                        loading="lazy"
                                        sx={{
                                            height: {xs: 220, sm: 260, md: 360},
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

                    <SectionDivider/>


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
            <FloatingTopNav/>
        </ProjectPageContainer>
    )
}
