<template>
    <div class="flex items-center gap-3">
        <img class="rounded w-fit h-fit" :src="track_window?.current_track?.album?.images[1]?.url" :alt="track_window?.current_track?.name">
        <div class="text-base">
            <p class="text-spotify-fg-primary">{{ track_window?.current_track?.name }}</p>
            <p class="text-spotify-fg-secondary">{{ track_window?.current_track?.artists[0]?.name }}</p>
            <p class="text-spotify-fg-secondary">{{ isLikedSongs }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

    const playerStore = useSpotifyStore();
    const authStore = useAuthStore();
    let track_window = computed(() => playerStore.currentTrack())

    const uri = computed(() => playerStore.playbackState.context?.uri as string);

    const isLikedSongs = ref('');

    watch(uri, async (newUri) => {
        const regex = /spotify:user:(\w+):collection/;
        if (regex.exec(newUri)) {
            isLikedSongs.value = "Liked Songs";
        } else {
            if (newUri == undefined) {
                isLikedSongs.value = "No track playing";
            } else {
                const res = await getPlayingListname(authStore.accessToken as string, newUri);
                isLikedSongs.value = res.name;
            }
        }
    }, { immediate: true });
</script>

<style scoped>

</style>