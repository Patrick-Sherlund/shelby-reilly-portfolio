import { styled } from '@mui/material/styles'


export const MainWrapper = styled('div')(({ theme }) => ({
    width: '100%',

    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    pointerEvents: 'auto',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))'
    }
}))

export const PolaroidContainer = styled('div')(({ theme }) => ({
    margin: '-60px -200px 120px 0',
    transform: 'translateX(10vw)',
    willChange: 'transform',
    zIndex: 20,
    [theme.breakpoints.down('md')]: {
        position: 'absolute',
        top: 'clamp(56px, 10vh, 90px)',
        right: 'clamp(16px, 5vw, 32px)',
        width: 'auto',
        height: 'auto',
        maxWidth: '52vw',
        left: 'auto',
        transform: 'none',
        margin: '0',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: '0',
        minHeight: 'auto',
        overflow: 'visible',
        zIndex: 20
    }
}))

export const PolaroidStage = styled('div')(({ theme }) => ({

    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
        transform: 'scale(0.38)',
        transformOrigin: 'top right',
        willChange: 'transform',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 0,
        '& > *:not(:first-child)': { marginLeft: '-12px' },


        '&.mobile-compact-captions figcaption *:not(b):not(strong)': {
            display: 'none !important'
        },
        '&.mobile-compact-captions .caption *:not(b):not(strong)': {
            display: 'none !important'
        },
        '&.mobile-compact-captions figcaption b, &.mobile-compact-captions figcaption strong, &.mobile-compact-captions .caption b, &.mobile-compact-captions .caption strong': {
            display: 'block',
            fontWeight: 800,
            fontSize: 'clamp(12px, 4.2vw, 18px)',
            lineHeight: 1.1,
            textAlign: 'center'
        }
    }
}))


export const StickyNoteTextBold = styled('span')(({ theme }) => ({
    fontSize: "16px",
    fontWeight: "600",
    display: "inline",
    [theme.breakpoints.down('md')]: {
        fontSize: 'clamp(8px, 2.5vw, 11px)',
        fontWeight: "700"
    }
}));

export const StickyNoteTextRegular = styled('span')(({ theme }) => ({
    fontSize: "16px",
    fontWeight: "200",
    display: "inline",
    [theme.breakpoints.down('md')]: {
        fontSize: 'clamp(8px, 2.5vw, 11px)',
        fontWeight: "300"
    }
}));

export const TextsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'clamp(12px, 2vw, 24px)',
    transform: 'translate(-9vw, -9vh)',
    [theme.breakpoints.down('md')]: {
        transform: 'none',
        padding: '0 12px',
        maxWidth: '100%',
        gap: '14px',
        alignItems: 'flex-start',
        textAlign: 'left',
        marginTop: '0px'
    }
}))


export const SingleTextContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: '#5263FF',
    borderRadius: 4,
    padding: '16px',
    fontSize: 'clamp(28px, 5vw, 64px)',
    fontFamily: 'Futura, sans-serif',
    fontWeight: 700,
    color: '#FFFFFF',
    lineHeight: 1.2,
    overflow: 'visible',
    [theme.breakpoints.down('md')]: {
        fontSize: 'clamp(32px, 9vw, 48px)',
        maxWidth: '90vw',
        width: 'fit-content',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        padding: '12px 20px',
        '&:first-of-type': {
            fontSize: 'clamp(48px, 12vw, 64px)',
            padding: '12px 28px',
            letterSpacing: '-0.02em'
        },
        '&:last-of-type': {
            fontSize: 'clamp(32px, 9vw, 48px)',
            padding: '12px 24px',
            maxWidth: '90vw',
            letterSpacing: '-0.01em'
        }
    }
}))


export const SparklesImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    bottom: '70%',
    right: '60%',
    zIndex: 10,
    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
        height: 'auto',
        bottom: 'auto',
        top: 'clamp(-110px, -13vh, -80px)',
        left: 'clamp(-100px, -12vw, -75px)',
        right: 'auto'
    }
}))


export const StickyNotesWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: 40,
    left: 40,
    pointerEvents: 'auto',
    [theme.breakpoints.down('md')]: {
        position: 'fixed',
        bottom: 'calc(72px + env(safe-area-inset-bottom) + 8px)',
        left: 16,
        zIndex: 5
    }
}))

export const StickyNote = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: 160,
    height: 160,
    padding: '16px',
    borderRadius: 8,
    fontFamily: 'Futura, sans-serif',
    fontSize: 'clamp(14px, 2vw, 16px)',
    fontWeight: 600,
    lineHeight: 1.3,
    color: '#000',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    userSelect: 'none',
    [theme.breakpoints.down('md')]: {
        width: 104,
        height: 104,
        padding: '6px',
        fontSize: 'clamp(8px, 2.5vw, 11px)',
        wordBreak: 'break-word',
        hyphens: 'auto',
        lineHeight: 1.2
    }
}))

export const ContentWrapper = styled('div')(({ theme }) => ({
    transform: 'translateX(60px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        transform: 'none',
        width: '100%',
        position: 'relative',
        alignItems: 'center'
    }
}))
