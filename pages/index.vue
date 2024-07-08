<template>
	<div v-if="accessToken == null && refreshToken == null">
		<Auth />
	</div>
	<div v-else>
		<button @click="playerStore.pausePlayer()">Toggle play</button>
		<button @click="playerStore.previousTrack()">Previous</button>
		<button @click="playerStore.nextTrack()">Next</button>
		<div>
			<p>Previous: {{ track_window?.previous_tracks[track_window?.previous_tracks.length - 1]?.name || 'No track playing' }}</p>
			<p>Current: {{ track_window?.current_track?.name || 'No track playing' }}</p>
			<p>Next: {{ track_window?.next_tracks[0]?.name || 'No track playing' }}</p>
			<img :src="track_window?.current_track?.album?.images[0]?.url" alt="Image of album" :height="track_window?.current_track?.album?.images[0]?.height || 0" :width="track_window?.current_track?.album?.images[0]?.width || 0">
		</div>
		<!-- <div>
			<p v-for="item in queue.queue">{{ item?.name }}</p>
		</div> -->
	</div>
	<NuxtLink to="/playlists/1MbsT0FTMEt5mo8nTtirCU">Playlist</NuxtLink>
	<NuxtLink to="/album/5zo18Ed9XHmSynrLP9wjyb">Album</NuxtLink>
</template>

<script setup lang="ts">
	useHead({
		title: 'Andromeda - Home',
	})

	const playerStore = useSpotifyStore();
	const authStore = useAuthStore();

	let accessToken = authStore.accessToken
	let refreshToken = authStore.refreshToken

	let track_window = computed(() => playerStore.currentTrack())
	let queue = computed(() => playerStore.queue)
</script>

<style></style>