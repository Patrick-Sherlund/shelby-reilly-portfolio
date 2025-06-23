import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    MainWrapper,
    LogoImage,
    MidSection,
    DemoWrapper,
    DemoPlaceholder,
    DescriptionWrapper,
    Title,
    LineText,
    CaseStudyButton,
    loadingOverlay,
    video,
    videoWrapper,
    videoBox
} from './ProjectBishopPage.styles'
import CheckIcon from "@mui/icons-material/Check";
import videojs from "video.js";
import { useZoomPanInteraction } from '../../hooks/useZoomPanInteraction'
import { Box, FormControl, InputLabel, Select, Typography, MenuItem, CircularProgress } from '@mui/material'
import {SxProps, Theme} from "@mui/system";
import TimelineControlBar from '../../components/Bishop/timeline-control-bar/TimelineControlBar'
import RollingDetectionTimeline from '../../components/Bishop/timeline/rolling-detection-timeline/RollingDetectionTimeline'
import VideoDetectionsOverlay from '../../components/Bishop/video-detections-overlay/VideoDetectionsOverlay'
import CircularProgressWithLabel from '../../components/Bishop/circular-progress-with-label/CircularProgressWithLabel';
import { VideoMetadata } from '../../models/Bishop/video/VideoMetadata';
import { formatTime } from '../../utils/formatTime';
import { clamp } from '../../utils/clamp';
import { TimelapseTrack } from '../../models/Bishop/track/TimelapseTrack';
import { VideoStatus } from '../../models/Bishop/video/VideoStatus';
import { CustomTrackedDetectionDto } from '../../models/Bishop/track/CustomTrackedDetectionDto';
import { TrackedDetectionDto } from '../../models/Bishop/track/TrackedDetectionDto';
import { getTimelapseTracks, getTrackedDetectionsForVideo } from '../../service/Bishop/track/TrackedDetectionService';
import { getCustomTrackedDetectionDtos, getDetectionThumbnail } from '../../service/Bishop/track/CustomTrackedDetectionService';
import { getVideoMetadata, getVideoStatus } from '../../service/Bishop/video/VideoService';
import { getProject } from '../../service/Bishop/project/ProjectService';

const greenCheckCircleStyles: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    backgroundColor: "#5BD150",
    color: "#0f1327",
    borderRadius: "50%",
    mr: "12px",
    ml: "6px",
    "& .MuiSvgIcon-root": {
        fontSize: 14,
    },
};

type VideoJsPlayer = videojs.Player;

