import styled from 'styled-components';
import {Button} from '@mui/material';
import {ReactComponent as LiveIconSVG} from "../../assets/Live.svg";
import {ReactComponent as GoLiveIconSVG} from "../../assets/go_live_icon.svg";


export const ControlBarContainer = styled.div`
    background-color: #0E1224;
    border-bottom: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    width: 100%;
    height: 52px;
    z-index: 10;
`;


export const ButtonGroupWrapper = styled.div`
    display: flex;
    align-self: center;
    gap: 8px;
`;


export const StyledButton = styled(Button)`
    && {
        color: #fff;
        min-width: 40px;
        font-size: 12px;
        text-transform: none;

        &:hover {
            background-color: #3A4975;
        }

        &.Mui-disabled {
            opacity: 0.5;
            color: #fff;
        }
    }
`;


interface LiveButtonWrapperProps {
    atEdge: boolean;
}


export const LiveButtonWrapper = styled.div<LiveButtonWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.atEdge ? '#8C2F2F' : '#2F2F2F'};
    border-radius: 4px;
    margin-top: 12px;
    margin-right: 22px;
    height: 30px;
    padding: 0 10px;
    cursor: pointer;
`;


export const LiveRedIcon = styled(LiveIconSVG)`
    && {
        width: 13px;
        height: 13px;
        margin-right: 8px;
    }
`;


export const LiveGrayIcon = styled(GoLiveIconSVG)`
    && {
        width: 13px;
        height: 13px;
        margin-right: 8px;
    }
`;


export const LiveText = styled.span`
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 12px;
    color: #fff;
`;
