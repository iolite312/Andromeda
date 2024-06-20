interface SpotifyWebPlaybackSDKReady {
    (): void;
}

export interface SpotifyPlayer {
    addListener(event: 'ready' | 'not_ready', callback: (event: { device_id: string }) => void): void;
    addListener(event: 'initialization_error' | 'authentication_error' | 'account_error', callback: (event: { message: string }) => void): void;
    connect(): Promise<boolean>;
    togglePlay(): Promise<void>;
    pause(): Promise<void>;
    previousTrack(): Promise<void>;
    resume(): Promise<void>;
    seek(pos_ms: number): Promise<void>;
    setName(name: string): Promise<void>;
    setVolume(volume: number): Promise<void>;
    togglePlay(): Promise<void>;
    activateElement(): Promise<void>;
    disconnect(): void;
    getVolume(): Promise<number>;
    nextTrack(): Promise<void>;
}

interface Spotify {
    Player: {
        new (options: { name: string; getOAuthToken: (cb: (token: string) => void) => void; volume: number }): SpotifyPlayer;
    };
}

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: SpotifyWebPlaybackSDKReady;
        Spotify: Spotify;
    }
}

