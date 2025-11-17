import {useEffect, useRef, useState} from 'react'
import {EmojiSubMode, Tool, WandEmoji} from '../types'
import Konva from 'konva'


export const WAND_SPAWN_INTERVAL = 84
export const WAND_LIFETIME = 1000
export const WAND_MAX_ANGLE = Math.PI / 2
export const WAND_TRAVEL_DISTANCE = 450

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
                                  selectedEmoji,
                              }: UseWandEmojisParams) {
    const [wandEmojis, setWandEmojis] = useState<WandEmoji[]>([])
    const spawnIntervalRef = useRef<number | null>(null)

    const clearSpawn = () => {
        if (spawnIntervalRef.current != null) {
            window.clearInterval(spawnIntervalRef.current)
            spawnIntervalRef.current = null
        }
    }

    const handleStageMouseDown = () => {
        if (activeTool === 'emoji' && emojiSubMode === 'wand') {
            clearSpawn()
            spawnIntervalRef.current = window.setInterval(() => {
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
                    floatAngle,
                }

                setWandEmojis((prev) => [...prev, newWandEmoji])
            }, WAND_SPAWN_INTERVAL)
        }
    }

    const handleStageMouseUp = clearSpawn
    const handleStageMouseLeave = clearSpawn


    useEffect(() => {
        if (!(activeTool === 'emoji' && emojiSubMode === 'wand')) {
            clearSpawn()
        }

    }, [activeTool, emojiSubMode])


    useEffect(() => {
        let animReq = 0
        const animate = () => {
            const now = performance.now()
            setWandEmojis((prev) => {
                const next = prev.filter((item) => now - item.bornAt < WAND_LIFETIME)

                return next.length === prev.length ? prev : next
            })
            animReq = requestAnimationFrame(animate)
        }
        animReq = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animReq)
    }, [])


    useEffect(() => clearSpawn, [])

    return {
        wandEmojis,
        handleStageMouseDown,
        handleStageMouseUp,
        handleStageMouseLeave,
        WAND_TRAVEL_DISTANCE,
    }
}
