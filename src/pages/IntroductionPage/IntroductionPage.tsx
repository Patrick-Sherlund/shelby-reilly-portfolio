// IntroductionPage.tsx
import React, { useState, useRef, useEffect } from 'react'
import Konva from 'konva'
import { Stage, Layer } from 'react-konva'
import StickyNote from '../../components/StickyNote/StickyNote'
import DelightfulToolbar from '../../components/DelightfulToolbar/DelightfulToolbar'
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle'
import ZoomControls from '../../components/ZoomControls/ZoomControls'
import EmojiPicker from '../../components/EmojiPicker/EmojiPicker'
import EmojiBrushOverlay from '../../components/EmojiBrushOverlay/EmojiBrushOverlay'
import EmojiObject from '../../components/EmojiObject/EmojiObject'
import { IntroContainer, IntroCenterText, TextWrapper } from './IntroductionPage.styles'

type Tool = 'hand' | 'pen' | 'sticky' | 'emoji' | null
type BoardItem = { id: string; type: 'sticky' | 'emoji'; src?: string; x: number; y: number }
type EmojiSubMode = 'stamp' | 'wand'
type WandEmoji = {
    id: string
    src: string
    x: number
    y: number
    rotation: number
    bornAt: number
    floatAngle: number
}

export default function IntroductionPage() {
    const stageRef = useRef<Konva.Stage>(null)
    const [stageScale, setStageScale] = useState(1)
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
    const [activeTool, setActiveTool] = useState<Tool>(null)
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState(
        `${process.env.PUBLIC_URL}/images/emojis/sparkling-heart.png`
    )
    const [showOverlay, setShowOverlay] = useState(false)
    const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 })
    const [emojiButtonRect, setEmojiButtonRect] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const [emojiSubMode, setEmojiSubMode] = useState<EmojiSubMode>('stamp') // persists user's wand vs stamp
    const [stampEmojis] = useState([
        `${process.env.PUBLIC_URL}/images/emojis/super-happy-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/sunglasses-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/heart-face-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/hot-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/exploding-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/happy-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/cowboy-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/star-face-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/sparkling-heart.png`
    ])
    const [smileyEmojis] = useState([
        `${process.env.PUBLIC_URL}/images/emojis/super-happy-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/sunglasses-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/heart-face-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/hot-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/exploding-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/cash-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/happy-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/cowboy-emoji.png`,
        `${process.env.PUBLIC_URL}/images/emojis/star-face-emoji.png`
    ])
    const [objects, setObjects] = useState<BoardItem[]>([])
    const [wandEmojis, setWandEmojis] = useState<WandEmoji[]>([])
    const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const moveListener = (e: MouseEvent) => {
            setOverlayPos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', moveListener)
        return () => {
            window.removeEventListener('mousemove', moveListener)
        }
    }, [])

    const clampScale = (scale: number) => {
        if (scale < 0.5) return 0.5
        if (scale > 1.5) return 1.5
        return scale
    }

    const clampStagePosition = (x: number, y: number, scale: number) => {
        const w = window.innerWidth
        const h = window.innerHeight
        const rangeX = w * 2
        const rangeY = h * 2
        let newX = x
        let newY = y
        if (x < -rangeX) newX = -rangeX
        if (x > rangeX) newX = rangeX
        if (y < -rangeY) newY = -rangeY
        if (y > rangeY) newY = rangeY
        return { x: newX, y: newY }
    }

    const handleWheel = (e: any) => {
        if (!e.evt.ctrlKey) return
        e.evt.preventDefault()
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

    const handleStageClick = (e: any) => {
        if (activeTool === 'emoji') {
            const pointer = stageRef.current?.getRelativePointerPosition()
            if (!pointer) return
            if (document.body.style.cursor.includes('stamp-cursor.png')) {
                const newObj: BoardItem = {
                    id: Date.now().toString(),
                    type: 'emoji',
                    src: selectedEmoji,
                    x: pointer.x - 20,
                    y: pointer.y - 20
                }
                setObjects((prev) => [...prev, newObj])
            }
        }
    }

    const handleStageMouseDown = (e: any) => {
        if (activeTool === 'emoji') {
            if (document.body.style.cursor.includes('wand-cursor.png')) {
                spawnIntervalRef.current = setInterval(() => {
                    const st = stageRef.current
                    if (!st) return
                    const pointer = st.getRelativePointerPosition()
                    if (!pointer) return
                    const rotation = (Math.random() - 0.5) * 40
                    const floatAngle = (Math.random() - 0.5) * (Math.PI / 3)
                    const newWandEmoji: WandEmoji = {
                        id: Math.random().toString(36).substring(7),
                        src: selectedEmoji,
                        x: pointer.x,
                        y: pointer.y,
                        rotation,
                        bornAt: performance.now(),
                        floatAngle
                    }
                    setWandEmojis((prev) => [...prev, newWandEmoji])
                }, 100)
            }
        }
    }

    const handleStageMouseUp = (e: any) => {
        if (spawnIntervalRef.current) {
            clearInterval(spawnIntervalRef.current)
            spawnIntervalRef.current = null
        }
    }

    const handleStageMouseLeave = (e: any) => {
        if (spawnIntervalRef.current) {
            clearInterval(spawnIntervalRef.current)
            spawnIntervalRef.current = null
        }
    }

    useEffect(() => {
        let animReq: number
        const animate = () => {
            const now = performance.now()
            setWandEmojis((prev) => prev.filter((item) => now - item.bornAt < 1000))
            animReq = requestAnimationFrame(animate)
        }
        animReq = requestAnimationFrame(animate)
        return () => {
            cancelAnimationFrame(animReq)
        }
    }, [])

    const handleToolChange = (tool: Tool) => {
        setActiveTool(tool)
        if (tool === 'emoji') {
            setEmojiPickerOpen(true)
            setShowOverlay(true)
            if (emojiSubMode === 'stamp') {
                document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/stamp-cursor.png) 0 32, auto`
            } else {
                document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/wand-cursor.png) 8 8, auto`
            }
        } else {
            setEmojiPickerOpen(false)
            setShowOverlay(false)
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
        }
    }

    const handleSelectEmoji = (emoji: string) => {
        setSelectedEmoji(emoji)
        setEmojiPickerOpen(false)
        setShowOverlay(true)
    }

    return (
        <IntroContainer scaleValue={stageScale}>
            <ThemeToggle />
            <ZoomControls
                scale={stageScale}
                onZoomIn={() => setStageScale((prev) => clampScale(prev + 0.1))}
                onZoomOut={() => setStageScale((prev) => clampScale(prev - 0.1))}
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
                setSubMode={(mode) => {
                    setEmojiSubMode(mode)
                    if (mode === 'stamp') {
                        document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/stamp-cursor.png) 0 32, auto`
                    } else {
                        document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/wand-cursor.png) 8 8, auto`
                    }
                }}
            />
            <EmojiBrushOverlay
                emoji={selectedEmoji}
                visible={showOverlay}
                x={overlayPos.x}
                y={overlayPos.y}
            />
            <Stage
                ref={stageRef}
                draggable={!document.body.style.cursor.includes('wand-cursor.png')}
                x={stagePos.x}
                y={stagePos.y}
                scaleX={stageScale}
                scaleY={stageScale}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ position: 'absolute', top: 0, left: 0, background: 'transparent' }}
                onDragMove={(evt) => {
                    const { x, y } = clampStagePosition(evt.target.x(), evt.target.y(), stageScale)
                    evt.target.x(x)
                    evt.target.y(y)
                }}
                onDragEnd={(evt) => {
                    const { x, y } = clampStagePosition(evt.target.x(), evt.target.y(), stageScale)
                    setStagePos({ x, y })
                }}
                onWheel={handleWheel}
                onClick={handleStageClick}
                onMouseDown={handleStageMouseDown}
                onMouseUp={handleStageMouseUp}
                onMouseLeave={handleStageMouseLeave}
            >
                <Layer>
                    <StickyNote text="or else" color="#b19cd9" stageRef={stageRef} />
                    <StickyNote text="Hire me" color="#b3cde0" stageRef={stageRef} />
                    {objects.map((obj) =>
                        obj.type === 'sticky' ? null : (
                            <EmojiObject key={obj.id} src={obj.src!} x={obj.x} y={obj.y} />
                        )
                    )}
                    {wandEmojis.map((we) => {
                        const elapsed = performance.now() - we.bornAt
                        const progress = Math.min(elapsed / 1000, 1)
                        const dist = 75
                        const offsetX = dist * progress * Math.sin(we.floatAngle)
                        const offsetY = -dist * progress * Math.cos(we.floatAngle)
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
                            />
                        )
                    })}
                </Layer>
            </Stage>
            <TextWrapper>
                <IntroCenterText>Hi! I'm Shelby (:</IntroCenterText>
            </TextWrapper>
        </IntroContainer>
    )
}
