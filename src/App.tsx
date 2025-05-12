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
import OverviewPage from './pages/OverviewPage/OverviewPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import { usePointerOverlay } from './hooks/usePointerOverlay'
import { useZoomPan } from './hooks/useZoomPan'
import {useWandEmojis, WAND_LIFETIME, WAND_TRAVEL_DISTANCE} from './hooks/useWandEmojis'
import { useEmojiTool } from './hooks/useEmojiTool'
import FloatingTopNav from "./components/FloatingTopNav/FloatingTopNav";
import ZoomControls from './components/ZoomControls/ZoomControls'

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
    top: baseY,
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


    return (
        <AppContainer>
            <FloatingTopNav />
            <ZoomControls 
                scale={stageScale} 
                onZoomIn={() => zoomIn(stageRef)} 
                onZoomOut={() => zoomOut(stageRef)} 
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
                <OverviewPage />
            </PageWrapper>
            <PageWrapper baseY={window.innerHeight * 2} translateX={stagePos.x} translateY={stagePos.y} scale={stageScale}>
                <ProjectsPage />
            </PageWrapper>
        </AppContainer>
    )
}
