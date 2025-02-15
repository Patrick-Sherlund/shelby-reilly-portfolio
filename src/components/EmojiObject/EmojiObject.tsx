import React from 'react'
import { Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'

type EmojiObjectProps = {
    src: string
    x: number
    y: number
    rotation?: number
    opacity?: number
}

export default function EmojiObject({ src, x, y, rotation = 0, opacity = 1 }: EmojiObjectProps) {
    const [img] = useImage(src)
    return <KonvaImage image={img} x={x} y={y} width={40} height={40} rotation={rotation} opacity={opacity} />
}
