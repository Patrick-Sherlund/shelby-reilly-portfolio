import {VideoDto} from "./VideoDto";

export interface VideoStorageDto {
    maxStorageMB: number;
    totalStorageUsedMB: number;
    videos: VideoDto[]
}