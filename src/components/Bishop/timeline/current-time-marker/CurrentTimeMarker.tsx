import React, {useMemo} from "react";
import {MarkerLine, MarkerPolygon, StyledCurrentTimeMarker} from "./CurrentTimeMarker.styles";
import {formatTime} from "../../../utils/formatTime";
import {useTimeMarkerDrag} from "../../../hooks/useTimeMarkerDrag";

interface CurrentTimeMarkerProps {
    markerTime: number;
    setMarkerTime: (time: number) => void;
    timelineStartTime: number;
    pixelsPerSecond: number;
    containerWidth: number;
    timelineDuration: number;
    onDragEnd?: () => void;
    onDragStart?: () => void;
    isDragging: boolean;
}


const CurrentTimeMarker: React.FC<CurrentTimeMarkerProps> = ({
                                                                 markerTime,
                                                                 setMarkerTime,
                                                                 timelineStartTime,
                                                                 pixelsPerSecond,
                                                                 containerWidth,
                                                                 timelineDuration,
                                                                 onDragEnd,
                                                                 onDragStart,
                                                                 isDragging,
                                                             }) => {
    const {handleMouseDown, handleTouchStart} = useTimeMarkerDrag({
        setMarkerTime,
        timelineStartTime,
        pixelsPerSecond,
        containerWidth,
        timelineDuration,
        onDragStart,
        onDragEnd,
    });

    const markerXPosition = useMemo(() => {
        const rawX = (markerTime - timelineStartTime) * pixelsPerSecond;
        return Math.min(Math.max(rawX, 0), containerWidth);
    }, [markerTime, timelineStartTime, pixelsPerSecond, containerWidth]);

    return (
        <StyledCurrentTimeMarker
            left={markerXPosition}
            markerHeight={184}
            isDragging={isDragging}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            tabIndex={0}
            role="button"
            aria-label={`Current time: ${formatTime(markerTime)} seconds`}
        >
            <MarkerPolygon/>
            <MarkerLine/>
        </StyledCurrentTimeMarker>
    );
};

export default CurrentTimeMarker;
