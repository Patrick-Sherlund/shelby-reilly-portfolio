import { styled } from '@mui/material/styles'

export const CaseStudyWrapper = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#fafafa',
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
    pointerEvents: 'auto',
    zIndex: 9999,

    // Custom scrollbar styling
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'dark' ? '#1a1a1a' : '#e0e0e0',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'dark' ? '#444' : '#999',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.mode === 'dark' ? '#555' : '#666',
    },
}))

export const BackButton = styled('button')(({ theme }) => ({
    position: 'fixed',
    top: '32px',
    left: '32px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: 500,
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#ddd'}`,
    borderRadius: '24px',
    cursor: 'pointer',
    zIndex: 10000,
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)',

    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        borderColor: theme.palette.mode === 'dark' ? '#555' : '#bbb',
        transform: 'translateX(-2px)',
    },
}))

// Hero Section
export const HeroSection = styled('section')(({ theme }) => ({
    width: '100%',
    padding: '120px 48px 80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',

    '@media (max-width: 768px)': {
        padding: '100px 24px 60px',
    },
}))

export const HeroTitle = styled('h1')(({ theme }) => ({
    fontSize: '56px',
    fontWeight: 700,
    margin: 0,
    textAlign: 'center',
    letterSpacing: '-0.02em',

    '@media (max-width: 768px)': {
        fontSize: '36px',
    },
}))

export const HeroSubtitle = styled('p')(({ theme }) => ({
    fontSize: '20px',
    color: theme.palette.mode === 'dark' ? '#aaa' : '#666',
    margin: 0,
    textAlign: 'center',
    maxWidth: '600px',
    lineHeight: 1.6,

    '@media (max-width: 768px)': {
        fontSize: '16px',
    },
}))

export const MetaInfo = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: '32px',
    marginTop: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',

    '@media (max-width: 768px)': {
        gap: '16px',
    },
}))

export const MetaItem = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'center',
}))

export const MetaLabel = styled('span')(({ theme }) => ({
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: theme.palette.mode === 'dark' ? '#777' : '#999',
    fontWeight: 600,
}))

export const MetaValue = styled('span')(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'dark' ? '#ccc' : '#444',
}))

// Content Container
export const ContentContainer = styled('div')({
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 48px',
    width: '100%',

    '@media (max-width: 768px)': {
        padding: '0 24px',
    },
})

// Section Styles
export const Section = styled('section')(({ theme }) => ({
    padding: '80px 0',

    '@media (max-width: 768px)': {
        padding: '60px 0',
    },
}))

export const SectionHeader = styled('div')({
    marginBottom: '48px',

    '@media (max-width: 768px)': {
        marginBottom: '32px',
    },
})

export const SectionLabel = styled('span')(({ theme }) => ({
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: theme.palette.mode === 'dark' ? '#777' : '#999',
    fontWeight: 600,
    display: 'block',
    marginBottom: '12px',
}))

export const SectionTitle = styled('h2')(({ theme }) => ({
    fontSize: '40px',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-0.02em',

    '@media (max-width: 768px)': {
        fontSize: '28px',
    },
}))

export const SectionText = styled('p')(({ theme }) => ({
    fontSize: '18px',
    lineHeight: 1.8,
    color: theme.palette.mode === 'dark' ? '#ccc' : '#444',
    margin: '24px 0 0',
    maxWidth: '800px',

    '@media (max-width: 768px)': {
        fontSize: '16px',
    },
}))

// Image Containers
export const ImageContainer = styled('div')({
    width: '100%',
    marginTop: '48px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',

    '& img': {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
})

// Image Container with cropped top (removes slide headers)
export const ImageContainerCropped = styled('div')({
    width: '100%',
    marginTop: '48px',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',

    '& img': {
        width: '100%',
        height: 'auto',
        display: 'block',
        marginTop: '-8%', // Crop out the top ~8% where slide titles typically are
    },
})

export const FullBleedImage = styled('div')(({ theme }) => ({
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    marginTop: '64px',
    marginBottom: '64px',

    '& img': {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
}))

// Grid Layouts
export const TwoColumnGrid = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    marginTop: '48px',

    '@media (max-width: 968px)': {
        gridTemplateColumns: '1fr',
        gap: '32px',
    },
})

export const ThreeColumnGrid = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
    marginTop: '48px',

    '@media (max-width: 1200px)': {
        gridTemplateColumns: '1fr 1fr',
    },

    '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
    },
})

// Impact Cards
export const ImpactGrid = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px',
    marginTop: '48px',

    '@media (max-width: 968px)': {
        gridTemplateColumns: '1fr',
    },
})

export const ImpactCard = styled('div')(({ theme }) => ({
    padding: '40px',
    backgroundColor: theme.palette.mode === 'dark' ? '#111' : '#fff',
    border: `1px solid ${theme.palette.mode === 'dark' ? '#222' : '#e0e0e0'}`,
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',

    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(0,0,0,0.08)',
    },

    '@media (max-width: 768px)': {
        padding: '32px 24px',
    },
}))

export const ImpactTitle = styled('h3')(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
    color: theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a',
}))

