import React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { ReactComponent as DribbbleIconDark } from '../../assets/dribble-dark.svg'
import { ReactComponent as FigmaIconDark } from '../../assets/figma-dark.svg'
import { ReactComponent as LinkedInIconDark } from '../../assets/linkedin-dark.svg'
import { ReactComponent as DribbbleIconLight } from '../../assets/dribble-light.svg'
import { ReactComponent as FigmaIconLight } from '../../assets/figma-light.svg'
import { ReactComponent as LinkedInIconLight } from '../../assets/linkedin-light.svg'
import { Avatar } from '@mui/material'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useThemeMode } from '../../theme/ThemeProvider'

const AVATAR_IMAGES = [
    `${process.env.PUBLIC_URL}/images/shelby-rodeo.png`,
    `${process.env.PUBLIC_URL}/images/anonymous.png`
]

// -- Container for the entire floating nav bar
const FloatingNavBarContainer = styled(Paper)(({ theme }) => ({
    position: 'fixed',
    top: 24,
    right: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '8px 16px',
    borderRadius: 8,
    zIndex: 999,
    // Match the DelightfulToolbar's shadow and background style
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.15)'
            : '0 2px 8px rgba(0,0,0,0.4)',
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(50, 50, 50, 0.8)'
}))

// -- First section: Overlapping avatars
const AvatarsContainer = styled('div')(() => ({
    display: 'flex',
    position: 'relative'
}))

const AvatarWrapper = styled('div')<{ index: number }>(({ index }) => ({
    width: 40,
    height: 40,
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1px solid black',
    // Place each subsequent avatar behind the previous one:
    marginLeft: index === 0 ? 0 : -15 /* ~75% of 40px is ~30px */,
    zIndex: 100 - index // the first (index=0) is topmost
}))

// -- Vertical Divider (1px wide, 40px tall)
const VerticalDivider = styled('div')(() => ({
    width: 1,
    height: 40,
    backgroundColor: '#6A6A6A',
    // Add horizontal spacing around the divider so it sits
    // between sections with visible space on each side
    marginLeft: 24,
    marginRight: 24
}))

// -- Second section: Social icons
const SocialIconsContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    // Remove marginLeft here so the divider can control spacing
    '& > *:not(:last-child)': {
        marginRight: 16
    }
})

// -- Third section: Theme toggle
const ThemeToggleContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center'
    // Remove marginLeft here so the divider can control spacing
})

export default function FloatingTopNav() {
    // Grab the current mode ("light" or "dark") from the theme context
    const { mode } = useThemeMode()
    const isDark = mode === 'dark'

    return (
        <FloatingNavBarContainer>
            {/* Section 1: Overlapping avatars */}
            <AvatarsContainer>
                {AVATAR_IMAGES.map((src, idx) => (
                    <AvatarWrapper key={src} index={idx}>
                        <Avatar
                            src={src}
                            sx={{ width: 40, height: 40, border: '1px solid black' }}
                        />
                    </AvatarWrapper>
                ))}
            </AvatarsContainer>

            {/* Divider between Avatars and Social Icons */}
            <VerticalDivider />

            {/* Section 2: Social icons */}
            <SocialIconsContainer>
                <IconButton>
                    {isDark ? <LinkedInIconDark /> : <LinkedInIconLight />}
                </IconButton>
                <IconButton>
                    {isDark ? <FigmaIconDark /> : <FigmaIconLight />}
                </IconButton>
                <IconButton>
                    {isDark ? <DribbbleIconDark /> : <DribbbleIconLight />}
                </IconButton>
            </SocialIconsContainer>

            {/* Divider between Social Icons and Theme Toggle */}
            <VerticalDivider />

            {/* Section 3: Light/Dark theme toggle */}
            <ThemeToggleContainer>
                <ThemeToggle />
            </ThemeToggleContainer>
        </FloatingNavBarContainer>
    )
}
