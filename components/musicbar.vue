<template>
    <section class="bg-[#333842] w-full h-20 rounded-xl flex flex-col justify-center p-5">
        <div class="flex gap-1 items-center">
            <button @click="playerStore.pausePlayer()" class="min-w-[42px]">
                <Icon imageName="Play" :filled="false" v-if="isPaused"/>
                <Icon imageName="Pause" :filled="false" v-else/>
            </button>
            <button @click="playerStore.previousTrack()" class="min-w-[42px]">
                <Icon imageName="Prev" :filled="false"/>
            </button>
            <button @click="playerStore.nextTrack()" class="min-w-[42px]">
                <Icon imageName="Next" :filled="false"/>
            </button>
            <button @click="playerStore.toggleShuffle()" class="min-w-[42px]">
                <Icon imageName="Shuffle" :filled="false" v-if="!isShuffled"/>
                <Icon imageName="Shuffle" :filled="true" v-else/>
            </button>
            <button @click="playerStore.toggleRepeatMode()" class="min-w-[42px]">
                <Icon imageName="Loop" :filled="false" v-if="isRepeated === 0"/>
                <Icon imageName="Loop" :filled="true" v-else-if="isRepeated === 1"/>
                <Icon imageName="Loop-1" :filled="true" v-else/>
            </button>
            <Progressbar :min="0" :max="duration" :current="position" :step="1000"/>
            <MusicWidget/>
        </div>
    </section>
</template>

<script setup lang="ts">
    const playerStore = useSpotifyStore();
    const isPaused = computed(() => playerStore.playbackState.paused)
    const isShuffled = computed(() => playerStore.playbackState.shuffle)
    const isRepeated = computed(() => playerStore.playbackState.repeat_mode)
    const duration = computed(() => playerStore.playbackState.duration)
    const position = computed(() => playerStore.playbackState.position)
    
</script>

<style scoped>
    button {
        @apply flex justify-center;
    }
</style>