import {keyframes, styled} from '@mui/material/styles'

const rotateClockwise = keyframes({
    from: {
        transform: 'rotate(-45deg)'
    },
    to: {
        transform: 'rotate(45deg)'
    }
})

const rotateCounterClockwise = keyframes({
    from: {
        transform: 'rotate(45deg)'
    },
    to: {
        transform: 'rotate(-45deg)'
    }
})

const spinClockwise = keyframes({
    from: {
        transform: 'rotate(0deg)'
    },
    to: {
        transform: 'rotate(360deg)'
    }
})

const bubbleIn = keyframes({
    '0%': {
        opacity: 0,
        transform: 'translate3d(0, 34px, 0) scale(0.72)'
    },
    '68%': {
        opacity: 1,
        transform: 'translate3d(0, -6px, 0) scale(1.03)'
    },
    '100%': {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)'
    }
})

export const ProjectPageContainer = styled('div')(() => ({
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    color: '#111111',
    overflowX: 'hidden'
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
    fontFamily: 'Futura, sans-serif',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.10)',
        transform: 'translateX(-4px)'
    },
}))

export const HeroSection = styled('section')(({theme}) => ({
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Futura, sans-serif',
    paddingTop: 0
}))

export const HeroTop = styled('div')(({theme}) => ({
    width: '100%',
    minHeight: 'calc(78vh + 500px)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% calc(100% + 300px)',
    backgroundPosition: 'top center',
    padding: '72px 24px 96px 24px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        minHeight: 'calc(70vh + 320px)',
        backgroundSize: '100% calc(100% + 220px)',
        backgroundPosition: 'top center',
        padding: '52px 16px 80px 16px'
    }
}))

export const MountainWrap = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: 980,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 22,
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        marginBottom: 18
    }
}))

export const HeroTopFade = styled('div')(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 58%, #FFFFFF 100%)',
    pointerEvents: 'none'
}))

export const MountainScene = styled('div')(({theme}) => ({
    position: 'relative',
    width: 'min(280px, 35vw)',
    [theme.breakpoints.down('md')]: {
        width: 'min(220px, 48vw)'
    }
}))

export const MountainImage = styled('img')(({theme}) => ({
    width: '100%',
    height: 'auto',
    display: 'block'
}))

export const MountainSun = styled('img')(() => ({
    position: 'absolute',
    top: '-0.8547%',
    right: '8.9110%',
    width: '29.9010%',
    height: 'auto',
    pointerEvents: 'none',
    transformOrigin: 'center center',
    animation: `${spinClockwise} 12s linear infinite`
}))

export const LogoImage = styled('img')(({theme}) => ({
    width: 'min(700px, 82vw)',
    height: 'auto',
    marginBottom: 86,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 62
    }
}))

export const InfoWrap = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: 980,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        maxWidth: 560
    }
}))

export const FacesLeft = styled('div')(({theme}) => ({
    position: 'absolute',
    left: 54,
    top: -42,
    width: 56,
    aspectRatio: '149 / 154',
    [theme.breakpoints.down('sm')]: {
        left: 40,
        top: -24,
        width: 46
    }
}))

export const FacesRight = styled('div')(({theme}) => ({
    position: 'absolute',
    right: 54,
    top: -42,
    width: 56,
    aspectRatio: '149 / 154',
    [theme.breakpoints.down('sm')]: {
        right: 34,
        top: -24,
        width: 46
    }
}))

export const FaceImage = styled('img')(() => ({
    position: 'absolute',
    height: 'auto',
    transformOrigin: 'center center'
}))

export const PurpleFace = styled(FaceImage)(() => ({
    top: '-35.0649%',
    left: '17.7852%',
    width: '73.4899%',
    animation: `${rotateClockwise} 1s ease-in-out infinite alternate`
}))

export const PinkFace = styled(FaceImage)(() => ({
    top: '33.1169%',
    left: '69.9664%',
    width: '43.6242%',
    animation: `${rotateCounterClockwise} 1s ease-in-out infinite alternate`
}))

export const LeftPinkFace = styled(FaceImage)(() => ({
    top: '20.1299%',
    left: '84.5638%',
    width: '43.6242%',
    animation: `${rotateCounterClockwise} 1s ease-in-out infinite alternate`
}))

export const LeftGreenFace = styled(FaceImage)(() => ({
    top: '31.8182%',
    left: '-12.6846%',
    width: '56.5369%',
    animation: `${rotateCounterClockwise} 1s ease-in-out infinite alternate`
}))

export const YellowFace = styled(FaceImage)(() => ({
    top: '31.8182%',
    left: '-12.6846%',
    width: '56.5369%',
    animation: `${rotateClockwise} 1s ease-in-out infinite alternate`
}))

export const RightYellowFace = styled(FaceImage)(() => ({
    top: '2.5974%',
    left: '-34.4306%',
    width: '52.1879%',
    animation: `${rotateClockwise} 1s ease-in-out infinite alternate`
}))

export const GreenFace = styled(FaceImage)(() => ({
    top: '68.8312%',
    left: '14.5973%',
    width: '69.4631%',
    animation: `${rotateCounterClockwise} 1s ease-in-out infinite alternate`
}))

export const InfoCard = styled('div')(({theme}) => ({
    width: 'min(760px, 92vw)',
    backgroundColor: '#F5D65A',
    borderRadius: 14,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    columnGap: 24,
    rowGap: 14,
    padding: '22px 26px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        padding: '20px 18px'
    },
    [theme.breakpoints.down('sm')]: {
        rowGap: 12
    }
}))

export const InfoCol = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 4
}))

