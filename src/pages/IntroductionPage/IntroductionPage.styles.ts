import { styled } from '@mui/material/styles'

// Full-page wrapper
export const MainWrapper = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-start',
        paddingTop: 72,   // clears FloatingTopNav/hamburger on phones
        paddingBottom: 24
    }
}))

/*
  Polaroids:
  - Desktop: preserve original offset & spacing exactly.
  - Mobile: center the block and non-destructively scale the inner composition
            using CSS vars provided from the TSX (fit + nudge so nothing overflows).
*/
export const PolaroidContainer = styled('div')(({ theme }) => ({
    margin: '-60px 0 50px 0',
    transform: 'translateX(10vw)',
    pointerEvents: 'auto',
    willChange: 'transform',
    [theme.breakpoints.down('md')]: {
        margin: '0 0 12px 0',
        transform: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '92vw',
        overflow: 'visible',
        // Scale + micro-nudge the immediate child (PolaroidCollection root)
        '& > *': {
            transform:
                'translate(var(--polaroidX, 0px), var(--polaroidY, 0px)) scale(var(--polaroidScale, 0.78))',
            transformOrigin: 'top center',
            willChange: 'transform'
        }
    }
}))

// Container holding the text blocks
export const TextsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'clamp(12px, 2vw, 24px)',
    transform: 'translate(-9vw, -9vh)', // desktop composition (source of truth)
    [theme.breakpoints.down('md')]: {
        transform: 'none',
        padding: '0 16px',
        maxWidth: '92vw',
        gap: '12px'
    }
}))

// Blue text chips
export const SingleTextContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: '#6675FF',
    borderRadius: 4,
    padding: '16px',
    fontSize: 'clamp(28px, 5vw, 64px)',
    fontFamily: 'Futura, sans-serif',
    fontWeight: 700, 
    color: '#FFFFFF',
    lineHeight: 1.2,
    // Important: allow sparkles to extend outside without clipping.
    overflow: 'visible',
    [theme.breakpoints.down('md')]: {
        fontSize: 'clamp(22px, 7vw, 32px)',
        maxWidth: '92vw',
        width: 'fit-content',
        whiteSpace: 'nowrap'
    }
}))

// Sparkles pinned above "Hi!" — desktop unchanged, mobile scaled & repositioned to match composition
export const SparklesImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    bottom: '70%',
    right: '60%',
    zIndex: 10,
    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
        // Larger and moved slightly left/up to mirror desktop arrangement
        width: 'clamp(44px, 7vw, 64px)',
        height: 'auto',
        bottom: '118%',
        left: '-20px',
        right: 'auto'
    }
}))

// Sticky notes cluster
export const StickyNotesWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: 40,
    left: 40,
    pointerEvents: 'auto',
    [theme.breakpoints.down('md')]: {
        bottom: 96, // safely above the bottom toolbar on phones
        left: 16
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
    [theme.breakpoints.down('md')]: {
        width: 120,
        height: 120,
        padding: '12px',
        fontSize: 'clamp(12px, 3.4vw, 14px)'
    }
}))

export const LogoRow = styled('div')(({ theme }) => ({
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        gap: 6
    }
}))

// Wrapper that shifts main intro content to the right on desktop;
// on mobile we keep it centered and full-width.
export const ContentWrapper = styled('div')(({ theme }) => ({
    transform: 'translateX(60px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        transform: 'none',
        width: '100%'
    }
}))
