import { styled } from '@mui/material/styles'

export const PickerContainer = styled('div')(() => ({
    position: 'fixed',
    width: '16rem',
    height: '16rem',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    borderRadius: '50%',
    pointerEvents: 'auto',
    transform: 'translate(-58%, -80%)',
    backgroundImage: `url(${require('../../assets/images/emoji-wheel/emoji-wheel.png')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 9999
}))

export const EmojiSlice = styled('div')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: 'center center',
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'visible'
}))

export const InnerCircle = styled('div')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '5.15rem',
    height: '5.15rem',
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
    backgroundColor: active ? '#7B68EE' : '#242424',
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
    backgroundColor: active ? '#7B68EE' : '#242424',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}))

type EmojiImageProps = {
    isSelected: boolean
}

export const EmojiImage = styled('img')<EmojiImageProps>(({ isSelected }) => ({
    maxWidth: '2.5rem',
    maxHeight: '2.5rem',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain', // ensure it won't crop but will preserve aspect ratio
}))
