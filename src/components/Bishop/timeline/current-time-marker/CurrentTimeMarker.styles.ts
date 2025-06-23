import styled from 'styled-components';

interface StyledCurrentTimeMarkerProps {
    left: number;
    markerHeight: number;
    isDragging: boolean;
}

export const StyledCurrentTimeMarker = styled.div<StyledCurrentTimeMarkerProps>`
    position: absolute;
    top: 0;
    width: 30px;
    left: ${(props) => props.left}px;
    height: ${(props) => props.markerHeight}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    z-index: 1000;
    transform: translateX(-80%);

    transition: ${(props) => (props.isDragging ? 'none' : 'left 0.25s ease-out')};

    &:focus {
        outline: 2px solid #fff;
    }
`;

export const MarkerPolygon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #90b5fd;
  margin-left: 1px;
  clip-path: polygon(50% 100%, 100% 50%, 100% 0%, 0% 0%, 0% 50%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
  rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

export const MarkerLine = styled.div`
  width: 2px;
  height: 100%;
  align-self: center;
  background-color: #90b5fd;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
