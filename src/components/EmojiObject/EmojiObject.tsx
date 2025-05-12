import React, { useState, useEffect } from 'react'
import { Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'

type EmojiObjectProps = {
    src: string
    x: number
    y: number
    rotation?: number
    opacity?: number
    scale?: number
}

export default function EmojiObject({
                                        src,
                                        x,
                                        y,
                                        rotation = 0,
                                        opacity = 1,
                                        scale = 1
                                    }: EmojiObjectProps) {
    const [img] = useImage(src)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        if (img) {
            // Grab original image dimensions
            const originalWidth = img.naturalWidth || img.width
            const originalHeight = img.naturalHeight || img.height

            // Determine which dimension is bigger
            if (originalWidth >= originalHeight) {
                // Width is the larger dimension; scale to 40, adjust height proportionally
                const aspectRatio = originalHeight / originalWidth
                setDimensions({
                    width: 40 * scale,
                    height: 40 * aspectRatio * scale
                })
            } else {
                // Height is the larger dimension; scale to 40, adjust width proportionally
                const aspectRatio = originalWidth / originalHeight
                setDimensions({
                    width: 40 * aspectRatio * scale,
                    height: 40 * scale
                })
            }
        }
    }, [img, scale])

    return (
        <KonvaImage
            image={img}
            x={x}
            y={y}
            rotation={rotation}
            opacity={opacity}
            width={dimensions.width}
            height={dimensions.height}
        />
    )
}
