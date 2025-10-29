import { styled } from '@mui/material/styles'

// Full-page wrapper
export const MainWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  // minHeight ensures the page can grow and scroll vertically
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
    paddingTop: 72,
    paddingBottom: 'max(24px, env(safe-area-inset-bottom))'
  }
}))

/*
  Polaroids
  - Desktop: source of truth (unchanged).
  - Mobile: frame gets extra padding so it fully contains the cards; stage scales (50%) from TSX.
*/
export const PolaroidContainer = styled('div')(({ theme }) => ({
  margin: '-60px 0 50px 0',
  transform: 'translateX(10vw)',
  willChange: 'transform',
  [theme.breakpoints.down('md')]: {
    // wider frame and centered evenly
    width: 'calc(100% + 80px)',
    height: 0,
    maxWidth: 'none',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: '0 0 8px 0',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',

    // Give the frame internal padding so tops/bottoms aren't clipped
    padding: '24px 16px 10px',
    // raise overall stage height so the blue frame fully covers polaroids
    minHeight: 'calc(clamp(180px, 30vh, 280px) + 34px)',
    overflow: 'hidden'
  }
}))

export const PolaroidStage = styled('div')(({ theme }) => ({

    pointerEvents: 'none',
  [theme.breakpoints.down('md')]: {
    transform:
      'translate(var(--polaroidX, 0px), var(--polaroidY, 0px)) scale(var(--polaroidScale, 0.8))',
    transformOrigin: 'top center',
    willChange: 'transform',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 0,
    '& > *:not(:first-child)': { marginLeft: '-12px' },

    /* MOBILE CAPTION COMPACT MODE */
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

// Container for the text blocks
export const TextsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 'clamp(12px, 2vw, 24px)',
  transform: 'translate(-9vw, -9vh)',
  [theme.breakpoints.down('md')]: {
    transform: 'none',
    padding: '0 16px',
    maxWidth: '92vw',
    gap: '12px',
    alignItems: 'flex-start',
    textAlign: 'center'
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
  overflow: 'visible',
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(28px, 9vw, 44px)',
    maxWidth: '92vw',
    width: 'fit-content',
    display: 'inline-block',
    whiteSpace: 'nowrap'
  }
}))

// Sparkles — larger on mobile
export const SparklesImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: '70%',
  right: '60%',
  zIndex: 10,
  pointerEvents: 'none',
  [theme.breakpoints.down('md')]: {
    width: 'clamp(64px, 12vw, 96px)',
    height: 'auto',
    bottom: '130%',
    left: '-28px',
    right: 'auto'
  }
}))

/* Sticky notes */
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
    padding: '10px',
    fontSize: 'clamp(12px, 3.4vw, 14px)',
    wordBreak: 'break-word',
    hyphens: 'auto'
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
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6
  }
}))

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
