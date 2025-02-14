import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const TextWrapper = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2
}))
