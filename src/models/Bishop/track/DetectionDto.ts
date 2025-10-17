import {BoundingBoxDto} from "./BoundingBoxDto";
import {DetectionPointDto} from "./DetectionPointDto";

export interface DetectionDto {
    id: number;
    videoId: number;
    classId: number;
    className: string;
    confidence: number;
    timestampMs: number;
    boundingBox: BoundingBoxDto;
    points: DetectionPointDto[];
}