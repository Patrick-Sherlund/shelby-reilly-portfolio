import React, {useMemo} from "react";
import {HoverMarkerLine, StyledHoverTimeMarker} from "./HoverTimeMarker.styles";
import {formatTime} from "../../../utils/formatTime";

interface HoverTimeMarkerProps {
    hoverTime: number;
    timelineStartTime: number;
    pixelsPerSecond: number;
    containerWidth: number;
    timelineDuration: number;
}


const HoverTimeMarker: React.FC<HoverTimeMarkerProps> = ({
                                                             hoverTime,
                                                             timelineStartTime,
                                                             pixelsPerSecond,
                                                             containerWidth,
                                                             timelineDuration,
                                                         }) => {
    const hoverMarkerX = useMemo(() => {
        const x = (hoverTime - timelineStartTime) * pixelsPerSecond;
        return Math.min(Math.max(x, 0), containerWidth);
    }, [hoverTime, timelineStartTime, pixelsPerSecond, containerWidth]);

    return (
        <StyledHoverTimeMarker
            left={hoverMarkerX}
            markerHeight={184}
            role="presentation"
            aria-label={`Hover time: ${formatTime(hoverTime)}`}
        >
            <HoverMarkerLine/>
        </StyledHoverTimeMarker>
    );
};

export default HoverTimeMarker;
