// MedTrackerProjectPage.tsx
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import Konva from 'konva'
import { Stage, Layer, Rect } from 'react-konva'
import Box from '@mui/material/Box'
import DelightfulToolbar from '../../components/DelightfulToolbar/DelightfulToolbar'
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle'
import EmojiPicker from '../../components/EmojiPicker/EmojiPicker'
import EmojiBrushOverlay from '../../components/EmojiBrushOverlay/EmojiBrushOverlay'
import EmojiObject from '../../components/EmojiObject/EmojiObject'
import { usePointerOverlay } from '../../hooks/usePointerOverlay'
import { useZoomPan } from '../../hooks/useZoomPan'
import { useWandEmojis, WAND_LIFETIME, WAND_TRAVEL_DISTANCE } from '../../hooks/useWandEmojis'
import { useEmojiTool } from '../../hooks/useEmojiTool'
import ZoomControls from '../../components/ZoomControls/ZoomControls'
import { ZoomPanContext } from '../../context/ZoomPanContext'
import { useDisableBrowserZoom } from '../../hooks/useDisableBrowserZoom'
import CursorChat from '../../components/CursorChat/CursorChat'
import FastWaveCursor from '../../components/FastWaveCursor/FastWaveCursor'
import CommentingLayer from '../../components/CommentingLayer/CommentingLayer'
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
    HeroMetaList,
    HeroMetaKey,
    HeroMetaVal,
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
    StatDescription
} from './MedTrackerProjectPage.styles'
import FloatingTopNav from "../../components/FloatingTopNav/FloatingTopNav";
import medTrackerLogo from '../../assets/images/MedTracker-Logo.png'
import iphoneRefraction from '../../assets/images/iphone-refraction.png'

