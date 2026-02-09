import {styled} from '@mui/material/styles'


export const MainWrapper = styled('div')(() => ({
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    pointerEvents: 'auto',
}))


export const LogoImage = styled('img')<{ $activeTool?: string }>(({$activeTool}) => {

    const isKonvaToolActive = $activeTool === 'emoji' || $activeTool === 'commenting-cursor';

    return {
        height: 'clamp(48px, 8vw, 60px)',
        width: 'auto',
        pointerEvents: isKonvaToolActive ? 'none' : 'auto',
        alignSelf: 'flex-start',
        margin: '148px 32px 0px 140px',
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


export const DemoWrapper = styled('div')(({theme}) => ({
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-start', // left align within section
    alignItems: 'center',
    pointerEvents: 'auto',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        justifyContent: 'center',
    },
}))


export const DemoPlaceholder = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: '900px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    userSelect: 'none',
    [theme.breakpoints.down('md')]: {
        maxWidth: '1800px',
    },
}))

export const MacBookImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    userSelect: 'none',
    pointerEvents: 'none',
    position: 'relative',
    zIndex: 1
}))

export const DemoVideo = styled('video')(() => ({
    position: 'absolute',
    top: '12%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '75%',
    height: 'auto',
    borderRadius: '4px',
    objectFit: 'cover',
    userSelect: 'none',
    pointerEvents: 'none',
    display: 'block',
    zIndex: 2
}))


export const DescriptionWrapper = styled('div')(({theme}) => ({
    width: '50%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // right align content
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
    background: 'linear-gradient(90deg, #E54335 0%, #F6B704 28%, #34A353 64%, #4280EF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
}))

export const GoogleCodesignLogo = styled('img')(({theme}) => ({
    height: '80px',
    width: 'auto',
    userSelect: 'none',
    margin: 0,
    top: 0,
    [theme.breakpoints.up('md')]: {
        height: '88px',
    },
}))


export const LineText = styled('div')(({theme}) => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    color: theme.palette.text.primary,
}))

export const SubLineText = styled('div')(({theme}) => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    color: theme.palette.text.secondary,
}))


export const CaseStudyButton = styled('button')(({theme}) => ({
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: '#4285F4',
    color: '#FFFFFF',
    fontFamily: 'Futura, sans-serif',
    fontWeight: 700,
    fontSize: '32px',
    padding: '8px 16px',
    border: '8px solid #FFFFFF',
    boxSizing: 'border-box',
    outline: 'none',
    pointerEvents: 'auto',

    '&::after': {
        content: '"READ CASE STUDY"',
        position: 'absolute',
        top: '14px',
        left: '14px',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#4285F4',
        border: '8px solid #A9A9A9',
        zIndex: -1,
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '20px',
        padding: '10px 14px',
        border: '6px solid #FFFFFF',
        '&::after': {
            border: '6px solid #A9A9A9',
            top: '10px',
            left: '10px',
        },
    },
})) 