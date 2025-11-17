import React, {useEffect, useState} from 'react'
import {BottomHalf, EmojiImage, EmojiSlice, InnerCircle, PickerContainer, TopHalf} from './EmojiPicker.styles'

import {ReactComponent as WandEmoji} from '../../assets/images/emoji-wheel/wand-emoji.svg'
import {ReactComponent as StampEmoji} from '../../assets/images/emoji-wheel/stamp-emoji.svg'

type EmojiSubMode = 'stamp' | 'wand'

type EmojiOffset = {
    scale?: number
    angleOffset?: number
    distanceOffset?: number
}

type Props = {
    visible: boolean
    stampEmojis: string[]
    smileyEmojis: string[]
    selected: string
    onSelect: (emoji: string) => void
    anchorRect: { x: number; y: number; width: number; height: number }
    subMode: EmojiSubMode
    setSubMode: (mode: EmojiSubMode) => void
    emojiOffsets?: Record<string, EmojiOffset>
}

export default function EmojiPicker({
                                        visible,
                                        stampEmojis,
                                        smileyEmojis,
                                        selected,
                                        onSelect,
                                        anchorRect,
                                        subMode,
                                        setSubMode,
                                        emojiOffsets = {}
                                    }: Props) {
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (visible) {
            setIsAnimating(true)
        } else {
            setIsAnimating(false)
        }
    }, [visible])

    if (!visible) return null

    const emojisToShow = subMode === 'stamp' ? stampEmojis : smileyEmojis
    const angleStep = 360 / emojisToShow.length
    const centerLeft = anchorRect.x + anchorRect.width / 2 + window.scrollX
    const centerTop = anchorRect.y + anchorRect.height / 2 + window.scrollY - 90


    const getEmojiKey = (emojiPath: string | any): string => {

        const pathStr = typeof emojiPath === 'string' ? emojiPath : String(emojiPath)
        const parts = pathStr.split('/')
        const filename = parts[parts.length - 1]

        const cleanName = filename.replace(/\.[a-f0-9]+\.(png|jpg|jpeg|gif|svg)$/i, '.$1').replace(/\.(png|jpg|jpeg|gif|svg)$/i, '')
        return cleanName
    }

    return (
        <PickerContainer
            data-ignore-stage
            style={{left: centerLeft, top: centerTop}}
            className={isAnimating ? 'animating' : ''}
        >
            {emojisToShow.map((emoji, i) => {
                const emojiKey = getEmojiKey(emoji)
                const offset = emojiOffsets[emojiKey] || {}
                const scale = offset.scale || 1
                const angleOffset = offset.angleOffset || 0
                const distanceOffset = offset.distanceOffset || 0
                const angle = i * angleStep + angleOffset
                const distance = 5.75 + distanceOffset

                return (
                    <EmojiSlice
                        key={emoji}
                        style={{
                            transform: `
                translate(-50%, -50%)
                rotate(${angle}deg)
                translate(${distance}rem)
                rotate(-${angle}deg)
                scale(${scale})
              `
                        }}
                        onClick={() => onSelect(emoji)}
                    >
                        <EmojiImage src={emoji} alt="emoji" isSelected={emoji === selected}/>
                    </EmojiSlice>
                )
            })}
            <InnerCircle>
                <TopHalf
                    active={subMode === 'wand'}
                    onClick={() => setSubMode('wand')}
                >
                    <WandEmoji width={"24px"} height={"24px"}/>

                </TopHalf>
                <BottomHalf
                    active={subMode === 'stamp'}
                    onClick={() => setSubMode('stamp')}
                >
                    <StampEmoji width={"24px"} height={"24px"}/>

                </BottomHalf>
            </InnerCircle>
        </PickerContainer>
    )
}
