import type { Spotify, SpotifyPlayer } from "~/types";

export const CreateSpotify = (token: string, name: string): Promise<SpotifyPlayer> => {
    
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
export const GetNewToken = async (refreshToken: string, client_id: string): Promise<Spotify.Token> => {
    const { data } = await useFetch<Spotify.Token>("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "client_id": client_id,
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        })
    });

    if (data.value == null) {
        throw new Error("No token found");
    }

    return data.value;
}
function setStore () {
    const store = useSpotifyStore();
    return store
}