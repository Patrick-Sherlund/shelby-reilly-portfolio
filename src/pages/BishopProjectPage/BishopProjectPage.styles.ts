import {styled} from '@mui/material/styles'

const BISHOP_BLUE = '#4A90E2'

const PROCESS_BAR_GRADIENT_V =
    'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #4A90E2 31%, #4A90E2 68%, rgba(0,0,0,.5) 100%)'
const PROCESS_BAR_GRADIENT_H =
    'linear-gradient(90deg, rgba(0,0,0,.5) 0%, #4A90E2 31%, #4A90E2 68%, rgba(0,0,0,.5) 100%)'

export const ProjectPageContainer = styled('div')(({theme}) => ({
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: "#010413",
    backgroundImage: 'none',
    color: theme.palette.text.primary,
    transition: 'background-color 0.3s ease, color 0.3s ease'
}))

export const BoardContent = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 60,
    boxSizing: 'border-box',

}))

export const ContentWrapper = styled('div')(({theme}) => ({
    zIndex: 10,
    pointerEvents: 'auto',
    width: '100%',
    maxWidth: 1420,
    margin: '0 auto',
    padding: '40px 32px 40px 32px',
    boxSizing: 'border-box',
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
    width: 'min(100%, 480px)',
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

    maxHeight: '420px',
    margin: 0,
    padding: 0
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

export const HeroDevices = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
    filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.65))',
    pointerEvents: 'none',
    userSelect: 'none'
}))

export const HeroDevicesContainer = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0
}))

interface HeroDeviceProps {
    isHovered: boolean
}

export const HeroDevice = styled('img')<HeroDeviceProps>(({isHovered}) => ({
    width: '52%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
    filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.65))',
    userSelect: 'none',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    pointerEvents: 'auto'
}))

export const HeroDeviceBottom = styled(HeroDevice)<HeroDeviceProps>(({isHovered}) => ({
    position: 'relative',
    marginRight: '-16%',
    transform: isHovered ? 'translateY(-14%) scale(1.05)' : 'translateY(-14%)',
    zIndex: isHovered ? 10 : 1
}))

export const HeroDeviceTop = styled(HeroDevice)<HeroDeviceProps>(({isHovered}) => ({
    position: 'relative',
    transform: isHovered ? 'translateY(14%) scale(1.05)' : 'translateY(14%)',
    zIndex: isHovered ? 10 : 2
}))


export const SectionDivider = styled('div')(() => ({
    height: 2, width: "100%", background: PROCESS_BAR_GRADIENT_H, margin: '60px 0', borderRadius: 999
}))

export const Section = styled('div')(({theme}) => ({
    marginBottom: 60,
    color: theme.palette.text.primary,
    position: 'relative'
}))

export const SectionTitle = styled('h2')(({theme}) => ({
    margin: '0 0 28px 0',
    fontFamily: "'Futura LT', 'Futura', sans-serif",
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 900,
    color: theme.palette.text.primary,
    lineHeight: 1.2
}))

export const SectionContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 24
}))


export const ChallengeSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary
}))

export const ChallengeTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 60,
    color: '#7AA7E5',
    '&::before': {
        content: '"// "',
        color: '#7AA7E5'
    }
}))

export const ChallengeSubtitle = styled('p')(({theme}) => ({
    fontSize: 'clamp(18px, 2.5vw, 24px)',
    lineHeight: 1.6,
    marginBottom: 60,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
    maxWidth: 900,
    margin: '0 auto 60px auto'
}))

export const ChallengeGrid = styled('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    maxWidth: 1200,
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: 20
    }
}))

export const ChallengeCard = styled('div')(({theme}) => ({
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: 16,
    padding: 32,
    textAlign: 'left',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
    }
}))

export const ChallengeCardTitle = styled('h3')(({theme}) => ({
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 16,
    color: theme.palette.text.primary
}))

export const ChallengeCardContent = styled('div')(({theme}) => ({
    fontSize: 16,
    lineHeight: 1.7,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
}))

export const HurricaneImage = styled('img')(() => ({
    width: '100%',
    maxWidth: 160,
    height: 'auto',
    borderRadius: 8,
    marginTop: 8
}))


export const VisionSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 60
}))

export const VisionTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 60,
    color: '#7AA7E5',
    '&::before': {
        content: '"// "',
        color: '#7AA7E5'
    }
}))

export const VisionText = styled('p')(({theme}) => ({
    fontSize: 'clamp(18px, 2.5vw, 24px)',
    lineHeight: 1.6,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
    maxWidth: 900,
    margin: '0 auto'
}))

