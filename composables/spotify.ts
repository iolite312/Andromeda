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

                const data = await $fetch('https://api.spotify.com/v1/me/player', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: {
                        device_ids: [device_id],
                    }
                });

                if (data == '') {
                    throw new Error('No player found');
                }

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
export const setShuffle = async (token: string, shuffleState : boolean, deviceId: string): Promise<void> => {
    const data = await $fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${!shuffleState}&device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (data == '') {
        throw new Error('Something went wrong');
    }
}
export const setPosition = async (token: string, position : number, deviceId: string): Promise<void> => {
    const data = await $fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}&device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (data == '') {
        throw new Error('Something went wrong');
    }
}
export const setRepeat = async (token: string, repeatState : number, deviceId: string): Promise<void> => {
    let repeat_mode = "";

    switch (repeatState) {
        case 0:
            repeat_mode = "context";
            break;
        case 1:
            repeat_mode = "track";
            break;
        case 2:
            repeat_mode = "off";
            break;
    }

    const data = await $fetch(`https://api.spotify.com/v1/me/player/repeat?state=${repeat_mode}&device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (data == '') {
        throw new Error('Something went wrong');
    }
}