import { useState, useCallback } from 'react'
import Konva from 'konva'
import { Tool, BoardItem, EmojiSubMode } from '../types'

interface UseEmojiToolParams {
    stageRef: React.RefObject<Konva.Stage>
}

export function useEmojiTool({ stageRef }: UseEmojiToolParams) {
    const [activeTool, setActiveTool] = useState<Tool>(null)
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState(
        require('../assets/images/emoji-wheel/fire-sticker.png')
    )
    const [hasSelectedEmoji, setHasSelectedEmoji] = useState(false)
    const [emojiButtonRect, setEmojiButtonRect] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const [emojiSubMode, setEmojiSubMode] = useState<EmojiSubMode>('stamp')
    const [objects, setObjects] = useState<BoardItem[]>([])

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
            // Reset the selection state when emoji tool is opened
            setHasSelectedEmoji(false)
            // Reset to default cursor when emoji tool is first selected
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
        } else if (tool === 'commenting-cursor') {
            setEmojiPickerOpen(false)
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/commenting-cursor.png) 16 18, auto`
        } else {
            setEmojiPickerOpen(false)
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
        }
    }, [emojiSubMode])

    const handleSelectEmoji = (emoji: string) => {
        setSelectedEmoji(emoji)
        setHasSelectedEmoji(true)
        setEmojiPickerOpen(false)
        // After selecting an emoji, update cursor based on submode
        if (emojiSubMode === 'stamp') {
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/stamp-cursor.png) 0 32, auto`
        } else {
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/wand-cursor.png) 4 4, auto`
        }
    }

    const handleSetSubMode = useCallback((mode: EmojiSubMode) => {
        setEmojiSubMode(mode)
        // Only update cursor if an emoji has been selected
        if (hasSelectedEmoji) {
            if (mode === 'stamp') {
                document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/stamp-cursor.png) 0 32, auto`
            } else {
                document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/wand-cursor.png) 4 4, auto`
            }
        }
    }, [hasSelectedEmoji])

    const handleStamp = () => {
        // If emoji tool is active but no emoji selected yet, close picker and reset to hand tool
        if (activeTool === 'emoji' && !hasSelectedEmoji) {
            setEmojiPickerOpen(false)
            setActiveTool('hand')
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
            return
        }

        // Only allow stamping if user has selected an emoji from the picker
        if (activeTool === 'emoji' && emojiSubMode === 'stamp' && hasSelectedEmoji) {
            const pointer = stageRef.current?.getRelativePointerPosition()
            if (!pointer) return
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
        hasSelectedEmoji
    }
}
