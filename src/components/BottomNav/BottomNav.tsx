import React from 'react'
import { BottomNavigationAction } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import { NavWrapper, StyledBottomNavigation } from './BottomNav.styles'

export default function BottomNav() {
    const [value, setValue] = React.useState(0)
    return (
        <NavWrapper>
            <StyledBottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
            </StyledBottomNavigation>
        </NavWrapper>
    )
}
