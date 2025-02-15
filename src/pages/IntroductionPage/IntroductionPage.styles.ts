import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

type ContainerProps = {
    scaleValue: number
}

export const IntroContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'scaleValue'
})<ContainerProps>(({ theme, scaleValue }) => ({
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    backgroundImage:
        theme.palette.mode === 'light'
            ? `url(${process.env.PUBLIC_URL}/images/dots-light.svg)`
            : `url(${process.env.PUBLIC_URL}/images/dots-dark.svg)`,
    backgroundRepeat: 'repeat',
    backgroundSize: `${20 * scaleValue}px ${20 * scaleValue}px`
}))

export const IntroCenterText = styled('div')(({ theme }) => ({
    fontSize: '3rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    textAlign: 'center',
    '@media (max-width:900px)': {
        fontSize: '2rem'
    },
    '@media (max-width:600px)': {
        fontSize: '1.5rem'
    }
}))

export const TextWrapper = styled('div')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2
}))
