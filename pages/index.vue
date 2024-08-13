<template>
	<div v-if="accessToken == null && refreshToken == null">
		<Auth />
	</div>
	<div v-else>
		<div class="text-white">
			<p>Previous: {{ track_window?.previous_tracks[track_window?.previous_tracks.length - 1]?.name || 'No track playing' }}</p>
			<p>Next: {{ track_window?.next_tracks[0]?.name || 'No track playing' }}</p>
		</div>
	</div>
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