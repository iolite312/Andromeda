<template>
	<!-- <script defer src="https://sdk.scdn.co/spotify-player.js"></script> -->
	<div>
		<button @click="() => player.togglePlay()">Toggle play</button>
		<button @click="() => player.previousTrack()">Previous</button>
		<button @click="() => player.nextTrack()">Next</button>
	</div>
</template>

<script setup lang="ts">
	import { type SpotifyPlayer } from './types';
	useHead({
		title: 'Andromeda - Home',
	})

	const config = useRuntimeConfig();

	let player : SpotifyPlayer;

	CreateSpotify(config.public.spotifySecret)
		.then((spotPlayer) => {
			player = spotPlayer
		})
		.catch((err) => {
			console.error(err)			
		})
</script>

<style></style>