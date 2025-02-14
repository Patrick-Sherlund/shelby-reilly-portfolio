import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

export const Note = styled(Paper)(({ color }) => ({
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 600,
    boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
    backgroundColor: color,
    cursor: 'grab',
    userSelect: 'none',
    borderRadius: 4,
    margin: '1rem'
}))
