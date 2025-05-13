import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Polaroid from './Polaroid';
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction';

// Set a fixed height that accommodates all polaroids with wrapped text
const CollectionContainer = styled('div')(() => ({
  position: 'relative',
  width: 'clamp(320px, 36vw, 460px)',
  height: 'clamp(220px, 24vw, 264px)', // responsive height tied to viewport width
  marginTop: '70px',
  marginLeft: 'clamp(20px, 5vw, 120px)',
  pointerEvents: 'auto',
}));

// Simple selection box that exactly matches the container bounds
const SelectionBox = styled('div')(() => ({
  position: 'absolute',
  top: '0px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  border: '2px solid #6675FF',
  borderRadius: '6px',
  backgroundColor: 'rgba(23, 154, 255, 0.05)',
  zIndex: 0,
}));

// Dots at the corners of the selection box
const SelectionDot = styled('div')<{ position: string }>(({ position }) => {
  // Calculate top/left/right/bottom based on position
  const posStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: '-7px', left: '-7px' },
    'top-right': { top: '-7px', right: '-7px' },
    'bottom-left': { bottom: '-7px', left: '-7px' },
    'bottom-right': { bottom: '-7px', right: '-7px' },
  };
  
  return {
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: 'white',
    border: '1px solid #6675FF',
    borderRadius: '0',
    ...posStyles[position],
  };
});

// Utility to clamp scale within [1,3] – replicates logic from useZoomPan
const clampScale = (s: number) => {
  if (s < 1) return 1;
  if (s > 3) return 3;
  return s;
};

export default function PolaroidCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Reuse shared interaction hook
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  } = useZoomPanInteraction(containerRef);

  return (
    <CollectionContainer 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Selection box with corner dots */}
      <SelectionBox>
        <SelectionDot position="top-left" />
        <SelectionDot position="top-right" />
        <SelectionDot position="bottom-left" />
        <SelectionDot position="bottom-right" />
      </SelectionBox>

      {/* Ctrl+Y Polaroid */}
      <Polaroid
        src={`${process.env.PUBLIC_URL}/images/polaroid/ctrly.png`}
        alt="Ctrl+Y"
        title="Ctrl+Y"
        date="Nov 2024 - Current"
        width={140}
        rotationDeg={5.75}
        zIndex={3}
        top="15px"
        left="20px" // Adjusted slightly left
      />

      <Polaroid
        src={`${process.env.PUBLIC_URL}/images/polaroid/dpod.png`}
        alt="dPod"
        title="dPod"
        date="Aug 2019 - Dec 2019"
        width={140}
        rotationDeg={-10}
        zIndex={2}
        top="35px"
        left="160px" // Adjusted position
      />

      {/* LED Basketball Hoop Polaroid */}
      <Polaroid
        src={`${process.env.PUBLIC_URL}/images/polaroid/hoop.png`}
        alt="LED Basketball Hoop"
        title="LED Basketball Hoop"
        date="Sept [wk] 2022"
        width={140} // Slightly smaller
        rotationDeg={2.5}
        zIndex={4}
        top="12px"
        left="302px" // Adjusted horizontal position
      />
    </CollectionContainer>
  );
} 