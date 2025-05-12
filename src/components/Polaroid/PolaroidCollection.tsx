import React from 'react';
import { styled } from '@mui/material/styles';
import Polaroid from './Polaroid';
import { useZoomPanContext } from '../../context/ZoomPanContext';

// Set a fixed height that accommodates all polaroids with wrapped text
const CollectionContainer = styled('div')(() => ({
  position: 'relative',
  width: '380px',
  height: '275px', // Adjusted for the more compact polaroids
  marginTop: '0',
  marginLeft: '15px',
  // Allow wheel events but still remain clickable
  pointerEvents: 'auto',
}));

// Simple selection box that exactly matches the container bounds
const SelectionBox = styled('div')(() => ({
  position: 'absolute',
  top: '0px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  border: '2px solid #179AFF',
  borderRadius: '6px',
  backgroundColor: 'rgba(23, 154, 255, 0.05)',
  zIndex: 0,
}));

// Dots at the corners of the selection box
const SelectionDot = styled('div')<{ position: string }>(({ position }) => {
  // Calculate top/left/right/bottom based on position
  const posStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: '-5px', left: '-5px' },
    'top-right': { top: '-5px', right: '-5px' },
    'bottom-left': { bottom: '-5px', left: '-5px' },
    'bottom-right': { bottom: '-5px', right: '-5px' },
  };
  
  return {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: 'white',
    border: '1px solid #179AFF',
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
  const {
    stageRef,
    stageScale,
    setStageScale,
    stagePos,
    setStagePos,
    clampStagePosition,
  } = useZoomPanContext();

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Prevent default scrolling behaviour
    e.preventDefault();

    const deltaY = e.deltaY;

    // When Ctrl/Cmd is pressed treat as zoom, otherwise vertical scroll (pan)
    if (e.ctrlKey || e.metaKey) {
      if (!stageRef.current) return;

      const oldScale = stageScale;
      const newScale = clampScale(oldScale - deltaY * 0.01);

      if (newScale === oldScale) return;

      const pointerPosition = { x: e.clientX, y: e.clientY };
      const stage = stageRef.current;

      const mousePointTo = {
        x: (pointerPosition.x - stage.x()) / oldScale,
        y: (pointerPosition.y - stage.y()) / oldScale,
      };

      const newPos = {
        x: pointerPosition.x - mousePointTo.x * newScale,
        y: pointerPosition.y - mousePointTo.y * newScale,
      };

      newPos.y = clampStagePosition(newPos.y);

      setStageScale(newScale);
      setStagePos(newPos);
    } else {
      // Vertical pan
      setStagePos(prev => {
        const newY = clampStagePosition(prev.y - deltaY);
        return { x: prev.x, y: newY };
      });
    }
  };

  return (
    <CollectionContainer onWheel={handleWheel}>
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
        width={115}
        rotationDeg={-3}
        zIndex={2}
        top="15px"
        left="5px" // Adjusted slightly left
      />

      <Polaroid
        src={`${process.env.PUBLIC_URL}/images/polaroid/dpod.png`}
        alt="dPod"
        title="dPod"
        date="Aug 2019 - Dec 2019"
        width={105}
        rotationDeg={3}
        zIndex={3}
        top="35px"
        left="115px" // Adjusted position
      />

      {/* LED Basketball Hoop Polaroid */}
      <Polaroid
        src={`${process.env.PUBLIC_URL}/images/polaroid/hoop.png`}
        alt="LED Basketball Hoop"
        title="LED Basketball Hoop"
        date="Sept [wk] 2022"
        width={120} // Slightly smaller
        rotationDeg={-2}
        zIndex={1}
        top="12px"
        left="217px" // Adjusted horizontal position
      />
    </CollectionContainer>
  );
} 