import {styled} from '@mui/material/styles'

export const OverlayContainer = styled('div')(() => ({
    position: 'fixed',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 1600
}))

export const EmojiPreview = styled('img')(() => ({
    maxWidth: '40px',
    maxHeight: '40px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    opacity: 0.6
}))
