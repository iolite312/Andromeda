<template>
    <div class="py-3 pl-3 max-w-64 w-full rounded-b-xl" :class="route.path === '/my-library' ? 'bg-spotify-bg-primary' : ''">
        <SidebarItem imageName="Like" :filled="false" link="/liked-songs" text="Liked songs"/>
        <SidebarItem imageName="Save" :filled="false" link="/saved" text="Saves"/>
        <SidebarItem imageName="Album" :filled="false" link="/saved-albums" text="Albums"/>
        <SidebarItem imageName="Folder" :filled="false" link="/folders" text="Folders"/>
        <SidebarItem imageName="Podcast" :filled="false" link="/saved-podcasts" text="Podcasts"/>
        <SidebarItem imageName="Audiobook" :filled="false" link="/saved-audiobooks" text="Audiobooks"/>
        <SidebarItem imageName="Artist" :filled="false" link="/saved-artists" text="Artists"/>
    </div>
</template>

<script setup lang="ts">
    const route = useRoute();
</script>