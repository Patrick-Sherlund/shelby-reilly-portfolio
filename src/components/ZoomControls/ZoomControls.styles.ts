import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const ControlsWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    padding: '0.25rem 0.5rem',
    borderRadius: 8,
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(50, 50, 50, 0.8)',
    color: theme.palette.text.primary,
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 5px rgba(0,0,0,0.2)'
            : '0 2px 5px rgba(0,0,0,0.5)'
}))
