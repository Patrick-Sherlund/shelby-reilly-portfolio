import React from 'react'
import { IconButton } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeMode } from '../../theme/ThemeProvider'
import { ToggleWrapper } from './ThemeToggle.styles'

export default function ThemeToggle() {
    const { mode, toggleTheme } = useThemeMode()
    const isDark = mode === 'dark'

    return (
        <ToggleWrapper>
            <IconButton onClick={toggleTheme} sx={{ color: 'inherit' }}>
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </ToggleWrapper>
    )
}
