<template>
    <NuxtLink class="flex flex-col w-44 h-64 gap-1 relative" :href="/playlists/ + props.playlist?.id">
        <div class="z-10">
            <img class="rounded-lg object-cover object-center h-44" id="playlist-image" :src="props.playlist?.images[0].url"
                :alt="`image cover of ${props.playlist?.name}`">
            <div class="flex flex-col gap-2" >
                <div class="flex justify-between text-lg">
                    <p class="text-spotify-fg-primary truncate" :title="props.playlist?.name">{{ props.playlist?.name }}</p>
                    <p class="text-spotify-fg-secondary">{{ props.playlist?.tracks.total }}</p>
                </div>
                <p class="text-base text-spotify-fg-secondary">{{ props.playlist?.owner.display_name }}</p>
            </div>
        </div>
        <div class="absolute top-[-10px] left-2 w-40 h-2 rounded-t-lg opacity-30" :style="`background-color: rgb(${color.r},${color.g},${color.b});`"></div>
    </NuxtLink>
</template>

<script setup lang="ts">
    import { SpotifyApi } from '~/types';

    const props = defineProps({
        playlist: {
            type: Object as () => SpotifyApi.SpotifyApi.Playlist,
            required: true
        }
    })

    let color: { r: number; g: number; b: number } = { r: 0, g: 0, b: 0 };

    function getAverageColor(img: HTMLImageElement): { r: number; g: number; b: number } {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Failed to get canvas context");

        // Ensure the canvas dimensions match the image dimensions
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Check if the image has valid dimensions
        if (width === 0 || height === 0) {
            throw new Error("Image has invalid dimensions");
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;

        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }

        const pixelCount = data.length / 4;
        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);

        return { r, g, b };
    }

    onMounted(() => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = props.playlist?.images[0].url;

        image.onload = () => {
            try {
                // Only proceed if the image has valid dimensions
                if (image.naturalWidth > 0 && image.naturalHeight > 0) {
                    color = getAverageColor(image);
                } else {
                    console.error("Image has invalid dimensions");
                }
            } catch (error) {
                console.error("Failed to get average color:", error);
            }
        };

        image.onerror = () => {
            console.error("Failed to load image");
        };
    });

</script>

<style scoped></style>