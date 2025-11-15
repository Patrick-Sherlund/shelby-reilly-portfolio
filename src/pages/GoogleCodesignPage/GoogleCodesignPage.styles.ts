import { styled } from '@mui/material/styles'

// Full-page wrapper similar to other pages
export const MainWrapper = styled('div')(() => ({
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
}))

// Top-left logo
export const LogoImage = styled('img')(() => ({
    height: 'clamp(30px, 5vw, 60px)',
    width: 'auto',
    pointerEvents: 'auto',
    alignSelf: 'flex-start',
    margin: '68px 32px 0px 60px',
}))

// Container for the two middle sections (left demo, right text)
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

// Demo (placeholder) wrapper on the left
export const DemoWrapper = styled('div')(() => ({
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-start', // left align within section
    alignItems: 'center',
    pointerEvents: 'auto',
}))

// Placeholder / embed container for the web-app UI
export const DemoPlaceholder = styled('div')(() => ({
    width: '100%',
    maxWidth: '900px',
    aspectRatio: '16/9',
    backgroundColor: '#1E1E1E',
    border: '4px solid #FFFFFF',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontFamily: 'Futura, sans-serif',
    fontSize: '24px',
    userSelect: 'none',
}))

// Description column on the right
export const DescriptionWrapper = styled('div')(({ theme }) => ({
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

// Title style
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

// Individual line under the title
export const LineText = styled('div')(() => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    color: '#FFFFFF',
}))

export const SubLineText = styled('div')(() => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    color: '#A4A4A4',
}))

// Button with drop shadow effect
export const CaseStudyButton = styled('button')(() => ({
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
    // Drop shadow rectangle via ::after
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
})) 