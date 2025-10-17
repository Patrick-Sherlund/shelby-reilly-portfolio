import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

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
    borderRadius: 24,
    gap: 32,
    // No right padding: each tool sets its own required width
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.15)'
            : '0 2px 8px rgba(0,0,0,0.4)',
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(50, 50, 50, 0.8)',
    padding: 0,
    cursor: `url(${process.env.PUBLIC_URL}/images/regular-cursor.png) 16 16, auto`,
}))

// We give each section a base width of 80px...
// except the sticker tool, which gets extra width to avoid clipping.
export const ToolSection = styled('div')<{
    isActive: boolean
    isCursorTool?: boolean
    isStickerTool?: boolean
}>(({ isActive, isCursorTool, isStickerTool }) => ({
    width: isStickerTool ? 92 : 80, // 80 + 12 extra for sticker
    height: 62,
    display: 'flex',
    justifyContent: 'center',
    // Cursor tool is centered vertically, others bottom-aligned
    alignItems: isCursorTool ? 'center' : 'flex-end',
    transition: 'background-color 0.2s ease',
    backgroundColor: isActive ? '#8B72F9' : 'transparent'
}))

// The actual image. We use maxWidth & maxHeight so it scales within the container
export const ToolImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
})
