import {useCallback, useEffect, useRef, useState} from 'react'
import Konva from 'konva'
import {BoardItem, EmojiSubMode, Tool} from '../types'

interface UseEmojiToolParams {
    stageRef: React.RefObject<Konva.Stage>
    currentRoute?: string
}

const DEFAULT_PREVIEW_OPACITY = 0.6

const HOLD_OVERSHOOT = 0.08
const SHAKE_SCALE_AMPLITUDE = 0.03
const SHAKE_ROTATION_AMPLITUDE = 2
const OVERSHOOT_DURATION_MS = 120

const getHoldStage = (elapsedSeconds: number) => {
    if (elapsedSeconds < 1) return 0
    if (elapsedSeconds < 2) return 1
    if (elapsedSeconds < 3) return 2
    return 3
}

const getHoldTransform = (elapsedSeconds: number) => {
    if (elapsedSeconds < 1) return {scale: 1, rotation: 0}
    if (elapsedSeconds < 2) return {scale: 1.5, rotation: -15}
    if (elapsedSeconds < 3) return {scale: 2, rotation: 15}
    return {scale: 2.5, rotation: -15}
}

export function useEmojiTool({stageRef, currentRoute = ''}: UseEmojiToolParams) {
    const [activeTool, setActiveTool] = useState<Tool>(null)
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState(
        require('../assets/images/emoji-wheel/fire-sticker.png')
    )
    const [hasSelectedEmoji, setHasSelectedEmoji] = useState(false)
    const [emojiButtonRect, setEmojiButtonRect] = useState({x: 0, y: 0, width: 0, height: 0})
    const [emojiSubMode, setEmojiSubMode] = useState<EmojiSubMode>('stamp')

    const [objectsByRoute, setObjectsByRoute] = useState<Record<string, BoardItem[]>>({})
    const [isStamping, setIsStamping] = useState(false)
    const [previewScale, setPreviewScale] = useState(1)
    const [previewRotation, setPreviewRotation] = useState(0)
    const [previewOpacity, setPreviewOpacity] = useState(DEFAULT_PREVIEW_OPACITY)
    const pressStartRef = useRef<number | null>(null)
    const rafRef = useRef<number | null>(null)
    const currentStageRef = useRef<number>(0)
    const overshootUntilRef = useRef<number | null>(null)
    const emojiSizesRef = useRef<Record<string, { w: number; h: number }>>({})

    const ensureEmojiSize = useCallback((src: string) => {
        if (emojiSizesRef.current[src]) return
        const img = new Image()
        img.onload = () => {
            emojiSizesRef.current[src] = {
                w: img.naturalWidth || img.width,
                h: img.naturalHeight || img.height
            }
        }
        img.src = src
    }, [])

    const stampEmojis = [
        require('../assets/images/emoji-wheel/shelby-medal-sticker.png'),
        require('../assets/images/emoji-wheel/fire-sticker.png'),
        require('../assets/images/emoji-wheel/shelby-laptop-sticker.png'),
        require('../assets/images/emoji-wheel/pikachu-sticker.png'),
        require('../assets/images/emoji-wheel/shelby-rodeo-sticker.png'),
        require('../assets/images/emoji-wheel/shrekby-sticker.png'),
        require('../assets/images/emoji-wheel/shelby-goddess-sticker.png'),
        require('../assets/images/emoji-wheel/pat-plotting-sticker.png')
    ]

    const smileyEmojis = [
        require('../assets/images/emoji-wheel/shelby-medal-sticker.png'),
        require('../assets/images/emoji-wheel/fire-sticker.png'),
        require('../assets/images/emoji-wheel/shelby-laptop-sticker.png'),
        require('../assets/images/emoji-wheel/pikachu-sticker.png'),
        require('../assets/images/emoji-wheel/shelby-rodeo-sticker.png'),
        require('../assets/images/emoji-wheel/shrekby-sticker.png'),
        require('../assets/images/emoji-wheel/shelby-goddess-sticker.png'),
        require('../assets/images/emoji-wheel/pat-plotting-sticker.png')
    ]

    const handleToolChange = useCallback((tool: Tool) => {
        setActiveTool(tool)
        if (tool === 'emoji') {
            setEmojiPickerOpen(true)

            setHasSelectedEmoji(false)
            ensureEmojiSize(selectedEmoji as string)

            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
        } else if (tool === 'commenting-cursor') {
            setEmojiPickerOpen(false)
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/commenting-cursor.png) 16 18, auto`
        } else {
            setEmojiPickerOpen(false)
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
        }
    }, [emojiSubMode, ensureEmojiSize, selectedEmoji])

    useEffect(() => {
        ensureEmojiSize(selectedEmoji as string)
    }, [selectedEmoji, ensureEmojiSize])

    const handleSelectEmoji = (emoji: string) => {
        setSelectedEmoji(emoji)
        setHasSelectedEmoji(true)
        setEmojiPickerOpen(false)
        ensureEmojiSize(emoji)

        if (emojiSubMode === 'stamp') {
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/stamp-cursor.png) 0 32, auto`
        } else {
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/wand-cursor.png) 4 4, auto`
        }
    }

    const handleSetSubMode = useCallback((mode: EmojiSubMode) => {
        setEmojiSubMode(mode)

        if (hasSelectedEmoji) {
            if (mode === 'stamp') {
                document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/stamp-cursor.png) 0 32, auto`
            } else {
                document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/wand-cursor.png) 4 4, auto`
            }
        }
    }, [hasSelectedEmoji])

    const stopAnimation = useCallback(() => {
        if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
    }, [])

    const resetStampState = useCallback(() => {
        stopAnimation()
        pressStartRef.current = null
        currentStageRef.current = 0
        overshootUntilRef.current = null
        setIsStamping(false)
        setPreviewScale(1)
        setPreviewRotation(0)
        setPreviewOpacity(DEFAULT_PREVIEW_OPACITY)
    }, [stopAnimation])

    const animateHold = useCallback(() => {
        if (pressStartRef.current == null) return
        const now = performance.now()
        const elapsedSeconds = (now - pressStartRef.current) / 1000
        const {scale: baseScale, rotation: baseRotation} = getHoldTransform(elapsedSeconds)
        const stage = getHoldStage(elapsedSeconds)

        if (stage !== currentStageRef.current) {
            currentStageRef.current = stage
            overshootUntilRef.current = now + OVERSHOOT_DURATION_MS
        }

        const overshootActive = overshootUntilRef.current != null && overshootUntilRef.current > now
        const overshootScale = overshootActive ? baseScale + HOLD_OVERSHOOT : baseScale

        const shakeActive = elapsedSeconds >= 1
        const shakeScale =
            shakeActive ? 1 + Math.sin(now * 0.05) * SHAKE_SCALE_AMPLITUDE : 1
        const shakeRotation =
            shakeActive ? Math.sin(now * 0.06) * SHAKE_ROTATION_AMPLITUDE : 0

        const nextScale = overshootScale * shakeScale
        const nextRotation = baseRotation + shakeRotation

        setPreviewScale((prev) => (prev === nextScale ? prev : nextScale))
        setPreviewRotation((prev) => (prev === nextRotation ? prev : nextRotation))
        rafRef.current = requestAnimationFrame(animateHold)
    }, [])

    const handleStamp = () => {

        if (activeTool === 'emoji' && !hasSelectedEmoji) {
            setEmojiPickerOpen(false)
            setActiveTool('hand')
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
            return
        }


        if (activeTool === 'emoji' && emojiSubMode === 'stamp' && hasSelectedEmoji) {

            pressStartRef.current = performance.now()
            currentStageRef.current = 0
            overshootUntilRef.current = null
            setIsStamping(true)
            setPreviewOpacity(1)
            const {scale, rotation} = getHoldTransform(0)
            setPreviewScale(scale)
            setPreviewRotation(rotation)
            stopAnimation()
            rafRef.current = requestAnimationFrame(animateHold)
        }
    }

    const handleStampMouseUp = () => {
        if (!isStamping) return
        stopAnimation()
        const pointer = stageRef.current?.getRelativePointerPosition()
        const elapsedSeconds = pressStartRef.current
            ? (performance.now() - pressStartRef.current) / 1000
            : 0
        const {scale, rotation} = getHoldTransform(elapsedSeconds)
        if (pointer) {
            const newObj: BoardItem = {
                id: Date.now().toString(),
                type: 'emoji',
                src: selectedEmoji,
                x: pointer.x,
                y: pointer.y - 3,
                rotation,
                scale
            }
            setObjectsByRoute((prev) => ({
                ...prev,
                [currentRoute]: [...(prev[currentRoute] || []), newObj]
            }))
        }
        resetStampState()
    }

    const handleStampCancel = useCallback(() => {
        if (!isStamping) return
        resetStampState()
    }, [isStamping, resetStampState])

    useEffect(() => {
        if (!(activeTool === 'emoji' && emojiSubMode === 'stamp')) {
            resetStampState()
        }
    }, [activeTool, emojiSubMode, resetStampState])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleStampCancel()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleStampCancel])

    useEffect(() => () => stopAnimation(), [stopAnimation])


    const objects = objectsByRoute[currentRoute] || []

    return {
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
        isStamping,
        handleStampMouseUp,
        handleStampCancel,
        previewScale,
        previewRotation,
        previewOpacity
    }
}
