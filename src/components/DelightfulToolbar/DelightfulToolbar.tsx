import React, { useRef, useEffect } from 'react'
import { IconButton } from '@mui/material'
import {
    NavWrapper,
    ToolbarContainer,
    ToolSection,
    ToolImage
} from './DelightfulToolbar.styles'

type Tool = 'hand' | 'commenting-cursor' | 'sticky' | 'emoji' | null

type Props = {
    activeTool: Tool
    setActiveTool: (tool: Tool) => void
    setEmojiButtonRect: React.Dispatch<
        React.SetStateAction<{ x: number; y: number; width: number; height: number }>
    >
}

export default function DelightfulToolbar({
                                              activeTool,
                                              setActiveTool,
                                              setEmojiButtonRect
                                          }: Props) {
    const emojiButtonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (activeTool === null) {
            setActiveTool('hand')
        }
    }, [activeTool, setActiveTool])

    const handleSelectTool = (tool: Tool) => {
        setActiveTool(tool)
        if (tool === 'emoji' && emojiButtonRef.current) {
            const rect = emojiButtonRef.current.getBoundingClientRect()
            setEmojiButtonRect({
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
            })
        }
    }

    return (
        <NavWrapper data-ignore-comment data-ignore-stage>
            <ToolbarContainer>
                {/* 1) Cursor tool (left corner) */}
                <ToolSection isActive={activeTool === 'hand'} isCursorTool>
                    <IconButton
                        onClick={() => handleSelectTool('hand')}
                        sx={{
                            p: 0,
                            '&:hover': {
                                backgroundColor:
                                    activeTool === 'hand'
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <ToolImage isActive={activeTool === 'hand'}
                            sx={{width: 'auto', height: '50px'}}
                            src={`${process.env.PUBLIC_URL}/images/bar-cursor.png`}
                            alt="Cursor"
                        />
                    </IconButton>
                </ToolSection>

                {/* 2) commenting-cursor tool (middle) */}
                <ToolSection isActive={activeTool === 'commenting-cursor'}>
                    <IconButton
                        onClick={() => handleSelectTool('commenting-cursor')}
                        sx={{
                            p: 0,
                            '&:hover': {
                                backgroundColor:
                                    activeTool === 'commenting-cursor'
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <ToolImage isActive={activeTool === 'commenting-cursor'}
                            src={`${process.env.PUBLIC_URL}/images/commenting-cursor-lg.png`}
                            alt="commenting-cursor"
                        />
                    </IconButton>
                </ToolSection>

                {/* 3) Sticky tool (middle) */}
                <ToolSection isActive={activeTool === 'sticky'}>
                    <IconButton
                        onClick={() => handleSelectTool('sticky')}
                        sx={{
                            p: 0,
                            '&:hover': {
                                backgroundColor:
                                    activeTool === 'sticky'
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <ToolImage isActive={activeTool === 'sticky'}
                            src={`${process.env.PUBLIC_URL}/images/sticky-notes.png`}
                            alt="Sticky Notes"
                        />
                    </IconButton>
                </ToolSection>

                {/* 4) Sticker/Emoji tool (right corner) */}
                <ToolSection
                    isActive={activeTool === 'emoji'}
                    isStickerTool // <--- This will give the extra width
                >
                    <IconButton
                        ref={emojiButtonRef}
                        onClick={() => handleSelectTool('emoji')}
                        sx={{
                            p: 0,
                            '&:hover': {
                                backgroundColor:
                                    activeTool === 'emoji'
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <ToolImage  isActive={activeTool === 'emoji'}
                            src={`${process.env.PUBLIC_URL}/images/stickers.png`}
                            alt="Stickers"
                        />
                    </IconButton>
                </ToolSection>
            </ToolbarContainer>
        </NavWrapper>
    )
}