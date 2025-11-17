import React, {useMemo, useState} from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

const FONT_FAMILY = 'Inter, sans-serif'
const FONT_COLOR = '#403F3E'
const PLACEHOLDER_COLOR = '#757575'

interface Item {
    id: number;
    name: string;
    qty: number
}

const items: Item[] = [
    {id: 1, name: 'Surgilube', qty: 12},
    {id: 3, name: 'Metronizole', qty: 12},
    {id: 4, name: 'Pad Nodah', qty: 12},
    {id: 5, name: 'Sponge', qty: 12},
    {id: 6, name: 'Levoflox', qty: 12},
    {id: 7, name: 'GlovePatient', qty: 12},
    {id: 8, name: 'Detergent', qty: 12}
]

export default function BulkInventoryScreen() {
    const [query, setQuery] = useState('')
    const filtered = useMemo(() => items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())), [query])

    return (
        <>
            <Typography sx={{fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 14, color: FONT_COLOR, mb: 1.5}}>
                Bulk Inventory
            </Typography>
            <TextField
                fullWidth
                placeholder="Search Items"
                value={query}
                onChange={e => setQuery(e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                    mb: 1.5,
                    backgroundColor: '#f3f3f3',
                    borderRadius: 3,
                    '& input::placeholder': {color: PLACEHOLDER_COLOR, opacity: 1},
                    '& .MuiInputBase-input': {color: PLACEHOLDER_COLOR, fontSize: 10, p: '8px 8px'}
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{color: PLACEHOLDER_COLOR}}/>
                        </InputAdornment>
                    ),
                    sx: {'& .MuiOutlinedInput-notchedOutline': {border: 'none'}}
                }}
            />
            <List disablePadding>
                {filtered.map((i, idx) => (
                    <React.Fragment key={i.id}>
                        <ListItemButton sx={{px: 0}} onClick={() => alert(i.name)}>
                            <ListItemText
                                primary={i.name.toUpperCase()}
                                secondary={`item #: ${i.id}`}
                                primaryTypographyProps={{
                                    fontFamily: FONT_FAMILY,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: FONT_COLOR
                                }}
                                secondaryTypographyProps={{fontFamily: FONT_FAMILY, fontSize: 8, color: FONT_COLOR}}
                            />
                            <Typography
                                sx={{fontFamily: FONT_FAMILY, fontSize: 10, fontWeight: 700, color: FONT_COLOR}}>
                                QTY: {i.qty}
                            </Typography>
                        </ListItemButton>
                        {idx !== filtered.length - 1 && <Divider/>}
                    </React.Fragment>
                ))}
            </List>
        </>
    )
} 