import {styled} from '@mui/material/styles'

const INDIGO = '#1B1887'

const PROCESS_BAR_GRADIENT_V =
    'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'
const PROCESS_BAR_GRADIENT_H =
    'linear-gradient(90deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'

export const ProjectPageContainer = styled('div')(({theme}) => ({
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    backgroundImage: 'none',
    color: theme.palette.text.primary,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    overflow: 'visible'
}))

export const BoardContent = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 60,
    boxSizing: 'border-box',
    overflow: 'visible'
}))

export const ContentWrapper = styled('div')(({theme}) => ({
    zIndex: 10,
    pointerEvents: 'auto',
    width: '100%',
    maxWidth: 1420,
    margin: '0 auto',
    padding: '40px 32px 40px 32px',
    boxSizing: 'border-box',
    overflow: 'visible',
    [theme.breakpoints.down('md')]: {padding: '32px 24px 40px 24px'},
    [theme.breakpoints.down('sm')]: {padding: '24px 16px 40px 16px'},
}))

export const BackButton = styled('button')(({theme}) => ({
    display: 'inline-flex',
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: 1600,
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    borderRadius: 8,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    color: theme.palette.text.primary,
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.14)',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    transition: 'all 0.3s ease',
    marginBottom: 32,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
        transform: 'translateX(-4px)'
    },
}))


export const HeroSection = styled('section')(({theme}) => ({
    marginBottom: 60,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.palette.text.primary,

    margin: '-40px -32px 60px -32px',
    [theme.breakpoints.down('md')]: {
        margin: '-32px -24px 60px -24px'
    },
    [theme.breakpoints.down('sm')]: {
        margin: '-24px -16px 60px -16px'
    }
}))
export const HeroLogo = styled('img')(({theme}) => ({
    display: 'block',
    width: 'min(100%, 420px)',
    margin: '0 auto 6px auto',
    filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.6))',

    padding: '0 32px',
    [theme.breakpoints.down('md')]: {
        padding: '0 24px'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0 16px'
    }
}))
export const HeroBannerWrapper = styled('div')(() => ({
    position: 'relative',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    margin: 0,
    marginBottom: "100px",
    padding: 0,

    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
        pointerEvents: 'none'
    },

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '60px',
        background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
    }
}))
export const HeroBannerRight = styled('div')(() => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '60px',
    background: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
    pointerEvents: 'none',
    zIndex: 1
}))

export const HeroBanner = styled('img')(() => ({
    display: 'block',
    width: '100%',
    height: 'auto',

    objectFit: 'cover',
    objectPosition: 'center',

    maxHeight: '250px',
    margin: 0,
    padding: 0
}))
export const HeroImage = styled('img')(({theme}) => ({
    maxWidth: '80%',
    width: 'auto',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        maxWidth: '90%'
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '95%'
    }
}))
export const HeroContent = styled('div')(({theme}) => ({
    width: '100%',
    padding: '0 32px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
        padding: '0 24px'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0 16px'
    }
}))
export const HeroBadge = styled('div')(({theme}) => ({
    fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase',
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)',
    marginBottom: 8
}))
export const HeroGrid = styled('div')(({theme}) => ({
    width: '100%', maxWidth: 1100, display: 'grid',
    gridTemplateColumns: 'minmax(0, 540px) minmax(0, 1fr)', gap: 56, alignItems: 'center', marginTop: 12,
    [theme.breakpoints.down('md')]: {gridTemplateColumns: '1fr', gap: 28, textAlign: 'left'}
}))
export const HeroDevices = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
    filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.65))',
    pointerEvents: 'none',
    userSelect: 'none'
}))
export const HeroGlass = styled('div')(({theme}) => ({
    position: 'relative', padding: 24, borderRadius: 16,
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
    boxShadow: '0 20px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)', backdropFilter: 'blur(12px)',
    textAlign: 'left', color: theme.palette.text.primary,
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 10,
        left: 18,
        right: 18,
        height: 2,
        borderRadius: 999,
        background: PROCESS_BAR_GRADIENT_H
    }
}))
export const HeroMetaList = styled('dl')(({theme}) => ({
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    rowGap: 18,
    columnGap: 24,
    textAlign: 'left',
    color: theme.palette.text.primary
}))
export const HeroMetaKey = styled('dt')(({theme}) => ({
    fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
    whiteSpace: 'nowrap'
}))
export const HeroMetaVal = styled('dd')(({theme}) => ({
    margin: 0, fontSize: 18, fontWeight: 700, color: theme.palette.text.primary
}))
export const HeroKPIGrid = styled('div')(({theme}) => ({
    display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 18, marginBottom: 4,
    [theme.breakpoints.down('sm')]: {gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'}
}))
export const KPIChip = styled('div')(({theme}) => ({
    padding: '12px 14px',
    borderRadius: 14,
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.10)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    transition: 'transform .2s, box-shadow .2s, background .2s',
    color: theme.palette.text.primary,
    '&:hover': {
        transform: 'translateY(-2px)', boxShadow: '0 16px 32px rgba(0,0,0,.35)',
        background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
    }
}))
export const KPIValue = styled('div')(({theme}) => ({
    fontWeight: 900,
    fontSize: 22,
    lineHeight: 1.1,
    color: theme.palette.text.primary
}))
export const KPILabel = styled('div')(({theme}) => ({
    fontSize: 12, fontWeight: 800, letterSpacing: .6, textTransform: 'uppercase',
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)'
}))
export const HeroProblemTitle = styled('h3')(({theme}) => ({
    margin: '12px 0 6px 0',
    fontSize: 18,
    lineHeight: 1.25,
    fontWeight: 900,
    color: theme.palette.text.primary
}))
export const HeroDescription = styled('p')(({theme}) => ({
    margin: 0, fontSize: 18, lineHeight: 1.8,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.80)' : 'rgba(0,0,0,0.80)',
    maxWidth: 820, textAlign: 'left'
}))


