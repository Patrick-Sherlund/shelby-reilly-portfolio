import {styled} from '@mui/material/styles'

const CODESIGN_BLUE = '#5B8DEE'
const BACKGROUND_COLOR = '#FFFFFF'


const PROCESS_BAR_GRADIENT_V =
    'linear-gradient(180deg, #F4B400 0%, #6ECCA9 28%, #4285F4 64%, #7054ED 100%)'
const PROCESS_BAR_GRADIENT_H =
    'linear-gradient(90deg, #F4B400 0%, #6ECCA9 28%, #4285F4 64%, #7054ED 100%)'

export const ProjectPageContainer = styled('div')(({theme}) => ({
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: BACKGROUND_COLOR,
    backgroundImage: 'none',
    color: '#000000',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
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

export const BackButton = styled('button')(() => ({
    display: 'inline-flex',
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: 1600,
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.06)',
    color: '#000000',
    border: '1px solid rgba(0,0,0,0.14)',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    transition: 'all 0.3s ease',
    marginBottom: 32,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.10)',
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
    color: '#000000',

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
    width: 'min(100%, 540px)',
    margin: '0 auto 32px auto',
    filter: 'none',

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
    marginBottom: "60px",
    padding: 0,

    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to top, #FFFFFF 0%, rgba(247,247,247,0) 100%)',
        pointerEvents: 'none',
        zIndex: 1
    }
}))

export const HeroBanner = styled('img')(() => ({
    display: 'block',
    width: '100%',
    height: 'auto',

    objectFit: 'cover',
    objectPosition: 'top',

    maxHeight: '540px',
    margin: 0,
    padding: 0
}))

export const HeroContent = styled('div')(({theme}) => ({
    width: '100%',
    padding: '0 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        padding: '0 24px'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0 16px'
    }
}))

export const HeroDescription = styled('div')(() => ({
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '28px',
    color: '#000000',
    maxWidth: '720px',
    marginBottom: '48px',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const HeroSubtext = styled('div')(() => ({
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    maxWidth: '800px',
    marginBottom: '60px',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const InfoSection = styled('div')(({theme}) => ({
    position: 'relative',
    backgroundColor: CODESIGN_BLUE,
    borderRadius: '24px',
    padding: '48px 80px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    gap: '60px',
    width: '75%',
    margin: '0 auto 80px auto',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '32px',
        padding: '40px 48px'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '32px 24px',
        gap: '24px'
    }
}))

export const InfoSparkleLeft = styled('img')(({theme}) => ({
    position: 'absolute',
    left: '-40px',
    top: '-40px',
    width: '60px',
    height: 'auto',
    pointerEvents: 'none',
    userSelect: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))

export const InfoSparkleRight = styled('img')(({theme}) => ({
    position: 'absolute',
    right: '-40px',
    top: '-40px',
    width: '60px',
    height: 'auto',
    pointerEvents: 'none',
    userSelect: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))


export const InfoItem = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    textAlign: 'left'
}))

export const InfoLabel = styled('div')(() => ({
    fontSize: '14px',
    fontWeight: 800,
    color: '#FFFFFF',
    opacity: 0.9,
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const InfoValue = styled('div')(() => ({
    fontSize: '16px',
    fontWeight: 500,
    color: '#FFFFFF',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))


export const PreviewImageSection = styled('section')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto'
}))

export const PreviewImage = styled('img')(() => ({
    width: '80%',
    height: 'auto',
    display: 'block',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    userSelect: 'none',
    WebkitUserDrag: 'none',
    margin: '0 auto'
}))


export const ProcessSection = styled('section')(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '80px auto',
    padding: '0 32px',
    boxSizing: 'border-box'
}))

export const ProcessTitle = styled('h2')(() => ({
    fontSize: '64px',
    fontWeight: 700,
    color: '#5B8DEE',
    textAlign: 'center',
    margin: '0 0 60px 0',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    letterSpacing: '0.02em'
}))

export const ProcessContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '800px',
    width: '100%',
    marginBottom: '80px'
}))

