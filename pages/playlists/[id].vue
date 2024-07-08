<template>
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
    const albumId = route.params.id;
    console.log(albumId);
    

    const { data } = await useFetch<SpotifyApi.SpotifyApi.Playlist>(`https://api.spotify.com/v1/playlists/${albumId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.accessToken}`
            }
        });
</script>

<style scoped>

</style>