import { styled } from '@mui/material/styles'

// Full-page wrapper
export const MainWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
    paddingTop: 72,
    paddingBottom: 'max(24px, env(safe-area-inset-bottom))'
  }
}))

export const ContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 1700,
  margin: '0 auto',
  padding: '0 84px',
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '0 20px'
  }
}))

// Title Section Styles
export const TitleSectionContainer = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  position: 'absolute',
  top: isMobile ? 100 : 110,
  left: isMobile ? 32 : 84,
  zIndex: 10
}))

export const TitleSectionInner = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}))

export const TitleChip = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  backgroundColor: '#5263FF',
  borderRadius: 4,
  padding: '8px 12px',
  fontSize: isMobile ? '28px' : '36px',
  fontFamily: 'Futura, sans-serif',
  fontWeight: 700,
  color: '#FFFFFF',
  lineHeight: 1.2,
  width: 'fit-content'
}))

// Main Content Area Styles
export const MainContentArea = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: isMobile ? 24 : 40,
  width: '100%',
  maxWidth: '100%',
  margin: 0,
  padding: isMobile ? '280px 0 40px' : '320px 0 40px',
  position: 'relative'
}))

export const PresentationSection = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  position: 'relative',
  flex: '0 0 auto',
  width: isMobile ? '100%' : 500
}))

export const TextContentSection = styled('div')(({ theme }) => ({
  flex: 1,
  position: 'relative',
  maxWidth: 900,
  [theme.breakpoints.down('lg')]: {
    maxWidth: 780
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%'
  }
}))

export const AboutTextCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#1E1E1E',
  borderRadius: 12,
  padding: 'clamp(20px, 3vw, 32px)',
  paddingRight: '30px',
  fontSize: 'clamp(14px, 1.5vw, 16px)',
  fontFamily: 'Futura, sans-serif',
  lineHeight: 1.6,
  color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
  boxShadow: theme.palette.mode === 'light'
    ? '0 4px 16px rgba(0,0,0,0.1)'
    : '0 4px 16px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('md')]: {
    padding: '20px',
    paddingRight: '20px',
    fontSize: '15px'
  }
}))

export const SectionTitle = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: isMobile ? '18px' : '20px',
  fontWeight: 700,
  marginBottom: 16
}))

export const Paragraph = styled('div')(() => ({
  marginBottom: 20
}))

export const ParagraphShort = styled('div')(() => ({
  marginBottom: 16
}))

export const CompanyNamesOne = styled('span')(() => ({
  color: '#ffffffff',
  fontWeight: 600
}))

export const CompanyNamesTwo = styled('span')(() => ({
  color: '#EFE292',
  fontWeight: 600
}))

export const CompanyNamesThree = styled('span')(() => ({
  color: '#A5FF97',
  fontWeight: 600
}))

export const CompanyNamesFour = styled('span')(() => ({
  color: '#83C5FF',
  fontWeight: 600
}))

export const IconTextRow = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8
}))

export const ShelbyImageContainer = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  position: 'absolute',
  bottom: -40,
  right: isMobile ? -20 : -80,
  zIndex: 10
}))

// Bottom Section Styles
export const BottomSection = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: isMobile ? 32 : 60,
  width: '100%',
  maxWidth: '100%',
  margin: 0,
  padding: isMobile ? '80px 0 40px' : '100px 0 60px',
  position: 'relative'
}))

export const HobbiesContentSection = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  position: 'relative',
  flex: 1,
  maxWidth: isMobile ? '100%' : 900
}))

export const HobbiesTitle = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  fontSize: isMobile ? '16px' : '16px',
  marginBottom: 20,
  fontWeight: 600
}))

export const HobbiesFooter = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  marginTop: 24,
  fontSize: 'clamp(14px, 1.5vw, 16px)',
  opacity: 0.9
}))

export const BlueSquiggleImage = styled('img')(() => ({
  position: 'absolute',
  bottom: -26,
  right: -26,
  width: 72,
  height: 72,
  zIndex: 10,
  pointerEvents: 'none'
}))

export const PolaroidSection = styled('div')<{ isMobile: boolean }>(({ isMobile }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: 0,
  flex: '0 0 auto',
  marginTop: isMobile ? 0 : 40,
  height: isMobile ? 'auto' : 280,
  width: isMobile ? '100%' : 520
}))

// Image Components
export const PresentationImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: 520,
  height: 'auto',
  borderRadius: 8,
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%'
  }
}))

export const ShelbyStandingImage = styled('img')(({ theme }) => ({
  width: 'clamp(120px, 10vw, 150px)',
  height: 'auto',
  borderRadius: 8,
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  [theme.breakpoints.down('md')]: {
    width: 'clamp(100px, 30vw, 140px)'
  }
}))

export const YellowSquiggle = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: -26,
  left: -26,
  width: 72,
  height: 72,
  zIndex: 10,
  pointerEvents: 'none',
  [theme.breakpoints.down('md')]: {
    width: 36,
    height: 36,
    top: -12,
    left: -12
  }
}))

// Bullet List Components
export const BulletList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginTop: 12
}))

export const BulletItem = styled('div')(({ theme }) => ({
  fontSize: 'clamp(14px, 1.5vw, 16px)',
  lineHeight: 1.5,
  gap: 0,
  [theme.breakpoints.down('md')]: {
    fontSize: '15px'
  }
}))

export const IconWrapper = styled('img')(({ theme }) => ({
  width: 20,
  height: 20,
  flexShrink: 0,
  display: 'inline-block',
  verticalAlign: 'middle',
  marginRight: 4
}))
