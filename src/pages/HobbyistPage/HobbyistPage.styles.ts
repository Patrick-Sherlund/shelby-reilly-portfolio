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

export const SubLogoImage = styled('img')<{ $activeTool?: string }>(({$activeTool}) => {
    const isKonvaToolActive = $activeTool === 'emoji' || $activeTool === 'commenting-cursor'

    return {
        height: 'clamp(60px, 8vw, 100px)',
        width: 'auto',
        pointerEvents: isKonvaToolActive ? 'none' : 'auto',
        alignSelf: 'flex-start',
        margin: '100px 32px 0px 40px',
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

export const DescriptionWrapper = styled('div')(({theme}) => ({
    width: '40%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    fontFamily: 'Futura, sans-serif',
    fontSize: 'clamp(16px, 2vw, 22px)',
    lineHeight: 1.5,
    color: theme.palette.text.primary,
    textAlign: 'left',
    pointerEvents: 'auto',
}))

export const HobbyistLogoImage = styled('img')(({theme}) => ({
    height: '80px',
    width: 'auto',
    userSelect: 'none',
    margin: '-70px 0 48px 0',
    [theme.breakpoints.up('md')]: {
        height: '88px',
    },
}))

export const LineText = styled('div')(({theme}) => ({
    fontFamily: 'Prompt, sans-serif',
    fontWeight: 700,
    fontSize: '28px',
    color: theme.palette.text.primary,
}))

export const SubLineText = styled('div')(({theme}) => ({
    fontFamily: 'Prompt, sans-serif',
    fontWeight: 400,
    fontSize: '28px',
    color: theme.palette.text.primary,
}))

export const DemoWrapper = styled('div')(({theme}) => ({
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-end',
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
    zIndex: 1,
}))

export const DemoVideo = styled('video')(() => ({
    position: 'absolute',
    top: '16%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '78%',
    height: 'auto',
    borderRadius: '4px',
    objectFit: 'cover',
    userSelect: 'none',
    pointerEvents: 'none',
    display: 'block',
    zIndex: 2,
}))

export const ViewMoreButton = styled('button')(() => ({
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: '#6C5CE7',
    color: '#FFFFFF',
    fontFamily: 'Futura, sans-serif',
    fontWeight: 700,
    fontSize: '28px',
    padding: '14px 48px',
    border: 'none',
    borderRadius: '50px',
    boxSizing: 'border-box',
    outline: 'none',
    pointerEvents: 'auto',
    marginTop: '124px',
    transition: 'opacity 0.2s ease',
    '&:hover': {
        opacity: 0.9,
    },
}))
