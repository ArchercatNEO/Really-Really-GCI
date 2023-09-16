<script setup lang="ts">
import UpgradeGrid from './components/UpgradeComponents/UpgradeGrid.vue'
import GrassCanvas from './components/GrassCanvas.vue'
import NavDiv from './components/NavDiv/NavDiv.vue'
</script>

<template>
    <header></header>

    <main>
        <UpgradeGrid :position="[0, 0]" />
        <UpgradeGrid :position="[0, 1]" />
        <GrassCanvas />
        <NavDiv />
    </main>
</template>

<style scoped></style>
