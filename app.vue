<template>
	<div v-if="accessToken == null && refreshToken == null">
		<Auth />
	</div>
	<div v-else>
		<button @click="() => player.togglePlay()">Toggle play</button>
		<button @click="() => player.previousTrack()">Previous</button>
		<button @click="() => player.nextTrack()">Next</button>
		<button @click="onStateChange()">Update State</button>
		<div>
			<p>Current: {{ track_window?.current_track?.name || 'No track playing' }}</p>
			<p>Previous: {{ track_window?.previous_tracks[track_window?.previous_tracks.length - 1]?.name || 'No track playing' }}</p>
			<img :src="track_window?.current_track?.album?.images[0]?.url" alt="Image of album" :height="track_window?.current_track?.album?.images[0]?.height || 0" :width="track_window?.current_track?.album?.images[0]?.width || 0">
		</div>
		<button @click="insertNewToken()">Insert Token</button>
	</div>
</template>

<script setup lang="ts">
	import { type Spotify, type SpotifyPlayer } from './types';

	const config = useRuntimeConfig();

	useHead({
		title: 'Andromeda - Home',
	})

	let accessToken = localStorage.getItem('accessToken')
	let refreshToken = localStorage.getItem('refreshToken')

	let player : SpotifyPlayer;

	let playerState = ref<Spotify.PlaybackState>()

	let track_window = ref<Spotify.PlaybackTrackWindow | undefined>(playerState.value?.track_window)
	
	if (accessToken != null) {
		CreateSpotify(accessToken as string, config.public.clientName)
			.then((spotPlayer) => {
				player = spotPlayer
			})
			.catch((err) => {
				console.error(err)			
			})
	}
	function onStateChange() {
		player.addListener('player_state_changed', (state) => {
			playerState.value = state
			track_window.value = playerState.value?.track_window
		})
	}
	function insertNewToken() {
		refreshToken = localStorage.getItem('refreshToken')

		GetNewToken(refreshToken as string, config.public.clientId).then((response) => {
			localStorage.setItem('accessToken', response.access_token)
			localStorage.setItem('refreshToken', response.refresh_token)
		})

		accessToken = localStorage.getItem('accessToken')
		
		CreateSpotify(accessToken as string, config.public.clientName)
			.then((spotPlayer) => {
				player = spotPlayer
			})
			.catch((err) => {
				console.error(err)			
			})
	}

	onMounted(() => {
		setTimeout(() => {
			onStateChange()
		}, 2000);
	})
</script>

<style></style>