export default function ProjectBishopPage() {
    // Refs for interaction areas
    const demoRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLDivElement>(null)

    const demoInteraction = useZoomPanInteraction(demoRef)
    const descInteraction = useZoomPanInteraction(descRef)

    const projectId = 1;
    const [projectName, setProjectName] = useState<string>("");
    const [videos, setVideos] = useState<VideoMetadata[]>([]);
    const [activeVideoId, setActiveVideoId] = useState<number | null>(null);


    const [videoStatusMap, setVideoStatusMap] = useState<Record<number, VideoStatus>>({});


    const [mainTime, setMainTime] = useState<number>(0);
    const [videoTime, setVideoTime] = useState<number>(0);
    const [timelineDuration, setTimelineDuration] = useState<number>(0);
    const [zoomedDuration, setZoomedDuration] = useState<number>(0);

    const videoNode = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<VideoJsPlayer | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

    const minTimelineDuration = 1;
    const [liveStart, setLiveStart] = useState<number>(0);
    const [liveEnd, setLiveEnd] = useState<number>(0);
    const [atLiveEdge, setAtLiveEdge] = useState<boolean>(true);
    const [isLive, setIsLive] = useState<boolean>(false);

    const [trackedDetections, setTrackedDetections] = useState<TrackedDetectionDto[]>([]);
    const [timelapseTracks, setTimelapseTracks] = useState<TimelapseTrack[]>([]);

    const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });
    const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    const [customDetections, setCustomDetections] = useState<CustomTrackedDetectionDto[]>([]);


    useEffect(() => {
        if (!projectId) return;

        const pid = Number(projectId);
        getProject(pid)
            .then((project) => {
                setProjectName(project.name);

                const arr: VideoMetadata[] = project.videos.map((videoMetadata) => ({
                    duration: 0,
                    ...videoMetadata,
                }));
                setVideos(arr);

                if (arr.length > 0) {
                    setActiveVideoId(arr[0].id);
                }


                fetchAllVideoStatuses(arr);
            })
            .catch((err) => {
                console.error("Failed to fetch project", err);
            });
    }, [projectId]);

    const fetchAllVideoStatuses = async (videoList: VideoMetadata[]) => {
        try {
            const promises = videoList.map((vid) => getVideoStatus(vid.id));
            const results = await Promise.allSettled(promises);
            const statusMap: Record<number, VideoStatus> = {};

            results.forEach((res) => {
                if (res.status === "fulfilled") {
                    const s = res.value;
                    statusMap[s.videoId] = s;
                }
            });
            setVideoStatusMap(statusMap);
        } catch (error) {
            console.error("Failed to fetch video statuses:", error);
        }
    };


    useEffect(() => {
        if (activeVideoId == null) return;

        getVideoMetadata(activeVideoId)
            .then((metadata) => {
                setTimelineDuration(metadata.duration);
                setZoomedDuration(metadata.duration);
                setIsLive(false);

                setOriginalDimensions({
                    width: metadata.videoWidth,
                    height: metadata.videoHeight,
                });

                setVideos((prev) =>
                    prev.map((v) =>
                        v.id === activeVideoId
                            ? {
                                ...v,
                                thumbnailWidth: metadata.thumbnailWidth,
                                thumbnailHeight: metadata.thumbnailHeight,
                            }
                            : v
                    )
                );

                setupVideoPlayer();

                getTrackedDetectionsForVideo(activeVideoId)
                    .then((td) => setTrackedDetections(td))
                    .catch((err) =>
                        console.error("Error fetching tracked detections:", err)
                    );

                if (projectId) {
                    const pid = Number(projectId);
                    getTimelapseTracks(pid, activeVideoId)
                        .then((tracks) => setTimelapseTracks(tracks))
                        .catch((err) =>
                            console.error("Error fetching timelapse tracks:", err)
                        );

                    fetchCustomDetections(pid, activeVideoId);
                }
            })
            .catch((err) => console.error("Failed to fetch video metadata", err));
    }, [activeVideoId, projectId]);


    const pollRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
        }
        if (!activeVideoId) return;

        const currentStatus = videoStatusMap[activeVideoId];
        if (!currentStatus) return;

        const fraction = (currentStatus.framesTotal > 0)
            ? currentStatus.framesProcessed / currentStatus.framesTotal
            : 0;
        const isStillProcessing = currentStatus.status !== "COMPLETED" && fraction < 1;

        if (isStillProcessing) {
            pollRef.current = setInterval(async () => {
                try {
                    const updated = await getVideoStatus(activeVideoId);
                    setVideoStatusMap((prev) => ({
                        ...prev,
                        [activeVideoId]: updated,
                    }));

                    const f2 = (updated.framesTotal > 0)
                        ? updated.framesProcessed / updated.framesTotal
                        : 0;
                    const stillProcessing = updated.status !== "COMPLETED" && f2 < 1;

                    if (stillProcessing && projectId) {
                        const pid = Number(projectId);

                        const tds = await getTrackedDetectionsForVideo(activeVideoId);
                        setTrackedDetections(tds);

                        const newTracks = await getTimelapseTracks(pid, activeVideoId);
                        setTimelapseTracks(newTracks);

                        await fetchCustomDetections(pid, activeVideoId);
                    } else {
                        if (pollRef.current) {
                            clearInterval(pollRef.current);
                            pollRef.current = null;
                        }
                    }
                } catch (error) {
                    console.error("Error in status polling:", error);
                }
            }, 1000);
        }

        return () => {
            if (pollRef.current) {
                clearInterval(pollRef.current);
                pollRef.current = null;
            }
        };
    }, [activeVideoId, videoStatusMap, projectId]);

    const fetchCustomDetections = async (pid: number, vid: number) => {
        try {
            const dtos = await getCustomTrackedDetectionDtos(pid, vid);
            const promises = dtos.map(async (dto) => {
                const thumbUrl = await getDetectionThumbnail(vid, dto.trackId);
                return {...dto, thumbnailUrl: thumbUrl};
            });
            const results = await Promise.all(promises);
            setCustomDetections(results);
        } catch (error) {
            console.error("Failed to fetch custom detections or thumbnails:", error);
        }
    };

    const setupVideoPlayer = useCallback(() => {
        if (!videoNode.current) return;

        if (playerRef.current) {
            playerRef.current.src([
                {
                    src: `/api/v1/video/${activeVideoId}/file`,
                    type: "video/mp4",
                },
            ]);
        } else {
            const player = videojs(videoNode.current, {
                controls: false,
                autoplay: true,
                preload: "auto",
                sources: [
                    {
                        src: `/api/v1/video/${activeVideoId}/file`,
                        type: "video/mp4",
                    },
                ],
            });
            playerRef.current = player;

            player.on("timeupdate", () => {
                const current = player.currentTime();
                setVideoTime(current);
                if (!player.paused()) {
                    setMainTime(current);
                }
            });

            player.on("loadedmetadata", () => {
                const duration = player.duration();
                setTimelineDuration(duration);
                setZoomedDuration(duration);
                setIsVideoReady(true);
            });

            player.on("durationchange", () => {
                const duration = player.duration();
                setTimelineDuration(duration);
                setZoomedDuration(duration);
            });

            player.on("play", () => setIsPlaying(true));
            player.on("pause", () => setIsPlaying(false));

            if (isLive) {
                const updateDVR = () => {
                    const seekable = player.seekable();
                    if (seekable.length > 0) {
                        setLiveStart(seekable.start(0));
                        setLiveEnd(seekable.end(seekable.length - 1));
                    }
                };
                player.on("seekablechanged", updateDVR);
                updateDVR();
            }
        }
    }, [activeVideoId, isLive]);

    const handlePlayPause = useCallback(() => {
        if (!playerRef.current) return;
        if (playerRef.current.paused()) {
            playerRef.current.play();
        } else {
            playerRef.current.pause();
        }
    }, []);

    const handlePause = useCallback(() => {
        if (playerRef.current && !playerRef.current.paused()) {
            playerRef.current.pause();
        }
    }, []);

    const seekTo = useCallback(
        (time: number) => {
            if (!playerRef.current || !isVideoReady) return;
            if (isLive) {
                const clampedVal = clamp(time, liveStart, liveEnd);
                playerRef.current.currentTime(clampedVal);
                setMainTime(clampedVal);
            } else {
                const clampedVal = clamp(time, 0, timelineDuration);
                playerRef.current.currentTime(Math.round(clampedVal));
                setMainTime(clampedVal);
            }
        },
        [isLive, liveStart, liveEnd, timelineDuration, isVideoReady]
    );

    const handleRewind15 = useCallback(() => {
        if (playerRef.current) {
            seekTo(playerRef.current.currentTime() - 15);
            setAtLiveEdge(false);
        }
    }, [seekTo]);

    const handleFastForward15 = useCallback(() => {
        if (playerRef.current) {
            seekTo(playerRef.current.currentTime() + 15);
        }
    }, [seekTo]);

    const handleRewind = useCallback(() => {
        if (playerRef.current) {
            seekTo(playerRef.current.currentTime() - 30);
            setAtLiveEdge(false);
        }
    }, [seekTo]);

    const handleFastForward = useCallback(() => {
        if (playerRef.current) {
            seekTo(playerRef.current.currentTime() + 30);
        }
    }, [seekTo]);

    const handleMarkerTimeChange = useCallback(
        (newTime: number) => {
            setMainTime(newTime);
            seekTo(newTime);
        },
        [seekTo]
    );

    const handleDetectClick = useCallback((det: TimelapseTrack) => {
        alert(`Clicked on ${det.name} from ${det.startTime}s to ${det.endTime}s`);
    }, []);

    const adjustZoomedDuration = useCallback(
        (newDuration: number) => {
            const clampedDur = clamp(newDuration, minTimelineDuration, timelineDuration);
            setZoomedDuration(clampedDur);
        },
        [timelineDuration]
    );

    let displayedTimeValue = formatTime(mainTime);
    if (isLive) {
        const offset = mainTime - liveStart;
        displayedTimeValue = formatTime(offset);
    }

    const handleLiveButtonClick = useCallback(() => {
        if (isLive && playerRef.current) {
            const seekable = playerRef.current.seekable();
            if (seekable.length > 0) {
                playerRef.current.currentTime(seekable.end(seekable.length - 1));
                setAtLiveEdge(true);
            }
        }
    }, [isLive]);

    const rewindIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const fastForwardIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const isRewindHoldingRef = useRef(false);
    const isFastForwardHoldingRef = useRef(false);

    const didRewindHoldRef = useRef(false);
    const didFastForwardHoldRef = useRef(false);

    const SEEK_INTERVAL = 300;

    const handleRewindHoldStart = useCallback(() => {
        isRewindHoldingRef.current = true;
        didRewindHoldRef.current = true;
        seekTo(mainTime - 1);
        setAtLiveEdge(false);

        rewindIntervalRef.current = setInterval(() => {
            if (playerRef.current) {
                seekTo(playerRef.current.currentTime() - 1);
            }
        }, SEEK_INTERVAL);
    }, [seekTo, mainTime]);

    const handleRewindHoldEnd = useCallback(() => {
        isRewindHoldingRef.current = false;
        if (rewindIntervalRef.current) {
            clearInterval(rewindIntervalRef.current);
            rewindIntervalRef.current = null;
        }
        setTimeout(() => {
            didRewindHoldRef.current = false;
        }, 100);
    }, []);

    const handleFastForwardHoldStart = useCallback(() => {
        isFastForwardHoldingRef.current = true;
        didFastForwardHoldRef.current = true;
        seekTo(mainTime + 1);

        fastForwardIntervalRef.current = setInterval(() => {
            if (playerRef.current) {
                seekTo(playerRef.current.currentTime() + 1);
            }
        }, SEEK_INTERVAL);
    }, [seekTo, mainTime]);

    const handleFastForwardHoldEnd = useCallback(() => {
        isFastForwardHoldingRef.current = false;
        if (fastForwardIntervalRef.current) {
            clearInterval(fastForwardIntervalRef.current);
            fastForwardIntervalRef.current = null;
        }
        setTimeout(() => {
            didFastForwardHoldRef.current = false;
        }, 100);
    }, []);

    useEffect(() => {
        return () => {
            if (rewindIntervalRef.current) {
                clearInterval(rewindIntervalRef.current);
            }
            if (fastForwardIntervalRef.current) {
                clearInterval(fastForwardIntervalRef.current);
            }
        };
    }, []);

    const handleHoverTimeChange = useCallback(
        (hoverTime: number) => {
            if (!playerRef.current) return;
            playerRef.current.currentTime(hoverTime);
            setVideoTime(hoverTime);
        },
        []
    );

    useEffect(() => {
        const handleResize = () => {
            if (!videoNode.current) return;
            const rect = videoNode.current.getBoundingClientRect();
            setVideoDimensions({width: rect.width, height: rect.height});
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (videoNode.current) {
                const rect = videoNode.current.getBoundingClientRect();
                setVideoDimensions({width: rect.width, height: rect.height});
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleRefetchAll = async () => {
        if (activeVideoId && projectId) {
            try {
                const pid = Number(projectId);
                const newTracks = await getTimelapseTracks(pid, activeVideoId);
                setTimelapseTracks(newTracks);
                await fetchCustomDetections(pid, activeVideoId);

                const td = await getTrackedDetectionsForVideo(activeVideoId);
                setTrackedDetections(td);
            } catch (e) {
                console.error("Failed to refetch timelapse or custom detections:", e);
            }
        }
    };

    const renderStatusIcon = (vid: VideoMetadata) => {
        const stat = videoStatusMap[vid.id];
        if (!stat) {
            return null;
        }
        const {framesTotal, framesProcessed, status} = stat;
        const fraction = framesTotal > 0 ? framesProcessed / framesTotal : 0;

        if (status === "COMPLETED" || fraction >= 1) {
            return (
                <Box sx={greenCheckCircleStyles}>
                    <CheckIcon fontSize="inherit"/>
                </Box>
            );
        } else {
            const progressPercent = Math.round(fraction * 100);

            return (
                <Box sx={{margin: "12px 8px 0 0"}}>

                    <CircularProgressWithLabel
                        fontSize={9}
                        size={26}
                        value={progressPercent ?? 0}
                    />
                </Box>

            );
        }
    };

    const activeVideo = videos.find((v) => v.id === activeVideoId);

    return (
        <MainWrapper>
            {/* Top-left logo */}
            <LogoImage
                src={`${process.env.PUBLIC_URL}/images/ctrly-logo.png`}
                alt="CTRL+Y Logo"
            />

            {/* Middle section */}
            <MidSection>
                {/* Left – Description */}
                <DescriptionWrapper
                    ref={descRef}
                    onMouseDown={descInteraction.handleMouseDown}
                    onMouseMove={descInteraction.handleMouseMove}
                    onMouseUp={descInteraction.handleMouseUp}
                    onMouseLeave={descInteraction.handleMouseLeave}
                >
                    <Title>Project Bishop</Title>
                    <LineText>2024</LineText>
                    <LineText>UX Designer</LineText>
                    <LineText>Frontend Engineer</LineText>

                    <div style={{ marginTop: '32px' }}>
                        <CaseStudyButton>READ CASE STUDY</CaseStudyButton>
                    </div>
                </DescriptionWrapper>

                {/* Right – Web app placeholder */}
                <DemoWrapper
                    ref={demoRef}
                    onMouseDown={demoInteraction.handleMouseDown}
                    onMouseMove={demoInteraction.handleMouseMove}
                    onMouseUp={demoInteraction.handleMouseUp}
                    onMouseLeave={demoInteraction.handleMouseLeave}
                >
                    <Box sx={videoBox} gap={2}>
                        <Box sx={videoWrapper}>
                            <FormControl
                                variant="filled"
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    left: 8,
                                    zIndex: 2,
                                    opacity: .85,
                                    padding: "4px",
                                    "& .MuiFilledInput-root": {
                                        backgroundColor: "#0f1327",
                                        color: "#fff",
                                    },
                                    "& .MuiFilledInput-root:hover": {
                                        backgroundColor: "#161b2d",
                                    },
                                    "& .MuiFilledInput-root.Mui-focused": {
                                        backgroundColor: "#1d2340",
                                    },

                                    "& .MuiSvgIcon-root": {
                                        color: "#fff",
                                    },
                                    "& .MuiFormLabel-root": {
                                        color: "#fff",
                                    },
                                }}


                            >
                                <InputLabel sx={{p: "8px 0 4px 8px"}}>Video</InputLabel>
                                <Select
                                    renderValue={(value) => {
                                        const chosenId = Number(value);
                                        const chosenVideo = videos.find((v) => v.id === chosenId);
                                        if (!chosenVideo) return "";
                                        return (
                                            <Box sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                paddingY: "4px",
                                                "& .MuiSvgIcon-root": {
                                                    color: "rgb(15, 19, 39) !important"
                                                }
                                            }}>
                                                {renderStatusIcon(chosenVideo)}
                                                <Typography color={"#fff"}>{chosenVideo.fileName}</Typography>
                                            </Box>
                                        );
                                    }}
                                    value={activeVideoId ?? ""}
                                    onChange={(e) => {
                                        const chosenId = Number(e.target.value);
                                        setActiveVideoId(chosenId);
                                        setIsVideoReady(false);
                                    }}
                                    sx={{
                                        borderRadius: 1,
                                        "& .MuiSelect-icon": {
                                            top: "45%",
                                        },

                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: "#202951",
                                                "& .MuiMenuItem-root": {
                                                    backgroundColor: "#202951",
                                                    color: "#fff",
                                                    padding: "6px 8px",
                                                },
                                                "& .MuiMenuItem-root:hover": {
                                                    backgroundColor: "#2b386b",
                                                },
                                                "& .MuiMenuItem-root.Mui-selected": {
                                                    backgroundColor: "#2b386b !important",
                                                },
                                            },
                                        },
                                    }}
                                >
                                    {videos.map((vid) => (
                                        <MenuItem key={vid.id} value={vid.id} sx={{padding: 0}}>
                                            <Box sx={{
                                                pl: "4px", display: "flex", alignItems: "center",
                                                "& .MuiSvgIcon-root": {
                                                    color: "rgb(15, 19, 39) !important"
                                                },
                                            }}>
                                                {renderStatusIcon(vid)}
                                                <Typography color={"#ffff"}>{vid.fileName}</Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <video
                                style={video}
                                ref={videoNode}
                                className="video-js vjs-big-play-centered"
                                playsInline
                            />

                            {isVideoReady && (
                                <VideoDetectionsOverlay
                                    trackedDetections={trackedDetections}
                                    currentTimeSec={videoTime}
                                    originalVideoWidth={originalDimensions.width}
                                    originalVideoHeight={originalDimensions.height}
                                    renderedVideoWidth={videoDimensions.width}
                                    renderedVideoHeight={videoDimensions.height}
                                    onDetectionClick={(td) => {
                                    }}
                                    customDetections={customDetections}
                                />
                            )}

                            {!isVideoReady && (
                                <Box sx={loadingOverlay}>
                                    <CircularProgress color="inherit"/>
                                </Box>
                            )}

                            <TimelineControlBar
                                timeValue={displayedTimeValue}
                                isPlaying={isPlaying}
                                onRewind={handleRewind}
                                onRewind15={handleRewind15}
                                onPausePlay={handlePlayPause}
                                onForward15={handleFastForward15}
                                onForward={handleFastForward}
                                isLive={isLive}
                                atLiveEdge={atLiveEdge}
                                onLiveClick={handleLiveButtonClick}
                                onRewindHoldStart={handleRewindHoldStart}
                                onRewindHoldEnd={handleRewindHoldEnd}
                                onFastForwardHoldStart={handleFastForwardHoldStart}
                                onFastForwardHoldEnd={handleFastForwardHoldEnd}
                                isVideoReady={isVideoReady}
                            />
                        </Box>

                        <RollingDetectionTimeline
                            thumbnailWidth={activeVideo?.thumbnailWidth ?? 142}
                            thumbnailHeight={activeVideo?.thumbnailHeight ?? 80}
                            timelapseTracks={timelapseTracks}
                            currentTime={mainTime}
                            timelineDuration={isLive ? liveEnd - liveStart : zoomedDuration}
                            totalDuration={!isLive ? timelineDuration : undefined}
                            onDetectionClick={handleDetectClick}
                            onZoomChange={adjustZoomedDuration}
                            isLive={isLive}
                            liveStart={liveStart}
                            videoId={activeVideoId}
                            liveEnd={liveEnd}
                            atLiveEdge={atLiveEdge}
                            onPause={handlePause}
                            onMarkerDragStart={() => {
                                handlePause();
                                setAtLiveEdge(false);
                            }}
                            onMarkerDrag={(newMarkerTime) => {
                                handleMarkerTimeChange(newMarkerTime);
                            }}
                            isPlaying={isPlaying}
                            onHoverTimeChange={handleHoverTimeChange}
                        />
                    </Box>
                </DemoWrapper>
            </MidSection>
        </MainWrapper>
    )
} 