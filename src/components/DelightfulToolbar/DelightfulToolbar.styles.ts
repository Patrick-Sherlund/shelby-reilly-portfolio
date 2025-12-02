import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'


export const NavWrapper = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 20,
    left: 0,
    right: 0,
    margin: "0px auto",
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1500,
    width: '380px',
    maxWidth: 'calc(100vw - 24px)',
    pointerEvents: 'auto',
    [theme.breakpoints.down('sm')]: {
        bottom: 'max(12px, env(safe-area-inset-bottom) + 12px)'
    }
}))


export const ToolbarContainer = styled(Paper)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 'max-content',
    height: 'max-content',
    borderRadius: 20,
    gap: 0,

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


export const ToolSection = styled('div')<{
    isActive: boolean
    isCursorTool?: boolean
    isStickerTool?: boolean
}>(({isActive, isCursorTool, isStickerTool, theme}) => ({
    position: 'relative',
    flex: '1 1 33.333%',
    minWidth: 0,
    height: 'clamp(44px, 7.5vw, 56px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 clamp(18px, 4vw, 30px)',
    '&::before': isActive ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#6674FF',
        borderRadius: '14px',
        zIndex: 0,
        transition: 'all 0.2s ease'
    } : {}
}))


export const ToolImage = styled('img')<{
    isActive?: boolean
}>(({isActive}) => ({
    width: 'clamp(44px, 7.5vw, 56px)',
    height: 'clamp(44px, 7.5vw, 56px)',
    objectFit: 'contain',
    transition: 'transform 0.2s ease',
    position: 'relative',
    zIndex: 1,
    transformOrigin: 'center bottom'
}))
