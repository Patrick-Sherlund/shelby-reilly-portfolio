import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const ProjectsContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
}))

export const ProjectsText = styled('div')(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    textAlign: 'center',
    '@media (max-width:900px)': {
        fontSize: '1.5rem'
    },
    '@media (max-width:600px)': {
        fontSize: '1.2rem'
    }
}))
