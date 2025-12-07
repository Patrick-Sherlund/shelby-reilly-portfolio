import React, {useEffect, useRef, useState} from 'react'
import {styled, useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Tooltip, {tooltipClasses, TooltipProps} from '@mui/material/Tooltip'
import {Avatar} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import {motion} from 'framer-motion'

import ThemeToggle from '../ThemeToggle/ThemeToggle'
import {useThemeMode} from '../../theme/ThemeProvider'

import {ReactComponent as DribbbleIconDark} from '../../assets/dribble-dark.svg'
import {ReactComponent as FigmaIconDark} from '../../assets/figma-dark.svg'
import {ReactComponent as LinkedInIconDark} from '../../assets/linkedin-dark.svg'
import {ReactComponent as DribbbleIconLight} from '../../assets/dribble-light.svg'
import {ReactComponent as FigmaIconLight} from '../../assets/figma-light.svg'
import {ReactComponent as LinkedInIconLight} from '../../assets/linkedin-light.svg'

type Props = {}

const PROFILES = [
    {name: 'Shelby Reilly', src: `${process.env.PUBLIC_URL}/images/shelby-rodeo.png`},
    {name: 'Anonymous', src: `${process.env.PUBLIC_URL}/images/anonymous.png`}
]


const FloatingNavBarContainer = styled(Paper)<{ open: boolean; $mobileOpen: boolean }>(
    ({theme, open, $mobileOpen}) => ({
        position: 'fixed',
        top: 24,
        right: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '4px 12px 4px 92px',
        borderRadius: 12,
        zIndex: 999,
        boxShadow:
            theme.palette.mode === 'light'
                ? '0 6px 24px rgba(0,0,0,0.18)'
                : '0 10px 30px rgba(0,0,0,0.6)',
        background:
            theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,.6))'
                : 'rgba(50, 50, 50, .8)',
        backdropFilter: 'blur(10px)',
        overflow: 'visible',
        transition: 'background .25s ease, box-shadow .25s ease, backdrop-filter .25s ease',
        [theme.breakpoints.down('sm')]: {
            padding: '8px 10px',
            right: 16,
            top: 16,

            background: $mobileOpen
                ? (theme.palette.mode === 'light'
                    ? 'linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,.6))'
                    : 'linear-gradient(180deg, rgba(18,18,18,.78), rgba(18,18,18,.66))')
                : 'transparent',
            boxShadow: $mobileOpen
                ? (theme.palette.mode === 'light'
                    ? '0 6px 24px rgba(0,0,0,0.18)'
                    : '0 10px 30px rgba(0,0,0,0.6)')
                : 'none',
            backdropFilter: $mobileOpen ? 'blur(10px)' : 'none'
        }
    })
)


const AvatarsContainer = styled(motion.div)<{ open: boolean }>(({open, theme}) => ({
    position: 'absolute',
    top: open ? 'unset' : 0,
    left: 12,
    display: 'flex',
    flexDirection: open ? 'column' : 'row',
    alignItems: open ? 'flex-start' : 'center',
    padding: open ? '6px 8px' : 0,
    borderRadius: 10,
    background: open
        ? theme.palette.mode === 'light'
            ? 'rgba(245,245,245,0.8)'
            : 'rgba(24,24,24,0.82)'
        : 'transparent',
    boxShadow: open
        ? theme.palette.mode === 'light'
            ? '0 8px 24px rgba(0,0,0,0.15)'
            : '0 12px 28px rgba(0,0,0,0.45)'
        : 'none',
    backdropFilter: open ? 'blur(8px)' : 'none',
    zIndex: 1
}))
const AvatarWrapper = styled(motion.div)<{ index: number; open: boolean }>(({index, open}) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 40,
    height: 40,
    marginBottom: open ? 6 : 0,
    marginLeft: open ? 0 : index === 0 ? 0 : -15,
    zIndex: 100 - index
}))

const VerticalDivider = styled('div')(({theme}) => ({
    width: 1,
    height: 40,
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.14)',
    marginLeft: 24,
    marginRight: 24,
    [theme.breakpoints.down('sm')]: {display: 'none'}
}))

const SocialIconsContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    '& > *:not(:last-child)': {marginRight: 16},
    [theme.breakpoints.down('sm')]: {display: 'none'}
}))
const ThemeToggleContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {display: 'none'}
}))


const ProfileDropdown = styled(Box)(({theme}) => ({
    position: 'absolute',
    top: 'calc(100% + 12px)',
    left: 0,
    background: 'rgba(60,60,62,0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: 12,
    padding: '8px',
    minWidth: 280,
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    zIndex: 1000
}))

const ProfileHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 12px 8px 12px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: 8
})

const MenuItemRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background 0.2s',
    '&:hover': {
        background: 'rgba(255,255,255,0.08)'
    }
})


const ProfileTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} placement="bottom" arrow classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1E1E1E',
        color: theme.palette.mode === 'light' ? '#000' : '#fff',
        fontSize: 12,
        fontWeight: 600,
        borderRadius: 8,
        boxShadow: '0 8px 18px rgba(0,0,0,0.18)'
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.mode === 'light' ? '#fff' : '#1E1E1E'
    }
}))


const MobileCompact = styled('div')<{ open: boolean }>(({theme, open}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    padding: 6,
    borderRadius: 28,

    background: open
        ? (theme.palette.mode === 'light' ? 'rgba(255,255,255,0.78)' : 'rgba(18,18,18,0.82)')
        : 'transparent',
    backdropFilter: open ? 'blur(10px)' : 'none',
    boxShadow: open
        ? (theme.palette.mode === 'light' ? '0 12px 28px rgba(0,0,0,0.18)' : '0 18px 40px rgba(0,0,0,0.6)')
        : 'none'
}))

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    paddingTop: `calc(12px + env(safe-area-inset-top))`
}))

const DrawerPaperSX = (theme: any) => ({
    width: '88vw',
    maxWidth: 380,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    background:
        theme.palette.mode === 'light'
            ? 'linear-gradient(180deg,#ffffff,#f7f7f9)'
            : 'linear-gradient(180deg,rgba(16,16,16,0.98),rgba(22,22,22,0.98))',
    color: theme.palette.text.primary,
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 20px 60px rgba(0,0,0,0.18)'
            : '0 28px 80px rgba(0,0,0,0.65)',
    '& .MuiDivider-root': {
        borderColor:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'
    }
})

