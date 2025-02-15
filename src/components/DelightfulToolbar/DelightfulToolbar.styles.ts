// DelightfulToolbar.styles.ts
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export const NavWrapper = styled(Box)(() => ({
    position: 'fixed',
    bottom: 20,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2
}))

export const ToolbarContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 28,
    overflow: 'hidden',
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.15)'
            : '0 2px 8px rgba(0,0,0,0.4)',
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(50, 50, 50, 0.8)'
}))

export const ToolSection = styled('div')<{ isActive: boolean }>(({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    transition: 'background-color 0.2s ease',
    backgroundColor: isActive ? '#8B72F9' : 'transparent'
}))
