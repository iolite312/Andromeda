<template>
    <NuxtLink class="flex flex-col items-center w-44 h-64 gap-3 relative" :href="/artist/ + props.artist.id">
        <img class="rounded-full" :src="props.artist.images[0].url" :alt="`image of ${props.artist.name}`">
        <p class="text-base text-spotify-fg-primary text-center">{{ props.artist.name }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
    import { SpotifyApi } from '~/types';

    const props = defineProps({
        artist: {
            type: Object as () => SpotifyApi.SpotifyApi.Artist,
            required: true
        }
    })
</script>

<style scoped></style>