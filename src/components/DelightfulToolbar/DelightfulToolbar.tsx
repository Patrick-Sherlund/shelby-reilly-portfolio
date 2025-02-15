// DelightfulToolbar.tsx
import React, { useRef, useEffect } from 'react'
import { IconButton } from '@mui/material'
import PanToolAltIcon from '@mui/icons-material/PanToolAlt'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import { NavWrapper, ToolbarContainer, ToolSection } from './DelightfulToolbar.styles'

type Tool = 'hand' | 'pen' | 'sticky' | 'emoji' | null

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

    // Ensure the first tool (hand) is active by default
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
        <NavWrapper>
            <ToolbarContainer>
                <ToolSection isActive={activeTool === 'hand'}>
                    <IconButton
                        onClick={() => handleSelectTool('hand')}
                        sx={{
                            color: activeTool === 'hand' ? '#fff' : 'inherit',
                            '&:hover': {
                                backgroundColor: activeTool === 'hand' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <PanToolAltIcon />
                    </IconButton>
                </ToolSection>

                <ToolSection isActive={activeTool === 'pen'}>
                    <IconButton
                        onClick={() => handleSelectTool('pen')}
                        sx={{
                            color: activeTool === 'pen' ? '#fff' : 'inherit',
                            '&:hover': {
                                backgroundColor: activeTool === 'pen' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <ModeEditOutlineIcon />
                    </IconButton>
                </ToolSection>

                <ToolSection isActive={activeTool === 'sticky'}>
                    <IconButton
                        onClick={() => handleSelectTool('sticky')}
                        sx={{
                            color: activeTool === 'sticky' ? '#fff' : 'inherit',
                            '&:hover': {
                                backgroundColor: activeTool === 'sticky' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <StickyNote2Icon />
                    </IconButton>
                </ToolSection>

                <ToolSection isActive={activeTool === 'emoji'}>
                    <IconButton
                        ref={emojiButtonRef}
                        onClick={() => handleSelectTool('emoji')}
                        sx={{
                            color: activeTool === 'emoji' ? '#fff' : 'inherit',
                            '&:hover': {
                                backgroundColor: activeTool === 'emoji' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <EmojiEmotionsIcon />
                    </IconButton>
                </ToolSection>
            </ToolbarContainer>
        </NavWrapper>
    )
}
