import styled from 'styled-components';

interface StyledHoverTimeMarkerProps {
    left: number;
    markerHeight: number;
}

export const StyledHoverTimeMarker = styled.div<StyledHoverTimeMarkerProps>`
    position: absolute;
    top: 0;
    width: 30px;
    left: ${(props) => props.left}px;
    height: ${(props) => props.markerHeight}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
    z-index: 1200;
    opacity: 0.7;
    transform: translateX(-80%);
`;


export const HoverMarkerLine = styled.div`
    width: 2px;
    height: 100%;
    background-color: #90b5fd;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
