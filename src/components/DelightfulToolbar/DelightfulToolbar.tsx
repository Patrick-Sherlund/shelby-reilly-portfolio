import React, {useEffect, useRef} from 'react'
import {IconButton} from '@mui/material'
import {NavWrapper, ToolbarContainer, ToolImage, ToolSection} from './DelightfulToolbar.styles'
import shelbyStickerIcon from '../../assets/images/emoji-wheel/sticker-tab-icon.png'
import cursorIcon from '../../assets/images/emoji-wheel/cursor-tab-icon.png'
import commentIcon from '../../assets/images/emoji-wheel/comment-tab-icon.png'

type Tool = 'hand' | 'commenting-cursor' | 'emoji' | null

type Props = {
    activeTool: Tool
    setActiveTool: (tool: Tool) => void
    setEmojiButtonRect: React.Dispatch<
        React.SetStateAction<{ x: number; y: number; width: number; height: number }>
    >
    hasSelectedEmoji?: boolean
}

export default function DelightfulToolbar({
                                              activeTool,
                                              setActiveTool,
                                              setEmojiButtonRect,
                                              hasSelectedEmoji = false
                                          }: Props) {
    const emojiButtonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (activeTool === null) {
            setActiveTool('hand')
        }
    }, [activeTool, setActiveTool])

    const handleSelectTool = (tool: Tool) => {

        if (tool === 'emoji' && activeTool === 'emoji' && !hasSelectedEmoji) {
            setActiveTool('hand')
            return
        }


        if (activeTool === tool && tool !== 'emoji') {
            setActiveTool('hand')
            return
        }

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
                                   src={cursorIcon}
                                   alt="Cursor"
                        />
                    </IconButton>
                </ToolSection>

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
                                   src={commentIcon}
                                   alt="commenting-cursor"
                        />
                    </IconButton>
                </ToolSection>

                <ToolSection
                    isActive={activeTool === 'emoji'}
                    isStickerTool
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
                        <ToolImage isActive={activeTool === 'emoji'}
                                   src={shelbyStickerIcon}
                                   alt="Stickers"
                                   sx={{width: 'clamp(56px, 9.5vw, 70px)', height: 'auto'}}
                        />
                    </IconButton>
                </ToolSection>
            </ToolbarContainer>
        </NavWrapper>
    )
}