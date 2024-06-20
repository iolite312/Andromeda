import type { SpotifyPlayer } from "~/types";

export const CreateSpotify = (token: string): Promise<SpotifyPlayer> => {
    return new Promise((resolve, reject) => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); },
                volume: 1
            });
        
            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                resolve(player);
            });
        
            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
        
            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
                reject(message);
            });
        
            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
                reject(message);
            });
        
            player.addListener('account_error', ({ message }) => {
                console.error(message);
                reject(message);
            });
        
            player.connect().catch(message => {
                console.error(message);
                reject(message);
            });
        }
    })
}