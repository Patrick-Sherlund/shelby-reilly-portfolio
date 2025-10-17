declare module 'react-player' {
    import {Component} from 'react';

    export interface ReactPlayerProps {
        url: string | string[] | MediaStream;
        playing?: boolean;
        loop?: boolean;
        controls?: boolean;
        light?: boolean | string | React.ReactElement;
        volume?: number;
        muted?: boolean;
        playbackRate?: number;
        width?: string | number;
        height?: string | number;
        style?: React.CSSProperties;
        progressInterval?: number;
        playsinline?: boolean;
        pip?: boolean;
        stopOnUnmount?: boolean;
        fallback?: React.ReactNode;
        wrapper?: string | React.ComponentType<any>;
        playIcon?: React.ReactElement;
        previewTabIndex?: number;
        config?: ReactPlayerConfig;

        onReady?: (player: any) => void;
        onStart?: () => void;
        onPlay?: () => void;
        onPause?: () => void;
        onBuffer?: () => void;
        onBufferEnd?: () => void;
        onEnded?: () => void;
        onError?: (error: any, data?: any, hlsInstance?: any, hlsGlobal?: any) => void;
        onDuration?: (duration: number) => void;
        onSeek?: (seconds: number) => void;
        onProgress?: (state: {
            played: number;
            playedSeconds: number;
            loaded: number;
            loadedSeconds: number;
        }) => void;
        onPlaybackRateChange?: (playbackRate: number) => void;
        onClickPreview?: () => void;
        onEnablePIP?: () => void;
        onDisablePIP?: () => void;
    }


    export interface ReactPlayerConfig {
        youtube?: {
            playerVars?: { [key: string]: any };
            embedOptions?: { [key: string]: any };
            onUnstarted?: () => void;
        };
        facebook?: {
            appId?: string;
            version?: string;
            playerId?: string;
            attributes?: { [key: string]: string };
        };
        soundcloud?: {
            options?: { [key: string]: any };
        };
        vimeo?: {
            playerOptions?: { [key: string]: any };
            title?: string;
        };
        file?: {
            attributes?: { [key: string]: any };
            tracks?: Array<{
                kind: string;
                src: string;
                srcLang?: string;
                default?: boolean;
            }>;
            forceVideo?: boolean;
            forceAudio?: boolean;
            forceHLS?: boolean;
            forceDASH?: boolean;
            forceFLV?: boolean;
            hlsOptions?: { [key: string]: any };
            hlsVersion?: string;
            dashVersion?: string;
            flvVersion?: string;
        };
        wistia?: {
            options?: { [key: string]: any };
            playerId?: string;
            customControls?: any[];
        };
        mixcloud?: {
            options?: { [key: string]: any };
        };
        twitch?: {
            options?: { [key: string]: any };
            playerId?: string;
        };
        dailymotion?: {
            params?: { [key: string]: any };
        };

    }

    export default class ReactPlayer extends Component<ReactPlayerProps> {
    }
}