export const ProcessRow = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    gap: '40px',
    alignItems: 'baseline',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const ProcessLabel = styled('div')(() => ({
    fontSize: '18px',
    fontWeight: 700,
    color: '#000000',
    textAlign: 'right',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const ProcessDescription = styled('div')(() => ({
    fontSize: '18px',
    fontWeight: 400,
    color: '#000000',
    lineHeight: '1.5',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const ProcessIllustration = styled('img')(() => ({
    width: '300px',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))


export const ResearchSectionContainer = styled('section')(() => ({
    width: '100%',
    maxWidth: '1100px',
    margin: '80px auto',
    padding: '0 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px'
}))

export const ResearchHeader = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '60px',
    alignItems: 'start',
    marginBottom: '0',
    '@media (max-width: 900px)': {
        gridTemplateColumns: '1fr',
        gap: '40px'
    }
}))

export const ResearchTitleWrapper = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
}))

export const ResearchSquiggle = styled('img')(() => ({
    width: '32px',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const ResearchTitleText = styled('h2')(() => ({
    fontSize: '36px',
    fontWeight: 700,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    letterSpacing: '0.01em'
}))

export const ResearchMainContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%'
}))

export const ResearchTextColumn = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%'
}))

export const ResearchParagraph = styled('p')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const ResearchImageColumn = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    width: '100%'
}))

export const CompetitiveAnalysisBox = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    width: '100%',
    alignItems: 'start'
}))

export const CompetitiveAnalysisContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0px'
}))

export const CompetitiveAnalysisTitle = styled('h3')(() => ({
    fontSize: '24px',
    fontWeight: 600,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const CompetitiveAnalysisSubtitle = styled('div')(() => ({
    fontSize: '24px',
    fontWeight: 600,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const CompetitiveAnalysisList = styled('div')(() => ({
    margin: 0,
    marginTop: "32px",
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
    fontSize: '15px',
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    lineHeight: '24px'
}))

export const CompetitiveImageWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    maxWidth: "300px"
}))

export const CompetitiveImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const AffinityMappingBox = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    width: '100%',
    alignItems: 'start'
}))

export const AffinityMappingContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
}))

export const AffinityMappingTitle = styled('h3')(() => ({
    fontSize: '24px',
    fontWeight: 600,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const AffinityMappingImageWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
}))

export const AffinityMappingImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const OverallFindingsBox = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    width: '100%',
    alignItems: 'start'
}))

export const OverallFindingsContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
}))

export const OverallFindingsTitle = styled('h3')(() => ({
    fontSize: '24px',
    fontWeight: 600,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const OverallFindingsText = styled('p')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const FindingsImageWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
}))

export const FindingsImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
    userSelect: 'none',
    WebkitUserDrag: 'none'
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


export const SectionDivider = styled('div')(() => ({
    height: 3,
    width: "80%",
    margin: '60px auto',
    alignSelf: "center",
    borderRadius: 999,
    background: `linear-gradient(90deg,
    transparent 0%,
    #F4B400 15%,
    #6ECCA9 35%,
    #4285F4 65%,
    #7054ED 85%,
    transparent 100%
  )`,
    opacity: 0.8
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


export const IdeationSectionContainer = styled('section')(() => ({
    width: '100%',
    maxWidth: '1100px',
    margin: '80px auto 120px auto',
    padding: '0 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
}))

export const IdeationHeader = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '60px',
    alignItems: 'start',
    marginBottom: '0',
    '@media (max-width: 900px)': {
        gridTemplateColumns: '1fr',
        gap: '40px'
    }
}))

export const IdeationTitleWrapper = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
}))

export const IdeationSquiggle = styled('img')(() => ({
    width: '32px',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const IdeationTitleText = styled('h2')(() => ({
    fontSize: '36px',
    fontWeight: 700,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    letterSpacing: '0.01em'
}))

export const IdeationContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%'
}))

export const IdeationParagraph = styled('p')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const IdeationLink = styled('a')(() => ({
    color: 'inherit',
    textDecoration: 'underline',
    fontWeight: 400,
    '&:hover': {
        opacity: 0.8
    }
}))

export const GoogleLetter = styled('span')<{ $color: string }>(({$color}) => ({
    color: $color
}))

export const VideoContainer = styled('div')(() => ({
    width: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    backgroundColor: '#000000',
    marginTop: '32px',
    marginBottom: '32px'
}))

export const IdeationVideo = styled('video')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'contain'
}))

export const IdeationSubtitle = styled('div')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: '-16px',
    marginBottom: '32px',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const SprintOutcomeSection = styled('div')(() => ({
    marginTop: '60px'
}))

export const SprintOutcomeTitle = styled('h3')(() => ({
    fontSize: '24px',
    fontWeight: 600,
    color: '#5B8DEE',
    margin: '0 0 24px 0',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const SprintOutcomeText = styled('p')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: '0 0 16px 0',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const SprintOutcomeHighlight = styled('span')(() => ({
    fontWeight: 700,
    color: '#000000'
}))

export const SprintOutcomeFlows = styled('div')(() => ({
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: '8px 0 24px 0',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const SprintOutcomeExample = styled('div')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: '16px 0',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
}))

export const SprintOutcomeImageWrapper = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px'
}))

