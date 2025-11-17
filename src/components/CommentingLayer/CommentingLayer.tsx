import React, {useEffect, useRef, useState} from 'react'
import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import {Tool} from '../../types'
import {useZoomPanContext} from '../../context/ZoomPanContext'
import {CommentData, useComments} from '../../context/CommentsContext'

interface Props {
    activeTool: Tool
    currentRoute?: string
}


const TOOLBAR_SPACE = 100
const Overlay = styled('div')<{ enabled: boolean }>(({enabled}) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: TOOLBAR_SPACE,
    zIndex: 5,
    pointerEvents: enabled ? 'auto' : 'none',
}))


const BUBBLE_SIZE = 25
const BUBBLE_RADIUS = BUBBLE_SIZE / 2

const BubbleBase = styled('div')({
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: `${BUBBLE_RADIUS}px ${BUBBLE_RADIUS}px ${BUBBLE_RADIUS}px 1px`,
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
})


const BlueBubble = styled(BubbleBase)({
    backgroundColor: '#0B99FF',
    color: '#fff',
})


const LetterCircle = styled('div')({
    width: 14,
    height: 14,
    borderRadius: '50%',
    backgroundColor: '#5263FF',
    color: '#fff',
    fontSize: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    flexShrink: 0,
})


const UserBubble = styled(BubbleBase)(({theme}) => ({
    backgroundColor: '#222222',
    boxShadow: '0 0 0 0.75px #FFFFFF',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'auto',
}))

const CommentBoxWrapper = styled('div')(({theme}) => ({
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

export default function CommentingLayer({activeTool, currentRoute = ''}: Props) {
    const {getCommentsForRoute, addComment, activeCommentId, setActiveCommentId} = useComments()
    const [editing, setEditing] = useState<CommentData | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [hoveredId, setHoveredId] = useState<string | null>(null)


    const {stageScale, stagePos} = useZoomPanContext()


    const comments = getCommentsForRoute(currentRoute)


    useEffect(() => {
        if (editing && textareaRef.current) {
            textareaRef.current.focus()
        }
    }, [editing])

    useEffect(() => {
        autoResize()
    }, [editing])

    useEffect(() => {
        if (!activeCommentId || activeTool !== 'commenting-cursor') {
            setHoveredId(null)
            setActiveCommentId(null)
        }
    }, [activeCommentId, activeTool, setActiveCommentId])

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {

        if (editing) {

            if (!(e.target as HTMLElement).closest('[data-ignore-comment]')) {
                setEditing(null)
            }
            return
        }

        if (activeTool !== 'commenting-cursor') return


        if ((e.target as HTMLElement).closest('[data-ignore-comment]')) {
            return
        }

        const {clientX, clientY} = e

        const stageX = (clientX - stagePos.x) / stageScale
        const stageY = (clientY - stagePos.y) / stageScale

        const newComment: CommentData = {
            id: Date.now().toString(),
            x: stageX,
            y: stageY,
            text: '',
            userName: 'Anonymous',
            createdAt: Date.now(),
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
        addComment(currentRoute, {
            ...editing,
            text: trimmed,
            createdAt: Date.now(),
            userName: editing.userName ?? 'Anonymous'
        })
        setEditing(null)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }


    const timeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000)
        if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'} ago`
        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
        const days = Math.floor(hours / 24)
        if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
        const months = Math.floor(days / 30)
        if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
        const years = Math.floor(months / 12)
        return `${years} year${years === 1 ? '' : 's'} ago`
    }

    return (
        <Overlay enabled={activeTool === 'commenting-cursor' || editing !== null} onClick={handleOverlayClick}>

            {comments.map((c) => {
                const screenX = stagePos.x + c.x * stageScale
                const screenY = stagePos.y + c.y * stageScale
                const isHovered = hoveredId === c.id || activeCommentId === c.id


                const leftPosition = isHovered ? screenX - BUBBLE_SIZE / 2 : screenX

                return (
                    <UserBubble
                        key={c.id}
                        style={{
                            left: leftPosition,
                            top: screenY,
                            padding: isHovered ? '12px 16px' : 0,
                            minWidth: BUBBLE_SIZE,
                            minHeight: BUBBLE_SIZE,
                            width: isHovered ? 'auto' : BUBBLE_SIZE,
                            height: isHovered ? 'auto' : BUBBLE_SIZE,
                            justifyContent: isHovered ? 'flex-start' : 'center',
                            transform: isHovered ? 'translate(0, -50%)' : 'translate(-50%, -50%)',
                            borderRadius: isHovered
                                ? `${BUBBLE_RADIUS}px ${BUBBLE_RADIUS}px ${BUBBLE_RADIUS}px 1px`
                                : undefined,
                        }}
                        onMouseEnter={() => {
                            if (activeTool !== 'commenting-cursor') {
                                setHoveredId(c.id)
                            }
                        }}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {!isHovered && (
                            <span style={{fontSize: 12, fontWeight: 700}}>
                                {c.userName.charAt(0).toUpperCase()}
                            </span>
                        )}
                        {isHovered && (
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        marginBottom: 2,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 700,
                                            fontSize: 16,
                                        }}
                                    >
                                        {c.userName}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: 12,
                                            color: '#777',
                                        }}
                                    >
                                        {timeAgo(c.createdAt)}
                                    </span>
                                </div>
                                <span
                                    style={{
                                        fontSize: 14,
                                        lineHeight: '20px',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {c.text}
                                </span>
                            </div>
                        )}
                    </UserBubble>
                )
            })}

            {editing && (
                <>
                    {(() => {
                        const screenX = stagePos.x + editing.x * stageScale
                        const screenY = stagePos.y + editing.y * stageScale
                        return (
                            <>
                                <BlueBubble
                                    style={{left: screenX, top: screenY}}
                                    data-ignore-comment
                                />
                                <CommentBoxWrapper
                                    style={{left: screenX + 20, top: screenY - 10}}
                                    data-ignore-comment
                                >
                                    <StyledTextarea
                                        placeholder="Add a comment"
                                        value={editing.text}
                                        onChange={(e) => {
                                            setEditing({...editing, text: e.target.value})
                                            autoResize()
                                        }}
                                        onKeyDown={handleKeyDown}
                                        ref={textareaRef}
                                        data-ignore-comment
                                    />
                                    <Divider style={{margin: '2px 0', backgroundColor: '#F0F0F0'}} data-ignore-comment/>
                                    <SubmitRow data-ignore-comment>
                                        <SubmitButton size="small" onClick={handleSubmit} data-ignore-comment>
                                            <ArrowUpwardIcon sx={{color: '#fff', fontSize: 16}}/>
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
