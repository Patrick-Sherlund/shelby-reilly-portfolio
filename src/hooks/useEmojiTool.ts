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
        `${process.env.PUBLIC_URL}/images/emojis/fun/charlie.png`
    )
    const [emojiButtonRect, setEmojiButtonRect] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const [emojiSubMode, setEmojiSubMode] = useState<EmojiSubMode>('stamp')
    const [objects, setObjects] = useState<BoardItem[]>([])

    const stampEmojis = [
        `${process.env.PUBLIC_URL}/images/emojis/fun/charlie.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/cheeto-pat.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/emo-shelby.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/excited-shelby.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/peace-pat.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/plotting-pat.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/shrek.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/simba.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/tillamook-pat.png`
    ]

    const smileyEmojis = [
        `${process.env.PUBLIC_URL}/images/emojis/fun/charlie.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/cheeto-pat.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/emo-shelby.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/excited-shelby.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/peace-pat.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/plotting-pat.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/shrek.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/simba.png`,
        `${process.env.PUBLIC_URL}/images/emojis/fun/tillamook-pat.png`
    ]

    const handleToolChange = useCallback((tool: Tool) => {
        setActiveTool(tool)
        if (tool === 'emoji') {
            setEmojiPickerOpen(true)
            document.body.style.cursor =
                emojiSubMode === 'stamp'
                    ? `url(${process.env.PUBLIC_URL}/images/stamp-cursor.png) 0 32, auto`
                    : `url(${process.env.PUBLIC_URL}/images/wand-cursor.png) 8 8, auto`
        } else if (tool === 'commenting-cursor') {
            setEmojiPickerOpen(false)
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/commenting-cursor.png) 4 0, auto`
        } else {
            setEmojiPickerOpen(false)
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`
        }
    }, [emojiSubMode])

    const handleSelectEmoji = (emoji: string) => {
        setSelectedEmoji(emoji)
        setEmojiPickerOpen(false)
    }

    const handleSetSubMode = useCallback((mode: EmojiSubMode) => {
        setEmojiSubMode(mode)
        if (mode === 'stamp') {
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/stamp-cursor.png) 0 32, auto`
        } else {
            document.body.style.cursor = `url(${process.env.PUBLIC_URL}/images/wand-cursor.png) 8 8, auto`
        }
    }, [])

    const handleStamp = () => {
        if (activeTool === 'emoji' && emojiSubMode === 'stamp') {
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
        handleStamp
    }
}