export const SectionDivider = styled('div')(() => ({
    height: 2, width: "100%", background: PROCESS_BAR_GRADIENT_H, margin: '60px 0', borderRadius: 999
}))
export const Section = styled('div')(({theme}) => ({
    marginBottom: 60,
    color: theme.palette.text.primary,
    position: 'relative',
    // Ensure no overflow hidden that would break sticky positioning
    overflow: 'visible',
    [theme.breakpoints.down('md')]: {
        paddingBottom: 104
    }
}))
export const SectionTitle = styled('h2')(({theme}) => ({
    margin: '0 0 28px 0',
    fontFamily: "'Futura LT', 'Futura', sans-serif",
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 900,
    color: theme.palette.text.primary,
    lineHeight: 1.2
}))
export const SectionContent = styled('div')(() => ({display: 'flex', flexDirection: 'column', gap: 24}))
export const TwoColumn = styled('div')(({theme}) => ({
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start',
    [theme.breakpoints.down('md')]: {gridTemplateColumns: '1fr', gap: 24},
    '& h4': {margin: '0 0 16px 0', fontSize: 18, fontWeight: 800, color: theme.palette.text.primary},
    '& p': {
        margin: '12px 0', fontSize: 16, lineHeight: 1.7,
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
    },
}))
export const ThreeColumn = styled('div')(({theme}) => ({
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'start',
    [theme.breakpoints.down('md')]: {gridTemplateColumns: '1fr', gap: 20},
    '& h4': {margin: '0 0 12px 0', fontSize: 17, fontWeight: 800, color: theme.palette.text.primary},
    '& p': {
        margin: 0, fontSize: 15, lineHeight: 1.6,
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
    },
}))
export const TextBlock = styled('p')(({theme}) => ({
    margin: '0 0 16px 0', fontSize: 16, lineHeight: 1.8,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.84)' : 'rgba(0,0,0,0.84)'
}))
export const BoldText = styled('span')(({theme}) => ({fontWeight: 900, color: theme.palette.text.primary}))
export const ListItem = styled('div')(({theme}) => ({
    margin: '8px 0', fontSize: 15, lineHeight: 1.6,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.84)' : 'rgba(0,0,0,0.84)'
}))
export const StatCard = styled('div')(({theme}) => ({
    padding: 28, borderRadius: 12,
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
    textAlign: 'center', transition: 'all .3s ease', color: theme.palette.text.primary,
    '&:hover': {
        background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.35)'
    },
}))
export const StatNumber = styled('div')(({theme}) => ({
    fontSize: 'clamp(36px, 6vw, 52px)',
    fontWeight: 900,
    color: theme.palette.text.primary,
    lineHeight: 1,
    marginBottom: 8
}))
export const StatLabel = styled('div')(({theme}) => ({
    fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)',
    marginBottom: 8
}))
export const StatDescription = styled('p')(({theme}) => ({
    fontSize: 14, lineHeight: 1.5,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    margin: 0
}))


