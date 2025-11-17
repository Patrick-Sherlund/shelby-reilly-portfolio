import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react'

export interface CommentData {
    id: string
    x: number
    y: number
    text: string
    userName: string
    createdAt: number
}

interface CommentsContextValue {
    getCommentsForRoute: (route: string) => CommentData[]
    addComment: (route: string, comment: CommentData) => void
    deleteComment: (route: string, commentId: string) => void
    replaceComments: (route: string, updater: React.SetStateAction<CommentData[]>) => void
    activeCommentId: string | null
    setActiveCommentId: React.Dispatch<React.SetStateAction<string | null>>
}

const STORAGE_KEY = 'figma-comments-by-route'

const CommentsContext = createContext<CommentsContextValue | undefined>(undefined)

const normalizeComment = (raw: Partial<CommentData>): CommentData => ({
    id: raw.id ?? Date.now().toString(),
    x: raw.x ?? 0,
    y: raw.y ?? 0,
    text: raw.text ?? '',
    userName: raw.userName ?? 'Anonymous',
    createdAt: raw.createdAt ?? Date.now(),
})

export function CommentsProvider({children}: { children: React.ReactNode }) {
    const [commentsByRoute, setCommentsByRoute] = useState<Record<string, CommentData[]>>({})
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null)

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (!stored) return
        try {
            const parsed = JSON.parse(stored)
            if (typeof parsed === 'object') {
                const normalized: Record<string, CommentData[]> = {}
                for (const [route, list] of Object.entries(parsed)) {
                    if (Array.isArray(list)) {
                        normalized[route] = (list as any[]).map(normalizeComment)
                    }
                }
                setCommentsByRoute(normalized)
            }
        } catch {

        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(commentsByRoute))
    }, [commentsByRoute])

    const getCommentsForRoute = useCallback(
        (route: string) => commentsByRoute[route] || [],
        [commentsByRoute]
    )

    const replaceComments = useCallback((route: string, updater: React.SetStateAction<CommentData[]>) => {
        setCommentsByRoute(prev => ({
            ...prev,
            [route]: typeof updater === 'function'
                ? (updater as (prev: CommentData[]) => CommentData[])(prev[route] || [])
                : updater
        }))
    }, [])

    const addComment = useCallback((route: string, comment: CommentData) => {
        setCommentsByRoute(prev => {
            const current = prev[route] || []
            return {
                ...prev,
                [route]: [...current, normalizeComment(comment)]
            }
        })
    }, [])

    const deleteComment = useCallback((route: string, commentId: string) => {
        setCommentsByRoute(prev => {
            const current = prev[route] || []
            return {
                ...prev,
                [route]: current.filter(c => c.id !== commentId)
            }
        })
        setActiveCommentId(prev => (prev === commentId ? null : prev))
    }, [])

    const value = useMemo<CommentsContextValue>(() => ({
        getCommentsForRoute,
        addComment,
        deleteComment,
        replaceComments,
        activeCommentId,
        setActiveCommentId
    }), [getCommentsForRoute, addComment, deleteComment, replaceComments, activeCommentId])

    return (
        <CommentsContext.Provider value={value}>
            {children}
        </CommentsContext.Provider>
    )
}

export function useComments() {
    const ctx = useContext(CommentsContext)
    if (!ctx) {
        throw new Error('useComments must be used within a CommentsProvider')
    }
    return ctx
}
