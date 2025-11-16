// PolaroidCollection.tsx
import React, { useRef, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import Polaroid from './Polaroid';
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction';

// How much to enlarge on mobile
const MOBILE_GROUP_SCALE = 1.5;

// How much to offset the group inside the frame on mobile
// (positive X = right, positive Y = down)
const MOBILE_OFFSET_X = 520; // px
const MOBILE_OFFSET_Y = 300; // px

// The container grows with scale so the blue frame stays correct
const CollectionContainer = styled('div')(() => ({
  position: 'relative',
  width: 'calc(clamp(460px, 36vw, 460px) * var(--localScale, 1))',
  height: 'calc(clamp(260px, 24vw, 264px) * var(--localScale, 1))',
  marginTop: '70px',
  marginLeft: 'clamp(140px, 5vw, 120px)',
  pointerEvents: 'auto',
}));

const growFromCorner = keyframes`
  0% { transform: scale(0); }
  80% { transform: scale(1.07); }
  100% { transform: scale(1); }
`;

// Blue selection frame (matches container bounds)
const SelectionBox = styled('div')(() => ({
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  border: '2px solid #5263FF',
  borderRadius: '6px',
  backgroundColor: '#5263FF26',
  zIndex: 0,
  transformOrigin: 'bottom right',
  transform: 'scale(0)',
  animation: `${growFromCorner} 0.8s ease-out forwards`,
}));

const SelectionDot = styled('div')<{ position: string }>(({ position }) => {
  const pos: Record<string, React.CSSProperties> = {
    'top-left': { top: '-7px', left: '-7px' },
    'top-right': { top: '-7px', right: '-7px' },
    'bottom-left': { bottom: '-7px', left: '-7px' },
    'bottom-right': { bottom: '-7px', right: '-7px' },
  };
  return {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: 'white',
    border: '1px solid #5263FF',
    borderRadius: 0,
    ...pos[position],
  };
});

// Scaled + shifted group. We translate first, then scale.
// The translate uses scale-compensation so it's in *visual* pixels.
const PolaroidGroup = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  transformOrigin: 'bottom right',
  transform: `
    translate(
      calc(var(--groupOffsetX, 0px) / var(--localScale, 1)),
      calc(var(--groupOffsetY, 0px) / var(--localScale, 1))
    )
    scale(var(--localScale, 1))
  `,
}));

// Utility to clamp scale within [1,3]
const clampScale = (s: number) => (s < 1 ? 1 : s > 3 ? 3 : s);

export default function PolaroidCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } =
    useZoomPanInteraction(containerRef);

  const [localScale, setLocalScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const compute = () => {
      const mobile = typeof window !== 'undefined' && window.innerWidth < 900;
      setIsMobile(mobile);
      setLocalScale(mobile ? MOBILE_GROUP_SCALE : 1);
    };
    compute();
    window.addEventListener('resize', compute);
    window.addEventListener('orientationchange', compute);
    return () => {
      window.removeEventListener('resize', compute);
      window.removeEventListener('orientationchange', compute);
    };
  }, []);

  useEffect(() => {
    // Trigger all animations at once - the $delay prop in each Polaroid handles the stagger
    const timer = setTimeout(() => {
      setVisibleImages(new Set([0, 1, 2]));
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CollectionContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={
        {
          // scale drives both the frame (container size) and the group transform
          ['--localScale' as any]: localScale,
          // nudge the group inside the frame on mobile
          ['--groupOffsetX' as any]: isMobile ? `${MOBILE_OFFSET_X}px` : '0px',
          ['--groupOffsetY' as any]: isMobile ? `${MOBILE_OFFSET_Y}px` : '0px',
        } as React.CSSProperties
      }
    >
      <SelectionBox>
        <SelectionDot position="top-left" />
        <SelectionDot position="top-right" />
        <SelectionDot position="bottom-left" />
        <SelectionDot position="bottom-right" />
      </SelectionBox>

      <PolaroidGroup>
        <Polaroid
          ref={(el) => (imageRefs.current[2] = el)}
          src={`${process.env.PUBLIC_URL}/images/polaroid/hoop.png`}
          alt="LED Basketball Hoop"
          title="LED Basketball Hoop"
          date="Sept [wk] 2022"
          width={140}
          rotationDeg={2.5}
          zIndex={4}
          top="12px"
          left="302px"
          $isVisible={visibleImages.has(2)}
          $delay={0.1}
        />
        <Polaroid
          ref={(el) => (imageRefs.current[1] = el)}
          src={`${process.env.PUBLIC_URL}/images/polaroid/dpod.png`}
          alt="dPod"
          title="dPod"
          date="Aug 2019 - Dec 2019"
          width={140}
          rotationDeg={-10}
          zIndex={2}
          top="35px"
          left="160px"
          $isVisible={visibleImages.has(1)}
          $delay={0.2}
        />
        <Polaroid
          ref={(el) => (imageRefs.current[0] = el)}
          src={`${process.env.PUBLIC_URL}/images/polaroid/ctrly.png`}
          alt="Ctrl+Y"
          title="Ctrl+Y"
          date="Nov 2024 - Current"
          width={140}
          rotationDeg={5.75}
          zIndex={3}
          top="15px"
          left="20px"
          $isVisible={visibleImages.has(0)}
          $delay={0.3}
        />
      </PolaroidGroup>
    </CollectionContainer>
  );
}
