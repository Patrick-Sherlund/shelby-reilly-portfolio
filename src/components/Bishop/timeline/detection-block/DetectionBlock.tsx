import React from "react";
import { StyledDetectionBlock, StyledTracksLabel } from "./DetectionBlock.styles";
import { TimelapseTrack } from "../../../models/timeline-detection/TimelapseTrack";
import { GroupedTimelapseTrack } from "../../../models/grouped-timeline-detection/GroupedTimelapseTrack";

interface DetectionBlockProps {
    groupedTimelapseTrack: GroupedTimelapseTrack;
    pixelsPerSecond: number;
    timelineStartTime: number;
    timelineDuration: number;
    totalDuration: number;
    onTimelineDetectionClick?: (timelineDetection: TimelapseTrack) => void;
    isLive?: boolean;
    liveStart?: number;
}

const DetectionBlock: React.FC<DetectionBlockProps> = ({
                                                           groupedTimelapseTrack,
                                                           pixelsPerSecond,
                                                           timelineStartTime,
                                                           timelineDuration,
                                                           totalDuration,
                                                           onTimelineDetectionClick,
                                                           isLive = false,
                                                           liveStart = 0,
                                                       }) => {
    // Convert raw detection times to either live-based or absolute times:
    let rawStart = isLive
        ? groupedTimelapseTrack.startTime - liveStart
        : groupedTimelapseTrack.startTime;
    let rawEnd = isLive
        ? groupedTimelapseTrack.endTime - liveStart
        : groupedTimelapseTrack.endTime;

    // Intersect the detection interval with the visible window [timelineStartTime, timelineStartTime + timelineDuration]:
    const intersectionStart = Math.max(rawStart, timelineStartTime);
    const intersectionEnd = Math.min(rawEnd, timelineStartTime + timelineDuration);

    // If the detection doesn't intersect the visible range, width becomes zero (the block won't render visibly).
    const blockStart = intersectionStart - timelineStartTime;
    const blockEnd = intersectionEnd - timelineStartTime;
    const blockDuration = Math.max(0, blockEnd - blockStart);

    const left = blockStart * pixelsPerSecond;
    const width = blockDuration * pixelsPerSecond;

    // If multiple tracks were merged, show the count.
    const showTrackCount = (groupedTimelapseTrack.uniqueTrackCount ?? 0) > 1;

    // Build a tooltip of distinct names if you like:
    const distinctNames = new Set(
        groupedTimelapseTrack.timelapseTracks.map((t) => t.name)
    );
    const tooltipNames = Array.from(distinctNames).join("\n");

    return (
        <StyledDetectionBlock
            color={groupedTimelapseTrack.color}
            left={left}
            width={width}
            layer={groupedTimelapseTrack.layer ?? 0}
            blockHeight={groupedTimelapseTrack.blockHeight ?? 20}
            data-tip={tooltipNames}
            role="button"
            tabIndex={0}
            // If you want a click handler, you can wire it up here:
            onClick={() => {
                if (onTimelineDetectionClick && groupedTimelapseTrack.timelapseTracks.length) {
                    // Pass whichever TimelapseTrack you want — here is the first one as example
                    onTimelineDetectionClick(groupedTimelapseTrack.timelapseTracks[0]);
                }
            }}
        >
            {showTrackCount && (
                <StyledTracksLabel>
                    {groupedTimelapseTrack.uniqueTrackCount}x
                </StyledTracksLabel>
            )}
        </StyledDetectionBlock>
    );
};

export default React.memo(DetectionBlock);
