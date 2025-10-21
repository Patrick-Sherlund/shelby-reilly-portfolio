// MedTrackerProjectPage.styles.ts
import { styled } from '@mui/material/styles'

const BLACK = '#000000'
const INDIGO = '#1B1887'
const WHITE = '#FFFFFF'

const PROCESS_BAR_GRADIENT_V =
  'linear-gradient(180deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'
const PROCESS_BAR_GRADIENT_H =
  'linear-gradient(90deg, rgba(0,0,0,.5) 0%, #1B1887 31%, #1B1887 68%, rgba(0,0,0,.5) 100%)'

export const ProjectPageContainer = styled('div')(() => ({
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  backgroundColor: BLACK,
  backgroundImage: 'none',
  color: WHITE
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
  position: 'relative',
  zIndex: 10,
  pointerEvents: 'auto',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
  padding: '40px 32px 120px 32px',
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: { padding: '32px 24px 120px 24px' },
  [theme.breakpoints.down('sm')]: { padding: '24px 16px 120px 16px' },
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
  backgroundColor: 'rgba(255,255,255,0.06)',
  color: WHITE,
  border: '1px solid rgba(255,255,255,0.14)',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
  transition: 'all 0.3s ease',
  marginBottom: 32,
  '&:hover': { backgroundColor: 'rgba(255,255,255,0.10)', transform: 'translateX(-4px)' },
}))

/* ---- Hero (unchanged) ---- */
export const HeroSection = styled('section')(() => ({
  marginBottom: 60,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 12,
  color: WHITE
}))
export const HeroLogo = styled('img')(() => ({
  display: 'block', width: 'min(100%, 420px)', margin: '0 auto 6px auto', filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.6))'
}))
export const HeroBadge = styled('div')(() => ({
  fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 8
}))
export const HeroGrid = styled('div')(({ theme }) => ({
  width: '100%', maxWidth: 1100, display: 'grid',
  gridTemplateColumns: 'minmax(0, 540px) minmax(0, 1fr)', gap: 56, alignItems: 'center', marginTop: 12,
  [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: 28, textAlign: 'left' }
}))
export const HeroDevices = styled('img')(() => ({
  width: '100%', height: 'auto', display: 'block', borderRadius: 12, filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.65))', pointerEvents: 'none', userSelect: 'none'
}))
export const HeroGlass = styled('div')(() => ({
  position: 'relative', padding: 24, borderRadius: 16,
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 20px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)', backdropFilter: 'blur(12px)',
  textAlign: 'left', color: WHITE,
  '&::after': { content: '""', position: 'absolute', top: 10, left: 18, right: 18, height: 2, borderRadius: 999, background: PROCESS_BAR_GRADIENT_H }
}))
export const HeroMetaList = styled('dl')(() => ({
  margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', rowGap: 18, columnGap: 24, textAlign: 'left', color: WHITE
}))
export const HeroMetaKey = styled('dt')(() => ({
  fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap'
}))
export const HeroMetaVal = styled('dd')(() => ({
  margin: 0, fontSize: 18, fontWeight: 700, color: WHITE
}))
export const HeroKPIGrid = styled('div')(({ theme }) => ({
  display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 18, marginBottom: 4,
  [theme.breakpoints.down('sm')]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }
}))
export const KPIChip = styled('div')(() => ({
  padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)',
  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, transition: 'transform .2s, box-shadow .2s, background .2s', color: WHITE,
  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 16px 32px rgba(0,0,0,.35)', background: 'rgba(255,255,255,0.06)' }
}))
export const KPIValue = styled('div')(() => ({ fontWeight: 900, fontSize: 22, lineHeight: 1.1, color: WHITE }))
export const KPILabel = styled('div')(() => ({ fontSize: 12, fontWeight: 800, letterSpacing: .6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }))
export const HeroProblemTitle = styled('h3')(() => ({ margin: '12px 0 6px 0', fontSize: 18, lineHeight: 1.25, fontWeight: 900, color: WHITE }))
export const HeroDescription = styled('p')(() => ({ margin: 0, fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.80)', maxWidth: 820, textAlign: 'left' }))

/* ---- Sections ---- */
export const SectionDivider = styled('div')(() => ({
  height: 2, background: PROCESS_BAR_GRADIENT_H, margin: '60px 0', borderRadius: 999
}))
export const Section = styled('div')(() => ({
  marginBottom: 60,
  color: WHITE,
  position: 'relative'
}))
export const SectionTitle = styled('h2')(() => ({
  margin: '0 0 28px 0', fontFamily: "'Futura LT', 'Futura', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: WHITE, lineHeight: 1.2
}))
export const SectionContent = styled('div')(() => ({ display: 'flex', flexDirection: 'column', gap: 24 }))
export const TwoColumn = styled('div')(({ theme }) => ({
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start',
  [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: 24 },
  '& h4': { margin: '0 0 16px 0', fontSize: 18, fontWeight: 800, color: WHITE },
  '& p': { margin: '12px 0', fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' },
}))
export const ThreeColumn = styled('div')(({ theme }) => ({
  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'start',
  [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: 20 },
  '& h4': { margin: '0 0 12px 0', fontSize: 17, fontWeight: 800, color: WHITE },
  '& p': { margin: 0, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' },
}))
export const TextBlock = styled('p')(() => ({ margin: '0 0 16px 0', fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.84)' }))
export const BoldText = styled('span')(() => ({ fontWeight: 900, color: WHITE }))
export const ListItem = styled('div')(() => ({ margin: '8px 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.84)' }))
export const StatCard = styled('div')(() => ({
  padding: 28, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
  textAlign: 'center', transition: 'all .3s ease', color: WHITE,
  '&:hover': { background: 'rgba(255,255,255,0.06)', transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.35)' },
}))
export const StatNumber = styled('div')(() => ({ fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 900, color: WHITE, lineHeight: 1, marginBottom: 8 }))
export const StatLabel = styled('div')(() => ({ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.75)', marginBottom: 8 }))
export const StatDescription = styled('p')(() => ({ fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.8)', margin: 0 }))

/* ---- Process Panels ---- */
export const StepPanel = styled('div')<{ $active?: boolean }>(({ $active }) => ({
  position: 'relative',
  padding: '20px clamp(18px, 2.2vw, 24px) 22px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.03)',
  transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
  boxShadow: $active ? '0 14px 48px rgba(27,24,135,.4)' : 'none',
  transform: $active ? 'translateY(-2px)' : 'translateY(0)',
  color: WHITE,

  '&::before': {
    content: '""',
    position: 'absolute',
    left: 10,
    top: 12,
    bottom: 12,
    width: 4,
    borderRadius: 999,
    background: $active ? PROCESS_BAR_GRADIENT_V : 'rgba(255,255,255,0.18)'
  },

  '&::after': {
    content: 'attr(data-step)',
    position: 'absolute',
    right: 14,
    top: -6,
    fontWeight: 900,
    fontSize: '96px',
    lineHeight: 1,
    letterSpacing: '-2px',
    color: 'rgba(255,255,255,0.06)',
    pointerEvents: 'none',
    userSelect: 'none'
  },

  '& h3': {
    margin: '4px 0 4px',
    fontSize: 28,
    lineHeight: 1.15,
    fontWeight: 900,
    color: WHITE
  },

  '& .eyebrow': {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.75)'
  }
}))

export const StepHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 6,
  color: WHITE
}))

export const StepBadge = styled('span')(() => ({
  display: 'inline-grid',
  placeItems: 'center',
  width: 26,
  height: 26,
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 14,
  color: WHITE,
  background: INDIGO,
  boxShadow: '0 6px 16px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.2)'
}))
