import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Polaroid from './Polaroid';
import { useZoomPanContext } from '../../context/ZoomPanContext';

// Set a fixed height that accommodates all polaroids with wrapped text
const CollectionContainer = styled('div')(() => ({
  position: 'relative',
  width: '455px',
  height: '275px', // Adjusted for the more compact polaroids
  marginTop: '0',
  marginLeft: '100px',
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
  const {
    stageRef,
    stageScale,
    setStageScale,
    stagePos,
    setStagePos,
    clampStagePosition,
  } = useZoomPanContext();

  // Refs for drag-to-pan interaction
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const stageStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only respond to left-click
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    stageStartPosRef.current = { ...stagePos };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - dragStartPosRef.current.x;
    const dy = e.clientY - dragStartPosRef.current.y;

    // Update stage position relative to the drag start
    setStagePos({
      x: stageStartPosRef.current.x + dx,
      y: clampStagePosition(stageStartPosRef.current.y + dy),
    });
  };

  const endDrag = () => {
    isDraggingRef.current = false;
  };

  return (
    <CollectionContainer 
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
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