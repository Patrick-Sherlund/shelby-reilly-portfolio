import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { isAccessor } from 'typescript'

// Wrapper to position the toolbar at the bottom, center of the screen
export const NavWrapper = styled(Box)(() => ({
    position: 'fixed',
    bottom: 20,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1500,
    pointerEvents: 'auto'
}))

// The container (Paper) for all tools
export const ToolbarContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 'max-content',
    height: 'max-content',
    borderRadius: 20,
    gap: 0,
    // No right padding: each tool sets its own required width
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.15)'
            : '0 2px 8px rgba(0,0,0,0.4)',
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(50, 50, 50, 0.8)',
    padding: '6px',
    cursor: `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`,
}))

// Each section takes up exactly 1/3 of the toolbar width
export const ToolSection = styled('div')<{
    isActive: boolean
    isCursorTool?: boolean
    isStickerTool?: boolean
}>(({ isActive, isCursorTool, isStickerTool }) => ({
    position: 'relative',
    flex: '1 1 33.333%',
    minWidth: 0,
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 30px',
    '&::before': isActive ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#5969FF',
        borderRadius: '14px',
        zIndex: 0,
        transition: 'all 0.2s ease'
    } : {}
}))

// The actual image. We use maxWidth & maxHeight so it scales within the container
export const ToolImage = styled('img')<{
    isActive?: boolean
}>(({isActive}) => ({
    width: '56px',
    height: '56px',
    objectFit: 'contain',
    transition: 'transform 0.2s ease',
    position: 'relative',
    zIndex: 1,
    transformOrigin: 'center bottom'
}))
