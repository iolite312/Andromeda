<template>
    <img :src="`/icons/${imageName}${ fill }.svg`" alt="" @click="filled === false ? fill = '-Filled' : fill = ''">
</template>

<script setup lang="ts">
    let fill = ref('')
    defineProps({
        imageName: String,
        filled : Boolean
    })
</script>