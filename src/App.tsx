import React, { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import { Stage, Layer, Rect } from 'react-konva'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import StickyNote from './components/StickyNote/StickyNote'
import DelightfulToolbar from './components/DelightfulToolbar/DelightfulToolbar'
import EmojiPicker from './components/EmojiPicker/EmojiPicker'
import EmojiBrushOverlay from './components/EmojiBrushOverlay/EmojiBrushOverlay'
import EmojiObject from './components/EmojiObject/EmojiObject'
import IntroductionPage from './pages/IntroductionPage/IntroductionPage'
import { usePointerOverlay } from './hooks/usePointerOverlay'
import { useZoomPan } from './hooks/useZoomPan'
import { useWandEmojis, WAND_LIFETIME, WAND_TRAVEL_DISTANCE } from './hooks/useWandEmojis'
import { useEmojiTool } from './hooks/useEmojiTool'
import FloatingTopNav from "./components/FloatingTopNav/FloatingTopNav";
import ZoomControls from './components/ZoomControls/ZoomControls'
import { ZoomPanContext } from './context/ZoomPanContext'
import { useDisableBrowserZoom } from './hooks/useDisableBrowserZoom'
import CursorChat from './components/CursorChat/CursorChat'
import FastWaveCursor from './components/FastWaveCursor/FastWaveCursor'
import CommentingLayer from './components/CommentingLayer/CommentingLayer'
import MedTrackerPage from './pages/MedTrackerPage/MedTrackerPage'
import ProjectBishopPage from './pages/ProjectBishopPage/ProjectBishopPage'
import GoogleCodesignPage from './pages/GoogleCodesignPage/GoogleCodesignPage'
import { GlobalStyles } from '@mui/material'
import SearchPalette from './components/SearchPalette/SearchPalette'
import { CommentSidepane } from './components/CommentSidepane/CommentSidepane'
import { CommentsProvider, useComments } from './context/CommentsContext'
import MedTrackerProjectPage from './pages/MedTrackerProjectPage/MedTrackerProjectPage'
import BishopProjectPage from './pages/BishopProjectPage/BishopProjectPage'
import GoogleCodesignProjectPage from './pages/GoogleCodesignProjectPage/GoogleCodesignProjectPage'
import AboutPage from './pages/AboutPage/AboutPage'
import { CursorSimulatorProvider, useCursorSimulator } from './context/CursorSimulatorContext'
import { CursorSimulator } from './components/CursorSimulator/CursorSimulator'
import { BackButton as ProjectBackButton } from './pages/MedTrackerProjectPage/MedTrackerProjectPage.styles'

const AppContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    backgroundImage:
        theme.palette.mode === 'light'
            ? `url(${process.env.PUBLIC_URL}/images/dots-light.svg)`
            : `url(${process.env.PUBLIC_URL}/images/dots-dark.svg)`,
    backgroundRepeat: 'repeat',
    backgroundSize: '20px 20px'
}))

const PageWrapper = styled('div')<{
    baseY: number
    translateX: number
    translateY: number
    scale: number
    $activeTool?: string
}>(({ baseY, translateX, translateY, scale, $activeTool }) => {
    // Only disable pointer events when using tools that need to interact with the Konva stage
    const isKonvaToolActive = $activeTool === 'emoji' || $activeTool === 'commenting-cursor'

    return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: isKonvaToolActive ? 'none' : 'auto',
        transform: `translate(${translateX + 0}px, ${translateY + baseY * scale}px) scale(${scale})`,
        transformOrigin: 'top left',
        zIndex: 1
    }
})

