import React, { useEffect, useState, useRef } from 'react'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Tool } from '../../types'
import { useZoomPanContext } from '../../context/ZoomPanContext'

// Types
interface CommentData {
    id: string
    x: number
    y: number
    text: string
}

interface Props {
    activeTool: Tool
}

// Styled Components
const TOOLBAR_SPACE = 100 // approximate space reserved for toolbar at bottom (px)
const Overlay = styled('div')<{ enabled: boolean }>(({ enabled }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: TOOLBAR_SPACE,
    zIndex: 5,
    pointerEvents: enabled ? 'auto' : 'none',
}))

const MarkerImg = styled('img')({
    width: 20,
    height: 20,
    transform: 'translate(-50%, -50%)', // center the marker
    position: 'absolute',
})

const CommentBoxWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: 240,
    background: '#ffffff',
    borderRadius: 4,
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.15)'
            : '0 2px 8px rgba(0,0,0,0.4)',
}))

const StyledTextarea = styled('textarea')({
    resize: 'none',
    border: 'none',
    outline: 'none',
    padding: '4px 8px',
    minHeight: 24,
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: '20px',
    width: '100%',
    overflow: 'hidden',
})

const SubmitRow = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '4px 4px',
})

const SubmitButton = styled(IconButton)({
    width: 28,
    height: 28,
    backgroundColor: '#0B99FF',
    '&:hover': {
        backgroundColor: '#0B99FF',
    },
})

export default function CommentingLayer({ activeTool }: Props) {
    const [comments, setComments] = useState<CommentData[]>([])
    const [editing, setEditing] = useState<CommentData | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    // Access zoom / pan / stage information
    const { stageScale, stagePos } = useZoomPanContext()

    // Load from localStorage on mount
    useEffect(() => {
        const stored = window.localStorage.getItem('figma-comments')
        if (stored) {
            try {
                setComments(JSON.parse(stored))
            } catch {
                // ignore parse errors
            }
        }
    }, [])

    // Persist to localStorage when comments change
    useEffect(() => {
        window.localStorage.setItem('figma-comments', JSON.stringify(comments))
    }, [comments])

    // Focus textarea when it appears
    useEffect(() => {
        if (editing && textareaRef.current) {
            textareaRef.current.focus()
        }
    }, [editing])

    useEffect(() => {
        autoResize()
    }, [editing])

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // When editing exists and user clicks outside the box, cancel editing without creating a new one
        if (editing) {
            // If click is inside current comment UI, ignore (handled below) else cancel
            if (!(e.target as HTMLElement).closest('[data-ignore-comment]')) {
                setEditing(null)
            }
            return
        }

        if (activeTool !== 'commenting-cursor') return

        // Ignore clicks on toolbar-generated UI
        if ((e.target as HTMLElement).closest('[data-ignore-comment]')) {
            return
        }

        const { clientX, clientY } = e
        // Transform screen coords to stage coords
        const stageX = (clientX - stagePos.x) / stageScale
        const stageY = (clientY - stagePos.y) / stageScale

        const newComment: CommentData = {
            id: Date.now().toString(),
            x: stageX,
            y: stageY,
            text: '',
        }
        setEditing(newComment)
    }

    const autoResize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    const handleSubmit = () => {
        if (!editing) return
        const trimmed = editing.text.trim()
        if (trimmed === '') return
        setComments((prev) => [...prev, { ...editing, text: trimmed }])
        setEditing(null)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <Overlay enabled={activeTool === 'commenting-cursor' || editing !== null} onClick={handleOverlayClick}>
            {/* Existing comment markers */}
            {comments.map((c) => {
                const screenX = stagePos.x + c.x * stageScale
                const screenY = stagePos.y + c.y * stageScale
                return (
                    <MarkerImg
                        key={c.id}
                        src={`${process.env.PUBLIC_URL}/images/user-comment-marker.png`}
                        style={{ left: screenX, top: screenY }}
                    />
                )
            })}

            {/* Editing marker and box */}
            {editing && (
                <>
                    {(() => {
                        const screenX = stagePos.x + editing.x * stageScale
                        const screenY = stagePos.y + editing.y * stageScale
                        return (
                        <>
                            <MarkerImg
                                src={`${process.env.PUBLIC_URL}/images/comment-marker.png`}
                                style={{ left: screenX, top: screenY }}
                                data-ignore-comment
                            />
                            <CommentBoxWrapper
                                style={{ left: screenX + 20, top: screenY - 10 }}
                                data-ignore-comment
                            >
                                <StyledTextarea
                                    placeholder="Add a comment"
                                    value={editing.text}
                                    onChange={(e) => {
                                        setEditing({ ...editing, text: e.target.value })
                                        autoResize()
                                    }}
                                    onKeyDown={handleKeyDown}
                                    ref={textareaRef}
                                    data-ignore-comment
                                />
                                <Divider style={{ margin: '2px 0', backgroundColor: '#F0F0F0' }} data-ignore-comment />
                                <SubmitRow data-ignore-comment>
                                    <SubmitButton size="small" onClick={handleSubmit} data-ignore-comment>
                                        <ArrowUpwardIcon sx={{ color: '#fff', fontSize: 16 }} />
                                    </SubmitButton>
                                </SubmitRow>
                            </CommentBoxWrapper>
                        </>
                        )
                    })()}
                </>
            )}
        </Overlay>
    )
} 