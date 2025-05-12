import React from 'react'
import { OverlayContainer, EmojiPreview } from './EmojiBrushOverlay.styles'

type Props = {
    emoji: string
    visible: boolean
    x: number
    y: number
}

export default function EmojiBrushOverlay({ emoji, visible, x, y }: Props) {
    if (!emoji || !visible) return null

    return (
        <OverlayContainer style={{ top: y, left: x }}>
            <EmojiPreview src={emoji} alt="emoji-preview" />
        </OverlayContainer>
    )
}
