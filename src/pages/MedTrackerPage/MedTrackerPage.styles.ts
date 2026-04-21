import {styled} from '@mui/material/styles'

export const MainWrapper = styled('div')(() => ({
    width: '100%',
    minHeight: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '75px',
    pointerEvents: 'auto',
}))


export const MedTrackerLogo = styled('img')(({theme}) => ({
    height: '80px',
    width: 'auto',
    userSelect: 'none',
    margin: 0,
    marginBottom: '24px',
    [theme.breakpoints.up('md')]: {
        height: '88px',
    },
}))


export const LogoImage = styled('img')<{ $activeTool?: string }>(({theme, $activeTool}) => {

    const isKonvaToolActive = $activeTool === 'emoji' || $activeTool === 'commenting-cursor';

    return {
        height: 'clamp(30px, 5vw, 60px)',
        width: 'auto',
        pointerEvents: isKonvaToolActive ? 'none' : 'auto',
        alignSelf: 'flex-start',
        margin: '68px 32px 32px 60px',
        [theme.breakpoints.down('md')]: {
            margin: '24px 16px 8px 16px',
            height: '40px',
        },
    }
})

export const MidSection = styled('div')(() => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px',
    boxSizing: 'border-box',
    gap: '4vw',
    pointerEvents: 'none',
}))

export const ImagesWrapper = styled('div')(() => ({
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '24px',
    padding: '32px',
    pointerEvents: 'auto',
    boxSizing: 'border-box',
    position: 'relative',
}))

export const IphoneImg = styled('img')(() => ({
    height: 'clamp(240px, 32vw, 360px)',
    width: 'auto',
    transition: 'transform 0.3s ease-out',
    WebkitUserDrag: 'none',
    userDrag: 'none',
    userSelect: 'none',
}))

export const DescriptionWrapper = styled('div')(({theme}) => ({
    width: '40%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '16px',
    fontFamily: 'Futura, sans-serif',
    fontSize: 'clamp(16px, 2vw, 22px)',
    lineHeight: 1.5,
    color: theme.palette.text.primary,
    textAlign: 'right',
    pointerEvents: 'auto',
}))

export const Title = styled('h2')(() => ({
    margin: 0,
    fontFamily: 'Futura, sans-serif',
    fontWeight: 500,
    fontSize: '64px',
    color: '#5263FF',
}))

export const LineText = styled('div')(({theme}) => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '28px',
    color: theme.palette.text.primary,
}))


export const SubLineText = styled('div')(({theme}) => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '28px',
    color: theme.palette.text.secondary,
}))

export const CaseStudyButton = styled('button')(() => ({
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: '#292929',
    color: '#FFFFFF',
    fontFamily: 'Futura, sans-serif',
    fontWeight: 700,
    fontSize: '28px',
    padding: '14px 60px',
    border: 'none',
    borderRadius: '50px',
    boxSizing: 'border-box',
    outline: 'none',
    pointerEvents: 'auto',
    marginTop: '8px',
    transition: 'opacity 0.2s ease',
    '&:hover': {
        opacity: 0.9,
    },
}))

export const CornerSketch = styled('div')(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '0',
    height: '0',
    pointerEvents: 'none',
    '& span': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '44px',
        height: '4px',
        background: '#FFFFFF',
        borderRadius: '2px',
    },
    '& span:nth-of-type(1)': {transform: 'rotate(20deg) translate(0, 0)'},
    '& span:nth-of-type(2)': {transform: 'rotate(30deg) translate(4px, 10px)'},
    '& span:nth-of-type(3)': {transform: 'rotate(40deg) translate(8px, 22px)'},
}))

export const MobileSection = styled('section')(({theme}) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '8px 0 72px',
    [theme.breakpoints.up('md')]: {display: 'none'},
}))

export const MobileHeader = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '8px',
    padding: '8px 16px 0',
}))

export const MobileTitle = styled('h2')(() => ({
    margin: 0,
    fontFamily: 'Futura, sans-serif',
    fontWeight: 600,
    fontSize: 'clamp(28px, 6vw, 36px)',
    color: '#5263FF',
}))

export const MobileMeta = styled('div')(({theme}) => ({
    fontFamily: 'Futura, sans-serif',
    fontSize: '14px',
    color: theme.palette.text.primary,
    opacity: 0.9,
}))

export const CarouselShell = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    padding: '8px 0 0',
}))

export const CarouselTrack = styled('div')(() => ({
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '70%',
    gap: '12px',
    overflowX: 'auto',
    padding: '0 48px',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {display: 'none'},

    touchAction: 'pan-x pinch-zoom',
    overscrollBehaviorX: 'contain',
}))

export const Slide = styled('div')(() => ({
    scrollSnapAlign: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'clamp(180px, 52vw, 240px)',
    pointerEvents: 'auto',
}))

export const PhoneImg = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '28px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)',
    background: '#000',
    userSelect: 'none',
    WebkitUserDrag: 'none',
}))

export const Dots = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 0 0',
}))

export const Dot = styled('button')(() => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    border: 0,
    background: 'rgba(255,255,255,0.35)',
    cursor: 'pointer',
    padding: 0,
    transition: 'transform 160ms ease, background 160ms ease',
    '&[data-active="true"]': {
        background: '#5263FF',
        transform: 'scale(1.4)',
    },
}))

export const StickyCTA = styled('div')(() => ({
    position: 'static',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '24px 16px 12px',
    marginTop: '48px',
}))

export const MobileCaseStudyButton = styled(CaseStudyButton)(() => ({}))
