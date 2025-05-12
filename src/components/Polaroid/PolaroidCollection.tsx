import React from 'react';
import { styled } from '@mui/material/styles';
import Polaroid from './Polaroid';

const CollectionContainer = styled('div')(() => ({
  position: 'relative',
  width: '450px',
  height: '290px',
  marginTop: '15px',
}));

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
  pointerEvents: 'none', // Allow clicking through to polaroids
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

export default function PolaroidCollection() {
  return (
    <CollectionContainer>
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
        width={142}
        rotationDeg={-3}
        zIndex={2}
        top="20px"
        left="15px"
      />

      {/* iPod Polaroid */}
      <Polaroid
        src={`${process.env.PUBLIC_URL}/images/polaroid/dpod.png`}
        alt="iPod"
        title="iPod"
        date="Aug 2019 - Dec 2019"
        width={132}
        rotationDeg={3}
        zIndex={3}
        top="45px"
        left="150px"
      />

      {/* LED Basketball Hoop Polaroid */}
      <Polaroid
        src={`${process.env.PUBLIC_URL}/images/polaroid/hoop.png`}
        alt="LED Basketball Hoop"
        title="LED Basketball Hoop"
        date="Sept [wk] 2022"
        width={138}
        rotationDeg={-2}
        zIndex={1}
        top="15px"
        left="275px"
      />
    </CollectionContainer>
  );
} 