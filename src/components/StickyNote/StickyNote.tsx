import React, { useState } from 'react'
import { Group, Rect, Text } from 'react-konva'
import Konva from 'konva'

type StickyNoteProps = {
    text: string
    color: string
    stageRef: React.RefObject<Konva.Stage>
}

export default function StickyNote({ text, color, stageRef }: StickyNoteProps) {
    const [pos, setPos] = useState({ x: 80, y: 80 })

    const handleDragStart = (e: any) => {
        e.cancelBubble = true
        if (stageRef.current) {
            stageRef.current.draggable(false)
        }
    }

    const handleDragEnd = (e: any) => {
        e.cancelBubble = true
        setPos({ x: e.target.x(), y: e.target.y() })
        if (stageRef.current) {
            stageRef.current.draggable(true)
        }
    }

    return (
        <Group
            draggable
            x={pos.x}
            y={pos.y}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <Rect
                width={120}
                height={120}
                fill={color}
                cornerRadius={4}
                shadowColor="rgba(0,0,0,0.2)"
                shadowBlur={6}
            />
            <Text
                text={text}
                fill="#000"
                fontSize={16}
                fontStyle="bold"
                width={120}
                height={120}
                align="center"
                verticalAlign="middle"
            />
        </Group>
    )
}
