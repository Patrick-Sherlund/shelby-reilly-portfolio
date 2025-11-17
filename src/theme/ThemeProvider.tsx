import React, {createContext, ReactNode, useContext, useState} from 'react'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {darkTheme, lightTheme} from './theme'
import GlobalFonts from './GlobalFonts'

type Props = {
    children: ReactNode
}

type ThemeContextType = {
    mode: 'light' | 'dark'
    toggleTheme: () => void
    setMode: (mode: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => {
    },
    setMode: () => {
    }
})

export function useThemeMode() {
    return useContext(ThemeContext)
}

export default function ThemeProviderWrapper({children}: Props) {
    const [mode, setMode] = useState<'light' | 'dark'>('dark')
    const theme = mode === 'light' ? lightTheme : darkTheme

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{mode, toggleTheme, setMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <GlobalFonts/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