export const StepPanel = styled('div')<{ $active?: boolean }>(({$active, theme}) => ({
    position: 'relative',
    padding: '22px clamp(18px, 2.2vw, 26px) 24px',
    borderRadius: 14,
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
    boxShadow: $active ? '0 14px 48px rgba(27,24,135,.4)' : 'none',
    transform: $active ? 'translateY(-2px)' : 'translateY(0)',
    color: theme.palette.text.primary,


    '&::before': {
        content: '""',
        position: 'absolute',
        left: 10,
        top: 14,
        bottom: 14,
        width: 4,
        borderRadius: 999,
        background: $active ? PROCESS_BAR_GRADIENT_V : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)')
    },


    '& h3': {
        margin: '2px 0 2px',
        fontSize: 'clamp(24px, 3.6vw, 36px)',
        lineHeight: 1.12,
        fontWeight: 900,
        color: theme.palette.text.primary
    },


    '& .eyebrow': {
        fontSize: 13,
        fontWeight: 900,
        letterSpacing: 0.7,
        textTransform: 'uppercase',
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)'
    },


    '& .bullet-h': {
        fontWeight: 900,
        fontSize: 'clamp(18px, 2.2vw, 24px)',
        lineHeight: 1.2,
        marginBottom: 6,
        color: theme.palette.text.primary,
        paddingLeft: '0px'
    },


    '& .bullet-p': {
        fontSize: 'clamp(15px, 1.7vw, 18px)',
        lineHeight: 1.6,
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.84)' : 'rgba(0,0,0,0.84)',
        marginBottom: 16,
        paddingLeft: '0px'
    }
}))


export const StepHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
    color: theme.palette.text.primary
}))

export const StepBadge = styled('span')(({theme}) => ({
    display: 'inline-grid',
    placeItems: 'center',
    width: 26,
    height: 26,
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 14,
    color: '#FFFFFF',
    background: INDIGO,
    boxShadow: '0 6px 16px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.2)'
}))

export const StepContent = styled('div')(() => ({
    paddingLeft: '36px',
}))

// Mobile-specific sticky step tracker styles
export const MobileStepTracker = styled('div')<{ $pinned?: boolean }>(({theme, $pinned}) => ({
    display: 'none', // Default: hidden
    position: $pinned ? 'fixed' : 'sticky',
    top: 'auto',
    bottom: $pinned ? 0 : 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: $pinned ? 1400 : 999,
    marginBottom: 0,
    boxSizing: 'border-box',

    [theme.breakpoints.down('md')]: {
        display: 'block', // Show on mobile
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(12, 12, 12, 0.70)'
            : 'rgba(255, 255, 255, 0.70)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.12)'
            : '1px solid rgba(0,0,0,0.12)',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollPaddingLeft: 32,
        scrollPaddingRight: 32,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        paddingLeft: 16,
        paddingRight: 16,
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 26px rgba(0,0,0,0.28)'
            : '0 8px 22px rgba(0,0,0,0.12)',
    }
}))

export const MobileStepTrackInner = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    padding: '14px 16px',
    width: '100%',
    position: 'relative',
    // Progress line
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 16,
        right: 16,
        top: '50%',
        height: 2,
        background: 'linear-gradient(90deg, rgba(27,24,135,0.2) 0%, rgba(27,24,135,0.4) 50%, rgba(27,24,135,0.2) 100%)',
        transform: 'translateY(-50%)',
        zIndex: 0,
        pointerEvents: 'none',
    }
}))

export const MobileStepChip = styled('button')<{ $active?: boolean }>(({$active, theme}) => ({
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '2px solid',
    borderColor: $active
        ? INDIGO
        : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'),
    background: $active
        ? (theme.palette.mode === 'dark' ? 'rgba(27,24,135,0.2)' : 'rgba(27,24,135,0.1)')
        : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
    cursor: 'pointer',
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
    fontSize: '13px',
    fontWeight: $active ? 800 : 700,
    color: $active
        ? (theme.palette.mode === 'dark' ? '#FFFFFF' : theme.palette.text.primary)
        : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'),
    boxShadow: $active
        ? '0 4px 16px rgba(27,24,135,0.3), 0 2px 8px rgba(0,0,0,0.15)'
        : 'none',
    transform: $active ? 'scale(1.05)' : 'scale(1)',
    zIndex: $active ? 2 : 1,
    position: 'relative',
    '&:hover': {
        transform: $active ? 'scale(1.05)' : 'scale(1.02)',
        borderColor: $active
            ? INDIGO
            : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'),
    },
    '&:active': {
        transform: 'scale(0.98)',
    },
    // Glow effect for active
    ...($active && {
        '&::before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${INDIGO}, rgba(27,24,135,0.6))`,
            zIndex: -1,
            opacity: 0.3,
            filter: 'blur(8px)',
        }
    }),
}))

export const MobileStepBadge = styled('span')<{ $active?: boolean }>(({$active, theme}) => ({
    display: 'inline-grid',
    placeItems: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    fontWeight: 900,
    fontSize: '12px',
    color: '#FFFFFF',
    background: $active
        ? `linear-gradient(135deg, ${INDIGO} 0%, rgba(27,24,135,0.8) 100%)`
        : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'),
    flexShrink: 0,
    transition: 'all .3s ease',
    boxShadow: $active
        ? '0 2px 8px rgba(27,24,135,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
        : 'none',
}))

export const MobileStepLabel = styled('span')(() => ({
    fontSize: '13px',
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '0.3px',
}))

export const MobileStepSpacer = styled('div')<{ $height?: number }>(({ $height }) => ({
    height: 0,
    transition: 'height 160ms ease',
}))
