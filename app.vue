<template>
	<div v-if="accessToken == null && refreshToken == null">
		<Auth />
	</div>
	<div v-else>
		<button @click="() => player.togglePlay()">Toggle play</button>
		<button @click="() => player.previousTrack()">Previous</button>
		<button @click="() => player.nextTrack()">Next</button>
		<div>
			<p>Current: {{ track_window?.current_track?.name || 'No track playing' }}</p>
			<p>Previous: {{ track_window?.previous_tracks[track_window?.previous_tracks.length - 1]?.name || 'No track playing' }}</p>
			<img :src="track_window?.current_track?.album?.images[0]?.url" alt="Image of album" :height="track_window?.current_track?.album?.images[0]?.height || 0" :width="track_window?.current_track?.album?.images[0]?.width || 0">
		</div>
		<button @click="insertNewToken()">Insert Token</button>
	</div>
</template>

<script setup lang="ts">

	useHead({
		title: 'Andromeda - Home',
	})
	
	const config = useRuntimeConfig();

	const playerStore = useSpotifyStore();
	const authStore = useAuthStore();

	let accessToken = authStore.accessToken
	let refreshToken = authStore.refreshToken

	let player = computed(() => playerStore.player);

	let track_window = computed(() => playerStore.currentTrack())
	
	if (accessToken != null) {
		CreateSpotify(accessToken as string, config.public.clientName)
			.then((spotPlayer) => {
				playerStore.setPlayer(spotPlayer)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	function insertNewToken() {
		refreshToken = authStore.refreshToken
		console.log(refreshToken)

		authStore.GetNewToken(config.public.clientId)

		accessToken = authStore.accessToken
		
		CreateSpotify(accessToken as string, config.public.clientName)
			.then((spotPlayer) => {
				playerStore.setPlayer(spotPlayer)
			})
			.catch((err) => {
				console.error(err)
			})
	}
</script>

<style></style>