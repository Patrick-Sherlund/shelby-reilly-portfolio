import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'

export const NavWrapper = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 20,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2
}))

export const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    width: 300,
    borderRadius: 8,
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 5px rgba(0,0,0,0.2)'
            : '0 2px 5px rgba(0,0,0,0.5)',
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(50, 50, 50, 0.8)'
}))
