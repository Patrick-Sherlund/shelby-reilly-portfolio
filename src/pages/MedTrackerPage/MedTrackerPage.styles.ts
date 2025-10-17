import { styled } from '@mui/material/styles'

// Full-page wrapper similar to IntroductionPage
export const MainWrapper = styled('div')(() => ({
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '24px',
}))

// Top-left logo
export const LogoImage = styled('img')(() => ({
    height: 'clamp(30px, 5vw, 60px)',
    width: 'auto',
    pointerEvents: 'auto',
    alignSelf: 'flex-start',
    margin: '68px 32px 32px 60px'
}))

// Container for the two middle sections (left images, right text)
export const MidSection = styled('div')(() => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // vertical centering of both sides
    justifyContent: 'space-between',
    padding: '48px', // 48px padding around entire section
    boxSizing: 'border-box',
    gap: '4vw', // smaller gap – space-between already sets edges
    pointerEvents: 'none', // disable by default; enable on sub-wrappers
}))

// iPhone image group wrapper
export const ImagesWrapper = styled('div')(() => ({
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-start', // left align within section
    alignItems: 'center', // vertical centering within wrapper
    gap: '24px',
    padding: '32px', // internal padding around image group
    pointerEvents: 'auto',
    boxSizing: 'border-box',
}))

export const IphoneImg = styled('img')(() => ({
    height: 'clamp(240px, 32vw, 360px)',
    width: 'auto',
    transition: 'transform 0.3s ease-out',
    WebkitUserDrag: 'none',
    userDrag: 'none',
    userSelect: 'none',
}))

// Description column
export const DescriptionWrapper = styled('div')(({ theme }) => ({
    width: '40%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // right align content in flex layout
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
    color: '#6675FF',
}))

// Individual line under the title
export const LineText = styled('div')(() => ({
    fontFamily: 'Futura, sans-serif',
    fontWeight: 400,
    fontSize: '32px',
    color: '#FFFFFF',
}))

// Button with drop shadow effect
export const CaseStudyButton = styled('button')(() => ({
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: '#6675FF',
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
        backgroundColor: '#6675FF',
        border: '8px solid #A9A9A9',
        zIndex: -1,
    },
}))

// Decorative sketch lines from top-left corner of image group
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
    '& span:nth-of-type(1)': { transform: 'rotate(20deg) translate(0, 0)' },
    '& span:nth-of-type(2)': { transform: 'rotate(30deg) translate(4px, 10px)' },
    '& span:nth-of-type(3)': { transform: 'rotate(40deg) translate(8px, 22px)' },
})) 