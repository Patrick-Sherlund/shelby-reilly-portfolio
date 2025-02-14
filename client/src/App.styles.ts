import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

type ContainerProps = {
  scaleValue: number
}

export const Container = styled(Box)<ContainerProps>(({ theme, scaleValue }) => ({
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  backgroundColor: theme.palette.background.default,
  
  backgroundImage:
      theme.palette.mode === 'light'
          ? 'url("/dots-light.svg")'
          : 'url("/dots-dark.svg")',
  backgroundRepeat: 'repeat',
  
  
  backgroundSize: `${20 * scaleValue}px ${20 * scaleValue}px`
}))

export const CenterText = styled('div')(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  textAlign: 'center',
  '@media (max-width:900px)': {
    fontSize: '2rem'
  },
  '@media (max-width:600px)': {
    fontSize: '1.5rem'
  }
}))