export const SprintOutcomeImage = styled('img')(() => ({
    width: '100%',
    maxWidth: '900px',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))


export const DesignSectionContainer = styled('section')(() => ({
    width: '100%',
    maxWidth: '1200px',
    margin: '120px auto 80px auto'
}))

export const DesignHeader = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: '80px',
    marginBottom: '80px',
    '@media (max-width: 900px)': {
        gridTemplateColumns: '1fr',
        gap: '40px'
    }
}))

export const DesignTitleWrapper = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
}))

export const DesignSquiggle = styled('img')(() => ({
    width: '50px',
    height: 'auto',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const DesignTitleText = styled('h2')(() => ({
    fontSize: '48px',
    fontWeight: 700,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    letterSpacing: '-0.5px'
}))

export const DesignMainContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
}))

export const DesignParagraph = styled('p')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const DesignSubsectionBox = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    marginBottom: '60px',
    alignItems: 'flex-start',
    '@media (max-width: 900px)': {
        gridTemplateColumns: '1fr',
        gap: '30px'
    }
}))

export const DesignSubsectionContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
}))

export const DesignSubsectionTitle = styled('h3')(() => ({
    fontSize: '24px',
    fontWeight: 700,
    color: '#107BFF',
    margin: '0 0 8px 0',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const DesignSubsectionLabel = styled('span')(() => ({
    fontSize: '16px',
    fontWeight: 700,
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const DesignSubsectionText = styled('span')(() => ({
    fontSize: '16px',
    lineHeight: '24px',
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const DesignSubsectionRow = styled('div')(() => ({
    display: 'flex',
    gap: '8px',
    alignItems: 'baseline',
    marginBottom: '8px'
}))

export const DesignSubsectionImageWrapper = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
}))

export const DesignSubsectionImage = styled('img')(() => ({
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const DesignSubsectionList = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))


export const PrototypeBannerSection = styled('section')(({theme}) => ({
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    position: 'relative',
    margin: '80px calc(-50vw + 50%) 80px calc(-50vw + 50%)',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
        margin: '60px calc(-50vw + 50%) 60px calc(-50vw + 50%)'
    },
    [theme.breakpoints.down('sm')]: {
        margin: '40px calc(-50vw + 50%) 40px calc(-50vw + 50%)'
    }
}))

export const PrototypeBannerContainer = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    paddingTop: '66.67%',
    overflow: 'visible'
}))

export const PrototypeBannerBg = styled('img')(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    zIndex: 1,
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const PrototypeOverlay = styled('img')<{
    $top: string;
    $left: string;
    $width: string;
    $zIndex: number;
    $transform?: string;
    $delay?: number;
    $isVisible?: boolean;
}>(({$top, $left, $width, $zIndex, $transform, $delay = 0, $isVisible = false}) => ({
    position: 'absolute',
    top: $top,
    left: $left,
    width: $width,
    height: 'auto',
    zIndex: $zIndex,
    userSelect: 'none',
    WebkitUserDrag: 'none',
    transform: $transform || 'none',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    borderRadius: '4px',
    opacity: $isVisible ? 1 : 0,
    animation: $isVisible ? `bubbleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${$delay}s both` : 'none',
    '@keyframes bubbleUp': {
        '0%': {
            opacity: 0,
            transform: `translateY(20px) scale(0.8) ${$transform || ''}`,
        },
        '100%': {
            opacity: 1,
            transform: `translateY(0) scale(1) ${$transform || ''}`,
        }
    }
}))


export const EvaluationSectionContainer = styled('section')(() => ({
    width: '100%',
    maxWidth: '1200px',
    margin: '120px auto 80px auto',
    padding: '0 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px'
}))

export const EvaluationHeader = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '60px',
    alignItems: 'start',
    marginBottom: '0',
    '@media (max-width: 900px)': {
        gridTemplateColumns: '1fr',
        gap: '40px'
    }
}))

export const EvaluationTitleWrapper = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
}))

export const EvaluationSquiggle = styled('img')(() => ({
    width: '32px',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const EvaluationTitleText = styled('h2')(() => ({
    fontSize: '36px',
    fontWeight: 700,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    letterSpacing: '0.01em'
}))

export const EvaluationContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%'
}))

