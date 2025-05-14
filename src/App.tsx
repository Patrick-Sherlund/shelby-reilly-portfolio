import React, { useEffect, useRef } from 'react'
import Konva from 'konva'
import { Stage, Layer, Rect } from 'react-konva'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import StickyNote from './components/StickyNote/StickyNote'
import DelightfulToolbar from './components/DelightfulToolbar/DelightfulToolbar'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
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

export default function App() {
    const stageRef = useRef<Konva.Stage>(null)
    const prevTouchRef = useRef<{
        touches: Touch[];
        distance?: number;
        midpoint?: { x: number; y: number };
        time: number;
    } | null>(null)
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

    // Track y position before first zoom, and whether user scrolled while zoomed
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

    // Invoke custom hook to disable native browser zoom
    useDisableBrowserZoom()

    // Detect entering zoom to capture initial y
    useEffect(() => {
        if (prevScaleRef.current === 1 && stageScale !== 1) {
            // just started zooming
            yBeforeZoomRef.current = stagePos.y
            scrolledWhileZoomedRef.current = false
        }
        prevScaleRef.current = stageScale
    }, [stageScale, stagePos.y])

    // Detect vertical scroll (y change) while zoomed
    useEffect(() => {
        if (stageScale !== 1 && prevPosYRef.current !== stagePos.y) {
            scrolledWhileZoomedRef.current = true
        }
        prevPosYRef.current = stagePos.y
    }, [stagePos.y, stageScale])

    const resetView = () => {
        // Determine which page is currently in view based on stagePos & scale
        const approxIndex = Math.round(-stagePos.y / (window.innerHeight * stageScale))
        const clampedIndex = Math.max(0, Math.min(2, approxIndex)) // we have 3 pages (0-2)
        const targetY = -clampedIndex * window.innerHeight

        setStageScale(1)
        setStagePos({ x: 0, y: targetY })
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
                width={window.innerWidth}
                height={window.innerHeight}
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
                        width={window.innerWidth}
                        height={window.innerHeight}
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
            <PageWrapper baseY={window.innerHeight} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale}>
                <MedTrackerPage />
            </PageWrapper>
            <CursorChat />
            <FastWaveCursor />
            <CommentingLayer activeTool={activeTool} />
        </AppContainer>
        </ZoomPanContext.Provider>
    )
}
