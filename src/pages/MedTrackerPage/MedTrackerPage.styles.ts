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
}))

// Top-left logo
export const LogoImage = styled('img')(() => ({
    position: 'absolute',
    top: 60,
    left: 60,
    height: 'clamp(30px, 5vw, 60px)',
    width: 'auto',
    pointerEvents: 'auto',
}))

// Container for the two middle sections (left images, right text)
export const MidSection = styled('div')(() => ({
    marginTop: '160px', // leaves space below logo; adjust as needed
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8vw',
    pointerEvents: 'none', // disable by default; enable on sub-wrappers
}))

// iPhone image group wrapper
export const ImagesWrapper = styled('div')(() => ({
    width: '45%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: '24px',
    pointerEvents: 'auto',
}))

export const IphoneImg = styled('img')(() => ({
    height: 'clamp(240px, 32vw, 360px)',
    width: 'auto',
    transition: 'transform 0.3s ease-out',
}))

// Description column
export const DescriptionWrapper = styled('div')(({ theme }) => ({
    width: '35%',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontFamily: 'Futura, sans-serif',
    fontSize: 'clamp(16px, 2vw, 22px)',
    lineHeight: 1.5,
    color: theme.palette.text.primary,
    pointerEvents: 'auto',
})) 