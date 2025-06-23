import {BoundingBoxDto} from "./BoundingBoxDto";
import {DetectionDto} from "./DetectionDto";

export interface TrackedDetectionDto {
    id: number;
    trackId: number;
    status: string;
    confidence: number;
    boundingBox: BoundingBoxDto;
    lastUpdateTime: number;
    startTimeMs: number;
    subDetections: DetectionDto[];
}