export const ImpactStat = styled('div')(({ theme }) => ({
    fontSize: '28px',
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#4a9eff' : '#0066cc',
    letterSpacing: '-0.01em',

    '@media (max-width: 768px)': {
        fontSize: '24px',
    },
}))

export const ImpactDescription = styled('p')(({ theme }) => ({
    fontSize: '15px',
    lineHeight: 1.6,
    color: theme.palette.mode === 'dark' ? '#aaa' : '#666',
    margin: 0,
}))

// Insight/Callout Box
export const InsightBox = styled('div')(({ theme }) => ({
    padding: '40px',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(74, 158, 255, 0.1)' : 'rgba(0, 102, 204, 0.05)',
    border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(74, 158, 255, 0.3)' : 'rgba(0, 102, 204, 0.2)'}`,
    borderRadius: '16px',
    marginTop: '48px',

    '@media (max-width: 768px)': {
        padding: '32px 24px',
    },
}))

export const InsightTitle = styled('h4')(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 16px',
    color: theme.palette.mode === 'dark' ? '#4a9eff' : '#0066cc',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
}))

export const InsightText = styled('p')(({ theme }) => ({
    fontSize: '18px',
    lineHeight: 1.7,
    color: theme.palette.mode === 'dark' ? '#ccc' : '#333',
    margin: 0,

    '@media (max-width: 768px)': {
        fontSize: '16px',
    },
}))

// Lists
export const KeyPointsList = styled('ul')(({ theme }) => ({
    listStyle: 'none',
    padding: 0,
    margin: '32px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
}))

export const KeyPoint = styled('li')(({ theme }) => ({
    fontSize: '16px',
    lineHeight: 1.7,
    color: theme.palette.mode === 'dark' ? '#ccc' : '#444',
    paddingLeft: '32px',
    position: 'relative',

    '&::before': {
        content: '"→"',
        position: 'absolute',
        left: 0,
        color: theme.palette.mode === 'dark' ? '#4a9eff' : '#0066cc',
        fontWeight: 700,
        fontSize: '18px',
    },
}))

// Process Timeline
export const ProcessTimeline = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '48px',
    gap: '16px',

    '@media (max-width: 968px)': {
        flexDirection: 'column',
    },
})

export const ProcessStep = styled('div')(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '16px',
    position: 'relative',

    '&::after': {
        content: '"→"',
        position: 'absolute',
        right: '-24px',
        top: '20px',
        color: theme.palette.mode === 'dark' ? '#333' : '#ccc',
        fontSize: '24px',

        '@media (max-width: 968px)': {
            content: '"↓"',
            bottom: '-32px',
            top: 'auto',
            right: 'auto',
        },
    },

    '&:last-child::after': {
        content: 'none',
    },
}))

export const ProcessNumber = styled('div')(({ theme }) => ({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#fff',
    border: `2px solid ${theme.palette.mode === 'dark' ? '#4a9eff' : '#0066cc'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#4a9eff' : '#0066cc',
}))

export const ProcessLabel = styled('span')(({ theme }) => ({
    fontSize: '15px',
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a',
}))

export const ProcessDescription = styled('span')(({ theme }) => ({
    fontSize: '13px',
    color: theme.palette.mode === 'dark' ? '#888' : '#666',
    lineHeight: 1.5,
}))

// Divider
export const Divider = styled('div')(({ theme }) => ({
    width: '100%',
    height: '1px',
    backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#e0e0e0',
    margin: '80px 0',

    '@media (max-width: 768px)': {
        margin: '60px 0',
    },
}))

// Quick Summary / TL;DR
export const QuickSummary = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#111' : '#f5f5f5',
    padding: '48px',
    borderRadius: '16px',
    marginTop: '48px',
    border: `1px solid ${theme.palette.mode === 'dark' ? '#222' : '#e0e0e0'}`,

    '@media (max-width: 768px)': {
        padding: '32px 24px',
    },
}))

export const SummaryTitle = styled('h3')(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: theme.palette.mode === 'dark' ? '#888' : '#666',
    margin: '0 0 24px',
}))

export const SummaryGrid = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px',

    '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '24px',
    },
})

export const SummaryItem = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
})

export const SummaryItemLabel = styled('span')(({ theme }) => ({
    fontSize: '13px',
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? '#888' : '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
}))

export const SummaryItemValue = styled('span')(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a',
    lineHeight: 1.4,
}))

// Stat Highlight
export const StatHighlight = styled('div')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(74, 158, 255, 0.15)' : 'rgba(0, 102, 204, 0.08)',
    borderRadius: '12px',
    marginTop: '24px',
}))

export const StatNumber = styled('span')(({ theme }) => ({
    fontSize: '32px',
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? '#4a9eff' : '#0066cc',
    lineHeight: 1,

    '@media (max-width: 768px)': {
        fontSize: '28px',
    },
}))

export const StatLabel = styled('span')(({ theme }) => ({
    fontSize: '15px',
    color: theme.palette.mode === 'dark' ? '#ccc' : '#444',
    lineHeight: 1.4,
}))

// Image Caption
export const ImageCaption = styled('p')(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'dark' ? '#888' : '#666',
    marginTop: '16px',
    textAlign: 'center',
    fontStyle: 'italic',
}))