export const InfoLabel = styled('div')(() => ({
    fontFamily: 'Futura, sans-serif',
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.1,
    color: '#232323'
}))

export const InfoValue = styled('div')(() => ({
    fontFamily: 'Futura, sans-serif',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1.2,
    color: '#232323',
    whiteSpace: 'pre-line'
}))

export const HeroBottom = styled('div')(({theme}) => ({
    width: '100%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 360,
    padding: '0 20px 0 20px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        minHeight: 280,
        padding: '0 16px 0 16px'
    }
}))

export const CtaWrap = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    marginTop: 52,
    marginBottom: 64,
    [theme.breakpoints.down('sm')]: {
        marginTop: 40,
        marginBottom: 48
    }
}))

export const CtaLabel = styled('div')(() => ({
    fontFamily: 'Futura, sans-serif',
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 1.2,
    color: '#2E2E2E',
    textAlign: 'center'
}))

export const CtaButton = styled('a')(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 224,
    padding: '14px 32px',
    borderRadius: 100,
    backgroundColor: '#5849F6',
    color: '#FFFFFF',
    textDecoration: 'none',
    fontFamily: 'Futura, sans-serif',
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 1,
    transition: 'opacity 0.2s ease',
    '&:hover': {
        opacity: 0.92
    }
}))

export const BrainstormSection = styled('section')(({theme}) => ({
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: '76px 24px 180px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        padding: '56px 16px 120px'
    }
}))

export const BrainstormInner = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: 1284,
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
        maxWidth: '100%'
    }
}))

export const BrainstormTitle = styled('h2')(({theme}) => ({
    margin: 0,
    fontFamily: 'Futura, sans-serif',
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 1,
    color: '#111111',
    [theme.breakpoints.down('sm')]: {
        fontSize: 34
    }
}))

export const BrainstormGrid = styled('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1.3fr)',
    columnGap: 22,
    alignItems: 'start',
    marginTop: 102,
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'minmax(0, 1fr)',
        rowGap: 28,
        marginTop: 72
    }
}))

export const BrainstormColumn = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column'
}))

export const BrainstormLabel = styled('div')(({theme}) => ({
    fontFamily: 'Futura, sans-serif',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.35,
    color: '#2F2F2F',
    marginBottom: 16,
    [theme.breakpoints.down('sm')]: {
        fontSize: 16
    }
}))

export const BrainstormLargeCard = styled('div')(({theme}) => ({
    width: '100%',
    minHeight: 923,
    borderRadius: 6,
    border: '1px solid #B6AEFF',
    backgroundColor: '#E9E7F8',
    position: 'relative',
    overflow: 'visible',
    [theme.breakpoints.down('sm')]: {
        minHeight: 484
    }
}))

export const BrainstormSmallCard = styled('div')(({theme}) => ({
    width: '100%',
    minHeight: 923,
    borderRadius: 6,
    border: '1px solid #B6AEFF',
    backgroundColor: '#E9E7F8',
    position: 'relative',
    overflow: 'visible',
    [theme.breakpoints.down('sm')]: {
        minHeight: 484
    }
}))

export const UnderConstructionSection = styled('section')(({theme}) => ({
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: '0 24px 180px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        padding: '0 16px 120px'
    }
}))

export const UnderConstructionInner = styled('div')(() => ({
    width: '100%',
    maxWidth: 1284,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
}))

export const UnderConstructionVisual = styled('div')(({theme}) => ({
    position: 'relative',
    width: 760,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 108,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: 560,
        paddingTop: 72
    }
}))

export const UnderConstructionArc = styled('svg')(({theme}) => ({
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 760,
    height: 210,
    overflow: 'visible',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 150
    }
}))

export const UnderConstructionText = styled('text')(({theme}) => ({
    fontFamily: 'Futura, sans-serif',
    fontSize: 40,
    fontWeight: 700,
    fill: '#111111',
    [theme.breakpoints.down('sm')]: {
        fontSize: 28
    }
}))

export const UnderConstructionEmoji = styled('img')(({theme}) => ({
    width: 433,
    height: 'auto',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
        width: 317
    }
}))

export const StickyBoard = styled('div')(() => ({
    position: 'absolute',
    inset: 0
}))

export const StickyNoteWrap = styled('div', {
    shouldForwardProp: (prop) => !['top', 'left', 'widthValue', 'zIndexValue'].includes(String(prop))
})<{ top: string, left: string, widthValue: string, zIndexValue: number }>(({top, left, widthValue, zIndexValue}) => ({
    position: 'absolute',
    top,
    left,
    width: widthValue,
    zIndex: zIndexValue,
    transformOrigin: 'center center',
    transition: 'transform 180ms ease-out',
    marginLeft: -30,
    '&:hover': {
        transform: 'scale(1.35)',
        zIndex: 30
    }
}))

export const StickyNoteImage = styled('img', {
    shouldForwardProp: (prop) => !['revealed', 'delayMs', 'rotation'].includes(String(prop))
})<{ revealed: boolean, delayMs: number, rotation: number }>(({revealed, delayMs, rotation}) => ({
    width: '100%',
    display: 'block',
    opacity: revealed ? 1 : 0,
    transform: revealed ? `rotate(${rotation}deg)` : `translate3d(0, 34px, 0) scale(0.72) rotate(${rotation}deg)`,
    transformOrigin: 'center center',
    filter: 'drop-shadow(0 10px 12px rgba(70, 58, 135, 0.2))',
    willChange: 'transform, opacity',
    animation: revealed ? `${bubbleIn} 520ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms both` : 'none'
}))
