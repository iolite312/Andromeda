// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    app: {
		head: {
			title: 'Andromeda',
			script: [
				{
					src: 'https://sdk.scdn.co/spotify-player.js',
					async: true
				}
			]
		},
	},

    runtimeConfig: {
		public: {
			clientId: process.env.SPOTIFY_CLIENT_ID,
			url: process.env.BASE_URL || 'http://localhost:3000',
			clientName: process.env.SPOTIFY_CLIENT_NAME || 'Andromeda'
		}
	},

    ssr: false,
    modules: [
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
	]
})