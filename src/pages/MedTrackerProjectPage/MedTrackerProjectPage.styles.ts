import { styled } from '@mui/material/styles'

export const ProjectPageContainer = styled('div')(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    backgroundImage:
        theme.palette.mode === 'light'
            ? `url(${process.env.PUBLIC_URL}/images/dots-light.svg)`
            : `url(${process.env.PUBLIC_URL}/images/dots-dark.svg)`,
    backgroundRepeat: 'repeat',
    backgroundSize: '20px 20px',
    backgroundAttachment: 'fixed',
    zIndex: 0,
}))

export const ContentWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    zIndex: 10,
    pointerEvents: 'auto',
    width: '100%',
    maxWidth: 1000,
    margin: '0 auto',
    padding: '40px 32px 120px 32px',
    boxSizing: 'border-box',

    [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
        padding: '32px 24px 120px 24px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '24px 16px 120px 16px',
    },
}))

export const BackButton = styled('button')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    borderRadius: 8,
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.08)',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)'}`,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.3s ease',
    marginBottom: 32,

    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.08)'
                : 'rgba(255, 255, 255, 0.12)',
        transform: 'translateX(-4px)',
    },
}))

export const HeroSection = styled('div')(({ theme }) => ({
    marginBottom: 60,
}))

export const HeroTitle = styled('h1')(({ theme }) => ({
    margin: '0 0 24px 0',
    fontFamily: "'Futura LT', 'Futura', sans-serif",
    fontSize: 'clamp(48px, 8vw, 80px)',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6675FF 0%, #8B9EFF 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1.1,
}))

export const HeroMeta = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 48,
    marginBottom: 32,
    flexWrap: 'wrap',

    [theme.breakpoints.down('sm')]: {
        gap: 32,
    },
}))

export const HeroMetaItem = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
}))

export const HeroMetaLabel = styled('span')(({ theme }) => ({
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: theme.palette.text.secondary,
}))

export const HeroMetaValue = styled('span')(({ theme }) => ({
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.text.primary,
}))

export const HeroDescription = styled('p')(({ theme }) => ({
    margin: '32px 0 0 0',
    fontSize: 18,
    lineHeight: 1.8,
    color: theme.palette.text.secondary,
    maxWidth: 700,
}))

export const SectionDivider = styled('div')(({ theme }) => ({
    height: 1,
    background:
        theme.palette.mode === 'light'
            ? 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    margin: '60px 0',
}))

export const Section = styled('div')(() => ({
    marginBottom: 60,
}))

export const SectionTitle = styled('h2')(({ theme }) => ({
    margin: '0 0 28px 0',
    fontFamily: "'Futura LT', 'Futura', sans-serif",
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    color: theme.palette.text.primary,
    lineHeight: 1.2,
}))

export const SectionContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
}))

export const TwoColumn = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'start',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: 32,
    },

    '& h4': {
        margin: '0 0 16px 0',
        fontSize: 18,
        fontWeight: 600,
        color: theme.palette.text.primary,
    },

    '& p': {
        margin: '12px 0',
        fontSize: 16,
        lineHeight: 1.7,
        color: theme.palette.text.secondary,
    },
}))

export const ThreeColumn = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 32,
    alignItems: 'start',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: 24,
    },

    '& h4': {
        margin: '0 0 12px 0',
        fontSize: 17,
        fontWeight: 600,
        color: theme.palette.text.primary,
    },

    '& p': {
        margin: '0',
        fontSize: 15,
        lineHeight: 1.6,
        color: theme.palette.text.secondary,
    },
}))

export const TextBlock = styled('p')(({ theme }) => ({
    margin: '0 0 16px 0',
    fontSize: 16,
    lineHeight: 1.8,
    color: theme.palette.text.secondary,
}))

export const BoldText = styled('span')(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.text.primary,
}))

export const ListItem = styled('div')(({ theme }) => ({
    margin: '8px 0',
    fontSize: 15,
    lineHeight: 1.6,
    color: theme.palette.text.secondary,
}))

export const StatCard = styled('div')(({ theme }) => ({
    padding: 28,
    borderRadius: 12,
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(102, 117, 255, 0.06)'
            : 'rgba(102, 117, 255, 0.12)',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(102, 117, 255, 0.15)' : 'rgba(102, 117, 255, 0.25)'}`,
    textAlign: 'center',
    transition: 'all 0.3s ease',

    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'light'
                ? 'rgba(102, 117, 255, 0.1)'
                : 'rgba(102, 117, 255, 0.18)',
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(102, 117, 255, 0.2)',
    },
}))

export const StatNumber = styled('div')(({ theme }) => ({
    fontSize: 'clamp(36px, 6vw, 52px)',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6675FF 0%, #8B9EFF 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1,
    marginBottom: 8,
}))

export const StatLabel = styled('div')(({ theme }) => ({
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: theme.palette.text.secondary,
    marginBottom: 8,
}))

export const StatDescription = styled('p')(({ theme }) => ({
    fontSize: 14,
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
    margin: 0,
}))