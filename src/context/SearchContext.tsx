import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react'
import yaml from 'js-yaml'

export interface SearchItem {
    id: string
    label: string
    keywords: string[]
    group: string
    element?: HTMLElement | null
}

interface SearchContextValue {
    /** Whether the search palette is currently open */
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
    if (!ctx) {
        throw new Error('useSearchContext must be used within a SearchProvider')
    }
    return ctx
}

export function SearchProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState<SearchItem[]>([])
    const pendingRef = useRef<{ id: string; element: HTMLElement | null }[]>([])
    const groupAnchorsRef = useRef<Record<string, { element: HTMLElement; pageIndex: number }>>({})

    // Store config map id -> metadata
    const configRef = useRef<{ [id: string]: { label: string; keywords: string[]; group: string } }>({})

    // Load YAML config once from public folder
    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/searchConfig.yml`)
            .then((res) => res.text())
            .then((text) => {
                const data: any = yaml.load(text)
                const map: { [id: string]: { label: string; keywords: string[]; group: string } } = {}
                if (data && typeof data === 'object' && 'groups' in data) {
                    const groupsObj = (data as any).groups
                    Object.keys(groupsObj).forEach((groupName) => {
                        groupsObj[groupName].forEach((item: any) => {
                            map[item.id] = {
                                label: item.label,
                                keywords: item.keywords || [],
                                group: groupName
                            }
                        })
                    })
                }
                configRef.current = map

                // process any pending registrations
                if (pendingRef.current.length > 0) {
                    pendingRef.current.forEach((p) => registerItem(p))
                    pendingRef.current = []
                }
            })
            .catch((err) => console.error('Failed to load searchConfig.yml', err))
    }, [])

    // helper functions
    const openSearch = () => setOpen(true)
    const closeSearch = () => setOpen(false)

    const registerItem = (partial: { id: string; element: HTMLElement | null }) => {
        const meta = configRef.current[partial.id]
        if (!meta) {
            // config might not be loaded yet, stash for later
            pendingRef.current.push(partial)
            return
        }
        const item: SearchItem = { ...meta, id: partial.id, element: partial.element }
        setItems((prev) => {
            // Avoid duplicates by id
            const existsIdx = prev.findIndex((it) => it.id === item.id)
            if (existsIdx !== -1) {
                // update element reference
                const copy = [...prev]
                copy[existsIdx] = item
                return copy
            }
            return [...prev, item]
        })
    }

    const unregisterItem = (id: string) => {
        setItems((prev) => prev.filter((it) => it.id !== id))
    }

    const registerGroupAnchor = (group: string, element: HTMLElement, pageIndex: number) => {
        groupAnchorsRef.current[group] = { element, pageIndex }
    }

    const getGroupAnchor = (group: string) => groupAnchorsRef.current[group]

    // Handle global keyboard shortcut
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
    }, [open])

    return (
        <SearchContext.Provider
            value={{ open, openSearch, closeSearch, registerItem, unregisterItem, registerGroupAnchor, getGroupAnchor, items }}
        >
            {children}
        </SearchContext.Provider>
    )
} 