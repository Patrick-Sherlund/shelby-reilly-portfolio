import React, {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState,} from 'react'
import yaml from 'js-yaml'

export interface SearchItem {
    id: string
    label: string
    keywords: string[]
    group: string
    element?: HTMLElement | null
    route?: string
    pageIndex?: number
}

interface SearchContextValue {
    open: boolean
    openSearch: () => void
    closeSearch: () => void
    registerItem: (partial: { id: string; element: HTMLElement | null }) => void
    unregisterItem: (id: string) => void
    registerGroupAnchor: (group: string, element: HTMLElement, pageIndex: number) => void
    getGroupAnchor: (group: string) => { element: HTMLElement; pageIndex: number } | undefined
    items: SearchItem[]
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined)

export function useSearchContext(): SearchContextValue {
    const ctx = useContext(SearchContext)
    if (!ctx) throw new Error('useSearchContext must be used within a SearchProvider')
    return ctx
}

export function SearchProvider({children}: { children: ReactNode }) {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState<SearchItem[]>([])
    const pendingRef = useRef<{ id: string; element: HTMLElement | null }[]>([])
    const groupAnchorsRef = useRef<Record<string, { element: HTMLElement; pageIndex: number }>>({})
    const configRef = useRef<{
        [id: string]: { label: string; keywords: string[]; group: string; route?: string; pageIndex?: number }
    }>({})


    useEffect(() => {
        let mounted = true
        fetch(`${process.env.PUBLIC_URL}/searchConfig.yml`)
            .then((res) => res.text())
            .then((text) => {
                if (!mounted) return
                const data: any = yaml.load(text)
                const map: {
                    [id: string]: {
                        label: string;
                        keywords: string[];
                        group: string;
                        route?: string;
                        pageIndex?: number
                    }
                } = {}
                if (data && typeof data === 'object' && 'groups' in data) {
                    const groupsObj = (data as any).groups
                    Object.keys(groupsObj).forEach((groupName) => {
                        groupsObj[groupName].forEach((item: any) => {
                            map[item.id] = {
                                label: item.label,
                                keywords: item.keywords || [],
                                group: groupName,
                                route: item.route,
                                pageIndex: item.pageIndex,
                            }
                        })
                    })
                }
                configRef.current = map


                const initialItems: SearchItem[] = Object.keys(map).map(id => ({
                    id,
                    ...map[id],
                    element: null,
                }))
                setItems(initialItems)


                if (pendingRef.current.length > 0) {
                    pendingRef.current.forEach((p) => {
                        const meta = configRef.current[p.id]
                        if (meta) {
                            setItems((prev) => {
                                const existsIdx = prev.findIndex((it) => it.id === p.id)
                                const nextItem: SearchItem = {...meta, id: p.id, element: p.element}
                                if (existsIdx !== -1) {
                                    const copy = [...prev]
                                    copy[existsIdx] = nextItem
                                    return copy
                                }
                                return [...prev, nextItem]
                            })
                        }
                    })
                    pendingRef.current = []
                }
            })
            .catch((err) => console.error('Failed to load searchConfig.yml', err))
        return () => {
            mounted = false
        }
    }, [])


    const openSearch = useCallback(() => setOpen(true), [])
    const closeSearch = useCallback(() => setOpen(false), [])

    const registerItem = useCallback((partial: { id: string; element: HTMLElement | null }) => {
        const meta = configRef.current[partial.id]
        if (!meta) {
            pendingRef.current.push(partial)
            return
        }
        const item: SearchItem = {...meta, id: partial.id, element: partial.element}
        setItems((prev) => {
            const existsIdx = prev.findIndex((it) => it.id === item.id)
            if (existsIdx !== -1) {
                const copy = [...prev]
                copy[existsIdx] = item
                return copy
            }
            return [...prev, item]
        })
    }, [])

    const unregisterItem = useCallback((id: string) => {
        setItems((prev) => {
            const next = prev.filter((it) => it.id !== id)
            return next.length === prev.length ? prev : next
        })
    }, [])

    const registerGroupAnchor = useCallback((group: string, element: HTMLElement, pageIndex: number) => {
        groupAnchorsRef.current[group] = {element, pageIndex}
    }, [])

    const getGroupAnchor = useCallback((group: string) => {
        return groupAnchorsRef.current[group]
    }, [])


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
                e.preventDefault()
                openSearch()
            } else if (open && e.key === 'Escape') {
                e.preventDefault()
                closeSearch()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [open, openSearch, closeSearch])

    const value = useMemo(
        () => ({
            open,
            openSearch,
            closeSearch,
            registerItem,
            unregisterItem,
            registerGroupAnchor,
            getGroupAnchor,
            items,
        }),
        [open, items, openSearch, closeSearch, registerItem, unregisterItem, registerGroupAnchor, getGroupAnchor]
    )

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
