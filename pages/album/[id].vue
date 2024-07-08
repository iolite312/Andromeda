<template>
    <p>{{ data?.name }}, Artist: {{ data?.artists[0].name }}, track count: {{ data?.total_tracks }}</p>
    <div v-for="item in data?.tracks.items">
        <p>{{ item.name }} Artist: 
            <span v-if="item.artists.length === 1">{{ item.artists[0].name }}</span>
            <span v-else>
                <template v-for="(artist, index) in item.artists">
                    {{ artist.name }}<span v-if="index < item.artists.length - 1">, </span>
                </template>
            </span>
        </p>
    </div>
</template>


<script setup lang="ts">
import type { SpotifyApi } from '~/types';

    const route = useRoute();
    const authStore = useAuthStore();
    const playlistId = route.params.id;
    console.log(playlistId);
    

    const { data } = await useFetch<SpotifyApi.SpotifyApi.Album>(`https://api.spotify.com/v1/albums/${playlistId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.accessToken}`
            }
        });
</script>

<style scoped>

</style>