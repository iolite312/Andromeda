import type { Spotify, SpotifyPlayer } from "~/types";

export const CreateSpotify = (token: string, name: string): Promise<SpotifyPlayer> => {
    return new Promise((resolve, reject) => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: name,
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
export const GetNewToken = async (refreshToken: string): Promise<string> => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        })
    });
    const json : Spotify.Token = await result.json();
    return json.access_token;
}