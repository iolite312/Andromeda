<template>
    <div class="flex bg-spotify-bg-main w-screen h-screen text-spotify-fg-secondary font-satoshi text-xl p-2">
        <Navbar />
        <div class="flex">
            <Sidebar />
            <div class="ml-2">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>