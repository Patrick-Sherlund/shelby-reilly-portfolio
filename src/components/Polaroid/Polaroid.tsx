import React, { useState, useEffect, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { useZoomPanContext } from '../../context/ZoomPanContext';

interface PolaroidProps {
  src: string;
  alt: string;
  title: string;
  date: string;
  width?: number;
  height?: number;
  rotationDeg?: number;
  zIndex?: number;
  top?: number | string;
  left?: number | string;
  $isVisible?: boolean;
  $delay?: number;
}

const PolaroidWrapper = styled('div')<{
  rotationDeg: number;
  zIndex: number;
  top: number | string;
  left: number | string;
  $isVisible?: boolean;
  $delay?: number;
  $activeTool?: string;
}>(({ rotationDeg, zIndex, top, left, $isVisible, $delay = 0, $activeTool }) => {
  // Only apply animation styles if $isVisible prop is explicitly provided
  const hasAnimation = $isVisible !== undefined;

  // Only set pointerEvents to none when using tools that need to interact with the Konva stage
  const isKonvaToolActive = $activeTool === 'emoji' || $activeTool === 'commenting-cursor';

  return {
    position: 'absolute',
    top,
    left,
    zIndex,
    transform: `rotate(${rotationDeg}deg)`,
    transformOrigin: '50% 50%',
    backgroundColor: '#ffffff',
    padding: '10px 10px 10px 10px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
    display: 'inline-block',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    willChange: 'transform',
    pointerEvents: isKonvaToolActive ? 'none' : 'auto',
    ...(hasAnimation && {
      opacity: $isVisible ? 1 : 0,
      animation: $isVisible ? `bubbleUp-${rotationDeg} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${$delay}s both` : 'none',
      [`@keyframes bubbleUp-${rotationDeg}`]: {
        '0%': {
          opacity: 0,
          transform: `translateY(20px) scale(0.8) rotate(${rotationDeg}deg)`,
        },
        '100%': {
          opacity: 1,
          transform: `translateY(0) scale(1) rotate(${rotationDeg}deg)`,
        }
      }
    }),
    '&:hover': {
      boxShadow: '0 7px 14px rgba(0, 0, 0, 0.2)',
      // straighten to zero when hovered
      transform: 'rotate(0deg) scale(1.1)',
      zIndex: 200,
      cursor: 'pointer',
    },
    '&:focus-visible': {
      boxShadow: '0 7px 14px rgba(0, 0, 0, 0.2)',
      transform: 'rotate(0deg) scale(1.02)',
      outline: 'none',
    },
  };
});

const PolaroidImage = styled('img')<{ aspectRatio: number }>(({ aspectRatio, theme }) => ({
  display: 'block',
  width: '100%',
  height: 'auto',
  aspectRatio: `${aspectRatio}`,
  backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#333',
  userSelect: 'none',
  WebkitUserDrag: 'none',
  userDrag: 'none',
}));

const PolaroidCaption = styled('div')(() => ({
  marginTop: '6px',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '1.2',
  fontFamily: '"Courier New", monospace',
  whiteSpace: 'normal',
  padding: '0 5px',
}));

const PolaroidTitle = styled('div')(() => ({
  fontWeight: 'bold',
  color: '#000',
  marginBottom: '0px',
  fontSize: '12px',
  whiteSpace: 'normal',
}));

const PolaroidDate = styled('div')(() => ({
  fontSize: '11px',
  color: '#555',
  whiteSpace: 'normal',
}));

const Polaroid = forwardRef<HTMLDivElement, PolaroidProps>(({
  src,
  alt,
  title,
  date,
  width = 200,
  height = 180, // kept for API compatibility
  rotationDeg = 0,
  zIndex = 1,
  top = 0,
  left = 0,
  $isVisible,
  $delay,
}, ref) => {
  // Calculate aspect ratio for the image
  const [aspectRatio, setAspectRatio] = useState(1);

  // Get active tool from context (optional - won't error if not in provider)
  let activeTool: string | undefined;
  try {
    const context = useZoomPanContext();
    activeTool = context.activeTool;
  } catch (e) {
    // Not in context, that's fine
    activeTool = undefined;
  }

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (img.naturalHeight !== 0) {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };
  }, [src]);

  return (
    <PolaroidWrapper
      ref={ref}
      rotationDeg={rotationDeg}
      zIndex={zIndex}
      top={top}
      left={left}
      $isVisible={$isVisible}
      $delay={$delay}
      $activeTool={activeTool}
      style={{ width }}
      tabIndex={0}
    >
      <PolaroidImage src={src} alt={alt} aspectRatio={aspectRatio} />
      <PolaroidCaption>
        <PolaroidTitle>{title}</PolaroidTitle>
        <PolaroidDate>{date}</PolaroidDate>
      </PolaroidCaption>
    </PolaroidWrapper>
  );
});

Polaroid.displayName = 'Polaroid';

export default Polaroid;
