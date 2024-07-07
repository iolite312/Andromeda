import { type Spotify, type SpotifyPlayer } from "~/types"
export const useSpotifyStore = defineStore('spotify', () => {
    const playbackState = ref(<Spotify.PlaybackState>({}))
    const player = ref(<SpotifyPlayer>({}))

    const setPlaybackState = (state: Spotify.PlaybackState) => {
        playbackState.value = state
    }
    const currentTrack = () => {
        return playbackState.value.track_window
    }
    const setPlayer = (state: SpotifyPlayer) => {
        player.value = state
    }

    return { playbackState, setPlaybackState, currentTrack, setPlayer, player }
})