export const EvaluationParagraph = styled('p')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const EvaluationFlowsGrid = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginTop: '40px',
    marginBottom: '40px',
    '@media (max-width: 1000px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px'
    },
    '@media (max-width: 600px)': {
        gridTemplateColumns: '1fr',
        gap: '12px'
    }
}))

export const FlowCard = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
}))

export const FlowButton = styled('div')(() => ({
    backgroundColor: '#5B8DEE',
    color: '#FFFFFF',
    padding: '12px 20px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'center',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const FlowMetrics = styled('div')(() => ({
    backgroundColor: '#FFFFFF',
    border: '2px solid #5B8DEE',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    minHeight: '200px'
}))

export const MetricItem = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
}))

export const MetricLabel = styled('div')(() => ({
    fontSize: '13px',
    fontWeight: 700,
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const MetricDescription = styled('div')(() => ({
    fontSize: '12px',
    lineHeight: '18px',
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const EvaluationResultsSection = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    marginTop: '40px',
    '@media (max-width: 900px)': {
        gridTemplateColumns: '1fr',
        gap: '40px'
    }
}))

export const ResultsColumn = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
}))

export const ResultsTitle = styled('h3')(() => ({
    fontSize: '18px',
    fontWeight: 700,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const ResultsList = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    columnGap: '24px',
    rowGap: '12px',
    alignItems: 'baseline',
    width: 'fit-content'
}))

export const ResultItem = styled('div')(() => ({
    display: 'contents',

}))

export const ResultItemTitle = styled('div')(() => ({
    fontSize: '15px',
    fontWeight: 600,
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const ResultItemScore = styled('div')(() => ({
    fontSize: '14px',
    color: '#6ECCA9',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 600,
    whiteSpace: 'nowrap'
}))

export const ResultsText = styled('p')(() => ({
    fontSize: '15px',
    lineHeight: '24px',
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const EvaluationExampleSection = styled('div')(() => ({
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
}))

export const ExampleTitle = styled('h3')(() => ({
    fontSize: '18px',
    fontWeight: 700,
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const ExampleText = styled('p')(() => ({
    fontSize: '15px',
    lineHeight: '24px',
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const ExampleLink = styled('a')(() => ({
    color: '#5B8DEE',
    textDecoration: 'underline',
    fontWeight: 500,
    '&:hover': {
        opacity: 0.8
    }
}))

export const ExampleImageBox = styled('div')(() => ({
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
}))

export const ExampleImageLabel = styled('div')(() => ({
    fontSize: '15px',
    fontWeight: 600,
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const ExampleImageSubtext = styled('div')(() => ({
    fontSize: '14px',
    lineHeight: '22px',
    color: '#666666',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const EvaluationImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
    marginTop: '16px',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))


export const ConclusionSectionContainer = styled('section')(() => ({
    width: '100%',
    maxWidth: '1200px',
    margin: '80px auto 120px auto',
    padding: '0 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px'
}))

export const ConclusionHeader = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '60px',
    alignItems: 'start',
    marginBottom: '0',
    '@media (max-width: 900px)': {
        gridTemplateColumns: '1fr',
        gap: '40px'
    }
}))

export const ConclusionTitleWrapper = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
}))

export const ConclusionSquiggle = styled('img')(() => ({
    width: '32px',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const ConclusionTitleText = styled('h2')(() => ({
    fontSize: '36px',
    fontWeight: 700,
    color: '#5B8DEE',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    letterSpacing: '0.01em'
}))

export const ConclusionContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    width: '100%'
}))

export const ConclusionSubsection = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
}))

export const ConclusionSubtitle = styled('h3')(() => ({
    fontSize: '18px',
    fontWeight: 700,
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif"
}))

export const ConclusionParagraph = styled('p')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    margin: 0,
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const ConclusionList = styled('ol')(() => ({
    margin: 0,
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
}))

export const ConclusionListItem = styled('li')(() => ({
    fontSize: '16px',
    lineHeight: '26px',
    color: '#000000',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    fontWeight: 400
}))

export const ConclusionBannerWrapper = styled('div')(() => ({
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
    marginTop: '60px',
    marginBottom: '60px'
}))

export const ConclusionBanner = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    WebkitUserDrag: 'none'
}))

export const ConclusionButtonsContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '400px',
    alignItems: 'center'
}))

export const ConclusionButton = styled('a')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#5B8DEE',
    backgroundColor: '#FFFFFF',
    border: '2px solid #5B8DEE',
    borderRadius: '999px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#5B8DEE',
        color: '#FFFFFF',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(91, 141, 238, 0.3)'
    },
    '&:active': {
        transform: 'translateY(0)'
    }
}))
