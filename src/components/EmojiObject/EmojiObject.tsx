import React, {useEffect, useState} from 'react'
import {Image as KonvaImage} from 'react-konva'
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
    const [dimensions, setDimensions] = useState({width: 0, height: 0})

    useEffect(() => {
        if (img) {

            const originalWidth = img.naturalWidth || img.width
            const originalHeight = img.naturalHeight || img.height


            if (originalWidth >= originalHeight) {

                const aspectRatio = originalHeight / originalWidth
                setDimensions({
                    width: 40,
                    height: 40 * aspectRatio
                })
            } else {

                const aspectRatio = originalWidth / originalHeight
                setDimensions({
                    width: 40 * aspectRatio,
                    height: 40
                })
            }
        }
    }, [img])

    return (
        <KonvaImage
            image={img}
            x={x}
            y={y}
            rotation={rotation}
            opacity={opacity}
            width={dimensions.width}
            height={dimensions.height}
            offsetX={dimensions.width / 2}
            offsetY={dimensions.height / 2}
            scaleX={scale}
            scaleY={scale}
        />
    )
}
