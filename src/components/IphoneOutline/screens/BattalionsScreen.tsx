import React, {useMemo, useState} from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'

const FONT_FAMILY = 'Inter, sans-serif'
const FONT_COLOR = '#403F3E'
const PLACEHOLDER_COLOR = '#757575'

export default function BattalionsScreen() {
    const [searchTerm, setSearchTerm] = useState('')

    const battalions = useMemo(
        () => [
            {name: 'Set 1', progress: 80, color: '#FFCF27'},
            {name: 'Set 2', progress: 100, color: '#0EDC6D'},
            {name: 'Set 1', progress: 30, color: '#FF5247'},
        ],
        []
    )

    const filteredBattalions = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return battalions
        return battalions.filter((b) => b.name.toLowerCase().includes(term))
    }, [battalions, searchTerm])

    return (
        <>
            <Typography sx={{fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 14, color: FONT_COLOR, mb: 1.5}}>
                Sets
            </Typography>
            <TextField
                fullWidth
                placeholder="Search for MES box"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                    mb: 1.5,
                    backgroundColor: '#f3f3f3',
                    borderRadius: 3,
                    '& input::placeholder': {color: PLACEHOLDER_COLOR, opacity: 1},
                    '& .MuiInputBase-input': {color: PLACEHOLDER_COLOR, fontSize: 10, p: '8px 8px'},
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{color: PLACEHOLDER_COLOR}}/>
                        </InputAdornment>
                    ),
                    sx: {'& .MuiOutlinedInput-notchedOutline': {border: 'none'}},
                }}
            />
            {filteredBattalions.map((b) => (
                <Paper
                    key={b.name}
                    sx={{
                        mb: 1.5,
                        px: 2,
                        pt: 1.5,
                        pb: 3,
                        position: 'relative',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D6D6D6',
                        borderRadius: 2,
                        boxShadow: 'none',
                    }}
                >
                    <Typography
                        align="center"
                        sx={{fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 8, color: FONT_COLOR}}
                    >
                        {b.name}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={b.progress}
                        sx={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            height: 12,
                            backgroundColor: '#FFFFFF',
                            borderBottomLeftRadius: 2,
                            borderBottomRightRadius: 2,
                            [`& .MuiLinearProgress-bar`]: {backgroundColor: b.color},
                        }}
                    />
                </Paper>
            ))}
        </>
    )
} 