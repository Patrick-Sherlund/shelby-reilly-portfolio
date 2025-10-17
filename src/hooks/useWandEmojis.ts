import { useState, useRef, useEffect } from 'react'
import { Tool, EmojiSubMode, WandEmoji } from '../types'
import Konva from 'konva'

export const WAND_SPAWN_INTERVAL = 50
export const WAND_LIFETIME = 500
export const WAND_MAX_ANGLE = Math.PI / 2
export const WAND_TRAVEL_DISTANCE = 225

interface UseWandEmojisParams {
    stageRef: React.RefObject<Konva.Stage>
    activeTool: Tool
    emojiSubMode: EmojiSubMode
    selectedEmoji: string
}

export function useWandEmojis({
                                  stageRef,
                                  activeTool,
                                  emojiSubMode,
                                  selectedEmoji
                              }: UseWandEmojisParams) {
    const [wandEmojis, setWandEmojis] = useState<WandEmoji[]>([])
    const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleStageMouseDown = () => {
        if (activeTool === 'emoji' && emojiSubMode === 'wand') {
            spawnIntervalRef.current = setInterval(() => {
                const st = stageRef.current
                if (!st) return
                const pointer = st.getRelativePointerPosition()
                if (!pointer) return

                const rotation = (Math.random() - 0.5) * 40
                const floatAngle = (Math.random() - 0.5) * WAND_MAX_ANGLE

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
            }, WAND_SPAWN_INTERVAL)
        }
    }

    const handleStageMouseUp = () => {
        if (spawnIntervalRef.current) {
            clearInterval(spawnIntervalRef.current)
            spawnIntervalRef.current = null
        }
    }

    const handleStageMouseLeave = () => {
        if (spawnIntervalRef.current) {
            clearInterval(spawnIntervalRef.current)
            spawnIntervalRef.current = null
        }
    }

    useEffect(() => {
        let animReq: number
        const animate = () => {
            const now = performance.now()
            setWandEmojis((prev) =>
                prev.filter((item) => now - item.bornAt < WAND_LIFETIME)
            )
            animReq = requestAnimationFrame(animate)
        }
        animReq = requestAnimationFrame(animate)
        return () => {
            cancelAnimationFrame(animReq)
        }
    }, [])

    return {
        wandEmojis,
        handleStageMouseDown,
        handleStageMouseUp,
        handleStageMouseLeave,
        WAND_TRAVEL_DISTANCE
    }
}
