import type { SpotifySDK, SpotifyApi } from "~/types"
export const useSpotifyStore = defineStore('spotify', () => {
    const playbackState = ref(<SpotifySDK.Spotify.PlaybackState>({}))
    const player = ref(<SpotifySDK.SpotifyPlayer>({}))
    const queue = ref(<SpotifyApi.Queue>({}))

    const setPlaybackState = (state: SpotifySDK.Spotify.PlaybackState) => {
        playbackState.value = state
    }
    const currentTrack = () => {
        return playbackState.value.track_window
    }
    const setPlayer = (state: SpotifySDK.SpotifyPlayer) => {
        player.value = state
    }
    const setQueue = () => {
        const authStore = useAuthStore()
        getQueue(authStore.accessToken as string)
            .then((result) => {
                queue.value = result
            })
    }
    const nextTrack = () => {
        player.value.nextTrack()
        setQueue()
    }
    const previousTrack = () => {
        player.value.previousTrack()
        setQueue()
    }
    const pausePlayer = () => {
        player.value.togglePlay()
    }

    return { player, playbackState, queue, setPlaybackState, currentTrack, setPlayer, setQueue, nextTrack, previousTrack, pausePlayer }
})