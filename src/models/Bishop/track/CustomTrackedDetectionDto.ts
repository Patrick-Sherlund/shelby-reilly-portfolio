export interface CustomTrackedDetectionDto {
    customId: number;
    trackId: number;
    trackedDetId: number;
    confidence: number;
    color: string;
    notes: string;
    name: string;
    latitude: number;
    longitude: number;
    startTime?: number;
}