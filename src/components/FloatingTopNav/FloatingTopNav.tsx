import React, { useState } from 'react'
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { motion, AnimatePresence } from 'framer-motion'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'

const PROFILES = [
    { name: 'Shelby Reilly', src: `${process.env.PUBLIC_URL}/images/shelby-rodeo.png` },
    { name: 'Anonymous', src: `${process.env.PUBLIC_URL}/images/anonymous.png` }
]

// -- Container for the entire floating nav bar
const FloatingNavBarContainer = styled(Paper)<{ open: boolean }>(({ theme, open }) => ({
    position: 'fixed',
    top: 24,
    right: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: `4px 12px 4px ${open ? 12 : 92}px`,
    borderRadius: 8,
    zIndex: 999,
    // Match the DelightfulToolbar's shadow and background style
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.15)'
            : '0 2px 8px rgba(0,0,0,0.4)',
    backgroundColor:
        theme.palette.mode === 'light'
            ? 'rgba(230, 230, 230, 0.7)'
            : 'rgba(30, 30, 30, 0.8)',
    overflow: 'visible',
    transition: 'padding 0.45s ease-in-out'
}))

// -- Avatars container using framer-motion for smooth animation
const AvatarsContainer = styled(motion.div)<{ open: boolean }>(({ open, theme }) => ({
    position: 'absolute',
    top: open ? "unset" : 0,
    left: 12,
    display: 'flex',
    flexDirection: open ? 'column' : 'row',
    alignItems: open ? 'flex-start' : 'center',
    padding: open ? '4px 8px' : 0,
    borderRadius: open ? 8 : 0,
    backgroundColor: open
        ? theme.palette.mode === 'light'
            ? 'rgba(230, 230, 230, 0.7)'
            : 'rgba(30, 30, 30, 0.8)'
        : 'transparent',
    backdropFilter: open ? 'blur(4px)' : 'none',
    boxShadow: open
        ? theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.15)'
            : '0 2px 8px rgba(0,0,0,0.4)'
        : 'none'
}))

const AvatarWrapper = styled(motion.div)<{ index: number; open: boolean }>(({ index, open }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 40,
    width: 'auto',
    height: 40,
    marginBottom: open ? 6 : 0,
    marginLeft: open ? 0 : index === 0 ? 0 : -15,
    zIndex: 100 - index
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

// Custom styled tooltip to mimic Figma style
const ProfileTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
        {...props}
        placement="bottom"
        arrow
        classes={{ popper: className }}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#1E1E1E',
        color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
        fontSize: 12,
        fontWeight: 500,
        borderRadius: 6,
        boxShadow: '0px 4px 8px rgba(0,0,0,0.08)'
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.mode === 'light' ? '#FFFFFF' : '#1E1E1E'
    }
}))

const ProfileName = styled(motion.span)<{ open: boolean }>(({ open }) => ({
    marginLeft: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: open ? 160 : 0,
    opacity: open ? 1 : 0,
    fontSize: 14,
    fontWeight: 500
}))

// motion variants
const containerVariants = {
    closed: { y: 12 },
    open: { y: 'calc(100% - 2px)' } // slight overlap to reduce gap
}

// Block holding name + actions
const NameBlock = styled(motion.div)<{ open: boolean }>(({ open }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 8,
    opacity: open ? 1 : 0,
    maxWidth: open ? 200 : 0,
    overflow: 'hidden'
}))

const ResumeLink = styled(motion.a)<{ open: boolean }>(({ open }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    textDecoration: 'none',
    cursor: 'pointer',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    marginTop: 2,
    '&:hover': {
        textDecoration: 'underline'
    }
}))

export default function FloatingTopNav() {
    // Grab the current mode ("light" or "dark") from the theme context
    const { mode } = useThemeMode()
    const isDark = mode === 'dark'

    const [openProfiles, setOpenProfiles] = useState(false)

    const toggleProfiles = () => setOpenProfiles((prev) => !prev)

    return (
        <>
            <FloatingNavBarContainer data-ignore-stage open={openProfiles}>
                {/* Section 1: Overlapping avatars */}
                <AvatarsContainer
                    open={openProfiles}
                    variants={containerVariants}
                    animate={openProfiles ? 'open' : 'closed'}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                >
                    {PROFILES.map((profile, idx) => (
                        <AvatarWrapper
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            key={profile.src}
                            index={idx}
                            open={openProfiles}
                        >
                            <ProfileTooltip title={profile.name}>
                                <Avatar
                                    src={profile.src}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        border: '1px solid black',
                                        cursor: 'pointer'
                                    }}
                                />
                            </ProfileTooltip>
                            <NameBlock
                                open={openProfiles}
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            >
                                <ProfileName open={openProfiles}>{profile.name}</ProfileName>
                                <ResumeLink open={openProfiles} href="#">
                                    <DescriptionOutlinedIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    <span>Download Resume</span>
                                </ResumeLink>
                            </NameBlock>
                        </AvatarWrapper>
                    ))}
                </AvatarsContainer>

                {/* Small arrow icon next to avatars */}
                <IconButton size="small" sx={{ ml: 0, mr: 2 }} onClick={toggleProfiles}>
                    <KeyboardArrowDownIcon
                        fontSize="small"
                        sx={{
                            transform: openProfiles ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                        }}
                    />
                </IconButton>

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
        </>
    )
}
