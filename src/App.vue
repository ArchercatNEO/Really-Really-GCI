<script setup lang="ts">
import player from '@/player'
import { map } from './scripts/map'
import { computed } from 'vue'
import HeaderDiv from './components/NavDiv/HeaderDiv.vue'
import NavDiv from './components/NavDiv/NavDiv.vue'

const x = computed(() => player.position[0])
const y = computed(() => player.position[1])
</script>

<template>
    <header></header>
    <main>
        <HeaderDiv />
        <component :is="map[y][x]" />
        <NavDiv />
    </main>
</template>

<style scoped></style>
