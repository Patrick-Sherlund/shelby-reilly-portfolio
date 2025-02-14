import React, { useState, ReactNode, createContext, useContext } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './theme'

type Props = {
    children: ReactNode
}

type ThemeContextType = {
    mode: 'light' | 'dark'
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => {}
})

export function useThemeMode() {
    return useContext(ThemeContext)
}

export default function ThemeProviderWrapper({ children }: Props) {
    const [mode, setMode] = useState<'light' | 'dark'>('dark')
    const theme = mode === 'light' ? lightTheme : darkTheme

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
