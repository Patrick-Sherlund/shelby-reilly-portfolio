// MedTrackerProjectPage.styles.ts
import { styled } from '@mui/material/styles'

export const ProjectPageContainer = styled('div')(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
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

export const BoardContent = styled('div')(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
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
     position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 1600,
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
        borderRadius: 8,
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(50, 50, 50, 0.8)',
    color: theme.palette.text.primary,
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 5px rgba(0,0,0,0.2)'
            : '0 2px 5px rgba(0,0,0,0.5)',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.3s ease',
    marginBottom: 32,
}))


export const HeroSection = styled('section')(({ theme }) => ({
    marginBottom: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 12,
    isolation: 'isolate',
}))

export const HeroLogo = styled('img')(() => ({
    display: 'block',
    width: 'min(100%, 420px)',
    margin: '0 auto 6px auto',
    filter: 'drop-shadow(0 20px 35px rgba(7, 10, 30, 0.45))',
}))

export const HeroBadge = styled('div')(({ theme }) => ({
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
    opacity: 0.75,
    marginBottom: 8,
}))

export const HeroGrid = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 1100,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 540px) minmax(0, 1fr)',
    gap: 56,
    alignItems: 'center',
    marginTop: 12,

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: 28,
        textAlign: 'left',
    },
}))

export const HeroDevices = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
    filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.45))',
    pointerEvents: 'none',
    userSelect: 'none',
}))

/** RIGHT — glass card that holds meta + KPI chips + overview */
export const HeroGlass = styled('div')(({ theme }) => ({
    position: 'relative',
    padding: 24,
    borderRadius: 16,
    background:
        theme.palette.mode === 'light'
            ? 'rgba(255,255,255,0.55)'
            : 'rgba(18, 21, 28, 0.45)',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)'}`,
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 10px 35px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.45)'
            : '0 20px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)',
    backdropFilter: 'blur(12px)',
    textAlign: 'left',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 10,
        left: 18,
        right: 18,
        height: 2,
        borderRadius: 999,
        background: 'linear-gradient(90deg, #5EF0FF, #9C5DFF 50%, #FFB86B)',
        opacity: 0.6,
    }
}))

export const HeroMetaList = styled('dl')(({ theme }) => ({
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    rowGap: 18,
    columnGap: 24,
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        rowGap: 14,
    },
}))

export const HeroMetaKey = styled('dt')(({ theme }) => ({
    fontSize: 13,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
}))

export const HeroMetaVal = styled('dd')(({ theme }) => ({
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.primary,
}))

export const HeroKPIGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 12,
    marginTop: 18,
    marginBottom: 4,
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
}))

export const KPIChip = styled('div')(({ theme }) => ({
    padding: '12px 14px',
    borderRadius: 14,
    background:
        theme.palette.mode === 'light'
            ? 'rgba(0,0,0,0.04)'
            : 'rgba(255,255,255,0.06)',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.10)'}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    transition: 'transform .2s ease, box-shadow .2s ease, background .2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.palette.mode === 'light'
            ? '0 12px 24px rgba(0,0,0,.12)'
            : '0 16px 32px rgba(0,0,0,.35)',
        background:
            theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.06)'
                : 'rgba(255,255,255,0.08)',
    }
}))

export const KPIValue = styled('div')(() => ({
    fontWeight: 800,
    fontSize: 22,
    lineHeight: 1.1,
    background: 'linear-gradient(135deg, #6675FF 0%, #8B9EFF 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}))

export const KPILabel = styled('div')(({ theme }) => ({
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
    opacity: 0.85
}))

export const HeroProblemTitle = styled('h3')(({ theme }) => ({
    margin: '12px 0 6px 0',
    fontSize: 18,
    lineHeight: 1.25,
    fontWeight: 800,
    color: theme.palette.text.primary
}))

export const HeroDescription = styled('p')(({ theme }) => ({
    margin: '0',
    fontSize: 18,
    lineHeight: 1.8,
    color: theme.palette.text.secondary,
    maxWidth: 820,
    textAlign: 'left',
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

export const StatNumber = styled('div')(() => ({
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

/* ===========================
   PROCESS — “you’re here” UI
   =========================== */

export const StepPanel = styled('div')<{ $active?: boolean }>(
  ({ theme, $active }) => ({
    position: 'relative',
    padding: '20px clamp(18px, 2.2vw, 24px) 22px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    backdropFilter: 'blur(2px)',
    transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
    boxShadow: $active ? '0 14px 48px rgba(102,117,255,.25)' : 'none',
    transform: $active ? 'translateY(-2px)' : 'translateY(0)',
    borderColor: $active ? 'rgba(102,117,255,0.35)' : 'rgba(255,255,255,0.08)',

    /* Left rail that glows when active */
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 10,
      top: 12,
      bottom: 12,
      width: 3,
      borderRadius: 999,
      background: $active
        ? 'linear-gradient(180deg, #5EF0FF, #9C5DFF 50%, #FFB86B)'
        : 'linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.05))',
      opacity: $active ? 0.9 : 0.35,
    },

    /* Large watermark number in the corner */
    '&::after': {
      content: 'attr(data-step)',
      position: 'absolute',
      right: 14,
      top: -6,
      fontWeight: 900,
      fontSize: '96px',
      lineHeight: 1,
      letterSpacing: '-2px',
      color: theme.palette.mode === 'light'
        ? 'rgba(0,0,0,0.05)'
        : 'rgba(255,255,255,0.04)',
      pointerEvents: 'none',
      userSelect: 'none',
    },

    '& h3': {
      margin: '4px 0 4px',
      fontSize: 28,
      lineHeight: 1.15,
      fontWeight: 800,
      color: theme.palette.text.primary,
    },

    '& .eyebrow': {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 0.7,
      textTransform: 'uppercase',
      color: theme.palette.text.secondary,
      opacity: 0.85,
    },
  })
)

export const StepHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 6,
}))

export const StepBadge = styled('span')(({ theme }) => ({
  display: 'inline-grid',
  placeItems: 'center',
  width: 26,
  height: 26,
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 14,
  color: theme.palette.mode === 'light' ? '#14171f' : '#0b0e14',
  background: 'linear-gradient(135deg, #5EF0FF 0%, #9C5DFF 60%, #FFB86B 100%)',
  boxShadow: '0 6px 16px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.35)',
}))
