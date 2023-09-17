<script setup lang="ts">
import UpgradeGrid from '../UpgradeComponents/UpgradeGrid.vue'
import GrassCanvas from '../GrassCanvas.vue'
</script>

<template>
    <div class="window">
        <UpgradeGrid />
        <GrassCanvas />
    </div>
</template>

<style scoped>
.window {
    background-color: rgb(0, 255, 213);
}
</style>