export const BoldText = styled('span')(() => ({
    fontWeight: 700
}))

export const VisionIconsContainer = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
    [theme.breakpoints.down('sm')]: {
        gap: 40
    }
}))

export const VisionIcon = styled('img')(({theme}) => ({
    width: 64,
    height: 64,
    objectFit: 'contain',
    userSelect: 'none',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)'
    },
    [theme.breakpoints.down('sm')]: {
        width: 48,
        height: 48
    }
}))


export const ResearchSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary
}))

export const ResearchTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 60,
    color: '#7AA7E5',
    '&::before': {
        content: '"// "',
        color: '#7AA7E5'
    }
}))

export const ResearchGrid = styled('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    maxWidth: 1200,
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: 20
    }
}))

export const ResearchCard = styled('div')(({theme}) => ({
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
    borderRadius: 24,
    padding: '40px 32px',
    textAlign: 'left',
    minHeight: 240,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    transition: 'all 0.3s ease'
}))

export const ResearchCardTitle = styled('h3')(({theme}) => ({
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
    color: theme.palette.text.primary
}))

export const ResearchCardContent = styled('p')(({theme}) => ({
    fontSize: 16,
    lineHeight: 1.7,
    margin: 0,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
}))


export const DesignSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary
}))

export const DesignTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 60,
    color: '#7AA7E5',
    '&::before': {
        content: '"// "',
        color: '#7AA7E5'
    }
}))

export const DesignSubtitle = styled('div')(({theme}) => ({
    fontSize: 'clamp(18px, 2.5vw, 24px)',
    fontWeight: 600,
    lineHeight: 1.6,
    marginBottom: 16,
    color: theme.palette.text.primary,
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: 16,
    padding: '32px',
    maxWidth: '88%',
    margin: '0 auto 60px auto'
}))

export const DesignSubtitleText = styled('p')(({theme}) => ({
    fontSize: 16,
    lineHeight: 1.7,
    margin: '8px 0 0 0',
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
    fontWeight: 400
}))

export const DesignCarouselWrapper = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    padding: '40px 0'
}))

export const DesignCarouselContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: '100%',
    overflow: 'visible'
}))

export const DesignCarouselRow = styled('div')(() => ({
    display: 'flex',
    gap: 24,
    width: 'fit-content',
    willChange: 'transform',
    overflow: 'visible',
    '&:first-of-type': {
        animation: 'scroll-left 60s linear infinite'
    },
    '&:last-of-type': {
        animation: 'scroll-right 60s linear infinite',
        marginLeft: '60px'
    },
    '@keyframes scroll-left': {
        '0%': {
            transform: 'translateX(0)'
        },
        '100%': {
            transform: 'translateX(-50%)'
        }
    },
    '@keyframes scroll-right': {
        '0%': {
            transform: 'translateX(-50%)'
        },
        '100%': {
            transform: 'translateX(0)'
        }
    }
}))

export const DesignSlide = styled('div')(() => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
    width: 'clamp(280px, 22vw, 380px)',
    transition: 'transform 0.3s ease',
    overflow: 'visible',
    '&:hover': {
        transform: 'scale(1.08)',
        zIndex: 10
    }
}))

export const DesignImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)',
    userSelect: 'none',
    WebkitUserDrag: 'none',
    transition: 'box-shadow 0.3s ease',
    '.DesignSlide:hover &': {
        boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)'
    }
}))


export const DataDesignSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary
}))

export const DataDesignTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 24,
    color: '#FFFFFF'
}))

export const DataDesignSubtitle = styled('p')(({theme}) => ({
    fontSize: 'clamp(16px, 2vw, 20px)',
    lineHeight: 1.7,
    marginBottom: 60,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    maxWidth: 900,
    margin: '0 auto 60px auto'
}))

export const DataDesignContent = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
    alignItems: 'flex-start',
    maxWidth: 1200,
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: 24
    }
}))

export const DataDesignImageWrapper = styled('div')(() => ({
    flex: '1 1 50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
}))

export const DataDesignImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))


export const DesignDecisionsSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary
}))

export const DesignDecisionsTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 24,
    color: '#FFFFFF'
}))

export const DesignDecisionsSubtitle = styled('p')(({theme}) => ({
    fontSize: 'clamp(16px, 2vw, 20px)',
    lineHeight: 1.7,
    marginBottom: 60,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    maxWidth: 900,
    margin: '0 auto 60px auto'
}))

export const DesignDecisionsContent = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: 48,
    alignItems: 'center',
    maxWidth: 1200,
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: 32,
        alignItems: 'flex-start'
    }
}))

