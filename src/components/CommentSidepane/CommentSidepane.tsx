import React, {useEffect, useMemo} from 'react'
import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import {useComments} from '../../context/CommentsContext'
import {useZoomPanContext} from '../../context/ZoomPanContext'

type Props = {
    open: boolean
    currentRoute: string
    collapsed: boolean
    onCollapseToggle: () => void
}

const PANEL_WIDTH = 300
const COLLAPSED_WIDTH = 80

const Panel = styled('aside')<{ $open: boolean; $collapsed: boolean }>(({theme, $open, $collapsed}) => {
    const width = $collapsed ? COLLAPSED_WIDTH : PANEL_WIDTH
    return {
        position: 'fixed',
        top: 0,
        right: 0,
        width,
        height: '100vh',
        backgroundColor: '#222222',
        color: '#FFFFFF',
        boxShadow: '-8px 0 24px rgba(0,0,0,0.45)',
        transform: $open ? 'translateX(0)' : `translateX(${width + 24}px)`,
        transition: 'transform 240ms ease, width 240ms ease',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: $open ? 'auto' : 'none',
        borderLeft: '1px solid rgba(255,255,255,0.16)',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    }
})

const Header = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    borderBottom: '1px solid rgba(255,255,255,0.12)'
})

const List = styled('div')({
    flex: 1,
    overflowY: 'auto'
})

const CollapsedList = styled('div')({
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
})

const Row = styled('button')<{ $active: boolean; $collapsed: boolean }>(({$active, $collapsed}) => ({
    width: '100%',
    background: $active ? 'rgba(255,255,255,0.08)' : 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    color: 'inherit',
    textAlign: $collapsed ? 'center' : 'left',
    padding: $collapsed ? '18px 8px' : '12px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: $collapsed ? 'center' : 'flex-start',
    cursor: 'pointer',
    transition: 'background 140ms ease',
    outline: 'none',
    ':hover': {
        background: 'rgba(255,255,255,0.06)'
    }
}))

const Meta = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    opacity: 0.7,
    fontSize: 12,
    marginBottom: 4
})

const Body = styled(Typography)({
    fontSize: 14,
    lineHeight: '20px',
    color: '#FFFFFF',
    opacity: 0.9,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
})

const DeleteButton = styled(IconButton)({
    marginLeft: 'auto',
    color: 'rgba(255,255,255,0.72)',
    '&:hover': {
        color: '#FFFFFF',
        backgroundColor: 'rgba(255,255,255,0.08)'
    }
})

const EmptyState = styled(Box)({
    padding: '16px 14px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14
})

const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
}

export function CommentSidepane({
                                    open,
                                    currentRoute,
                                    collapsed,
                                    onCollapseToggle,
                                }: Props) {
    const {getCommentsForRoute, deleteComment, activeCommentId, setActiveCommentId} = useComments()
    const {stageScale, setStagePos, clampStagePosition} = useZoomPanContext()

    const comments = getCommentsForRoute(currentRoute)
    const ordered = useMemo(
        () => [...comments].sort((a, b) => b.createdAt - a.createdAt),
        [comments]
    )

    useEffect(() => {
        if (collapsed) {
            setActiveCommentId(null)
        }
    }, [collapsed, setActiveCommentId])

    const focusComment = (commentId: string) => {
        const target = comments.find((c) => c.id === commentId)
        if (!target) return
        setActiveCommentId(commentId)
        setStagePos((prev) => {
            const centeredY = clampStagePosition(window.innerHeight / 2 - target.y * stageScale)
            return {x: prev.x, y: centeredY}
        })
    }

    const handleDelete = (commentId: string) => {
        deleteComment(currentRoute, commentId)
    }

    return (
        <>
            <Panel $open={open} $collapsed={collapsed} aria-label="Comments sidepane" data-ignore-stage>
                {!collapsed ? (
                    <>
                        <Header>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 8, minWidth: 0}}>
                                <ChatBubbleOutlineIcon sx={{color: '#FFFFFF', flexShrink: 0}}/>
                                <Typography
                                    sx={{fontWeight: 700, fontSize: 14, color: '#FFFFFF', whiteSpace: 'nowrap'}}>
                                    Comments
                                </Typography>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{borderColor: 'rgba(255,255,255,0.16)'}}
                                />
                                <Typography sx={{fontSize: 12, opacity: 0.7, whiteSpace: 'nowrap'}}>
                                    {comments.length} on this page
                                </Typography>
                            </Box>
                            <IconButton onClick={onCollapseToggle} sx={{color: '#FFFFFF'}}
                                        aria-label={collapsed ? 'Expand comments' : 'Collapse comments'}>
                                {collapsed ? <KeyboardArrowLeftIcon/> :
                                    <KeyboardArrowLeftIcon sx={{transform: 'rotate(180deg)'}}/>}
                            </IconButton>
                        </Header>
                        <List
                            onWheel={(e) => {

                                e.stopPropagation()
                            }}
                        >
                            {ordered.length === 0 && (
                                <EmptyState>No comments on this page yet.</EmptyState>
                            )}
                            {ordered.map((comment, idx) => (
                                <Row
                                    key={comment.id}
                                    onClick={() => focusComment(comment.id)}
                                    $active={activeCommentId === comment.id}
                                    $collapsed={collapsed}
                                >
                                    <Box sx={{flex: 1, minWidth: 0}}>
                                        <Meta>
                                            <Typography sx={{fontWeight: 800, fontSize: 13, opacity: 0.85}}>
                                                #{idx + 1}
                                            </Typography>
                                            <Typography sx={{fontWeight: 700, fontSize: 13}}>
                                                {comment.userName || 'Anonymous'}
                                            </Typography>
                                            <span aria-hidden>•</span>
                                            <span>{formatTimeAgo(comment.createdAt)}</span>
                                        </Meta>
                                        <Body variant="body2">{comment.text || '(No text)'}</Body>
                                    </Box>
                                    <DeleteButton
                                        size="small"
                                        aria-label="Delete comment"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(comment.id)
                                        }}
                                    >
                                        <DeleteOutlineIcon fontSize="small"/>
                                    </DeleteButton>
                                </Row>
                            ))}
                        </List>
                    </>
                ) : (
                    <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <Row
                            $active={false}
                            $collapsed={collapsed}
                            onClick={onCollapseToggle}
                            aria-label="Expand comments"
                        >
                            <ChatBubbleOutlineIcon sx={{color: '#FFFFFF', fontSize: 26}}/>
                        </Row>
                        <CollapsedList
                            onWheel={(e) => {

                                e.stopPropagation()
                            }}
                        >
                            {ordered.map((comment, idx) => (
                                <Row
                                    key={comment.id}
                                    onClick={() => {
                                        onCollapseToggle()
                                        focusComment(comment.id)
                                    }}
                                    $active={activeCommentId === comment.id}
                                    $collapsed={collapsed}
                                >
                                    <Typography sx={{fontSize: 26, fontWeight: 800}}>
                                        #{idx + 1}
                                    </Typography>
                                </Row>
                            ))}
                        </CollapsedList>
                    </Box>
                )}
            </Panel>
        </>
    )
}
