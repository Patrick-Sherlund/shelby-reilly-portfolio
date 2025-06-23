import {axiosInstance} from "../AxiosInstance";
import {CustomTrackedDetectionDto} from "../../models/track/CustomTrackedDetectionDto";
import {TrackedDetectionThumbnail} from "../../models/thumbnail/TrackedDetectionThumbnail";


export async function getCustomTrackedDetectionDtos(
    projectId: number,
    videoId: number
): Promise<CustomTrackedDetectionDto[]> {
    const url = `/api/v1/project/${projectId}/video/${videoId}/active-custom`;
    const resp = await axiosInstance.get<CustomTrackedDetectionDto[]>(url);
    return resp.data;
}

export async function upsertCustomTrackedDetection(
    projectId: number,
    videoId: number,
    trackId: number,
    color: string,
    notes: string,
    latitude: number,
    longitude: number,
    name: string,
    customId?: number
): Promise<number> {

    const payload: any = {
        projectId,
        videoId,
        trackId,
        color,
        notes,
        latitude,
        longitude,
        name,
    };
    if (customId && customId > 0) {
        payload.id = customId;
    }

    const resp = await axiosInstance.post<{ id: number }>(
        "/api/v1/custom-detections",
        payload
    );
    return resp.data.id;
}


export async function getDetectionThumbnail(
    videoId: number,
    trackId: number): Promise<string> {
    const url = `/api/v1/video/${videoId}/detection-thumbnail/${trackId}`;

    return axiosInstance
        .get<TrackedDetectionThumbnail>(url)
        .then((response) => {
            const {detectionThumbnailData} = response.data;


            const byteChars = atob(detectionThumbnailData);
            const byteNumbers = new Array(byteChars.length);
            for (let i = 0; i < byteChars.length; i++) {
                byteNumbers[i] = byteChars.charCodeAt(i);
            }


            const byteArray = new Uint8Array(byteNumbers);

            return URL.createObjectURL(new Blob([byteArray], {type: "image/png"}));

        });
}
