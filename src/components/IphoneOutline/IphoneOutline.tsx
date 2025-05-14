import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeIcon from '@mui/icons-material/Home'
import ListIcon from '@mui/icons-material/List'
import SettingsIcon from '@mui/icons-material/Settings'

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

// Screen overlay container sized via percentage offsets to fit inside outline bezel
const ScreenOverlay = styled(Box)(() => ({
    position: 'absolute',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: '18px',
    overflow: 'hidden',
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
}))

export default function IphoneOutline() {
    const [navValue, setNavValue] = React.useState(0)
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
                top: scaleY,
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
            <ScreenOverlay style={overlayStyle}>
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    <List>
                        {['Bandages', 'Antibiotics', 'Saline Bags', 'Splints', 'Pain Relievers'].map((text) => (
                            <ListItem key={text} divider>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <BottomNavigation
                    showLabels
                    value={navValue}
                    onChange={(_, newValue) => setNavValue(newValue)}
                >
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Inventory" icon={<ListIcon />} />
                    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </ScreenOverlay>
        </PhoneWrapper>
    )
} 