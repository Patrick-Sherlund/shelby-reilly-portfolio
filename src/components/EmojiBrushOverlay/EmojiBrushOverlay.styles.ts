import { styled } from '@mui/material/styles'

export const OverlayContainer = styled('div')(() => ({
    position: 'fixed',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)'
}))

export const EmojiPreview = styled('img')(() => ({
    width: 40,
    height: 40,
    opacity: 0.6
}))
