import React, {useState} from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const FONT_FAMILY = 'Inter, sans-serif'
const FONT_COLOR = '#000000'
const PLACEHOLDER_COLOR = '#757575'

interface Lot {
    id: number
    name: string
    lot: string
    exp: string
    total: number
    qty: number
}

const initialLots: Lot[] = [
    {id: 1, name: 'Sponge', lot: '1234', exp: '1/8/2025', total: 10, qty: 10},
    {id: 2, name: 'Sponge', lot: '5678', exp: '9/1/2025', total: 20, qty: 5},
    {id: 3, name: 'Sponge', lot: '1000', exp: '1/24/2026', total: 20, qty: 0}
]

export default function MoveItemsScreen() {
    const [lots, setLots] = useState(initialLots)
    const [expanded, setExpanded] = useState<Set<number>>(new Set(initialLots.map(l => l.id)))

    const toggleExpand = (id: number) => {
        setExpanded(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const handleQtyChange = (id: number, value: number) => {
        setLots((prev) =>
            prev.map((l) => (l.id === id ? {...l, qty: value} : l))
        )
    }

    const totalSelected = lots.reduce((sum, l) => sum + l.qty, 0)

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>

            <Box sx={{display: 'flex', alignItems: 'center', mb: 1.5}}>
                <IconButton size="small" sx={{p: 0}}>

                    <Typography sx={{fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 18, color: FONT_COLOR}}>
                        ×
                    </Typography>
                </IconButton>
                <Typography
                    sx={{
                        ml: 1,
                        fontFamily: FONT_FAMILY,
                        fontWeight: 700,
                        fontSize: 14,
                        color: FONT_COLOR
                    }}
                >
                    Move Items
                </Typography>
            </Box>

            <Box sx={{flex: 1, overflow: 'auto'}}>
                {lots.map((l) => (
                    <Paper
                        key={l.id}
                        sx={{
                            mb: 1.5,
                            px: 2,
                            pt: 1.5,
                            pb: 2,
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D6D6D6',
                            borderRadius: 2,
                            boxShadow: 'none'
                        }}
                    >

                        <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                             onClick={() => toggleExpand(l.id)}>
                            <Typography
                                sx={{
                                    fontFamily: FONT_FAMILY,
                                    fontWeight: 700,
                                    fontSize: 10,
                                    color: FONT_COLOR,
                                    flex: 1
                                }}
                            >
                                {l.name}
                            </Typography>
                            <ExpandMoreIcon sx={{
                                fontSize: 16,
                                color: FONT_COLOR,
                                transform: expanded.has(l.id) ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.2s'
                            }}/>
                        </Box>
                        {expanded.has(l.id) && (
                            <>
                                <Typography sx={{fontFamily: FONT_FAMILY, fontSize: 8, color: FONT_COLOR}}>
                                    Lot # {l.lot}
                                </Typography>
                                <Typography sx={{fontFamily: FONT_FAMILY, fontSize: 8, color: FONT_COLOR, mb: 1}}>
                                    EXP: {l.exp}
                                </Typography>

                                <Typography sx={{fontFamily: FONT_FAMILY, fontSize: 8, color: FONT_COLOR, mb: 0.5}}>
                                    Move Quantity
                                </Typography>
                                <TextField
                                    value={l.qty}
                                    onChange={(e) => handleQtyChange(l.id, Number(e.target.value))}
                                    size="small"
                                    type="number"
                                    inputProps={{
                                        min: 0,
                                        max: l.total,
                                        style: {border: '1px solid #D6D6D6', borderRadius: 2, textAlign: 'left'}
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& .MuiInputBase-input': {
                                            fontFamily: FONT_FAMILY,
                                            fontSize: 10,
                                            color: FONT_COLOR,
                                            p: '6px 8px'
                                        }
                                    }}
                                />
                                <Typography sx={{
                                    fontFamily: FONT_FAMILY,
                                    fontSize: 8,
                                    color: FONT_COLOR,
                                    mt: 0.5,
                                    textAlign: 'right'
                                }}>
                                    out of <b>{l.total}</b> total items
                                </Typography>
                            </>
                        )}
                    </Paper>
                ))}
            </Box>

            <Button
                variant="contained"
                sx={{
                    mt: 1,
                    backgroundColor: '#3A37FF',
                    borderRadius: 0,
                    color: '#FFFFFF',
                    fontFamily: FONT_FAMILY,
                    fontWeight: 700,
                    fontSize: 12,
                    textTransform: 'none',
                    '&:hover': {backgroundColor: '#3A37FF'}
                }}
                fullWidth
                disabled={totalSelected === 0}
            >
                Next
            </Button>
        </Box>
    )
} 