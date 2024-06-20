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
	let player : SpotifyPlayer;

	CreateSpotify("Token here")
		.then((spotPlayer) => {
			player = spotPlayer
			console.log(spotPlayer)
		})
		.catch((err) => {
			console.error(err)
		})
</script>

<style></style>