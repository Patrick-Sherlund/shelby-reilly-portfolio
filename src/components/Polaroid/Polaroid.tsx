import React, {forwardRef, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {useZoomPanContext} from '../../context/ZoomPanContext';

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
}>(({rotationDeg, zIndex, top, left, $isVisible, $delay = 0, $activeTool, theme}) => {

    const hasAnimation = $isVisible !== undefined;


    const isKonvaToolActive = $activeTool === 'emoji' || $activeTool === 'commenting-cursor';


    const safeRotation = String(rotationDeg).replace('-', 'neg').replace('.', 'p');
    const keyframeName = `bubbleUp-r${safeRotation}`;

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
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out, z-index 0s',
        willChange: 'transform',
        pointerEvents: isKonvaToolActive ? 'none' : 'auto',
        ...(hasAnimation && {
            opacity: $isVisible ? 1 : 0,
            animation: $isVisible ? `${keyframeName} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${$delay}s` : 'none',
            [`@keyframes ${keyframeName}`]: {
                '0%': {
                    opacity: 0,
                    transform: `translateY(20px) scale(0.8) rotate(${rotationDeg}deg)`,
                },
                '100%': {
                    opacity: 1,
                }
            }
        }),
        [theme.breakpoints.up('md')]: {
            '&:hover': {
                boxShadow: '0 7px 14px rgba(0, 0, 0, 0.2)',
                transform: 'rotate(0deg) scale(1.1)',
                zIndex: 200,
                cursor: 'pointer',
            },
            '&:focus-visible': {
                boxShadow: '0 7px 14px rgba(0, 0, 0, 0.2)',
                transform: 'rotate(0deg) scale(1.02)',
                outline: 'none',
            },
        }
    };
});

const PolaroidImage = styled('img')<{ aspectRatio: number }>(({aspectRatio, theme}) => ({
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
    fontFamily: 'Futura, sans-serif',
    whiteSpace: 'normal',
}));

const PolaroidTitle = styled('div')(() => ({
    fontWeight: 700,
    color: '#000',
    marginBottom: '0px',
    fontSize: '10px',
    whiteSpace: 'normal',
    padding: '6px'

}));

const PolaroidDate = styled('div')(() => ({
    fontSize: '11px',
    color: '#000',
    whiteSpace: 'nowrap',
}));

const Polaroid = forwardRef<HTMLDivElement, PolaroidProps>(({
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
                                                                $isVisible,
                                                                $delay,
                                                            }, ref) => {

    const [aspectRatio, setAspectRatio] = useState(1);


    let activeTool: string | undefined;
    try {
        const context = useZoomPanContext();
        activeTool = context.activeTool;
    } catch (e) {

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
            style={{width}}
            tabIndex={0}
        >
            <PolaroidImage src={src} alt={alt} aspectRatio={aspectRatio}/>
            <PolaroidCaption>
                <PolaroidTitle>{title}</PolaroidTitle>
                <PolaroidDate>{date}</PolaroidDate>
            </PolaroidCaption>
        </PolaroidWrapper>
    );
});

Polaroid.displayName = 'Polaroid';

export default Polaroid;
