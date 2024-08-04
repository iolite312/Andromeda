<template>
    <div class="grid grid-cols-2 grid-rows-[auto_minmax(0,_1fr)] bg-spotify-bg-main w-screen h-screen text-spotify-fg-secondary font-satoshi text-xl p-2">
        <Navbar class="col-span-2"/>
        <div class="flex col-span-2">
            <Sidebar />
            <div class="ml-2 mt-2 w-full border rounded-xl border-spotify-bg-secondary p-6 overflow-auto">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>