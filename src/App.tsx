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
import {useWandEmojis, WAND_LIFETIME, WAND_TRAVEL_DISTANCE} from './hooks/useWandEmojis'
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
import MedTrackerProjectPage from './pages/MedTrackerProjectPage/MedTrackerProjectPage'
import BishopProjectPage from './pages/BishopProjectPage/BishopProjectPage'
import { CursorSimulatorProvider, useCursorSimulator } from './context/CursorSimulatorContext'
import { CursorSimulator } from './components/CursorSimulator/CursorSimulator'

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
}>(({ baseY, translateX, translateY, scale }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    transform: `translate(${translateX + 0}px, ${translateY + baseY * scale}px) scale(${scale})`,
    transformOrigin: 'top left'
}))

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
    const [viewport, setViewport] = useState<{w: number; h: number}>({
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

    const { 
        stageScale, 
        setStageScale, 
        stagePos, 
        setStagePos, 
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
        handleStamp
    } = useEmojiTool({ stageRef })
    const { showOverlay, setShowOverlay, overlayPos } = usePointerOverlay()
    const { wandEmojis, handleStageMouseDown, handleStageMouseUp, handleStageMouseLeave } =
        useWandEmojis({
            stageRef,
            activeTool,
            emojiSubMode,
            selectedEmoji
        })
    const isWandActive = activeTool === 'emoji' && emojiSubMode === 'wand'
    const canDragBackground = !isWandActive

    const yBeforeZoomRef = useRef<number | null>(null)
    const scrolledWhileZoomedRef = useRef(false)
    const prevScaleRef = useRef(1)
    const prevPosYRef = useRef(stagePos.y)

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
        if (activeTool === 'emoji') {
            setShowOverlay(true)
        } else {
            setShowOverlay(false)
        }
    }, [activeTool, setShowOverlay])

    useEffect(() => {
        const disableContextMenu = (e: Event) => e.preventDefault()
        document.addEventListener('contextmenu', disableContextMenu)
        return () => {
            document.removeEventListener('contextmenu', disableContextMenu)
        }
    }, [])

    useDisableBrowserZoom()

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

    const [currentRoute, setCurrentRoute] = React.useState<string>(window.location.hash)

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentRoute(window.location.hash)
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    if (currentRoute === '#/medtracker-project') {
        return <MedTrackerProjectPage />
    }

    if (currentRoute === '#/bishop-project') {
        return <BishopProjectPage />
    }

    return (
        <ZoomPanContext.Provider value={{
            stageRef,
            stageScale,
            setStageScale,
            stagePos,
            setStagePos,
            clampStagePosition,
            zoomIn,
            zoomOut
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
            />
            <EmojiBrushOverlay
                emoji={selectedEmoji}
                visible={showOverlay}
                x={overlayPos.x}
                y={overlayPos.y}
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
                style={{ position: 'absolute', top: 0, left: 0, background: 'transparent' }}
                onWheel={(e) => handleWheel(e, stageRef)}
                onTouchMove={(e) => handleTouchMove(e, stageRef, prevTouchRef)}
                onTouchEnd={(e) => {
                    handleTouchEnd(prevTouchRef)
                    handleStageMouseUp()
                }}
                onMouseDown={(e) => {
                    handleStageMouseDown()
                    handleStamp()
                }}
                onTouchStart={(e) => {
                    handleStageMouseDown()
                    handleStamp()
                }}
                onMouseUp={handleStageMouseUp}
                onTouchCancel={handleStageMouseLeave}
                onMouseLeave={handleStageMouseLeave}
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

            <PageWrapper baseY={0} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale}>
                <IntroductionPage />
            </PageWrapper>
            <PageWrapper baseY={viewport.h} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale}>
                <MedTrackerPage />
            </PageWrapper>
            <PageWrapper baseY={viewport.h * 2} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale}>
                <ProjectBishopPage />
            </PageWrapper>
            <PageWrapper baseY={viewport.h * 3} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale}>
                <GoogleCodesignPage />
            </PageWrapper>

            <CursorChat />
            <FastWaveCursor />
            <CommentingLayer activeTool={activeTool} />
            <SearchPalette />

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
    )
}

export default function App() {
    return (
        <CursorSimulatorProvider>
            <AppContent />
        </CursorSimulatorProvider>
    )
}
