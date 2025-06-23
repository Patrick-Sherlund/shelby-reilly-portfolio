import React, {useCallback, useEffect, useMemo, useRef, useState,} from "react";
import {Stack} from "@mui/material";


import useContainerWidth from "../../../hooks/useContainerWidth";
import {usePanAndZoom} from "../../../hooks/usePanAndZoom";
import {useTouchHandler} from "../../../hooks/useTouchHandler";
import {useGroupedDetections} from "../../../hooks/useGroupedDetections";


import {formatTime} from "../../../utils/formatTime";
import {clamp} from "../../../utils/clamp";


import {TimelapseTrack} from "../../../models/timeline-detection/TimelapseTrack";


import DetectionBlock from "../detection-block/DetectionBlock";
import DetectionTimelineScale from "../detection-timeline-scale/DetectionTimelineScale";
import CurrentTimeMarker from "../current-time-marker/CurrentTimeMarker";
import HoverTimeMarker from "../hover-time-marker/HoverTimeMarker";
import FrameThumbnails from "../../frame-thumbnails/FrameThumbnails";


import {StyledInnerTimeline, StyledTimelineContainer,} from "./RollingDetectionTimeline.styles";


interface RollingDetectionTimelineProps {
    timelapseTracks: TimelapseTrack[];
    currentTime: number;
    timelineDuration: number;
    totalDuration?: number;

    onDetectionClick?: (timelineDetection: TimelapseTrack) => void;
    onZoomChange?: (newDuration: number) => void;
    onPause?: () => void;
    onMarkerDragStart?: () => void;
    onMarkerDrag?: (newTime: number) => void;
    isLive?: boolean;
    liveStart?: number;
    liveEnd?: number;
    atLiveEdge?: boolean;
    isPlaying?: boolean;
    onHoverTimeChange?: (time: number) => void;
    videoId?: number;
    thumbnailWidth?: number;
    thumbnailHeight?: number;
}

