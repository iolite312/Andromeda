<template>
    <p v-for="item in data?.tracks.items"> {{item.track.name}} Artist: <span v-for="artist in item.track.artists">{{artist.name}}, </span></p>
</template>

<script setup lang="ts">
import type { SpotifyApi } from '~/types';

    const route = useRoute();
    const authStore = useAuthStore();
    const playlistId = route.params.id;
    console.log(playlistId);
    

    const { data } = await useFetch<SpotifyApi.SpotifyApi.Playlist>(`https://api.spotify.com/v1/playlists/${playlistId}?martket=NL`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.accessToken}`
            }
        });

    console.log(data.value)
</script>

<style scoped>

</style>