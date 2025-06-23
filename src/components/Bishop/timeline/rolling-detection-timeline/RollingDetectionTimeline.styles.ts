import styled from "styled-components";

interface StyledInnerTimelineProps {
    containerWidth: number;
}

interface StyledTimelineContainerProps {
    isPlaying: boolean;
}

export const StyledTimelineContainer = styled.div<StyledTimelineContainerProps>`
    position: relative;
    margin-top: -1px;
    width: 100%;
    height: 184px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #0e1224;
    user-select: none;
    transition: background-color 0.3s ease;
    touch-action: none;
    padding-right: 15px;
    padding-left: 10px;

    cursor: ${(props) => (props.isPlaying ? "grab" : "default")};

    &:active {
        cursor: ${(props) => (props.isPlaying ? "grabbing" : "default")};
    }
`;

export const StyledInnerTimeline = styled.div<StyledInnerTimelineProps>`
    position: relative;
    width: ${(props) => props.containerWidth}px;
    height: 100%;
    transition: width 0.3s ease;
`;