export default function FloatingTopNav({}: Props) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const {mode} = useThemeMode()


    const isProjectPage = window.location.hash.includes('bishop-project') ||
        window.location.hash.includes('codesign-project') ||
        window.location.hash.includes('medtracker-project') ||
        window.location.hash.includes('about')


    const isDark = isProjectPage ? true : mode === 'dark'

    const [openProfiles, setOpenProfiles] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleProfiles = () => setOpenProfiles((p) => !p)
    const toggleMenu = () => setMenuOpen((p) => !p)
    const closeMenu = () => setMenuOpen(false)


    const barRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (isMobile) return
        const onDocClick = (e: MouseEvent) => {
            if (!barRef.current) return
            if (!barRef.current.contains(e.target as Node)) setOpenProfiles(false)
        }
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    }, [isMobile])

    return (
        <>
            <FloatingNavBarContainer
                ref={barRef}
                data-ignore-stage
                open={openProfiles}
                $mobileOpen={isMobile ? menuOpen : false}
                elevation={0}
            >

                {!isMobile && (
                    <>

                        <Box sx={{
                            position: 'absolute',
                            top: 10,
                            left: 18,
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: 1
                        }}>
                            {PROFILES.map((profile, idx) => (
                                <Box
                                    key={profile.src}
                                    sx={{
                                        marginLeft: idx === 0 ? 0 : '-15px',
                                        zIndex: 100 - idx
                                    }}
                                >
                                    <ProfileTooltip title={profile.name}>
                                        <Avatar
                                            src={profile.src}
                                            onClick={toggleProfiles}
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                border: '1px solid rgba(0,0,0,.65)',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </ProfileTooltip>
                                </Box>
                            ))}
                        </Box>

                        {openProfiles && (
                            <ProfileDropdown
                                sx={{
                                    opacity: openProfiles ? 1 : 0,
                                    transition: 'opacity 0.15s ease-in-out',
                                    left: 2
                                }}
                            >
                                <ProfileHeader>
                                    <Avatar
                                        src={PROFILES[0].src}
                                        sx={{width: 40, height: 40}}
                                    />
                                    <Box sx={{color: '#fff', fontWeight: 600, fontSize: 15}}>
                                        Shelby Reilly
                                    </Box>
                                </ProfileHeader>

                                <Box
                                    component="a"
                                    href={`${process.env.PUBLIC_URL}/files/Senior Product Designer Shelby Reilly Resume.pdf`}
                                    download="Senior Product Designer Shelby Reilly Resume.pdf"
                                    sx={{textDecoration: 'none', color: 'inherit'}}
                                >
                                    <MenuItemRow>
                                        <DescriptionOutlinedIcon sx={{fontSize: 22, color: '#fff'}}/>
                                        <Box sx={{color: '#fff', fontWeight: 500, fontSize: 14}}>
                                            Resume
                                        </Box>
                                    </MenuItemRow>
                                </Box>

                                <Box
                                    component="a"
                                    href="#/about"
                                    sx={{textDecoration: 'none', color: 'inherit'}}
                                    onClick={() => setOpenProfiles(false)}
                                >
                                    <MenuItemRow>
                                        <InfoOutlinedIcon sx={{fontSize: 22, color: '#fff'}}/>
                                        <Box sx={{color: '#fff', fontWeight: 500, fontSize: 14}}>
                                            About
                                        </Box>
                                    </MenuItemRow>
                                </Box>
                            </ProfileDropdown>
                        )}

                        <IconButton size="small" sx={{ml: 0, mr: 2}} onClick={toggleProfiles}>
                            <KeyboardArrowDownIcon
                                fontSize="small"
                                sx={{
                                    transform: openProfiles ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform .2s'
                                }}
                            />
                        </IconButton>

                        <SocialIconsContainer>
                            <IconButton target='_blank' href='https://www.linkedin.com/in/shelbyreilly'
                                        aria-label="LinkedIn">{isDark ? <LinkedInIconDark/> :
                                <LinkedInIconLight/>}</IconButton>
                            <IconButton target='_blank' href='https://www.figma.com/@ShelbyReilly'
                                        aria-label="Figma">{isDark ? <FigmaIconDark/> : <FigmaIconLight/>}</IconButton>
                            <IconButton target='_blank' href='https://dribbble.com/ShelbyReilly'
                                        aria-label="Dribbble">{isDark ? <DribbbleIconDark/> :
                                <DribbbleIconLight/>}</IconButton>
                        </SocialIconsContainer>

                        {!isProjectPage && (
                            <>
                                <VerticalDivider/>
                                <ThemeToggleContainer>
                                    <ThemeToggle/>
                                </ThemeToggleContainer>
                            </>
                        )}
                    </>
                )}

                {isMobile && (
                    <MobileCompact open={menuOpen}>
                        <IconButton
                            onClick={toggleMenu}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            sx={{
                                width: 52,
                                height: 52,
                                borderRadius: '50%',
                                border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'}`,
                                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)'
                            }}
                        >
                            {menuOpen ? (
                                <CloseRoundedIcon sx={{fontSize: 28}}/>
                            ) : (
                                <MenuRoundedIcon sx={{fontSize: 28}}/>
                            )}
                        </IconButton>
                    </MobileCompact>
                )}
            </FloatingNavBarContainer>

            <Drawer
                anchor="right"
                open={isMobile && menuOpen}
                onClose={closeMenu}
                ModalProps={{keepMounted: true}}
                sx={{'& .MuiDrawer-paper': DrawerPaperSX(theme)}}
            >
                <Box role="navigation"
                     sx={{height: '100%', display: 'flex', flexDirection: 'column', pb: 'env(safe-area-inset-bottom)'}}>
                    <DrawerHeader>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 12}}>
                            <Avatar src={PROFILES[0].src} sx={{width: 36, height: 36}}/>
                            <Box sx={{fontWeight: 900, fontSize: 16, letterSpacing: .2}}>{PROFILES[0].name}</Box>
                        </Box>
                        <IconButton onClick={closeMenu} aria-label="Close menu"><CloseRoundedIcon/></IconButton>
                    </DrawerHeader>

                    <Divider/>

                    <List sx={{py: 0}}>
                        {PROFILES.map((p) => (
                            <ListItem key={p.src} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Avatar src={p.src} sx={{width: 28, height: 28}}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={p.name}
                                        primaryTypographyProps={{fontWeight: 800}}
                                    />
                                    <IconButton
                                        size="small"
                                        aria-label={`${p.name} resume`}
                                        edge="end"
                                        component="a"
                                        href={`${process.env.PUBLIC_URL}/files/Senior Product Designer Shelby Reilly Resume.pdf`}
                                        download="Senior Product Designer Shelby Reilly Resume.pdf"
                                    >
                                        <DescriptionOutlinedIcon sx={{fontSize: 18}}/>
                                        <ChevronRightRoundedIcon sx={{fontSize: 18, ml: .25}}/>
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#/about" onClick={closeMenu}>
                                <ListItemIcon>
                                    <InfoOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="About me" primaryTypographyProps={{fontWeight: 700}}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <Divider sx={{my: 0.5}}/>

                    <List dense sx={{py: 0}}>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#" aria-label="LinkedIn">
                                <ListItemIcon>{isDark ? <LinkedInIconDark/> : <LinkedInIconLight/>}</ListItemIcon>
                                <ListItemText primary="LinkedIn"/>
                                <OpenInNewRoundedIcon fontSize="small"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#" aria-label="Figma">
                                <ListItemIcon>{isDark ? <FigmaIconDark/> : <FigmaIconLight/>}</ListItemIcon>
                                <ListItemText primary="Figma"/>
                                <OpenInNewRoundedIcon fontSize="small"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#" aria-label="Dribbble">
                                <ListItemIcon>{isDark ? <DribbbleIconDark/> : <DribbbleIconLight/>}</ListItemIcon>
                                <ListItemText primary="Dribbble"/>
                                <OpenInNewRoundedIcon fontSize="small"/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                    {!isProjectPage && (
                        <>
                            <Divider sx={{my: 0.5}}/>

                            <Box sx={{mt: 'auto', p: 2}}>
                                <Box sx={{
                                    fontSize: 12,
                                    fontWeight: 900,
                                    opacity: 0.6,
                                    mb: 1,
                                    textTransform: 'uppercase'
                                }}>Theme</Box>
                                <ThemeToggle/>
                            </Box>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    )
}
