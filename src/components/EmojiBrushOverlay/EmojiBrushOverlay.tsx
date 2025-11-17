import React from 'react'
import {EmojiPreview, OverlayContainer} from './EmojiBrushOverlay.styles'

type Props = {
    emoji: string
    visible: boolean
    x: number
    y: number
    scale?: number
    rotation?: number
    opacity?: number
}

export default function EmojiBrushOverlay({
                                              emoji,
                                              visible,
                                              x,
                                              y,
                                              scale = 1,
                                              rotation = 0,
                                              opacity = 0.6
                                          }: Props) {
    if (!emoji || !visible) return null

    return (
        <OverlayContainer style={{top: y, left: x}}>
            <EmojiPreview
                src={emoji}
                alt="emoji-preview"
                style={{
                    opacity,
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center'
                }}
            />
        </OverlayContainer>
    )
}
