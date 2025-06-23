import React from 'react';
import {
    ButtonGroupWrapper,
    ControlBarContainer,
    LiveButtonWrapper,
    LiveGrayIcon,
    LiveRedIcon,
    LiveText,
    StyledButton
} from './TimelineControlBar.styles';

import {ReactComponent as FastRewindIcon} from "../../assets/Rewind.svg";
import {ReactComponent as Replay15Icon} from "../../assets/Rewind15.svg";
import {ReactComponent as PauseIcon} from "../../assets/Pause.svg";
import {ReactComponent as PlayIcon} from "../../assets/Play.svg";
import {ReactComponent as Forward15Icon} from "../../assets/Fastforward15.svg";
import {ReactComponent as FastForwardIcon} from "../../assets/Fastforward.svg";

interface TimelineControlBarProps {
    timeValue?: string;
    isPlaying?: boolean;
    onRewind?: () => void;
    onRewind15?: () => void;
    onPausePlay?: () => void;
    onForward15?: () => void;
    onForward?: () => void;
    isLive?: boolean;
    atLiveEdge?: boolean;
    onLiveClick?: () => void;

    onRewindHoldStart?: () => void;
    onRewindHoldEnd?: () => void;
    onFastForwardHoldStart?: () => void;
    onFastForwardHoldEnd?: () => void;
    isVideoReady?: boolean;
}

const TimelineControlBar: React.FC<TimelineControlBarProps> = ({
                                                                   timeValue = '00:00',
                                                                   isPlaying = false,
                                                                   onRewind,
                                                                   onRewind15,
                                                                   onPausePlay,
                                                                   onForward15,
                                                                   onForward,
                                                                   isLive = false,
                                                                   atLiveEdge = false,
                                                                   onLiveClick,

                                                                   onRewindHoldStart,
                                                                   onRewindHoldEnd,
                                                                   onFastForwardHoldStart,
                                                                   onFastForwardHoldEnd,

                                                                   isVideoReady = false,
                                                               }) => {

    const handleMouseDown = (holdStart: () => void) => (e: React.MouseEvent) => {
        e.preventDefault();
        holdStart();
    };

    const handleMouseUp = (holdEnd: () => void) => (e: React.MouseEvent) => {
        e.preventDefault();
        holdEnd();
    };

    const handleMouseLeave = (holdEnd: () => void) => (e: React.MouseEvent) => {
        e.preventDefault();
        holdEnd();
    };

    const handleTouchStart = (holdStart: () => void) => (e: React.TouchEvent) => {
        e.preventDefault();
        holdStart();
    };

    const handleTouchEnd = (holdEnd: () => void) => (e: React.TouchEvent) => {
        e.preventDefault();
        holdEnd();
    };

    return (
        <ControlBarContainer>

            <ButtonGroupWrapper>

                <StyledButton
                    onClick={onRewind}
                    disabled={!isVideoReady}
                    onMouseDown={onRewindHoldStart ? handleMouseDown(onRewindHoldStart) : undefined}
                    onMouseUp={onRewindHoldEnd ? handleMouseUp(onRewindHoldEnd) : undefined}
                    onMouseLeave={onRewindHoldEnd ? handleMouseLeave(onRewindHoldEnd) : undefined}
                    onTouchStart={onRewindHoldStart ? handleTouchStart(onRewindHoldStart) : undefined}
                    onTouchEnd={onRewindHoldEnd ? handleTouchEnd(onRewindHoldEnd) : undefined}
                >
                    <FastRewindIcon width={24} height={24}/>
                </StyledButton>

                <StyledButton onClick={onRewind15} disabled={!isVideoReady}>
                    <Replay15Icon width={30} height={30}/>
                </StyledButton>

                <StyledButton onClick={onPausePlay} disabled={!isVideoReady}>
                    {isPlaying ? <PauseIcon width={44} height={44}/> : <PlayIcon width={44} height={44}/>}
                </StyledButton>

                <StyledButton onClick={onForward15} disabled={!isVideoReady}>
                    <Forward15Icon width={30} height={30}/>
                </StyledButton>


                <StyledButton
                    onClick={onForward}
                    onMouseDown={onFastForwardHoldStart ? handleMouseDown(onFastForwardHoldStart) : undefined}
                    onMouseUp={onFastForwardHoldEnd ? handleMouseUp(onFastForwardHoldEnd) : undefined}
                    onMouseLeave={onFastForwardHoldEnd ? handleMouseLeave(onFastForwardHoldEnd) : undefined}
                    onTouchStart={onFastForwardHoldStart ? handleTouchStart(onFastForwardHoldStart) : undefined}
                    onTouchEnd={onFastForwardHoldEnd ? handleTouchEnd(onFastForwardHoldEnd) : undefined}
                    disabled={!isVideoReady}
                >
                    <FastForwardIcon width={24} height={24}/>
                </StyledButton>
            </ButtonGroupWrapper>

            {isLive && (
                <LiveButtonWrapper atEdge={atLiveEdge} onClick={onLiveClick}>
                    {atLiveEdge ? <LiveRedIcon/> : <LiveGrayIcon/>}
                    <LiveText>
                        {atLiveEdge ? "Live" : "Go Live"}
                    </LiveText>
                </LiveButtonWrapper>
            )}
        </ControlBarContainer>
    );
};

export default TimelineControlBar;
