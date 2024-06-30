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
			spotifySecret: proces.env.SPOTIFY_SECRET || ''
		}
	},
	ssr: false
})
