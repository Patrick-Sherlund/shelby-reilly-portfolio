import React from "react";
import {StyledCurrentTimeLabel, StyledGridLine, StyledTimelineScale,} from "./DetectionTimelineScale.styles";

interface DetectionTimelineScaleProps {
    scaleLabels: number[];
    pixelsPerSecond: number;
    timelineStartTime: number;
    formatLabelTime: (time: number) => string;
    currentTime: number;
}


const DetectionTimelineScale: React.FC<DetectionTimelineScaleProps> = ({
                                                                           scaleLabels,
                                                                           pixelsPerSecond,
                                                                           timelineStartTime,
                                                                           formatLabelTime,
                                                                           currentTime,
                                                                       }) => {

    const formatTimeWithMs = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time - Math.floor(time)) * 1000);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
    };

    return (
        <StyledTimelineScale>
            <StyledCurrentTimeLabel>
                {formatTimeWithMs(currentTime)}
            </StyledCurrentTimeLabel>
            {scaleLabels.map((time, index) => {
                const left = (time - timelineStartTime) * pixelsPerSecond;
                const displayTime = formatLabelTime(time);

                return (
                    <React.Fragment key={index}>
                        <span>{displayTime}</span>
                        <StyledGridLine left={left}/>
                    </React.Fragment>
                );
            })}
        </StyledTimelineScale>
    );
};

export default React.memo(DetectionTimelineScale);