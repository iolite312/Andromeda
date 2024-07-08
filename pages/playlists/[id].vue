<template>
    <button @click="playPlaylist()">Play</button>
    <div v-for="item in data?.tracks.items">
        <p>{{ item.track.name }} Artist: 
            <span v-if="item.track.artists.length === 1">{{ item.track.artists[0].name }}</span>
            <span v-else>
                <template v-for="(artist, index) in item.track.artists">
                    {{ artist.name }}<span v-if="index < item.track.artists.length - 1">, </span>
                </template>
            </span>
        </p>
    </div>
</template>


<script setup lang="ts">
    import type { SpotifyApi } from '~/types';

    const route = useRoute();
    const authStore = useAuthStore();
    const playerStore = useSpotifyStore();
    const playlistId = route.params.id;
    console.log(playlistId);
    

    const { data } = await useFetch<SpotifyApi.SpotifyApi.Playlist>(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.accessToken}`
        }
    });
    async function playPlaylist() {
        const { error } = await useFetch(`https://api.spotify.com/v1/me/player/play?${playerStore.deviceId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.accessToken}`
            },
            body: {
                context_uri: `spotify:playlist:${playlistId}`,
                offset: {
                    position: 0
                },
                position_ms: 0
            }
        });

        if (error.value) {
            alert(error.value.data.error.message)
        }
    }
</script>

<style scoped>

</style>