export default function ProjectPage() {
    const stageRef = useRef<Konva.Stage>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const [boardHeight, setBoardHeight] = useState<number>(() =>
        typeof window !== 'undefined' ? window.innerHeight : 1000
    )

    useLayoutEffect(() => {
        const updateBoardHeight = () => {
            const el = contentRef.current
            if (!el) return
            setBoardHeight(el.scrollHeight)
        }

        updateBoardHeight()

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver(updateBoardHeight)
            if (contentRef.current) observer.observe(contentRef.current)
            return () => observer.disconnect()
        } else {
            window.addEventListener('resize', updateBoardHeight)
            return () => window.removeEventListener('resize', updateBoardHeight)
        }
    }, [])

    const {
        stageScale,
        stagePos,
        setStagePos,
        setStageScale,
        clampStagePosition,
        handleWheel,
        handleTouchMove,
        handleTouchEnd,
        zoomIn,
        zoomOut
    } = useZoomPan(boardHeight)

    const prevTouchRef = useRef<{
        touches: Touch[]
        distance?: number
        midpoint?: { x: number; y: number }
        time: number
    } | null>(null)

    const panStateRef = useRef<{
        pointerId: number | null
        origin: { x: number; y: number }
        stageStart: { x: number; y: number }
    }>({
        pointerId: null,
        origin: { x: 0, y: 0 },
        stageStart: { x: 0, y: 0 }
    })

    const wandActiveRef = useRef(false)

    const { showOverlay, setShowOverlay, overlayPos } = usePointerOverlay()
    const {
        activeTool,
        handleToolChange,
        emojiPickerOpen,
        stampEmojis,
        smileyEmojis,
        selectedEmoji,
        handleSelectEmoji,
        emojiButtonRect,
        setEmojiButtonRect,
        emojiSubMode,
        handleSetSubMode,
        objects,
        handleStamp
    } = useEmojiTool({ stageRef })
    const { wandEmojis, handleStageMouseDown, handleStageMouseUp, handleStageMouseLeave } =
        useWandEmojis({
            stageRef,
            activeTool,
            emojiSubMode,
            selectedEmoji
        })

    const activeToolRef = useRef(activeTool)
    useEffect(() => {
        activeToolRef.current = activeTool
    }, [activeTool])

    const emojiSubModeRef = useRef(emojiSubMode)
    useEffect(() => {
        emojiSubModeRef.current = emojiSubMode
    }, [emojiSubMode])

    const stagePosRef = useRef(stagePos)
    useEffect(() => {
        stagePosRef.current = stagePos
    }, [stagePos])

    const clampStagePositionRef = useRef(clampStagePosition)
    useEffect(() => {
        clampStagePositionRef.current = clampStagePosition
    }, [clampStagePosition])

    const handleStageMouseDownRef = useRef(handleStageMouseDown)
    useEffect(() => {
        handleStageMouseDownRef.current = handleStageMouseDown
    }, [handleStageMouseDown])

    const handleStageMouseUpRef = useRef(handleStageMouseUp)
    useEffect(() => {
        handleStageMouseUpRef.current = handleStageMouseUp
    }, [handleStageMouseUp])

    const handleStageMouseLeaveRef = useRef(handleStageMouseLeave)
    useEffect(() => {
        handleStageMouseLeaveRef.current = handleStageMouseLeave
    }, [handleStageMouseLeave])

    const handleStampRef = useRef(handleStamp)
    useEffect(() => {
        handleStampRef.current = handleStamp
    }, [handleStamp])

    const handleWheelRef = useRef(handleWheel)
    useEffect(() => {
        handleWheelRef.current = handleWheel
    }, [handleWheel])

    const handleTouchMoveRef = useRef(handleTouchMove)
    useEffect(() => {
        handleTouchMoveRef.current = handleTouchMove
    }, [handleTouchMove])

    const handleTouchEndRef = useRef(handleTouchEnd)
    useEffect(() => {
        handleTouchEndRef.current = handleTouchEnd
    }, [handleTouchEnd])

    useDisableBrowserZoom()

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const shouldIgnoreInteraction = (target: EventTarget | null) => {
            if (!(target instanceof HTMLElement)) return false
            return Boolean(
                target.closest('[data-ignore-comment], [data-ignore-stage], [data-ignore-interaction]')
            )
        }

        const updatePointerFromEvent = (evt: PointerEvent | WheelEvent | TouchEvent) => {
            const stage = stageRef.current
            if (!stage) return
            stage.setPointersPositions(evt as any)
        }

        const handlePointerDown = (evt: PointerEvent) => {
            if (shouldIgnoreInteraction(evt.target)) return
            updatePointerFromEvent(evt)

            if (activeToolRef.current === 'commenting-cursor') return

            if (activeToolRef.current === 'hand') {
                panStateRef.current = {
                    pointerId: evt.pointerId,
                    origin: { x: evt.clientX, y: evt.clientY },
                    stageStart: { ...stagePosRef.current }
                }
                container.setPointerCapture?.(evt.pointerId)
                evt.preventDefault()
                return
            }

            if (activeToolRef.current === 'emoji') {
                if (emojiSubModeRef.current === 'wand') {
                    wandActiveRef.current = true
                    handleStageMouseDownRef.current()
                } else {
                    handleStampRef.current()
                }
                evt.preventDefault()
            }
        }

        const handlePointerMove = (evt: PointerEvent) => {
            updatePointerFromEvent(evt)
            const panState = panStateRef.current
            if (panState.pointerId === evt.pointerId) {
                const deltaX = evt.clientX - panState.origin.x
                const deltaY = evt.clientY - panState.origin.y
                const nextX = panState.stageStart.x + deltaX
                const nextY = clampStagePositionRef.current(panState.stageStart.y + deltaY)
                setStagePos({ x: nextX, y: nextY })
                evt.preventDefault()
            }
        }

        const endPointerInteraction = (evt?: PointerEvent) => {
            const pointerId = evt ? evt.pointerId : null
            const panState = panStateRef.current
            if (pointerId !== null && panState.pointerId === pointerId) {
                container.releasePointerCapture?.(pointerId)
                panStateRef.current = {
                    pointerId: null,
                    origin: { x: 0, y: 0 },
                    stageStart: { ...stagePosRef.current }
                }
            }

            if (wandActiveRef.current) {
                handleStageMouseUpRef.current()
                wandActiveRef.current = false
            }
        }

        const handlePointerUp = (evt: PointerEvent) => {
            endPointerInteraction(evt)
        }

        const handlePointerCancel = (evt: PointerEvent) => {
            endPointerInteraction(evt)
            handleStageMouseLeaveRef.current()
        }

        const handleWheelEvent = (evt: WheelEvent) => {
            updatePointerFromEvent(evt)
            const konvaEvent = { evt } as Konva.KonvaEventObject<WheelEvent>
            handleWheelRef.current(konvaEvent, stageRef)
        }

        const handleTouchMoveEvent = (evt: TouchEvent) => {
            if (activeToolRef.current === 'commenting-cursor') return
            updatePointerFromEvent(evt)
            const konvaEvent = { evt } as Konva.KonvaEventObject<TouchEvent>
            handleTouchMoveRef.current(konvaEvent, stageRef, prevTouchRef)
        }

        const handleTouchEndEvent = () => {
            handleTouchEndRef.current(prevTouchRef)
            if (wandActiveRef.current) {
                handleStageMouseUpRef.current()
                wandActiveRef.current = false
            }
        }

        container.addEventListener('pointerdown', handlePointerDown, { passive: false })
        container.addEventListener('pointermove', handlePointerMove, { passive: false })
        container.addEventListener('pointerup', handlePointerUp, { passive: false })
        container.addEventListener('pointerleave', handlePointerCancel, { passive: false })
        container.addEventListener('pointercancel', handlePointerCancel, { passive: false })
        container.addEventListener('wheel', handleWheelEvent, { passive: false })
        container.addEventListener('touchmove', handleTouchMoveEvent, { passive: false })
        container.addEventListener('touchend', handleTouchEndEvent, { passive: false })
        container.addEventListener('touchcancel', handleTouchEndEvent, { passive: false })

        return () => {
            container.removeEventListener('pointerdown', handlePointerDown)
            container.removeEventListener('pointermove', handlePointerMove)
            container.removeEventListener('pointerup', handlePointerUp)
            container.removeEventListener('pointerleave', handlePointerCancel)
            container.removeEventListener('pointercancel', handlePointerCancel)
            container.removeEventListener('wheel', handleWheelEvent)
            container.removeEventListener('touchmove', handleTouchMoveEvent)
            container.removeEventListener('touchend', handleTouchEndEvent)
            container.removeEventListener('touchcancel', handleTouchEndEvent)
        }
    }, [setStagePos])

    useEffect(() => {
        setShowOverlay(activeTool === 'emoji')
    }, [activeTool, setShowOverlay])

    const handleBackClick = () => {
        window.location.hash = ''
    }

    const resetView = () => {
        setStageScale(1)
        setStagePos({ x: 0, y: 0 })
    }

    // Sticky Process Stepper state (kept as-is for later sections)
    const [activeStep, setActiveStep] = useState<number>(0)
    const step1Ref = useRef<HTMLDivElement>(null)
    const step2Ref = useRef<HTMLDivElement>(null)
    const step3Ref = useRef<HTMLDivElement>(null)

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
            {
                root: null,
                rootMargin: '-35% 0px -50% 0px',
                threshold: 0.25
            }
        )
        const nodes = [step1Ref.current, step2Ref.current, step3Ref.current].filter(Boolean) as Element[]
        nodes.forEach((n) => observer.observe(n))
        return () => observer.disconnect()
    }, [])

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
                    borderColor: isActive ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
                    background: isActive
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))'
                        : 'transparent',
                    transition: 'all .25s ease',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    cursor: 'pointer',
                    mb: 1.25,
                    boxShadow: isActive ? '0 6px 24px rgba(0,0,0,0.25)' : 'none',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.22)' }
                }}
                onClick={() => {
                    const anchors = [step1Ref.current, step2Ref.current, step3Ref.current]
                    const anchor = anchors[index]
                    if (!anchor) return
                    const rect = anchor.getBoundingClientRect()
                    const anchorCenter = rect.top + rect.height / 2
                    const viewportCenter = window.innerHeight / 2
                    const delta = viewportCenter - anchorCenter
                    setStagePos((prev) => ({
                        x: prev.x,
                        y: clampStagePosition(prev.y + delta / stageScale)
                    }))
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Box
                        sx={{
                            fontFamily: 'ui-rounded, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
                            fontWeight: 700,
                            fontSize: 12,
                            letterSpacing: 0.6,
                            textTransform: 'uppercase',
                            opacity: 0.8
                        }}
                    >
                        {label}
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: 0.5,
                        fontWeight: 800,
                        fontSize: 22,
                        lineHeight: 1.15
                    }}
                >
                    {title}
                </Box>
            </Box>
        )
    }

    return (
        <ZoomPanContext.Provider value={{ stageRef, stageScale, setStageScale, stagePos, setStagePos, clampStagePosition, zoomIn, zoomOut }}>
            <ProjectPageContainer ref={containerRef}>
                {/* Konva decorative stage */}
                <Stage
                    ref={stageRef}
                    x={stagePos.x}
                    y={stagePos.y}
                    scaleX={stageScale}
                    scaleY={stageScale}
                    width={typeof window !== 'undefined' ? window.innerWidth : 0}
                    height={typeof window !== 'undefined' ? window.innerHeight : 0}
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
                >
                    <Layer listening={false}>
                        <Rect width={window.innerWidth} height={window.innerHeight} fill="#000000" opacity={0} />
                        {objects.map((obj) =>
                            !obj.src ? null : (
                                <EmojiObject scale={1.5} key={obj.id} src={obj.src!} x={obj.x} y={obj.y} />
                            )
                        )}
                        {wandEmojis.map((we) => {
                            const elapsed = performance.now() - we.bornAt
                            const progress = Math.min(elapsed / WAND_LIFETIME, 1)
                            const offsetX = WAND_TRAVEL_DISTANCE * progress * Math.sin(we.floatAngle)
                            const offsetY = -WAND_TRAVEL_DISTANCE * progress * Math.cos(we.floatAngle)
                            const currentX = we.x + offsetX
                            const currentY = we.y + offsetY
                            const currentOpacity = 1 - progress

                            return (
                                <EmojiObject
                                    key={we.id}
                                    src={we.src}
                                    x={currentX}
                                    y={currentY}
                                    rotation={we.rotation}
                                    opacity={currentOpacity}
                                    scale={1.5}
                                />
                            )
                        })}
                    </Layer>
                </Stage>

                <BoardContent
                    style={{
                        transform: `translate(${stagePos.x}px, ${stagePos.y}px) scale(${stageScale})`,
                        transformOrigin: 'top left'
                    }}
                >
                    <ContentWrapper ref={contentRef}>
                        <BackButton data-ignore-stage onClick={handleBackClick}>← Back to Portfolio</BackButton>

                        {/* HERO — refraction layout */}
                        <HeroSection>
                            <HeroLogo src={medTrackerLogo} alt="Med Tracker logo" />
                            <HeroBadge>VMware by Broadcom</HeroBadge>

                            <HeroGrid>
                                <HeroDevices src={iphoneRefraction} alt="MedTracker iPhone screens" />

                                <Box sx={{ justifySelf: 'center' }}>
                                    <HeroMetaList>
                                        <HeroMetaKey>Project Type</HeroMetaKey>
                                        <HeroMetaVal>Medical Inventory Tracking, 0–1</HeroMetaVal>

                                        <HeroMetaKey>Timeline</HeroMetaKey>
                                        <HeroMetaVal>6 months</HeroMetaVal>

                                        <HeroMetaKey>Team</HeroMetaKey>
                                        <HeroMetaVal>6 Eng, 2 Design, 1 PM</HeroMetaVal>

                                        <HeroMetaKey>Impact</HeroMetaKey>
                                        <HeroMetaVal>$4M saved annually · 11k+ work hours saved yearly</HeroMetaVal>
                                    </HeroMetaList>
                                </Box>
                            </HeroGrid>

                            <HeroDescription>
                                Limited tooling and fragmented workflows reduced visibility into <BoldText>$12M</BoldText> of on-hand medical
                                inventory—introducing risk to supply accuracy and readiness. MedTracker reimagines the end-to-end lifecycle
                                (in-processing → picking/packing → disposition) with a mobile-first, real-time system that surfaces what matters
                                fast and enables collaboration across units. <i>Data and terminology adjusted for security/legal reasons.</i>
                            </HeroDescription>
                        </HeroSection>

                        <SectionDivider />

                        {/* PROBLEM OVERVIEW */}
                        <Section>
                            <SectionTitle>Problem Overview</SectionTitle>
                            <SectionContent>
                                <TextBlock>
                                    Users relied on desktop spreadsheets with dozens of tabs to manage time-sensitive supplies. Expired and excess
                                    inventory went undetected; expiration reporting was manual and slow; and preparing a MED box for deployment
                                    took 18 steps end-to-end. The result: poor visibility, duplication of effort, and readiness risk.
                                </TextBlock>
                                <TwoColumn>
                                    <div>
                                        <h4>User Process</h4>
                                        <ListItem>In-processing → picking → packing → disposition (18 steps total)</ListItem>
                                        <ListItem>MED box prep for deployment with no standardized intake/disposition</ListItem>
                                        <ListItem>Field coordination across battalions without a shared source of truth</ListItem>
                                    </div>
                                    <div>
                                        <h4>User Systems & Pains</h4>
                                        <ListItem>3 separate Excel files, &gt;24 tabs, desktop-only access</ListItem>
                                        <ListItem>Lack of visibility—expired/excess inventory undetected</ListItem>
                                        <ListItem>Manual expiration reporting; excessive time on inventory management</ListItem>
                                    </div>
                                </TwoColumn>
                            </SectionContent>
                        </Section>

                        {/* SOLUTION (kept) */}
                        <Section>
                            <SectionTitle>Solution</SectionTitle>
                            <SectionContent>
                                <TextBlock>
                                    MedTracker is a mobile-first web app with real-time updates, visual indicators, and three-clicks-or-less access
                                    to the core jobs: in-processing inventory, packing MED boxes, disposing excess, ordering/viewing expirations,
                                    and monitoring overall readiness.
                                </TextBlock>

                                {/* DESIGN PROCESS (sticky stepper) */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: '320px 1fr' },
                                        gap: { xs: 2, md: 4 },
                                        alignItems: 'start'
                                    }}
                                >
                                    {/* LEFT: Sticky Steps */}
                                    <Box
                                        sx={{
                                            position: { md: 'sticky' },
                                            top: { md: 96 },
                                            alignSelf: 'start',
                                            pt: 1,
                                            pb: 2,
                                            '::before': {
                                                content: '""',
                                                position: 'absolute',
                                                left: { md: 12 },
                                                top: 0,
                                                bottom: 0,
                                                width: '2px',
                                                background:
                                                    'linear-gradient(180deg, #5EF0FF, #9C5DFF 45%, #FFB86B 80%)',
                                                opacity: 0.7,
                                                borderRadius: 999
                                            }
                                        }}
                                    >
                                        <Box sx={{ pl: { md: 4 } }}>
                                            <StepChip index={0} label="Step one" title="Defining the user flows" />
                                            <StepChip index={1} label="Step two" title="Data mapping" />
                                            <StepChip index={2} label="Step three" title="UI design decisions" />
                                        </Box>
                                    </Box>

                                    {/* RIGHT: Panels that control active state */}
                                    <Box sx={{ display: 'grid', gap: 8 }}>
                                        <Box
                                            id="step_flows"
                                            ref={step1Ref}
                                            sx={{
                                                p: { xs: 2.5, md: 3 },
                                                borderRadius: 3,
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                background:
                                                    'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                                                backdropFilter: 'blur(2px)'
                                            }}
                                        >
                                            <Box sx={{ fontSize: 12, fontWeight: 700, opacity: 0.8, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                                                Step one
                                            </Box>
                                            <Box sx={{ mt: 0.75, fontWeight: 800, fontSize: 28, lineHeight: 1.15 }}>
                                                Defining the user flows
                                            </Box>
                                            <TextBlock>
                                                We mapped the end-to-end tasks and decision points across roles to minimize hops and context switching.
                                                The baseline contained 18 steps across in-processing, picking, packing, and disposition. We collapsed
                                                redundant actions and clarified ownership to target a “3-clicks-or-less” path to core tasks.
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
                                        </Box>

                                        <Box
                                            id="step_data"
                                            ref={step2Ref}
                                            sx={{
                                                p: { xs: 2.5, md: 3 },
                                                borderRadius: 3,
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                background:
                                                    'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                                                backdropFilter: 'blur(2px)'
                                            }}
                                        >
                                            <Box sx={{ fontSize: 12, fontWeight: 700, opacity: 0.8, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                                                Step two
                                            </Box>
                                            <Box sx={{ mt: 0.75, fontWeight: 800, fontSize: 28, lineHeight: 1.15 }}>
                                                Data mapping
                                            </Box>
                                            <TextBlock>
                                                With engineering, we defined the schema that powers search, bulk updates, and expiration reporting.
                                                Required vs. optional fields were clarified, and system-derived values (e.g., viability windows) were
                                                introduced to automate previously manual reporting.
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
                                        </Box>

                                        <Box
                                            id="step_ui"
                                            ref={step3Ref}
                                            sx={{
                                                p: { xs: 2.5, md: 3 },
                                                borderRadius: 3,
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                background:
                                                    'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                                                backdropFilter: 'blur(2px)'
                                            }}
                                        >
                                            <Box sx={{ fontSize: 12, fontWeight: 700, opacity: 0.8, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                                                Step three
                                            </Box>
                                            <Box sx={{ mt: 0.75, fontWeight: 800, fontSize: 28, lineHeight: 1.15 }}>
                                                UI design decisions (UI/UX)
                                            </Box>
                                            <TextBlock>
                                                We optimized the information architecture for scan-ability: prominent readiness and expiration signals,
                                                clear set/lot hierarchy, and in-place editing. Mobile-first patterns and a familiar table-detail model
                                                enabled quick wins without cognitive overhead.
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
                                        </Box>
                                    </Box>
                                </Box>

                                <TwoColumn>
                                    <Box
                                        sx={{
                                            height: 280,
                                            borderRadius: 2,
                                            border: '1px solid',
                                            borderColor: 'rgba(255,255,255,0.08)',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                        aria-label="Primary flows mock — Inventory & Sets"
                                    />
                                    <Box
                                        sx={{
                                            height: 280,
                                            borderRadius: 2,
                                            border: '1px solid',
                                            borderColor: 'rgba(255,255,255,0.08)',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                        aria-label="Detail view mock — Lots, quantities, and expiration"
                                    />
                                </TwoColumn>

                                <TextBlock style={{ marginTop: 32 }}>
                                    <BoldText>Design principles: Mobile first · Real-time updates · Clear visual indicators · User-validated · 3 clicks or less</BoldText>
                                </TextBlock>

                                <ThreeColumn>
                                    <div>
                                        <h4>Inventory &amp; Sets</h4>
                                        <p>Searchable sets, bulk inventory actions, and structured item details (lot, quantity, expiration) for quick edits.</p>
                                    </div>
                                    <div>
                                        <h4>Expiration &amp; Disposition</h4>
                                        <p>Automated expiration reporting with a new viability window and guided workflows for reallocating/disposal.</p>
                                    </div>
                                    <div>
                                        <h4>Readiness &amp; Ordering</h4>
                                        <p>At-a-glance readiness views (0–80 / 81–99 / 100%) and hooks for ordering to close loops faster.</p>
                                    </div>
                                </ThreeColumn>
                            </SectionContent>
                        </Section>

                        <SectionDivider />

                        {/* RESULTS / IMPACT */}
                        <Section>
                            <SectionTitle>Results &amp; Impact</SectionTitle>
                            <SectionContent>
                                <TextBlock>
                                    Process optimization, warehouse mapping, and a purpose-built interface delivered dramatic efficiency gains and
                                    visibility into real inventory health across units.
                                </TextBlock>

                                <ThreeColumn>
                                    <StatCard>
                                        <StatNumber>5 min</StatNumber>
                                        <StatLabel>MED box fulfillment time</StatLabel>
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

                                <TextBlock style={{ marginTop: 32 }}>
                                    <BoldText>Additional wins: +5,800 hours/year saved via the new expiration viability window for 900+ MED boxes.</BoldText>
                                </TextBlock>

                                <TwoColumn>
                                    <div>
                                        <ListItem><BoldText>Business impacts</BoldText></ListItem>
                                        <ListItem>Organization-wide annual savings &gt;$4M</ListItem>
                                        <ListItem>Disposition and mission viability reporting for downtrace allocation</ListItem>
                                        <ListItem>Real-time collaboration → fewer delays and handoffs</ListItem>
                                    </div>
                                    <div>
                                        <ListItem><BoldText>User impacts</BoldText></ListItem>
                                        <ListItem>Mobile app with 3-click access to core tasks</ListItem>
                                        <ListItem>Automated expiration reporting; fewer spreadsheet loops</ListItem>
                                        <ListItem>Clear readiness signals; simple set/lot updates</ListItem>
                                    </div>
                                </TwoColumn>
                            </SectionContent>
                        </Section>

                        <SectionDivider />

                        {/* LEARNINGS */}
                        <Section>
                            <SectionTitle>Learnings</SectionTitle>
                            <SectionContent>
                                <ThreeColumn>
                                    <div>
                                        <h4>Be concise</h4>
                                        <p>Tons of data—only surface what drives action. Remove noise, keep necessary cues.</p>
                                    </div>
                                    <div>
                                        <h4>Align early with Eng/Data</h4>
                                        <p>Co-design data structures and mapping to avoid rework and ensure feasible, fast UI.</p>
                                    </div>
                                    <div>
                                        <h4>Design for familiarity</h4>
                                        <p>We kept certain workflow cues users relied on—fewer clicks without disorientation.</p>
                                    </div>
                                </ThreeColumn>
                            </SectionContent>
                        </Section>
                    </ContentWrapper>
                </BoardContent>

                <FloatingTopNav />
                <ZoomControls
                    scale={stageScale}
                    pos={stagePos}
                    onZoomIn={() => zoomIn(stageRef)}
                    onZoomOut={() => zoomOut(stageRef)}
                    onReset={resetView}
                />
                <DelightfulToolbar
                    activeTool={activeTool}
                    setActiveTool={handleToolChange}
                    setEmojiButtonRect={setEmojiButtonRect}
                />
                <EmojiPicker
                    visible={emojiPickerOpen}
                    stampEmojis={stampEmojis}
                    smileyEmojis={smileyEmojis}
                    selected={selectedEmoji}
                    onSelect={handleSelectEmoji}
                    anchorRect={emojiButtonRect}
                    subMode={emojiSubMode}
                    setSubMode={handleSetSubMode}
                />
                <EmojiBrushOverlay
                    emoji={selectedEmoji}
                    visible={showOverlay}
                    x={overlayPos.x}
                    y={overlayPos.y}
                />
                <CursorChat />
                <FastWaveCursor />
                <CommentingLayer activeTool={activeTool} />
            </ProjectPageContainer>
        </ZoomPanContext.Provider>
    )
}
