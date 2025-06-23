import styled from "styled-components";

interface StyledDetectionBlockProps {
    color: string;
    left: number;
    width: number;
    layer: number;
    blockHeight: number;
}

export const StyledDetectionBlock = styled.div<StyledDetectionBlockProps>`
    position: absolute;
    margin-top: 48px;
    top: ${(props) => props.layer * (props.blockHeight + 2)}px;
    left: ${(props) => props.left}px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.blockHeight}px;
    background-color: ${(props) => props.color};
    cursor: pointer;
    border-radius: 4px;
    transition: width 0.3s ease, left 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    &:hover::after,
    &:focus::after {
        content: attr(data-tip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: pre;
        font-size: 12px;
        pointer-events: none;
        z-index: 200;
    }

    &:focus {
        outline: 2px solid #fff;
    }
`;

export const StyledTracksLabel = styled.div`
    position: absolute;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
    z-index: 20;
    top: -14px;
    left: 0;
    margin-left: 2px;
    color: #ffffff;
    font-size: 10px;
`;
