<template>
    <img :src="`/icons/${imageName}${ fill }.svg`" alt="" />
</template>

<script setup lang="ts">
    const props = defineProps({
        imageName: String,
        filled : Boolean
    })

    const fill = computed(() => (props.filled ? '-Filled' : ''))
</script>