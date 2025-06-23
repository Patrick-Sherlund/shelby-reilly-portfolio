import styled from 'styled-components';

export const StyledTimelineScale = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 48px;
    background-color: #0e1224;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #ccc;
    padding: 0 10px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

interface StyledGridLineProps {
    left: number;
}

export const StyledGridLine = styled.div<StyledGridLineProps>`
    position: absolute;
    top: 48px;
    left: ${(props) => props.left}px;
    width: 1px;
    height: 136px;
    background-color: rgb(23, 28, 49);
`;


export const StyledCurrentTimeLabel = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 6px;
    color: #ffffff;
    font-size: 10px;
    font-weight: 300;
`;