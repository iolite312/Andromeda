<template>
    <nav class="flex justify-between">
        <div class="flex">
            <NuxtLink to="/my-library" class="flex items-center gap-2 py-3 pl-3 w-64 rounded-t-xl library" :class="route.path === '/my-library' ? 'bg-spotify-bg-primary' : ''">
                <Icon imageName="Library" :filled="isActive('/my-library').value" />
                <p>My Library</p>
            </NuxtLink>
            <NuxtLink to="/" class="flex items-center gap-2 py-3 pl-3 w-64">
                <Icon imageName="Home" :filled="isActive('/').value" />
                <p>Home</p>
            </NuxtLink>
            <NuxtLink to="/discover" class="flex items-center gap-2 py-3 pl-3 w-64">
                <Icon imageName="Discover" :filled="isActive('/discover').value" />
                <p>Discover</p>
            </NuxtLink>
            <NuxtLink to="/search" class="flex items-center gap-2 py-3 pl-3 w-64">
                <Icon imageName="Search" :filled="isActive('/search').value" />
                <p>Search</p>
            </NuxtLink>
        </div>
        <div>

        </div>
    </nav>
</template>

<script setup lang="ts">
    const route = useRoute();

    const isActive = (path: string) => {
        return computed(() => route.path === path);
    };
</script>

<style scoped>
    .router-link-active:not(.library) {
        @apply bg-spotify-bg-secondary rounded-md;
    }
</style>