const RollingDetectionTimeline: React.FC<RollingDetectionTimelineProps> = ({
                                                                               timelapseTracks,
                                                                               currentTime,
                                                                               timelineDuration,
                                                                               totalDuration,

                                                                               onDetectionClick,
                                                                               onZoomChange,
                                                                               onPause,
                                                                               onMarkerDragStart,
                                                                               onMarkerDrag,
                                                                               isLive = false,
                                                                               liveStart = 0,
                                                                               liveEnd,
                                                                               atLiveEdge,
                                                                               isPlaying = true,
                                                                               onHoverTimeChange,
                                                                               videoId = -1,
                                                                               thumbnailWidth,
                                                                               thumbnailHeight,
                                                                           }) => {

    const TIME_MARKER_PADDING = 0;
    const MAX_SECONDS_PER_DIVIDER = 5;
    const MAX_DIVIDERS = 100;
    const NUMBER_OF_DETECTION_LAYERS = 4;

    const containerRef = useRef<HTMLDivElement>(null);

    const containerWidth = useContainerWidth(containerRef);


    const adjustedTimelineDuration = useMemo(() => {
        if (isLive && liveEnd !== undefined && liveStart !== undefined) {
            const liveRange = liveEnd - liveStart;
            return isFinite(liveRange) ? Math.max(0, liveRange) : 5;
        } else {
            return timelineDuration;
        }
    }, [isLive, liveEnd, liveStart, timelineDuration]);

    const totalAdjustedDuration = useMemo(() => {
        return totalDuration || timelineDuration;
    }, [totalDuration, timelineDuration]);


    const {handleMouseDown, panOffset, setPanOffset, handleWheel} = usePanAndZoom({
        pixelsPerSecond: containerWidth / adjustedTimelineDuration,
        timelineDuration: adjustedTimelineDuration,
        adjustedTimelineDuration: totalAdjustedDuration,
        onZoomChange,
    });


    const {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useTouchHandler({
        onZoomChange,
        timelineDuration: adjustedTimelineDuration,
        totalDuration: totalAdjustedDuration,
    });


    const timelineStartTime = useMemo(() => {
        return clamp(
            panOffset,
            0,
            totalAdjustedDuration - adjustedTimelineDuration
        );
    }, [panOffset, totalAdjustedDuration, adjustedTimelineDuration]);


    const numberOfDividers = useMemo(() => {
        const calcDiv = Math.max(
            5,
            Math.ceil(adjustedTimelineDuration / MAX_SECONDS_PER_DIVIDER)
        );
        return Math.min(calcDiv, MAX_DIVIDERS);
    }, [adjustedTimelineDuration]);

    const dividerInterval = useMemo(() => {
        const interval = adjustedTimelineDuration / numberOfDividers;
        return isFinite(interval) && interval > 0 ? interval : 1;
    }, [adjustedTimelineDuration, numberOfDividers]);

    const pixelsPerSecond = useMemo(() => {
        return containerWidth / adjustedTimelineDuration;
    }, [containerWidth, adjustedTimelineDuration]);


    const scaleLabels = useMemo(() => {
        const labels: number[] = [];
        for (let i = 0; i <= numberOfDividers; i++) {
            const labelTime = timelineStartTime + i * dividerInterval;
            if (isFinite(labelTime) && labelTime >= 0) {
                labels.push(labelTime);
            }
        }
        return labels;
    }, [timelineStartTime, numberOfDividers, dividerInterval]);


    const stackedTimelineDetections = useGroupedDetections(
        timelapseTracks,
        timelineStartTime,
        adjustedTimelineDuration,

        NUMBER_OF_DETECTION_LAYERS
    );


    const detectionBlocks = useMemo(() => {
        return stackedTimelineDetections.map((group) => ({
            groupedTimelapseTrack: group,
            pixelsPerSecond,
            timelineStartTime,
            timelineDuration: adjustedTimelineDuration,
        }));
    }, [
        stackedTimelineDetections,
        pixelsPerSecond,
        timelineStartTime,
        adjustedTimelineDuration,
        timelapseTracks,
    ]);


    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const wheelHandler = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
            handleWheel(e);
        };

        container.addEventListener("wheel", wheelHandler, {
            passive: false,
            capture: true,
        });

        return () => {
            container.removeEventListener("wheel", wheelHandler);
        };
    }, [handleWheel]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        container.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        container.addEventListener("touchend", handleTouchEnd, {
            passive: false,
        });
        container.addEventListener("touchcancel", handleTouchEnd, {
            passive: false,
        });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
            container.removeEventListener("touchcancel", handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);


    const [markerTime, setMarkerTime] = useState<number>(currentTime);
    const [isDraggingMarker, setIsDraggingMarker] = useState<boolean>(false);


    useEffect(() => {
        setMarkerTime(currentTime);
    }, [currentTime]);


    useEffect(() => {
        const newMarkerTime = markerTime;
        const visibleStart = timelineStartTime;
        const visibleEnd = timelineStartTime + adjustedTimelineDuration;
        const currentPadding = isDraggingMarker ? TIME_MARKER_PADDING : 0;


        if (newMarkerTime < visibleStart + currentPadding) {
            const desiredStart = clamp(
                newMarkerTime - TIME_MARKER_PADDING,
                0,
                totalAdjustedDuration - adjustedTimelineDuration
            );
            setPanOffset(desiredStart);
        } else if (newMarkerTime > visibleEnd - currentPadding) {
            const desiredStart = clamp(
                newMarkerTime - adjustedTimelineDuration + currentPadding,
                0,
                totalAdjustedDuration - adjustedTimelineDuration
            );
            setPanOffset(desiredStart);
        }
    }, [
        markerTime,
        timelineStartTime,
        adjustedTimelineDuration,
        totalAdjustedDuration,
        setPanOffset,
        isDraggingMarker,
    ]);


    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [isHovering, setIsHovering] = useState<boolean>(false);


    useEffect(() => {
        if (isPlaying) {
            setHoverTime(null);
            setIsHovering(false);
        }
    }, [isPlaying]);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        setHoverTime(null);


        if (!isPlaying && onHoverTimeChange && markerTime !== null) {
            onHoverTimeChange(markerTime);
        }
    }, [isPlaying, onHoverTimeChange, markerTime]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!containerRef.current) return;


            if (!isPlaying) {
                const rect = containerRef.current.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                let newHoverTime = timelineStartTime + offsetX / pixelsPerSecond;


                newHoverTime = clamp(
                    newHoverTime,
                    timelineStartTime,
                    timelineStartTime + adjustedTimelineDuration
                );

                setHoverTime(newHoverTime);

                if (onHoverTimeChange) {
                    onHoverTimeChange(newHoverTime);
                }
            }
        },
        [
            isPlaying,
            containerRef,
            timelineStartTime,
            pixelsPerSecond,
            adjustedTimelineDuration,
            onHoverTimeChange,
        ]
    );


    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!isPlaying && hoverTime != null) {
                setMarkerTime(hoverTime);
                if (onMarkerDrag) onMarkerDrag(hoverTime);
            }
        },
        [isPlaying, hoverTime, onMarkerDrag]
    );


    return (
        <Stack
            sx={{contain: "inline-size"}}
            alignItems="center"
            bottom={0}
            flexDirection="column"
            display="flex"
        >
            <Stack
                minWidth="100%"
                maxWidth="100%"
                flexDirection="row"
                display="flex"
            >
                <StyledTimelineContainer
                    ref={containerRef}
                    isPlaying={isPlaying}
                    onMouseDown={handleMouseDown}
                    onDoubleClick={(e) => e.preventDefault()}
                    id="timeline-container"
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                >
                    {containerWidth > 0 && (
                        <>
                            <StyledInnerTimeline containerWidth={containerWidth}>

                                <DetectionTimelineScale
                                    currentTime={currentTime}
                                    scaleLabels={scaleLabels}
                                    pixelsPerSecond={pixelsPerSecond}
                                    timelineStartTime={timelineStartTime}
                                    formatLabelTime={formatTime}
                                />


                                {detectionBlocks.map(({groupedTimelapseTrack}) => (
                                    <DetectionBlock
                                        key={`${groupedTimelapseTrack.endTime}-${groupedTimelapseTrack.trackId}-${groupedTimelapseTrack.color}`}
                                        groupedTimelapseTrack={{
                                            ...groupedTimelapseTrack,
                                            blockHeight: 8,
                                        }}
                                        totalDuration={totalDuration}
                                        pixelsPerSecond={pixelsPerSecond}
                                        timelineStartTime={timelineStartTime}
                                        timelineDuration={adjustedTimelineDuration}
                                        onTimelineDetectionClick={onDetectionClick}
                                    />
                                ))}


                                <FrameThumbnails
                                    videoId={videoId}
                                    timelineStartTime={timelineStartTime}
                                    totalTimelineDuration={adjustedTimelineDuration}
                                    pixelsPerSecond={pixelsPerSecond}
                                    totalTimelineWidth={containerWidth}
                                    isLive={isLive}
                                    liveStart={liveStart}
                                    liveEnd={liveEnd ?? 0}
                                    thumbnailWidth={thumbnailWidth ?? 160}
                                    thumbnailHeight={thumbnailHeight ?? 90}
                                />


                                <CurrentTimeMarker
                                    markerTime={markerTime}
                                    setMarkerTime={(newTime) => {
                                        setMarkerTime(newTime);
                                        if (onMarkerDrag) onMarkerDrag(newTime);
                                    }}
                                    timelineStartTime={timelineStartTime}
                                    pixelsPerSecond={pixelsPerSecond}
                                    containerWidth={containerWidth}
                                    timelineDuration={adjustedTimelineDuration}
                                    onDragStart={() => {
                                        setIsDraggingMarker(true);
                                        if (onMarkerDragStart) onMarkerDragStart();
                                    }}
                                    onDragEnd={() => {
                                        setIsDraggingMarker(false);
                                    }}
                                    isDragging={isDraggingMarker}
                                />


                                {!isPlaying &&
                                    !isDraggingMarker &&
                                    isHovering &&
                                    hoverTime !== null && (
                                        <HoverTimeMarker
                                            hoverTime={hoverTime}
                                            timelineStartTime={timelineStartTime}
                                            pixelsPerSecond={pixelsPerSecond}
                                            containerWidth={containerWidth}
                                            timelineDuration={adjustedTimelineDuration}
                                        />
                                    )}
                            </StyledInnerTimeline>
                        </>
                    )}
                </StyledTimelineContainer>
            </Stack>
        </Stack>
    );
};

export default RollingDetectionTimeline;
