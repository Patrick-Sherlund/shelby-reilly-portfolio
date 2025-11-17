import React from 'react'
import {IconButton} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import {useThemeMode} from '../../theme/ThemeProvider'
import {ToggleWrapper} from './ThemeToggle.styles'

export default function ThemeToggle() {
    const {mode, toggleTheme} = useThemeMode()
    const isDark = mode === 'dark'

    return (
        <ToggleWrapper data-ignore-stage>

            <IconButton
                onClick={toggleTheme}
                sx={{
                    color: 'inherit',
                    width: 40,
                    height: 40,
                    '& .MuiSvgIcon-root': {
                        fontSize: 40
                    }
                }}
            >
                {isDark ? <LightModeIcon/> : <DarkModeIcon/>}
            </IconButton>
        </ToggleWrapper>
    )
}
