import { styled } from '@mui/material/styles'

export const PickerContainer = styled('div')(({ theme }) => ({
    position: 'fixed',
    width: '14rem',
    height: '14rem',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    borderRadius: '50%',
    pointerEvents: 'auto',
    transform: 'translate(-58%, -80%)',
    background:
        theme.palette.mode === 'light'
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(50,50,50,0.85)',
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 4px 8px rgba(0,0,0,0.15)'
            : '0 4px 8px rgba(0,0,0,0.35)',
    zIndex: 9999
}))

export const EmojiSlice = styled('div')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: 'center center',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}))

export const CenterRing = styled('div')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '7rem',
    height: '7rem',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    border: '4px solid #4A90E2',
    zIndex: 2
}))

export const InnerCircle = styled('div')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '7rem',
    height: '7rem',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
    zIndex: 3
}))

export const TopHalf = styled('div')<{ active: boolean }>(({ active }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: active ? '#4A90E2' : '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}))

export const BottomHalf = styled('div')<{ active: boolean }>(({ active }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: active ? '#4A90E2' : '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}))

export const PieDivider = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '75%',
    left: '50%',
    width: '1px',
    height: '50%',
    backgroundColor: theme.palette.mode === 'light' ? '#e2e2e2' : '#515151',
    transformOrigin: 'top center',
    zIndex: 1
}))

type EmojiImageProps = {
    isSelected: boolean
}

export const EmojiImage = styled('img')<EmojiImageProps>(({ isSelected }) => ({
    maxWidth: '2rem',
    maxHeight: '2rem',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain', // ensure it won't crop but will preserve aspect ratio
    borderRadius: '50%',
    backgroundColor: isSelected ? 'rgba(255,255,255,0.4)' : 'transparent'
}))
