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

    return { playbackState, setPlaybackState, currentTrack, setPlayer, player }
})