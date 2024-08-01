<template>
	<NuxtLayout>
		<nuxtPage/>
	</NuxtLayout>
</template>

<script setup lang="ts">
	const playerStore = useSpotifyStore();
	const authStore = useAuthStore();
	const config = useRuntimeConfig();

	// temp solution until i find the correct way to fix this
	const script = document.createElement('script');
	script.src = 'https://sdk.scdn.co/spotify-player.js';
	script.async = true;
	document.body.appendChild(script);
	// end of temp solution

	let accessToken = computed(() => authStore.accessToken)
	let expireDate = computed(() => authStore.expireDate)

	if (accessToken.value != null) {
		CreateSpotify(accessToken.value, config.public.clientName)
			.then((spotPlayer) => {
				playerStore.setPlayer(spotPlayer)
				playerStore.setQueue()
			})
			.catch((err) => {
				console.error(err)
			})
	}

	function insertNewToken() {
		authStore.GetNewToken(config.public.clientId)

		CreateSpotify(authStore.accessToken as string, config.public.clientName)
			.then((spotPlayer) => {
				playerStore.setPlayer(spotPlayer)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	onMounted(() => {
		setInterval(() => {
			if (new Date(expireDate.value).getTime() < Date.now() || expireDate.value == null) {				
				insertNewToken()
			}
		}, 1750000)
	})
	onBeforeMount(() => {
		if (new Date(expireDate.value).getTime() < Date.now() || expireDate.value == null) {
			authStore.GetNewToken(config.public.clientId)
		}
	})
</script>

<style>
	@import url(~/assets/css/satoshi.css);
</style>