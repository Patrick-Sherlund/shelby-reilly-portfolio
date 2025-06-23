import {axiosInstance} from "../AxiosInstance";
import {TrackedDetectionDto} from "../../models/track/TrackedDetectionDto";
import {TimelapseTrack} from "../../models/timeline-detection/TimelapseTrack";


export async function getTrackedDetectionsForVideo(
    videoId: number
): Promise<TrackedDetectionDto[]> {
    const url = `/api/v1/video/${videoId}/tracks`;
    const res = await axiosInstance.get<TrackedDetectionDto[]>(url);
    return res.data;
}

export async function getTimelapseTracks(projectId: number, videoId: number): Promise<TimelapseTrack[]> {
    const url = `/api/v1/project/${projectId}/video/${videoId}/timelapse-tracks`;
    const resp = await axiosInstance.get<TimelapseTrack[]>(url);
    return resp.data;
}
