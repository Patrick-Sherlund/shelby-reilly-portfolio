
import React from 'react'
import {
    BottomHalf,
    CenterRing,
    EmojiImage,
    EmojiSlice,
    InnerCircle,
    PickerContainer,
    PieDivider,
    TopHalf
} from './EmojiPicker.styles'

type EmojiSubMode = 'stamp' | 'wand'

type Props = {
    visible: boolean
    stampEmojis: string[]
    smileyEmojis: string[]
    selected: string
    onSelect: (emoji: string) => void
    anchorRect: { x: number; y: number; width: number; height: number }
    subMode: EmojiSubMode
    setSubMode: (mode: EmojiSubMode) => void
}

export default function EmojiPicker({
                                        visible,
                                        stampEmojis,
                                        smileyEmojis,
                                        selected,
                                        onSelect,
                                        anchorRect,
                                        subMode,
                                        setSubMode
                                    }: Props) {
    if (!visible) return null

    const emojisToShow = subMode === 'stamp' ? stampEmojis : smileyEmojis
    const angleStep = 360 / emojisToShow.length
    const centerLeft = anchorRect.x + anchorRect.width / 2 + window.scrollX
    const centerTop = anchorRect.y + anchorRect.height / 2 + window.scrollY - 90

    return (
        <PickerContainer data-ignore-stage style={{ left: centerLeft, top: centerTop }}>
            {emojisToShow.map((_, i) => {
                const angle = i * angleStep + 10
                return (
                    <PieDivider
                        key={`divider-${i}`}
                        style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                    />
                )
            })}
            {emojisToShow.map((emoji, i) => {
                const angle = i * angleStep
                return (
                    <EmojiSlice
                        key={emoji}
                        style={{
                            transform: `
                translate(-50%, -50%)
                rotate(${angle}deg)
                translate(5.5rem)
                rotate(-${angle}deg)
              `
                        }}
                        onClick={() => onSelect(emoji)}
                    >
                        <EmojiImage src={emoji} alt="emoji" isSelected={emoji === selected} />
                    </EmojiSlice>
                )
            })}
            <CenterRing />
            <InnerCircle>
                <TopHalf
                    active={subMode === 'wand'}
                    onClick={() => setSubMode('wand')}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/images/wand-cursor.png`}
                        alt="Wand Mode"
                        width={24}
                        height={24}
                    />
                </TopHalf>
                <BottomHalf
                    active={subMode === 'stamp'}
                    onClick={() => setSubMode('stamp')}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/images/stamp-cursor.png`}
                        alt="Stamp Mode"
                        width={24}
                        height={24}
                    />
                </BottomHalf>
            </InnerCircle>
        </PickerContainer>
    )
}
