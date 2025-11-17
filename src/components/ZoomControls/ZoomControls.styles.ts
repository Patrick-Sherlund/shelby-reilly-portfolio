import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'

export const ControlsWrapper = styled(Box)(({theme}) => ({
    position: 'fixed',

    left: '50%',
    transform: 'translateX(-50%)',
    bottom: `calc(16px + env(safe-area-inset-bottom))`,

    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: 6,

    padding: 6,
    borderRadius: 999,
    background:
        theme.palette.mode === 'light'
            ? 'rgba(32,32,32,0.65)'
            : 'rgba(20,20,20,0.72)',
    backdropFilter: 'blur(10px)',
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 10px 28px rgba(0,0,0,0.22)'
            : '0 14px 40px rgba(0,0,0,0.55)',

    '& .MuiIconButton-root': {
        color: theme.palette.mode === 'light' ? '#fff' : '#fff',
        borderRadius: 999,
        background:
            theme.palette.mode === 'light'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
        ':hover': {
            background:
                theme.palette.mode === 'light'
                    ? 'rgba(255,255,255,0.16)'
                    : 'rgba(255,255,255,0.16)'
        }
    },


    [theme.breakpoints.up('sm')]: {
        left: 24,
        transform: 'none',
        bottom: 'auto',
        top: 20
    }
}))
