import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box} from "@mui/material";
import {animated, useSpring} from "@react-spring/web";

import {TrackedDetectionDto} from "../../models/track/TrackedDetectionDto";
import {DetectionDto} from "../../models/track/DetectionDto";
import {DetectionPointDto} from "../../models/track/DetectionPointDto";
import {CustomTrackedDetectionDto} from "../../models/track/CustomTrackedDetectionDto";

import {
    detailBox,
    detectionLabel,
    overlayContainer,
    subDetectionTooltip,
    svgStyles,
} from "./VideoDetectionsOverlay.styles";


function convertHexToRGBA(hex: string, alpha: number) {

    const cleaned = hex.replace(/^#/, "");

    const bigint = parseInt(cleaned, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
}


const AnimatedDetectionBox: React.FC<{
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth?: number;
    onClick?: (e: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
}> = ({x, y, width, height, fill, stroke, strokeWidth = 1, onClick}) => {

    const [styleProps, api] = useSpring(() => ({
        x,
        y,
        width,
        height,
        config: {tension: 170, friction: 26},
    }));


    useEffect(() => {
        api.start({x, y, width, height});
    }, [x, y, width, height, api]);

    return (
        <animated.rect
            x={styleProps.x}
            y={styleProps.y}
            width={styleProps.width}
            height={styleProps.height}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={{
                pointerEvents: "all",
                cursor: onClick ? "pointer" : "default",
            }}
            onClick={onClick}
        />
    );
};

interface VideoDetectionsOverlayProps {

    trackedDetections: TrackedDetectionDto[];


    currentTimeSec: number;


    originalVideoWidth: number;
    originalVideoHeight: number;


    renderedVideoWidth: number;
    renderedVideoHeight: number;


    onDetectionClick?: (detection: TrackedDetectionDto) => void;


    customDetections?: CustomTrackedDetectionDto[];
}


const VideoDetectionsOverlay: React.FC<VideoDetectionsOverlayProps> = ({
                                                                           trackedDetections,
                                                                           currentTimeSec,
                                                                           originalVideoWidth,
                                                                           originalVideoHeight,
                                                                           renderedVideoWidth,
                                                                           renderedVideoHeight,
                                                                           onDetectionClick,
                                                                           customDetections = [],
                                                                       }) => {
    const [displayedTimeSec, setDisplayedTimeSec] = useState(currentTimeSec);
    useEffect(() => {
        setDisplayedTimeSec(currentTimeSec);
    }, [currentTimeSec]);

    const displayedTimeMs = useMemo(() => displayedTimeSec * 1000, [displayedTimeSec]);

    const [showPending, setShowPending] = useState(false);
    const [showPredicted, setShowPredicted] = useState(false);
    const [openDetailId, setOpenDetailId] = useState<number | null>(null);

    const [hoverTooltip, setHoverTooltip] = useState<{
        x: number;
        y: number;
        text: string;
    } | null>(null);


    const videoAspectRatio = originalVideoWidth / originalVideoHeight;
    const containerAspectRatio = renderedVideoWidth / renderedVideoHeight;

    let displayedVideoWidth = 0;
    let displayedVideoHeight = 0;
    let offsetX = 0;
    let offsetY = 0;

    if (containerAspectRatio > videoAspectRatio) {
        displayedVideoHeight = renderedVideoHeight;
        displayedVideoWidth = displayedVideoHeight * videoAspectRatio;
        offsetX = (renderedVideoWidth - displayedVideoWidth) / 2;
        offsetY = 0;
    } else {
        displayedVideoWidth = renderedVideoWidth;
        displayedVideoHeight = displayedVideoWidth / videoAspectRatio;
        offsetX = 0;
        offsetY = (renderedVideoHeight - displayedVideoHeight) / 2;
    }

    const scaleX = displayedVideoWidth / originalVideoWidth;
    const scaleY = displayedVideoHeight / originalVideoHeight;


    const validStates = ["PENDING", "ACTIVE", "PREDICTED"];
    const closeEnoughDetections = trackedDetections.filter((td) => {
        if (!validStates.includes(td.status)) return false;
        if (!showPending && td.status === "PENDING") return false;
        if (!showPredicted && td.status === "PREDICTED") return false;
        const diff = displayedTimeMs - td.lastUpdateTime;
        return diff >= -20 && diff <= 20;
    });


    const groupedByTrackId: Record<number, TrackedDetectionDto[]> = {};
    closeEnoughDetections.forEach((td) => {
        const {trackId} = td;
        if (!groupedByTrackId[trackId]) {
            groupedByTrackId[trackId] = [];
        }
        groupedByTrackId[trackId].push(td);
    });

    const filteredDetections = Object.values(groupedByTrackId).map((group) => {
        let best = group[0];
        let bestDelta = Math.abs(displayedTimeMs - best.lastUpdateTime);
        for (let i = 1; i < group.length; i++) {
            const candidate = group[i];
            const candidateDelta = Math.abs(displayedTimeMs - candidate.lastUpdateTime);
            if (candidateDelta < bestDelta) {
                best = candidate;
                bestDelta = candidateDelta;
            }
        }
        return best;
    });


    const getColorForDetection = (td: TrackedDetectionDto) => {
        if (td.status === "ACTIVE") {

            const customDet = customDetections.find((cd) => cd.trackId === td.trackId);
            const colorHex = customDet?.color?.trim();

            if (colorHex) {

                return {
                    stroke: colorHex,
                    fill: convertHexToRGBA(colorHex, 0.3),
                };
            } else {

                return {
                    stroke: "#AAAAAA",
                    fill: "rgba(170,170,170,0.3)",
                };
            }
        } else if (td.status === "PENDING") {

            return {stroke: "#456266", fill: "rgba(174,246,255,0.3)"};
        } else if (td.status === "PREDICTED") {

            return {stroke: "#ffd6a5", fill: "rgba(255,214,165,0.3)"};
        }

        return {stroke: "#ddd", fill: "rgba(222,222,222,0.2)"};
    };

    const handleBoundingBoxClick = useCallback(
        (e: React.MouseEvent, td: TrackedDetectionDto) => {
            e.stopPropagation();
            setOpenDetailId((prev) => (prev === td.id ? null : td.id));
            onDetectionClick?.(td);
        },
        [onDetectionClick]
    );

    const handleSubDetectionMouseOver = useCallback((e: React.MouseEvent, sub: DetectionDto) => {
        const svgEl = (e.currentTarget as SVGElement).ownerSVGElement;
        if (!svgEl) return;
        const svgRect = svgEl.getBoundingClientRect();

        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const relX = mouseX - svgRect.left;
        const relY = mouseY - svgRect.top;

        setHoverTooltip({
            x: relX + 8,
            y: relY - 24,
            text: sub.className,
        });
    }, []);

    const handleSubDetectionMouseOut = useCallback(() => {
        setHoverTooltip(null);
    }, []);

    const getPolygonPath = (points: DetectionPointDto[]) => {
        if (!points || points.length < 2) return "";
        const sorted = [...points].sort((a, b) => (a.pointOrder ?? 0) - (b.pointOrder ?? 0));
        let d = `M ${offsetX + sorted[0].x * scaleX},${offsetY + sorted[0].y * scaleY + 8}`;
        for (let i = 1; i < sorted.length; i++) {
            d += ` L ${offsetX + sorted[i].x * scaleX},${offsetY + sorted[i].y * scaleY + 8}`;
        }
        d += " Z";
        return d;
    };

    const getLabelStyle = (
        td: TrackedDetectionDto,
        box: { x: number; y: number; width: number; height: number }
    ) => {
        const bottomY = box.y + box.height;
        const tooCloseToBottom = bottomY > offsetY + displayedVideoHeight - 16;
        const labelTop = tooCloseToBottom ? box.y - 20 : bottomY + 2;
        const labelLeft = box.x + box.width / 2;
        return {
            top: `${labelTop}px`,
            left: `${labelLeft}px`,
            transform: "translateX(-50%)",
        };
    };

    const getDetailBoxStyle = (
        td: TrackedDetectionDto,
        box: { x: number; y: number; width: number; height: number }
    ) => {
        const left = box.x + box.width + 5;
        return {top: `${box.y}px`, left: `${left}px`};
    };


    useEffect(() => {
        const styleEl = document.createElement("style");
        styleEl.textContent = `
          [data-hide-old-labels] [css="detectionLabel"] {
            display: none !important;
          }
        `;
        document.head.appendChild(styleEl);
        return () => {

            if (styleEl.parentNode) {
                styleEl.parentNode.removeChild(styleEl);
            }
        };
    }, []);

    return (


        <Box sx={overlayContainer} data-hide-old-labels>
            <svg css={svgStyles}>
                {filteredDetections.map((td) => {
                    const {stroke, fill} = getColorForDetection(td);

                    const x = offsetX + td.boundingBox.x * scaleX;

                    const y = offsetY + td.boundingBox.y * scaleY + 8;
                    const w = td.boundingBox.width * scaleX;
                    const h = td.boundingBox.height * scaleY;

                    return (
                        <g key={td.id}>
                            <AnimatedDetectionBox
                                x={x}
                                y={y}
                                width={w}
                                height={h}
                                fill={fill}
                                stroke={stroke}
                                strokeWidth={1}
                                onClick={(e) => handleBoundingBoxClick(e, td)}
                            />


                            {/*{td.subDetections.map((sub) => {
                                const subX = offsetX + sub.boundingBox.x * scaleX;
                                const subY = offsetY + sub.boundingBox.y * scaleY + 2;
                                const subW = sub.boundingBox.width * scaleX;
                                const subH = sub.boundingBox.height * scaleY;

                                return (
                                    <g key={sub.id}>
                                        <rect
                                            x={subX}
                                            y={subY}
                                            width={subW}
                                            height={subH}
                                            fill="none"
                                            stroke={stroke}
                                            strokeWidth={1}
                                            style={{ pointerEvents: "all" }}
                                            onMouseOver={(e) => handleSubDetectionMouseOver(e, sub)}
                                            onMouseOut={handleSubDetectionMouseOut}
                                        />
                                        {sub.points && sub.points.length > 2 && (
                                            <path
                                                d={getPolygonPath(sub.points)}
                                                fill={fill}
                                                stroke={stroke}
                                                strokeWidth={1}
                                                style={{ pointerEvents: "all" }}
                                                onMouseOver={(e) => handleSubDetectionMouseOver(e, sub)}
                                                onMouseOut={handleSubDetectionMouseOut}
                                            />
                                        )}
                                    </g>
                                );
                            })}*/}
                        </g>
                    );
                })}
            </svg>


            {filteredDetections.map((td) => {
                if (openDetailId !== td.id) return null;

                const x = offsetX + td.boundingBox.x * scaleX;
                const y = offsetY + td.boundingBox.y * scaleY + 2;
                const w = td.boundingBox.width * scaleX;
                const h = td.boundingBox.height * scaleY;

                const detailPos = getDetailBoxStyle(td, {x, y, width: w, height: h});

                return (
                    <div key={`detail-${td.id}`} css={detailBox} style={detailPos}>
                        <div>
                            <strong>Track ID:</strong> {td.trackId}
                        </div>
                        <div>
                            <strong>Confidence:</strong> {td.confidence.toFixed(3)}
                        </div>
                        <div>
                            <strong>Start:</strong> {td.startTimeMs}ms
                        </div>
                        {td.lastUpdateTime != null && (
                            <div>
                                <strong>Last Update:</strong> {td.lastUpdateTime}ms
                            </div>
                        )}
                    </div>
                );
            })}
            {hoverTooltip && (
                <div
                    css={subDetectionTooltip}
                    style={{top: hoverTooltip.y, left: hoverTooltip.x}}
                >
                    {hoverTooltip.text}
                </div>
            )}

            {filteredDetections.map((td) => {
                const x = offsetX + td.boundingBox.x * scaleX;
                const y = offsetY + td.boundingBox.y * scaleY + 2;
                const w = td.boundingBox.width * scaleX;
                const h = td.boundingBox.height * scaleY;
                const labelPos = getLabelStyle(td, {x, y, width: w, height: h});


                const customDet = customDetections.find((cd) => cd.trackId === td.trackId);
                const customName = customDet?.name?.trim();
                const finalLabel = customName && customName !== ""
                    ? customName
                    : `POI-${td.trackId}`;

                return (
                    <div
                        key={`overlay-label-${td.id}`}
                        css={detectionLabel}
                        style={{
                            ...labelPos,

                            position: "absolute",
                            zIndex: 9999,
                            pointerEvents: "none",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            padding: "2px 6px",
                            borderRadius: "2px",
                        }}
                    >
                        {finalLabel}
                    </div>
                );
            })}
        </Box>
    );
};

export default VideoDetectionsOverlay;
