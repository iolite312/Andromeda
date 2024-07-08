<template>
	<nuxtPage />
</template>

<script setup lang="ts">
	// temp solution until i find the correct way to fix this
	const script = document.createElement('script');
	script.src = 'https://sdk.scdn.co/spotify-player.js';
	script.async = true;
    document.body.appendChild(script);
    // end of temp solution
</script>

<style></style>