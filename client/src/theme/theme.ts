import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#ffffff'
        },
        primary: {
            main: '#1976d2'
        }
    },
    typography: {
        h1: {
            fontSize: '3rem',
            '@media (max-width:900px)': {
                fontSize: '2rem'
            },
            '@media (max-width:600px)': {
                fontSize: '1.5rem'
            }
        }
    }
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212'
        },
        primary: {
            main: '#90caf9'
        }
    },
    typography: {
        h1: {
            fontSize: '3rem',
            '@media (max-width:900px)': {
                fontSize: '2rem'
            },
            '@media (max-width:600px)': {
                fontSize: '1.5rem'
            }
        }
    }
})

export { lightTheme, darkTheme }