function AppContent() {
    const stageRef = useRef<Konva.Stage>(null)
    const prevTouchRef = useRef<{
        touches: Touch[];
        distance?: number;
        midpoint?: { x: number; y: number };
        time: number;
    } | null>(null)

    const { waypoints, startCursor } = useCursorSimulator()

    // --- Viewport-safe sizing for mobile toolbars / browser chrome ---
    const [viewport, setViewport] = useState<{ w: number; h: number }>({
        w: window.innerWidth,
        h: window.innerHeight
    })

    // Calculate normalized speed for cursor (same logic as IntroductionPage)
    const diag = Math.hypot(viewport.w, viewport.h)
    const norm = Math.min(1.0, Math.max(0.72, diag / 1450))
    useEffect(() => {
        const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
        window.addEventListener('resize', update)
        window.addEventListener('orientationchange', update)
        // iOS address bar hide/show
        window.addEventListener('focus', update)
        window.addEventListener('blur', update)
        return () => {
            window.removeEventListener('resize', update)
            window.removeEventListener('orientationchange', update)
            window.removeEventListener('focus', update)
            window.removeEventListener('blur', update)
        }
    }, [])

    const [currentRoute, setCurrentRoute] = React.useState<string>(window.location.hash)
    const [commentPaneCollapsed, setCommentPaneCollapsed] = useState(false)

    const {
        stageScale,
        setStageScale,
        stagePos,
        setStagePos,
        maxScrollPages,
        setMaxScrollPages,
        clampStagePosition,
        handleWheel,
        handleTouchMove,
        handleTouchEnd,
        zoomIn,
        zoomOut
    } = useZoomPan()
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
        handleStamp,
        hasSelectedEmoji,
        handleStampMouseUp,
        handleStampCancel,
        previewScale,
        previewRotation,
        previewOpacity
    } = useEmojiTool({ stageRef, currentRoute })
    const { setActiveCommentId } = useComments()
    const { showOverlay, setShowOverlay, overlayPos } = usePointerOverlay()
    const { wandEmojis, handleStageMouseDown, handleStageMouseUp, handleStageMouseLeave } =
        useWandEmojis({
            stageRef,
            activeTool,
            emojiSubMode,
            selectedEmoji
        })
    const isWandActive = activeTool === 'emoji' && emojiSubMode === 'wand'
    const isStampMode = activeTool === 'emoji' && emojiSubMode === 'stamp'
    const canDragBackground = !(isWandActive || isStampMode)

    const yBeforeZoomRef = useRef<number | null>(null)
    const scrolledWhileZoomedRef = useRef(false)
    const prevScaleRef = useRef(1)
    const prevPosYRef = useRef(stagePos.y)
    const handleBackToHome = () => { window.location.hash = '' }
    const prevToolRef = useRef<string | null>(null)

    const dragBoundFunc = (pos: { x: number; y: number }) => ({
        x: pos.x,
        y: clampStagePosition(pos.y)
    })

    const handleDragMove = () => {
        if (!stageRef.current) return
        const currentPos = stageRef.current.position()
        setStagePos({
            x: currentPos.x,
            y: clampStagePosition(currentPos.y)
        })
    }

    useEffect(() => {
        if (activeTool === 'emoji' && hasSelectedEmoji) {
            setShowOverlay(true)
        } else {
            setShowOverlay(false)
        }
    }, [activeTool, hasSelectedEmoji, setShowOverlay])

    useEffect(() => {
        const disableContextMenu = (e: Event) => e.preventDefault()
        document.addEventListener('contextmenu', disableContextMenu)
        return () => {
            document.removeEventListener('contextmenu', disableContextMenu)
        }
    }, [])

    useDisableBrowserZoom()

    // Global wheel handler for when cursor/hand tool is active OR when commenting tool is active
    // (Stage has pointerEvents: none for hand tool, and CommentingLayer blocks wheel events for commenting tool)
    useEffect(() => {
        // Don't add wheel handler on project pages (they have normal scrolling)
        const isProjectPage = currentRoute === '#/medtracker-project' ||
                              currentRoute === '#/bishop-project' ||
                              currentRoute === '#/googlecodesign-project'
        if (isProjectPage) return

        // Active when cursor/hand tool is selected OR when commenting tool is active
        // (both need global wheel handling because Stage won't receive events)
        const needsGlobalWheel = activeTool === 'hand' || activeTool === null || activeTool === 'commenting-cursor'
        if (!needsGlobalWheel) return

        const handleGlobalWheel = (e: WheelEvent) => {
            e.preventDefault()

            const deltaY = e.deltaY

            // Check if Ctrl/Cmd key is pressed
            if (e.ctrlKey || e.metaKey) {
                // Zoom when Ctrl/Cmd is pressed
                if (!stageRef.current) return

                const oldScale = stageScale
                const clampedScale = (s: number) => {
                    if (s < 1) return 1
                    if (s > 3) return 3
                    return s
                }
                const newScale = clampedScale(oldScale - deltaY * 0.01)

                if (newScale === oldScale) return

                const pointerPosition = { x: e.clientX, y: e.clientY }
                const stage = stageRef.current
                const mousePointTo = {
                    x: (pointerPosition.x - stage.x()) / oldScale,
                    y: (pointerPosition.y - stage.y()) / oldScale
                }
                const newPos = {
                    x: pointerPosition.x - mousePointTo.x * newScale,
                    y: pointerPosition.y - mousePointTo.y * newScale
                }
                newPos.y = clampStagePosition(newPos.y)

                setStageScale(newScale)
                setStagePos(newPos)
            } else {
                // Regular scrolling behavior when no modifier keys are pressed
                setStagePos((prev) => {
                    const newY = clampStagePosition(prev.y - deltaY)
                    const newX = activeTool === 'commenting-cursor' ? prev.x - e.deltaX : prev.x
                    return { x: newX, y: newY }
                })
            }
        }

        window.addEventListener('wheel', handleGlobalWheel, { passive: false })
        return () => {
            window.removeEventListener('wheel', handleGlobalWheel)
        }
    }, [activeTool, stageScale, stagePos, clampStagePosition, setStageScale, setStagePos, currentRoute])

    useEffect(() => {
        if (prevScaleRef.current === 1 && stageScale !== 1) {
            yBeforeZoomRef.current = stagePos.y
            scrolledWhileZoomedRef.current = false
        }
        prevScaleRef.current = stageScale
    }, [stageScale, stagePos.y])

    useEffect(() => {
        if (stageScale !== 1 && prevPosYRef.current !== stagePos.y) {
            scrolledWhileZoomedRef.current = true
        }
        prevPosYRef.current = stagePos.y
    }, [stagePos.y, stageScale])

    const resetView = () => {
        const pageH = viewport.h
        const approxIndex = Math.round(-stagePos.y / (pageH * stageScale))
        const clampedIndex = Math.max(0, Math.min(3, approxIndex))
        const targetY = -clampedIndex * pageH
        setStageScale(1)
        setStagePos({ x: 0, y: targetY })
    }

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentRoute(window.location.hash)
            setCommentPaneCollapsed(false)
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    const isCommentMode = activeTool === 'commenting-cursor'
    const toggleCollapsePane = () => {
        setCommentPaneCollapsed((prev) => {
            const next = !prev
            if (next) setActiveCommentId(null)
            return next
        })
    }

    useEffect(() => {
        if (activeTool === 'commenting-cursor' && prevToolRef.current !== 'commenting-cursor') {
            setCommentPaneCollapsed(false)
        }
        prevToolRef.current = activeTool
    }, [activeTool])

    useEffect(() => {
        if (!isCommentMode || commentPaneCollapsed) {
            setActiveCommentId(null)
        }
    }, [isCommentMode, commentPaneCollapsed, setActiveCommentId])

    useEffect(() => {
        if (currentRoute === '#/about') {
            setStageScale(1)
            setStagePos({ x: 0, y: 0 })
        }
    }, [currentRoute, setStagePos, setStageScale])

    if (currentRoute === '#/medtracker-project') {
        return <MedTrackerProjectPage />
    }

    if (currentRoute === '#/bishop-project') {
        return <BishopProjectPage />
    }

    if (currentRoute === '#/googlecodesign-project') {
        return <GoogleCodesignProjectPage />
    }

    if (currentRoute === '#/about') {
        return (
            <ZoomPanContext.Provider value={{
                stageRef,
                stageScale,
                setStageScale,
                stagePos,
                setStagePos,
                maxScrollPages,
                setMaxScrollPages,
                clampStagePosition,
                zoomIn,
                zoomOut,
                activeTool
            }}>
                <AppContainer>
                    <GlobalStyles styles={{
                        img: {
                            WebkitUserDrag: 'none',
                            userDrag: 'none',
                            userSelect: 'none',
                            maxWidth: '100%',
                        },
                        '*': {
                            WebkitTapHighlightColor: 'transparent'
                        }
                    }} />
                    <FloatingTopNav />
                    <ProjectBackButton onClick={handleBackToHome}>← Back to Portfolio</ProjectBackButton>
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
                        emojiOffsets={{
                        'pikachu-sticker': {
                            angleOffset: 4
                        },
                        'shelby-rodeo-sticker': {
                            angleOffset: 4,
                            scale: 1.3
                        },
                        'shrekby-sticker': {
                            angleOffset: 2,
                            scale: 1.2
                        },
                        'shelby-goddess-sticker': {
                            angleOffset: 0,
                            scale: 1.2,
                            distanceOffset: -.2
                        },
                        'pat-plotting-sticker': {
                            angleOffset: -3,
                            scale: 1.3,
                        },
                        'shelby-medal-sticker': {
                            scale: 1.2,
                        },
                        'shelby-laptop-sticker': {
                            angleOffset: 5,
                            scale: 1.6,
                            distanceOffset: -.6
                        }
                    }}
                    />
                    <EmojiBrushOverlay
                        emoji={selectedEmoji}
                        visible={showOverlay}
                        x={overlayPos.x}
                        y={overlayPos.y}
                        scale={previewScale}
                        rotation={previewRotation}
                        opacity={previewOpacity}
                    />
                    <Stage
                        ref={stageRef}
                        x={stagePos.x}
                        y={stagePos.y}
                        scaleX={stageScale}
                        scaleY={stageScale}
                        width={viewport.w}
                        height={viewport.h}
                        draggable={canDragBackground}
                        dragBoundFunc={dragBoundFunc}
                        onDragMove={handleDragMove}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            background: 'transparent',
                            zIndex: 2,
                            pointerEvents: (activeTool === 'emoji' || activeTool === 'commenting-cursor') ? 'auto' : 'none'
                        }}
                        onWheel={(e) => handleWheel(e, stageRef, activeTool === 'commenting-cursor')}
                        onTouchMove={(e) => handleTouchMove(e, stageRef, prevTouchRef)}
                        onTouchEnd={(e) => {
                            handleTouchEnd(prevTouchRef)
                            handleStageMouseUp()
                            handleStampMouseUp()
                        }}
                        onMouseDown={(e) => {
                            handleStageMouseDown()
                            handleStamp()
                        }}
                        onTouchStart={(e) => {
                            handleStageMouseDown()
                            handleStamp()
                        }}
                        onMouseUp={() => {
                            handleStageMouseUp()
                            handleStampMouseUp()
                        }}
                        onTouchCancel={() => {
                            handleStageMouseLeave()
                            handleStampCancel()
                        }}
                        onMouseLeave={() => {
                            handleStageMouseLeave()
                            handleStampCancel()
                        }}
                    >
                        <Layer>
                            <Rect
                                x={0}
                                y={0}
                                width={viewport.w}
                                height={viewport.h}
                                fill="rgba(0,0,0,0)"
                                listening={true}
                            />
                            {objects.map((obj) =>
                                obj.type === 'sticky' ? null : (
                                    <EmojiObject
                                        scale={obj.scale ?? 1}
                                        rotation={obj.rotation ?? 0}
                                        key={obj.id}
                                        src={obj.src!}
                                        x={obj.x}
                                        y={obj.y}
                                    />
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

                    <PageWrapper baseY={0} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale} $activeTool={activeTool}>
                        <AboutPage />
                    </PageWrapper>

                    <CursorChat />
                    <FastWaveCursor />
                    <CommentingLayer activeTool={activeTool} currentRoute={currentRoute} />
                    <SearchPalette />
                    <CommentSidepane
                        open={isCommentMode}
                        currentRoute={currentRoute}
                        collapsed={commentPaneCollapsed}
                        onCollapseToggle={toggleCollapsePane}
                    />

                    {waypoints.length > 0 && startCursor && currentRoute != '#/about' && (
                        <CursorSimulator
                            startSide="left"
                            endSide="bottom"
                            waypoints={waypoints}
                            start={true}
                            offScreenSpeed={Math.round(800 * norm)}
                        />
                    )}
                </AppContainer>
            </ZoomPanContext.Provider>
        )
    }

    return (
        <CommentsProvider>
            <ZoomPanContext.Provider value={{
                stageRef,
                stageScale,
                setStageScale,
                stagePos,
                setStagePos,
                maxScrollPages,
                setMaxScrollPages,
                clampStagePosition,
                zoomIn,
                zoomOut,
                activeTool
            }}>
                <AppContainer>
                    {/* Mobile polish without touching desktop */}
                    <GlobalStyles styles={{
                        img: {
                            WebkitUserDrag: 'none',
                            userDrag: 'none',
                            userSelect: 'none',
                            maxWidth: '100%',
                        },
                        '*': {
                            WebkitTapHighlightColor: 'transparent'
                        }
                    }} />
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
                        emojiOffsets={{
                            'pikachu-sticker': {
                                angleOffset: 4
                            },
                            'shelby-rodeo-sticker': {
                                angleOffset: 4,
                                scale: 1.3
                            },
                            'shrekby-sticker': {
                                angleOffset: 2,
                                scale: 1.2
                            },
                            'shelby-goddess-sticker': {
                                angleOffset: 0,
                                scale: 1.2,
                                distanceOffset: -.2
                            },
                            'pat-plotting-sticker': {
                                angleOffset: -3,
                                scale: 1.3,
                            },
                            'shelby-medal-sticker': {
                                scale: 1.2,
                            },
                            'shelby-laptop-sticker': {
                                angleOffset: 5,
                                scale: 1.6,
                                distanceOffset: -.6
                            }
                        }}
                    />
                    <EmojiBrushOverlay
                        emoji={selectedEmoji}
                        visible={showOverlay}
                        x={overlayPos.x}
                        y={overlayPos.y}
                        scale={previewScale}
                        rotation={previewRotation}
                        opacity={previewOpacity}
                    />
                    <Stage
                        ref={stageRef}
                        x={stagePos.x}
                        y={stagePos.y}
                        scaleX={stageScale}
                        scaleY={stageScale}
                        width={viewport.w}
                        height={viewport.h}
                        draggable={canDragBackground}
                        dragBoundFunc={dragBoundFunc}
                        onDragMove={handleDragMove}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            background: 'transparent',
                            zIndex: 2,
                            pointerEvents: (activeTool === 'emoji' || activeTool === 'commenting-cursor') ? 'auto' : 'none'
                        }}
                        onWheel={(e) => handleWheel(e, stageRef)}
                        onTouchMove={(e) => handleTouchMove(e, stageRef, prevTouchRef)}
                        onTouchEnd={(e) => {
                            handleTouchEnd(prevTouchRef)
                            handleStageMouseUp()
                            handleStampMouseUp()
                        }}
                        onMouseDown={(e) => {
                            handleStageMouseDown()
                            handleStamp()
                        }}
                        onTouchStart={(e) => {
                            handleStageMouseDown()
                            handleStamp()
                        }}
                        onMouseUp={() => {
                            handleStageMouseUp()
                            handleStampMouseUp()
                        }}
                        onTouchCancel={() => {
                            handleStageMouseLeave()
                            handleStampCancel()
                        }}
                        onMouseLeave={() => {
                            handleStageMouseLeave()
                            handleStampCancel()
                        }}
                    >
                        <Layer>
                            <Rect
                                x={0}
                                y={0}
                                width={viewport.w}
                                height={viewport.h}
                                fill="rgba(0,0,0,0)"
                                listening={true}
                            />
                            {objects.map((obj) =>
                                obj.type === 'sticky' ? null : (
                                    <EmojiObject
                                        scale={obj.scale ?? 1}
                                        rotation={obj.rotation ?? 0}
                                        key={obj.id}
                                        src={obj.src!}
                                        x={obj.x}
                                        y={obj.y}
                                    />
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

                    <PageWrapper baseY={0} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale} $activeTool={activeTool}>
                        <IntroductionPage />
                    </PageWrapper>
                    <PageWrapper baseY={viewport.h} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale} $activeTool={activeTool}>
                        <MedTrackerPage />
                    </PageWrapper>
                    <PageWrapper baseY={viewport.h * 2} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale} $activeTool={activeTool}>
                        <ProjectBishopPage />
                    </PageWrapper>
                    <PageWrapper baseY={viewport.h * 3} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale} $activeTool={activeTool}>
                        <GoogleCodesignPage />
                    </PageWrapper>

                    <CursorChat />
                    <FastWaveCursor />
                    <CommentingLayer activeTool={activeTool} currentRoute={currentRoute} />
                    <SearchPalette />
                    <CommentSidepane
                        open={isCommentMode}
                        currentRoute={currentRoute}
                        collapsed={commentPaneCollapsed}
                        onCollapseToggle={() => setCommentPaneCollapsed((p) => !p)}
                    />

                    {waypoints.length > 0 && startCursor && (
                        <CursorSimulator
                            startSide="left"
                            endSide="bottom"
                            waypoints={waypoints}
                            start={true}
                            offScreenSpeed={Math.round(800 * norm)}
                        />
                    )}
                </AppContainer>
            </ZoomPanContext.Provider>
        </CommentsProvider>
    )
}

export default function App() {
    return (
        <CursorSimulatorProvider>
            <CommentsProvider>
                <AppContent />
            </CommentsProvider>
        </CursorSimulatorProvider>
    )
}
