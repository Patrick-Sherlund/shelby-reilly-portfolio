import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import BulkInventoryScreen from './screens/BulkInventoryScreen'
import BattalionsScreen from './screens/BattalionsScreen'

// Wrapper holds the phone image and the overlay UI
const PhoneWrapper = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none', // allow parent interaction
}))

const PhoneImg = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none',
}))

const ScreenOverlay = styled(Box)(() => ({
    position: 'absolute',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: '32px',
    overflow: 'hidden',
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
}))

export default function IphoneOutline({ initialTab = 0 }: { initialTab?: number }) {
    const [navValue, setNavValue] = React.useState(initialTab)
    const [overlayStyle, setOverlayStyle] = useState<any>({})
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const img = imgRef.current
        if (!img) return
        const update = () => {
            const rect = img.getBoundingClientRect()
            const scaleX = rect.width / 1404
            const scaleY = rect.height / 2896
            setOverlayStyle({
                top: -34,
                left: 58 * scaleX,
                width: 1290 * scaleX,
                height: 2619 * scaleY,
            })
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    return (
        <PhoneWrapper>
            <PhoneImg ref={imgRef} src={`${process.env.PUBLIC_URL}/images/iphone-outline.png`} alt="iPhone outline" />
            <ScreenOverlay
                style={overlayStyle}
                onWheel={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
            >
                <Box sx={{ flex: 1, overflow: 'auto', p: 1, position:'relative' }}>
                    {navValue === 0 && <BattalionsScreen />}
                    {navValue === 1 && <BulkInventoryScreen />}
                    {navValue === 0 && (
                        <>
                        {/* Spacer to push legend to bottom */}
                        <Box sx={{ flexGrow: 1, pb: 6 }} />
                        {/* Legend only for battalions */}
                        <Box sx={{ alignSelf: 'flex-end', mb: 1.5, display:'flex', flexDirection:'column', gap:1, fontFamily:'Inter, sans-serif', fontSize:8, fontWeight:700, color:'#403F3E' }}>
                            {[{label:'0-80%',color:'#FF5247'},{label:'81-99%',color:'#FFCF27'},{label:'100%',color:'#0EDC6D'}].map((item)=>(<Box key={item.label} sx={{display:'flex',alignItems:'center',gap:1}}><Box sx={{width:20,height:20,bgcolor:item.color,borderRadius:0.5}}/><Typography sx={{fontSize:8,fontWeight:700,color:'#403F3E'}}>{item.label}</Typography></Box>))}
                        </Box>
                        </>
                    )}
                </Box>
                <BottomNavigation
                    showLabels
                    value={navValue}
                    onChange={(_, newValue) => setNavValue(newValue)}
                    sx={{
                        backgroundColor: 'transparent',
                        borderTop: '1px solid #E0E0E0',
                        '& .MuiBottomNavigationAction-root': {
                            color: '#403F3E',
                        },
                    }}
                >
                    <BottomNavigationAction label="Sets" icon={<WorkOutlineIcon />} />
                    <BottomNavigationAction label="Bulk" icon={<Inventory2OutlinedIcon />} />
                    <BottomNavigationAction label="Remove" icon={<HighlightOffOutlinedIcon />} />
                </BottomNavigation>
            </ScreenOverlay>
        </PhoneWrapper>
    )
} 