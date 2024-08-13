<template>
    <NuxtLink :href="link" class="flex items-center gap-2">
        <Icon :imageName="imageName" :filled="filled" />
        <p>{{ text }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
    defineProps({
        filled : Boolean,
        imageName: String,
        link: String,
        text: String
    })
</script>

<style scoped>
    .router-link-active  {
        @apply bg-spotify-bg-secondary rounded-md;
    }
</style>