<template>
    <div class="flex flex-row flex-wrap justify-center gap-x-3 gap-y-5">
        <div  v-for="item in playlists?.items">
            <PlaylistPreview :playlist="item" />
        </div>
        <div v-for="item in albums?.items">
            <AlbumPreview :album="item.album" />
        </div>
        <div v-for="item in artists?.artists.items">
            <ArtistPreview :artist="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { SpotifyApi } from '~/types';
    const { data: playlists } = useFetch<SpotifyApi.SpotifyApi.PlaylistRequest>("https://api.spotify.com/v1/me/playlists" , {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useAuthStore().accessToken}`
        }
    })
    const { data: albums } = useFetch<SpotifyApi.SpotifyApi.AlbumRequest>("https://api.spotify.com/v1/me/albums" , {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useAuthStore().accessToken}`
        }
    })
    const { data: artists } = useFetch<SpotifyApi.SpotifyApi.ArtistRequest>("https://api.spotify.com/v1/me/following?type=artist" , {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useAuthStore().accessToken}`
        }
    })
</script>

<style scoped>

</style>