// BishopProjectPage.styles.ts
import { styled } from '@mui/material/styles'

const BISHOP_BLUE = '#4A90E2'

const PROCESS_BAR_GRADIENT_V =
  'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #4A90E2 31%, #4A90E2 68%, rgba(0,0,0,.5) 100%)'
const PROCESS_BAR_GRADIENT_H =
  'linear-gradient(90deg, rgba(0,0,0,.5) 0%, #4A90E2 31%, #4A90E2 68%, rgba(0,0,0,.5) 100%)'

export const ProjectPageContainer = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  backgroundColor: "#010413",
  backgroundImage: 'none',
  color: theme.palette.text.primary,
  transition: 'background-color 0.3s ease, color 0.3s ease'
}))

export const BoardContent = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 240,
  boxSizing: 'border-box'
}))

export const ContentWrapper = styled('div')(({ theme }) => ({
  zIndex: 10,
  pointerEvents: 'auto',
  width: '100%',
  maxWidth: 1420,
  margin: '0 auto',
  padding: '40px 32px 120px 32px',
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: { padding: '32px 24px 120px 24px' },
  [theme.breakpoints.down('sm')]: { padding: '24px 16px 120px 16px' },
}))

export const BackButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  position: 'fixed',
  top: 20,
  left: 20,
  zIndex: 1600,
  alignItems: 'center',
  gap: 8,
  padding: '8px 16px',
  borderRadius: 8,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
  color: theme.palette.text.primary,
  border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.14)',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
  transition: 'all 0.3s ease',
  marginBottom: 32,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
    transform: 'translateX(-4px)'
  },
}))

/* ---- Hero ---- */
export const HeroSection = styled('section')(({ theme }) => ({
  marginBottom: 60,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.text.primary,
  // Remove padding/margin that creates gaps - extends to edges including top
  margin: '-40px -32px 60px -32px',
  [theme.breakpoints.down('md')]: {
    margin: '-32px -24px 60px -24px'
  },
  [theme.breakpoints.down('sm')]: {
    margin: '-24px -16px 60px -16px'
  }
}))

export const HeroLogo = styled('img')(({ theme }) => ({
  display: 'block',
  width: 'min(100%, 480px)',
  margin: '0 auto 6px auto',
  filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.6))',
  // Add padding back for content
  padding: '0 32px',
  [theme.breakpoints.down('md')]: {
    padding: '0 24px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 16px'
  }
}))

export const HeroBannerWrapper = styled('div')(() => ({
  position: 'relative',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  margin: 0,
  marginBottom: "100px",
  padding: 0,
  // Bottom gradient
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
    pointerEvents: 'none'
  },
  // Left gradient
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '60px',
    background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
    pointerEvents: 'none',
    zIndex: 1
  }
}))

export const HeroBannerRight = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: '60px',
  background: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
  pointerEvents: 'none',
  zIndex: 1
}))

export const HeroBanner = styled('img')(() => ({
  display: 'block',
  width: '100%',
  height: 'auto',
  // Prevent stretching, maintain aspect ratio
  objectFit: 'cover',
  objectPosition: 'center',
  // Fixed height based on typical banner proportions
  maxHeight: '420px',
  margin: 0,
  padding: 0
}))

export const HeroContent = styled('div')(({ theme }) => ({
  width: '100%',
  padding: '0 32px',
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: {
    padding: '0 24px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 16px'
  }
}))

export const HeroDevices = styled('img')(() => ({
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: 12,
  filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.65))',
  pointerEvents: 'none',
  userSelect: 'none'
}))

/* ---- Sections ---- */
export const SectionDivider = styled('div')(() => ({
  height: 2, width: "100%", background: PROCESS_BAR_GRADIENT_H, margin: '60px 0', borderRadius: 999
}))

export const Section = styled('div')(({ theme }) => ({
  marginBottom: 60,
  color: theme.palette.text.primary,
  position: 'relative'
}))

export const SectionTitle = styled('h2')(({ theme }) => ({
  margin: '0 0 28px 0',
  fontFamily: "'Futura LT', 'Futura', sans-serif",
  fontSize: 'clamp(32px, 5vw, 48px)',
  fontWeight: 900,
  color: theme.palette.text.primary,
  lineHeight: 1.2
}))

export const SectionContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24
}))

/* ---- Challenge Section ---- */
export const ChallengeSection = styled('section')(({ theme }) => ({
  marginBottom: 80,
  textAlign: 'center',
  color: theme.palette.text.primary
}))

export const ChallengeTitle = styled('h2')(() => ({
  fontSize: 'clamp(32px, 5vw, 48px)',
  fontWeight: 700,
  marginBottom: 24,
  color: '#7AA7E5',
  '&::before': {
    content: '"// "',
    color: '#7AA7E5'
  }
}))

export const ChallengeSubtitle = styled('p')(({ theme }) => ({
  fontSize: 'clamp(18px, 2.5vw, 24px)',
  lineHeight: 1.6,
  marginBottom: 60,
  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
  maxWidth: 900,
  margin: '0 auto 60px auto'
}))

export const ChallengeGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
  maxWidth: 1200,
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: 20
  }
}))

export const ChallengeCard = styled('div')(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
  borderRadius: 16,
  padding: 32,
  textAlign: 'left',
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
  }
}))

export const ChallengeCardTitle = styled('h3')(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 16,
  color: theme.palette.text.primary
}))

export const ChallengeCardContent = styled('div')(({ theme }) => ({
  fontSize: 16,
  lineHeight: 1.7,
  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 16
}))

export const HurricaneImage = styled('img')(() => ({
  width: '100%',
  maxWidth: 160,
  height: 'auto',
  borderRadius: 8,
  marginTop: 8
}))
