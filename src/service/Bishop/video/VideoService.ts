import {axiosInstance} from "../AxiosInstance";
import {Routes} from "../Routes";
import {VideoMetadata} from "../../models/video/VideoMetadata";
import {VideoDto} from "../../models/video/VideoDto";
import {VideoStorageDto} from "../../models/video/VideoStorageDto";
import {VideoStatus} from "../../models/video/VideoStatus";

export const getVideoStorage = async (): Promise<VideoStorageDto> => {
    return axiosInstance
        .get<VideoStorageDto>("/api/v1/video/storageinfo")
        .then<VideoStorageDto>((response) => response.data);
};

export async function getAllVideos(): Promise<VideoDto[]> {
    return axiosInstance
        .get<VideoDto[]>("/api/v1/video")
        .then<VideoDto[]>((response) => response.data);
}

export async function uploadMultipleVideos(
    files: File[]
): Promise<VideoMetadata[]> {
    const formData = new FormData();


    files.forEach((f) => {
        formData.append("file", f);
    });


    const response = await axiosInstance.post<VideoMetadata[]>(
        Routes.Video.Upload,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );


    return response.data;
}


export async function getVideoMetadata(videoId: number): Promise<VideoMetadata> {
    return await axiosInstance
        .get<VideoMetadata>(`/api/v1/video/${videoId}/metadata`)
        .then<VideoMetadata>((response) => response.data);
}

export async function deleteVideo(videoId: number): Promise<void> {
    const url = `/api/v1/video/${videoId}`;
    await axiosInstance.delete(url);
}

export async function getVideoStatus(videoId: number): Promise<VideoStatus> {
    const response = await axiosInstance.get<VideoStatus>(`/api/v1/video/${videoId}/status`);
    return response.data;
}
