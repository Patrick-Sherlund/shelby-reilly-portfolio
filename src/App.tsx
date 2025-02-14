import React, { useState, useRef } from 'react'
import { Container, CenterText } from './App.styles'
import { Stage, Layer } from 'react-konva'
import StickyNote from './components/StickyNote/StickyNote'
import BottomNav from './components/BottomNav/BottomNav'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import ZoomControls from './components/ZoomControls/ZoomControls'
import { TextWrapper } from './TextWrapper.styles'
import Konva from 'konva'

export default function App() {
    const [stageScale, setStageScale] = useState(1)
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
    const stageRef = useRef<Konva.Stage>(null)

    const clampScale = (scale: number) => {
        if (scale < 0.5) return 0.5
        if (scale > 1.5) return 1.5
        return scale
    }

    const clampStagePosition = (x: number, y: number, scale: number) => {
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        const rangeX = screenWidth * 2
        const rangeY = screenHeight * 2
        let clampedX = x
        let clampedY = y
        if (x < -rangeX) clampedX = -rangeX
        if (x > rangeX) clampedX = rangeX
        if (y < -rangeY) clampedY = -rangeY
        if (y > rangeY) clampedY = rangeY
        return { x: clampedX, y: clampedY }
    }

    const handleWheel = (e: any) => {
        e.evt.preventDefault()
        if (!e.evt.ctrlKey) return
        const scaleBy = 1.05
        const oldScale = stageScale
        const pointer = stageRef.current?.getPointerPosition()
        if (!pointer) return
        const mousePointTo = {
            x: (pointer.x - stagePos.x) / oldScale,
            y: (pointer.y - stagePos.y) / oldScale
        }
        const direction = e.evt.deltaY > 0 ? 1 : -1

        
        const newScaleUnclamped = direction > 0 ? oldScale / scaleBy : oldScale * scaleBy
        const newScale = clampScale(newScaleUnclamped)

        const newPosUnclamped = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale
        }
        const newPos = clampStagePosition(newPosUnclamped.x, newPosUnclamped.y, newScale)
        setStageScale(newScale)
        setStagePos(newPos)
    }

    return (
        <Container scaleValue={stageScale}>
            <ThemeToggle />
            <ZoomControls
                scale={stageScale}
                onZoomIn={() => setStageScale((prev) => clampScale(prev + 0.1))}
                onZoomOut={() => setStageScale((prev) => clampScale(prev - 0.1))}
            />
            <Stage
                ref={stageRef}
                draggable
                x={stagePos.x}
                y={stagePos.y}
                scaleX={stageScale}
                scaleY={stageScale}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: 'transparent'
                }}
                onDragMove={(e) => {
                    const { x, y } = clampStagePosition(e.target.x(), e.target.y(), stageScale)
                    e.target.x(x)
                    e.target.y(y)
                }}
                onDragEnd={(e) => {
                    const { x, y } = clampStagePosition(e.target.x(), e.target.y(), stageScale)
                    setStagePos({ x, y })
                }}
                onWheel={handleWheel}
            >
                <Layer>
                    <StickyNote text="or else" color="#b19cd9" stageRef={stageRef} />
                    <StickyNote text="Hire me" color="#b3cde0" stageRef={stageRef} />
                </Layer>
            </Stage>
            <TextWrapper>
                <CenterText>Hi! I'm Shelby (:</CenterText>
            </TextWrapper>
            <BottomNav />
        </Container>
    )
}
