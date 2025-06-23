export interface VideoMetadata {
    id: number;
    storageUrl?: string;
    fileName?: string;
    videoWidth?: number;
    videoHeight?: number;
    thumbnailWidth?: number;
    thumbnailHeight?: number;
    duration?: number;
    sizeBytes?: number;
}