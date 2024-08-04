<template>
	<NuxtLayout>
		<nuxtPage/>
	</NuxtLayout>
	<button @click="insertNewToken()">Refresh</button>
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
			if (new Date(localStorage.getItem('expireDate') as string).getTime() < Date.now() || localStorage.getItem('expireDate') == null) {				
				insertNewToken()
				console.log('refreshed token');
			}			
		}, 6000)
	})
	onBeforeMount(() => {
		if (new Date(localStorage.getItem('expireDate') as string).getTime() < Date.now() || localStorage.getItem('expireDate') == null) {
			authStore.GetNewToken(config.public.clientId)
		}
	})
</script>

<style></style>