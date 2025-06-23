import React, { useMemo, useState, useEffect } from 'react'
import {
    Box,
    Paper,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Fade,
    useTheme,
    Typography,
    ClickAwayListener,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { useSearchContext } from '../../context/SearchContext'
import { useZoomPanContext } from '../../context/ZoomPanContext'

export default function SearchPalette() {
    const { open, closeSearch, items, getGroupAnchor } = useSearchContext()
    const { setStagePos } = useZoomPanContext()
    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const theme = useTheme()

    // Reset when opened / closed
    useEffect(() => {
        if (!open) {
            setQuery('')
            setActiveIndex(0)
        }
    }, [open])

    const results = useMemo(() => {
        const filtered = !query
            ? items.slice(0, 8) // show first few items when no query
            : items.filter((it) => {
                  const lower = query.toLowerCase()
                  return (
                      it.label.toLowerCase().includes(lower) ||
                      it.keywords.some((kw) => kw.toLowerCase().includes(lower))
                  )
              })
        return filtered.slice(0, 20)
    }, [items, query])

    // Group results by page/group for UI
    const groupedResults = useMemo(() => {
        const map = new Map<string, typeof results>()
        results.forEach((item) => {
            if (!map.has(item.group)) map.set(item.group, [])
            map.get(item.group)!.push(item)
        })
        return Array.from(map.entries()) // [group, items[]]
    }, [results])

    const handleSelect = (index: number) => {
        const flatItem = results[index]
        if (!flatItem) return
        closeSearch()
        setTimeout(() => {
            if (flatItem.element) {
                const anchorData = getGroupAnchor(flatItem.group)
                if (anchorData) {
                    setStagePos({ x: 0, y: -anchorData.pageIndex * window.innerHeight })
                }
                flatItem.element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }, 0)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSelect(activeIndex)
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((prev) => Math.max(prev - 1, 0))
        } else if (e.key === 'Escape') {
            e.preventDefault()
            closeSearch()
        }
    }

    const handleGroupClick = (groupName: string) => {
        const anchorData = getGroupAnchor(groupName)
        if (anchorData) {
            // move stage to correct page
            setStagePos({ x: 0, y: -anchorData.pageIndex * window.innerHeight })
            closeSearch()
            setTimeout(() => {
                anchorData.element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 0)
            return
        }
        // fallback to first item
        const item = results.find((r) => r.group === groupName)
        if (!item || !item.element) return
        closeSearch()
        setTimeout(() => {
            item.element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 0)
    }

    if (!open) return null

    // Layout constants
    const WIDTH = 500
    const LIST_HEIGHT = 240

    return (
        open && (
            <ClickAwayListener onClickAway={closeSearch}>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 48,
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
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                            <Box sx={{ height: 12 }} />
                            <Box sx={{ maxHeight: LIST_HEIGHT, overflowY: 'auto' }}>
                                {results.length === 0 ? (
                                    <Typography variant="body2" sx={{ p: 2, textAlign: 'center', opacity: 0.7 }}>
                                        No results
                                    </Typography>
                                ) : (
                                    <List>
                                        {groupedResults.map(([groupName, groupItems]) => (
                                            <React.Fragment key={groupName}>
                                                <ListSubheader component="div" sx={{ display: 'flex', alignItems:'center', cursor:'pointer' }} onClick={() => handleGroupClick(groupName)}>
                                                    <FolderOpenIcon sx={{ mr: 1 }} />{groupName}
                                                </ListSubheader>
                                                {groupItems.map((item) => {
                                                    const idx = results.findIndex((r) => r.id === item.id)
                                                    return (
                                                        <ListItem disablePadding key={item.id}>
                                                            <ListItemButton selected={idx === activeIndex} onClick={() => handleSelect(idx)}>
                                                                <ListItemIcon>
                                                                    <WebAssetIcon />
                                                                </ListItemIcon>
                                                                <ListItemText primary={item.label} />
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