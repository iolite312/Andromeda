import type { SpotifySDK, SpotifyApi } from "~/types";

export const CreateSpotify = (token: string, name: string): Promise<SpotifySDK.SpotifyPlayer> => {

    const store = setStore();

    return new Promise((resolve, reject) => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: name,
                getOAuthToken: cb => { cb(token); },
                volume: 1
            });

            // Ready
            player.addListener('ready', async ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                // TEMPORARY
                // const data = await $fetch('https://api.spotify.com/v1/me/player', {
                //     method: 'PUT',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${token}`
                //     },
                //     body: {
                //         device_ids: [device_id],
                //     }
                // });

                // if (data == '') {
                //     throw new Error('No player found');
                // }

                resolve(player);
                store.deviceId = device_id
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

            player.addListener('player_state_changed', (state) => {
                if (state == null) return
                store.setPlaybackState(state)
            })
        }
    })
}

function setStore() {
    const store = useSpotifyStore();
    return store
}
export const getQueue = async (token: string): Promise<SpotifyApi.SpotifyApi.Queue> => {
    const queue = await $fetch<SpotifyApi.SpotifyApi.Queue>('https://api.spotify.com/v1/me/player/queue', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    
    return queue
}