export const DesignDecisionsImageWrapper = styled('div')(() => ({
    flex: '1 1 55%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

export const DesignDecisionsImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const DesignDecisionsList = styled('div')(() => ({
    flex: '1 1 45%',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    textAlign: 'left',
    paddingTop: 8
}))

export const DesignDecisionItem = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 8
}))

export const DesignDecisionItemTitle = styled('h3')(({theme}) => ({
    fontSize: 'clamp(20px, 2.5vw, 24px)',
    fontWeight: 700,
    margin: 0,
    color: theme.palette.text.primary,
    lineHeight: 1.3
}))

export const DesignDecisionItemDescription = styled('p')(({theme}) => ({
    fontSize: 'clamp(15px, 1.8vw, 18px)',
    lineHeight: 1.6,
    margin: 0,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)'
}))


export const SolutionSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}))

export const SolutionTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 80,
    color: '#7AA7E5',
    '&::before': {
        content: '"// "',
        color: '#7AA7E5'
    }
}))

export const SolutionVideoWrapper = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: 800,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        maxWidth: 600
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        padding: '0 16px'
    }
}))

export const SolutionTabletImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    pointerEvents: 'none',
    position: 'relative',
    zIndex: 1
}))

export const SolutionVideo = styled('video')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% / 1.09)',
    height: 'auto',
    border: '1px solid #1f1f1fff',
    borderRadius: '8px',
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
    display: 'block',
    zIndex: 2
}))


export const ImpactSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}))

export const ImpactTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 80,
    color: '#7AA7E5',
    '&::before': {
        content: '"// "',
        color: '#7AA7E5'
    }
}))

export const ImpactStatement = styled('p')(({theme}) => ({
    fontSize: 'clamp(28px, 4vw, 52px)',
    fontWeight: 500,
    lineHeight: 1.4,
    margin: 0,
    color: theme.palette.text.primary,
    maxWidth: 1100,
    [theme.breakpoints.down('md')]: {
        fontSize: 'clamp(24px, 4vw, 36px)'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(20px, 5vw, 28px)'
    }
}))

export const ImpactHighlight = styled('span')(() => ({
    color: '#7AA7E5',
    fontWeight: 700
}))


export const LearningsSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary
}))

export const LearningsTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 60,
    color: '#7AA7E5',
    '&::before': {
        content: '"// "',
        color: '#7AA7E5'
    }
}))

export const LearningsGrid = styled('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
    maxWidth: 1200,
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: 20
    }
}))

export const LearningCard = styled('div')(({theme}) => ({
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: 24,
    padding: '40px 32px',
    textAlign: 'left',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    transition: 'all 0.3s ease'
}))

export const LearningCardTitle = styled('h3')(({theme}) => ({
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: 12
}))

export const LearningEmoji = styled('span')(() => ({
    fontSize: 24,
    display: 'inline-block'
}))

export const LearningCardContent = styled('p')(({theme}) => ({
    fontSize: 16,
    lineHeight: 1.7,
    margin: 0,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)'
}))


export const ThankYouSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 60
}))

export const ThankYouTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 0,
    color: '#7AA7E5'
}))

export const ThankYouCard = styled('div')(({theme}) => ({
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: 24,
    padding: '40px 48px',
    maxWidth: 900,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        padding: '32px 24px'
    }
}))

export const ThankYouCardTitle = styled('h3')(({theme}) => ({
    fontSize: 'clamp(20px, 2.5vw, 24px)',
    fontWeight: 600,
    margin: '0 0 16px 0',
    color: theme.palette.text.primary
}))

export const ThankYouCardText = styled('p')(({theme}) => ({
    fontSize: 'clamp(15px, 1.8vw, 18px)',
    lineHeight: 1.7,
    margin: 0,
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
}))

export const ThankYouImage = styled('img')(() => ({
    width: '100%',
    maxWidth: 900,
    height: 'auto',
    display: 'block',
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))


export const LinksSection = styled('section')(({theme}) => ({
    marginBottom: 80,
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 40
}))

export const LinksTitle = styled('h2')(() => ({
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    marginBottom: 20,
    color: '#7AA7E5',
    '&::before': {
        content: '"// "',
        color: '#7AA7E5'
    }
}))

export const LinksContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center'
}))

export const LinkButton = styled('a')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px 32px',
    fontSize: 'clamp(16px, 2vw, 20px)',
    fontWeight: 600,
    color: theme.palette.text.primary,
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: 16,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    '&:active': {
        transform: 'translateY(0)'
    }
}))

