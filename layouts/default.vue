<template>
    <section class="grid grid-cols-2 grid-rows-[auto_minmax(0,_1fr)] bg-spotify-bg-main w-screen h-screen text-spotify-fg-secondary font-satoshi text-xl p-2">
        <Navbar class="col-span-2"/>
        <section class="flex col-span-2">
            <Sidebar />
            <section class="w-full ml-2 mt-2 flex flex-col">
                <div class=" w-full border rounded-xl mb-1 border-spotify-bg-secondary p-6 overflow-auto grow">
                    <slot />
                </div>
                <Musicbar />
            </section>
        </section>
    </section>
</template>

<script setup lang="ts">

</script>