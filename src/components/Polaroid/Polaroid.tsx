import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

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
}

const PolaroidWrapper = styled('div')<{
  rotationDeg: number;
  zIndex: number;
  top: number | string;
  left: number | string;
}>(({ rotationDeg, zIndex, top, left }) => ({
  position: 'absolute',
  top,
  left,
  zIndex,
  transform: `rotate(${rotationDeg}deg)`,
  backgroundColor: '#ffffff',
  padding: '10px 10px 10px 10px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
  display: 'inline-block',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 7px 14px rgba(0, 0, 0, 0.2)',
    transform: `rotate(${rotationDeg}deg) scale(1.02)`,
    cursor: 'pointer',
  }
}));

const PolaroidImage = styled('img')<{ aspectRatio: number }>(({ aspectRatio, theme }) => ({
  display: 'block',
  width: '100%',
  height: 'auto',
  aspectRatio: `${aspectRatio}`,
  backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#333',
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
  fontSize: '13px',
  whiteSpace: 'normal',
}));

const PolaroidDate = styled('div')(() => ({
  fontSize: '11px',
  color: '#555',
  whiteSpace: 'normal',
}));

export default function Polaroid({
  src,
  alt,
  title,
  date,
  width = 200,
  height = 180,
  rotationDeg = 0,
  zIndex = 1,
  top = 0,
  left = 0,
}: PolaroidProps) {
  // Calculate aspect ratio for the image
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    // Load the image to get its natural dimensions
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };
  }, [src]);

  return (
    <PolaroidWrapper
      rotationDeg={rotationDeg}
      zIndex={zIndex}
      top={top}
      left={left}
      style={{ width }}
    >
      <PolaroidImage
        src={src}
        alt={alt}
        aspectRatio={aspectRatio}
      />
      <PolaroidCaption>
        <PolaroidTitle>{title}</PolaroidTitle>
        <PolaroidDate>{date}</PolaroidDate>
      </PolaroidCaption>
    </PolaroidWrapper>
  );
} 