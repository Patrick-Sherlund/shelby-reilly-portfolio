import { styled } from '@mui/material/styles'

// The full-page (or Konva board) wrapper
// We'll stack the polaroid (top) and text (middle) vertically
export const MainWrapper = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',   // vertical stack
    alignItems: 'center',      // horizontally center each block
    justifyContent: 'center'   // will center them in the vertical space
}))

/*
  A separate section for the polaroid, in the normal flow,
  so it pushes the text downward. We add vertical margin for extra space.
  Then we shift it 80px to the right from center with transform.
*/
export const PolaroidContainer = styled('div')(() => ({
    margin: '-60px 0 50px 0',     // reduced bottom margin from 80px to 50px (~15% reduction)
    transform: 'translateX(5vw)', // responsive shift relative to viewport width
    pointerEvents: 'auto',        // Make sure polaroids are clickable
}))

// Container holding the text blocks in a vertical stack
export const TextsWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // keep text left-aligned as before
    gap: 'clamp(12px, 2vw, 24px)',
    transform: 'translate(-9vw, -9vh)' // responsive shift relative to viewport size
}))

// Each text container with #6675FF background, 16px padding, 4px corner radius
export const SingleTextContainer = styled('div')(() => ({
    position: 'relative',
    backgroundColor: '#6675FF',
    borderRadius: 4,
    padding: '16px',
    fontSize: 'clamp(32px, 6vw, 64px)',
    fontFamily: 'Futura, sans-serif',
    color: '#FFFFFF',
    lineHeight: 1.2
}))

// Sparkles pinned so the bottom-right corner aligns with the container's top-left
export const SparklesImage = styled('img')(() => ({
    position: 'absolute',
    bottom: '70%',
    right: '60%'
}))

// "I'm a Product Designer" line
// export const ProductDesignerText = styled('div')(({ theme }) => ({
//     fontFamily: '"Gloria Hallelujah", Futura, cursive',
//     fontSize: 'clamp(18px, 2vw, 28px)',
//     color: theme.palette.text.primary
// }))
