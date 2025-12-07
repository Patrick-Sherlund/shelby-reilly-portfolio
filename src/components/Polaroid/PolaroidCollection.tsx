import React, {useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import {keyframes} from '@mui/system';
import Polaroid from './Polaroid';
import {useZoomPanInteraction} from '../../hooks/useZoomPanInteraction';


const MOBILE_GROUP_SCALE = 1.5;


const MOBILE_OFFSET_X = 520;
const MOBILE_OFFSET_Y = 300;


const CollectionContainer = styled('div')(() => ({
    position: 'relative',
    width: 'calc(clamp(460px, 36vw, 460px) * var(--localScale, 1))',
    height: 'calc(clamp(260px, 24vw, 264px) * var(--localScale, 1))',
    marginTop: '70px',
    marginLeft: 'clamp(140px, 5vw, 120px)',
    pointerEvents: 'auto',
    zIndex: 10,
}));

const growFromCorner = keyframes`
    0% {
        transform: scale(0);
    }
    80% {
        transform: scale(1.07);
    }
    100% {
        transform: scale(1);
    }
`;

const shuffleIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;


const SelectionBox = styled('div')<{ $isExpanded?: boolean; $isMobile?: boolean }>(({ $isExpanded, $isMobile }) => ({
    position: 'absolute',
    top: 0, left: 0, right: 0,
    bottom: $isExpanded ? ($isMobile ? '-240px' : '-150px') : '24px',
    border: '2px solid #5263FF',
    borderRadius: '6px',
    backgroundColor: '#5263FF26',
    zIndex: 0,
    transformOrigin: 'bottom right',
    transform: 'scale(0)',
    animation: `${growFromCorner} 0.8s ease-out forwards`,
    transition: 'bottom 0.3s ease-in-out',
}));

const SelectionDot = styled('div')<{ position: string }>(({position}) => {
    const pos: Record<string, React.CSSProperties> = {
        'top-left': {top: '-7px', left: '-7px'},
        'top-right': {top: '-7px', right: '-7px'},
        'bottom-left': {bottom: '-7px', left: '-7px'},
        'bottom-right': {bottom: '-7px', right: '-7px'},
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


const clampScale = (s: number) => (s < 1 ? 1 : s > 3 ? 3 : s);

export default function PolaroidCollection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const {handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave} =
        useZoomPanInteraction(containerRef);

    const [localScale, setLocalScale] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
    const [showHiddenPolaroids, setShowHiddenPolaroids] = useState(false);
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

                    ['--localScale' as any]: localScale,

                    ['--groupOffsetX' as any]: isMobile ? `${MOBILE_OFFSET_X}px` : '0px',
                    ['--groupOffsetY' as any]: isMobile ? `${MOBILE_OFFSET_Y}px` : '0px',
                } as React.CSSProperties
            }
        >
            <SelectionBox $isExpanded={showHiddenPolaroids} $isMobile={isMobile}>
                <SelectionDot position="top-left"/>
                <SelectionDot position="top-right"/>
                <SelectionDot position="bottom-left"/>
                <SelectionDot position="bottom-right"/>
            </SelectionBox>

            <PolaroidGroup
                onMouseEnter={() => setShowHiddenPolaroids(true)}
                onMouseLeave={() => setShowHiddenPolaroids(false)}
                onTouchStart={() => setShowHiddenPolaroids(true)}
            >
                {/* Hidden polaroids - appear on hover/tap below originals */}
                {showHiddenPolaroids && (
                    <>
                        <Polaroid
                            src={`${process.env.PUBLIC_URL}/images/polaroid/shelby-design-jam-polaroid.png`}
                            alt="Design Community Advocate"
                            title="Design Community Advocate"
                            date="Austin Design Jam 2025"
                            width={140}
                            rotationDeg={-5.4}
                            zIndex={1}
                            top="202px"
                            left="302px"
                            $isVisible={true}
                            $delay={0}
                        />
                        <Polaroid
                            src={`${process.env.PUBLIC_URL}/images/polaroid/shelby-mission-polaroid.png`}
                            alt="Mission Planning App"
                            title="Mission Planning App"
                            date="US Air Force 2020-2022"
                            width={140}
                            rotationDeg={2.74}
                            zIndex={1}
                            top="205px"
                            left="160px"
                            $isVisible={true}
                            $delay={0}
                        />
                        <Polaroid
                            src={`${process.env.PUBLIC_URL}/images/polaroid/shelby-industrial-design.png`}
                            alt="Industrial Design"
                            title="Industrial Design"
                            date="MS HCI: 2021"
                            width={140}
                            rotationDeg={15}
                            zIndex={1}
                            top="205px"
                            left="20px"
                            $isVisible={true}
                            $delay={0}
                        />
                    </>
                )}

                {/* Original polaroids - always visible */}
                <Polaroid
                    ref={(el) => (imageRefs.current[2] = el)}
                    src={`${process.env.PUBLIC_URL}/images/polaroid/shelby-jamba-polaroid.png`}
                    alt="Jamba Juice Mobile"
                    title="Jamba Juice Mobile"
                    date="MS HCI: 2021"
                    width={140}
                    rotationDeg={2.5}
                    zIndex={4}
                    top="32px"
                    left="302px"
                    $isVisible={visibleImages.has(2)}
                    $delay={0.1}
                />
                <Polaroid
                    ref={(el) => (imageRefs.current[1] = el)}
                    src={`${process.env.PUBLIC_URL}/images/polaroid/shelby-vmware-polaroid.png`}
                    alt="VMware"
                    title="VMware"
                    date="Sep 2022 - Apr 2025"
                    width={146}
                    rotationDeg={-10}
                    zIndex={2}
                    top="20px"
                    left="154px"
                    $isVisible={visibleImages.has(1)}
                    $delay={0.2}
                />
                <Polaroid
                    ref={(el) => (imageRefs.current[0] = el)}
                    src={`${process.env.PUBLIC_URL}/images/polaroid/shelby-drone-polaroid.png`}
                    alt="Ctrl+Y: Drones + AI"
                    title="Ctrl+Y: Drones + AI"
                    date="Nov 2024 - May 2025"
                    width={140}
                    rotationDeg={5.75}
                    zIndex={3}
                    top="35px"
                    left="20px"
                    $isVisible={visibleImages.has(0)}
                    $delay={0.3}
                />
            </PolaroidGroup>
        </CollectionContainer>
    );
}
