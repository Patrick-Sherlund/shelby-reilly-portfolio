import {styled} from '@mui/material/styles'

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

export const MountainImage = styled('img')(({theme}) => ({
    width: 'min(280px, 35vw)',
    height: 'auto',
    [theme.breakpoints.down('md')]: {
        width: 'min(220px, 48vw)'
    }
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

export const FacesLeft = styled('img')(({theme}) => ({
    position: 'absolute',
    left: -18,
    top: -10,
    transform: 'none',
    width: 56,
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
        left: 8,
        top: -8,
        width: 46
    }
}))

export const FacesRight = styled('img')(({theme}) => ({
    position: 'absolute',
    right: -18,
    top: -10,
    transform: 'none',
    width: 56,
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
        right: 8,
        top: -8,
        width: 46
    }
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
    minHeight: 720,
    padding: '0 20px 0 20px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        minHeight: 620,
        padding: '0 16px 0 16px'
    }
}))

export const CtaWrap = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    marginTop: 120,
    marginBottom: 320,
    [theme.breakpoints.down('sm')]: {
        marginTop: 96,
        marginBottom: 280
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
