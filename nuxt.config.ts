// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	app: {
		head: {
			title: 'Andromeda',
			script: [
				{
					src: 'https://sdk.scdn.co/spotify-player.js'
				}
			]
		},
	},
	runtimeConfig: {
		public: {
			spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
			url: process.env.BASE_URL || 'http://localhost:3000'
		}
	},
	ssr: false
})
