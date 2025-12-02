import {styled} from '@mui/material/styles'

interface CarouselContainerProps {
    $height: number | string
    $isDragging: boolean
}

interface IPhoneWrapperProps {
    $height: number
    $zIndex: number
}

export const CarouselContainer = styled('div')<CarouselContainerProps>(({$height, $isDragging}) => ({
    position: 'relative',
    width: '100%',
    height: typeof $height === 'number' ? `${$height}px` : $height,
    overflow: 'hidden',
    cursor: $isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'pan-y',
    WebkitOverflowScrolling: 'touch',
}))

export const CarouselTrack = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    height: '100%'
}))

export const IPhoneWrapper = styled('div')<IPhoneWrapperProps>(({$height, $zIndex}) => ({
    position: 'absolute',
    height: `${$height}px`,
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: $zIndex,
    top: '50%',
    left: -50,
    willChange: 'transform, height'

}))

export const IPhoneImage = styled('img')(() => ({
    height: '100%',
    width: 'auto',
    objectFit: 'contain',
    display: 'block',
    filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.65))',
    userSelect: 'none',
    pointerEvents: 'none'
}))
