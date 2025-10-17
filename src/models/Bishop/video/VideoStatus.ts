export interface VideoStatus {
    framesProcessed: number;
    framesTotal: number;
    progressPercent: number;
    status: "PROCESSING" | "COMPLETED" | "FAILED";
    videoId: number;
}
