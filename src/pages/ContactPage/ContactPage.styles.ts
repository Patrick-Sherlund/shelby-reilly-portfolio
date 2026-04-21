import {styled} from '@mui/material/styles'

export const MainWrapper = styled('section')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    pointerEvents: 'auto'
}))

export const TopDash = styled('div')(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    borderTop: '3px dashed rgba(255,255,255,0.9)'
}))

export const Content = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: '900px',
    padding: '48px 24px 72px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '36px',
    textAlign: 'center',
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
        gap: '28px',
        padding: '40px 20px 56px'
    }
}))

export const Headline = styled('h2')(({theme}) => ({
    margin: 0,
    fontFamily: '"Futura LT", Arial, sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(52px, 6vw, 82px)',
    lineHeight: 1,
    letterSpacing: '-0.04em',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('md')]: {
        fontSize: 'clamp(34px, 8.4vw, 64px)'
    }
}))

export const ContactStack = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '22px',
    [theme.breakpoints.down('md')]: {
        gap: '18px'
    }
}))

export const Subheading = styled('div')(({theme}) => ({
    fontFamily: '"Futura LT", Arial, sans-serif',
    fontWeight: 400,
    fontSize: 'clamp(34px, 4.5vw, 56px)',
    lineHeight: 1.05,
    [theme.breakpoints.down('md')]: {
        fontSize: 'clamp(30px, 8vw, 44px)'
    }
}))

export const SocialLink = styled('a')(() => ({
    width: '78px',
    height: '78px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        opacity: 0.88
    },
    '& svg': {
        width: '72%',
        height: '72%'
    }
}))
