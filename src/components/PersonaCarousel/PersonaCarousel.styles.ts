import {styled} from '@mui/material/styles'
import {keyframes} from '@mui/system'

interface PersonaCardProps {
    $offsetTop: boolean
}

interface CarouselTrackProps {
    $isPaused: boolean
}

const scrollLeft = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
`

export const CarouselContainer = styled('div')(({theme}) => ({
    position: 'relative',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    height: '600px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        height: '500px',
        marginTop: '-30px'
    },
    [theme.breakpoints.down('sm')]: {
        height: '400px',
        marginTop: '-20px'
    }
}))

export const CarouselBackground = styled('img')(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    zIndex: 1,
    pointerEvents: 'none',
    userSelect: 'none'
}))

export const CarouselTrack = styled('div')<CarouselTrackProps>(({$isPaused}) => ({
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
    width: 'fit-content',
    animation: `${scrollLeft} 30s linear infinite`,
    animationPlayState: $isPaused ? 'paused' : 'running',
    willChange: 'transform',
    paddingLeft: '40px'
}))

export const PersonaCard = styled('img')<PersonaCardProps>(({theme, $offsetTop}) => ({
    flex: '0 0 auto',
    width: '560px',
    height: 'auto',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    userSelect: 'none',
    WebkitUserDrag: 'none',
    pointerEvents: 'auto',
    cursor: 'pointer',

    transform: $offsetTop ? 'translateY(-40px)' : 'translateY(40px)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    [theme.breakpoints.down('md')]: {
        width: '320px',
        transform: $offsetTop ? 'translateY(-30px)' : 'translateY(30px)'
    },
    [theme.breakpoints.down('sm')]: {
        width: '260px',
        transform: $offsetTop ? 'translateY(-20px)' : 'translateY(20px)'
    },
    '&:hover': {
        transform: $offsetTop
            ? 'translateY(-40px) scale(1.1)'
            : 'translateY(40px) scale(1.1)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
        zIndex: 10,
        [theme.breakpoints.down('md')]: {
            transform: $offsetTop
                ? 'translateY(-30px) scale(1.1)'
                : 'translateY(30px) scale(1.1)'
        },
        [theme.breakpoints.down('sm')]: {
            transform: $offsetTop
                ? 'translateY(-20px) scale(1.1)'
                : 'translateY(20px) scale(1.1)'
        }
    }
}))
