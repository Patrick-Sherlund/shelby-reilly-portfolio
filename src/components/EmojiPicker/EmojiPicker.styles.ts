import {styled} from '@mui/material/styles'
import {keyframes} from '@mui/system'

const wheelReveal = keyframes`
    0% {
        clip-path: circle(2.575rem at center);
    }
    100% {
        clip-path: circle(8rem at center);
    }
`

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
    zIndex: 9999,
    clipPath: 'circle(2.575rem at center)',
    '&.animating': {
        animation: `${wheelReveal} 0.25s ease-out forwards`
    }
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

export const TopHalf = styled('div')<{ active: boolean }>(({active}) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: active ? '#6674FF' : '#242424',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}))

export const BottomHalf = styled('div')<{ active: boolean }>(({active}) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: active ? '#6674FF' : '#242424',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}))

type EmojiImageProps = {
    isSelected: boolean
}

export const EmojiImage = styled('img')<EmojiImageProps>(({isSelected}) => ({
    maxWidth: '2.5rem',
    maxHeight: '2.5rem',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
}))
