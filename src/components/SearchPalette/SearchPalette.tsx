import React, {useEffect, useMemo, useState} from 'react'
import {
    Box,
    ClickAwayListener,
    Fade,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import {useSearchContext} from '../../context/SearchContext'
import {useZoomPanContext} from '../../context/ZoomPanContext'

export default function SearchPalette() {
    const {open, closeSearch, items, getGroupAnchor} = useSearchContext()
    const {setStagePos} = useZoomPanContext()
    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const theme = useTheme()
    const listContainerRef = React.useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (!open) {
            setQuery('')
            setActiveIndex(0)
        }
    }, [open])


    useEffect(() => {
        const listContainer = listContainerRef.current
        if (!listContainer) return

        const handleWheel = (e: WheelEvent) => {
            const {scrollTop, scrollHeight, clientHeight} = listContainer
            const isScrollingUp = e.deltaY < 0
            const isScrollingDown = e.deltaY > 0


            const isAtTop = scrollTop === 0
            const isAtBottom = scrollTop + clientHeight >= scrollHeight


            if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
                e.stopPropagation()
            }


            if ((isScrollingDown && isAtBottom) || (isScrollingUp && isAtTop)) {
                e.preventDefault()
                e.stopPropagation()
            }
        }

        listContainer.addEventListener('wheel', handleWheel, {passive: false})
        return () => listContainer.removeEventListener('wheel', handleWheel)
    }, [open])

    const results = useMemo(() => {
        const filtered = !query
            ? items.slice(0, 8)
            : items.filter((it) => {
                const lower = query.toLowerCase()
                return (
                    it.label.toLowerCase().includes(lower) ||
                    it.keywords.some((kw) => kw.toLowerCase().includes(lower))
                )
            })
        return filtered.slice(0, 20)
    }, [items, query])


    const groupedResults = useMemo(() => {
        const map = new Map<string, typeof results>()
        results.forEach((item) => {
            if (!map.has(item.group)) map.set(item.group, [])
            map.get(item.group)!.push(item)
        })
        return Array.from(map.entries())
    }, [results])

    const handleSelect = (index: number) => {
        const flatItem = results[index]
        if (!flatItem) return
        closeSearch()


        if (flatItem.route) {
            window.location.hash = flatItem.route
            return
        }


        if (flatItem.pageIndex !== undefined) {
            const currentRoute = window.location.hash
            const isOnHomePage = !currentRoute || currentRoute === '#/' || currentRoute === ''

            if (!isOnHomePage) {

                window.location.hash = ''

                setTimeout(() => {
                    setStagePos({x: 0, y: -flatItem.pageIndex! * window.innerHeight})
                }, 100)
            } else {

                setStagePos({x: 0, y: -flatItem.pageIndex * window.innerHeight})
            }
            return
        }


        setTimeout(() => {
            if (flatItem.element) {
                const anchorData = getGroupAnchor(flatItem.group)
                if (anchorData) {
                    setStagePos({x: 0, y: -anchorData.pageIndex * window.innerHeight})
                }
                flatItem.element.scrollIntoView({behavior: 'smooth', block: 'center'})
            }
        }, 0)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSelect(activeIndex)
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((prev) => {
                const newIndex = Math.min(prev + 1, results.length - 1)

                setTimeout(() => {
                    const activeElement = listContainerRef.current?.querySelector(`[data-index="${newIndex}"]`)
                    activeElement?.scrollIntoView({block: 'nearest', behavior: 'smooth'})
                }, 0)
                return newIndex
            })
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((prev) => {
                const newIndex = Math.max(prev - 1, 0)

                setTimeout(() => {
                    const activeElement = listContainerRef.current?.querySelector(`[data-index="${newIndex}"]`)
                    activeElement?.scrollIntoView({block: 'nearest', behavior: 'smooth'})
                }, 0)
                return newIndex
            })
        } else if (e.key === 'Escape') {
            e.preventDefault()
            closeSearch()
        }
    }

    const handleGroupClick = (groupName: string) => {
        const anchorData = getGroupAnchor(groupName)
        if (anchorData) {

            setStagePos({x: 0, y: -anchorData.pageIndex * window.innerHeight})
            closeSearch()
            setTimeout(() => {
                anchorData.element.scrollIntoView({behavior: 'smooth', block: 'start'})
            }, 0)
            return
        }

        const item = results.find((r) => r.group === groupName)
        if (!item || !item.element) return
        closeSearch()
        setTimeout(() => {
            item.element?.scrollIntoView({behavior: 'smooth', block: 'center'})
        }, 0)
    }

    if (!open) return null


    const WIDTH = 500
    const LIST_HEIGHT = 240

    return (
        open && (
            <ClickAwayListener onClickAway={closeSearch}>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 120,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1400,
                    }}
                >
                    <Fade in={open}>
                        <Paper
                            elevation={8}
                            sx={{
                                width: WIDTH,
                                p: 1.5,
                                backgroundColor: theme.palette.background.paper,
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder="Search"
                                value={query}
                                autoFocus
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                            <Box sx={{height: 12}}/>
                            <Box
                                ref={listContainerRef}
                                sx={{maxHeight: LIST_HEIGHT, overflowY: 'auto'}}
                            >
                                {results.length === 0 ? (
                                    <Typography variant="body2" sx={{p: 2, textAlign: 'center', opacity: 0.7}}>
                                        No results
                                    </Typography>
                                ) : (
                                    <List>
                                        {groupedResults.map(([groupName, groupItems]) => (
                                            <React.Fragment key={groupName}>
                                                <ListSubheader component="div" sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    cursor: 'pointer'
                                                }} onClick={() => handleGroupClick(groupName)}>
                                                    <FolderOpenIcon sx={{mr: 1}}/>{groupName}
                                                </ListSubheader>
                                                {groupItems.map((item) => {
                                                    const idx = results.findIndex((r) => r.id === item.id)
                                                    return (
                                                        <ListItem disablePadding key={item.id} data-index={idx}>
                                                            <ListItemButton selected={idx === activeIndex}
                                                                            onClick={() => handleSelect(idx)}>
                                                                <ListItemIcon>
                                                                    <WebAssetIcon/>
                                                                </ListItemIcon>
                                                                <ListItemText primary={item.label}/>
                                                            </ListItemButton>
                                                        </ListItem>
                                                    )
                                                })}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        </Paper>
                    </Fade>
                </Box>
            </ClickAwayListener>
        )
    )
} 