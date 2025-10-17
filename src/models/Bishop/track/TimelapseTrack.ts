export interface TimelapseTrack {
    trackId?: number;
    customTrackId?: number;
    name: string;
    startTime: number;
    endTime: number;
    color?: string;
    layer?: number;
    blockHeight?: number;
    uniqueTrackCount?: number;

}

